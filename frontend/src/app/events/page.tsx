import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";

const events = [
  { id: "EVT-001", name: "Annual Sports Day", date: "2025-05-02", type: "Sports", description: "Inter-class sports competition for all students" },
  { id: "EVT-002", name: "Parent-Teacher Meeting", date: "2025-05-10", type: "Meeting", description: "Quarterly academic progress discussion" },
  { id: "EVT-003", name: "Summer Craft Fair", date: "2025-05-18", type: "Cultural", description: "Students showcase their art and craft projects" },
  { id: "EVT-004", name: "Independence Day Celebration", date: "2025-08-15", type: "National", description: "Flag hoisting and cultural programme" },
];

const typeColors: Record<string, { bg: string; color: string }> = {
  Sports: { bg: "#ecfdf5", color: "#10b981" },
  Meeting: { bg: "#eff6ff", color: "#3b82f6" },
  Cultural: { bg: "#fdf4ff", color: "#a855f7" },
  National: { bg: "#fff7ed", color: "#f97316" },
};

export default function EventsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Events"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events" }]}
        action={
          <Link href="/events/add" className="btn btn-primary"><Plus size={16} />Add Event</Link>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
        {events.map((e) => {
          const c = typeColors[e.type] ?? { bg: "#f3f4f6", color: "#6b7280" };
          return (
            <div key={e.id} className="card">
              <div className="card-body">
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span className="badge" style={{ background: c.bg, color: c.color }}>{e.type}</span>
                  <div style={{ display: "flex", gap: "0.375rem" }}>
                    <button className="btn btn-secondary" style={{ padding: "0.25rem 0.5rem" }}><Edit size={12} /></button>
                    <button className="btn btn-danger" style={{ padding: "0.25rem 0.5rem" }}><Trash2 size={12} /></button>
                  </div>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.375rem" }}>{e.name}</h3>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>{e.description}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600 }}>
                  <Calendar size={13} />
                  {e.date}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}