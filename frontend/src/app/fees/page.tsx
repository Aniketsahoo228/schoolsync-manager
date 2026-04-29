import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

const fees = [
  { id: "FEE-001", type: "Tuition Fee", gender: "All", amount: "₹4,500", startDate: "2025-04-01", endDate: "2025-04-30" },
  { id: "FEE-002", type: "Transport Fee", gender: "All", amount: "₹1,200", startDate: "2025-04-01", endDate: "2025-04-30" },
  { id: "FEE-003", type: "Activity Fee", gender: "All", amount: "₹800", startDate: "2025-04-01", endDate: "2025-04-30" },
  { id: "FEE-004", type: "Hostel Fee", gender: "All", amount: "₹6,000", startDate: "2025-04-01", endDate: "2025-04-30" },
];

export default function FeesPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Fees"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Fees" }]}
        action={
          <Link href="/accounts/fees/add" className="btn btn-primary"><Plus size={16} />Add Fees</Link>
        }
      />
      <div className="card">
        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Fees ID</th>
                <th>Fees Type</th>
                <th>Gender</th>
                <th>Amount</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((f, i) => (
                <tr key={f.id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{f.id}</span></td>
                  <td style={{ fontWeight: 600 }}>{f.type}</td>
                  <td>{f.gender}</td>
                  <td style={{ fontWeight: 700 }}>{f.amount}</td>
                  <td style={{ color: "var(--text-muted)" }}>{f.startDate}</td>
                  <td style={{ color: "var(--text-muted)" }}>{f.endDate}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.375rem" }}>
                      <button className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}><Edit size={13} /></button>
                      <button className="btn btn-danger" style={{ padding: "0.3rem 0.6rem" }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}