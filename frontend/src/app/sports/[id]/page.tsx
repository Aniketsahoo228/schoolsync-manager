import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import { SPORTS } from "@/lib/data/sports";
import Link from "next/link";
import { Edit } from "lucide-react";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return SPORTS.map((s) => ({ id: s.id }));
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ display: "flex", padding: "0.625rem 0", borderBottom: "1px solid var(--border)", fontSize: "0.875rem" }}>
      <span style={{ width: 160, color: "var(--text-muted)", fontWeight: 600, flexShrink: 0 }}>{label}</span>
      <span style={{ fontWeight: 500 }}>{value}</span>
    </div>
  );
}

export default function SportDetailPage({ params }: { params: { id: string } }) {
  const sport = SPORTS.find((s) => s.id === params.id);
  if (!sport) notFound();

  return (
    <DashboardLayout>
      <PageHeader
        title="Sport Details"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sports", href: "/sports" }, { label: sport.name }]}
        action={
          <Link href={`/sports/${sport.id}/edit`} className="btn btn-primary">
            <Edit size={16} /> Edit Sport
          </Link>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "1.25rem" }}>
        {/* Card */}
        <div className="card">
          <div className="card-body" style={{ textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: 16, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", margin: "0 auto 1rem" }}>
              {sport.emoji}
            </div>
            <h2 style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>{sport.name}</h2>
            <span className="badge" style={{ background: sport.status === "Active" ? "#ecfdf5" : "#fef2f2", color: sport.status === "Active" ? "#10b981" : "#ef4444", marginBottom: "1rem", display: "inline-flex" }}>
              {sport.status}
            </span>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{sport.description}</p>
            <div style={{ marginTop: "1.25rem", padding: "0.875rem", background: "var(--primary-light)", borderRadius: 10 }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--primary)" }}>{sport.studentsEnrolled}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--primary)", fontWeight: 600 }}>Students Enrolled</div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="card">
          <div className="card-header"><span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Sport Information</span></div>
          <div className="card-body">
            <InfoRow label="Sports ID"   value={sport.sportsId} />
            <InfoRow label="Sport Name"  value={sport.name} />
            <InfoRow label="Coach Name"  value={sport.coachName} />
            <InfoRow label="Started Year" value={sport.startedYear} />
            <InfoRow label="Status"      value={sport.status} />
            <InfoRow label="Students Enrolled" value={sport.studentsEnrolled} />
            <InfoRow label="Description" value={sport.description} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
