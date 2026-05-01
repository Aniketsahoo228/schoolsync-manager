"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Eye, Edit, Trash2, Search } from "lucide-react";
import { useTeachers } from "@/lib/api.hooks";

export default function TeachersPage() {
  const { data: teachers, loading, error } = useTeachers();

  return (
    <DashboardLayout>
      <PageHeader title="Teachers" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Teachers" }]} action={<Link href="/teachers/add" className="btn btn-primary"><Plus size={16} />Add Teacher</Link>} />
      <div className="card">
        <div className="card-header">
          <div className="relative" style={{ flex: 1, minWidth: 200, maxWidth: 300 }}>
            <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input type="text" placeholder="Search teachers..." className="form-control" style={{ paddingLeft: "2.25rem", height: 38 }} />
          </div>
        </div>
        {error && <div className="card-body" style={{ color: "#ef4444" }}>{error}</div>}
        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead><tr><th>#</th><th>Teacher</th><th>Teacher ID</th><th>Qualification</th><th>Experience</th><th>Mobile</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={7}>Loading teachers...</td></tr> : teachers.length === 0 ? <tr><td colSpan={7}>No teachers found.</td></tr> : teachers.map((t, i) => (
                <tr key={t.id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td><div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}><div className="avatar" style={{ background: "#fef3c7", color: "#f59e0b" }}>{t.name[0]}</div><div><div style={{ fontWeight: 600 }}>{t.name}</div><div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.email}</div></div></div></td>
                  <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{t.teacher_id}</span></td>
                  <td>{t.qualification || "-"}</td><td>{t.experience || "-"}</td><td style={{ color: "var(--text-muted)" }}>{t.mobile}</td>
                  <td><div style={{ display: "flex", gap: "0.375rem" }}><Link href={`/teachers/${t.id}`} className="btn btn-success" style={{ padding: "0.3rem 0.6rem" }}><Eye size={13} /></Link><Link href={`/teachers/${t.id}/edit`} className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}><Edit size={13} /></Link><button className="btn btn-danger" style={{ padding: "0.3rem 0.6rem" }}><Trash2 size={13} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
