import type { AppLocale } from "@/i18n/routing";

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  locale: AppLocale;
}

export interface BlogPost extends BlogPostFrontmatter {
  contentHtml: string;
  readingTimeMinutes: number;
}
