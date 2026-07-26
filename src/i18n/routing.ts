import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ms", "en"],
  defaultLocale: "ms",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/about": {
      ms: "/tentang-kami",
      en: "/about",
    },
    "/products": {
      ms: "/produk",
      en: "/products",
    },
    "/products/[category]": {
      ms: "/produk/[category]",
      en: "/products/[category]",
    },
    "/visit-us": {
      ms: "/kunjungi-kami",
      en: "/visit-us",
    },
    "/blog": {
      ms: "/blog",
      en: "/blog",
    },
    "/blog/[slug]": {
      ms: "/blog/[slug]",
      en: "/blog/[slug]",
    },
    "/contact": {
      ms: "/hubungi",
      en: "/contact",
    },
    "/faq": {
      ms: "/soalan-lazim",
      en: "/faq",
    },
  },
});

export type AppLocale = (typeof routing.locales)[number];
