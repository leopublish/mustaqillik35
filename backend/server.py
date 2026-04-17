from __future__ import annotations

import json
import mimetypes
import os
import re
import sys
import tempfile
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, unquote, urlparse

if __package__ in (None, ""):
    sys.path.append(str(Path(__file__).resolve().parent))

try:
    from .storage import (
        create_submission,
        delete_content,
        get_about_page,
        get_contacts_payload,
        get_home_payload,
        get_item,
        get_legal_pages,
        get_organization_payload,
        get_site_settings,
        init_db,
        list_admin_content,
        list_albums,
        list_documents,
        list_news,
        list_submissions,
        search_content,
        upsert_content,
        utcnow_iso,
    )
except ImportError:
    from storage import (  # type: ignore
        create_submission,
        delete_content,
        get_about_page,
        get_contacts_payload,
        get_home_payload,
        get_item,
        get_legal_pages,
        get_organization_payload,
        get_site_settings,
        init_db,
        list_admin_content,
        list_albums,
        list_documents,
        list_news,
        list_submissions,
        search_content,
        upsert_content,
        utcnow_iso,
    )


ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_RUNTIME_DIR = Path(tempfile.gettempdir()) / "anniversary_portal_backend"
DB_PATH = Path(os.getenv("PORTAL_DB_PATH", DEFAULT_RUNTIME_DIR / "portal.db"))
HOST = os.getenv("PORTAL_HOST", "127.0.0.1")
PORT = int(os.getenv("PORTAL_PORT", "8000"))
ADMIN_TOKEN = os.getenv("PORTAL_ADMIN_TOKEN", "change-me")
RATE_LIMIT_WINDOW_SECONDS = 600
RATE_LIMIT_MAX_REQUESTS = 5
ALLOWED_ADMIN_KINDS = {
    "news": "news",
    "events": "news",
    "document": "document",
    "documents": "document",
    "media": "album",
    "album": "album",
    "leader": "leader",
    "leaders": "leader",
    "organization": "organization",
    "organizations": "organization",
    "hero_slide": "hero_slide",
    "hero-slides": "hero_slide",
    "collection": "collection",
    "collections": "collection",
}
RATE_BUCKETS: dict[str, list[float]] = {}


def normalize_locale(value: str | None) -> str:
    if value in {"uz", "ru", "en"}:
        return value
    if value == "oz":
        return "uz"
    return "uz"


def normalize_kind(value: str | None) -> str | None:
    if not value:
        return None
    return ALLOWED_ADMIN_KINDS.get(value)


def is_valid_slug(value: str) -> bool:
    return bool(re.fullmatch(r"[a-z0-9-]{2,120}", value))


def validate_localized_dict(value: Any, field_name: str) -> dict[str, str]:
    if not isinstance(value, dict):
        raise ValueError(f"{field_name} must be an object with uz/ru/en keys")
    normalized = {
        "uz": str(value.get("uz", "")).strip(),
        "ru": str(value.get("ru", "")).strip(),
        "en": str(value.get("en", "")).strip(),
    }
    if not normalized["uz"]:
        raise ValueError(f"{field_name}.uz is required")
    return normalized


def validate_contact_payload(payload: dict[str, Any]) -> dict[str, Any]:
    required_fields = ["name", "email", "subject", "message", "topic"]
    for field in required_fields:
        if not str(payload.get(field, "")).strip():
            raise ValueError(f"{field} is required")

    email = str(payload.get("email", "")).strip()
    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email):
        raise ValueError("email is invalid")

    if not payload.get("consent"):
        raise ValueError("consent must be accepted")

    honeypot = str(payload.get("website", "")).strip()
    if honeypot:
        raise ValueError("spam detected")

    return {
        "name": str(payload["name"]).strip(),
        "email": email,
        "phone": str(payload.get("phone", "")).strip(),
        "subject": str(payload["subject"]).strip(),
        "message": str(payload["message"]).strip(),
        "topic": str(payload["topic"]).strip(),
        "locale": normalize_locale(str(payload.get("locale", "uz"))),
        "consent": True,
    }


