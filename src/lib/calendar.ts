import { SITE } from "./site";

function to24h(time: string) {
  const match = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i.exec(time.trim());
  if (!match) return { hour: 11, minute: 0 };
  let hour = Number(match[1]) % 12;
  if ((match[3] ?? "").toUpperCase() === "PM") hour += 12;
  return { hour, minute: Number(match[2]) };
}

/** Consultation start/end as UTC stamps (studio runs on IST, UTC+5:30). */
export function slotToUtc(slotDate: string, slotTime: string) {
  const parts = slotDate.split("-").map(Number);
  const y = parts[0] ?? 1970;
  const m = parts[1] ?? 1;
  const d = parts[2] ?? 1;
  const { hour, minute } = to24h(slotTime);
  const start = new Date(Date.UTC(y, m - 1, d, hour, minute) - 5.5 * 60 * 60 * 1000);
  const end = new Date(start.getTime() + 45 * 60 * 1000);
  return { start, end };
}

function stamp(date: Date) {
  return `${date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
}

export function buildIcs(input: {
  fullName: string;
  service: string;
  slotDate: string;
  slotTime: string;
}) {
  const { start, end } = slotToUtc(input.slotDate, input.slotTime);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Passionate Interior//Consultation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}-${input.slotTime.replace(/\s/g, "")}@passionateinterior`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:Interior Design Consultation — ${SITE.shortName}`,
    `DESCRIPTION:${input.service} consultation for ${input.fullName}. Call ${SITE.phones[0]} for changes.`,
    `LOCATION:${SITE.addresses[0]}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT60M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Consultation reminder",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Consultation tomorrow",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function googleCalendarLink(input: {
  service: string;
  slotDate: string;
  slotTime: string;
}) {
  const { start, end } = slotToUtc(input.slotDate, input.slotTime);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Interior Design Consultation — ${SITE.shortName}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: `${input.service} consultation. ${SITE.phones[0]}`,
    location: SITE.addresses[0],
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}