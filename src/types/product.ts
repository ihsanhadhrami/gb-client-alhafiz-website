import type { LocalizedText } from "./common";

export interface Product {
  slug: string;
  name: LocalizedText;
  /** Arabic-script name shown as a secondary label for authenticity, e.g. "تمر عجوة" */
  nameAr?: string;
  description: LocalizedText;
  image: string;
}

export interface ProductCategory {
  slug: string;
  name: LocalizedText;
  nameAr?: string;
  description: LocalizedText;
  image: string;
  products: Product[];
}
