"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useExams } from "@/lib/api.hooks";

export default function ExamsPage() {
  const { data: exams, loading, error } = useExams();
  return (
    <DashboardLayout>
      <PageHeader title="Exam List" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Exam List" }]} action={<Link href="/exams/add" className="btn btn-primary"><Plus size={16} />Add Exam</Link>} />
      <div className="card">
        {error && <div className="card-body" style={{ color: "#ef4444" }}>{error}</div>}
        <div style={{ overflow: "auto" }}><table className="data-table"><thead><tr><th>#</th><th>Exam Name</th><th>Class</th><th>Subject</th><th>Fees</th><th>Start Time</th><th>End Time</th><th>Date</th><th>Actions</th></tr></thead><tbody>
          {loading ? <tr><td colSpan={9}>Loading exams...</td></tr> : exams.length === 0 ? <tr><td colSpan={9}>No exams found.</td></tr> : exams.map((e, i) => (
            <tr key={e.id}><td style={{ color: "var(--text-muted)" }}>{i + 1}</td><td style={{ fontWeight: 600 }}>{e.name}</td><td>{e.class_name}</td><td>{e.subject}</td><td>₹{e.fees}</td><td style={{ color: "var(--text-muted)" }}>{e.start_time}</td><td style={{ color: "var(--text-muted)" }}>{e.end_time}</td><td><span className="badge" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{e.event_date}</span></td><td><div style={{ display: "flex", gap: "0.375rem" }}><Link href={`/exams/${e.id}/edit`} className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}><Edit size={13} /></Link><button className="btn btn-danger" style={{ padding: "0.3rem 0.6rem" }}><Trash2 size={13} /></button></div></td></tr>
          ))}
        </tbody></table></div>
      </div>
    </DashboardLayout>
  );
}
