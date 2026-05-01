"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useHolidays } from "@/lib/api.hooks";

export default function HolidayPage() {
  const { data: holidays, loading, error } = useHolidays();
  return (
    <DashboardLayout>
      <PageHeader title="Holiday" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Holiday" }]} action={<Link href="/holiday/add" className="btn btn-primary"><Plus size={16} />Add Holiday</Link>} />
      <div className="card">
        {error && <div className="card-body" style={{ color: "#ef4444" }}>{error}</div>}
        <div style={{ overflow: "auto" }}><table className="data-table"><thead><tr><th>#</th><th>Holiday ID</th><th>Holiday Name</th><th>Type</th><th>Start Date</th><th>End Date</th><th>Duration</th><th>Actions</th></tr></thead><tbody>
          {loading ? <tr><td colSpan={8}>Loading holidays...</td></tr> : holidays.length === 0 ? <tr><td colSpan={8}>No holidays found.</td></tr> : holidays.map((h, i) => {
            const start = new Date(h.start_date);
            const end = new Date(h.end_date);
            const days = Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) ? 1 : Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
            return <tr key={h.id}><td style={{ color: "var(--text-muted)" }}>{i + 1}</td><td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{h.holiday_id}</span></td><td style={{ fontWeight: 600 }}>{h.name}</td><td><span className="badge" style={{ background: "#eff6ff", color: "#3b82f6" }}>{h.holiday_type}</span></td><td>{h.start_date}</td><td>{h.end_date}</td><td>{days} day{days > 1 ? "s" : ""}</td><td><div style={{ display: "flex", gap: "0.375rem" }}><button className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}><Edit size={13} /></button><button className="btn btn-danger" style={{ padding: "0.3rem 0.6rem" }}><Trash2 size={13} /></button></div></td></tr>;
          })}
        </tbody></table></div>
      </div>
    </DashboardLayout>
  );
}
