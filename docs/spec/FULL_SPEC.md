# Пакет спецификаций для портала «35 лет независимости Узбекистана»

Этот пакет подготовлен как полный комплект документов для запуска разработки через Codex / Cursor / dev-команду.

## Состав пакета
1. `01_master-spec.md` — бизнес- и продуктовая спецификация.
2. `02_dev-spec-codex.md` — техническая спецификация для разработки frontend/backend.
3. `03_cms-schema-strapi.md` — модель данных и структура CMS.
4. `04_backlog.md` — детальный backlog по этапам реализации.
5. `05_prompt-for-codex.md` — готовый production-level prompt для Codex.
6. `.env.example` — рекомендуемый набор переменных окружения.
7. `routes-map.json` — карта роутов сайта.
8. `acceptance-checklist.md` — чек-лист приёмки.

## Как использовать
1. Сначала прочитать `01_master-spec.md`.
2. Затем передать Codex файлы `02_dev-spec-codex.md`, `03_cms-schema-strapi.md`, `routes-map.json`, `.env.example`.
3. После этого использовать `05_prompt-for-codex.md` как стартовый prompt.
4. Разработку вести по `04_backlog.md`.
5. При сдаче сверять результат по `acceptance-checklist.md`.

## Ключевая идея
Это не лендинг, а **официальный контентный портал** в премиальном государственном стиле, вдохновлённый логикой president.uz, но без прямого копирования. Портал должен быть масштабируемым, мультиязычным и удобным для редакционного обновления.

---

# 01. Master Spec — портал «O‘zbekiston mustaqilligining 35 yilligi»

## 1. Назначение документа
Настоящий документ фиксирует полную продуктовую и бизнес-спецификацию официального мультиязычного портала, посвящённого проекту **35-летия независимости Республики Узбекистан**. Документ является главным источником требований для дизайна, frontend, backend, CMS и QA.

---

## 2. Общая концепция
Сайт создаётся как официальный информационно-имиджевый портал проекта. Его задача — представить идею юбилейного года, государственные программы, мероприятия, документы, медиа-материалы и официальные контакты в единой цифровой системе.

Портал должен:
- выглядеть официально, статусно и современно;
- визуально восприниматься как государственный премиальный ресурс;
- быть удобным для чтения длинных текстов, новостей, документов и медиа;
- поддерживать редакционное обновление без привлечения разработчика;
- корректно работать на uz / ru / en;
- быть построен так, чтобы масштабироваться в архивный портал после юбилейного года.

---

## 3. Цели проекта
### 3.1. Бизнес-цели
- сформировать единый официальный цифровой источник информации о проекте;
- повысить доверие за счёт понятной структуры, официального дизайна и прозрачности;
- упростить доступ к программам, событиям, документам и медиа;
- централизовать контент и исключить информационный хаос;
- обеспечить основу для будущего архива материалов проекта.

### 3.2. Коммуникационные цели
- объяснить идею и значение 35-летия независимости;
- показать достижения страны, ценности независимости и вектор развития;
- освещать мероприятия, инициативы, конкурсы, выставки, форумы, публикации;
- предоставить обществу и СМИ удобную площадку для получения официальной информации.

### 3.3. Технические цели
- обеспечить быструю публикацию контента через CMS;
- реализовать удобный поиск и фильтрацию;
- обеспечить высокую производительность и адаптивность;
- подготовить архитектуру для роста объёма контента.

---

## 4. Основные принципы проекта
1. **Официальность без визуальной тяжести** — сайт должен быть серьёзным, но не устаревшим.
2. **Content-first** — контент первичен, визуальные решения служат контенту.
3. **Scalable by design** — структура изначально рассчитана на расширение.
4. **CMS-driven** — все ключевые тексты, карточки, галереи и документы управляются через админку.
5. **Multilingual by default** — uz / ru / en обязательны на уровне архитектуры.
6. **No hardcoded content** — важный контент не должен быть зашит в frontend.
7. **Accessible and searchable** — удобство чтения, поиска, доступности и навигации обязательно.
8. **Reference-inspired, not cloned** — референс president.uz используется как логика структуры, а не как объект копирования.

