import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Prose } from "@/components/ui/prose";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/blog/post-card";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/config/seo";
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from "@/lib/content/blog";
import { getAppLocale, resolveLocale } from "@/i18n/locale";
import { formatDate } from "@/lib/date";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(resolveLocale(locale), slug);
  if (!post) return {};

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    href: { pathname: "/blog/[slug]", params: { slug } },
    locale,
    images: post.coverImage ? [post.coverImage] : undefined,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const activeLocale = await getAppLocale();
  const post = await getPostBySlug(activeLocale, slug);
  if (!post) notFound();

  const t = await getTranslations("Blog");
  const related = await getRelatedPosts(activeLocale, post);

  return (
    <>
      <ArticleJsonLd post={post} locale={activeLocale} />

      <article className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1.5 text-sm font-medium"
          >
            <ArrowLeft className="size-4" />
            {t("backToBlog")}
          </Link>

          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <time dateTime={post.date}>{formatDate(post.date, activeLocale)}</time>
            <span aria-hidden>·</span>
            <span>{t("readingTime", { minutes: post.readingTimeMinutes })}</span>
          </div>

          <h1 className="font-heading text-foreground mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {post.coverImage && (
            <div className="relative mt-8 aspect-16/9 overflow-hidden rounded-2xl">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <Prose html={post.contentHtml} className="mt-8" />
        </Container>
      </article>

      {related.length > 0 && (
        <section className="border-border/60 border-t py-14 sm:py-16">
          <Container className="max-w-3xl">
            <h2 className="font-heading text-foreground mb-6 text-xl font-semibold">
              {t("relatedTitle")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((rel) => (
                <PostCard key={rel.slug} post={rel} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
