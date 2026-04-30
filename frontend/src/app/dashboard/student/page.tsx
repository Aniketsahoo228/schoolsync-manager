import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import { BookOpen, CalendarDays, ClipboardList } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Subjects", value: "6", icon: <BookOpen size={22} />, color: "#7c3aed", bg: "#ede9fe" },
  { label: "Exams", value: "3", icon: <ClipboardList size={22} />, color: "#10b981", bg: "#ecfdf5" },
  { label: "Events", value: "2", icon: <CalendarDays size={22} />, color: "#f59e0b", bg: "#fef3c7" },
];

export default function StudentDashboardPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Student Dashboard"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Student Dashboard" }]}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-icon" style={{ background: stat.bg }}>
              <span style={{ color: stat.color }}>{stat.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>{stat.value}</div>
              <div style={{ fontSize: "0.8rem", fontWeight: 600 }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <span style={{ fontWeight: 700 }}>Student Links</span>
        </div>
        <div className="card-body" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/subjects" className="btn btn-secondary">Subjects</Link>
          <Link href="/exams" className="btn btn-secondary">Exams</Link>
          <Link href="/events" className="btn btn-secondary">Events</Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
