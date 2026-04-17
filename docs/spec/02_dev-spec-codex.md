# 02. Dev Spec for Codex — техническая спецификация

## 1. Цель документа
Этот документ превращает бизнес-ТЗ в конкретные технические требования для реализации сайта. Его задача — убрать неоднозначность, чтобы AI и разработчики не принимали архитектурные решения наугад.

---

## 2. Архитектурное решение
## 2.1. Предлагаемый стек
### Frontend
- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui или собственный набор базовых UI-компонентов
- next-intl или i18n-решение для App Router
- React Hook Form + Zod
- TanStack Query только там, где это действительно нужно
- server components по умолчанию
- client components только для интерактивных зон

### Backend / CMS
- Strapi
- PostgreSQL
- S3-compatible storage для медиа
- локализация на уровне сущностей
- role-based admin (хотя в MVP активен один администратор)

### Infra
- Docker / docker-compose для локальной разработки
- Nginx как reverse proxy
- отдельные сервисы web/cms/db/storage
- CI/CD pipeline
- CDN для медиа
- SSL

---

## 3. Монорепо / структура проекта
Рекомендуемая структура:

```txt
/apps
  /web
  /cms

/apps/web
  /src
    /app
      /[locale]
      /api
    /components
      /ui
      /layout
      /sections
      /cards
      /forms
      /media
      /documents
      /search
    /features
      /home
      /about
      /news
      /events
      /documents
      /media
      /contacts
      /search
    /lib
    /services
    /types
    /utils
    /hooks
    /styles
    /config
    /constants

/apps/cms
  /config
  /src
    /api
    /components
    /extensions
  /database
  /types
```

---

## 4. Правила кодовой базы
1. TypeScript everywhere.
2. `any` запрещён, кроме очень редких технически обоснованных случаев.
3. Контент не хардкодить.
4. Все публичные тексты, заголовки и карточки тянуть из CMS или i18n-слоёв.
5. Все API-вызовы должны быть централизованы.
6. Валидация данных обязательна.
7. Использовать строгий naming convention.
8. Компоненты должны быть переиспользуемыми.
9. Дизайн должен собираться из section-based компонентов, а не из монолитных страниц.
10. Все страницы должны иметь SEO-метаданные.
11. Все изображения должны проходить через единый media helper.
12. Избегать лишних client components.

---

## 5. Архитектурные слои frontend
### 5.1. app
Роутинг и server-side entry points.

### 5.2. features
Бизнес-функции по доменам: news, events, documents, media, contacts.

### 5.3. components
UI-компоненты, layout-компоненты, карточки, формы, секции.

### 5.4. services
Клиенты для CMS/API и функции загрузки данных.

### 5.5. lib
Утилиты инфраструктурного уровня, конфиг, SEO builder, helpers.

### 5.6. types
Типы API, DTO, entity types, form types.

---

## 6. Routing
### 6.1. Публичные маршруты
- `/`
- `/{locale}`
- `/{locale}/about`
- `/{locale}/about/:slug`
- `/{locale}/news`
- `/{locale}/news/:slug`
- `/{locale}/events`
- `/{locale}/events/:slug`
- `/{locale}/documents`
- `/{locale}/documents/:slug`
- `/{locale}/media`
- `/{locale}/media/photos`
- `/{locale}/media/videos`
- `/{locale}/media/:slug`
- `/{locale}/contacts`
- `/{locale}/search`
- `/{locale}/privacy-policy`
- `/{locale}/terms`
- `/{locale}/accessibility`
- `/{locale}/sitemap`

### 6.2. Служебные маршруты
- `/api/revalidate`
- `/api/contact`
- `/api/health`

---

## 7. Модель получения данных
### 7.1. Главный принцип
Frontend получает данные из CMS по типизированным service-функциям.

### 7.2. Рекомендуемый подход
- серверные функции `getHomePage`, `getNewsList`, `getNewsBySlug`, etc.;
- централизованный Strapi client;
- нормализаторы ответов;
- единый слой mapping `CMS -> Frontend DTO`.

### 7.3. Почему
Так уменьшается связность и упрощается будущее изменение CMS.

---

## 8. Стратегия рендеринга
### 8.1. SSR / ISR
Использовать SSR/ISR для публичных контентных страниц.

### 8.2. SSG
Допустим для:
- статических служебных страниц;
- некоторых редко меняемых страниц.

### 8.3. Динамические client-зоны
Допустимы только для:
- search UI;
- media lightbox;
- mobile menu;
- form validation UX;
- filters UI.

---

## 9. Страницы и секции
## 9.1. HomePage
Секции:
- HeroSection
- IntroSection
- FeaturedNewsSection
- FeaturedEventsSection
- ImportantDocumentsSection
- MediaPreviewSection
- QuoteOrMissionSection
- CTASection
- ContactsPreviewSection

