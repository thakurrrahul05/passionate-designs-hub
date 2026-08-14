import { MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(
        `Hi ${SITE.shortName}, I'd like to discuss an interior design project.`,
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="size-4" />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}