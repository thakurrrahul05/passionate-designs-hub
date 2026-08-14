import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "./ThemeToggle";
import { NAV, SITE } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-10">
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-display text-xl tracking-tight text-foreground">
            Passionate <span className="text-gold">Interior</span>
          </span>
          <span className="eyebrow mt-1">Design &amp; Studio · Lucknow</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-gold" }}
              className="text-sm text-foreground/75 transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}
            className="hidden text-sm text-foreground/70 transition-colors hover:text-gold xl:inline"
          >
            {SITE.phones[0]}
          </a>
          <ThemeToggle />
          <Link
            to="/book"
            className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Book Consultation
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background px-5 pb-5 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border/40 py-3 text-sm text-foreground/80"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/book"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Book a Free Consultation
          </Link>
        </nav>
      )}
    </header>
  );
}