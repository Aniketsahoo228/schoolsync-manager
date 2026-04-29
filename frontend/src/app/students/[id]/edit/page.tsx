import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Save, X } from "lucide-react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ gridColumn: "1 / -1", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
      <span className="form-section-title">{children}</span>
    </div>
  );
}

function Field({
  label, type = "text", options, defaultValue, accept,
}: {
  label: string; type?: string; options?: string[]; defaultValue?: string; accept?: string;
}) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {type === "select" ? (
        <select className="form-control" defaultValue={defaultValue}>
          <option>Select {label}</option>
          {options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea className="form-control" rows={3} defaultValue={defaultValue} style={{ resize: "vertical" }} />
      ) : (
        <input type={type} className="form-control" defaultValue={defaultValue} accept={accept} />
      )}
    </div>
  );
}

export default function EditStudentPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Edit Student"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Students", href: "/students" },
          { label: "Edit Student" },
        ]}
      />

      <div className="card">
        <div className="card-header">
          <span style={{ fontWeight: 700 }}>Edit Student — Aarav Sharma</span>
          <span className="badge" style={{ background: "#ede9fe", color: "var(--primary)" }}>STU-001</span>
        </div>
        <div className="card-body">
          <form>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              <SectionTitle>Student Information</SectionTitle>
              <Field label="First Name" defaultValue="Aarav" />
              <Field label="Last Name" defaultValue="Sharma" />
              <Field label="Student ID" defaultValue="STU-001" />
              <Field label="Gender" type="select" options={["Male", "Female", "Others"]} defaultValue="Male" />
              <Field label="Date of Birth" type="date" defaultValue="2021-03-15" />
              <Field label="Class" type="select" options={["Nursery A", "Nursery B", "KG-1 A", "KG-1 B", "KG-2 A", "KG-2 B"]} defaultValue="Nursery A" />
              <Field label="Religion" defaultValue="Hindu" />
              <Field label="Joining Date" type="date" defaultValue="2025-04-01" />
              <Field label="Mobile Number" type="tel" defaultValue="9876543210" />
              <Field label="Admission Number" defaultValue="ADM-2025-001" />
              <Field label="Section" defaultValue="A" />
              <Field label="Student Image" type="file" accept="image/*" />

              <SectionTitle>Parent Information</SectionTitle>
              <Field label="Father's Name" defaultValue="Vikram Sharma" />
              <Field label="Father's Occupation" defaultValue="Software Engineer" />
              <Field label="Father's Mobile" type="tel" defaultValue="9876543210" />
              <Field label="Father's Email" type="email" defaultValue="vikram@email.com" />
              <Field label="Mother's Name" defaultValue="Sunita Sharma" />
              <Field label="Mother's Occupation" defaultValue="Teacher" />
              <Field label="Mother's Mobile" type="tel" defaultValue="9876543299" />
              <Field label="Mother's Email" type="email" defaultValue="sunita@email.com" />

              <SectionTitle>Address Details</SectionTitle>
              <Field label="Present Address" type="textarea" defaultValue="12, Laxmi Nagar, Bhubaneswar, Odisha 751001" />
              <Field label="Permanent Address" type="textarea" defaultValue="12, Laxmi Nagar, Bhubaneswar, Odisha 751001" />

              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  Update Student
                </button>
                <Link href="/students" className="btn btn-secondary">
                  <X size={16} />
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}