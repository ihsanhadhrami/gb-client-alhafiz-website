import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export async function Hero() {
  const t = await getTranslations("Home");
  const tCommon = await getTranslations("Common");

  return (
    <section className="relative flex min-h-150 items-center justify-center overflow-hidden py-24 sm:min-h-180 sm:py-32">
      <Image
        src="/images/hero/hero-section.jpg"
        alt="Curated Arabic perfumes, dates, honey and olive oil displayed at Al Hafiz Nur Al-Madinah"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/55" />

      <Container className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-heading text-white">
          <span className="block text-6xl font-semibold tracking-tight sm:text-7xl lg:text-8xl">
            Al Hafiz
          </span>
          <span className="block text-7xl font-normal italic sm:text-8xl lg:text-9xl">
            Nur Al-Madinah
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-white/85 sm:text-xl">{t("heroSubtitle")}</p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button
            render={<Link href="/products" />}
            size="lg"
            className="bg-gold text-gold-foreground hover:bg-gold/90"
          >
            {tCommon("exploreProducts")}
            <ArrowRight className="size-4" />
          </Button>
          <Button
            render={<Link href="/visit-us" />}
            size="lg"
            variant="outline"
            className="border-white/70 bg-transparent text-white hover:bg-white/10"
          >
            {tCommon("visitStore")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
