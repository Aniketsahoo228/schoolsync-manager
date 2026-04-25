import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Save, X } from "lucide-react";

export default function AddFeesCollectionPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Add Fees Collection"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accounts" }, { label: "Add Fees" }]}
      />
      <div className="card">
        <div className="card-header"><span style={{ fontWeight: 700 }}>Fees Information</span></div>
        <div className="card-body">
          <form>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
              {[
                { label: "Student ID", type: "text" },
                { label: "Student Name", type: "text" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="form-label">{f.label}</label>
                  <input type={f.type} className="form-control" />
                </div>
              ))}
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
                <label className="form-label">Fees Type</label>
                <select className="form-control">
                  <option>Select Fees Type</option>
                  <option>Tuition</option>
                  <option>Transport</option>
                  <option>Activity</option>
                  <option>Hostel</option>
                </select>
              </div>
              <div>
                <label className="form-label">Fees Amount</label>
                <input type="number" className="form-control" placeholder="₹ 0.00" />
              </div>
              <div>
                <label className="form-label">Paid Date</label>
                <input type="date" className="form-control" />
              </div>
              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button type="submit" className="btn btn-primary"><Save size={16} />Save Record</button>
                <Link href="/accounts/fees-collections" className="btn btn-secondary"><X size={16} />Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}