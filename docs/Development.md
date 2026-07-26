# Development

## Prerequisites

- Node.js 20+
- npm (the repo ships a `package-lock.json`)

## Setup

```bash
npm install
npm run dev        # http://localhost:3000 (redirects to the default locale)
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build (also runs content validation + SSG) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run format` / `format:check` | Prettier write / check |
| `npm run cf:*` | Cloudflare build/preview/deploy (see [Deployment.md](./Deployment.md)) |

## Conventions

- **Server Components by default.** Add `"use client"` only for interactivity
  (e.g. `error.tsx`, `mobile-nav`, `locale-switcher`).
- **Navigation:** import `Link`, `usePathname`, `getPathname` from
  `@/i18n/navigation` — never `next/link`/`next/navigation` for internal links.
- **Active locale:** `getAppLocale()` (async, server) or `resolveLocale(str)`
  (sync). Do not write `as AppLocale`.
- **Content:** read via `@/lib/content/*` accessors only. Never import content
  JSON/markdown into a component.
- **Config:** URLs, brand name, nav, SEO defaults come from `@/config/*`. Don't
  hardcode them in components.
- **Copy:** UI strings come from `messages/*.json` via `getTranslations`/
  `useTranslations`. Keep `en` and `ms` keys in sync.
- **Types:** prefer schema-inferred types (`@/content/schemas/*` or the
  re-exports in `@/types/*`). Avoid `any` and unsafe assertions.
- **Styling:** Tailwind v4 utility classes + design tokens (`bg-card`,
  `text-muted-foreground`, …) defined in `globals.css`. Support light and dark.

## Adding a page (checklist)

1. `src/i18n/routing.ts` — add the internal path + localized pathnames.
2. `messages/{en,ms}.json` — add a `Nav` label and a page namespace
   (`metaTitle`, `metaDescription`, page copy).
3. `src/config/navigation.ts` — add to `navItems` (or `footerNavItems`).
4. `src/app/[locale]/<segment>/page.tsx` — `setRequestLocale`, `generateMetadata`
   via `buildPageMetadata`, render sections.
5. `src/app/sitemap.ts` — add to `staticPaths` if it's a static route.

## Quality gates before committing

```bash
npm run lint && npx tsc --noEmit && npm run build
```

All three must pass. The build fails loudly on invalid content, so a green build
also means content validation passed.
