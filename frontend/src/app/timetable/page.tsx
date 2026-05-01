"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useTimetable } from "@/lib/api.hooks";

export default function TimeTablePage() {
  const { data: timetable, loading, error } = useTimetable();
  return (
    <DashboardLayout>
      <PageHeader title="Time Table" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Time Table" }]} action={<Link href="/timetable/add" className="btn btn-primary"><Plus size={16} />Add Time Table</Link>} />
      <div className="card">
        {error && <div className="card-body" style={{ color: "#ef4444" }}>{error}</div>}
        <div style={{ overflow: "auto" }}><table className="data-table"><thead><tr><th>#</th><th>Teacher</th><th>Class</th><th>Section</th><th>Subject</th><th>Day</th><th>Start Time</th><th>End Time</th></tr></thead><tbody>
          {loading ? <tr><td colSpan={8}>Loading timetable...</td></tr> : timetable.length === 0 ? <tr><td colSpan={8}>No timetable entries found.</td></tr> : timetable.map((t, i) => (
            <tr key={t.id}><td style={{ color: "var(--text-muted)" }}>{i + 1}</td><td><div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}><div className="avatar" style={{ background: "#fef3c7", color: "#f59e0b" }}>{(t.teacher_name || "T")[0]}</div><span style={{ fontWeight: 600 }}>{t.teacher_name || `Teacher #${t.teacher}`}</span></div></td><td>{t.class_name}</td><td>{t.section || "-"}</td><td><span className="badge" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{t.subject}</span></td><td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{t.day}</td><td style={{ color: "var(--text-muted)" }}>{t.start_time}</td><td style={{ color: "var(--text-muted)" }}>{t.end_time}</td></tr>
          ))}
        </tbody></table></div>
      </div>
    </DashboardLayout>
  );
}
