import faqData from "@/content/site/faq.json";
import { faqSchema, type FaqItem } from "@/content/schemas/faq";
import { parseContent } from "./parse";

let cached: FaqItem[] | null = null;

export function getFaqItems(): FaqItem[] {
  cached ??= parseContent(faqSchema, faqData, "content/site/faq.json");
  return cached;
}
