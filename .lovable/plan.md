# Passionate Interior — Premium Website + 24x7 Client Acquisition System

## Note on your media link
The share.google link resolves to a Google search page, not a media folder, and Instagram blocks automated fetching. So I cannot pull your real photos/videos. Plan: build with high-quality AI-generated interior visuals (styled to look like real Lucknow premium projects) plus a linked Instagram block for @passionateic. Send or upload your real photos/videos any time and I'll swap them in — the components are built so images are a one-line replace.

## Look and feel
Editorial layout inspired by virginia.edu — serif display headlines, wide full-bleed photo bands, generous whitespace, restrained palette — reinterpreted in deep charcoal + brushed gold luxury. Light/dark toggle (dark is the richer default look), rounded architectural cards, smooth scroll-reveal and hover motion.

## Pages
- **Home** — full-bleed hero video band, headline "Modern, Elegant, and Premium Interior Designs in Lucknow.", CTA "Book a Free Consultation" → booking. Features grid: 4.5+ Google Rating, Budget Transparency, End-to-End Turnkey Execution, Established in 2012. Plus a featured-projects strip, testimonial band, and a closing CTA.
- **About Us** — story and mission copy exactly as supplied, editorial two-column with photo band, timeline since 2012, Lucknow + Delhi NCR service note.
- **Services** — 4 icon cards (Residential Interiors, Modular Kitchens, Commercial & Office Spaces, Design Process) with the full detail copy for each.
- **Portfolio Gallery** — filterable responsive grid: All / Residential / Commercial / Modular Kitchens / False Ceilings, animated filtering, lightbox on click, a short project video, and an Instagram follow block.
- **Contact Us** — lead form (Full Name, Email, Phone, Property Type dropdown Apartment/Villa/Office/Retail, Space Size sq.ft., Budget Range), both addresses, both phone numbers, hours (Mon–Sun, 11 AM – 6 PM), responsive Google Maps embed for Gomti Nagar, WhatsApp CTA.
- **Sticky footer** on every page with addresses, phones, hours, nav, social.

## 3-step booking system
1. **Service & project** — service type, property type, size, budget.
2. **Slot** — calendar showing available dates, time slots limited to 11:00–18:00 daily, already-booked slots disabled in real time.
3. **Details & confirm** — name, email, phone, notes → confirmation screen with:
   - "Add to Calendar" download (.ics invite with a reminder alarm) plus Google Calendar link
   - "Continue on WhatsApp" deep link to +91 86012 15393 with the booking prefilled
   - automatic confirmation email to the client and a notification email to the studio

## Backend (Lovable Cloud)
- `leads` table — contact-form submissions.
- `bookings` table — consultations with date, time slot, status; public insert, no public read of others' data.
- `blocked_slots` / uniqueness so two people can't take the same slot.
- Server functions: create booking (validated with Zod), fetch availability for a date, send confirmation emails, generate the .ics file.
- Emails need a Resend API key — I'll ask for it when I reach that step; everything else works without it.

## Technical notes
- TanStack Start routes: `/`, `/about`, `/services`, `/portfolio`, `/contact`, `/book`; per-page SEO metadata, JSON-LD LocalBusiness with the Gomti Nagar address, phones and hours.
- Design tokens (charcoal/gold, serif+sans pairing) defined in `src/styles.css`; no hardcoded colors in components.
- Motion for React for scroll reveals and card motion; theme toggle persisted in localStorage.
- All form input validated client and server side; phone/email length and format limits.
- Floating WhatsApp button site-wide.
