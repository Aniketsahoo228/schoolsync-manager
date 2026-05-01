"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useSubjects } from "@/lib/api.hooks";

export default function SubjectsPage() {
  const { data: subjects, loading, error } = useSubjects();
  return (
    <DashboardLayout>
      <PageHeader title="Subjects" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Subjects" }]} action={<Link href="/subjects/add" className="btn btn-primary"><Plus size={16} /> Add Subject</Link>} />
      <div className="card">
        <div className="card-header"><div className="relative" style={{ flex: 1, minWidth: 200, maxWidth: 300 }}><Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} /><input type="text" placeholder="Search subjects..." className="form-control" style={{ paddingLeft: "2.25rem", height: 38 }} /></div></div>
        {error && <div className="card-body" style={{ color: "#ef4444" }}>{error}</div>}
        <div style={{ overflow: "auto" }}><table className="data-table"><thead><tr><th>#</th><th>Subject ID</th><th>Subject Name</th><th>Class</th><th>Actions</th></tr></thead><tbody>
          {loading ? <tr><td colSpan={5}>Loading subjects...</td></tr> : subjects.length === 0 ? <tr><td colSpan={5}>No subjects found.</td></tr> : subjects.map((s, i) => (
            <tr key={s.id}><td style={{ color: "var(--text-muted)" }}>{i + 1}</td><td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{s.subject_id}</span></td><td style={{ fontWeight: 600 }}>{s.name}</td><td>{s.class_name}</td><td><div style={{ display: "flex", gap: "0.375rem" }}><Link href={`/subjects/${s.id}/edit`} className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}><Edit size={13} /></Link><button className="btn btn-danger" style={{ padding: "0.3rem 0.6rem" }}><Trash2 size={13} /></button></div></td></tr>
          ))}
        </tbody></table></div>
      </div>
    </DashboardLayout>
  );
}
