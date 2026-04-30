import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import TransportForm from "@/components/transport/TransportForm";
import { TRANSPORTS } from "@/lib/data/transport";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return TRANSPORTS.map((t) => ({ id: t.id }));
}

export default function EditTransportPage({ params }: { params: { id: string } }) {
  const transport = TRANSPORTS.find((t) => t.id === params.id);
  if (!transport) notFound();

  return (
    <DashboardLayout>
      <PageHeader
        title="Edit Transport"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Transport", href: "/transport" },
          { label: transport.vehicleNumber },
          { label: "Edit" },
        ]}
      />
      <div className="card">
        <div className="card-header">
          <span style={{ fontWeight: 700 }}>Edit Transport — {transport.vehicleNumber}</span>
          <span className="badge" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{transport.id}</span>
        </div>
        <div className="card-body">
          <TransportForm mode="edit" initial={transport} />
        </div>
      </div>
    </DashboardLayout>
  );
}
