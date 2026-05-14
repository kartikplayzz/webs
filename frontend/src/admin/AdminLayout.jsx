import { BarChart3, Eye, LogOut, PackagePlus, Pencil, Trash2 } from "lucide-react";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "add", label: "Add Product", icon: PackagePlus },
  { id: "edit", label: "Edit Product", icon: Pencil },
  { id: "delete", label: "Delete Product", icon: Trash2 },
  { id: "inquiries", label: "View Inquiries", icon: Eye }
];

export default function AdminLayout({ activeTab, onTabChange, onLogout, children }) {
  return (
    <main className="bg-stone-100 py-10">
      <div className="section-shell">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">Admin Panel</p>
            <h1 className="page-title mt-2">Product and inquiry management</h1>
          </div>
          <button type="button" className="btn-secondary" onClick={onLogout}>
            <LogOut size={18} aria-hidden="true" />
            Logout
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
          <aside className="panel h-fit p-3">
            <nav className="grid gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`inline-flex items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-semibold transition ${
                    activeTab === tab.id ? "bg-clay-600 text-white" : "text-stone-700 hover:bg-stone-100"
                  }`}
                  onClick={() => onTabChange(tab.id)}
                >
                  <tab.icon size={18} aria-hidden="true" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>
          <div>{children}</div>
        </div>
      </div>
    </main>
  );
}
