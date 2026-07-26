import type { BusinessHours } from "@/types/business";
import type { AppLocale } from "@/i18n/routing";

const dayLabels: Record<AppLocale, Record<BusinessHours["day"], string>> = {
  ms: {
    mon: "Isnin",
    tue: "Selasa",
    wed: "Rabu",
    thu: "Khamis",
    fri: "Jumaat",
    sat: "Sabtu",
    sun: "Ahad",
  },
  en: {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  },
};

function formatTime(time: string): string {
  const [hourStr, minute] = time.split(":");
  const hour = Number(hourStr);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute} ${period}`;
}

/** Collapses identical hours across every day into a single summary line; otherwise lists each day. */
export function formatHoursSummary(
  hours: BusinessHours[],
  locale: AppLocale,
): { label: string; value: string }[] {
  const closed = locale === "ms" ? "Tutup" : "Closed";
  const everyDay = locale === "ms" ? "Setiap Hari" : "Every Day";

  const allSame = hours.every(
    (h) => h.open === hours[0].open && h.close === hours[0].close,
  );

  if (allSame) {
    const [first] = hours;
    return [
      {
        label: everyDay,
        value:
          first.open && first.close
            ? `${formatTime(first.open)} – ${formatTime(first.close)}`
            : closed,
      },
    ];
  }

  return hours.map((h) => ({
    label: dayLabels[locale][h.day],
    value: h.open && h.close ? `${formatTime(h.open)} – ${formatTime(h.close)}` : closed,
  }));
}