def validate_admin_payload(payload: dict[str, Any]) -> dict[str, Any]:
    title = validate_localized_dict(payload.get("title"), "title")
    summary = validate_localized_dict(payload.get("summary", {"uz": "", "ru": "", "en": ""}), "summary")
    body = payload.get("body", {})
    meta = payload.get("meta", {})

    if body and not isinstance(body, (dict, list, str)):
        raise ValueError("body must be a localized object, list, or string")
    if meta and not isinstance(meta, dict):
        raise ValueError("meta must be an object")

    return {
        "title": title,
        "summary": summary,
        "body": body,
        "meta": meta,
        "category": str(payload.get("category", "")).strip(),
        "type": str(payload.get("type", "")).strip(),
        "theme": str(payload.get("theme", "")).strip(),
        "date": str(payload.get("date", "")).strip(),
        "number": str(payload.get("number", "")).strip(),
        "sort_order": int(payload.get("sort_order", 0)),
    }


def parse_json_body(handler: BaseHTTPRequestHandler) -> dict[str, Any]:
    content_length = int(handler.headers.get("Content-Length", "0") or "0")
    if content_length <= 0:
        return {}
    raw = handler.rfile.read(content_length)
    if not raw:
        return {}
    return json.loads(raw.decode("utf-8"))


def check_rate_limit(ip_address: str) -> bool:
    now = time.time()
    bucket = RATE_BUCKETS.setdefault(ip_address, [])
    bucket[:] = [value for value in bucket if now - value < RATE_LIMIT_WINDOW_SECONDS]
    if len(bucket) >= RATE_LIMIT_MAX_REQUESTS:
        return False
    bucket.append(now)
    return True