## 9.2. About pages
Секции:
- page hero
- breadcrumb
- rich content blocks
- image blocks
- timeline/stat blocks (optional)
- related materials

## 9.3. List pages
Секции:
- page hero
- filters
- result summary
- card grid/list
- pagination

## 9.4. Detail pages
Секции:
- hero / cover
- meta line
- main content
- gallery
- downloadable files
- related content
- share block
- back navigation

---

## 10. Content-block system
Для статических и rich pages поддержать гибкий блоковый конструктор:

- hero
- richText
- image
- imageGallery
- quote
- stats
- cardsGrid
- CTA
- accordion
- tabs
- timeline
- documentList
- embedVideo
- highlightBox

Каждый блок должен иметь:
- `id`
- `type`
- `locale`
- `sortOrder`
- `visibility`
- `payload`

---

## 11. UI library / design system
### 11.1. Базовые компоненты
- Button
- IconButton
- Input
- Textarea
- Select
- Checkbox
- Radio
- Tabs
- Accordion
- Modal
- Drawer
- Breadcrumbs
- Pagination
- Badge
- Tag
- Card
- SectionHeader
- EmptyState
- SearchInput

### 11.2. Layout components
- Container
- Grid
- Header
- Footer
- MainNav
- LocaleSwitcher
- SearchBar
- MobileMenu
- Section
- PageHero

---

## 12. Search
### 12.1. MVP вариант
Серверный поиск через CMS/API по нескольким типам сущностей.

### 12.2. Источники поиска
- pages
- news
- events
- documents
- media

### 12.3. Поля поиска
- title
- shortDescription
- content excerpt
- tags
- category name

### 12.4. Интерфейс выдачи
Каждый результат должен иметь:
- title
- type
- date
- snippet
- cover / icon
- URL

---

## 13. Forms
### 13.1. Контактная форма
Поля:
- name
- phone (optional)
- email
- subject
- message
- consent checkbox

### 13.2. Валидация
- Zod schema;
- server-side validation;
- anti-spam;
- rate limiting.

### 13.3. Поведение
- сохранение в CMS/DB;
- success message;
- graceful error states.

---

## 14. SEO implementation
### 14.1. Per-page metadata
У каждой страницы и сущности должны быть:
- seoTitle
- seoDescription
- ogImage
- canonical
- noindex (optional)

### 14.2. Системные SEO-функции
- metadata builder
- hreflang builder
- sitemap generator
- robots config
- open graph defaults

---

## 15. Image/media pipeline
### 15.1. Поддерживаемые типы
- jpg
- jpeg
- png
- webp
- svg (ограниченно, проверенно)
- mp4
- pdf

### 15.2. Требования
- responsive images
- lazy loading
- alt text required
- thumbnails
- compression
- fallback images

---

## 16. Accessibility
Обязательные требования:
- корректная heading hierarchy;
- aria labels для интерактивных элементов;
- keyboard navigation;
- visible focus states;
- достаточная контрастность;
- form error association;
- alt у всех осмысленных изображений.

---

## 17. Error handling
- 404 page
- 500 page
- fallback UI на пустые списки
- fallback UI на отсутствие перевода
- safe rendering при неполных данных CMS

---

## 18. Logging and observability
- health endpoint
- structured logs
- request error logging
- form submission logging
- optional CMS audit trail

---

## 19. Security
- HTTP security headers
- CSP where possible
- form spam protection
- file upload validation
- auth hardening for CMS
- environment variable isolation
- no sensitive keys in frontend bundle

---

## 20. Performance targets
- хорошая загрузка на mobile;
- hero optimized;
- image optimization;
- limited bundle size;
- minimal JS hydration.

---

## 21. CI/CD
Минимально:
- lint
- typecheck
- build
- tests (smoke + critical)
- deploy web
- deploy cms
- migrate DB
- rollback plan

---

## 22. Testing
### 22.1. Unit
helpers, validators, formatters

### 22.2. Integration
CMS services, API routes, forms

### 22.3. E2E
- home page load
- locale switching
- search flow
- open detail page
- submit contact form
- download document
- mobile nav

---

## 23. Recommended dependencies
### Web
- next
- react
- typescript
- tailwindcss
- zod
- react-hook-form
- clsx
- class-variance-authority
- next-intl
- lucide-react

### CMS
- strapi
- postgres driver
- upload provider
- i18n plugin

---

## 24. Deployment assumptions
- отдельный frontend домен/subdomain
- отдельный CMS admin URL
- media storage outside app container
- backups daily
- staging environment required

---

## 25. Final engineering rule
Если в Master Spec и этом документе есть конфликт, приоритет такой:
1. Явно согласованные product decisions
2. `02_dev-spec-codex.md`
3. `01_master-spec.md`
4. разумное инженерное решение без отступления от концепции