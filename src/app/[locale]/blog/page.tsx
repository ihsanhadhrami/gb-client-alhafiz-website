import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { PostCard } from "@/components/blog/post-card";
import { buildPageMetadata } from "@/config/seo";
import { getAllPosts } from "@/lib/content/blog";
import { getAppLocale } from "@/i18n/locale";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    href: "/blog",
    locale,
  });
}

export default async function BlogPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const activeLocale = await getAppLocale();
  const posts = await getAllPosts(activeLocale);

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <section className="py-16 sm:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-muted-foreground border-border bg-secondary/40 rounded-2xl border border-dashed p-8 text-center text-sm">
              {t("empty")}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
