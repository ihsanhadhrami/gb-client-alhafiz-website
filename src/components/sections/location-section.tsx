import { getTranslations } from "next-intl/server";
import { MapPin, Clock, Navigation } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getBusinessInfo } from "@/lib/content/business";
import { formatHoursSummary } from "@/lib/hours";
import { getAppLocale } from "@/i18n/locale";

/**
 * `showHeading` is false where the page already has its own matching title
 * (e.g. Visit Us), so the heading isn't rendered twice.
 */
export async function LocationSection({ showHeading = true }: { showHeading?: boolean }) {
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");
  const locale = await getAppLocale();
  const business = getBusinessInfo();
  const hours = formatHoursSummary(business.hours, locale);

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            {showHeading && (
              <>
                <h2 className="font-heading text-foreground text-3xl font-semibold sm:text-4xl">
                  {t("locationTitle")}
                </h2>
                <p className="text-muted-foreground mt-3 max-w-md">
                  {t("locationSubtitle")}
                </p>
              </>
            )}

            <div className="mt-8 flex flex-col gap-6">
              <div className="flex gap-3">
                <MapPin className="text-primary mt-0.5 size-5 shrink-0" />
                <p className="text-foreground text-sm">
                  {[business.address.line1, business.address.line2]
                    .filter(Boolean)
                    .join(", ")}
                  <br />
                  {business.address.postcode} {business.address.city},{" "}
                  {business.address.state}, {business.address.country}
                </p>
              </div>
              <div className="flex gap-3">
                <Clock className="text-primary mt-0.5 size-5 shrink-0" />
                <div className="text-sm">
                  {hours.map((entry) => (
                    <div key={entry.label} className="text-foreground flex gap-2">
                      <span className="text-muted-foreground">{entry.label}:</span>
                      <span>{entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                render={
                  <a
                    href={business.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <Navigation className="size-4" />
                {tCommon("getDirections")}
              </Button>
              <Button render={<a href={`tel:${business.phone}`} />} variant="outline">
                {tCommon("callUs")}
              </Button>
            </div>
          </div>

          <a
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group border-border/60 relative flex min-h-70 items-end overflow-hidden rounded-2xl border shadow-md transition-shadow hover:shadow-xl"
          >
            <Image
              src="/images/store/storefront.jpg"
              alt={`${business.name} storefront`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-black/70 via-black/5 to-transparent"
            />
            <span className="relative z-10 flex items-center gap-2 p-5 text-sm font-medium text-white">
              <MapPin className="size-4" />
              {tCommon("viewOnMaps")}
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
