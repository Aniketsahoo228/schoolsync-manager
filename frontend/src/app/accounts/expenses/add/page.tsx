import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Save, X } from "lucide-react";

export default function AddExpensesPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Add Expense"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accounts" }, { label: "Expenses", href: "/accounts/expenses" }, { label: "Add Expense" }]}
      />
      <div className="card">
        <div className="card-header"><span style={{ fontWeight: 700 }}>Expense Information</span></div>
        <div className="card-body">
          <form>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              {[
                { label: "Expenses ID", type: "text" },
                { label: "Item Name", type: "text" },
                { label: "Item Quantity", type: "text" },
                { label: "Expense Amount", type: "number" },
                { label: "Source of Purchase", type: "text" },
                { label: "Purchase Date", type: "date" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="form-label">{f.label}</label>
                  <input type={f.type} className="form-control" />
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Notes</label>
                <textarea className="form-control" rows={3} style={{ resize: "vertical" }} />
              </div>
              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button type="submit" className="btn btn-primary"><Save size={16} />Save Expense</button>
                <Link href="/accounts/expenses" className="btn btn-secondary"><X size={16} />Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
