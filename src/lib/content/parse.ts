import type { z } from "zod";

/**
 * Validates raw content against a Zod schema and returns the typed, parsed data.
 *
 * On failure it throws a single, readable error listing every offending path —
 * because content is imported at module scope, this surfaces at build time
 * (or on first request in dev), never as a silent `undefined` in the UI.
 *
 * This is the ONLY place raw JSON/frontmatter crosses into typed content, so it
 * is also the seam a future CMS adapter would replace.
 */
export function parseContent<T>(schema: z.ZodType<T>, data: unknown, source: string): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  • ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid content in "${source}":\n${issues}`);
  }

  return result.data;
}
