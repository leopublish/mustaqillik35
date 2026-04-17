from __future__ import annotations

import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

try:
    from .seed_data import (
        ABOUT_PAGE,
        ALBUMS,
        COLLECTIONS,
        DOCUMENTS,
        HERO_SLIDES,
        LEGAL_PAGES,
        LEADERS,
        NEWS,
        ORGANIZATIONS,
        SITE_SETTINGS,
    )
except ImportError:
    from seed_data import (  # type: ignore
        ABOUT_PAGE,
        ALBUMS,
        COLLECTIONS,
        DOCUMENTS,
        HERO_SLIDES,
        LEGAL_PAGES,
        LEADERS,
        NEWS,
        ORGANIZATIONS,
        SITE_SETTINGS,
    )


def utcnow_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def json_dumps(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False)


def connect(db_path: str | Path) -> sqlite3.Connection:
    connection = sqlite3.connect(str(db_path))
    connection.row_factory = sqlite3.Row
    return connection


def localize(value: Any, locale: str) -> Any:
    if isinstance(value, dict):
        locale_keys = {"uz", "ru", "en"}
        if locale_keys.issubset(value.keys()):
            return value.get(locale) or value.get("uz") or value.get("ru") or value.get("en")
        return {key: localize(item, locale) for key, item in value.items()}
    if isinstance(value, list):
        return [localize(item, locale) for item in value]
    return value


def init_db(db_path: str | Path) -> None:
    path = Path(db_path)
    path.parent.mkdir(parents=True, exist_ok=True)

    with connect(path) as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                payload_json TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS content_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                kind TEXT NOT NULL,
                slug TEXT NOT NULL,
                title_uz TEXT NOT NULL,
                title_ru TEXT NOT NULL,
                title_en TEXT NOT NULL,
                summary_uz TEXT DEFAULT '',
                summary_ru TEXT DEFAULT '',
                summary_en TEXT DEFAULT '',
                body_json TEXT DEFAULT '{}',
                meta_json TEXT DEFAULT '{}',
                category TEXT DEFAULT '',
                item_type TEXT DEFAULT '',
                theme TEXT DEFAULT '',
                published_at TEXT DEFAULT '',
                number TEXT DEFAULT '',
                sort_order INTEGER DEFAULT 0,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                UNIQUE(kind, slug)
            );

            CREATE INDEX IF NOT EXISTS idx_content_kind_date
                ON content_items(kind, published_at DESC, sort_order ASC);

            CREATE TABLE IF NOT EXISTS submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT DEFAULT '',
                topic TEXT NOT NULL,
                subject TEXT NOT NULL,
                message TEXT NOT NULL,
                locale TEXT DEFAULT 'uz',
                consent INTEGER NOT NULL DEFAULT 0,
                status TEXT NOT NULL DEFAULT 'new',
                ip_address TEXT DEFAULT '',
                created_at TEXT NOT NULL
            );
            """
        )
        seed_if_empty(conn)
        conn.commit()


def seed_if_empty(conn: sqlite3.Connection) -> None:
    existing = conn.execute("SELECT COUNT(*) FROM settings").fetchone()[0]
    if existing:
        return

    timestamp = utcnow_iso()
    seed_settings = {
        "site_settings": SITE_SETTINGS,
        "about_page": ABOUT_PAGE,
        "legal_pages": LEGAL_PAGES,
    }

    for key, payload in seed_settings.items():
        conn.execute(
            "INSERT INTO settings(key, payload_json, updated_at) VALUES (?, ?, ?)",
            (key, json_dumps(payload), timestamp),
        )

    def insert_item(
        *,
        kind: str,
        slug: str,
        title: dict[str, str],
        summary: dict[str, str] | None = None,
        body: Any = None,
        meta: dict[str, Any] | None = None,
        category: str = "",
        item_type: str = "",
        theme: str = "",
        published_at: str = "",
        number: str = "",
        sort_order: int = 0,
    ) -> None:
        summary = summary or {"uz": "", "ru": "", "en": ""}
        body = body or {}
        meta = meta or {}
        conn.execute(
            """
            INSERT INTO content_items(
                kind, slug,
                title_uz, title_ru, title_en,
                summary_uz, summary_ru, summary_en,
                body_json, meta_json, category, item_type, theme,
                published_at, number, sort_order, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                kind,
                slug,
                title["uz"],
                title["ru"],
                title["en"],
                summary["uz"],
                summary["ru"],
                summary["en"],
                json_dumps(body),
                json_dumps(meta),
                category,
                item_type,
                theme,
                published_at,
                number,
                sort_order,
                timestamp,
                timestamp,
            ),
        )

    for index, item in enumerate(HERO_SLIDES):
        insert_item(
            kind="hero_slide",
            slug=item["slug"],
            title=item["title"],
            summary=item["summary"],
            meta={"kicker": item["kicker"]},
            category=item["category"],
            theme=item["theme"],
            published_at=item["date"],
            sort_order=index,
        )

    for index, item in enumerate(COLLECTIONS):
        insert_item(
            kind="collection",
            slug=item["slug"],
            title=item["title"],
            summary=item["summary"],
            meta={"key": item["key"], "count": item["count"], "href": item["href"]},
            theme=item["theme"],
            sort_order=index,
        )

    for index, item in enumerate(NEWS):
        insert_item(
            kind="news",
            slug=item["slug"],
            title=item["title"],
            summary=item["summary"],
            body=item["body"],
            meta={"quote": item["quote"], "facts": item["facts"]},
            category=item["category"],
            theme=item["theme"],
            published_at=item["date"],
            sort_order=index,
        )

    for index, item in enumerate(DOCUMENTS):
        insert_item(
            kind="document",
            slug=item["slug"],
            title=item["title"],
            summary=item["summary"],
            body=item["body"],
            item_type=item["type"],
            published_at=item["date"],
            number=item["number"],
            sort_order=index,
        )

    for index, item in enumerate(LEADERS):
        insert_item(
            kind="leader",
            slug=item["slug"],
            title={"uz": item["name"], "ru": item["name"], "en": item["name"]},
            summary=item["role"],
            body=item["bio"],
            theme=item["theme"],
            sort_order=index,
        )

    for index, item in enumerate(ORGANIZATIONS):
        insert_item(
            kind="organization",
            slug=item["slug"],
            title=item["name"],
            summary=item["scope"],
            meta={"href": item["href"]},
            theme=item["theme"],
            sort_order=index,
        )

    for index, item in enumerate(ALBUMS):
        insert_item(
            kind="album",
            slug=item["slug"],
            title=item["title"],
            summary=item["summary"],
            meta={"count": item["count"], "duration": item["duration"], "frames": item["frames"]},
            item_type=item["type"],
            theme=item["theme"],
            published_at=item["date"],
            sort_order=index,
        )


