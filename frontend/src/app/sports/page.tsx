import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import SportsTable from "@/components/sports/SportsTable";
import { SPORTS } from "@/lib/data/sports";
import Link from "next/link";
import { Plus, Trophy, CheckCircle, Users } from "lucide-react";

export default function SportsPage() {
  const total    = SPORTS.length;
  const active   = SPORTS.filter((s) => s.status === "Active").length;
  const enrolled = SPORTS.reduce((n, s) => n + s.studentsEnrolled, 0);

  const stats = [
    { label: "Total Sports",     value: total,   icon: <Trophy size={22} />,      color: "#7c3aed", bg: "#ede9fe", sub: "Disciplines offered" },
    { label: "Active Sports",    value: active,  icon: <CheckCircle size={22} />, color: "#10b981", bg: "#ecfdf5", sub: "Currently running" },
    { label: "Total Enrolled",   value: enrolled, icon: <Users size={22} />,      color: "#f59e0b", bg: "#fef3c7", sub: "Across all sports" },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="Sports"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sports" }]}
        action={
          <Link href="/sports/add" className="btn btn-primary">
            <Plus size={16} /> Add Sport
          </Link>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, marginTop: 2 }}>{s.label}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <SportsTable />
    </DashboardLayout>
  );
}
