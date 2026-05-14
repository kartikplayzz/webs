import { useState } from "react";
import { Send } from "lucide-react";
import { sendInquiry } from "../services/api.js";

const initialState = {
  name: "",
  phone: "",
  email: "",
  service: "Custom Orders",
  message: ""
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      await sendInquiry(form);
      setForm(initialState);
      setStatus({ type: "success", message: "Inquiry sent. We will contact you soon." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Inquiry could not be sent. Please try WhatsApp or phone."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="panel p-5 md:p-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Name
          <input className="field" name="name" value={form.name} onChange={updateField} required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Phone
          <input className="field" name="phone" value={form.phone} onChange={updateField} required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Email
          <input className="field" type="email" name="email" value={form.email} onChange={updateField} />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Service
          <select className="field" name="service" value={form.service} onChange={updateField}>
            <option>Custom Orders</option>
            <option>Bulk Orders</option>
            <option>Delivery</option>
            <option>Product Inquiry</option>
          </select>
        </label>
      </div>
      <label className="mt-4 grid gap-2 text-sm font-semibold text-stone-700">
        Message
        <textarea className="field min-h-32 resize-y" name="message" value={form.message} onChange={updateField} required />
      </label>
      <button className="btn-primary mt-5 w-full sm:w-auto" type="submit" disabled={loading}>
        <Send size={18} aria-hidden="true" />
        {loading ? "Sending..." : "Send Inquiry"}
      </button>
      {status.message ? (
        <p className={`mt-4 text-sm font-semibold ${status.type === "success" ? "text-peacock-700" : "text-clay-700"}`}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
