# SEO

SEO is centralized so every route behaves consistently. Do not hand-write
`<meta>`/canonical logic in pages — go through the helpers below.

## Metadata

- **`metadataBase`** is set once in `src/app/[locale]/layout.tsx` from
  `SITE.url`. Without it, canonical/OG URLs would resolve against `localhost`.
- **`buildPageMetadata()`** (`src/config/seo.ts`) is what every route's
  `generateMetadata` returns. It produces:
  - `title` (fills the title template from the locale layout) + `description`;
  - `alternates.canonical` for the active locale;
  - `alternates.languages` — one entry per locale **plus `x-default`** (hreflang);
  - `openGraph` + `twitter` cards (defaulting to `SITE.ogImage`).

Example:

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    href: "/about",
    locale,
  });
}
```

For dynamic routes, pass an href object, e.g.
`href: { pathname: "/blog/[slug]", params: { slug } }` and `type: "article"`.

## Structured data (JSON-LD)

| Component | Schema type | Used on |
| --- | --- | --- |
| `LocalBusinessJsonLd` | `Store` (address, geo, hours, sameAs) | Home |
| `FaqJsonLd` | `FAQPage` | FAQ |
| `ArticleJsonLd` | `BlogPosting` | Blog post |

Opening hours in JSON-LD and the human-facing hours formatter share one weekday
map (`src/lib/date.ts`) so they never diverge.

## robots & sitemap

- `src/app/robots.ts` — allows all, points at the sitemap via `SITE.url`.
- `src/app/sitemap.ts` — enumerates static routes **plus** dynamic product
  categories and blog posts, each with `hreflang` alternates for every locale.
  New static routes must be added to its `staticPaths` array; dynamic ones are
  derived from the content accessors automatically.

## Launch checklist

- [ ] Replace `SITE.url` placeholder in `src/config/site.ts` with the real domain.
- [ ] Fill real address, phone, WhatsApp, and Google URLs in `business.json`.
- [ ] Provide a real `SITE.ogImage` (≥ 1200×630) if the hero image isn't ideal.
- [ ] Verify hreflang/canonical output on a couple of routes after deploy.
- [ ] Submit `sitemap.xml` in Google Search Console.
