# Backend Quickstart

## Run the backend

```powershell
python backend/server.py
```

## Open in browser

- `http://127.0.0.1:8000/`
- `http://127.0.0.1:8000/api/health`

## Admin token

Default token:

```text
change-me
```

Send it in header:

```text
X-Admin-Token: change-me
```

## Smoke test

```powershell
python backend/smoke_test.py
```
