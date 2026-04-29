import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Edit, Mail, Phone, MapPin, User, BookOpen, Calendar } from "lucide-react";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        padding: "0.625rem 0",
        borderBottom: "1px solid var(--border)",
        fontSize: "0.875rem",
      }}
    >
      <span style={{ width: 180, color: "var(--text-muted)", fontWeight: 600, flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{value}</span>
    </div>
  );
}

export default function StudentViewPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Student Details"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Students", href: "/students" },
          { label: "Student Details" },
        ]}
        action={
          <Link href="/students/edit" className="btn btn-primary">
            <Edit size={16} />
            Edit Student
          </Link>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "1.25rem" }}>
        {/* Profile Card */}
        <div>
          <div className="card" style={{ marginBottom: "1rem" }}>
            <div className="card-body" style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "white",
                  margin: "0 auto 1rem",
                }}
              >
                A
              </div>
              <h2 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.25rem" }}>
                Aarav Sharma
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
                Student ID: STU-001
              </p>
              <span
                className="badge"
                style={{ background: "#ecfdf5", color: "#10b981", fontSize: "0.78rem" }}
              >
                Active
              </span>

              <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  <BookOpen size={13} />
                  <span>Class: Nursery A</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  <Calendar size={13} />
                  <span>DOB: Mar 15, 2021</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  <User size={13} />
                  <span>Gender: Male</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  <Phone size={13} />
                  <span>9876543210</span>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Quick Info */}
          <div className="card">
            <div className="card-header">
              <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Parent Info</span>
            </div>
            <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <div style={{ fontSize: "0.8rem" }}>
                <div style={{ fontWeight: 700 }}>Vikram Sharma</div>
                <div style={{ color: "var(--text-muted)" }}>Father · Software Engineer</div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <Phone size={12} /> 9876543210
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <Mail size={12} /> vikram@email.com
                </div>
              </div>
              <hr style={{ borderColor: "var(--border)", margin: "0.25rem 0" }} />
              <div style={{ fontSize: "0.8rem" }}>
                <div style={{ fontWeight: 700 }}>Sunita Sharma</div>
                <div style={{ color: "var(--text-muted)" }}>Mother · Teacher</div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <Phone size={12} /> 9876543299
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <Mail size={12} /> sunita@email.com
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card">
            <div className="card-header">
              <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Student Information</span>
            </div>
            <div className="card-body">
              <InfoRow label="Full Name" value="Aarav Sharma" />
              <InfoRow label="Student ID" value="STU-001" />
              <InfoRow label="Admission Number" value="ADM-2025-001" />
              <InfoRow label="Gender" value="Male" />
              <InfoRow label="Date of Birth" value="March 15, 2021" />
              <InfoRow label="Class" value="Nursery A" />
              <InfoRow label="Section" value="A" />
              <InfoRow label="Religion" value="Hindu" />
              <InfoRow label="Joining Date" value="April 1, 2025" />
              <InfoRow label="Mobile" value="9876543210" />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Address Information</span>
            </div>
            <div className="card-body">
              <InfoRow label="Present Address" value="12, Laxmi Nagar, Bhubaneswar, Odisha 751001" />
              <InfoRow label="Permanent Address" value="12, Laxmi Nagar, Bhubaneswar, Odisha 751001" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}