import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SITE } from "./site";

/** Any internal route the typed navigation understands. */
export type AppHref = Parameters<typeof getPathname>[0]["href"];

/** Absolute base for all canonical/OG URL resolution. */
export const metadataBase = new URL(SITE.url);

/**
 * Builds canonical + hreflang alternates for a route. Paths are locale-aware
 * (e.g. `/produk` for ms, `/en/products` for en) and resolved against
 * `metadataBase` by Next.js.
 */
export function buildAlternates(href: AppHref, locale: string): Metadata["alternates"] {
  const active = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = getPathname({ locale: l, href });
  }
  languages["x-default"] = getPathname({ locale: routing.defaultLocale, href });

  return {
    canonical: getPathname({ locale: active, href }),
    languages,
  };
}

/**
 * Single source for per-page metadata. Every route's `generateMetadata`
 * should return this so canonical URLs, hreflang, and OpenGraph/Twitter cards
 * stay consistent site-wide. The page-specific `title` fills the title
 * template defined in the locale layout.
 */
export function buildPageMetadata(opts: {
  title: string;
  description: string;
  href: AppHref;
  locale: string;
  images?: string[];
  type?: "website" | "article";
}): Metadata {
  const {
    title,
    description,
    href,
    locale,
    images = [SITE.ogImage],
    type = "website",
  } = opts;
  const active = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const canonical = getPathname({ locale: active, href });

  return {
    title,
    description,
    alternates: buildAlternates(href, locale),
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: active,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
