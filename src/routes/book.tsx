import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CalendarPlus, Check, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Reveal } from "@/components/Reveal";
import { buildIcs, googleCalendarLink } from "@/lib/calendar";
import { createBooking, getBookedSlots } from "@/lib/enquiries.functions";
import { bookingSchema } from "@/lib/schemas";
import {
  BUDGET_RANGES,
  PROPERTY_TYPES,
  SERVICE_OPTIONS,
  SITE,
  TIME_SLOTS,
  whatsappLink,
} from "@/lib/site";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Free Consultation | Passionate Interior, Lucknow" },
      {
        name: "description",
        content:
          "Pick a date and time slot for a free interior design consultation in Lucknow. Calendar reminder and WhatsApp confirmation included.",
      },
      { property: "og:title", content: "Book a Free Interior Design Consultation" },
      {
        property: "og:description",
        content: "Three quick steps: project details, your slot, and confirmation.",
      },
    ],
  }),
  component: BookPage,
});

const fieldClass =
  "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold";

const STEPS = ["Project", "Slot", "Confirm"];

function upcomingDays(count: number) {
  const days: { iso: string; label: string; weekday: string }[] = [];
  const start = new Date();
  for (let i = 1; i <= count; i += 1) {
    const day = new Date(start.getTime() + i * 86400000);
    const iso = day.toISOString().slice(0, 10);
    days.push({
      iso,
      label: day.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      weekday: day.toLocaleDateString("en-IN", { weekday: "short" }),
    });
  }
  return days;
}

