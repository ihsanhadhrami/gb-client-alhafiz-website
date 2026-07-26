import type { Metadata } from "next";
import type { FunctionComponent, SVGProps } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { buildPageMetadata } from "@/config/seo";
import { getBusinessInfo } from "@/lib/content/business";
import { InstagramIcon, FacebookIcon, TiktokIcon } from "@/components/icons/social-icons";
import type { SocialLink } from "@/content/schemas/business";

type Params = { params: Promise<{ locale: string }> };

const socialIcons: Partial<
  Record<SocialLink["platform"], FunctionComponent<SVGProps<SVGSVGElement>>>
> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TiktokIcon,
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    href: "/contact",
    locale,
  });
}

export default async function ContactPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");
  const business = getBusinessInfo();
  const waNumber = business.whatsapp.replace(/\D/g, "");

  const methods = [
    {
      key: "phone",
      icon: Phone,
      label: t("phoneLabel"),
      value: business.phone,
      href: `tel:${business.phone.replace(/\s/g, "")}`,
    },
    {
      key: "whatsapp",
      icon: MessageCircle,
      label: t("whatsappLabel"),
      value: business.whatsapp,
      href: `https://wa.me/${waNumber}`,
    },
    {
      key: "email",
      icon: Mail,
      label: t("emailLabel"),
      value: business.email,
      href: `mailto:${business.email}`,
    },
  ];

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {methods.map(({ key, icon: Icon, label, value, href }) => (
              <a
                key={key}
                href={href}
                target={key === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group border-border bg-card hover:border-primary/40 flex flex-col gap-3 rounded-2xl border p-6 transition-colors"
              >
                <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-full">
                  <Icon className="size-5" />
                </span>
                <span className="text-muted-foreground text-sm">{label}</span>
                <span className="text-foreground group-hover:text-primary text-sm font-medium break-words">
                  {value}
                </span>
              </a>
            ))}
          </div>

          <p className="text-muted-foreground border-border mt-8 rounded-2xl border border-dashed p-5 text-sm">
            {t("note")}
          </p>

          {business.socials.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-foreground text-lg font-semibold">
                {t("followTitle")}
              </h2>
              <div className="mt-4 flex gap-3">
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
                      className="border-border text-muted-foreground hover:border-primary hover:text-primary flex size-10 items-center justify-center rounded-full border transition-colors"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
