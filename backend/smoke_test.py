from __future__ import annotations

import json
import threading
import urllib.request

from server import ADMIN_TOKEN, create_server


def request_json(url: str, *, method: str = "GET", data: dict | None = None, headers: dict | None = None) -> dict:
    payload = None if data is None else json.dumps(data).encode("utf-8")
    request = urllib.request.Request(url, data=payload, method=method)
    for key, value in (headers or {}).items():
        request.add_header(key, value)
    if payload is not None:
        request.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(request, timeout=10) as response:
        return json.loads(response.read().decode("utf-8"))


def main() -> None:
    server = create_server("127.0.0.1", 0)
    port = server.server_address[1]
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    try:
        health = request_json(f"http://127.0.0.1:{port}/api/health")
        home = request_json(f"http://127.0.0.1:{port}/api/home?locale=ru")
        news = request_json(f"http://127.0.0.1:{port}/api/news?locale=en&limit=2")
        search = request_json(f"http://127.0.0.1:{port}/api/search?q=forum&locale=en")
        contact = request_json(
            f"http://127.0.0.1:{port}/api/contact",
            method="POST",
            data={
                "name": "Smoke Test",
                "email": "smoke@example.com",
                "phone": "+998000000000",
                "topic": "general",
                "subject": "Smoke",
                "message": "Smoke test submission",
                "consent": True,
                "locale": "en",
            },
        )
        admin = request_json(
            f"http://127.0.0.1:{port}/api/admin/content?kind=news&limit=2",
            headers={"X-Admin-Token": ADMIN_TOKEN},
        )

        print("health:", health["ok"])
        print("home title:", home["data"]["site"]["title"])
        print("news count:", news["count"])
        print("search count:", search["count"])
        print("contact stored:", contact["ok"])
        print("admin count:", admin["count"])
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=5)


if __name__ == "__main__":
    main()
