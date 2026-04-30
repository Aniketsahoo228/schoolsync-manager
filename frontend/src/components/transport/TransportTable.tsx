"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Eye, Edit, Trash2, Bus } from "lucide-react";
import { TRANSPORTS, type Transport, type TransportStatus } from "@/lib/data/transport";

const statusStyle: Record<TransportStatus, { bg: string; color: string }> = {
  Active:      { bg: "#ecfdf5", color: "#10b981" },
  Inactive:    { bg: "#fef2f2", color: "#ef4444" },
  Maintenance: { bg: "#fef3c7", color: "#f59e0b" },
};

export default function TransportTable() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TransportStatus | "All">("All");
  const [items, setItems] = useState<Transport[]>(TRANSPORTS);

  const filtered = items.filter((t) => {
    const matchQ =
      t.routeName.toLowerCase().includes(query.toLowerCase()) ||
      t.vehicleNumber.toLowerCase().includes(query.toLowerCase()) ||
      t.driverName.toLowerCase().includes(query.toLowerCase());
    const matchS = statusFilter === "All" || t.status === statusFilter;
    return matchQ && matchS;
  });

  function handleDelete(id: string) {
    if (confirm("Delete this transport record?")) setItems((p) => p.filter((t) => t.id !== id));
  }

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="card-header" style={{ flexWrap: "wrap", gap: "0.75rem" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 320 }}>
          <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
          <input
            type="text"
            placeholder="Search route, vehicle, driver…"
            className="form-control"
            style={{ paddingLeft: "2.25rem", height: 38 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select
          className="form-control"
          style={{ height: 38, width: "auto" }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TransportStatus | "All")}
        >
          <option value="All">All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Maintenance</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ overflow: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Route</th>
              <th>Vehicle No.</th>
              <th>Driver</th>
              <th>Contact</th>
              <th>Capacity</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                  No transport records found.
                </td>
              </tr>
            ) : (
              filtered.map((t, i) => {
                const sc = statusStyle[t.status];
                return (
                  <tr key={t.id}>
                    <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 8,
                            background: "var(--primary-light)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Bus size={15} style={{ color: "var(--primary)" }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{t.routeName}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{t.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{t.vehicleNumber}</td>
                    <td>{t.driverName}</td>
                    <td style={{ color: "var(--text-muted)" }}>{t.contactNumber}</td>
                    <td>
                      <div style={{ fontSize: "0.8rem" }}>
                        <span style={{ fontWeight: 700 }}>{t.capacity}</span>
                        <span style={{ color: "var(--text-muted)" }}> seats</span>
                      </div>
                    </td>
                    <td>
                      {/* fill bar */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ flex: 1, height: 6, borderRadius: 99, background: "#e5e7eb", minWidth: 60 }}>
                          <div
                            style={{
                              height: "100%",
                              borderRadius: 99,
                              width: `${Math.round((t.studentsAssigned / t.capacity) * 100)}%`,
                              background: t.studentsAssigned / t.capacity > 0.8 ? "#ef4444" : "var(--primary)",
                            }}
                          />
                        </div>
                        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                          {t.studentsAssigned}/{t.capacity}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="badge" style={{ background: sc.bg, color: sc.color }}>
                        {t.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.375rem" }}>
                        <Link href={`/transport/${t.id}`} className="btn btn-success" style={{ padding: "0.3rem 0.6rem" }}>
                          <Eye size={13} />
                        </Link>
                        <Link href={`/transport/${t.id}/edit`} className="btn btn-secondary" style={{ padding: "0.3rem 0.6rem" }}>
                          <Edit size={13} />
                        </Link>
                        <button className="btn btn-danger" style={{ padding: "0.3rem 0.6rem" }} onClick={() => handleDelete(t.id)}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      <div style={{ padding: "0.875rem 1.5rem", borderTop: "1px solid var(--border)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
        Showing {filtered.length} of {items.length} transport routes
      </div>
    </div>
  );
}
