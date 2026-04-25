import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

const salaries = [
  { id: "TCH-001", name: "Mrs. Anita Verma", gender: "Female", joiningDate: "2017-01-10", amount: "₹35,000", month: "April 2025", status: "Paid" },
  { id: "TCH-002", name: "Mr. Rajesh Mohan", gender: "Male", joiningDate: "2020-03-15", amount: "₹28,000", month: "April 2025", status: "Paid" },
  { id: "TCH-003", name: "Ms. Kavitha Rao", gender: "Female", joiningDate: "2022-06-01", amount: "₹24,000", month: "April 2025", status: "Pending" },
  { id: "TCH-004", name: "Mr. Suresh Bhat", gender: "Male", joiningDate: "2019-08-20", amount: "₹26,000", month: "April 2025", status: "Paid" },
];

export default function SalaryPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Salary"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accounts" }, { label: "Salary" }]}
        action={
          <Link href="/accounts/salary/add" className="btn btn-primary"><Plus size={16} />Add Salary</Link>
        }
      />
      <div className="card">
        <div className="card-header" style={{ flexWrap: "wrap", gap: "0.75rem" }}>
          <div className="relative" style={{ flex: 1, minWidth: 200, maxWidth: 300 }}>
            <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input type="text" placeholder="Search staff..." className="form-control" style={{ paddingLeft: "2.25rem", height: 38 }} />
          </div>
          <select className="form-control" style={{ height: 38, width: "auto" }}>
            <option>April 2025</option>
            <option>March 2025</option>
            <option>February 2025</option>
          </select>
        </div>
        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Staff</th>
                <th>Staff ID</th>
                <th>Gender</th>
                <th>Joining Date</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((s, i) => (
                <tr key={s.id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div className="avatar" style={{ background: "#fef3c7", color: "#f59e0b" }}>{s.name[4]}</div>
                      <span style={{ fontWeight: 600 }}>{s.name}</span>
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{s.id}</span></td>
                  <td>{s.gender}</td>
                  <td style={{ color: "var(--text-muted)" }}>{s.joiningDate}</td>
                  <td>{s.month}</td>
                  <td style={{ fontWeight: 700 }}>{s.amount}</td>
                  <td>
                    <span className="badge" style={{ background: s.status === "Paid" ? "#ecfdf5" : "#fef3c7", color: s.status === "Paid" ? "#10b981" : "#f59e0b" }}>
                      {s.status}
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