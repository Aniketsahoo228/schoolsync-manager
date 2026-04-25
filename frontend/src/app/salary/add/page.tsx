import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Save, X } from "lucide-react";

export default function AddSalaryPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Add Salary"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accounts" }, { label: "Salary", href: "/accounts/salary" }, { label: "Add Salary" }]}
      />
      <div className="card">
        <div className="card-header"><span style={{ fontWeight: 700 }}>Salary Information</span></div>
        <div className="card-body">
          <form>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              <div>
                <label className="form-label">Staff ID</label>
                <input type="text" className="form-control" />
              </div>
              <div>
                <label className="form-label">Name</label>
                <input type="text" className="form-control" />
              </div>
              <div>
                <label className="form-label">Gender</label>
                <select className="form-control">
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </div>
              <div>
                <label className="form-label">Joining Date</label>
                <input type="date" className="form-control" />
              </div>
              <div>
                <label className="form-label">Amount</label>
                <input type="number" className="form-control" placeholder="₹ 0.00" />
              </div>
              <div>
                <label className="form-label">Month</label>
                <select className="form-control">
                  <option>April 2025</option>
                  <option>March 2025</option>
                  <option>February 2025</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button type="submit" className="btn btn-primary"><Save size={16} />Save Salary</button>
                <Link href="/accounts/salary" className="btn btn-secondary"><X size={16} />Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}