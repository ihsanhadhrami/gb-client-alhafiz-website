import { getTranslations } from "next-intl/server";
import {
  Droplet,
  Cherry,
  UtensilsCrossed,
  MoonStar,
  Gift,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/container";
import { Marquee } from "@/components/ui/marquee";
import { getProductCategories } from "@/lib/content/products";
import { pickLocalized } from "@/lib/i18n-content";
import { getAppLocale } from "@/i18n/locale";

const categoryIcons: Record<string, LucideIcon> = {
  "arabic-perfumes": Droplet,
  "premium-dates": Cherry,
  "middle-eastern-foods": UtensilsCrossed,
  "islamic-products": MoonStar,
  "gifts-specialty": Gift,
};

export async function FeaturedCategories() {
  const t = await getTranslations("Home");
  const locale = await getAppLocale();
  const categories = getProductCategories();

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mb-12 max-w-xl">
          <h2 className="font-heading text-foreground text-3xl font-semibold sm:text-4xl">
            {t("categoriesTitle")}
          </h2>
          <p className="text-muted-foreground mt-3">{t("categoriesSubtitle")}</p>
        </div>
      </Container>

      <Marquee durationSeconds={45}>
        {categories.map((category) => {
          const Icon = categoryIcons[category.slug] ?? Gift;
          return (
            <Link
              key={category.slug}
              href={{
                pathname: "/products/[category]",
                params: { category: category.slug },
              }}
              className="group border-border/60 bg-card hover:border-primary/30 flex w-72 shrink-0 flex-col gap-4 rounded-2xl border p-6 shadow-sm transition-colors hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-full">
                  <Icon className="size-5" />
                </span>
                {category.nameAr && (
                  <span dir="rtl" className="font-arabic text-muted-foreground text-lg">
                    {category.nameAr}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-heading text-foreground group-hover:text-primary text-lg font-semibold">
                  {pickLocalized(category.name, locale)}
                </h3>
                <p className="text-muted-foreground mt-1.5 line-clamp-3 text-sm">
                  {pickLocalized(category.description, locale)}
                </p>
              </div>
            </Link>
          );
        })}
      </Marquee>
    </section>
  );
}
