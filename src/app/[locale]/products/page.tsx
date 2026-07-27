import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/config/seo";
import { getProductCategories } from "@/lib/content/products";
import { pickLocalized } from "@/lib/i18n-content";
import { getAppLocale } from "@/i18n/locale";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    href: "/products",
    locale,
  });
}

export default async function ProductsPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Products");
  const activeLocale = await getAppLocale();
  const categories = getProductCategories();

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={{
                  pathname: "/products/[category]",
                  params: { category: category.slug },
                }}
                className="group border-border/60 bg-card hover:border-primary/30 flex flex-col gap-4 rounded-2xl border p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-heading text-foreground group-hover:text-primary text-lg font-semibold">
                    {pickLocalized(category.name, activeLocale)}
                  </h2>
                  {category.nameAr && (
                    <span dir="rtl" className="font-arabic text-muted-foreground text-lg">
                      {category.nameAr}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">
                  {pickLocalized(category.description, activeLocale)}
                </p>
                <div className="text-muted-foreground mt-auto flex items-center justify-between pt-2 text-sm">
                  <span>{t("itemsCount", { count: category.products.length })}</span>
                  <span className="text-primary inline-flex items-center gap-1 font-medium">
                    {t("viewCategory")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
