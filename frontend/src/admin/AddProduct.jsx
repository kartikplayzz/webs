import { useState } from "react";
import { ImagePlus, Save } from "lucide-react";
import { categories } from "../data/siteData.js";
import { createProduct } from "../services/api.js";

const initialForm = {
  name: "",
  price: "Price on request",
  category: "Marble Statue",
  description: "",
  featured: false
};

export default function AddProduct({ token, onCreated }) {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) {
      formData.append("image", image);
    }

    try {
      const data = await createProduct(formData, token);
      setForm(initialForm);
      setImage(null);
      setMessage("Product added successfully.");
      onCreated?.(data.product);
    } catch (error) {
      setMessage(error.message || "Product could not be added.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel p-5 md:p-6">
      <h2 className="text-2xl font-bold text-stone-900">Add Product</h2>
      <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-stone-700">
            Product Name
            <input className="field" name="name" value={form.name} onChange={updateField} required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-stone-700">
            Price
            <input className="field" name="price" value={form.price} onChange={updateField} required />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-stone-700">
            Category
            <select className="field" name="category" value={form.category} onChange={updateField}>
              {categories.slice(1).map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-stone-700">
            Image
            <span className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-md border border-dashed border-stone-300 bg-stone-50 px-3 py-3 text-sm text-stone-600">
              <ImagePlus size={18} aria-hidden="true" />
              {image ? image.name : "Upload product photo"}
              <input className="sr-only" type="file" accept="image/*" onChange={(event) => setImage(event.target.files?.[0] || null)} />
            </span>
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Description
          <textarea className="field min-h-28" name="description" value={form.description} onChange={updateField} required />
        </label>
        <label className="flex items-center gap-3 text-sm font-semibold text-stone-700">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={updateField}
            className="h-4 w-4 rounded border-stone-300 text-clay-600 focus:ring-clay-600"
          />
          Mark as featured
        </label>
        <button className="btn-primary w-full sm:w-fit" type="submit" disabled={loading}>
          <Save size={18} aria-hidden="true" />
          {loading ? "Saving..." : "Save Product"}
        </button>
      </form>
      {message ? <p className="mt-4 text-sm font-semibold text-clay-700">{message}</p> : null}
    </section>
  );
}
