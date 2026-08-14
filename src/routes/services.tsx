import { createFileRoute, Link } from "@tanstack/react-router";
import { ChefHat, Home, PencilRuler, Building2 } from "lucide-react";

import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Interior Design Services in Lucknow | Passionate Interior" },
      {
        name: "description",
        content:
          "Residential interiors, modular kitchens, commercial and office spaces, plus 2D drafting, 3D visualisation, material sourcing and onsite execution.",
      },
      { property: "og:title", content: "Our Interior Design Services" },
      {
        property: "og:description",
        content:
          "Turnkey homes, ergonomic modular kitchens, high-productivity offices and a complete design process.",
      },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    icon: Home,
    title: "Residential Interiors",
    body: "Turnkey full home designs, premium false ceilings, custom living rooms, luxury bedrooms, and space-optimizing TV cabinets.",
  },
  {
    icon: ChefHat,
    title: "Modular Kitchens",
    body: "Ergonomic, budget-friendly layouts, customized storage, and high-quality material execution.",
  },
  {
    icon: Building2,
    title: "Commercial & Office Spaces",
    body: "High-productivity corporate offices, functional retail showrooms, and specialized commercial renovations.",
  },
  {
    icon: PencilRuler,
    title: "Design Process",
    body: "2D technical drafting, realistic 3D design visualizations, material sourcing, and onsite execution.",
  },
];

function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-20 lg:px-10">
        <Reveal>
          <p className="eyebrow">Services</p>
          <h1 className="mt-6 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Everything from the first drawing to the final handover.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-5 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <article className="h-full rounded-3xl border border-border/70 bg-card p-9 transition-colors hover:border-gold/60">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold/12 text-gold">
                  <service.icon className="size-5" />
                </span>
                <h2 className="mt-7 text-2xl text-card-foreground">{service.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24 text-center lg:px-10">
        <Reveal>
          <h2 className="text-3xl">Not sure where to start?</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            A free consultation covers scope, materials, timeline and an honest budget range.
          </p>
          <Link
            to="/book"
            className="mt-8 inline-flex rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-primary-foreground"
          >
            Book a Free Consultation
          </Link>
        </Reveal>
      </section>
    </>
  );
}