import { MapPin, Phone, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "./container";
import { Logo } from "./logo";
import { getBusinessInfo } from "@/lib/content/business";
import { formatHoursSummary } from "@/lib/hours";
import { getAppLocale } from "@/i18n/locale";
import { navItems, footerNavItems } from "@/config/navigation";
import { InstagramIcon, FacebookIcon, TiktokIcon } from "@/components/icons/social-icons";
import type { SocialLink } from "@/content/schemas/business";
import type { FunctionComponent, SVGProps } from "react";

/** Not every platform has a mark; a missing entry is skipped, no cast needed. */
const socialIcons: Partial<
  Record<SocialLink["platform"], FunctionComponent<SVGProps<SVGSVGElement>>>
> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
};

export async function Footer() {
  const locale = await getAppLocale();
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const tCommon = await getTranslations("Common");
  const business = getBusinessInfo();
  const hours = formatHoursSummary(business.hours, locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-secondary/40 border-t">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-muted-foreground max-w-xs text-sm">{t("tagline")}</p>
          <div className="flex gap-3 pt-1">
            {business.socials.map((social) => {
              const Icon = socialIcons[social.platform];
              if (!Icon) return null;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="border-border text-muted-foreground hover:border-primary hover:text-primary flex size-9 items-center justify-center rounded-full border transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-foreground mb-4 text-sm font-semibold">
            {t("quickLinks")}
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {[...navItems, ...footerNavItems].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tNav(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-foreground mb-4 text-sm font-semibold">
            {t("contactUs")}
          </h3>
          <ul className="text-muted-foreground flex flex-col gap-3 text-sm">
            <li className="flex gap-2.5">
              <MapPin className="text-primary mt-0.5 size-4 shrink-0" />
              <span>
                {[business.address.line1, business.address.line2]
                  .filter(Boolean)
                  .join(", ")}
                , {business.address.postcode} {business.address.city},{" "}
                {business.address.state}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="text-primary size-4 shrink-0" />
              <a href={`tel:${business.phone}`} className="hover:text-foreground">
                {business.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="text-primary size-4 shrink-0" />
              <a href={`mailto:${business.email}`} className="hover:text-foreground">
                {business.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-foreground mb-4 text-sm font-semibold">
            {tCommon("openingHours")}
          </h3>
          <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
            {hours.map((entry) => (
              <li key={entry.label} className="flex justify-between gap-4">
                <span>{entry.label}</span>
                <span className="text-foreground">{entry.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-border border-t">
        <Container className="text-muted-foreground flex flex-col items-center justify-between gap-2 py-6 text-xs sm:flex-row">
          <p>
            © {year} {business.name}. {t("rights")}
          </p>
        </Container>
      </div>
    </footer>
  );
}
