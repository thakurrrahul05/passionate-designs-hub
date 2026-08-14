import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Instagram, X } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/Reveal";
import { FILTERS, PROJECTS, type Filter, type Project } from "@/lib/portfolio";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio Gallery | Passionate Interior, Lucknow" },
      {
        name: "description",
        content:
          "Browse completed residential interiors, commercial spaces, modular kitchens and false ceiling projects by Passionate Interior in Lucknow.",
      },
      { property: "og:title", content: "Interior Design Portfolio — Lucknow" },
      {
        property: "og:description",
        content: "Residential, commercial, modular kitchen and false ceiling projects.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [active, setActive] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const visible =
    active === "All" ? PROJECTS : PROJECTS.filter((project) => project.category === active);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-20 lg:px-10">
        <Reveal>
          <p className="eyebrow">Portfolio Gallery</p>
          <h1 className="mt-6 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Projects delivered across Lucknow and Delhi NCR.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-3">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                  active === filter
                    ? "border-gold bg-gold text-primary-foreground"
                    : "border-border/70 text-foreground/75 hover:border-gold hover:text-gold"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.button
                key={project.title}
                type="button"
                layout
                onClick={() => setLightbox(project)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group overflow-hidden rounded-3xl border border-border/70 bg-card text-left"
              >
                <img
                  src={project.image}
                  alt={`${project.title} — ${project.category} project in ${project.location}`}
                  loading="lazy"
                  width={project.width}
                  height={project.height}
                  className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <p className="text-lg text-card-foreground">{project.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{project.location}</p>
                  </div>
                  <span className="eyebrow shrink-0">{project.category}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-5 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-gold/40 bg-card p-9 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl">More work, every week.</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Follow the studio on Instagram for site progress, reels and finished handovers.
              </p>
            </div>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-primary-foreground"
            >
              <Instagram className="size-4" /> @passionateic
            </a>
          </div>
        </Reveal>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-5"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Close image"
              onClick={() => setLightbox(null)}
              className="absolute right-5 top-5 inline-flex size-10 items-center justify-center rounded-full border border-border/70"
            >
              <X className="size-4" />
            </button>
            <motion.figure
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-h-full w-full max-w-4xl overflow-hidden rounded-3xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={lightbox.image}
                alt={lightbox.title}
                width={lightbox.width}
                height={lightbox.height}
                className="max-h-[70vh] w-full object-cover"
              />
              <figcaption className="bg-card p-5 text-sm text-card-foreground">
                {lightbox.title} · <span className="text-muted-foreground">{lightbox.location}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}