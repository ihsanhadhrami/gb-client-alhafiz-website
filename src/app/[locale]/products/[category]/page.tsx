import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/config/seo";
import {
  getProductCategoryBySlug,
  getProductCategorySlugs,
} from "@/lib/content/products";
import { pickLocalized } from "@/lib/i18n-content";
import { getAppLocale, resolveLocale } from "@/i18n/locale";

type Params = { params: Promise<{ locale: string; category: string }> };

export function generateStaticParams() {
  return getProductCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, category: slug } = await params;
  const category = getProductCategoryBySlug(slug);
  if (!category) return {};

  const activeLocale = resolveLocale(locale);
  return buildPageMetadata({
    title: pickLocalized(category.name, activeLocale),
    description: pickLocalized(category.description, activeLocale),
    href: { pathname: "/products/[category]", params: { category: slug } },
    locale,
  });
}

export default async function ProductCategoryPage({ params }: Params) {
  const { locale, category: slug } = await params;
  setRequestLocale(locale);

  const category = getProductCategoryBySlug(slug);
  if (!category) notFound();

  const t = await getTranslations("ProductCategory");
  const activeLocale = await getAppLocale();

  return (
    <>
      <PageHeader
        title={pickLocalized(category.name, activeLocale)}
        subtitle={pickLocalized(category.description, activeLocale)}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <Link
            href="/products"
            className="text-muted-foreground hover:text-foreground mb-10 inline-flex items-center gap-1.5 text-sm font-medium"
          >
            <ArrowLeft className="size-4" />
            {t("backToProducts")}
          </Link>

          {category.products.length === 0 ? (
            <p className="text-muted-foreground border-border bg-secondary/40 rounded-2xl border border-dashed p-8 text-center text-sm">
              {t("comingSoon")}
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {category.products.map((product) => (
                <article
                  key={product.slug}
                  className="border-border bg-card flex flex-col overflow-hidden rounded-2xl border"
                >
                  {product.image ? (
                    <div className="relative aspect-4/3">
                      <Image
                        src={product.image}
                        alt={pickLocalized(product.name, activeLocale)}
                        fill
                        sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="bg-secondary/50 aspect-4/3" aria-hidden />
                  )}
                  <div className="flex flex-col gap-1.5 p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-heading text-foreground text-base font-semibold">
                        {pickLocalized(product.name, activeLocale)}
                      </h2>
                      {product.nameAr && (
                        <span
                          dir="rtl"
                          className="font-arabic text-muted-foreground text-sm"
                        >
                          {product.nameAr}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {pickLocalized(product.description, activeLocale)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
