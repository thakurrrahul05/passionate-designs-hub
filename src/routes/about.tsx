import { createFileRoute, Link } from "@tanstack/react-router";

import aboutStudio from "@/assets/about-studio.jpg";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Passionate Interior | Design Studio in Lucknow" },
      {
        name: "description",
        content:
          "A creative, customer-centric interior design firm bridging creative blueprints and flawless physical execution across Lucknow and Delhi NCR.",
      },
      { property: "og:title", content: "About Passionate Interior Design & Studio" },
      {
        property: "og:description",
        content: "Custom home and office transformations balancing utility with sophisticated styling.",
      },
    ],
  }),
  component: AboutPage,
});

const MILESTONES = [
  { year: "2012", label: "Studio founded in Lucknow" },
  { year: "2016", label: "Turnkey execution team brought in-house" },
  { year: "2020", label: "Modular kitchen and joinery vertical added" },
  { year: "Today", label: "Serving Lucknow and Delhi NCR" },
];

function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-20 lg:px-10">
        <Reveal>
          <p className="eyebrow">About Us</p>
          <h1 className="mt-6 max-w-3xl text-4xl leading-tight sm:text-5xl">
            We take the worry out of design.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto mt-14 grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <img
            src={aboutStudio}
            alt="Passionate Interior designers reviewing drawings and material samples"
            loading="lazy"
            width={1600}
            height={1104}
            className="rounded-3xl object-cover"
          />
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-center">
          <h2 className="text-2xl text-foreground">Our Story</h2>
          <div className="rule-gold mt-4" />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Passionate Interior is a creative, customer-centric firm built to take the worry out of
            design assets. We bridge the gap between creative blueprints and flawless physical
            execution, serving Lucknow and Delhi NCR.
          </p>
          <h2 className="mt-12 text-2xl text-foreground">Our Mission</h2>
          <div className="rule-gold mt-4" />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Delivering custom home and office transformations that seamlessly balance practical
            utility with sophisticated styling.
          </p>
        </Reveal>
      </section>

      <section className="mt-24 border-y border-border/60 bg-surface py-20 text-surface-foreground">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <p className="eyebrow">Since {SITE.established}</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">A decade of building interiors.</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((item, index) => (
              <Reveal key={item.year} delay={index * 0.08}>
                <div className="border-t border-gold/40 pt-5">
                  <p className="font-display text-3xl text-gold">{item.year}</p>
                  <p className="mt-2 text-sm text-surface-foreground/70">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center lg:px-10">
        <Reveal>
          <h2 className="text-3xl">Tell us about your space.</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Consultations run {SITE.hours.toLowerCase()}.
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