# Architecture

This document explains how the Al Hafiz Nur Al-Madinah website is structured and
_why_. It should let another senior engineer become productive without a walkthrough.

## Stack

- **Next.js 15** (App Router, React 19, Server Components by default)
- **next-intl v4** — localized routing (`ms` default, `en`), message catalogs
- **Tailwind CSS v4** + a small shadcn/base-ui component layer
- **Zod v4** — runtime validation of all content
- **Cloudflare Workers** via `@opennextjs/cloudflare` (see [Deployment.md](./Deployment.md))

## Guiding principles

1. **Content is validated data, not `any`.** Every JSON/markdown file passes
   through a Zod schema at the accessor layer. Types are _inferred_ from those
   schemas, so there is one source of truth per shape.
2. **Components present; they don't fetch or decide.** Server components read
   from content accessors and render. No component imports raw JSON.
3. **`config/` (developer-owned) is separate from `content/` (business-owned).**
   This keeps the door open for a CMS to replace the content layer without
   touching UI. See "config vs content" below.
4. **Locale-correctness is enforced by types**, not conventions — routing,
   navigation, and the active locale all flow through typed helpers.

## Data flow

```
content/*.json  content/blog/**.md
        │                │
        ▼                ▼
  Zod schema      Zod frontmatter schema      ← src/content/schemas/*
        │                │
        ▼                ▼
  content accessor (parseContent, cached)     ← src/lib/content/*
        │
        ▼
  Server Component (presentation)             ← src/components/*, src/app/**
```

The **only** place raw data becomes typed content is `src/lib/content/parse.ts`
(`parseContent`). On invalid data it throws one readable error listing every bad
path — at build time for static pages, so bad content can never ship silently.

## Folder map

| Path                                                  | Responsibility                                                              |
| ----------------------------------------------------- | --------------------------------------------------------------------------- |
| `src/app/[locale]/`                                   | Routes. Each `page.tsx` sets the locale, builds metadata, renders sections. |
| `src/app/[locale]/{error,loading,not-found}.tsx`      | Localized error boundaries.                                                 |
| `src/app/layout.tsx`                                  | Pass-through root layout (required by Next; `<html>` lives in `[locale]`).  |
| `src/app/not-found.tsx`                               | Global fallback for URLs outside any locale (renders its own `<html>`).     |
| `src/app/{robots,sitemap}.ts`                         | Generated SEO endpoints.                                                    |
| `src/config/`                                         | Developer-owned constants: `site`, `navigation`, `seo`.                     |
| `src/content/schemas/`                                | Zod schemas + inferred types (the shape authority).                         |
| `src/content/{site,products,blog}/`                   | Raw content (JSON + markdown).                                              |
| `src/lib/content/`                                    | Validated accessors — the CMS-swap seam.                                    |
| `src/lib/`                                            | Pure helpers (`date`, `hours`, `utils`, `i18n-content`).                    |
| `src/i18n/`                                           | Routing config, navigation wrappers, locale helpers, request config.        |
| `src/components/{layout,sections,ui,seo,blog,icons}/` | Presentation.                                                               |
| `src/types/`                                          | Thin re-exports of schema-inferred types for import ergonomics.             |

## config vs content — why the split

Task briefs sometimes suggest a `config/business.ts`. We deliberately keep
business facts (address, phone, hours, socials, products, FAQ) in `content/`
behind accessors, and reserve `config/` for what an **engineer** sets (domain
URL, i18n wiring, nav structure, SEO defaults). Rationale: a future CMS owns
_content_, not _config_. Mixing them would spread CMS-owned data into code and
defeat the migration goal (see [Content.md](./Content.md) → "CMS migration").

## Internationalization

- `src/i18n/routing.ts` defines locales and **localized pathnames** (`/produk`
  ↔ `/products`). This is the authority for both routing and the derived
  `LocalizedText` shape.
- `src/i18n/navigation.ts` exports locale-aware `Link`, `getPathname`, etc.
  Always import navigation from here, never from `next/link`.
- `src/i18n/locale.ts` — `getAppLocale()` (async, server) and `resolveLocale()`
  (sync) narrow a string to `AppLocale` safely, replacing scattered `as` casts.
- Every `page.tsx` calls `setRequestLocale(locale)` to enable static rendering.

## SEO

Centralized in `src/config/seo.ts`:

- `metadataBase` (set once on the root layout) so canonical/OG URLs resolve.
- `buildPageMetadata()` — every route's `generateMetadata` returns this, giving
  consistent canonical + `hreflang` alternates + OpenGraph/Twitter cards.
- Structured data: `LocalBusinessJsonLd`, `FaqJsonLd`, `ArticleJsonLd`.

See [SEO.md](./SEO.md) for details.

## Extending the site

- **New page:** add the path to `routing.ts` (+ localized pathname), a `Nav`
  message key, an entry in `config/navigation.ts`, then `app/[locale]/<seg>/page.tsx`
  with `generateMetadata` → `buildPageMetadata`.
- **New content type:** add a schema in `content/schemas/`, an accessor in
  `lib/content/`, and consume it from a server component. Never import the JSON
  directly.
