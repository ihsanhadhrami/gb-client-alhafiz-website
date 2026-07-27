import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { FeaturedProduct } from "@/components/products/featured-product";
import { ProductCard } from "@/components/products/product-card";
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
            <p className="text-muted-foreground border-border/70 bg-secondary/40 rounded-2xl border border-dashed p-8 text-center text-sm">
              {t("comingSoon")}
            </p>
          ) : (
            <div className="flex flex-col gap-10">
              {/* The first product is the category's lead pick — shown larger, on its own. */}
              <FeaturedProduct
                product={category.products[0]}
                locale={activeLocale}
                label={t("featured")}
              />

              {category.products.length > 1 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {category.products.slice(1).map((product) => (
                    <ProductCard
                      key={product.slug}
                      product={product}
                      locale={activeLocale}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
