import { routing } from "@/i18n/routing";

/**
 * Technical, developer-owned site constants.
 *
 * NOTE ON THE config/ vs content/ BOUNDARY:
 * `config/` holds what an engineer sets (domain, i18n wiring, nav structure,
 * SEO defaults). Business facts a non-developer or a CMS would own — address,
 * phone, hours, socials, products, FAQ — live in `content/` behind validated
 * accessors, NOT here. Keep that split so a future CMS swap touches only the
 * content layer. See docs/Architecture.md.
 */
export const SITE = {
  /** PLACEHOLDER — replace with the production domain once registered. */
  url: "https://www.alhafiznuralmadinah.com",

  /** Full display name — used in structured data and OG metadata. */
  name: "Al Hafiz Nur Al-Madinah",

  /** Brand wordmark split for UI chrome (logo, hero). Single source for both. */
  wordmark: {
    primary: "Al Hafiz",
    secondary: "Nur Al-Madinah",
  },

  defaultLocale: routing.defaultLocale,
  locales: routing.locales,

  /** Default social-share image (path under /public). */
  ogImage: "/images/hero/hero-section.jpg",
} as const;
