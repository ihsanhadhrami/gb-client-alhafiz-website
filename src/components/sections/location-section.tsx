import { getTranslations, getLocale } from "next-intl/server";
import { MapPin, Clock, Navigation } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getBusinessInfo } from "@/lib/content/business";
import { formatHoursSummary } from "@/lib/hours";
import type { AppLocale } from "@/i18n/routing";

export async function LocationSection() {
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");
  const locale = (await getLocale()) as AppLocale;
  const business = getBusinessInfo();
  const hours = formatHoursSummary(business.hours, locale);

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-heading text-foreground text-3xl font-semibold sm:text-4xl">
              {t("locationTitle")}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md">{t("locationSubtitle")}</p>

            <div className="mt-8 flex flex-col gap-6">
              <div className="flex gap-3">
                <MapPin className="text-primary mt-0.5 size-5 shrink-0" />
                <p className="text-foreground text-sm">
                  {business.address.line1}, {business.address.line2}
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

          <div className="border-border bg-secondary/40 text-muted-foreground flex min-h-[280px] items-center justify-center rounded-2xl border text-sm">
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary flex flex-col items-center gap-2 p-8 text-center transition-colors"
            >
              <MapPin className="size-8" />
              {tCommon("viewOnMaps")}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
