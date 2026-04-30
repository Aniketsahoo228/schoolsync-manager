"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Eye, Edit, Trash2 } from "lucide-react";
import { SPORTS, type Sport } from "@/lib/data/sports";

export default function SportsTable() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Sport[]>(SPORTS);

  const filtered = items.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.coachName.toLowerCase().includes(query.toLowerCase()),
  );

  function handleDelete(id: string) {
    if (confirm("Delete this sport?")) setItems((p) => p.filter((s) => s.id !== id));
  }

  return (
    <div className="card">
      <div className="card-header" style={{ flexWrap: "wrap", gap: "0.75rem" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 320 }}>
          <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
          <input
            type="text"
            placeholder="Search sport or coach…"
            className="form-control"
            style={{ paddingLeft: "2.25rem", height: 38 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="form-control" style={{ height: 38, width: "auto" }}>
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div style={{ overflow: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Sport</th>
              <th>Sports ID</th>
              <th>Coach Name</th>
              <th>Started Year</th>
              <th>Students</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>No records found.</td>
              </tr>
            ) : (
              filtered.map((s, i) => (
                <tr key={s.id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                        {s.emoji}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700 }}>{s.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{s.description.substring(0, 40)}…</div>
                      </div>
                    </div>
                  </td>
                  <td><span style={{ fontWeight: 600, color: "var(--primary)" }}>{s.sportsId}</span></td>
                  <td>{s.coachName}</td>
                  <td>{s.startedYear}</td>
                  <td>
                    <span className="badge" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                      {s.studentsEnrolled} enrolled
                    </span>
                  </td>
                  <td>
                    <span className="badge" style={{ background: s.status === "Active" ? "#ecfdf5" : "#fef2f2", color: s.status === "Active" ? "#10b981" : "#ef4444" }}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.375rem" }}>
                      <Link href={`/sports/${s.id}`} className="btn btn-success" style={{ padding: "0.3rem 0.6rem" }}><Eye size={13} /></Link>
                      <Link href={`/sports/${s.id}/edit`} className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}><Edit size={13} /></Link>
                      <button className="btn btn-danger" style={{ padding: "0.3rem 0.6rem" }} onClick={() => handleDelete(s.id)}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div style={{ padding: "0.875rem 1.5rem", borderTop: "1px solid var(--border)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
        Showing {filtered.length} of {items.length} sports
      </div>
    </div>
  );
}
