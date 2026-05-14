import { useCallback, useEffect, useMemo, useState } from "react";
import { LockKeyhole, Package, Send, Star } from "lucide-react";
import AdminLayout from "./AdminLayout.jsx";
import AddProduct from "./AddProduct.jsx";
import EditProduct from "./EditProduct.jsx";
import DeleteProduct from "./DeleteProduct.jsx";
import ViewInquiries from "./ViewInquiries.jsx";
import { productSeed } from "../data/siteData.js";
import { adminLogin, getInquiries, getProducts } from "../services/api.js";
import { usePageMeta } from "../utils/seo.js";

const TOKEN_KEY = "krishna-admin-token";

export default function Dashboard() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState(productSeed);
  const [inquiries, setInquiries] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  usePageMeta("Admin", "Admin dashboard for Krishna Murti Kala Kendra product and inquiry management.");

  const loadAdminData = useCallback(async () => {
    if (!token) {
      return;
    }
    try {
      const [productData, inquiryData] = await Promise.all([getProducts(), getInquiries(token)]);
      if (productData.products?.length) {
        setProducts(productData.products);
      }
      setInquiries(inquiryData.inquiries || []);
    } catch (error) {
      setMessage(error.message || "Could not load admin data.");
    }
  }, [token]);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  const stats = useMemo(
    () => [
      { label: "Products", value: products.length, icon: Package },
      { label: "Featured", value: products.filter((product) => product.featured).length, icon: Star },
      { label: "Inquiries", value: inquiries.length, icon: Send }
    ],
    [products, inquiries]
  );

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const data = await adminLogin(password);
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword("");
    } catch (error) {
      setMessage(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setActiveTab("dashboard");
  }

  function renderContent() {
    if (activeTab === "add") {
      return (
        <AddProduct
          token={token}
          onCreated={(product) => {
            if (product) {
              setProducts((current) => [product, ...current]);
            }
          }}
        />
      );
    }
    if (activeTab === "edit") {
      return (
        <EditProduct
          products={products}
          token={token}
          onUpdated={(product) => {
            setProducts((current) => current.map((item) => (item.id === product.id ? product : item)));
          }}
        />
      );
    }
    if (activeTab === "delete") {
      return (
        <DeleteProduct
          products={products}
          token={token}
          onDeleted={(id) => setProducts((current) => current.filter((product) => product.id !== id))}
        />
      );
    }
    if (activeTab === "inquiries") {
      return <ViewInquiries inquiries={inquiries} />;
    }
    return (
      <section className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="panel p-5">
              <stat.icon size={26} className="text-clay-600" aria-hidden="true" />
              <p className="mt-4 font-serif text-4xl font-bold text-stone-900">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold uppercase text-stone-600">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="panel overflow-hidden">
          <div className="p-5 md:p-6">
            <h2 className="text-2xl font-bold text-stone-900">Recent Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table w-full min-w-[720px]">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Featured</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 8).map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <img src={product.image || product.imageUrl} alt={product.name} className="h-14 w-14 rounded-md object-cover" />
                        <span className="font-semibold text-stone-900">{product.name}</span>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.featured ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }

  if (!token) {
    return (
      <main className="bg-stone-100 py-16">
        <div className="section-shell grid place-items-center">
          <form className="panel w-full max-w-md p-6" onSubmit={handleLogin}>
            <LockKeyhole size={32} className="text-clay-600" aria-hidden="true" />
            <h1 className="mt-4 text-3xl font-bold text-stone-900">Admin Login</h1>
            <p className="mt-2 text-sm text-stone-600">Use the backend admin password from your environment file.</p>
            <label className="mt-5 grid gap-2 text-sm font-semibold text-stone-700">
              Password
              <input
                className="field"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <button className="btn-primary mt-5 w-full" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
            {message ? <p className="mt-4 text-sm font-semibold text-clay-700">{message}</p> : null}
          </form>
        </div>
      </main>
    );
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab} onLogout={logout}>
      {message ? <p className="mb-4 rounded-md border border-clay-200 bg-clay-50 px-4 py-3 text-sm font-semibold text-clay-700">{message}</p> : null}
      {renderContent()}
    </AdminLayout>
  );
}