def _localized_text(row: sqlite3.Row, prefix: str, locale: str) -> str:
    preferred = row[f"{prefix}_{locale}"]
    if preferred:
        return preferred
    return row[f"{prefix}_uz"] or row[f"{prefix}_ru"] or row[f"{prefix}_en"] or ""


def serialize_public_item(row: sqlite3.Row, locale: str) -> dict[str, Any]:
    body = localize(json.loads(row["body_json"] or "{}"), locale)
    meta = localize(json.loads(row["meta_json"] or "{}"), locale)
    payload = {
        "slug": row["slug"],
        "kind": row["kind"],
        "title": _localized_text(row, "title", locale),
        "summary": _localized_text(row, "summary", locale),
        "body": body,
        "category": row["category"] or None,
        "type": row["item_type"] or None,
        "theme": row["theme"] or None,
        "date": row["published_at"] or None,
        "number": row["number"] or None,
        "sort_order": row["sort_order"],
    }
    payload.update(meta)
    return payload


def serialize_admin_item(row: sqlite3.Row) -> dict[str, Any]:
    return {
        "kind": row["kind"],
        "slug": row["slug"],
        "title": {"uz": row["title_uz"], "ru": row["title_ru"], "en": row["title_en"]},
        "summary": {"uz": row["summary_uz"], "ru": row["summary_ru"], "en": row["summary_en"]},
        "body": json.loads(row["body_json"] or "{}"),
        "meta": json.loads(row["meta_json"] or "{}"),
        "category": row["category"],
        "type": row["item_type"],
        "theme": row["theme"],
        "date": row["published_at"],
        "number": row["number"],
        "sort_order": row["sort_order"],
        "created_at": row["created_at"],
        "updated_at": row["updated_at"],
    }


def get_setting(db_path: str | Path, key: str) -> dict[str, Any]:
    with connect(db_path) as conn:
        row = conn.execute("SELECT payload_json FROM settings WHERE key = ?", (key,)).fetchone()
        if not row:
            raise KeyError(key)
        return json.loads(row["payload_json"])


def get_site_settings(db_path: str | Path, locale: str) -> dict[str, Any]:
    return localize(get_setting(db_path, "site_settings"), locale)


def get_about_page(db_path: str | Path, locale: str) -> dict[str, Any]:
    return localize(get_setting(db_path, "about_page"), locale)


def get_legal_pages(db_path: str | Path, locale: str) -> dict[str, Any]:
    return localize(get_setting(db_path, "legal_pages"), locale)


