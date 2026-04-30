import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import TransportTable from "@/components/transport/TransportTable";
import { TRANSPORTS } from "@/lib/data/transport";
import Link from "next/link";
import { Plus, Bus, CheckCircle, AlertTriangle, WrenchIcon } from "lucide-react";

export default function TransportPage() {
  const total       = TRANSPORTS.length;
  const active      = TRANSPORTS.filter((t) => t.status === "Active").length;
  const maintenance = TRANSPORTS.filter((t) => t.status === "Maintenance").length;
  const totalSeats  = TRANSPORTS.reduce((s, t) => s + t.capacity, 0);

  const stats = [
    { label: "Total Routes",      value: total,       icon: <Bus size={22} />,           color: "#7c3aed", bg: "#ede9fe", sub: `${totalSeats} total seats` },
    { label: "Active Routes",     value: active,      icon: <CheckCircle size={22} />,   color: "#10b981", bg: "#ecfdf5", sub: "Operational" },
    { label: "Under Maintenance", value: maintenance, icon: <WrenchIcon size={22} />,    color: "#f59e0b", bg: "#fef3c7", sub: "Off-road" },
    { label: "Inactive",          value: total - active - maintenance, icon: <AlertTriangle size={22} />, color: "#ef4444", bg: "#fef2f2", sub: "Not running" },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="Transport"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Transport" }]}
        action={
          <Link href="/transport/add" className="btn btn-primary">
            <Plus size={16} /> Add Transport
          </Link>
        }
      />

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)", marginTop: 2 }}>{s.label}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <TransportTable />
    </DashboardLayout>
  );
}
