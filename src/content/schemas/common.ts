import { z } from "zod";
import { routing, type AppLocale } from "@/i18n/routing";

/**
 * A short label / string of copy that must exist in every supported locale.
 *
 * The shape is derived from `routing.locales` so that adding a locale is a
 * single-file change: extend `routing.locales` and every content schema (and
 * the inferred `LocalizedText` type) updates automatically.
 */
export const localizedTextSchema = z.object(
  Object.fromEntries(routing.locales.map((locale) => [locale, z.string().min(1)])),
) as z.ZodType<Record<AppLocale, string>>;

export type LocalizedText = z.infer<typeof localizedTextSchema>;

/** Runtime guard for the app's supported locales, usable inside content schemas. */
export const localeSchema = z.enum(routing.locales) as z.ZodType<AppLocale>;
