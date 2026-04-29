import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

const holidays = [
  { id: "HOL-001", name: "Good Friday", type: "National", startDate: "2025-04-18", endDate: "2025-04-18" },
  { id: "HOL-002", name: "Labour Day", type: "National", startDate: "2025-05-01", endDate: "2025-05-01" },
  { id: "HOL-003", name: "Summer Break", type: "School", startDate: "2025-05-25", endDate: "2025-06-10" },
  { id: "HOL-004", name: "Independence Day", type: "National", startDate: "2025-08-15", endDate: "2025-08-15" },
  { id: "HOL-005", name: "Dussehra Break", type: "Regional", startDate: "2025-10-01", endDate: "2025-10-05" },
  { id: "HOL-006", name: "Diwali Break", type: "Regional", startDate: "2025-10-20", endDate: "2025-10-24" },
];

const typeColors: Record<string, { bg: string; color: string }> = {
  National: { bg: "#fff7ed", color: "#f97316" },
  School: { bg: "#eff6ff", color: "#3b82f6" },
  Regional: { bg: "#fdf4ff", color: "#a855f7" },
};

export default function HolidayPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Holiday"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Holiday" }]}
        action={
          <Link href="/holiday/add" className="btn btn-primary"><Plus size={16} />Add Holiday</Link>
        }
      />
      <div className="card">
        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Holiday ID</th>
                <th>Holiday Name</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((h, i) => {
                const c = typeColors[h.type] ?? { bg: "#f3f4f6", color: "#6b7280" };
                const start = new Date(h.startDate);
                const end = new Date(h.endDate);
                const days = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
                return (
                  <tr key={h.id}>
                    <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                    <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{h.id}</span></td>
                    <td style={{ fontWeight: 600 }}>{h.name}</td>
                    <td>
                      <span className="badge" style={{ background: c.bg, color: c.color }}>{h.type}</span>
                    </td>
                    <td>{h.startDate}</td>
                    <td>{h.endDate}</td>
                    <td>{days} day{days > 1 ? "s" : ""}</td>
                    <td>
                      <div style={{ display: "flex", gap: "0.375rem" }}>
                        <button className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}><Edit size={13} /></button>
                        <button className="btn btn-danger" style={{ padding: "0.3rem 0.6rem" }}><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}