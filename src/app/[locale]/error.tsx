"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export default function LocaleError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <h1 className="font-heading text-foreground text-3xl font-semibold">
        {t("title")}
      </h1>
      <p className="text-muted-foreground max-w-md">{t("description")}</p>
      <Button onClick={reset} className="mt-2">
        {t("retry")}
      </Button>
    </Container>
  );
}
