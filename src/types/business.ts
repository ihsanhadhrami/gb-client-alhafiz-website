import type { LocalizedText } from "./common";

export interface BusinessHours {
  /** ISO-8601 weekday abbreviation: mon, tue, wed, thu, fri, sat, sun */
  day: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  /** 24h "HH:mm", or null when closed that day */
  open: string | null;
  close: string | null;
}

export interface SocialLink {
  platform: "instagram" | "facebook" | "tiktok" | "whatsapp";
  url: string;
}

export interface BusinessInfo {
  name: string;
  description: LocalizedText;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  geo: {
    lat: number;
    lng: number;
  };
  phone: string;
  whatsapp: string;
  email: string;
  googleMapsUrl: string;
  googleBusinessProfileUrl: string;
  hours: BusinessHours[];
  socials: SocialLink[];
  priceRange: string;
}
