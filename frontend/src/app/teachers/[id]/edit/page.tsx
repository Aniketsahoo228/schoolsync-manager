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

function Field({ label, type = "text", options, defaultValue }: { label: string; type?: string; options?: string[]; defaultValue?: string }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {type === "select" ? (
        <select className="form-control" defaultValue={defaultValue}>
          <option>Select {label}</option>
          {options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} className="form-control" defaultValue={defaultValue} />
      )}
    </div>
  );
}

function FullField({ label, type = "text", defaultValue }: { label: string; type?: string; defaultValue?: string }) {
  return (
    <div style={{ gridColumn: "1 / -1" }}>
      <label className="form-label">{label}</label>
      <input type={type} className="form-control" defaultValue={defaultValue} />
    </div>
  );
}

export default function EditTeacherPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Edit Teacher"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Teachers", href: "/teachers" }, { label: "Edit Teacher" }]}
      />
      <div className="card">
        <div className="card-header">
          <span style={{ fontWeight: 700 }}>Edit Teacher — Mrs. Anita Verma</span>
          <span className="badge" style={{ background: "#fef3c7", color: "#f59e0b" }}>TCH-001</span>
        </div>
        <div className="card-body">
          <form>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              <SectionTitle>Basic Details</SectionTitle>
              <Field label="Teacher ID" defaultValue="TCH-001" />
              <Field label="Name" defaultValue="Mrs. Anita Verma" />
              <Field label="Gender" type="select" options={["Male", "Female", "Others"]} defaultValue="Female" />
              <Field label="Date of Birth" type="date" defaultValue="1985-06-12" />
              <Field label="Mobile" type="tel" defaultValue="9876500001" />
              <Field label="Joining Date" type="date" defaultValue="2017-01-10" />
              <Field label="Qualification" defaultValue="M.Ed" />
              <Field label="Experience" defaultValue="8 Years" />

              <SectionTitle>Login Details</SectionTitle>
              <Field label="Username" defaultValue="anita.verma" />
              <Field label="Email ID" type="email" defaultValue="anita@preskool.in" />
              <Field label="Password" type="password" />
              <Field label="Repeat Password" type="password" />

              <SectionTitle>Address</SectionTitle>
              <FullField label="Address" defaultValue="45, Gandhi Nagar, Bhubaneswar" />
              <Field label="City" defaultValue="Bhubaneswar" />
              <Field label="State" defaultValue="Odisha" />
              <Field label="Zip Code" defaultValue="751002" />
              <Field label="Country" defaultValue="India" />

              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button type="submit" className="btn btn-primary"><Save size={16} />Update Teacher</button>
                <Link href="/teachers" className="btn btn-secondary"><X size={16} />Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
