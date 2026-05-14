import { MessageCircle } from "lucide-react";
import { business } from "../data/siteData.js";

export default function ProductCard({ product }) {
  const message = encodeURIComponent(`Namaste, I am interested in ${product.name}. Please share details.`);

  return (
    <article className="panel product-pop-card group overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={product.image || product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="hover-badge">View details</div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-clay-100 px-2.5 py-1 text-xs font-semibold text-clay-700">
            {product.category}
          </span>
          <span className="text-sm font-semibold text-peacock-700">{product.price}</span>
        </div>
        <h3 className="mt-3 text-xl font-bold text-stone-900">{product.name}</h3>
        <p className="mt-2 min-h-20 text-sm leading-6 text-stone-600">{product.description}</p>
        <a
          href={`https://wa.me/${business.whatsapp}?text=${message}`}
          className="btn-secondary mt-5 w-full"
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Ask on WhatsApp
        </a>
      </div>
    </article>
  );
}
