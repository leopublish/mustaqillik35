# Backend

Zero-dependency Python backend for the anniversary portal.

## What it provides

- SQLite storage with seed content
- REST API for home, about, news, documents, media, organization, contacts and search
- `POST /api/contact` for storing public submissions
- Admin endpoints protected by `X-Admin-Token`
- Static file serving for the portal frontend from the project root

## Run

```powershell
python backend/server.py
```

Then open:

- `http://127.0.0.1:8000/`
- `http://127.0.0.1:8000/api/health`

## Environment variables

- `PORTAL_HOST`
- `PORTAL_PORT`
- `PORTAL_DB_PATH`
- `PORTAL_ADMIN_TOKEN`

By default, SQLite is created in the system temp directory so the backend works reliably in synced folders like OneDrive.

## Main API routes

- `GET /api/health`
- `GET /api/site-settings`
- `GET /api/home`
- `GET /api/about`
- `GET /api/news`
- `GET /api/news/<slug>`
- `GET /api/documents`
- `GET /api/documents/<slug>`
- `GET /api/media`
- `GET /api/media/<slug>`
- `GET /api/organization`
- `GET /api/contacts`
- `GET /api/search?q=...`
- `POST /api/contact`
- `POST /api/revalidate`

## Admin API

Send header:

```text
X-Admin-Token: change-me
```

Routes:

- `GET /api/admin/content?kind=news`
- `POST /api/admin/content`
- `PUT /api/admin/content/<kind>/<slug>`
- `DELETE /api/admin/content/<kind>/<slug>`
- `GET /api/admin/submissions`

## Smoke test

```powershell
python backend/smoke_test.py
```
