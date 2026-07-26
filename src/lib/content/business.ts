import businessData from "@/content/site/business.json";
import { businessInfoSchema, type BusinessInfo } from "@/content/schemas/business";
import { parseContent } from "./parse";

let cached: BusinessInfo | null = null;

export function getBusinessInfo(): BusinessInfo {
  cached ??= parseContent(businessInfoSchema, businessData, "content/site/business.json");
  return cached;
}