---

## 5. Целевая аудитория
### 5.1. Основные группы
- жители Узбекистана;
- представители госорганов и ведомств;
- СМИ и редакции;
- международные партнёры и делегации;
- исследователи, преподаватели, студенты;
- организаторы мероприятий проекта;
- граждане, ищущие официальную информацию.

### 5.2. Поведенческие сценарии пользователей
- быстро узнать, что представляет собой проект;
- открыть последние новости и события;
- найти официальный документ;
- посмотреть медиаматериалы по мероприятию;
- получить контакты или отправить общий запрос;
- использовать сайт как официальный источник при подготовке публикаций.

---

## 6. Формат проекта
Тип сайта: **официальный государственный контентный портал**.

Не является:
- интернет-магазином;
- личным кабинетом;
- CRM/ERP системой;
- лендингом на 1 страницу;
- системой приёма юридически значимых обращений.

---

## 7. Роли пользователей
### 7.1. Публичный пользователь
Может:
- просматривать страницы и списки материалов;
- использовать поиск и фильтры;
- скачивать документы;
- просматривать фото и видео;
- отправлять общую контактную форму;
- переходить на внешний официальный сервис обращений.

### 7.2. Администратор CMS
На первом этапе одна роль:
- управляет всеми сущностями;
- создаёт, редактирует, публикует и архивирует материалы;
- загружает изображения, видео, документы;
- управляет SEO полями;
- меняет меню, статические блоки и контакты;
- видит входящие сообщения формы.

### 7.3. Возможные будущие роли (заложить архитектурно)
- редактор;
- модератор контента;
- переводчик;
- наблюдатель/аналитик.

---

## 8. Информационная архитектура сайта

### 8.1. Верхнеуровневые разделы
1. Главная
2. О проекте
3. События
4. Документы
5. Медиатека
6. Контакты

### 8.2. Рекомендуемая подробная структура
#### Главная
- hero-блок проекта;
- краткая миссия проекта;
- ключевые новости;
- ближайшие/главные события;
- важные документы;
- фотогалерея / видеоблок;
- цитата / идеологический блок;
- CTA на все разделы;
- партнёры / организаторы (если требуется);
- блок обращения / контактов.

#### О проекте
- О проекте
- Значение 35-летия независимости
- Цели и задачи
- Основные направления
- Организационный комитет / структура
- Символика / фирменный стиль (опционально)
- FAQ (опционально)

#### События
- Все события
- Новости
- Анонсы
- Прошедшие мероприятия
- Речи / выступления / приветствия (если нужно отдельной рубрикой)
- Региональные мероприятия (если потребуется)
- Фильтры по дате, формату, категории

#### Документы
- Нормативные документы
- Программы
- Планы мероприятий
- Концепции
- Постановления / распоряжения
- Методические материалы
- Для скачивания / PDF архив

#### Медиатека
- Фото
- Видео
- Альбомы по событиям
- Ролики / обращения
- Пресс-материалы / бренд-материалы (опционально)

#### Контакты
- контактная информация;
- карта / адрес;
- контакты пресс-службы или оргкомитета;
- форма общего обращения;
- отдельная кнопка на внешний официальный сервис формализованных обращений.

---

## 9. Обоснованное решение по форме обращения
На сайте должно быть два канала связи:

### 9.1. Внутренняя форма
Используется для:
- общих вопросов;
- предложений;
- информационных запросов;
- технической обратной связи.

### 9.2. Внешний официальный сервис
Используется для:
- формальных официальных обращений;
- юридически значимых запросов;
- обращений, требующих отдельного процессинга и статусов.

### 9.3. Почему это лучше
- сайт остаётся лёгким и удобным;
- не нужно строить сложную внутреннюю систему регистрации юридически значимых обращений;
- уменьшаются юридические и технические риски;
- модель соответствует логике официальных государственных ресурсов.

---

## 10. Требования к визуальному стилю
### 10.1. Общий стиль
- премиальный официальный стиль;
- чистая типографика;
- светлая основа;
- глубокие акцентные цвета;
- много воздуха и аккуратных отступов;
- современная сетка;
- крупные статусные hero-блоки;
- качественная работа с фотографией и документами.

