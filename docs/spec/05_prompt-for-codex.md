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