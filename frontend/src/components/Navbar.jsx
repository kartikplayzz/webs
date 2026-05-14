import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { business } from "../data/siteData.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/gallery", label: "Gallery" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" }
];

function navClass({ isActive }) {
  return [
    "nav-link rounded-md px-3 py-2 text-sm font-semibold transition",
    isActive ? "is-active text-clay-700" : "text-stone-700 hover:text-clay-700"
  ].join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-nav sticky top-0 z-40 border-b border-white/50">
      <div className="section-shell flex min-h-20 items-center justify-between gap-4">
        <Link to="/" className="brand-lockup group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <img src="/icons/logo.png" alt="" className="h-14 w-14 rounded-md object-contain" />
          </span>
          <div>
            <p className="brand-title text-base font-bold text-stone-900 sm:text-lg">{business.name}</p>
            <p className="text-xs font-medium text-stone-600">Hastinapur, Meerut</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="btn-secondary py-2">
            <Phone size={18} aria-hidden="true" />
            {business.phone}
          </a>
        </div>

        <button
          type="button"
          className="hover-pop inline-flex h-11 w-11 items-center justify-center rounded-md border border-stone-300 bg-white/85 text-stone-900 shadow-sm lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div className="animate-drop border-t border-stone-200 bg-white/95 backdrop-blur lg:hidden">
          <nav className="section-shell grid gap-2 py-4">
            {links.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="btn-secondary mt-2 justify-start">
              <Phone size={18} aria-hidden="true" />
              {business.phone}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
