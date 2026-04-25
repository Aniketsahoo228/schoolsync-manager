import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Edit, Trash2, Search } from "lucide-react";

const departments = [
  { id: "DEP-001", name: "Early Childhood Education", head: "Mrs. Anita Verma", startDate: "2020-06-01", students: 120 },
  { id: "DEP-002", name: "Nursery Programme", head: "Mr. Rajesh Mohan", startDate: "2020-06-01", students: 85 },
  { id: "DEP-003", name: "KG Programme", head: "Ms. Kavitha Rao", startDate: "2021-01-10", students: 143 },
  { id: "DEP-004", name: "Special Education", head: "Mr. Suresh Bhat", startDate: "2022-03-15", students: 30 },
  { id: "DEP-005", name: "Arts & Crafts", head: "Ms. Deepika Singh", startDate: "2021-06-01", students: 50 },
];

export default function DepartmentsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Departments"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Departments" }]}
        action={
          <Link href="/departments/add" className="btn btn-primary">
            <Plus size={16} /> Add Department
          </Link>
        }
      />
      <div className="card">
        <div className="card-header">
          <div className="relative" style={{ flex: 1, minWidth: 200, maxWidth: 300 }}>
            <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input type="text" placeholder="Search departments..." className="form-control" style={{ paddingLeft: "2.25rem", height: 38 }} />
          </div>
        </div>
        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Department ID</th>
                <th>Department Name</th>
                <th>Head of Department</th>
                <th>Start Date</th>
                <th>No. of Students</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d, i) => (
                <tr key={d.id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{d.id}</span></td>
                  <td style={{ fontWeight: 600 }}>{d.name}</td>
                  <td>{d.head}</td>
                  <td style={{ color: "var(--text-muted)" }}>{d.startDate}</td>
                  <td>
                    <span className="badge" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                      {d.students} students
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.375rem" }}>
                      <Link href="/departments/add" className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}><Edit size={13} /></Link>
                      <button className="btn btn-danger" style={{ padding: "0.3rem 0.6rem" }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}