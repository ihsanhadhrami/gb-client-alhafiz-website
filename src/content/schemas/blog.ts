import { z } from "zod";
import { localeSchema } from "./common";

/** Validated shape of the YAML frontmatter at the top of each blog markdown file. */
export const blogFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  /** ISO-8601 date, e.g. "2026-07-01". */
  date: z.iso.date(),
  excerpt: z.string().min(1),
  /** Public path under /public, or "" when the post has no cover art. */
  coverImage: z.string(),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  locale: localeSchema,
  draft: z.boolean().default(false),
});

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;

/** A fully-processed post: validated frontmatter + rendered HTML + derived metadata. */
export interface BlogPost extends BlogFrontmatter {
  contentHtml: string;
  readingTimeMinutes: number;
}

/** Lightweight listing shape — everything needed for cards/index without the body HTML. */
export type BlogPostSummary = Omit<BlogPost, "contentHtml">;
