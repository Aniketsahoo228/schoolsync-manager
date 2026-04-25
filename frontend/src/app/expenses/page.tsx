import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

const expenses = [
  { id: "EXP-001", item: "Art Supplies", quantity: "50 sets", amount: "₹12,500", source: "Local Vendor", date: "2025-04-01" },
  { id: "EXP-002", item: "Classroom Furniture", quantity: "10 units", amount: "₹45,000", source: "FurnitureMart", date: "2025-04-05" },
  { id: "EXP-003", item: "Books & Stationery", quantity: "200 pcs", amount: "₹8,200", source: "Book Store", date: "2025-04-08" },
  { id: "EXP-004", item: "Cleaning Supplies", quantity: "1 month", amount: "₹3,600", source: "Local Vendor", date: "2025-04-10" },
  { id: "EXP-005", item: "Sports Equipment", quantity: "Various", amount: "₹15,000", source: "Sports Hub", date: "2025-04-12" },
];

export default function ExpensesPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Expenses"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accounts" }, { label: "Expenses" }]}
        action={
          <Link href="/accounts/expenses/add" className="btn btn-primary"><Plus size={16} />Add Expense</Link>
        }
      />
      <div className="card">
        <div className="card-header">
          <div className="relative" style={{ flex: 1, minWidth: 200, maxWidth: 300 }}>
            <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input type="text" placeholder="Search expenses..." className="form-control" style={{ paddingLeft: "2.25rem", height: 38 }} />
          </div>
        </div>
        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Expense ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Source of Purchase</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e, i) => (
                <tr key={e.id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{e.id}</span></td>
                  <td style={{ fontWeight: 600 }}>{e.item}</td>
                  <td>{e.quantity}</td>
                  <td style={{ fontWeight: 700 }}>{e.amount}</td>
                  <td>{e.source}</td>
                  <td style={{ color: "var(--text-muted)" }}>{e.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}