def _list_rows(
    db_path: str | Path,
    *,
    kind: str,
    locale: str,
    category: str = "",
    item_type: str = "",
    query: str = "",
    limit: int | None = None,
    offset: int = 0,
) -> list[dict[str, Any]]:
    sql = ["SELECT * FROM content_items WHERE kind = ?"]
    params: list[Any] = [kind]

    if category:
        sql.append("AND category = ?")
        params.append(category)

    if item_type:
        sql.append("AND item_type = ?")
        params.append(item_type)

    if query:
        pattern = f"%{query.lower()}%"
        sql.append(
            """
            AND (
                lower(title_uz) LIKE ? OR
                lower(title_ru) LIKE ? OR
                lower(title_en) LIKE ? OR
                lower(summary_uz) LIKE ? OR
                lower(summary_ru) LIKE ? OR
                lower(summary_en) LIKE ? OR
                lower(body_json) LIKE ? OR
                lower(meta_json) LIKE ?
            )
            """
        )
        params.extend([pattern] * 8)

    sql.append("ORDER BY COALESCE(published_at, '') DESC, sort_order ASC, id DESC")
    if limit is not None:
        sql.append("LIMIT ? OFFSET ?")
        params.extend([limit, offset])

    query_sql = " ".join(sql)
    with connect(db_path) as conn:
        rows = conn.execute(query_sql, params).fetchall()
    return [serialize_public_item(row, locale) for row in rows]


def list_news(db_path: str | Path, locale: str, *, category: str = "", query: str = "", limit: int | None = None, offset: int = 0) -> list[dict[str, Any]]:
    return _list_rows(db_path, kind="news", locale=locale, category=category, query=query, limit=limit, offset=offset)


def list_documents(db_path: str | Path, locale: str, *, item_type: str = "", query: str = "", limit: int | None = None, offset: int = 0) -> list[dict[str, Any]]:
    return _list_rows(db_path, kind="document", locale=locale, item_type=item_type, query=query, limit=limit, offset=offset)


def list_albums(db_path: str | Path, locale: str, *, item_type: str = "", query: str = "", limit: int | None = None, offset: int = 0) -> list[dict[str, Any]]:
    return _list_rows(db_path, kind="album", locale=locale, item_type=item_type, query=query, limit=limit, offset=offset)


def list_leaders(db_path: str | Path, locale: str) -> list[dict[str, Any]]:
    return _list_rows(db_path, kind="leader", locale=locale)


def list_organizations(db_path: str | Path, locale: str) -> list[dict[str, Any]]:
    return _list_rows(db_path, kind="organization", locale=locale)


def list_hero_slides(db_path: str | Path, locale: str) -> list[dict[str, Any]]:
    return _list_rows(db_path, kind="hero_slide", locale=locale)


def list_collections(db_path: str | Path, locale: str) -> list[dict[str, Any]]:
    return _list_rows(db_path, kind="collection", locale=locale)


def get_item(db_path: str | Path, kind: str, slug: str, locale: str) -> dict[str, Any] | None:
    with connect(db_path) as conn:
        row = conn.execute("SELECT * FROM content_items WHERE kind = ? AND slug = ?", (kind, slug)).fetchone()
    if not row:
        return None
    return serialize_public_item(row, locale)


def get_home_payload(db_path: str | Path, locale: str) -> dict[str, Any]:
    settings = get_site_settings(db_path, locale)
    return {
        "site": settings["site"],
        "navigation": settings["navigation"],
        "page_meta": settings["page_meta"]["home"],
        "hero_slides": list_hero_slides(db_path, locale),
        "collections": list_collections(db_path, locale),
        "latest_news": list_news(db_path, locale, limit=4),
        "featured_documents": list_documents(db_path, locale, limit=4),
        "albums": list_albums(db_path, locale, limit=3),
        "home_sections": settings["home_sections"],
        "contacts": settings["contacts"],
    }


def get_organization_payload(db_path: str | Path, locale: str) -> dict[str, Any]:
    settings = get_site_settings(db_path, locale)
    return {
        "page_meta": settings["page_meta"]["organization"],
        "leaders": list_leaders(db_path, locale),
        "organizations": list_organizations(db_path, locale),
    }


def get_contacts_payload(db_path: str | Path, locale: str) -> dict[str, Any]:
    settings = get_site_settings(db_path, locale)
    return {
        "page_meta": settings["page_meta"]["contacts"],
        "site": settings["site"],
        "contacts": settings["contacts"],
        "service_links": settings["service_links"],
    }


