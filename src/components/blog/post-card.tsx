import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAppLocale } from "@/i18n/locale";
import { formatDate } from "@/lib/date";
import type { BlogPostSummary } from "@/content/schemas/blog";

export async function PostCard({ post }: { post: BlogPostSummary }) {
  const t = await getTranslations("Blog");
  const locale = await getAppLocale();

  return (
    <Link
      href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
      className="group border-border bg-card hover:border-primary/40 flex flex-col overflow-hidden rounded-2xl border transition-colors"
    >
      {post.coverImage ? (
        <div className="relative aspect-16/9">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="bg-secondary/50 aspect-16/9" aria-hidden />
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          <span aria-hidden>·</span>
          <span>{t("readingTime", { minutes: post.readingTimeMinutes })}</span>
        </div>
        <h2 className="font-heading text-foreground group-hover:text-primary text-lg font-semibold">
          {post.title}
        </h2>
        <p className="text-muted-foreground line-clamp-3 text-sm">{post.excerpt}</p>
      </div>
    </Link>
  );
}
