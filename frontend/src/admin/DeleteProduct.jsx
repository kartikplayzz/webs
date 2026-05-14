import { Trash2 } from "lucide-react";
import { deleteProduct } from "../services/api.js";

export default function DeleteProduct({ products, token, onDeleted }) {
  async function handleDelete(product) {
    const confirmed = window.confirm(`Delete ${product.name}?`);
    if (!confirmed) {
      return;
    }

    await deleteProduct(product.id, token);
    onDeleted?.(product.id);
  }

  return (
    <section className="panel overflow-hidden">
      <div className="p-5 md:p-6">
        <h2 className="text-2xl font-bold text-stone-900">Delete Product</h2>
        <p className="mt-2 text-sm text-stone-600">Remove old or unavailable products from Firestore.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="admin-table w-full min-w-[720px]">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={product.image || product.imageUrl} alt={product.name} className="h-14 w-14 rounded-md object-cover" />
                    <span className="font-semibold text-stone-900">{product.name}</span>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>
                  <button type="button" className="btn-secondary py-2 text-clay-700" onClick={() => handleDelete(product)}>
                    <Trash2 size={17} aria-hidden="true" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
