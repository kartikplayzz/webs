import { Building2, MessageCircle, PackageCheck, Ruler } from "lucide-react";
import { business, serviceList } from "../data/siteData.js";
import { usePageMeta } from "../utils/seo.js";

const detailServices = [
  {
    icon: Ruler,
    title: "Custom Orders",
    copy: "Share size, reference image, material preference and placement details. The workshop can prepare customized statues across marble, cement, sandstone, fiber, dust and fine art work."
  },
  {
    icon: Building2,
    title: "Bulk Orders",
    copy: "Production support is available for temples, showrooms, dealers, gardens, resorts, decorators and institutional projects that need repeat models or large pieces."
  },
  {
    icon: PackageCheck,
    title: "Delivery",
    copy: "Finished statues can be packed and dispatched with practical delivery guidance based on distance, model size, material and handling requirements."
  }
];

export default function Services() {
  const whatsappText = encodeURIComponent("Namaste, I want details for a custom or bulk statue order.");

  usePageMeta("Services", "Custom orders, bulk orders and delivery support for handmade statues.");

  return (
    <main>
      <section className="relative overflow-hidden bg-stone-900 py-20 text-white">
        <img src="/images/banners/banner-2.png" alt="Statue service banner" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="section-shell relative">
          <p className="text-sm font-semibold uppercase text-clay-100">Services</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl font-bold">Custom statues, bulk orders and delivery support</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-100">
            Choose the material and finish that fits your project. The team will guide you on practical
            sizing, durability and transport before production starts.
          </p>
          <a
            href={`https://wa.me/${business.whatsapp}?text=${whatsappText}`}
            className="btn-primary mt-8"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Discuss on WhatsApp
          </a>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {detailServices.map((service) => (
            <article key={service.title} className="panel p-6">
              <service.icon size={30} className="text-clay-600" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-bold text-stone-900">{service.title}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section-shell">
          <div className="mb-8">
            <p className="eyebrow">Material Options</p>
            <h2 className="page-title mt-3">Built for the place it will live</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {serviceList.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
                <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-stone-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