### 10.2. Визуальные ассоциации
Дизайн должен ассоциироваться с:
- государственным статусом;
- устойчивостью;
- уважением к истории;
- современным развитием;
- цифровой зрелостью.

### 10.3. Что недопустимо
- перегруженные баннеры;
- дешёвые эффекты;
- случайная анимация;
- пёстрая палитра;
- большое количество мелких декоративных иконок;
- ощущение коммерческого лендинга.

---

## 11. Базовая UI-модель
### 11.1. Header
- логотип/эмблема проекта;
- название проекта;
- верхнее меню;
- переключатель языков;
- поиск;
- кнопка открытия mobile menu.

### 11.2. Footer
- карта разделов;
- контакты;
- ссылки на соцсети;
- копирайт;
- служебные ссылки;
- при необходимости — ссылка на внешний сервис обращений.

### 11.3. Общие компоненты
- breadcrumbs;
- cards;
- date labels;
- section headers;
- sliders/carousels;
- CTA buttons;
- tabs/accordions;
- document cards;
- media lightbox;
- search results item;
- pagination.

---

## 12. Шаблоны страниц
1. HomePage
2. StaticPage
3. AboutProjectPage
4. NewsListPage
5. NewsDetailPage
6. EventListPage
7. EventDetailPage
8. DocumentListPage
9. DocumentDetailPage
10. MediaHubPage
11. PhotoGalleryPage
12. VideoGalleryPage
13. SearchResultsPage
14. ContactsPage
15. PrivacyPage
16. TermsPage
17. AccessibilityPage
18. SitemapPage
19. Error404Page
20. Error500Page

---

## 13. Функциональные требования

### 13.1. Главная страница
Обязательные блоки:
- hero с ключевым позиционированием;
- последние новости;
- ключевые события;
- блок официальных документов;
- медиатека;
- смысловой/цитатный блок;
- CTA к разделам;
- контакты / форма / внешний сервис.

### 13.2. Новости и события
- список карточек;
- сортировка по дате;
- фильтр по категории;
- пагинация;
- дата публикации;
- изображения превью;
- переход на детальную страницу;
- блок похожих материалов;
- share links.

### 13.3. Документы
- карточка документа с типом, датой, номером;
- просмотр детальной карточки;
- скачивание файла;
- фильтры по типу и дате;
- поиск по названию и краткому описанию.

### 13.4. Медиатека
- фотоальбомы;
- видеоматериалы;
- превью;
- просмотр в lightbox/modal;
- связь с событиями;
- фильтрация по типу контента.

### 13.5. Поиск
Поиск должен работать по:
- страницам;
- новостям;
- событиям;
- документам;
- медиа.

### 13.6. Контакты
- список контактов;
- адрес;
- карта;
- форма обратной связи;
- ссылки на официальные ресурсы.

---

## 14. Нефункциональные требования
### 14.1. Производительность
- быстрая загрузка ключевых страниц;
- сжатие изображений;
- lazy loading;
- кеширование;
- CDN для медиа.

### 14.2. Адаптивность
Поддержка:
- mobile 320–767;
- tablet 768–1023;
- laptop 1024–1439;
- desktop 1440+.

### 14.3. Безопасность
- HTTPS only;
- защита формы от спама;
- валидация uploads;
- защита admin panel;
- логирование административных действий;
- резервное копирование данных и медиа.

### 14.4. Доступность
- семантическая вёрстка;
- корректная heading hierarchy;
- alt для изображений;
- удобство навигации с клавиатуры;
- контрастность;
- заметные focus states.

---

## 15. Мультиязычность
Поддерживаемые языки:
- uz
- ru
- en

### 15.1. Требования
- язык по умолчанию: uz;
- ручное переключение доступно на всех страницах;
- контент редактируется по локалям;
- SEO поля тоже локализуются;
- fallback на непереведённый контент не должен приводить к поломанной странице.

### 15.2. Правило публикации
Материал может быть опубликован:
- либо сразу на всех языках;
- либо частично, если CMS позволяет явно видеть статус локализации.

---

