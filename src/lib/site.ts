export const SITE = {
  name: "Passionate Interior Design & Studio",
  shortName: "Passionate Interior",
  tagline: "Modern, Elegant, and Premium Interior Designs in Lucknow.",
  established: 2012,
  phones: ["+91 86012 15393", "+91 95327 36155"],
  whatsapp: "918601215393",
  hours: "Monday to Sunday, 11:00 AM – 6:00 PM",
  instagram: "https://www.instagram.com/passionateic/",
  addresses: [
    "2nd Floor, 1/89, Raj Mata Square, Vinay Khand 1, Gomti Nagar, Lucknow - 226010, Uttar Pradesh, India.",
    "737, 5, Gomti Nagar, Lucknow, Uttar Pradesh 226010.",
  ],
  mapEmbed:
    "https://www.google.com/maps?q=Gomti+Nagar,+Lucknow,+Uttar+Pradesh+226010&output=embed",
} as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact Us" },
] as const;

export const PROPERTY_TYPES = ["Apartment", "Villa", "Office", "Retail"] as const;

export const BUDGET_RANGES = [
  "Under ₹5 Lakh",
  "₹5 – 10 Lakh",
  "₹10 – 20 Lakh",
  "₹20 – 40 Lakh",
  "₹40 Lakh +",
] as const;

export const SERVICE_OPTIONS = [
  "Residential Interiors",
  "Modular Kitchen",
  "Commercial & Office Space",
  "False Ceiling & Lighting",
  "Full Turnkey Project",
] as const;

export const TIME_SLOTS = [
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
] as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}