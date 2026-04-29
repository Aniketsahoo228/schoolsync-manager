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
  label,
  type = "text",
  options,
  colFull,
  accept,
}: {
  label: string;
  type?: string;
  options?: string[];
  colFull?: boolean;
  accept?: string;
}) {
  return (
    <div style={{ gridColumn: colFull ? "1 / -1" : undefined }}>
      <label className="form-label">{label}</label>
      {type === "select" ? (
        <select className="form-control">
          <option>Select {label}</option>
          {options?.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea className="form-control" rows={3} style={{ resize: "vertical" }} />
      ) : (
        <input type={type} className="form-control" accept={accept} />
      )}
    </div>
  );
}

export default function AddStudentPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Add Student"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Students", href: "/students" },
          { label: "Add Student" },
        ]}
      />

      <div className="card">
        <div className="card-header">
          <span style={{ fontWeight: 700 }}>Student Registration Form</span>
        </div>
        <div className="card-body">
          <form>
            {/* Student Information */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
              <SectionTitle>Student Information</SectionTitle>
              <Field label="First Name" />
              <Field label="Last Name" />
              <Field label="Student ID" />
              <Field label="Gender" type="select" options={["Male", "Female", "Others"]} />
              <Field label="Date of Birth" type="date" />
              <Field label="Class" type="select" options={["Nursery A", "Nursery B", "KG-1 A", "KG-1 B", "KG-2 A", "KG-2 B"]} />
              <Field label="Religion" />
              <Field label="Joining Date" type="date" />
              <Field label="Mobile Number" type="tel" />
              <Field label="Admission Number" />
              <Field label="Section" />
              <Field label="Student Image" type="file" accept="image/*" />

              {/* Parent Information */}
              <SectionTitle>Parent Information</SectionTitle>
              <Field label="Father's Name" />
              <Field label="Father's Occupation" />
              <Field label="Father's Mobile" type="tel" />
              <Field label="Father's Email" type="email" />
              <Field label="Mother's Name" />
              <Field label="Mother's Occupation" />
              <Field label="Mother's Mobile" type="tel" />
              <Field label="Mother's Email" type="email" />

              {/* Address */}
              <SectionTitle>Address Details</SectionTitle>
              <Field label="Present Address" type="textarea" />
              <Field label="Permanent Address" type="textarea" />

              {/* Buttons */}
              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  Save Student
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
