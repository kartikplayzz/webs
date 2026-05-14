import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Youtube } from "lucide-react";
import { business, categories } from "../data/siteData.js";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-white">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="brand-mark footer-brand" aria-hidden="true">
              <img src="/icons/logo.png" alt="" className="h-14 w-14 rounded-md object-contain" />
            </span>
            <div>
              <p className="text-lg font-bold">{business.name}</p>
              <p className="text-sm text-stone-300">Handmade statue manufacturer</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-stone-300">
            Trusted manufacturer, supplier, wholesaler and retailer of marble, dust, cement, sandstone,
            fiber and fine art statues from Hastinapur, Meerut.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase text-clay-100">Products</h2>
          <ul className="mt-4 grid gap-2 text-sm text-stone-300">
            {categories.slice(1).map((category) => (
              <li key={category}>
                <Link to="/products" className="hover:text-white">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase text-clay-100">Contact</h2>
          <ul className="mt-4 grid gap-3 text-sm text-stone-300">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-clay-100" aria-hidden="true" />
              {business.address}
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-clay-100" aria-hidden="true" />
              {business.phone}, {business.alternatePhone}
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-clay-100" aria-hidden="true" />
              {business.email}
            </li>
            <li>
              <a href={business.youtube} className="inline-flex items-center gap-2 hover:text-white" target="_blank" rel="noreferrer">
                <Youtube size={18} aria-hidden="true" />
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-stone-400">
        Copyright (c) 2026 {business.name}. All rights reserved.
      </div>
    </footer>
  );
}