## 16. SEO
Обязательные требования:
- meta title;
- meta description;
- open graph image;
- canonical;
- hreflang;
- sitemap.xml;
- robots.txt;
- clean URLs;
- SSR/ISR для публичных страниц;
- alt text;
- breadcrumbs markup.

---

## 17. Аналитика
Добавить:
- web analytics;
- search console;
- события на отправку формы;
- клики по важным CTA;
- скачивания документов;
- просмотры материалов;
- базовые показатели популярности контента.

---

## 18. Контентная модель уровня продукта
Основные сущности:
- Page
- News
- Event
- Document
- Media Gallery
- Video Item
- Contact
- Menu
- Site Settings
- Form Submission

Подробно описано в `03_cms-schema-strapi.md`.

---

## 19. MVP vs Phase 2
### 19.1. MVP
- Главная
- О проекте
- Новости/события
- Документы
- Медиатека
- Контакты
- Поиск
- Мультиязычность
- SEO
- CMS
- Базовая аналитика

### 19.2. Phase 2
- интерактивный timeline;
- карта мероприятий;
- расширенный медиа-архив;
- подписка на обновления;
- расширенные фильтры;
- отдельный архив по годам/месяцам;
- публичный API.

---

## 20. Критерии успеха проекта
Проект считается успешным, если:
- пользователь за 1–2 клика понимает назначение сайта;
- новости, документы и медиа доступны без логических тупиков;
- контент удобно обновлять через CMS;
- сайт быстро загружается и читается на мобильных устройствах;
- структура масштабируется без переделки архитектуры;
- англоязычная и русскоязычная версии не выглядят вторичными.

---

## 21. Ограничения
- не строить систему официального документооборота;
- не строить личные кабинеты в MVP;
- не перегружать первую версию сложной интерактивностью;
- не использовать тяжёлые декоративные анимации;
- не копировать визуал референса буквально.

---

## 22. Итоговое решение
Рекомендуемая форма реализации:
- frontend: Next.js + TypeScript + Tailwind;
- CMS: Strapi + PostgreSQL;
- storage: S3-compatible;
- публичный сайт: SSR/ISR;
- один администратор на старте;
- официальный премиальный стиль;
- структура, вдохновлённая president.uz и адаптированная под задачу проекта 35-летия независимости.

---

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

---

# 03. CMS Schema — Strapi Content Model Spec

## 1. Общие правила моделирования
1. Все ключевые контентные сущности поддерживают локализацию.
2. У каждой публичной сущности есть:
   - title
   - slug
   - locale
   - status
   - publishedAt
   - SEO fields
3. Не использовать огромные непрозрачные JSON-поля там, где можно сделать нормализованную структуру.
4. Все изображения и файлы — через media library.
5. Все связи должны быть осмысленными и не дублировать данные без причины.

---

## 2. Collection Types

## 2.1. News
### Purpose
Новостные публикации проекта.

### Fields
- `title` — string, required, localized
- `slug` — uid from title, required, localized
- `shortDescription` — text, required, localized
- `content` — rich blocks / dynamic zone, required, localized
- `coverImage` — media image, required
- `gallery` — media multiple, optional
- `publishDate` — datetime, required
- `category` — relation many-to-one -> NewsCategory
- `tags` — relation many-to-many -> Tag
- `isFeatured` — boolean
- `relatedNews` — self relation many-to-many
- `relatedEvents` — relation many-to-many -> Event
- `attachments` — media multiple, optional
- `seo` — component SEO, localized
- `status` — enum(draft, published, archived)
- `sortOrder` — integer optional

### Notes
- Short description is used in cards and meta previews.
- `coverImage` must have alt text.

---

## 2.2. Event
### Purpose
Мероприятия, форумы, анонсы, встречи, выставки, программы.

### Fields
- `title`
- `slug`
- `shortDescription`
- `content`
- `coverImage`
- `gallery`
- `eventStartDate` — datetime
- `eventEndDate` — datetime optional
- `locationName` — string
- `locationAddress` — string optional
- `region` — relation many-to-one -> Region
- `eventType` — relation many-to-one -> EventType
- `organizer` — string localized
- `isFeatured` — boolean
- `isPast` — boolean
- `documents` — relation many-to-many -> Document
- `videos` — relation many-to-many -> VideoItem
- `photos` — relation many-to-many -> PhotoGallery
- `seo`
- `status`

