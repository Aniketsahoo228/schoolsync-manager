import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import { TRANSPORTS } from "@/lib/data/transport";
import Link from "next/link";
import { Edit, Bus, Phone, MapPin, Hash, Shield, Users } from "lucide-react";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return TRANSPORTS.map((t) => ({ id: t.id }));
}

function InfoRow({ label, value, icon }: { label: string; value: string | number; icon?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", padding: "0.625rem 0", borderBottom: "1px solid var(--border)", gap: "0.5rem", fontSize: "0.875rem" }}>
      {icon && <span style={{ color: "var(--primary)", marginTop: 1, flexShrink: 0 }}>{icon}</span>}
      <span style={{ width: 170, color: "var(--text-muted)", fontWeight: 600, flexShrink: 0 }}>{label}</span>
      <span style={{ fontWeight: 500 }}>{value}</span>
    </div>
  );
}

const statusStyle: Record<string, { bg: string; color: string }> = {
  Active:      { bg: "#ecfdf5", color: "#10b981" },
  Inactive:    { bg: "#fef2f2", color: "#ef4444" },
  Maintenance: { bg: "#fef3c7", color: "#f59e0b" },
};

export default function TransportDetailPage({ params }: { params: { id: string } }) {
  const transport = TRANSPORTS.find((t) => t.id === params.id);
  if (!transport) notFound();

  const sc  = statusStyle[transport.status];
  const pct = Math.round((transport.studentsAssigned / transport.capacity) * 100);

  return (
    <DashboardLayout>
      <PageHeader
        title="Transport Details"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Transport", href: "/transport" },
          { label: transport.routeName },
        ]}
        action={
          <Link href={`/transport/${transport.id}/edit`} className="btn btn-primary">
            <Edit size={16} /> Edit Transport
          </Link>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "1.25rem" }}>
        {/* Profile card */}
        <div className="card">
          <div className="card-body" style={{ textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: 16, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <Bus size={36} style={{ color: "var(--primary)" }} />
            </div>
            <span className="badge" style={{ background: sc.bg, color: sc.color, marginBottom: "0.75rem", display: "inline-flex" }}>
              {transport.status}
            </span>
            <h2 style={{ fontWeight: 800, fontSize: "1rem", margin: "0.5rem 0 0.25rem" }}>{transport.vehicleNumber}</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>{transport.routeName}</p>

            {/* Capacity bar */}
            <div style={{ marginTop: "1.25rem", textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "0.375rem" }}>
                <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Occupancy</span>
                <span style={{ fontWeight: 700 }}>{pct}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: "#e5e7eb" }}>
                <div style={{ height: "100%", borderRadius: 99, width: `${pct}%`, background: pct > 80 ? "#ef4444" : "var(--primary)", transition: "width 0.4s" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.375rem" }}>
                <span>{transport.studentsAssigned} assigned</span>
                <span>{transport.capacity} capacity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="card">
            <div className="card-header"><span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Vehicle Information</span></div>
            <div className="card-body">
              <InfoRow icon={<Hash size={14} />}    label="Transport ID"     value={transport.id} />
              <InfoRow icon={<Bus size={14} />}     label="Vehicle Number"   value={transport.vehicleNumber} />
              <InfoRow icon={<Bus size={14} />}     label="Route Name"       value={transport.routeName} />
              <InfoRow icon={<Users size={14} />}   label="Capacity"         value={`${transport.capacity} seats`} />
              <InfoRow icon={<Users size={14} />}   label="Students Assigned" value={transport.studentsAssigned} />
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Driver Information</span></div>
            <div className="card-body">
              <InfoRow icon={<Shield size={14} />}  label="Driver Name"      value={transport.driverName} />
              <InfoRow icon={<Shield size={14} />}  label="License Number"   value={transport.licenseNumber} />
              <InfoRow icon={<Phone size={14} />}   label="Contact Number"   value={transport.contactNumber} />
              <InfoRow icon={<MapPin size={14} />}  label="Driver Address"   value={transport.driverAddress} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
