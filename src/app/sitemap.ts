import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { SITE } from "@/config/site";
import { getProductCategorySlugs } from "@/lib/content/products";
import { getAllPostSlugs } from "@/lib/content/blog";

const staticPaths = [
  "/",
  "/about",
  "/products",
  "/visit-us",
  "/blog",
  "/contact",
  "/faq",
] as const;

type SitemapHref = Parameters<typeof getPathname>[0]["href"];

function absoluteUrl(href: SitemapHref, locale: (typeof routing.locales)[number]) {
  return `${SITE.url}${getPathname({ locale, href })}`;
}

function entry(href: SitemapHref): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(href, routing.defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, absoluteUrl(href, locale)]),
      ),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPaths.map((pathname) => entry(pathname));

  const categoryEntries = getProductCategorySlugs().map((category) =>
    entry({ pathname: "/products/[category]", params: { category } }),
  );

  const blogEntries = getAllPostSlugs().map(({ slug }) =>
    entry({ pathname: "/blog/[slug]", params: { slug } }),
  );

  return [...staticEntries, ...categoryEntries, ...blogEntries];
}
