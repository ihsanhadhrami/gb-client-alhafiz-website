import categoriesData from "@/content/products/categories.json";
import { productCategoriesSchema, type ProductCategory } from "@/content/schemas/product";
import { parseContent } from "./parse";

let cached: ProductCategory[] | null = null;

function getCategories(): ProductCategory[] {
  cached ??= parseContent(
    productCategoriesSchema,
    categoriesData,
    "content/products/categories.json",
  );
  return cached;
}

export function getProductCategories(): ProductCategory[] {
  return getCategories();
}

export function getProductCategoryBySlug(slug: string): ProductCategory | undefined {
  return getCategories().find((category) => category.slug === slug);
}

export function getProductCategorySlugs(): string[] {
  return getCategories().map((category) => category.slug);
}
