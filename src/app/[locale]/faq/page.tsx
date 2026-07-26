import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { buildPageMetadata } from "@/config/seo";
import { getFaqItems } from "@/lib/content/faq";
import { pickLocalized } from "@/lib/i18n-content";
import { getAppLocale } from "@/i18n/locale";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Faq" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    href: "/faq",
    locale,
  });
}

export default async function FaqPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Faq");
  const activeLocale = await getAppLocale();
  const items = getFaqItems();

  return (
    <>
      <FaqJsonLd />
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Accordion>
            {items.map((item, index) => (
              <AccordionItem key={index}>
                <AccordionTrigger className="text-base">
                  {pickLocalized(item.question, activeLocale)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <p>{pickLocalized(item.answer, activeLocale)}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>
    </>
  );
}
