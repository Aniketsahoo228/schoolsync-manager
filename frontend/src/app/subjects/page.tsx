import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Edit, Trash2, Search } from "lucide-react";

const subjects = [
  { id: "SUB-001", name: "English Language", class: "Nursery A", teacher: "Mrs. Anita Verma" },
  { id: "SUB-002", name: "Basic Mathematics", class: "KG-1 A", teacher: "Mr. Rajesh Mohan" },
  { id: "SUB-003", name: "Environmental Science", class: "KG-2 B", teacher: "Ms. Kavitha Rao" },
  { id: "SUB-004", name: "Arts & Crafts", class: "All Classes", teacher: "Mr. Suresh Bhat" },
  { id: "SUB-005", name: "Music & Dance", class: "All Classes", teacher: "Ms. Deepika Singh" },
  { id: "SUB-006", name: "Phonics", class: "Nursery B", teacher: "Mrs. Anita Verma" },
];

export default function SubjectsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Subjects"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Subjects" }]}
        action={
          <Link href="/subjects/add" className="btn btn-primary">
            <Plus size={16} /> Add Subject
          </Link>
        }
      />
      <div className="card">
        <div className="card-header">
          <div className="relative" style={{ flex: 1, minWidth: 200, maxWidth: 300 }}>
            <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input type="text" placeholder="Search subjects..." className="form-control" style={{ paddingLeft: "2.25rem", height: 38 }} />
          </div>
          <select className="form-control" style={{ height: 38, width: "auto" }}>
            <option>All Classes</option>
            <option>Nursery A</option>
            <option>Nursery B</option>
            <option>KG-1 A</option>
            <option>KG-2 B</option>
          </select>
        </div>
        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject ID</th>
                <th>Subject Name</th>
                <th>Class</th>
                <th>Teacher</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s, i) => (
                <tr key={s.id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{s.id}</span></td>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td>{s.class}</td>
                  <td>{s.teacher}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.375rem" }}>
                      <Link href="/subjects/add" className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}><Edit size={13} /></Link>
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