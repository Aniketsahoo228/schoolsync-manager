import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Search, Download } from "lucide-react";

const collections = [
  { id: "FC-001", studentId: "STU-001", name: "Aarav Sharma", gender: "Male", feesType: "Tuition", amount: "₹4,500", paidDate: "2025-04-01", status: "Paid" },
  { id: "FC-002", studentId: "STU-002", name: "Priya Reddy", gender: "Female", feesType: "Tuition", amount: "₹4,500", paidDate: "2025-04-02", status: "Paid" },
  { id: "FC-003", studentId: "STU-003", name: "Rohan Patel", gender: "Male", feesType: "Transport", amount: "₹1,200", paidDate: "2025-04-03", status: "Paid" },
  { id: "FC-004", studentId: "STU-004", name: "Sanya Iyer", gender: "Female", feesType: "Tuition", amount: "₹4,500", paidDate: "—", status: "Unpaid" },
  { id: "FC-005", studentId: "STU-005", name: "Arjun Kumar", gender: "Male", feesType: "Activity", amount: "₹800", paidDate: "2025-04-05", status: "Paid" },
];

export default function FeesCollectionsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Fees Collection"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accounts" }, { label: "Fees Collection" }]}
        action={
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-secondary"><Download size={15} />Export</button>
            <Link href="/accounts/fees/add" className="btn btn-primary"><Plus size={16} />Add Fees</Link>
          </div>
        }
      />

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
        {[
          { label: "Total Collected", value: "₹2,40,500", color: "#10b981", bg: "#ecfdf5" },
          { label: "Pending Fees", value: "₹18,000", color: "#ef4444", bg: "#fef2f2" },
          { label: "This Month", value: "₹45,200", color: "#7c3aed", bg: "#ede9fe" },
        ].map((s) => (
          <div key={s.label} className="card">
            <div className="card-body" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>{s.label}</div>
              </div>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "1.25rem" }}>💰</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header" style={{ flexWrap: "wrap", gap: "0.75rem" }}>
          <div className="relative" style={{ flex: 1, minWidth: 200, maxWidth: 300 }}>
            <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input type="text" placeholder="Search by student..." className="form-control" style={{ paddingLeft: "2.25rem", height: 38 }} />
          </div>
          <select className="form-control" style={{ height: 38, width: "auto" }}>
            <option>All Fee Types</option>
            <option>Tuition</option>
            <option>Transport</option>
            <option>Activity</option>
          </select>
          <select className="form-control" style={{ height: 38, width: "auto" }}>
            <option>All Status</option>
            <option>Paid</option>
            <option>Unpaid</option>
          </select>
        </div>
        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Student ID</th>
                <th>Gender</th>
                <th>Fees Type</th>
                <th>Amount</th>
                <th>Paid Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {collections.map((c, i) => (
                <tr key={c.id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div className="avatar">{c.name[0]}</div>
                      <span style={{ fontWeight: 600 }}>{c.name}</span>
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{c.studentId}</span></td>
                  <td>{c.gender}</td>
                  <td>{c.feesType}</td>
                  <td style={{ fontWeight: 700 }}>{c.amount}</td>
                  <td style={{ color: "var(--text-muted)" }}>{c.paidDate}</td>
                  <td>
                    <span className="badge" style={{ background: c.status === "Paid" ? "#ecfdf5" : "#fef2f2", color: c.status === "Paid" ? "#10b981" : "#ef4444" }}>
                      {c.status}
                    </span>
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
