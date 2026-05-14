import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { categories, productSeed } from "../data/siteData.js";
import { getProducts } from "../services/api.js";
import { usePageMeta } from "../utils/seo.js";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState(productSeed);
  const [status, setStatus] = useState("");

  usePageMeta("Products", "Browse marble, cement, dust, sandstone, fiber and fine art statue models.");

  useEffect(() => {
    let mounted = true;

    getProducts()
      .then((data) => {
        const apiProducts = data.products || [];
        if (mounted && apiProducts.length) {
          setProducts(apiProducts);
          setStatus("");
        }
      })
      .catch(() => {
        if (mounted) {
          setStatus("Showing downloaded catalog photos. Connect Firebase backend for live product management.");
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <main>
      <section className="bg-white py-16">
        <div className="section-shell">
          <p className="eyebrow">Products</p>
          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="page-title">Statue models and categories</h1>
              <p className="body-copy mt-4 max-w-3xl">
                Browse real photos downloaded from the existing Krishna Murti Kala Kendra website.
                Prices depend on material, size, finishing and delivery requirements.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-clay-600 text-white"
                    : "border border-stone-300 bg-white text-stone-700 hover:border-clay-600 hover:text-clay-700"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {status ? <p className="mt-4 text-sm font-semibold text-stone-600">{status}</p> : null}
        </div>
      </section>

      <section className="section-shell py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
