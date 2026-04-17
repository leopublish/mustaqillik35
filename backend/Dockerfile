FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=config.settings.prod

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libpq-dev curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements/ requirements/
RUN pip install --upgrade pip && pip install -r requirements/prod.txt

COPY . .

# Collect static files (use dummy key so the command doesn't fail at build time)
RUN DJANGO_SECRET_KEY=build-only DJANGO_ALLOWED_HOSTS=localhost \
    python manage.py collectstatic --noinput

EXPOSE 8000

# Railway injects $PORT; fall back to 8000 locally
CMD gunicorn config.wsgi:application \
    --bind 0.0.0.0:${PORT:-8000} \
    --workers 2 \
    --timeout 120 \
    --access-logfile -
