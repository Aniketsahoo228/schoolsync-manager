import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Edit, Mail, Phone, MapPin, BookOpen, Calendar, Award } from "lucide-react";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", padding: "0.625rem 0", borderBottom: "1px solid var(--border)", fontSize: "0.875rem" }}>
      <span style={{ width: 180, color: "var(--text-muted)", fontWeight: 600, flexShrink: 0 }}>{label}</span>
      <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{value}</span>
    </div>
  );
}

export default function TeacherViewPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Teacher Details"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Teachers", href: "/teachers" }, { label: "Teacher Details" }]}
        action={
          <Link href="/teachers/edit" className="btn btn-primary">
            <Edit size={16} /> Edit Teacher
          </Link>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "1.25rem" }}>
        <div>
          <div className="card">
            <div className="card-body" style={{ textAlign: "center" }}>
              <div style={{ width: 90, height: 90, borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: 800, color: "#f59e0b", margin: "0 auto 1rem" }}>A</div>
              <h2 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.25rem" }}>Mrs. Anita Verma</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>Teacher ID: TCH-001</p>
              <span className="badge" style={{ background: "#ecfdf5", color: "#10b981" }}>Active</span>
              <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}><BookOpen size={13} /><span>Subject: English</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}><Award size={13} /><span>M.Ed · 8 yrs exp</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}><Mail size={13} /><span>anita@preskool.in</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}><Phone size={13} /><span>9876500001</span></div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card">
            <div className="card-header"><span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Teacher Information</span></div>
            <div className="card-body">
              <InfoRow label="Full Name" value="Mrs. Anita Verma" />
              <InfoRow label="Teacher ID" value="TCH-001" />
              <InfoRow label="Gender" value="Female" />
              <InfoRow label="Date of Birth" value="June 12, 1985" />
              <InfoRow label="Mobile" value="9876500001" />
              <InfoRow label="Email" value="anita@preskool.in" />
              <InfoRow label="Joining Date" value="January 10, 2017" />
              <InfoRow label="Qualification" value="M.Ed" />
              <InfoRow label="Experience" value="8 Years" />
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Address Information</span></div>
            <div className="card-body">
              <InfoRow label="Address" value="45, Gandhi Nagar, Bhubaneswar, Odisha 751002" />
              <InfoRow label="City" value="Bhubaneswar" />
              <InfoRow label="State" value="Odisha" />
              <InfoRow label="Zip Code" value="751002" />
              <InfoRow label="Country" value="India" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
