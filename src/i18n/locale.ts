import { hasLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { routing, type AppLocale } from "./routing";

/** Narrows an arbitrary string to `AppLocale`, falling back to the default. */
export function resolveLocale(locale: string): AppLocale {
  return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
}

/**
 * Server-side accessor for the active locale, narrowed to `AppLocale`.
 *
 * Replaces the unsafe `(await getLocale()) as AppLocale` cast that was
 * duplicated across server components: this validates against the configured
 * locales and falls back to the default instead of lying to the type system.
 */
export async function getAppLocale(): Promise<AppLocale> {
  return resolveLocale(await getLocale());
}
