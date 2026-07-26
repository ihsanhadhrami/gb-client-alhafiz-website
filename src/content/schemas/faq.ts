import { z } from "zod";
import { localizedTextSchema } from "./common";

export const faqItemSchema = z.object({
  question: localizedTextSchema,
  answer: localizedTextSchema,
});

export const faqSchema = z.array(faqItemSchema);

export type FaqItem = z.infer<typeof faqItemSchema>;
