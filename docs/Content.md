# Content

How content is stored, validated, and consumed — and how to migrate to a CMS later.

## Where content lives

| Content            | File(s)                                | Schema                | Accessor                  |
| ------------------ | -------------------------------------- | --------------------- | ------------------------- |
| Business info      | `src/content/site/business.json`       | `schemas/business.ts` | `lib/content/business.ts` |
| Product categories | `src/content/products/categories.json` | `schemas/product.ts`  | `lib/content/products.ts` |
| FAQ                | `src/content/site/faq.json`            | `schemas/faq.ts`      | `lib/content/faq.ts`      |
| Blog posts         | `src/content/blog/{locale}/*.md`       | `schemas/blog.ts`     | `lib/content/blog.ts`     |

UI copy that isn't "data" (headings, labels, button text) lives in the message
catalogs `messages/{en,ms}.json`, not in content files.

## The golden rule

**Components never import content JSON/markdown directly.** They call an accessor
in `src/lib/content/`, which validates with Zod (`parseContent`) and returns a
typed, cached result. This guarantees:

- invalid content fails the **build** with a precise path, not at runtime;
- there is exactly one place to change when the content source changes.

## Localized text

Any field shown in both languages uses `LocalizedText` (`{ ms, en }`), whose
shape is derived from `routing.locales`. Read it in components with
`pickLocalized(text, locale)`. Add a locale once in `routing.ts` and the schema,
types, and every content file requirement update together.

## Editing content

- **Business details / FAQ / products:** edit the JSON. Keep every localized
  field complete for all locales — a missing `en`/`ms` value fails validation.
- **Placeholders:** fields marked `PLACEHOLDER` (domain, address, phone) must be
  replaced before launch. Empty strings are allowed only where the schema permits
  (e.g. `image: ""`, `googleBusinessProfileUrl: ""`).

## Blog authoring

Create `src/content/blog/<locale>/<slug>.md` with frontmatter:

```yaml
---
title: "Post title"
date: "2026-07-01" # ISO date
excerpt: "One–two sentence summary."
coverImage: "" # /public path, or "" for none
tags: [dates, madinah] # related posts share tags
category: "Guides" # optional
draft: false # true = hidden in production
---
```

- The **filename is the slug** and the **directory is the locale** (both override
  frontmatter to prevent drift).
- Body is Markdown → HTML via `remark`; reading time is computed automatically.
- Provide the same slug in each locale folder for a fully translated post.
- Related posts are chosen by shared `tags` within the same locale.

## CMS migration (Sanity / Payload / Contentful / Directus)

The content accessors in `src/lib/content/` are the **only** seam that touches a
source. To migrate:

1. Keep the Zod schemas (or generate them from the CMS types) as the contract.
2. Reimplement each accessor to fetch from the CMS and pass the response through
   `parseContent` (unchanged validation).
3. Components, schemas, and types stay as-is.

Because no component imports raw JSON and all reads are already funneled through
accessors, the UI layer requires no changes.
