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