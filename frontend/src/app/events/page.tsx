"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";
import { useEvents } from "@/lib/api.hooks";

export default function EventsPage() {
  const { data: events, loading, error } = useEvents();
  return (
    <DashboardLayout>
      <PageHeader title="Events" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events" }]} action={<Link href="/events/add" className="btn btn-primary"><Plus size={16} />Add Event</Link>} />
      {error && <div className="card"><div className="card-body" style={{ color: "#ef4444" }}>{error}</div></div>}
      {loading ? <div className="card"><div className="card-body">Loading events...</div></div> : events.length === 0 ? <div className="card"><div className="card-body">No events found.</div></div> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
          {events.map((e) => (
            <div key={e.id} className="card"><div className="card-body"><div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}><span className="badge" style={{ background: "#eff6ff", color: "#3b82f6" }}>{e.venue || "Event"}</span><div style={{ display: "flex", gap: "0.375rem" }}><button className="btn btn-secondary" style={{ padding: "0.25rem 0.5rem" }}><Edit size={12} /></button><button className="btn btn-danger" style={{ padding: "0.25rem 0.5rem" }}><Trash2 size={12} /></button></div></div><h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.375rem" }}>{e.name}</h3><p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>{e.description || "No description"}</p><div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600 }}><Calendar size={13} />{e.event_date}</div></div></div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
