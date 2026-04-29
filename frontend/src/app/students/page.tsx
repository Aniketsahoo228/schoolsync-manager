import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";

const students = [
  { id: "STU-001", name: "Aarav Sharma", class: "Nursery A", section: "A", gender: "Male", dob: "2021-03-15", parent: "Vikram Sharma", mobile: "9876543210", status: "Active" },
  { id: "STU-002", name: "Priya Reddy", class: "KG-1 B", section: "B", gender: "Female", dob: "2020-07-22", parent: "Suresh Reddy", mobile: "9876543211", status: "Active" },
  { id: "STU-003", name: "Rohan Patel", class: "KG-2 A", section: "A", gender: "Male", dob: "2019-11-05", parent: "Ramesh Patel", mobile: "9876543212", status: "Active" },
  { id: "STU-004", name: "Sanya Iyer", class: "Nursery B", section: "B", gender: "Female", dob: "2021-01-30", parent: "Mohan Iyer", mobile: "9876543213", status: "Inactive" },
  { id: "STU-005", name: "Arjun Kumar", class: "KG-1 A", section: "A", gender: "Male", dob: "2020-05-18", parent: "Arun Kumar", mobile: "9876543214", status: "Active" },
  { id: "STU-006", name: "Diya Nair", class: "KG-2 B", section: "B", gender: "Female", dob: "2019-09-12", parent: "Rajan Nair", mobile: "9876543215", status: "Active" },
];

export default function StudentsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Students"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Students" }]}
        action={
          <Link href="/students/add" className="btn btn-primary">
            <Plus size={16} />
            Add Student
          </Link>
        }
      />

      <div className="card">
        {/* Filters */}
        <div className="card-header" style={{ flexWrap: "wrap", gap: "0.75rem" }}>
          <div className="relative" style={{ flex: 1, minWidth: 200, maxWidth: 320 }}>
            <Search
              size={15}
              style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}
            />
            <input
              type="text"
              placeholder="Search students..."
              className="form-control"
              style={{ paddingLeft: "2.25rem", height: 38 }}
            />
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <select className="form-control" style={{ height: 38, width: "auto" }}>
              <option>All Classes</option>
              <option>Nursery A</option>
              <option>Nursery B</option>
              <option>KG-1 A</option>
              <option>KG-1 B</option>
              <option>KG-2 A</option>
              <option>KG-2 B</option>
            </select>
            <select className="form-control" style={{ height: 38, width: "auto" }}>
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <button className="btn btn-secondary">
              <Filter size={15} />
              Filter
            </button>
          </div>
        </div>

        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Student ID</th>
                <th>Class</th>
                <th>Gender</th>
                <th>Parent</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div className="avatar">{s.name[0]}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{s.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          DOB: {s.dob}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: "var(--primary)" }}>{s.id}</span>
                  </td>
                  <td>{s.class}</td>
                  <td>{s.gender}</td>
                  <td>{s.parent}</td>
                  <td style={{ color: "var(--text-muted)" }}>{s.mobile}</td>
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
                  <td>
                    <div style={{ display: "flex", gap: "0.375rem" }}>
                      <Link href="/students/view" className="btn btn-success" style={{ padding: "0.3rem 0.6rem" }}>
                        <Eye size={13} />
                      </Link>
                      <Link href="/students/edit" className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}>
                        <Edit size={13} />
                      </Link>
                      <button className="btn btn-danger" style={{ padding: "0.3rem 0.6rem" }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          style={{
            padding: "1rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid var(--border)",
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Showing 1–6 of 428 students
          </span>
          <div style={{ display: "flex", gap: "0.375rem" }}>
            {[1, 2, 3, "...", 71].map((p, i) => (
              <button
                key={i}
                className="btn"
                style={{
                  padding: "0.3rem 0.6rem",
                  minWidth: 34,
                  background: p === 1 ? "var(--primary)" : "#f3f4f6",
                  color: p === 1 ? "white" : "var(--text-primary)",
                  fontSize: "0.8rem",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
