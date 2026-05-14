import { Hammer, Paintbrush, Ruler, ShieldCheck } from "lucide-react";
import { business } from "../data/siteData.js";
import { usePageMeta } from "../utils/seo.js";

const process = [
  { icon: Ruler, title: "Requirement", copy: "Size, material, placement and reference details are understood before work starts." },
  { icon: Hammer, title: "Carving", copy: "The statue is shaped by skilled hands using the right material for the use case." },
  { icon: Paintbrush, title: "Finishing", copy: "Surface finish, polish, painting and detailing are completed according to the order." },
  { icon: ShieldCheck, title: "Packing", copy: "Finished work is checked, packed and prepared for delivery coordination." }
];

export default function About() {
  usePageMeta("About Us", "Workshop story and handmade statue process of Krishna Murti Kala Kendra, Hastinapur, Meerut.");

  return (
    <main>
      <section className="bg-white py-16">
        <div className="section-shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">About Us</p>
            <h1 className="page-title mt-3">A workshop built on handmade murti craftsmanship</h1>
            <p className="body-copy mt-5">
              {business.name} was founded in {business.since} and has grown into a known manufacturer,
              supplier, wholesaler and retailer for marble murties, dust statues, cement statues,
              sandstone statues, fiber statues and fine art models.
            </p>
            <p className="body-copy mt-4">
              The work is led by the experience and vision of Mr. Krishna Pad Mandal. From the
              well-equipped unit in Hastinapur, Meerut, the team designs and crafts statues for homes,
              temples, showrooms, gardens, public projects and custom devotional requirements.
            </p>
          </div>
          <img
            src="/images/gallery/about-workshop.PNG"
            alt="Workshop at Krishna Murti Kala Kendra"
            className="aspect-[5/4] w-full rounded-lg object-cover shadow-soft"
          />
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["1995", "Founded"],
            ["6", "Main product categories"],
            ["Custom", "Sizing and finishing"]
          ].map(([value, label]) => (
            <div key={label} className="panel p-6">
              <p className="font-serif text-4xl font-bold text-clay-600">{value}</p>
              <p className="mt-2 text-sm font-semibold uppercase text-stone-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-900 py-16 text-white">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-clay-100">Handmade Process</p>
            <h2 className="mt-3 font-serif text-4xl font-bold">From reference to ready-to-install statue</h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {process.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/10 bg-white/8 p-5">
                <item.icon size={28} className="text-clay-100" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-300">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
