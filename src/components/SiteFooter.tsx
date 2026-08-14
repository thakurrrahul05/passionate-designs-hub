import { Link } from "@tanstack/react-router";
import { Clock, Instagram, MapPin, Phone } from "lucide-react";

import { NAV, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface text-surface-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl">
            Passionate <span className="text-gold">Interior</span>
          </p>
          <p className="mt-4 max-w-md text-sm text-surface-foreground/70">
            Architecture and interior design studio serving Lucknow and Delhi NCR since{" "}
            {SITE.established}. Turnkey execution, transparent budgets, and design that lasts.
          </p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-gold"
          >
            <Instagram className="size-4" /> @passionateic
          </a>
        </div>

        <div>
          <p className="eyebrow">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-surface-foreground/75 hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/book" className="text-surface-foreground/75 hover:text-gold">
                Book a Consultation
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-5 text-sm">
          <div>
            <p className="eyebrow">Studio</p>
            {SITE.addresses.map((address) => (
              <p key={address} className="mt-3 flex gap-2 text-surface-foreground/75">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                {address}
              </p>
            ))}
          </div>
          <p className="flex gap-2 text-surface-foreground/75">
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
          <p className="flex gap-2 text-surface-foreground/75">
            <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
            {SITE.hours}
          </p>
        </div>
      </div>

      <div className="border-t border-surface-foreground/10 px-5 py-6 text-center text-xs text-surface-foreground/55 lg:px-10">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}