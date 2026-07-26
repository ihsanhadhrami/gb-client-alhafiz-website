import { cn } from "@/lib/utils";

/**
 * Styles a block of trusted, server-rendered HTML (e.g. markdown output) using
 * the design tokens. No typography plugin needed — scoped child selectors keep
 * it self-contained and theme-aware.
 */
export function Prose({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-none text-base leading-relaxed",
        "[&_h2]:font-heading [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold",
        "[&_h3]:font-heading [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold",
        "[&_p]:text-muted-foreground [&_p]:my-4",
        "[&_li]:text-muted-foreground [&_li]:my-1 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6",
        "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:text-foreground [&_strong]:font-semibold",
        "[&_blockquote]:border-primary/40 [&_blockquote]:text-muted-foreground [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
