from __future__ import annotations

import argparse
import json
import os
import sys
import tempfile
from pathlib import Path
from typing import Any
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

# Allow importing storage from sibling module when run as a script
sys.path.insert(0, str(Path(__file__).resolve().parent))
from storage import init_db, upsert_content  # noqa: E402

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

BASE_URL = "https://president.uz"
LANGUAGES = ["oz", "ru", "en"]

# president.uz uses "oz" for Uzbek; the portal DB uses "uz"
LANG_TO_LOCALE: dict[str, str] = {"oz": "uz", "ru": "ru", "en": "en"}

_DEFAULT_DB = Path(tempfile.gettempdir()) / "anniversary_portal_backend" / "portal.db"
DEFAULT_DB_PATH = Path(os.getenv("PORTAL_DB_PATH", str(_DEFAULT_DB)))
DEFAULT_LIMIT = 6
DEFAULT_OUTPUT_PATH = Path(__file__).resolve().parent.parent / "site_content.json"

_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/125.0.0.0 Safari/537.36"
    )
}

# ---------------------------------------------------------------------------
# HTML parsing helpers
# ---------------------------------------------------------------------------


def _extract_text(node: Any, selector: str, default: str = "") -> str:
    element = node.select_one(selector)
    if not element:
        return default
    return element.get_text(strip=True)


def _extract_attr(node: Any, selector: str, attr_name: str, default: str = "") -> str:
    element = node.select_one(selector)
    if not element:
        return default
    value = element.get(attr_name)
    return value.strip() if isinstance(value, str) else default


def _url_slug(href: str) -> str:
    """Return the last non-empty path segment of a URL as a stable slug."""
    parts = [p for p in urlparse(href).path.split("/") if p]
    return parts[-1] if parts else href


def _parse_news_cards(html: str, limit: int) -> list[dict[str, str]]:
    soup = BeautifulSoup(html, "html.parser")
    cards = soup.select(".news_item")
    articles: list[dict[str, str]] = []

    for card in cards[:limit]:
        title = _extract_text(card, ".news_title")
        link = _extract_attr(card, "a", "href")

        if not title and not link:
            continue

        articles.append(
            {
                "title": title,
                "date": _extract_text(card, ".news_date"),
                "link": urljoin(BASE_URL, link),
                "image": urljoin(BASE_URL, _extract_attr(card, "img", "src")),
                "slug": _url_slug(link),
            }
        )

    return articles


# ---------------------------------------------------------------------------
# Grouping: merge per-language results into one record per article
# ---------------------------------------------------------------------------


def _group_by_slug(
    per_lang: dict[str, list[dict[str, str]]]
) -> list[dict[str, Any]]:
    """
    Match articles across languages using the URL slug.

    If a slug appears in multiple languages the titles/dates are merged into
    one record.  Articles that only appear in one language are still included
    with empty strings for the missing locales.
    """
    # slug → merged record
    grouped: dict[str, dict[str, Any]] = {}
    # preserve insertion order for sort_order
    order: list[str] = []

    for lang, articles in per_lang.items():
        locale = LANG_TO_LOCALE.get(lang, lang)
        for article in articles:
            slug = article["slug"]
            if slug not in grouped:
                grouped[slug] = {
                    "slug": slug,
                    "date": article["date"],
                    "link": article["link"],
                    "image": article["image"],
                    "title": {"uz": "", "ru": "", "en": ""},
                    "summary": {"uz": "", "ru": "", "en": ""},
                }
                order.append(slug)
            grouped[slug]["title"][locale] = article["title"]
            # Use the first non-empty date we see
            if not grouped[slug]["date"] and article["date"]:
                grouped[slug]["date"] = article["date"]

    return [grouped[s] for s in order]


# ---------------------------------------------------------------------------
# Main sync function
# ---------------------------------------------------------------------------


def scrape_latest_news(
    languages: list[str] | None = None,
    limit: int = DEFAULT_LIMIT,
    output_path: Path | str = DEFAULT_OUTPUT_PATH,
    db_path: Path | str = DEFAULT_DB_PATH,
    write_json: bool = True,
) -> dict[str, list[dict[str, str]]]:
    """
    Fetch the latest news from president.uz and persist to:
    - The project SQLite database (via storage.upsert_content)
    - A JSON file consumed by the static frontend (site_content.json)
    """
    selected_languages = languages or LANGUAGES
    per_lang: dict[str, list[dict[str, str]]] = {}

    with requests.Session() as session:
        session.headers.update(_HEADERS)

        for lang in selected_languages:
            url = f"{BASE_URL}/{lang}/lists/view"
            print(f"Fetching {lang} content from {url} ...")

            try:
                response = session.get(url, timeout=20)
                response.raise_for_status()
            except requests.RequestException as exc:
                print(f"  Warning: failed to fetch {lang}: {exc}")
                per_lang[lang] = []
                continue

            per_lang[lang] = _parse_news_cards(response.text, limit)
            print(f"  Parsed {len(per_lang[lang])} items.")

    # ------------------------------------------------------------------ DB
    db = Path(db_path)
    init_db(db)
    merged = _group_by_slug(per_lang)

    for index, article in enumerate(merged):
        # Fill missing locales with best available title
        filled_title = dict(article["title"])
        fallback = next((v for v in filled_title.values() if v), article["slug"])
        for locale in ("uz", "ru", "en"):
            if not filled_title[locale]:
                filled_title[locale] = fallback

        upsert_content(
            db,
            kind="news",
            slug=f"president-{article['slug']}",
            payload={
                "title": filled_title,
                "summary": article["summary"],
                "body": {},
                "meta": {
                    "source_url": article["link"],
                    "image": article["image"],
                    "source": "president.uz",
                },
                "category": "official",
                "theme": "primary",
                "date": article["date"],
                "sort_order": index,
            },
        )

    print(f"Saved {len(merged)} article(s) to DB: {db}")

    # ------------------------------------------------------------ JSON export
    if write_json:
        json_data: dict[str, list[dict[str, str]]] = {}
        for lang, articles in per_lang.items():
            json_data[lang] = [
                {k: v for k, v in a.items() if k != "slug"}
                for a in articles
            ]
        output = Path(output_path)
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(
            json.dumps(json_data, ensure_ascii=False, indent=4), encoding="utf-8"
        )
        print(f"JSON export written: {output}")

    return per_lang


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Sync latest news from president.uz into the portal DB and site_content.json"
    )
    parser.add_argument(
        "--languages",
        nargs="+",
        choices=["oz", "ru", "en"],
        default=LANGUAGES,
        metavar="LANG",
        help="Languages to fetch (default: oz ru en)",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=DEFAULT_LIMIT,
        metavar="N",
        help="Max articles per language (default: 6)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT_PATH,
        metavar="PATH",
        help="Output JSON file (default: <project_root>/site_content.json)",
    )
    parser.add_argument(
        "--db",
        type=Path,
        default=DEFAULT_DB_PATH,
        metavar="PATH",
        help=f"SQLite DB path — overrides PORTAL_DB_PATH (default: {DEFAULT_DB_PATH})",
    )
    parser.add_argument(
        "--no-json",
        action="store_true",
        help="Skip writing the JSON export",
    )
    args = parser.parse_args()
    scrape_latest_news(
        languages=args.languages,
        limit=args.limit,
        output_path=args.output,
        db_path=args.db,
        write_json=not args.no_json,
    )