---

## 2.3. Document
### Purpose
Официальные документы и файлы для скачивания.

### Fields
- `title`
- `slug`
- `shortDescription`
- `documentNumber` — string optional
- `documentDate` — date
- `documentType` — relation many-to-one -> DocumentType
- `issuingAuthority` — string localized
- `file` — media single, required
- `previewText` — text localized
- `coverImage` — optional image
- `tags` — relation many-to-many -> Tag
- `relatedEvents` — relation many-to-many -> Event
- `seo`
- `status`
- `sortOrder`

### Notes
- Must support PDF and office files if needed.
- File size and extension are validated.

---

## 2.4. StaticPage
### Purpose
Статические разделы и обычные контентные страницы.

### Fields
- `title`
- `slug`
- `pageType` — enum(home, about, simple, contacts, privacy, terms, accessibility, sitemap)
- `heroTitle` — string localized
- `heroSubtitle` — text localized
- `heroImage` — image optional
- `contentBlocks` — dynamic zone, localized
- `seo`
- `showInFooter` — boolean
- `showInHeader` — boolean
- `status`

---

## 2.5. PhotoGallery
### Purpose
Фотоальбомы по событиям и темам.

### Fields
- `title`
- `slug`
- `description`
- `coverImage`
- `photos` — media multiple required
- `galleryDate` — date
- `relatedEvent` — relation many-to-one -> Event
- `tags`
- `seo`
- `status`

---

## 2.6. VideoItem
### Purpose
Видеоматериалы.

### Fields
- `title`
- `slug`
- `description`
- `coverImage`
- `videoFile` — media single optional
- `videoUrl` — string optional
- `durationSeconds` — integer optional
- `publishDate`
- `relatedEvent`
- `tags`
- `seo`
- `status`

### Validation
At least one of `videoFile` or `videoUrl` must be present.

---

## 2.7. ContactSubmission
### Purpose
Хранение отправок общей формы связи.

### Fields
- `name` — string required
- `phone` — string optional
- `email` — email required
- `subject` — string required
- `message` — text required
- `consentAccepted` — boolean required
- `sourcePage` — string optional
- `locale` — string
- `status` — enum(new, read, processed, archived)
- `createdAt`

### Notes
Не локализуется, потому что это пользовательские данные.

---

## 2.8. ContactInfo
### Purpose
Контактные данные сайта.

### Fields
- `departmentName` — string localized
- `address` — text localized
- `phonePrimary` — string
- `phoneSecondary` — string optional
- `email` — email
- `workingHours` — text localized
- `mapEmbedUrl` — string optional
- `externalAppealUrl` — string optional
- `socialLinks` — component repeatable SocialLink

---

## 2.9. SiteSettings
### Purpose
Глобальные настройки сайта.

### Fields
- `siteName` — string localized
- `siteDescription` — text localized
- `defaultSeo` — component SEO localized
- `logo` — media single
- `favicon` — media single
- `defaultShareImage` — media single
- `headerMenu` — relation -> Menu
- `footerMenu` — relation -> Menu
- `contactInfo` — relation -> ContactInfo
- `analyticsScriptId` — string optional
- `themeVariant` — enum(official-premium)
- `supportedLocales` — json/string array
- `defaultLocale` — string
- `copyrightText` — string localized

---

## 3. Taxonomy types

## 3.1. NewsCategory
Fields:
- title
- slug
- description
- locale

## 3.2. DocumentType
Fields:
- title
- slug
- description
- locale

## 3.3. EventType
Fields:
- title
- slug
- description
- locale

## 3.4. Tag
Fields:
- title
- slug
- locale

## 3.5. Region
Fields:
- title
- slug
- locale

---

## 4. Menu model
### Menu
- `title`
- `location` — enum(header, footer, utility)
- `items` — repeatable component MenuItem
- `locale`

### MenuItem component
- `label`
- `url`
- `type` — enum(internal, external)
- `openInNewTab` — boolean
- `children` — repeatable MenuItemLite

