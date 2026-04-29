import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Eye, Edit, Trash2, Search } from "lucide-react";

const teachers = [
  { id: "TCH-001", name: "Mrs. Anita Verma", subject: "English", class: "KG-1", qualification: "M.Ed", experience: "8 yrs", mobile: "9876500001", email: "anita@preskool.in", status: "Active" },
  { id: "TCH-002", name: "Mr. Rajesh Mohan", subject: "Maths", class: "KG-2", qualification: "B.Ed", experience: "5 yrs", mobile: "9876500002", email: "rajesh@preskool.in", status: "Active" },
  { id: "TCH-003", name: "Ms. Kavitha Rao", subject: "Science", class: "Nursery", qualification: "M.Sc,B.Ed", experience: "3 yrs", mobile: "9876500003", email: "kavitha@preskool.in", status: "Active" },
  { id: "TCH-004", name: "Mr. Suresh Bhat", subject: "Arts", class: "KG-1", qualification: "BFA", experience: "6 yrs", mobile: "9876500004", email: "suresh@preskool.in", status: "Inactive" },
  { id: "TCH-005", name: "Ms. Deepika Singh", subject: "Music", class: "All", qualification: "Diploma", experience: "4 yrs", mobile: "9876500005", email: "deepika@preskool.in", status: "Active" },
];

export default function TeachersPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Teachers"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Teachers" }]}
        action={
          <Link href="/teachers/add" className="btn btn-primary">
            <Plus size={16} />
            Add Teacher
          </Link>
        }
      />

      <div className="card">
        <div className="card-header" style={{ flexWrap: "wrap", gap: "0.75rem" }}>
          <div className="relative" style={{ flex: 1, minWidth: 200, maxWidth: 300 }}>
            <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input type="text" placeholder="Search teachers..." className="form-control" style={{ paddingLeft: "2.25rem", height: 38 }} />
          </div>
          <select className="form-control" style={{ height: 38, width: "auto" }}>
            <option>All Classes</option>
            <option>Nursery</option>
            <option>KG-1</option>
            <option>KG-2</option>
          </select>
        </div>

        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Teacher</th>
                <th>Teacher ID</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, i) => (
                <tr key={t.id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div className="avatar" style={{ background: "#fef3c7", color: "#f59e0b" }}>{t.name[4]}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{t.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{t.id}</span></td>
                  <td>{t.subject}</td>
                  <td>{t.class}</td>
                  <td>{t.qualification}</td>
                  <td>{t.experience}</td>
                  <td style={{ color: "var(--text-muted)" }}>{t.mobile}</td>
                  <td>
                    <span className="badge" style={{ background: t.status === "Active" ? "#ecfdf5" : "#fef2f2", color: t.status === "Active" ? "#10b981" : "#ef4444" }}>
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.375rem" }}>
                      <Link href="/teachers/view" className="btn btn-success" style={{ padding: "0.3rem 0.6rem" }}><Eye size={13} /></Link>
                      <Link href="/teachers/edit" className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}><Edit size={13} /></Link>
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