def create_submission(db_path: str | Path, payload: dict[str, Any], ip_address: str) -> dict[str, Any]:
    timestamp = utcnow_iso()
    with connect(db_path) as conn:
        cursor = conn.execute(
            """
            INSERT INTO submissions(name, email, phone, topic, subject, message, locale, consent, status, ip_address, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                payload["name"].strip(),
                payload["email"].strip(),
                payload.get("phone", "").strip(),
                payload["topic"].strip(),
                payload["subject"].strip(),
                payload["message"].strip(),
                payload.get("locale", "uz"),
                1 if payload.get("consent") else 0,
                "new",
                ip_address,
                timestamp,
            ),
        )
        conn.commit()
        submission_id = cursor.lastrowid
    return {"id": submission_id, "created_at": timestamp, "status": "new"}


def list_submissions(db_path: str | Path, limit: int = 100) -> list[dict[str, Any]]:
    with connect(db_path) as conn:
        rows = conn.execute(
            "SELECT * FROM submissions ORDER BY created_at DESC, id DESC LIMIT ?",
            (limit,),
        ).fetchall()
    return [dict(row) for row in rows]


def search_content(db_path: str | Path, locale: str, query: str, limit: int = 20) -> list[dict[str, Any]]:
    lowered = query.lower().strip()
    if not lowered:
        return []

    results: list[dict[str, Any]] = []
    for item in list_news(db_path, locale, query=lowered, limit=limit):
        results.append({"type": "news", "title": item["title"], "snippet": item["summary"], "date": item["date"], "url": f"events.html?slug={item['slug']}"})
    for item in list_documents(db_path, locale, query=lowered, limit=limit):
        results.append({"type": "document", "title": item["title"], "snippet": item["summary"], "date": item["date"], "url": f"documents.html?slug={item['slug']}"})
    for item in list_albums(db_path, locale, query=lowered, limit=limit):
        results.append({"type": "media", "title": item["title"], "snippet": item["summary"], "date": item["date"], "url": f"media.html?slug={item['slug']}"})

    about_page = get_about_page(db_path, locale)
    for section in about_page["sections"]:
        blob = " ".join(section["paragraphs"]).lower()
        if lowered in section["title"].lower() or lowered in blob:
            results.append({"type": "page", "title": section["title"], "snippet": section["paragraphs"][0], "date": "", "url": f"about.html#{section['id']}"})

    seen: set[tuple[str, str]] = set()
    deduped: list[dict[str, Any]] = []
    for item in results:
        key = (item["type"], item["url"])
        if key not in seen:
            seen.add(key)
            deduped.append(item)
    return deduped[:limit]


def list_admin_content(db_path: str | Path, kind: str, limit: int = 200) -> list[dict[str, Any]]:
    with connect(db_path) as conn:
        rows = conn.execute(
            "SELECT * FROM content_items WHERE kind = ? ORDER BY COALESCE(published_at, '') DESC, sort_order ASC, id DESC LIMIT ?",
            (kind, limit),
        ).fetchall()
    return [serialize_admin_item(row) for row in rows]


def upsert_content(db_path: str | Path, kind: str, slug: str, payload: dict[str, Any]) -> dict[str, Any]:
    timestamp = utcnow_iso()
    title = payload["title"]
    summary = payload.get("summary", {"uz": "", "ru": "", "en": ""})
    body = payload.get("body", {})
    meta = payload.get("meta", {})

    with connect(db_path) as conn:
        conn.execute(
            """
            INSERT INTO content_items(
                kind, slug, title_uz, title_ru, title_en,
                summary_uz, summary_ru, summary_en,
                body_json, meta_json, category, item_type, theme,
                published_at, number, sort_order, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(kind, slug) DO UPDATE SET
                title_uz = excluded.title_uz,
                title_ru = excluded.title_ru,
                title_en = excluded.title_en,
                summary_uz = excluded.summary_uz,
                summary_ru = excluded.summary_ru,
                summary_en = excluded.summary_en,
                body_json = excluded.body_json,
                meta_json = excluded.meta_json,
                category = excluded.category,
                item_type = excluded.item_type,
                theme = excluded.theme,
                published_at = excluded.published_at,
                number = excluded.number,
                sort_order = excluded.sort_order,
                updated_at = excluded.updated_at
            """,
            (
                kind,
                slug,
                title["uz"],
                title["ru"],
                title["en"],
                summary.get("uz", ""),
                summary.get("ru", ""),
                summary.get("en", ""),
                json_dumps(body),
                json_dumps(meta),
                payload.get("category", ""),
                payload.get("type", ""),
                payload.get("theme", ""),
                payload.get("date", ""),
                payload.get("number", ""),
                int(payload.get("sort_order", 0)),
                timestamp,
                timestamp,
            ),
        )
        conn.commit()
        row = conn.execute("SELECT * FROM content_items WHERE kind = ? AND slug = ?", (kind, slug)).fetchone()
    return serialize_admin_item(row)


def delete_content(db_path: str | Path, kind: str, slug: str) -> bool:
    with connect(db_path) as conn:
        cursor = conn.execute("DELETE FROM content_items WHERE kind = ? AND slug = ?", (kind, slug))
        conn.commit()
    return cursor.rowcount > 0
