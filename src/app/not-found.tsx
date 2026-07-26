import Link from "next/link";
import { routing } from "@/i18n/routing";
import "./globals.css";

/**
 * Global fallback for requests that never reach a locale segment. Because this
 * project's root layout lives at `[locale]/layout.tsx`, this page must render
 * its own <html>/<body>. Localized 404s are handled by `[locale]/not-found.tsx`.
 */
export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center antialiased">
        <p className="text-primary/70 text-6xl font-semibold">404</p>
        <h1 className="text-2xl font-semibold">
          Halaman tidak dijumpai · Page not found
        </h1>
        <p className="text-muted-foreground max-w-md">
          Halaman ini tidak wujud. · This page doesn’t exist.
        </p>
        <Link
          href={`/${routing.defaultLocale}`}
          className="bg-primary text-primary-foreground mt-2 rounded-lg px-4 py-2 text-sm font-medium"
        >
          Kembali ke Utama · Back to Home
        </Link>
      </body>
    </html>
  );
}
