/**
 * Builders for phone/WhatsApp/email links.
 *
 * Business numbers are stored in human-readable form (e.g. "+60 16-341 0094"),
 * but `tel:` and wa.me URLs must not contain spaces or visual separators —
 * dialers and WhatsApp silently fail to parse them. Always build the href with
 * these helpers rather than interpolating the raw number.
 */

/** `tel:` URI — keeps digits and a leading "+", drops spaces and separators. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** wa.me deep link — digits only; wa.me rejects "+" and separators. */
export function whatsappHref(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

/** `mailto:` URI. */
export function mailtoHref(email: string): string {
  return `mailto:${email.trim()}`;
}
