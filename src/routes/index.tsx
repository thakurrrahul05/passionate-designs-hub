import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeIndianRupee, CalendarClock, Hammer, Star } from "lucide-react";

import heroLiving from "@/assets/hero-living.jpg";
import { Reveal } from "@/components/Reveal";
import { PROJECTS } from "@/lib/portfolio";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Interior Designers in Lucknow | Passionate Interior Design & Studio" },
      {
        name: "description",
        content:
          "Modern, elegant and premium interior designs in Lucknow. Turnkey residential interiors, modular kitchens and commercial spaces since 2012. Book a free consultation.",
      },
      { property: "og:title", content: "Modern, Elegant and Premium Interiors in Lucknow" },
      {
        property: "og:description",
        content:
          "Turnkey interior design with transparent budgets, 4.5+ Google rating and end-to-end execution.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: SITE.name,
          description: SITE.tagline,
          telephone: SITE.phones,
          foundingDate: String(SITE.established),
          openingHours: "Mo-Su 11:00-18:00",
          address: {
            "@type": "PostalAddress",
            streetAddress: "2nd Floor, 1/89, Raj Mata Square, Vinay Khand 1, Gomti Nagar",
            addressLocality: "Lucknow",
            postalCode: "226010",
            addressRegion: "Uttar Pradesh",
            addressCountry: "IN",
          },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "60" },
        }),
      },
    ],
  }),
  component: Index,
});

const FEATURES = [
  {
    icon: Star,
    title: "4.5+ Google Rating",
    body: "Consistently rated by Lucknow homeowners and business owners for design and delivery.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Budget Transparency",
    body: "Itemised, honest quotations. No hidden costs between the drawing and the handover.",
  },
  {
    icon: Hammer,
    title: "End-to-End Turnkey Execution",
    body: "Drafting, 3D visualisation, material sourcing and onsite execution under one roof.",
  },
  {
    icon: CalendarClock,
    title: "Established in 2012",
    body: "Over a decade of completed homes, offices and retail spaces across Lucknow and Delhi NCR.",
  },
];

function Index() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroLiving}
          alt="Premium dark-toned living room interior designed in Lucknow"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-end px-5 pb-20 pt-32 lg:px-10">
          <Reveal>
            <p className="eyebrow">Architecture &amp; Interior Design · Lucknow</p>
            <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
              Modern, Elegant, and Premium Interior Designs in Lucknow.
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground">
              We design and build complete interiors — from the first 2D draft to the final
              handover — for homes, offices and retail spaces.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Book a Free Consultation <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/portfolio"
                className="text-sm text-foreground/80 underline decoration-gold/60 underline-offset-8 hover:text-gold"
              >
                View our work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.08}>
              <article className="h-full rounded-3xl border border-border/70 bg-card p-7 transition-colors hover:border-gold/60">
                <feature.icon className="size-5 text-gold" />
                <h2 className="mt-6 text-2xl text-card-foreground">{feature.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{feature.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface py-20 text-surface-foreground">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <p className="eyebrow">Selected Work</p>
            <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl">
              Spaces built around how you actually live and work.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PROJECTS.slice(0, 3).map((project, index) => (
              <Reveal key={project.title} delay={index * 0.1}>
                <figure className="group overflow-hidden rounded-3xl border border-surface-foreground/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    width={project.width}
                    height={project.height}
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <figcaption className="p-5">
                    <p className="text-lg">{project.title}</p>
                    <p className="mt-1 text-xs text-surface-foreground/60">{project.location}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link
              to="/portfolio"
              className="mt-10 inline-flex items-center gap-2 text-sm text-gold"
            >
              Explore the full gallery <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-24 text-center lg:px-10">
        <Reveal>
          <blockquote className="text-2xl leading-relaxed text-foreground sm:text-3xl">
            “They handled everything — drawings, materials, carpentry, lighting. We moved into a
            finished home, exactly like the 3D views.”
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground">
            3 BHK turnkey project · Vinay Khand, Gomti Nagar
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-10">
        <Reveal>
          <div className="rounded-[2rem] border border-gold/40 bg-card px-8 py-14 text-center">
            <h2 className="text-3xl sm:text-4xl">Start with a free consultation.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              Pick a slot that suits you. {SITE.hours}. We will call to confirm and walk you through
              scope, timelines and budget.
            </p>
            <Link
              to="/book"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-primary-foreground"
            >
              Book your slot <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
