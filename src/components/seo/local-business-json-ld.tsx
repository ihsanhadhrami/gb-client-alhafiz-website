import { getLocale } from "next-intl/server";
import { getBusinessInfo } from "@/lib/content/business";
import { pickLocalized } from "@/lib/i18n-content";
import { SITE_URL } from "@/lib/constants";
import type { AppLocale } from "@/i18n/routing";
import type { BusinessHours } from "@/types/business";

const schemaDayNames: Record<BusinessHours["day"], string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export async function LocalBusinessJsonLd() {
  const locale = (await getLocale()) as AppLocale;
  const business = getBusinessInfo();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: business.name,
    description: pickLocalized(business.description, locale),
    url: SITE_URL,
    telephone: business.phone,
    email: business.email,
    priceRange: business.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: [business.address.line1, business.address.line2]
        .filter(Boolean)
        .join(", "),
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.postcode,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    openingHoursSpecification: business.hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${schemaDayNames[h.day]}`,
        opens: h.open,
        closes: h.close,
      })),
    sameAs: business.socials.map((s) => s.url),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
