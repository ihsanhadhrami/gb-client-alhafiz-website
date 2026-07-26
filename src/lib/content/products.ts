import type { ProductCategory } from "@/types/product";
import categoriesData from "@/content/products/categories.json";

const categories = categoriesData as ProductCategory[];

export function getProductCategories(): ProductCategory[] {
  return categories;
}

export function getProductCategoryBySlug(slug: string): ProductCategory | undefined {
  return categories.find((category) => category.slug === slug);
}
