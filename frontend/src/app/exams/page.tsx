import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

const exams = [
  { id: "EXM-001", name: "Monthly Test - April", class: "KG-1", subject: "English", fees: "₹200", startTime: "09:00 AM", endTime: "10:30 AM", date: "2025-04-20" },
  { id: "EXM-002", name: "Monthly Test - April", class: "KG-2", subject: "Maths", fees: "₹200", startTime: "11:00 AM", endTime: "12:30 PM", date: "2025-04-21" },
  { id: "EXM-003", name: "Term Exam", class: "Nursery A", subject: "English", fees: "₹150", startTime: "09:00 AM", endTime: "10:00 AM", date: "2025-05-05" },
  { id: "EXM-004", name: "Term Exam", class: "KG-1", subject: "Science", fees: "₹150", startTime: "10:30 AM", endTime: "12:00 PM", date: "2025-05-06" },
];

export default function ExamsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Exam List"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Exam List" }]}
        action={
          <Link href="/exams/add" className="btn btn-primary"><Plus size={16} />Add Exam</Link>
        }
      />
      <div className="card">
        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Exam Name</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Fees</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((e, i) => (
                <tr key={e.id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{e.name}</td>
                  <td>{e.class}</td>
                  <td>{e.subject}</td>
                  <td>{e.fees}</td>
                  <td style={{ color: "var(--text-muted)" }}>{e.startTime}</td>
                  <td style={{ color: "var(--text-muted)" }}>{e.endTime}</td>
                  <td>
                    <span className="badge" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{e.date}</span>
                  </td>
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