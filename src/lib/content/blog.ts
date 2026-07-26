import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";
import {
  blogFrontmatterSchema,
  type BlogPost,
  type BlogPostSummary,
} from "@/content/schemas/blog";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { parseContent } from "./parse";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");
const IS_PROD = process.env.NODE_ENV === "production";

function localeDir(locale: AppLocale): string {
  return path.join(BLOG_DIR, locale);
}

function readSlugs(locale: AppLocale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

async function readPost(locale: AppLocale, slug: string): Promise<BlogPost | null> {
  const filePath = path.join(localeDir(locale), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  // Filename and directory are the authority for slug/locale to prevent drift.
  const frontmatter = parseContent(
    blogFrontmatterSchema,
    { ...data, slug, locale },
    `content/blog/${locale}/${slug}.md`,
  );

  if (frontmatter.draft && IS_PROD) return null;

  const processed = await remark().use(html).process(content);

  return {
    ...frontmatter,
    contentHtml: processed.toString(),
    readingTimeMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

/** Every slug across all locales (deduplicated) — for static params and sitemap. */
export function getAllPostSlugs(): { slug: string }[] {
  const slugs = new Set<string>();
  for (const locale of routing.locales) {
    for (const slug of readSlugs(locale)) slugs.add(slug);
  }
  return [...slugs].map((slug) => ({ slug }));
}

/** Published posts for a locale, newest first (as summaries — body omitted by type). */
export async function getAllPosts(locale: AppLocale): Promise<BlogPostSummary[]> {
  const posts = await Promise.all(
    readSlugs(locale).map((slug) => readPost(locale, slug)),
  );
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** A single rendered post, or null if missing/draft. */
export function getPostBySlug(locale: AppLocale, slug: string): Promise<BlogPost | null> {
  return readPost(locale, slug);
}

/** Posts sharing at least one tag with the given post, newest first. */
export async function getRelatedPosts(
  locale: AppLocale,
  post: BlogPostSummary,
  limit = 2,
): Promise<BlogPostSummary[]> {
  const all = await getAllPosts(locale);
  return all
    .filter((p) => p.slug !== post.slug && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, limit);
}

/** All distinct tags in a locale, for taxonomy/filtering UIs. */
export async function getAllTags(locale: AppLocale): Promise<string[]> {
  const all = await getAllPosts(locale);
  return [...new Set(all.flatMap((p) => p.tags))].sort();
}
