import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Search, Eye, Edit, Trash2, BookMarked } from "lucide-react";
import { mockBooks as books } from "@/lib/data/library";

export default function LibraryPage() {
  const total     = books.length;
  const inStock   = books.filter((b) => b.status === "Available").length;
  const outStock  = books.filter((b) => b.status === "Out of Stock").length;
  const totalCopies = books.reduce((n, b) => n + b.quantity, 0);

  const statCards = [
    { label: "Total Books",    value: total,       color: "#7c3aed", bg: "#ede9fe", emoji: "📚" },
    { label: "In Stock",       value: inStock,     color: "#10b981", bg: "#ecfdf5", emoji: "✅" },
    { label: "Out of Stock",   value: outStock,    color: "#ef4444", bg: "#fef2f2", emoji: "❌" },
    { label: "Total Copies",   value: totalCopies, color: "#f59e0b", bg: "#fef3c7", emoji: "📖" },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="Library"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Library" }]}
        action={
          <Link href="/library/add" className="btn btn-primary">
            <Plus size={16} /> Add Book
          </Link>
        }
      />

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
        {statCards.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg, fontSize: "1.3rem" }}>{s.emoji}</div>
            <div>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, lineHeight: 1, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, marginTop: 2, color: "var(--text-primary)" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header" style={{ flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 320 }}>
            <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input type="text" placeholder="Search books…" className="form-control" style={{ paddingLeft: "2.25rem", height: 38 }} />
          </div>
          <select className="form-control" style={{ height: 38, width: "auto" }}>
            <option>All Categories</option>
            <option>Picture Book</option>
            <option>Story Book</option>
            <option>Novel</option>
            <option>Educational</option>
          </select>
          <select className="form-control" style={{ height: 38, width: "auto" }}>
            <option>All Status</option>
            <option>Available</option>
            <option>Out of Stock</option>
          </select>
        </div>

        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>Book ID</th>
                <th>Author</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Available</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b, i) => (
                <tr key={b.id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>
                        <BookMarked size={15} style={{ color: "var(--primary)" }} />
                      </div>
                      <span style={{ fontWeight: 600 }}>{b.title}</span>
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{b.id}</span></td>
                  <td style={{ color: "var(--text-muted)" }}>{b.author}</td>
                  <td>
                    <span className="badge" style={{ background: "#ede9fe", color: "#7c3aed" }}>{b.category}</span>
                  </td>
                  <td>{b.quantity}</td>
                  <td style={{ fontWeight: 700 }}>{b.available}</td>
                  <td>
                    <span className="badge" style={{ background: b.status === "Available" ? "#ecfdf5" : "#fef2f2", color: b.status === "Available" ? "#10b981" : "#ef4444" }}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.375rem" }}>
                      <Link href={`/library/${b.id}`} className="btn btn-success" style={{ padding: "0.3rem 0.6rem" }}><Eye size={13} /></Link>
                      <Link href={`/library/${b.id}/edit`} className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}><Edit size={13} /></Link>
                      <button className="btn btn-danger" style={{ padding: "0.3rem 0.6rem" }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}