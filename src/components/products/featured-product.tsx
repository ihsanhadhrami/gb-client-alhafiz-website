import Image from "next/image";
import type { Product } from "@/content/schemas/product";
import type { AppLocale } from "@/i18n/routing";
import { pickLocalized } from "@/lib/i18n-content";

/**
 * Larger, standalone treatment for a category's lead product — set by being
 * first in the content JSON's `products` array. Same 3:4 image ratio as
 * `ProductCard` (no cropping), just scaled up and paired with copy beside it.
 */
export function FeaturedProduct({
  product,
  locale,
  label,
}: {
  product: Product;
  locale: AppLocale;
  label: string;
}) {
  return (
    <article className="border-border/60 bg-card grid gap-0 overflow-hidden rounded-2xl border shadow-sm sm:grid-cols-2">
      {product.image ? (
        <div className="relative aspect-3/4">
          <Image
            src={product.image}
            alt={pickLocalized(product.name, locale)}
            fill
            priority
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="bg-secondary/50 aspect-3/4" aria-hidden />
      )}
      <div className="flex flex-col justify-center gap-3 p-6 sm:p-10">
        <span className="bg-gold text-gold-foreground w-fit rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
          {label}
        </span>
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-heading text-foreground text-2xl font-semibold sm:text-3xl">
            {pickLocalized(product.name, locale)}
          </h2>
          {product.nameAr && (
            <span dir="rtl" className="font-arabic text-muted-foreground text-xl">
              {product.nameAr}
            </span>
          )}
        </div>
        <p className="text-muted-foreground">
          {pickLocalized(product.description, locale)}
        </p>
      </div>
    </article>
  );
}
