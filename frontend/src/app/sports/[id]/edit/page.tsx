import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import SportsForm from "@/components/sports/SportsForm";
import { SPORTS } from "@/lib/data/sports";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return SPORTS.map((s) => ({ id: s.id }));
}

export default function EditSportPage({ params }: { params: { id: string } }) {
  const sport = SPORTS.find((s) => s.id === params.id);
  if (!sport) notFound();

  return (
    <DashboardLayout>
      <PageHeader
        title="Edit Sport"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sports", href: "/sports" }, { label: sport.name }, { label: "Edit" }]}
      />
      <div className="card">
        <div className="card-header">
          <span style={{ fontWeight: 700 }}>Edit Sport — {sport.name}</span>
          <span className="badge" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{sport.sportsId}</span>
        </div>
        <div className="card-body"><SportsForm mode="edit" initial={sport} /></div>
      </div>
    </DashboardLayout>
  );
}
