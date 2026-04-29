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

function Field({ label, type = "text", options }: { label: string; type?: string; options?: string[] }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {type === "select" ? (
        <select className="form-control">
          <option>Select {label}</option>
          {options?.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} className="form-control" />
      )}
    </div>
  );
}

function FullField({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div style={{ gridColumn: "1 / -1" }}>
      <label className="form-label">{label}</label>
      <input type={type} className="form-control" />
    </div>
  );
}

export default function AddTeacherPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Add Teacher"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Teachers", href: "/teachers" },
          { label: "Add Teacher" },
        ]}
      />

      <div className="card">
        <div className="card-header">
          <span style={{ fontWeight: 700 }}>Teacher Registration Form</span>
        </div>
        <div className="card-body">
          <form>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              <SectionTitle>Basic Details</SectionTitle>
              <Field label="Teacher ID" />
              <Field label="Name" />
              <Field label="Gender" type="select" options={["Male", "Female", "Others"]} />
              <Field label="Date of Birth" type="date" />
              <Field label="Mobile" type="tel" />
              <Field label="Joining Date" type="date" />
              <Field label="Qualification" />
              <Field label="Experience" />

              <SectionTitle>Login Details</SectionTitle>
              <Field label="Username" />
              <Field label="Email ID" type="email" />
              <Field label="Password" type="password" />
              <Field label="Repeat Password" type="password" />

              <SectionTitle>Address</SectionTitle>
              <FullField label="Address" />
              <Field label="City" />
              <Field label="State" />
              <Field label="Zip Code" />
              <Field label="Country" />

              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  Save Teacher
                </button>
                <Link href="/teachers" className="btn btn-secondary">
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
