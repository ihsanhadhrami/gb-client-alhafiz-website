import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HelpCircle } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { LocationSection } from "@/components/sections/location-section";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/config/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "VisitUs" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    href: "/visit-us",
    locale,
  });
}

export default async function VisitUsPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("VisitUs");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <LocationSection />

      <section className="border-border/60 border-t py-14">
        <Container className="flex flex-col items-center gap-3 text-center">
          <HelpCircle className="text-primary size-6" />
          <p className="text-foreground text-lg font-medium">{t("haveQuestions")}</p>
          <Link
            href="/faq"
            className="text-primary text-sm font-medium underline-offset-4 hover:underline"
          >
            {t("seeFaq")}
          </Link>
        </Container>
      </section>
    </>
  );
}
