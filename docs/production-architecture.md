# Production Architecture

## Recommended stack

- Frontend: `Next.js` App Router with SSR/ISR
- CMS: `Strapi`
- Database: `PostgreSQL`
- File storage: `S3-compatible`
- Search: PostgreSQL FTS on phase 1, `Meilisearch` on phase 2

## Content models

- `pages`
- `news`
- `news-categories`
- `documents`
- `document-categories`
- `albums`
- `videos`
- `leaders`
- `organizations`
- `homepage-blocks`
- `contacts`
- `social-links`
- `seo-settings`
- `feedback-entries`

## Frontend routes

- `/[locale]`
- `/[locale]/about`
- `/[locale]/events`
- `/[locale]/events/[slug]`
- `/[locale]/documents`
- `/[locale]/documents/[slug]`
- `/[locale]/organization`
- `/[locale]/media`
- `/[locale]/media/[slug]`
- `/[locale]/contacts`
- `/[locale]/search?q=`

## Homepage composition

1. Hero slider with manual priority
2. Latest news block
3. Social and official channels
4. Thematic collections
5. Official appeal / reception block
6. Media preview
7. Expanded footer sitemap

## Accessibility baseline

- keyboard navigation
- visible focus states
- alt text for all images
- font-size switcher
- contrast mode
- semantic headings and landmarks

## Migration path from this prototype

1. Reuse IA, copy hierarchy and visual design tokens from this prototype.
2. Move `data.js` structures into Strapi content types and seed content.
3. Rebuild rendering in Next.js server components with dynamic metadata.
4. Replace local form storage with API route or Strapi submission flow.
5. Add media uploads, scheduled publishing, RBAC and SEO fields.
