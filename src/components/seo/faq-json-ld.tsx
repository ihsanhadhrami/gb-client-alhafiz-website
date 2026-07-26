import { getFaqItems } from "@/lib/content/faq";
import { pickLocalized } from "@/lib/i18n-content";
import { getAppLocale } from "@/i18n/locale";

export async function FaqJsonLd() {
  const locale = await getAppLocale();
  const items = getFaqItems();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: pickLocalized(item.question, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: pickLocalized(item.answer, locale),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
