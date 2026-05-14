import { MessageCircle } from "lucide-react";
import { business } from "../data/siteData.js";

export default function WhatsAppButton() {
  const message = encodeURIComponent("Namaste, I want to inquire about a statue order.");

  return (
    <a
      href={`https://wa.me/${business.whatsapp}?text=${message}`}
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-peacock-500 text-white shadow-soft transition hover:bg-peacock-700 focus:outline-none focus:ring-2 focus:ring-peacock-500 focus:ring-offset-2"
      aria-label="Contact on WhatsApp"
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  );
}
