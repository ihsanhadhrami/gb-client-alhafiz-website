import type { ComponentProps } from "react";
import type { Link } from "@/i18n/navigation";

/** Message key under the `Nav` namespace. */
type NavLabelKey = "home" | "about" | "products" | "visitUs" | "blog" | "contact" | "faq";

export interface NavItem {
  href: ComponentProps<typeof Link>["href"];
  labelKey: NavLabelKey;
}

/** Primary navigation, shared by the header and footer. */
export const navItems = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/products", labelKey: "products" },
  { href: "/visit-us", labelKey: "visitUs" },
  { href: "/blog", labelKey: "blog" },
  { href: "/contact", labelKey: "contact" },
] as const satisfies readonly NavItem[];

/** Secondary links surfaced in the footer only (kept out of the primary bar). */
export const footerNavItems = [
  { href: "/faq", labelKey: "faq" },
] as const satisfies readonly NavItem[];
