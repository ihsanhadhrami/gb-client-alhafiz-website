import { z } from "zod";
import { localizedTextSchema } from "./common";

/** "HH:mm" in 24-hour form, e.g. "10:00" or "22:30". */
const timeString = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Expected 24h HH:mm");

export const businessHoursSchema = z.object({
  day: z.enum(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]),
  /** 24h "HH:mm", or null when closed that day. */
  open: timeString.nullable(),
  close: timeString.nullable(),
});

export const socialLinkSchema = z.object({
  platform: z.enum(["instagram", "facebook", "tiktok", "whatsapp"]),
  url: z.url(),
});

export const businessInfoSchema = z.object({
  name: z.string().min(1),
  description: localizedTextSchema,
  address: z.object({
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    postcode: z.string().min(1),
    country: z.string().min(1),
  }),
  geo: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  phone: z.string().min(1),
  whatsapp: z.string().min(1),
  email: z.email(),
  googleMapsUrl: z.url(),
  /** Optional; empty string means "not yet configured". */
  googleBusinessProfileUrl: z.union([z.url(), z.literal("")]),
  hours: z.array(businessHoursSchema).length(7, "Expected exactly 7 days of hours"),
  socials: z.array(socialLinkSchema),
  priceRange: z.string().min(1),
});

export type BusinessHours = z.infer<typeof businessHoursSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type BusinessInfo = z.infer<typeof businessInfoSchema>;