class PortalHandler(BaseHTTPRequestHandler):
    server_version = "PortalBackend/1.0"

    def log_message(self, format: str, *args: Any) -> None:
        message = format % args
        sys.stdout.write(f"[portal-backend] {self.address_string()} {message}\n")

    def end_headers(self) -> None:
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Admin-Token")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        super().end_headers()

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.end_headers()

    def do_GET(self) -> None:
        self.dispatch("GET")

    def do_POST(self) -> None:
        self.dispatch("POST")

    def do_PUT(self) -> None:
        self.dispatch("PUT")

    def do_DELETE(self) -> None:
        self.dispatch("DELETE")

    def dispatch(self, method: str) -> None:
        parsed = urlparse(self.path)
        path = parsed.path or "/"
        query = parse_qs(parsed.query)

        try:
            if path.startswith("/api/"):
                self.handle_api(method, path, query)
            else:
                self.serve_static(path)
        except FileNotFoundError:
            self.respond({"ok": False, "error": "Not found"}, status=404)
        except ValueError as error:
            self.respond({"ok": False, "error": str(error)}, status=400)
        except PermissionError as error:
            self.respond({"ok": False, "error": str(error)}, status=401)
        except json.JSONDecodeError:
            self.respond({"ok": False, "error": "Invalid JSON body"}, status=400)
        except Exception as error:
            self.respond({"ok": False, "error": "Internal server error", "detail": str(error)}, status=500)

    def respond(self, payload: dict[str, Any], status: int = 200) -> None:
        raw = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def require_admin(self) -> None:
        token = self.headers.get("X-Admin-Token", "")
        if token != ADMIN_TOKEN:
            raise PermissionError("Invalid admin token")

    def serve_static(self, request_path: str) -> None:
        requested = "index.html" if request_path in {"", "/"} else unquote(request_path.lstrip("/"))
        candidate = (ROOT_DIR / requested).resolve()
        if ROOT_DIR not in candidate.parents and candidate != ROOT_DIR:
            raise FileNotFoundError(requested)
        if not candidate.exists() or not candidate.is_file():
            raise FileNotFoundError(requested)

        mime_type, _ = mimetypes.guess_type(str(candidate))
        payload = candidate.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", mime_type or "application/octet-stream")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def handle_api(self, method: str, path: str, query: dict[str, list[str]]) -> None:
        locale = normalize_locale(query.get("locale", query.get("lang", ["uz"]))[0])
        segments = [segment for segment in path.split("/") if segment]

        if segments == ["api", "health"] and method == "GET":
            self.respond({"ok": True, "service": "portal-backend", "time": utcnow_iso(), "db_path": str(DB_PATH)})
            return

        if segments == ["api", "locales"] and method == "GET":
            settings = get_site_settings(DB_PATH, locale)
            self.respond({"ok": True, "data": {"locales": settings["locales"], "default_locale": settings["default_locale"]}})
            return

        if segments == ["api", "site-settings"] and method == "GET":
            settings = get_site_settings(DB_PATH, locale)
            self.respond({"ok": True, "data": settings})
            return

        if segments == ["api", "navigation"] and method == "GET":
            settings = get_site_settings(DB_PATH, locale)
            self.respond({"ok": True, "data": settings["navigation"]})
            return

        if segments == ["api", "home"] and method == "GET":
            self.respond({"ok": True, "data": get_home_payload(DB_PATH, locale)})
            return

        if segments == ["api", "about"] and method == "GET":
            self.respond({"ok": True, "data": get_about_page(DB_PATH, locale)})
            return

        if segments == ["api", "organization"] and method == "GET":
            self.respond({"ok": True, "data": get_organization_payload(DB_PATH, locale)})
            return

        if segments == ["api", "contacts"] and method == "GET":
            self.respond({"ok": True, "data": get_contacts_payload(DB_PATH, locale)})
            return

        if len(segments) == 3 and segments[0] == "api" and segments[1] == "legal" and method == "GET":
            legal_pages = get_legal_pages(DB_PATH, locale)
            page_key = segments[2]
            page = legal_pages.get(page_key)
            if not page:
                raise FileNotFoundError(page_key)
            self.respond({"ok": True, "data": page})
            return

        if segments == ["api", "news"] and method == "GET":
            items = list_news(
                DB_PATH,
                locale,
                category=query.get("category", [""])[0],
                query=query.get("q", [""])[0],
                limit=int(query.get("limit", ["100"])[0]),
                offset=int(query.get("offset", ["0"])[0]),
            )
            self.respond({"ok": True, "count": len(items), "data": items})
            return

        if segments == ["api", "events"] and method == "GET":
            items = list_news(
                DB_PATH,
                locale,
                category=query.get("category", [""])[0],
                query=query.get("q", [""])[0],
                limit=int(query.get("limit", ["100"])[0]),
                offset=int(query.get("offset", ["0"])[0]),
            )
            self.respond({"ok": True, "count": len(items), "data": items})
            return

        if len(segments) == 3 and segments[:2] in (["api", "news"], ["api", "events"]) and method == "GET":
            item = get_item(DB_PATH, "news", segments[2], locale)
            if not item:
                raise FileNotFoundError(segments[2])
            self.respond({"ok": True, "data": item})
            return

        if segments == ["api", "documents"] and method == "GET":
            items = list_documents(
                DB_PATH,
                locale,
                item_type=query.get("type", [""])[0],
                query=query.get("q", [""])[0],
                limit=int(query.get("limit", ["100"])[0]),
                offset=int(query.get("offset", ["0"])[0]),
            )
            self.respond({"ok": True, "count": len(items), "data": items})
            return

        if len(segments) == 3 and segments[:2] == ["api", "documents"] and method == "GET":
            item = get_item(DB_PATH, "document", segments[2], locale)
            if not item:
                raise FileNotFoundError(segments[2])
            self.respond({"ok": True, "data": item})
            return

        if segments == ["api", "media"] and method == "GET":
            items = list_albums(
                DB_PATH,
                locale,
                item_type=query.get("type", [""])[0],
                query=query.get("q", [""])[0],
                limit=int(query.get("limit", ["100"])[0]),
                offset=int(query.get("offset", ["0"])[0]),
            )
            self.respond({"ok": True, "count": len(items), "data": items})
            return

        if len(segments) == 3 and segments[:2] == ["api", "media"] and method == "GET":
            item = get_item(DB_PATH, "album", segments[2], locale)
            if not item:
                raise FileNotFoundError(segments[2])
            self.respond({"ok": True, "data": item})
            return

        if segments == ["api", "search"] and method == "GET":
            search_query = query.get("q", [""])[0].strip()
            data = search_content(DB_PATH, locale, search_query, limit=int(query.get("limit", ["20"])[0]))
            self.respond({"ok": True, "query": search_query, "count": len(data), "data": data})
            return

        if segments == ["api", "contact"] and method == "POST":
            ip_address = self.client_address[0]
            if not check_rate_limit(ip_address):
                self.respond({"ok": False, "error": "Rate limit exceeded. Please try again later."}, status=429)
                return
            payload = validate_contact_payload(parse_json_body(self))
            submission = create_submission(DB_PATH, payload, ip_address)
            self.respond(
                {
                    "ok": True,
                    "message": "Contact submission accepted and stored by backend.",
                    "data": submission,
                },
                status=201,
            )
            return

        if segments == ["api", "revalidate"] and method == "POST":
            self.respond(
                {
                    "ok": True,
                    "message": "Revalidation placeholder acknowledged. Production ISR should be wired in the Next.js phase.",
                    "time": utcnow_iso(),
                }
            )
            return

        if segments == ["api", "admin", "submissions"] and method == "GET":
            self.require_admin()
            items = list_submissions(DB_PATH, limit=int(query.get("limit", ["100"])[0]))
            self.respond({"ok": True, "count": len(items), "data": items})
            return

        if segments == ["api", "admin", "content"] and method == "GET":
            self.require_admin()
            kind = normalize_kind(query.get("kind", [""])[0])
            if not kind:
                raise ValueError("kind query parameter is required")
            items = list_admin_content(DB_PATH, kind, limit=int(query.get("limit", ["200"])[0]))
            self.respond({"ok": True, "count": len(items), "data": items})
            return

        if segments == ["api", "admin", "content"] and method == "POST":
            self.require_admin()
            raw_payload = parse_json_body(self)
            kind = normalize_kind(str(raw_payload.get("kind", "")))
            slug = str(raw_payload.get("slug", "")).strip()
            if not kind:
                raise ValueError("kind is required")
            if not is_valid_slug(slug):
                raise ValueError("slug must contain only lowercase letters, numbers and hyphens")
            item = upsert_content(DB_PATH, kind, slug, validate_admin_payload(raw_payload))
            self.respond({"ok": True, "data": item}, status=201)
            return

        if len(segments) == 5 and segments[:3] == ["api", "admin", "content"] and method in {"PUT", "DELETE"}:
            self.require_admin()
            kind = normalize_kind(segments[3])
            slug = segments[4]
            if not kind:
                raise ValueError("Unknown content kind")
            if not is_valid_slug(slug):
                raise ValueError("Invalid slug")

            if method == "PUT":
                item = upsert_content(DB_PATH, kind, slug, validate_admin_payload(parse_json_body(self)))
                self.respond({"ok": True, "data": item})
                return

            deleted = delete_content(DB_PATH, kind, slug)
            if not deleted:
                raise FileNotFoundError(slug)
            self.respond({"ok": True, "deleted": True, "kind": kind, "slug": slug})
            return

        raise FileNotFoundError(path)


def create_server(host: str = HOST, port: int = PORT) -> ThreadingHTTPServer:
    init_db(DB_PATH)
    return ThreadingHTTPServer((host, port), PortalHandler)


def main() -> None:
    server = create_server(HOST, PORT)
    print(f"Portal backend is running on http://{HOST}:{PORT}")
    print(f"Database path: {DB_PATH}")
    print("Use header X-Admin-Token for admin endpoints.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