---

## 5. Reusable components

## 5.1. SEO component
- `seoTitle`
- `seoDescription`
- `seoKeywords`
- `ogImage`
- `canonicalUrl`
- `noindex`

## 5.2. SocialLink component
- `platform`
- `label`
- `url`

## 5.3. CTA component
- `title`
- `text`
- `buttonLabel`
- `buttonUrl`

## 5.4. Hero component
- `title`
- `subtitle`
- `backgroundImage`
- `primaryButtonLabel`
- `primaryButtonUrl`
- `secondaryButtonLabel`
- `secondaryButtonUrl`

## 5.5. Quote component
- `quote`
- `author`
- `authorTitle`

---

## 6. Dynamic Zone for contentBlocks
Допустимые блоки:
- HeroBlock
- RichTextBlock
- ImageBlock
- GalleryBlock
- QuoteBlock
- StatsBlock
- CardsGridBlock
- CTABlock
- AccordionBlock
- TabsBlock
- TimelineBlock
- DocumentListBlock
- FeaturedNewsBlock
- FeaturedEventsBlock
- ContactBlock

---

## 7. Publication workflow
Статусы:
- draft
- published
- archived

Правила:
- slug должен быть уникален внутри locale;
- публикация без title / slug / ключевого контента запрещена;
- публикация без SEO не запрещена, но система должна предупреждать;
- документ нельзя публиковать без файла;
- фотоальбом нельзя публиковать без cover image и хотя бы одной фотографии.

---

## 8. Locale strategy
- одна сущность = один материал + локализованные версии;
- slug локализуется;
- SEO локализуется;
- связи предпочтительно сохраняются между локалями в рамках одной сущности.

---

## 9. Media conventions
- alt text обязателен для cover image;
- для фотоальбомов хранить cover + массив фото;
- для видео желательно отдельное превью;
- при возможности хранить photographer / source / copyright fields.

---

## 10. Admin usability recommendations
- вывести content types в понятном редакционном порядке;
- добавить help text на важные поля;
- предусмотреть preview link;
- сделать понятные названия статусов;
- исключить перегруженность формы редактирования.

---

## 11. API expectations
CMS должна обеспечивать:
- список с фильтрами;
- список featured items;
- детальную страницу по slug;
- связь related content;
- locale aware responses;
- pagination meta;
- seo payload.

---

## 12. Final note
Если нужно упростить MVP, сначала сокращается количество optional fields, но не ломается общая модель.

---

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

---

# 05. Prompt for Codex — production prompt

You are building a production-ready multilingual official content portal for the project **“35 years of independence of Uzbekistan”**.

You must use the attached specification files as the source of truth:
- `01_master-spec.md`
- `02_dev-spec-codex.md`
- `03_cms-schema-strapi.md`
- `04_backlog.md`
- `routes-map.json`
- `.env.example`
- `acceptance-checklist.md`

## Project type
This is **not** a landing page and **not** an e-commerce website.
It is an **official premium government-style content portal** inspired by the information architecture logic of president.uz, but it must not be a visual clone.

## Mandatory stack
### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- modern reusable component architecture
- locale-aware routing for `uz`, `ru`, `en`

### CMS / Backend
- Strapi
- PostgreSQL
- media upload support
- localized content types

## Main requirements
1. All public content must be CMS-driven.
2. No hardcoded page content.
3. Use strict TypeScript types.
4. Avoid `any`.
5. Build reusable UI and section components.
6. Use server components by default.
7. Use client components only when interactivity is required.
8. All pages must support SEO metadata.
9. All content entities must support locale-aware rendering.
10. The architecture must be scalable.

## Public routes
Implement at least:
- `/{locale}`
- `/{locale}/about`
- `/{locale}/news`
- `/{locale}/news/:slug`
- `/{locale}/events`
- `/{locale}/events/:slug`
- `/{locale}/documents`
- `/{locale}/documents/:slug`
- `/{locale}/media`
- `/{locale}/media/photos`
- `/{locale}/media/videos`
- `/{locale}/contacts`
- `/{locale}/search`
- `/{locale}/privacy-policy`
- `/{locale}/terms`
- `/{locale}/accessibility`
- `/{locale}/sitemap`

