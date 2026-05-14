import { useEffect, useState } from "react";
import { ImagePlus, Save } from "lucide-react";
import { categories } from "../data/siteData.js";
import { updateProduct } from "../services/api.js";

export default function EditProduct({ products, token, onUpdated }) {
  const [selectedId, setSelectedId] = useState(products[0]?.id || "");
  const [form, setForm] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const selected = products.find((product) => product.id === selectedId) || products[0];
    setSelectedId(selected?.id || "");
    setForm(selected ? { ...selected } : null);
    setImage(null);
  }, [products, selectedId]);

  function updateField(event) {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form?.id) {
      return;
    }

    setLoading(true);
    setMessage("");
    const formData = new FormData();
    ["name", "price", "category", "description", "featured"].forEach((key) => formData.append(key, form[key] ?? ""));
    if (image) {
      formData.append("image", image);
    }

    try {
      const data = await updateProduct(form.id, formData, token);
      setMessage("Product updated successfully.");
      onUpdated?.(data.product);
    } catch (error) {
      setMessage(error.message || "Product could not be updated.");
    } finally {
      setLoading(false);
    }
  }

  if (!form) {
    return (
      <section className="panel p-6">
        <h2 className="text-2xl font-bold text-stone-900">Edit Product</h2>
        <p className="mt-3 text-sm text-stone-600">No products available.</p>
      </section>
    );
  }

  return (
    <section className="panel p-5 md:p-6">
      <h2 className="text-2xl font-bold text-stone-900">Edit Product</h2>
      <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Select Product
          <select className="field" value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <div className="grid gap-4 md:grid-cols-[180px_1fr]">
          <img src={form.image || form.imageUrl} alt={form.name} className="aspect-square w-full rounded-lg object-cover" />
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-stone-700">
              Product Name
              <input className="field" name="name" value={form.name || ""} onChange={updateField} required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-stone-700">
              Price
              <input className="field" name="price" value={form.price || ""} onChange={updateField} required />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-stone-700">
              Category
              <select className="field" name="category" value={form.category || "Marble Statue"} onChange={updateField}>
                {categories.slice(1).map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-stone-700">
              Replace Image
              <span className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-md border border-dashed border-stone-300 bg-stone-50 px-3 py-3 text-sm text-stone-600">
                <ImagePlus size={18} aria-hidden="true" />
                {image ? image.name : "Choose new photo"}
                <input className="sr-only" type="file" accept="image/*" onChange={(event) => setImage(event.target.files?.[0] || null)} />
              </span>
            </label>
          </div>
        </div>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Description
          <textarea className="field min-h-28" name="description" value={form.description || ""} onChange={updateField} required />
        </label>
        <label className="flex items-center gap-3 text-sm font-semibold text-stone-700">
          <input
            type="checkbox"
            name="featured"
            checked={Boolean(form.featured)}
            onChange={updateField}
            className="h-4 w-4 rounded border-stone-300 text-clay-600 focus:ring-clay-600"
          />
          Mark as featured
        </label>
        <button className="btn-primary w-full sm:w-fit" type="submit" disabled={loading}>
          <Save size={18} aria-hidden="true" />
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
      {message ? <p className="mt-4 text-sm font-semibold text-clay-700">{message}</p> : null}
    </section>
  );
}
