# 04. Backlog — roadmap реализации

## Этап 0. Discovery и setup
### Задачи
- финализировать структуру проекта;
- утвердить стек;
- зафиксировать дизайн-направление;
- подготовить репозиторий;
- настроить монорепо;
- настроить prettier/eslint/tsconfig;
- подготовить docker-compose;
- настроить environments: local / staging / production.

### Deliverables
- рабочий репозиторий;
- базовая инфраструктура;
- стартовый README.

---

## Этап 1. CMS foundation
### Задачи
- развернуть Strapi;
- подключить PostgreSQL;
- настроить i18n;
- реализовать content types;
- реализовать reusable components;
- настроить media upload provider;
- создать seed settings;
- настроить roles and permissions.

### Acceptance
- все сущности создаются и редактируются;
- доступна локализация;
- работает загрузка медиа;
- можно создавать тестовый контент.

---

## Этап 2. Web foundation
### Задачи
- развернуть Next.js app;
- настроить App Router;
- настроить Tailwind;
- собрать базовый layout;
- подключить i18n routing;
- реализовать Header/Footer;
- реализовать theme tokens;
- реализовать базовые UI-компоненты.

### Acceptance
- сайт открывается на 3 языках;
- работает базовая навигация;
- layout адаптивен.

---

## Этап 3. Data layer
### Задачи
- реализовать Strapi client;
- реализовать typed DTOs;
- добавить мапперы;
- собрать сервисы загрузки данных;
- добавить error handling;
- добавить fallback policies.

### Acceptance
- web корректно получает данные из CMS;
- пустые/ошибочные ответы не ломают UI.

---

## Этап 4. Homepage
### Задачи
- реализовать HomePage template;
- hero block;
- featured news;
- featured events;
- documents preview;
- media preview;
- quote/mission;
- contacts preview.

### Acceptance
- главная страница полностью собирается из CMS;
- все блоки адаптивны;
- SEO выставляется.

---

## Этап 5. Static pages / About
### Задачи
- реализовать StaticPage template;
- dynamic blocks renderer;
- about routes;
- support for rich content blocks;
- related content module.

### Acceptance
- контентные страницы создаются без разработки новых шаблонов.

---

## Этап 6. News module
### Задачи
- NewsListPage;
- NewsDetailPage;
- filters/pagination;
- related news;
- share links;
- seo metadata.

### Acceptance
- можно просматривать список, открывать новость, фильтровать, листать страницы.

---

## Этап 7. Events module
### Задачи
- EventListPage;
- EventDetailPage;
- date/type filters;
- relation to media/documents;
- past/upcoming logic.

### Acceptance
- события корректно показываются списком и детально;
- фильтры работают.

---

## Этап 8. Documents module
### Задачи
- DocumentListPage;
- DocumentDetailPage;
- file download action;
- filters by type/date;
- document card UI.

### Acceptance
- документы удобно искать и скачивать;
- карточки содержат все обязательные метаданные.

---

## Этап 9. Media module
### Задачи
- Media hub;
- Photo galleries;
- Video list;
- lightbox / modal viewer;
- relation to events.

### Acceptance
- фото и видео доступны;
- галереи работают на мобильных и desktop.

---

## Этап 10. Contacts
### Задачи
- ContactInfo page;
- contact form UI;
- validation;
- API route for submission;
- anti-spam;
- external official appeal CTA.

### Acceptance
- форма успешно отправляется;
- данные попадают в CMS/DB;
- внешний сервис корректно открывается.

---

## Этап 11. Search
### Задачи
- search page;
- query input;
- search service;
- search result cards;
- empty state;
- optional filters.

### Acceptance
- поиск находит минимум pages/news/events/documents/media.

---

## Этап 12. SEO / system pages
### Задачи
- robots;
- sitemap;
- hreflang;
- metadata builder;
- 404/500 pages;
- privacy/terms/accessibility pages.

### Acceptance
- поисковые системы получают корректную структуру;
- служебные страницы существуют.

---

## Этап 13. Analytics / observability
### Задачи
- analytics integration;
- track form submit;
- track document downloads;
- basic error logging;
- health endpoint.

### Acceptance
- основные события доступны в аналитике.

---

## Этап 14. QA & hardening
### Задачи
- responsive QA;
- content QA;
- performance QA;
- accessibility QA;
- smoke tests;
- regression pass.

### Acceptance
- нет критических визуальных дефектов;
- все страницы работают на целевых устройствах;
- нет блокирующих ошибок.

---

## Этап 15. Deployment
### Задачи
- staging deploy;
- production deploy;
- ssl setup;
- backup setup;
- final smoke check;
- launch checklist.

### Acceptance
- production environment стабилен;
- есть rollback и backup policy.

---

## Post-launch
### Задачи
- контентная поддержка;
- аналитика и улучшения;
- phase 2 features;
- performance optimization;
- search refinement.

---

## Приоритеты
### P0
- infra
- CMS schemas
- homepage
- static pages
- news
- events
- documents
- contacts
- locales
- SEO basics

### P1
- media hub
- search
- analytics
- stronger a11y

### P2
- timeline
- map
- advanced archive
- newsletter
- public API

---

## Риски проекта
1. Слишком общий контент без редакционной модели.
2. Жёстко зашитые блоки на frontend.
3. Переусложнение MVP.
4. Некачественная локализация.
5. Отсутствие контентных fallback-стратегий.
6. Медиа без оптимизации.
7. Формы без защиты от спама.

---

## Рекомендация по порядку для Codex
1. Scaffold monorepo.
2. Setup Strapi schemas.
3. Setup Next.js layout and locales.
4. Implement typed data layer.
5. Build homepage.
6. Build news/events/documents.
7. Add contacts/search/SEO.
8. Polish and test.