import type { BusinessInfo } from "@/types/business";
import businessData from "@/content/site/business.json";

export function getBusinessInfo(): BusinessInfo {
  return businessData as BusinessInfo;
}
