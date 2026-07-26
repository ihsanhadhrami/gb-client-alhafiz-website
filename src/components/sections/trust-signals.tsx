import { getTranslations } from "next-intl/server";
import { ShieldCheck, Sparkles, Users, MapPinned } from "lucide-react";
import { Container } from "@/components/layout/container";

const items = [
  { key: "authentic", icon: ShieldCheck },
  { key: "quality", icon: Sparkles },
  { key: "community", icon: Users },
  { key: "location", icon: MapPinned },
] as const;

export async function TrustSignals() {
  const t = await getTranslations("Home");
  const tTrust = await getTranslations("Trust");

  return (
    <section className="border-border bg-secondary/40 border-y py-20 sm:py-24">
      <Container>
        <h2 className="font-heading text-foreground mb-12 max-w-xl text-3xl font-semibold sm:text-4xl">
          {t("trustTitle")}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, icon: Icon }) => (
            <div key={key} className="flex flex-col gap-3">
              <span className="bg-gold/15 text-gold-foreground flex size-11 items-center justify-center rounded-full">
                <Icon className="size-5" />
              </span>
              <h3 className="font-heading text-foreground text-base font-semibold">
                {tTrust(`${key}.title`)}
              </h3>
              <p className="text-muted-foreground text-sm">
                {tTrust(`${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
