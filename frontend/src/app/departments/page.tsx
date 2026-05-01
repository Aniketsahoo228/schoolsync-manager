"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useDepartments } from "@/lib/api.hooks";

export default function DepartmentsPage() {
  const { data: departments, loading, error } = useDepartments();
  return (
    <DashboardLayout>
      <PageHeader title="Departments" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Departments" }]} action={<Link href="/departments/add" className="btn btn-primary"><Plus size={16} /> Add Department</Link>} />
      <div className="card">
        <div className="card-header"><div className="relative" style={{ flex: 1, minWidth: 200, maxWidth: 300 }}><Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} /><input type="text" placeholder="Search departments..." className="form-control" style={{ paddingLeft: "2.25rem", height: 38 }} /></div></div>
        {error && <div className="card-body" style={{ color: "#ef4444" }}>{error}</div>}
        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead><tr><th>#</th><th>Department ID</th><th>Department Name</th><th>Head</th><th>Start Date</th><th>No. of Students</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? <tr><td colSpan={7}>Loading departments...</td></tr> : departments.length === 0 ? <tr><td colSpan={7}>No departments found.</td></tr> : departments.map((d, i) => (
                <tr key={d.id}><td style={{ color: "var(--text-muted)" }}>{i + 1}</td><td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{d.department_id}</span></td><td style={{ fontWeight: 600 }}>{d.name}</td><td>{d.head}</td><td style={{ color: "var(--text-muted)" }}>{d.start_date}</td><td><span className="badge" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{d.no_of_students} students</span></td><td><div style={{ display: "flex", gap: "0.375rem" }}><Link href={`/departments/${d.id}/edit`} className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}><Edit size={13} /></Link><button className="btn btn-danger" style={{ padding: "0.3rem 0.6rem" }}><Trash2 size={13} /></button></div></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
