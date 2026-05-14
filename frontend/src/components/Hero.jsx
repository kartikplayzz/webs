import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "../data/siteData.js";

const whatsappText = encodeURIComponent("Namaste, I want to ask about a custom murti order.");

export default function Hero() {
  return (
    <section className="hero-stage relative isolate min-h-[560px] overflow-hidden bg-stone-900 text-white">
      <img
        src="/images/banners/banner-1.png"
        alt="Krishna Murti Kala Kendra handmade statue collection"
        className="hero-image absolute inset-0 h-full w-full object-cover"
      />
      <div className="hero-grade absolute inset-0" />

      <div className="section-shell relative flex min-h-[560px] items-center py-16">
        <div className="hero-copy max-w-3xl" data-reveal data-reveal-direction="left">
          <p className="mb-4 text-sm font-semibold uppercase text-clay-100">Handmade statues since {business.since}</p>
          <h1 className="hero-title font-serif text-5xl font-bold leading-tight md:text-6xl">
            Krishna Murti Kala Kendra
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-100">
            Marble, cement, dust, sandstone, fiber and fine art statues made by skilled hands in Hastinapur,
            Meerut for homes, temples, gardens, showrooms and custom projects.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/products" className="btn-primary">
              View Models
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a
              href={`https://wa.me/${business.whatsapp}?text=${whatsappText}`}
              className="btn-secondary border-white/50 bg-white/95"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} aria-hidden="true" />
              WhatsApp Order
            </a>
          </div>
          <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-3 text-sm">
            <div className="hero-stat rounded-md bg-white/12 p-4 backdrop-blur">
              <dt className="font-semibold text-white">30+ Years</dt>
              <dd className="mt-1 text-stone-200">Workshop experience</dd>
            </div>
            <div className="hero-stat rounded-md bg-white/12 p-4 backdrop-blur">
              <dt className="font-semibold text-white">6 Categories</dt>
              <dd className="mt-1 text-stone-200">Material options</dd>
            </div>
            <div className="hero-stat rounded-md bg-white/12 p-4 backdrop-blur">
              <dt className="font-semibold text-white">Custom</dt>
              <dd className="mt-1 text-stone-200">Sizes and finishes</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
