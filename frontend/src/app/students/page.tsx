"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import { useStudents } from "@/lib/api.hooks";

export default function StudentsPage() {
  const { data: students, loading, error } = useStudents();

  return (
    <DashboardLayout>
      <PageHeader
        title="Students"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Students" }]}
        action={<Link href="/students/add" className="btn btn-primary"><Plus size={16} />Add Student</Link>}
      />
      <div className="card">
        <div className="card-header" style={{ flexWrap: "wrap", gap: "0.75rem" }}>
          <div className="relative" style={{ flex: 1, minWidth: 200, maxWidth: 320 }}>
            <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input type="text" placeholder="Search students..." className="form-control" style={{ paddingLeft: "2.25rem", height: 38 }} />
          </div>
          <button className="btn btn-secondary"><Filter size={15} />Filter</button>
        </div>
        {error && <div className="card-body" style={{ color: "#ef4444" }}>{error}</div>}
        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead><tr><th>#</th><th>Student</th><th>Student ID</th><th>Class</th><th>Gender</th><th>Parent</th><th>Mobile</th><th>Actions</th></tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8}>Loading students...</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan={8}>No students found.</td></tr>
              ) : students.map((s, i) => {
                const name = `${s.first_name} ${s.last_name}`.trim() || s.student_id;
                return (
                  <tr key={s.id}>
                    <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                    <td><div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}><div className="avatar">{name[0]}</div><div><div style={{ fontWeight: 600 }}>{name}</div><div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>DOB: {s.date_of_birth}</div></div></div></td>
                    <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{s.student_id}</span></td>
                    <td>{s.class_name}{s.section ? ` ${s.section}` : ""}</td>
                    <td>{s.gender}</td>
                    <td>{s.father_name || "-"}</td>
                    <td style={{ color: "var(--text-muted)" }}>{s.mobile_number || "-"}</td>
                    <td><div style={{ display: "flex", gap: "0.375rem" }}><Link href={`/students/${s.id}`} className="btn btn-success" style={{ padding: "0.3rem 0.6rem" }}><Eye size={13} /></Link><Link href={`/students/${s.id}/edit`} className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}><Edit size={13} /></Link><button className="btn btn-danger" style={{ padding: "0.3rem 0.6rem" }}><Trash2 size={13} /></button></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Showing {students.length} students
        </div>
      </div>
    </DashboardLayout>
  );
}
