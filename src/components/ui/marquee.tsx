import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Continuously scrolls its children horizontally in a seamless loop.
 *
 * The children are rendered twice: the duplicate is `aria-hidden` so screen
 * readers and the accessibility tree only ever see one copy. Motion pauses on
 * hover/focus, and `prefers-reduced-motion` turns the whole thing into a plain
 * scrollable row (see `.marquee-*` rules in globals.css).
 */
export function Marquee({
  children,
  durationSeconds = 45,
  className,
}: {
  children: ReactNode;
  durationSeconds?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "marquee-viewport group relative overflow-hidden",
        // Fade the edges so items enter/leave without a hard cut.
        "[mask-image:linear-gradient(to_right,transparent,black_4rem,black_calc(100%-4rem),transparent)]",
        className,
      )}
    >
      <div
        className="marquee-track flex w-max gap-5"
        style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 gap-5">{children}</div>
        <div className="flex shrink-0 gap-5" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
