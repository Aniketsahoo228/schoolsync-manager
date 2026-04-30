import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import TransportForm from "@/components/transport/TransportForm";

export default function AddTransportPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Add Transport"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Transport", href: "/transport" },
          { label: "Add Transport" },
        ]}
      />
      <div className="card">
        <div className="card-header">
          <span style={{ fontWeight: 700 }}>Transport Registration Form</span>
        </div>
        <div className="card-body">
          <TransportForm mode="add" />
        </div>
      </div>
    </DashboardLayout>
  );
}
