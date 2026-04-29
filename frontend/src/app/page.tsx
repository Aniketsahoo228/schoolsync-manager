import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import { GraduationCap, Users, Building2, BookOpen, DollarSign, Calendar } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Total Students", value: "428", icon: <GraduationCap size={22} />, color: "#7c3aed", bg: "#ede9fe", change: "+12 this month" },
  { label: "Total Teachers", value: "64", icon: <Users size={22} />, color: "#f59e0b", bg: "#fef3c7", change: "+3 this month" },
  { label: "Departments", value: "12", icon: <Building2 size={22} />, color: "#10b981", bg: "#ecfdf5", change: "Active" },
  { label: "Total Subjects", value: "38", icon: <BookOpen size={22} />, color: "#3b82f6", bg: "#eff6ff", change: "Across all classes" },
  { label: "Fees Collected", value: "₹2.4L", icon: <DollarSign size={22} />, color: "#ec4899", bg: "#fdf2f8", change: "This month" },
  { label: "Events This Month", value: "7", icon: <Calendar size={22} />, color: "#8b5cf6", bg: "#f5f3ff", change: "Upcoming: 3" },
];

const recentStudents = [
  { name: "Aarav Sharma", class: "Nursery A", id: "STU-001", joined: "Apr 2025", status: "Active" },
  { name: "Priya Reddy", class: "KG-1 B", id: "STU-002", joined: "Apr 2025", status: "Active" },
  { name: "Rohan Patel", class: "KG-2 A", id: "STU-003", joined: "Mar 2025", status: "Active" },
  { name: "Sanya Iyer", class: "Nursery B", id: "STU-004", joined: "Mar 2025", status: "Inactive" },
];

const upcomingEvents = [
  { name: "Annual Sports Day", date: "May 2, 2025", type: "Sports" },
  { name: "Parent-Teacher Meeting", date: "May 10, 2025", type: "Meeting" },
  { name: "Summer Craft Fair", date: "May 18, 2025", type: "Event" },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Admin Dashboard"
        breadcrumbs={[{ label: "Home" }, { label: "Admin Dashboard" }]}
      />

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-icon" style={{ background: stat.bg }}>
              <span style={{ color: stat.color }}>{stat.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>
                {stat.label}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.25rem" }}>
        {/* Recent Students */}
        <div className="card">
          <div className="card-header">
            <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Recent Students</span>
            <Link href="/students" className="btn btn-secondary" style={{ fontSize: "0.78rem", padding: "0.35rem 0.875rem" }}>
              View All
            </Link>
          </div>
          <div style={{ overflow: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>ID</th>
                  <th>Class</th>
                  <th>Joined</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <div className="avatar">{s.name[0]}</div>
                        <span style={{ fontWeight: 600 }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>{s.id}</td>
                    <td>{s.class}</td>
                    <td style={{ color: "var(--text-muted)" }}>{s.joined}</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          background: s.status === "Active" ? "#ecfdf5" : "#fef2f2",
                          color: s.status === "Active" ? "#10b981" : "#ef4444",
                        }}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <div className="card-header">
            <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Upcoming Events</span>
            <Link href="/events" className="btn btn-secondary" style={{ fontSize: "0.78rem", padding: "0.35rem 0.875rem" }}>
              All Events
            </Link>
          </div>
          <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {upcomingEvents.map((e) => (
              <div
                key={e.name}
                style={{
                  display: "flex",
                  gap: "0.875rem",
                  padding: "0.75rem",
                  background: "#fafafa",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "var(--primary)",
                    marginTop: 4,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{e.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>
                    {e.date} · {e.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}