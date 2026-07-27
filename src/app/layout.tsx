import type { ReactNode } from "react";

/**
 * Pass-through root layout. The real `<html>`/`<body>` is owned by
 * `[locale]/layout.tsx` for matched locale routes. Next.js still requires a
 * root layout to exist for routes it resolves outside any locale segment
 * (e.g. the root `not-found.tsx`, `sitemap.ts`) — those own their own
 * `<html>`/`<body>` where needed, so this stays a no-op wrapper.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
