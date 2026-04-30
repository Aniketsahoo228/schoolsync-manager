import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import { BookOpen, CalendarDays, Users } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "My Classes", value: "4", icon: <Users size={22} />, color: "#7c3aed", bg: "#ede9fe" },
  { label: "Subjects", value: "3", icon: <BookOpen size={22} />, color: "#10b981", bg: "#ecfdf5" },
  { label: "Upcoming Events", value: "2", icon: <CalendarDays size={22} />, color: "#f59e0b", bg: "#fef3c7" },
];

export default function TeacherDashboardPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Teacher Dashboard"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Teacher Dashboard" }]}
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
          <span style={{ fontWeight: 700 }}>Teacher Tools</span>
        </div>
        <div className="card-body" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/students" className="btn btn-secondary">Students</Link>
          <Link href="/subjects" className="btn btn-secondary">Subjects</Link>
          <Link href="/timetable" className="btn btn-secondary">Timetable</Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
