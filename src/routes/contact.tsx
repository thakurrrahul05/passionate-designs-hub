import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Clock, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Reveal } from "@/components/Reveal";
import { submitLead } from "@/lib/enquiries.functions";
import { leadSchema } from "@/lib/schemas";
import { BUDGET_RANGES, PROPERTY_TYPES, SITE, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Passionate Interior | Gomti Nagar, Lucknow" },
      {
        name: "description",
        content:
          "Talk to Passionate Interior Design & Studio in Gomti Nagar, Lucknow. Call +91 86012 15393, open Monday to Sunday 11 AM to 6 PM.",
      },
      { property: "og:title", content: "Contact Passionate Interior, Lucknow" },
      {
        property: "og:description",
        content: "Share your project details and we will call you back with a plan and budget.",
      },
    ],
  }),
  component: ContactPage,
});

const fieldClass =
  "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-gold";

function ContactPage() {
  const send = useServerFn(submitLead);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = leadSchema.safeParse({
      fullName: form.get("fullName"),
      email: form.get("email"),
      phone: form.get("phone"),
      propertyType: form.get("propertyType"),
      spaceSize: form.get("spaceSize"),
      budgetRange: form.get("budgetRange"),
      message: form.get("message"),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details");
      return;
    }

    setBusy(true);
    try {
      await send({ data: parsed.data });
      setDone(true);
      toast.success("Thank you — we will get back to you shortly.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-20 lg:px-10">
        <Reveal>
          <p className="eyebrow">Contact Us</p>
          <h1 className="mt-6 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Tell us about your space, we will do the rest.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto mt-14 grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <Reveal>
          <div className="rounded-3xl border border-border/70 bg-card p-8">
            <h2 className="text-2xl text-card-foreground">Request a callback</h2>
            {done ? (
              <div className="mt-8">
                <p className="text-sm text-muted-foreground">
                  Your enquiry is with our team. For anything urgent, message us on WhatsApp or call{" "}
                  {SITE.phones[0]}.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={whatsappLink("Hi, I just submitted an enquiry on your website.")}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-primary-foreground"
                  >
                    Continue on WhatsApp
                  </a>
                  <Link
                    to="/book"
                    className="rounded-full border border-border/70 px-6 py-3 text-sm"
                  >
                    Book a slot instead
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="text-sm sm:col-span-2">
                  Full Name
                  <input name="fullName" required maxLength={100} className={fieldClass} />
                </label>
                <label className="text-sm">
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    className={fieldClass}
                  />
                </label>
                <label className="text-sm">
                  Phone Number
                  <input name="phone" required maxLength={20} className={fieldClass} />
                </label>
                <label className="text-sm">
                  Property Type
                  <select name="propertyType" required defaultValue="" className={fieldClass}>
                    <option value="" disabled>
                      Select
                    </option>
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
                    name="spaceSize"
                    inputMode="numeric"
                    maxLength={20}
                    placeholder="e.g. 1250"
                    className={fieldClass}
                  />
                </label>
                <label className="text-sm sm:col-span-2">
                  Budget Range
                  <select name="budgetRange" defaultValue="" className={fieldClass}>
                    <option value="">Select a range</option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm sm:col-span-2">
                  Anything else? (optional)
                  <textarea name="message" rows={4} maxLength={1000} className={fieldClass} />
                </label>
                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-primary-foreground disabled:opacity-60 sm:col-span-2"
                >
                  {busy ? "Sending…" : "Send my enquiry"}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-8">
          <div className="rounded-3xl border border-border/70 bg-card p-8 text-sm">
            <h2 className="text-2xl text-card-foreground">Studio details</h2>
            <div className="mt-6 space-y-5 text-muted-foreground">
              {SITE.addresses.map((address, index) => (
                <p key={address} className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span>
                    <span className="eyebrow block">Address {index + 1}</span>
                    {address}
                  </span>
                </p>
              ))}
              <p className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>
                  {SITE.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block hover:text-gold"
                    >
                      {phone}
                    </a>
                  ))}
                </span>
              </p>
              <p className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
                {SITE.hours}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border/70">
            <div className="aspect-[4/3] w-full">
              <iframe
                title="Passionate Interior studio location in Gomti Nagar, Lucknow"
                src={SITE.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full border-0"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}