import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import SportsForm from "@/components/sports/SportsForm";

export default function AddSportPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Add Sport"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sports", href: "/sports" }, { label: "Add Sport" }]}
      />
      <div className="card">
        <div className="card-header"><span style={{ fontWeight: 700 }}>Sport Registration Form</span></div>
        <div className="card-body"><SportsForm mode="add" /></div>
      </div>
    </DashboardLayout>
  );
}
