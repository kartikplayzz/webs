import { Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import ContactForm from "../components/ContactForm.jsx";
import { business } from "../data/siteData.js";
import { usePageMeta } from "../utils/seo.js";

export default function Contact() {
  const whatsappText = encodeURIComponent("Namaste, I want to contact Krishna Murti Kala Kendra.");

  usePageMeta("Contact", "Contact Krishna Murti Kala Kendra by form, WhatsApp, phone, email or map.");

  return (
    <main>
      <section className="bg-white py-16">
        <div className="section-shell">
          <p className="eyebrow">Contact</p>
          <h1 className="page-title mt-3">Talk to the workshop</h1>
          <p className="body-copy mt-4 max-w-3xl">
            Share material, size, quantity and reference details. You can send an inquiry here or contact
            directly on WhatsApp and phone.
          </p>
        </div>
      </section>

      <section className="section-shell grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <div className="panel p-5">
            <MapPin size={24} className="text-clay-600" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-bold">Address</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{business.address}</p>
          </div>
          <div className="panel p-5">
            <Phone size={24} className="text-clay-600" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-bold">Phone</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              {business.phone}, {business.alternatePhone}
            </p>
          </div>
          <div className="panel p-5">
            <Mail size={24} className="text-clay-600" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-bold">Email</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{business.email}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`https://wa.me/${business.whatsapp}?text=${whatsappText}`} className="btn-primary" target="_blank" rel="noreferrer">
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp
            </a>
            <a href={business.youtube} className="btn-secondary" target="_blank" rel="noreferrer">
              <Youtube size={18} aria-hidden="true" />
              YouTube
            </a>
          </div>
        </div>

        <ContactForm />
      </section>

      <section className="section-shell pb-16">
        <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-soft">
          <iframe
            title="Krishna Murti Kala Kendra map"
            className="h-96 w-full"
            loading="lazy"
            src="https://www.google.com/maps?q=Krishna%20Murti%20Kala%20Kendra%20Hastinapur%20Meerut&output=embed"
          />
        </div>
      </section>
    </main>
  );
}
