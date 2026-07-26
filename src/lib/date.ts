import type { BusinessHours } from "@/content/schemas/business";
import type { AppLocale } from "@/i18n/routing";

/** Canonical week order used everywhere days are iterated or sorted. */
export const WEEKDAY_ORDER = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
] as const satisfies readonly BusinessHours["day"][];

/**
 * schema.org day names (used by JSON-LD `OpeningHoursSpecification`).
 * Single source so the SEO layer and the hours formatter never drift apart.
 */
export const SCHEMA_DAY_NAMES: Record<BusinessHours["day"], string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

/** Formats an ISO date (e.g. "2026-07-01") as a localized long date. */
export function formatDate(iso: string, locale: AppLocale): string {
  return new Intl.DateTimeFormat(locale === "ms" ? "ms-MY" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** Localized, human-facing weekday labels. */
export const WEEKDAY_LABELS: Record<AppLocale, Record<BusinessHours["day"], string>> = {
  ms: {
    mon: "Isnin",
    tue: "Selasa",
    wed: "Rabu",
    thu: "Khamis",
    fri: "Jumaat",
    sat: "Sabtu",
    sun: "Ahad",
  },
  en: {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  },
};
