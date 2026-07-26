import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { FeaturedCategories } from "@/components/sections/featured-categories";
import { TrustSignals } from "@/components/sections/trust-signals";
import { LocationSection } from "@/components/sections/location-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-json-ld";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />
      <FeaturedCategories />
      <TrustSignals />
      <LocationSection />
      <CtaBanner />
    </>
  );
}
