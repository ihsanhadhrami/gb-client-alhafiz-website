import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { TrustSignals } from "@/components/sections/trust-signals";
import { CtaBanner } from "@/components/sections/cta-banner";
import { buildPageMetadata } from "@/config/seo";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    href: "/about",
    locale,
  });
}

export default async function AboutPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-heading text-foreground text-2xl font-semibold sm:text-3xl">
            {t("storyTitle")}
          </h2>
          <div className="text-muted-foreground mt-4 flex flex-col gap-4 text-base leading-relaxed">
            <p>{t("story1")}</p>
            <p>{t("story2")}</p>
          </div>
        </Container>
      </section>

      <TrustSignals />
      <CtaBanner />
    </>
  );
}
