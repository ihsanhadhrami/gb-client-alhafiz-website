import Image from "next/image";
import type { Product } from "@/content/schemas/product";
import type { AppLocale } from "@/i18n/routing";
import { pickLocalized } from "@/lib/i18n-content";

/**
 * Image container uses a 3:4 portrait ratio to match the source product
 * photography exactly (960x1280 studio shots) — `object-cover` then shows the
 * full bottle with no cropping, since the container and image share a ratio.
 */
export function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: AppLocale;
}) {
  return (
    <article className="border-border/60 bg-card flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      {product.image ? (
        <div className="relative aspect-3/4">
          <Image
            src={product.image}
            alt={pickLocalized(product.name, locale)}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="bg-secondary/50 aspect-3/4" aria-hidden />
      )}
      <div className="flex flex-col gap-1.5 p-5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-heading text-foreground text-base font-semibold">
            {pickLocalized(product.name, locale)}
          </h2>
          {product.nameAr && (
            <span dir="rtl" className="font-arabic text-muted-foreground text-sm">
              {product.nameAr}
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-sm">
          {pickLocalized(product.description, locale)}
        </p>
      </div>
    </article>
  );
}
