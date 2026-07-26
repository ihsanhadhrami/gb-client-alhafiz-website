import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { SITE_URL } from "@/lib/constants";

const staticPaths = [
  "/",
  "/about",
  "/products",
  "/visit-us",
  "/blog",
  "/contact",
  "/faq",
] as const;

function absoluteUrl(
  pathname: (typeof staticPaths)[number],
  locale: (typeof routing.locales)[number],
) {
  return `${SITE_URL}${getPathname({ locale, href: pathname })}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPaths.map((pathname) => ({
    url: absoluteUrl(pathname, routing.defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, absoluteUrl(pathname, locale)]),
      ),
    },
  }));
}