## Sections to build
### Homepage
- Hero section
- Intro/mission block
- Featured news
- Featured events
- Important documents
- Media preview
- Quote/highlight block
- Contact/appeal preview

### List pages
- page hero
- filters
- cards grid/list
- pagination

### Detail pages
- cover image
- metadata
- body content
- related content
- attachments/media

## CMS entities
Implement the schemas described in `03_cms-schema-strapi.md`:
- News
- Event
- Document
- StaticPage
- PhotoGallery
- VideoItem
- ContactSubmission
- ContactInfo
- SiteSettings
- taxonomy types
- reusable components
- dynamic content blocks

## Contact strategy
Implement:
1. an internal contact form for general inquiries;
2. a separate external official appeal link in the contacts page and footer/settings.

Do not implement a complex internal legal appeals workflow.

## Search
Implement a search results page that can search across:
- pages
- news
- events
- documents
- media

Return title, type, date, snippet, url.

## Code quality rules
- Keep a clean folder structure.
- Create reusable DTOs and mappers.
- Centralize API communication.
- Add form validation.
- Add loading, empty, and error states.
- Add accessibility support.
- Add basic analytics hooks placeholders.
- Add SEO helpers.
- Add sitemap and robots generation.
- Add 404 and 500 pages.

## Deliverables
Generate:
1. the project folder structure;
2. the frontend app;
3. the CMS schemas;
4. the service/data layer;
5. the core reusable components;
6. the public pages;
7. the environment example;
8. setup instructions.

## Important execution style
- Build incrementally but coherently.
- Do not skip architecture.
- Do not improvise business requirements outside the provided files.
- If some UI detail is unspecified, choose a premium official modern style.
- If something can be reused, reuse it.
- Prefer maintainable code over quick hacks.

## Final output expected from Codex
- production-grade scaffold
- clean TypeScript code
- CMS-ready architecture
- locale-aware routing
- SEO-ready pages
- clear setup instructions

---

# Acceptance checklist

## 1. Product / UX
- [ ] На главной странице ясно понятна суть проекта.
- [ ] Верхняя навигация логична и не перегружена.
- [ ] На мобильных устройствах сайт удобен.
- [ ] Контент читается без перегруза и визуального хаоса.

## 2. Content / CMS
- [ ] Все ключевые блоки сайта управляются через CMS.
- [ ] Локализация работает для uz/ru/en.
- [ ] Можно создать и опубликовать новость.
- [ ] Можно создать и опубликовать событие.
- [ ] Можно создать и опубликовать документ.
- [ ] Можно создать и опубликовать фотоальбом / видео.
- [ ] Можно редактировать контакты и глобальные настройки.

## 3. Frontend
- [ ] Работают все публичные маршруты.
- [ ] Списки и детальные страницы корректно отрисовываются.
- [ ] Есть loading/empty/error states.
- [ ] Нет хардкода контента там, где должен быть CMS.

## 4. Search
- [ ] Поиск выдаёт результаты по нескольким сущностям.
- [ ] У результатов есть title/type/date/snippet/url.
- [ ] Пустой результат обрабатывается корректно.

## 5. Forms
- [ ] Контактная форма валидируется.
- [ ] Успешная отправка понятна пользователю.
- [ ] Ошибки отображаются корректно.
- [ ] Есть базовая защита от спама.

## 6. SEO
- [ ] У страниц есть meta title и description.
- [ ] Генерируется sitemap.
- [ ] Есть robots.
- [ ] Есть hreflang.
- [ ] Open Graph работает.

## 7. Performance
- [ ] Изображения оптимизированы.
- [ ] Нет избыточной гидратации.
- [ ] Основные страницы грузятся быстро.

## 8. Security
- [ ] Admin panel защищена.
- [ ] Секреты не попадают во frontend bundle.
- [ ] Uploads валидируются.
- [ ] Формы имеют ограничения по частоте.

## 9. Deployment
- [ ] Есть staging.
- [ ] Есть production.
- [ ] Есть backups.
- [ ] Есть health-check.