function BookPage() {
  const fetchTaken = useServerFn(getBookedSlots);
  const submitBooking = useServerFn(createBooking);

  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [days] = useState(() => upcomingDays(14));
  const [form, setForm] = useState({
    service: "",
    propertyType: "",
    spaceSize: "",
    budgetRange: "",
    slotDate: "",
    slotTime: "",
    fullName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const range = { from: days[0]?.iso ?? "", to: days[days.length - 1]?.iso ?? "" };
  const { data: takenData } = useQuery({
    queryKey: ["booked-slots", range.from, range.to],
    queryFn: () => fetchTaken({ data: range }),
    enabled: step >= 1 && Boolean(range.from),
  });
  const taken = new Set(takenData?.taken ?? []);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function nextFromStepOne() {
    if (!form.service || !form.propertyType) {
      toast.error("Pick a service and property type to continue");
      return;
    }
    setStep(1);
  }

  function nextFromStepTwo() {
    if (!form.slotDate || !form.slotTime) {
      toast.error("Choose a date and a time slot");
      return;
    }
    setStep(2);
  }

  async function confirm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = bookingSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }
    setBusy(true);
    try {
      await submitBooking({ data: parsed.data });
      setConfirmed(true);
      toast.success("Your slot is confirmed.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not confirm the booking");
    } finally {
      setBusy(false);
    }
  }

  function downloadIcs() {
    const ics = buildIcs({
      fullName: form.fullName,
      service: form.service,
      slotDate: form.slotDate,
      slotTime: form.slotTime,
    });
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "passionate-interior-consultation.ics";
    link.click();
    URL.revokeObjectURL(url);
  }

  if (confirmed) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-24 lg:px-10">
        <Reveal>
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-gold/15 text-gold">
            <Check className="size-5" />
          </span>
          <h1 className="mt-8 text-4xl">Your consultation is booked.</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {form.slotDate} at {form.slotTime} · {form.service}. Our team will call{" "}
            {form.phone} to confirm. Studio hours: {SITE.hours}.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadIcs}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-primary-foreground"
            >
              <CalendarPlus className="size-4" /> Add to calendar (with reminders)
            </button>
            <a
              href={googleCalendarLink({
                service: form.service,
                slotDate: form.slotDate,
                slotTime: form.slotTime,
              })}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border/70 px-6 py-3 text-sm"
            >
              Google Calendar
            </a>
            <a
              href={whatsappLink(
                `Hi ${SITE.shortName}, I booked a ${form.service} consultation on ${form.slotDate} at ${form.slotTime}. Name: ${form.fullName}.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-6 py-3 text-sm text-gold"
            >
              <MessageCircle className="size-4" /> Continue on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-5 py-20 lg:px-10">
      <Reveal>
        <p className="eyebrow">Book a Free Consultation</p>
        <h1 className="mt-6 text-4xl leading-tight sm:text-5xl">Three steps, under a minute.</h1>
      </Reveal>

      <div className="mt-12 flex items-center gap-3">
        {STEPS.map((label, index) => (
          <div key={label} className="flex flex-1 items-center gap-3">
            <span
              className={`inline-flex size-8 items-center justify-center rounded-full border text-xs ${
                index <= step
                  ? "border-gold bg-gold text-primary-foreground"
                  : "border-border/70 text-muted-foreground"
              }`}
            >
              {index + 1}
            </span>
            <span
              className={`text-sm ${index <= step ? "text-foreground" : "text-muted-foreground"}`}
            >
              {label}
            </span>
            {index < STEPS.length - 1 && <span className="h-px flex-1 bg-border" />}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-border/70 bg-card p-8">
        {step === 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm sm:col-span-2">
              What do you need?
              <select
                value={form.service}
                onChange={(event) => set("service", event.target.value)}
                className={fieldClass}
              >
                <option value="">Select a service</option>
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Property Type
              <select
                value={form.propertyType}
                onChange={(event) => set("propertyType", event.target.value)}
                className={fieldClass}
              >
                <option value="">Select</option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              Space Size (Sq. Ft.)
              <input
                value={form.spaceSize}
                onChange={(event) => set("spaceSize", event.target.value)}
                inputMode="numeric"
                maxLength={20}
                placeholder="e.g. 1250"
                className={fieldClass}
              />
            </label>
            <label className="text-sm sm:col-span-2">
              Budget Range
              <select
                value={form.budgetRange}
                onChange={(event) => set("budgetRange", event.target.value)}
                className={fieldClass}
              >
                <option value="">Select a range</option>
                {BUDGET_RANGES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={nextFromStepOne}
              className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-primary-foreground sm:col-span-2"
            >
              Choose a slot
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="eyebrow">Pick a date</p>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {days.map((day) => (
                <button
                  key={day.iso}
                  type="button"
                  onClick={() => {
                    set("slotDate", day.iso);
                    set("slotTime", "");
                  }}
                  className={`shrink-0 rounded-2xl border px-5 py-3 text-center transition-colors ${
                    form.slotDate === day.iso
                      ? "border-gold bg-gold text-primary-foreground"
                      : "border-border/70 hover:border-gold"
                  }`}
                >
                  <span className="block text-xs opacity-70">{day.weekday}</span>
                  <span className="block text-sm">{day.label}</span>
                </button>
              ))}
            </div>

            <p className="eyebrow mt-8">Pick a time ({SITE.hours})</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TIME_SLOTS.map((slot) => {
                const isTaken = taken.has(`${form.slotDate}|${slot}`);
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={!form.slotDate || isTaken}
                    onClick={() => set("slotTime", slot)}
                    className={`rounded-xl border px-4 py-3 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      form.slotTime === slot
                        ? "border-gold bg-gold text-primary-foreground"
                        : "border-border/70 hover:border-gold"
                    }`}
                  >
                    {isTaken ? "Booked" : slot}
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="rounded-full border border-border/70 px-6 py-3 text-sm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextFromStepTwo}
                className="rounded-full bg-gold px-7 py-3 text-sm font-medium text-primary-foreground"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={confirm} className="grid gap-5 sm:grid-cols-2">
            <p className="text-sm text-muted-foreground sm:col-span-2">
              {form.service} · {form.propertyType} · {form.slotDate} at {form.slotTime}
            </p>
            <label className="text-sm sm:col-span-2">
              Full Name
              <input
                value={form.fullName}
                onChange={(event) => set("fullName", event.target.value)}
                required
                maxLength={100}
                className={fieldClass}
              />
            </label>
            <label className="text-sm">
              Email
              <input
                value={form.email}
                onChange={(event) => set("email", event.target.value)}
                type="email"
                required
                maxLength={255}
                className={fieldClass}
              />
            </label>
            <label className="text-sm">
              Phone Number
              <input
                value={form.phone}
                onChange={(event) => set("phone", event.target.value)}
                required
                maxLength={20}
                className={fieldClass}
              />
            </label>
            <label className="text-sm sm:col-span-2">
              Notes (optional)
              <textarea
                value={form.notes}
                onChange={(event) => set("notes", event.target.value)}
                rows={3}
                maxLength={1000}
                className={fieldClass}
              />
            </label>
            <div className="flex gap-3 sm:col-span-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-full border border-border/70 px-6 py-3 text-sm"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={busy}
                className="rounded-full bg-gold px-7 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
              >
                {busy ? "Confirming…" : "Confirm booking"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}