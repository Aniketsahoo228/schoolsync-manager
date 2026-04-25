import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus } from "lucide-react";

const timetable = [
  { teacherId: "TCH-001", name: "Mrs. Anita Verma", class: "KG-1", section: "A", subject: "English", date: "Mon-Fri", startTime: "09:00 AM", endTime: "10:00 AM" },
  { teacherId: "TCH-002", name: "Mr. Rajesh Mohan", class: "KG-2", section: "A", subject: "Maths", date: "Mon-Fri", startTime: "10:00 AM", endTime: "11:00 AM" },
  { teacherId: "TCH-003", name: "Ms. Kavitha Rao", class: "Nursery", section: "A", subject: "Science", date: "Tue,Thu", startTime: "11:00 AM", endTime: "11:45 AM" },
  { teacherId: "TCH-004", name: "Mr. Suresh Bhat", class: "KG-1", section: "B", subject: "Arts", date: "Wed,Fri", startTime: "02:00 PM", endTime: "03:00 PM" },
  { teacherId: "TCH-005", name: "Ms. Deepika Singh", class: "All", section: "—", subject: "Music", date: "Mon,Wed", startTime: "03:00 PM", endTime: "03:45 PM" },
];

export default function TimeTablePage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Time Table"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Time Table" }]}
        action={
          <Link href="/timetable/add" className="btn btn-primary"><Plus size={16} />Add Time Table</Link>
        }
      />
      <div className="card">
        <div className="card-header" style={{ flexWrap: "wrap", gap: "0.75rem" }}>
          <select className="form-control" style={{ height: 38, width: "auto" }}>
            <option>All Classes</option>
            <option>Nursery</option>
            <option>KG-1</option>
            <option>KG-2</option>
          </select>
          <select className="form-control" style={{ height: 38, width: "auto" }}>
            <option>All Sections</option>
            <option>Section A</option>
            <option>Section B</option>
          </select>
        </div>
        <div style={{ overflow: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Teacher</th>
                <th>Teacher ID</th>
                <th>Class</th>
                <th>Section</th>
                <th>Subject</th>
                <th>Days</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((t, i) => (
                <tr key={t.teacherId + i}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div className="avatar" style={{ background: "#fef3c7", color: "#f59e0b" }}>{t.name[4]}</div>
                      <span style={{ fontWeight: 600 }}>{t.name}</span>
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{t.teacherId}</span></td>
                  <td>{t.class}</td>
                  <td>{t.section}</td>
                  <td>
                    <span className="badge" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{t.subject}</span>
                  </td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{t.date}</td>
                  <td style={{ color: "var(--text-muted)" }}>{t.startTime}</td>
                  <td style={{ color: "var(--text-muted)" }}>{t.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
