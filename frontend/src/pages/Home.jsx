import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Clock3, Truck } from "lucide-react";
import Hero from "../components/Hero.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { business, featuredProducts, reviews, serviceList } from "../data/siteData.js";
import { usePageMeta } from "../utils/seo.js";

export default function Home() {
  usePageMeta(
    "Home",
    "Handmade marble, cement, sandstone, dust and fiber statues by Krishna Murti Kala Kendra in Hastinapur, Meerut."
  );

  return (
    <main>
      <Hero />

      <section className="section-shell py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Truck, title: "Fast Delivery", copy: "Careful packing and dispatch support for finished models." },
            { icon: Clock3, title: "Operational Excellence", copy: "Consistent workshop process for custom and bulk work." },
            { icon: BadgeCheck, title: "Best Quality", copy: "Handmade finish with material guidance before production." }
          ].map((item) => (
            <div key={item.title} className="panel p-6">
              <item.icon size={28} className="text-clay-600" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold text-stone-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section-shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Workshop Story</p>
            <h2 className="page-title mt-3">Crafted in Hastinapur since {business.since}</h2>
            <p className="body-copy mt-5">
              Krishna Murti Kala Kendra is a manufacturer, supplier, wholesaler and retailer of marble
              murties, dust statues, cement statues, sandstone statues, fiber statues and fine art models.
              The workshop was founded by Mr. Krishna Pad Mandal and continues to serve devotional,
              architectural and decorative orders with handmade care.
            </p>
            <Link to="/about" className="btn-primary mt-6">
              Read About Us
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/gallery/about-workshop.PNG"
              alt="Krishna Murti Kala Kendra workshop"
              className="aspect-[4/5] w-full rounded-lg object-cover"
              loading="lazy"
            />
            <div className="grid gap-4 pt-8">
              <img
                src="/images/banners/banner-2.png"
                alt="Handmade statue display"
                className="aspect-[4/3] w-full rounded-lg object-cover"
                loading="lazy"
              />
              <img
                src="/images/banners/banner-3.png"
                alt="Statue product collection"
                className="aspect-[4/3] w-full rounded-lg object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Popular Products</p>
            <h2 className="page-title mt-3">Featured models</h2>
          </div>
          <Link to="/products" className="btn-secondary">
            All Products
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-stone-900 py-16 text-white">
        <div className="section-shell">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase text-clay-100">Services</p>
            <h2 className="mt-3 font-serif text-4xl font-bold">Orders shaped around your project</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {serviceList.map((service) => (
              <article key={service.title} className="overflow-hidden rounded-lg border border-white/10 bg-white/8">
                <img src={service.image} alt={service.title} className="aspect-[16/10] w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-300">{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mb-8">
          <p className="eyebrow">Customer Reviews</p>
          <h2 className="page-title mt-3">Trusted for handmade detailing</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote key={review.name} className="panel p-6">
              <p className="text-base leading-7 text-stone-700">"{review.text}"</p>
              <footer className="mt-4 text-sm font-bold text-stone-900">{review.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="bg-clay-600 py-12 text-white">
        <div className="section-shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold">Ready to discuss a murti or custom statue?</h2>
            <p className="mt-2 text-clay-50">Send size, material and reference details on WhatsApp.</p>
          </div>
          <Link to="/contact" className="btn-secondary border-white bg-white">
            Contact Workshop
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
