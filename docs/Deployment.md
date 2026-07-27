# Deployment

The site is built with Next.js and deployed to **Cloudflare Workers** via
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) (OpenNext).

## Relevant files

| File                  | Role                                                          |
| --------------------- | ------------------------------------------------------------- |
| `open-next.config.ts` | OpenNext adapter configuration                                |
| `wrangler.jsonc`      | Cloudflare Worker config (name, assets binding, compat flags) |
| `next.config.ts`      | Next.js config (`next-intl` plugin, image formats)            |

`wrangler.jsonc` uses `nodejs_compat` and serves the built assets from
`.open-next/assets`. Both `.open-next/` and `.wrangler/` are git-ignored.

## Commands

```bash
npm run cf:build      # next build → OpenNext transform for Workers
npm run cf:preview    # build + run the Worker locally (wrangler)
npm run cf:deploy     # build + deploy to Cloudflare
npm run cf:typegen    # regenerate CloudflareEnv types from wrangler
```

A plain `npm run build` is enough for CI checks and local verification; the
`cf:*` scripts add the Cloudflare packaging step on top.

## Why this works on Workers

Every route is **statically generated** (SSG) — see the route table printed by
`npm run build`. Content (JSON) and blog markdown are read at **build time**, so
there is no filesystem access at request time on the Worker. Keep it that way:
new routes should use `generateStaticParams` for dynamic segments and avoid
request-time `fs` or other Node-only runtime APIs.

## Pre-deploy checklist

1. `npm run lint && npx tsc --noEmit && npm run build` all pass.
2. Placeholders replaced: `SITE.url` (`src/config/site.ts`) and the
   `PLACEHOLDER` fields in `src/content/site/business.json`.
3. `npm run cf:preview` looks correct locally.
4. Cloudflare account/project configured for `wrangler` (auth via
   `wrangler login` or `CLOUDFLARE_API_TOKEN` in CI).
5. `npm run cf:deploy`.
6. Post-deploy: verify `/robots.txt`, `/sitemap.xml`, and hreflang tags resolve
   to the production domain.

## Notes

- Secrets/environment: never commit `.env*` or `cloudflare-env.d.ts` (both
  ignored). Use Cloudflare secrets/vars and `cf:typegen` to type them.
- `.claude/settings.local.json` is developer-local and git-ignored; shared
  editor/agent config lives in `.claude/settings.json`.
