import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Save, X } from "lucide-react";

export default function AddSubjectPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Add Subject"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Subjects", href: "/subjects" }, { label: "Add Subject" }]}
      />
      <div className="card">
        <div className="card-header"><span style={{ fontWeight: 700 }}>Subject Information</span></div>
        <div className="card-body">
          <form>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              {[
                { label: "Subject ID", type: "text" },
                { label: "Subject Name", type: "text" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="form-label">{f.label}</label>
                  <input type={f.type} className="form-control" />
                </div>
              ))}
              <div>
                <label className="form-label">Class</label>
                <select className="form-control">
                  <option>Select Class</option>
                  {["Nursery A", "Nursery B", "KG-1 A", "KG-1 B", "KG-2 A", "KG-2 B", "All Classes"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Assigned Teacher</label>
                <select className="form-control">
                  <option>Select Teacher</option>
                  {["Mrs. Anita Verma", "Mr. Rajesh Mohan", "Ms. Kavitha Rao", "Mr. Suresh Bhat"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button type="submit" className="btn btn-primary"><Save size={16} />Save Subject</button>
                <Link href="/subjects" className="btn btn-secondary"><X size={16} />Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}