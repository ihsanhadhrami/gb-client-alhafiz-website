import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="font-heading text-primary/70 text-6xl font-semibold">404</p>
      <h1 className="font-heading text-foreground text-3xl font-semibold">
        {t("title")}
      </h1>
      <p className="text-muted-foreground max-w-md">{t("description")}</p>
      <Button render={<Link href="/" />} className="mt-2">
        {t("backHome")}
      </Button>
    </Container>
  );
}
