"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const localeLabels: Record<string, string> = {
  ms: "BM",
  en: "EN",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  return (
    <div className="border-border flex items-center gap-1 rounded-full border p-0.5 text-xs font-medium">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          aria-current={loc === locale}
          onClick={() =>
            router.replace(
              // @ts-expect-error -- params only apply to dynamic routes; safe for the current route
              { pathname, params },
              { locale: loc },
            )
          }
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors",
            loc === locale
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {localeLabels[loc] ?? loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
