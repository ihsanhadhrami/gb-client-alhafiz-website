import { getTranslations } from "next-intl/server";
import { MapPin, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export async function CtaBanner() {
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");

  return (
    <section className="bg-primary py-16 sm:py-20">
      <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-primary-foreground text-2xl font-semibold sm:text-3xl">
            {t("ctaTitle")}
          </h2>
          <p className="text-primary-foreground/80 mt-2 max-w-md">{t("ctaSubtitle")}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button render={<Link href="/visit-us" />} size="lg" variant="secondary">
            <MapPin className="size-4" />
            {tCommon("getDirections")}
          </Button>
          <Button
            render={<Link href="/contact" />}
            size="lg"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 border bg-transparent"
          >
            <MessageCircle className="size-4" />
            {tCommon("whatsappUs")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
