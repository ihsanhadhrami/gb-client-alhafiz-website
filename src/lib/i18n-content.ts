import type { LocalizedText } from "@/types/common";
import type { AppLocale } from "@/i18n/routing";

export function pickLocalized(text: LocalizedText, locale: AppLocale): string {
  return text[locale];
}
