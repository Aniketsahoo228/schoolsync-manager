import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Save, X } from "lucide-react";

export default function AddDepartmentPage() {
  const fields = [
    { label: "Department ID", type: "text" },
    { label: "Department Name", type: "text" },
    { label: "Head of Department", type: "text" },
    { label: "Department Start Date", type: "date" },
    { label: "No of Students", type: "number" },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="Add Department"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Departments", href: "/departments" }, { label: "Add Department" }]}
      />
      <div className="card">
        <div className="card-header"><span style={{ fontWeight: 700 }}>Department Details</span></div>
        <div className="card-body">
          <form>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              {fields.map((f) => (
                <div key={f.label}>
                  <label className="form-label">{f.label}</label>
                  <input type={f.type} className="form-control" />
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button type="submit" className="btn btn-primary"><Save size={16} />Save Department</button>
                <Link href="/departments" className="btn btn-secondary"><X size={16} />Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}