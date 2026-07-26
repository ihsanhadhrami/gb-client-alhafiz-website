/**
 * Domain types are inferred from the Zod content schemas so there is a single
 * source of truth for every content shape. Import from here for ergonomics;
 * the schemas in `@/content/schemas` remain the authority.
 */
export type { LocalizedText } from "@/content/schemas/common";
