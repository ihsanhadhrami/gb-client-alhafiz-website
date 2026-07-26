import { getPathname } from "@/i18n/navigation";
import { SITE } from "@/config/site";
import type { AppLocale } from "@/i18n/routing";
import type { BlogPost } from "@/content/schemas/blog";

export function ArticleJsonLd({ post, locale }: { post: BlogPost; locale: AppLocale }) {
  const path = getPathname({
    locale,
    href: { pathname: "/blog/[slug]", params: { slug: post.slug } },
  });
  const url = `${SITE.url}${path}`;
  const image = post.coverImage
    ? `${SITE.url}${post.coverImage}`
    : `${SITE.url}${SITE.ogImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    keywords: post.tags.join(", "),
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
