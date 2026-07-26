import { z } from "zod";
import { localizedTextSchema } from "./common";

export const productSchema = z.object({
  slug: z.string().min(1),
  name: localizedTextSchema,
  /** Arabic-script name shown as a secondary label for authenticity, e.g. "تمر عجوة". */
  nameAr: z.string().optional(),
  description: localizedTextSchema,
  /** Public path under /public, or "" while awaiting artwork. */
  image: z.string(),
});

export const productCategorySchema = z.object({
  slug: z.string().min(1),
  name: localizedTextSchema,
  nameAr: z.string().optional(),
  description: localizedTextSchema,
  image: z.string(),
  products: z.array(productSchema),
});

export const productCategoriesSchema = z.array(productCategorySchema);

export type Product = z.infer<typeof productSchema>;
export type ProductCategory = z.infer<typeof productCategorySchema>;
