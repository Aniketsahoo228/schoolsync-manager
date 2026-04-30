"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import { useState } from "react";
import { Save, Camera, Lock, Bell, Shield } from "lucide-react";

type Tab = "personal" | "security" | "notifications";

function Field({ label, type = "text", defaultValue, disabled }: { label: string; type?: string; defaultValue?: string; disabled?: boolean }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input type={type} className="form-control" defaultValue={defaultValue} disabled={disabled} style={disabled ? { background: "#fafafa", color: "var(--text-muted)" } : {}} />
    </div>
  );
}

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>("personal");

  const tabs: { value: Tab; label: string; icon: React.ReactNode }[] = [
    { value: "personal",      label: "Personal Info",   icon: <Shield size={15} /> },
    { value: "security",      label: "Security",        icon: <Lock size={15} /> },
    { value: "notifications", label: "Notifications",   icon: <Bell size={15} /> },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="My Profile"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Profile" }]}
      />

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "1.25rem" }}>
        {/* Profile card */}
        <div>
          <div className="card">
            <div className="card-body" style={{ textAlign: "center" }}>
              {/* Avatar */}
              <div style={{ position: "relative", display: "inline-block", marginBottom: "1rem" }}>
                <div style={{ width: 96, height: 96, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "2rem", fontWeight: 800 }}>
                  R
                </div>
                <button style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", background: "var(--secondary)", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Camera size={12} style={{ color: "white" }} />
                </button>
              </div>

              <h2 style={{ fontWeight: 800, fontSize: "1.1rem", margin: "0 0 0.25rem" }}>Ryan Taylor</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", margin: "0 0 0.5rem" }}>Administrator</p>
              <span className="badge" style={{ background: "#ecfdf5", color: "#10b981" }}>Active</span>

              <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { label: "Staff ID",  value: "ADM-001" },
                  { label: "Email",     value: "ryan@preskool.in" },
                  { label: "Joined",    value: "Jan 2020" },
                ].map((r) => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
                    <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>{r.label}</span>
                    <span style={{ fontWeight: 600 }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tab nav */}
          <div className="card" style={{ marginTop: "1rem", padding: "0.5rem 0" }}>
            {tabs.map((t) => (
              <button
                key={t.value}
                onClick={() => setTab(t.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  width: "100%",
                  padding: "0.6rem 1.25rem",
                  background: tab === t.value ? "var(--primary-light)" : "transparent",
                  color: tab === t.value ? "var(--primary)" : "var(--text-primary)",
                  fontWeight: tab === t.value ? 700 : 500,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  borderRadius: 0,
                }}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="card">
          <div className="card-header">
            <span style={{ fontWeight: 700 }}>
              {tab === "personal" ? "Personal Information" : tab === "security" ? "Security Settings" : "Notification Preferences"}
            </span>
          </div>
          <div className="card-body">
            {tab === "personal" && (
              <form onSubmit={(e) => e.preventDefault()}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                  <Field label="First Name"    defaultValue="Ryan" />
                  <Field label="Last Name"     defaultValue="Taylor" />
                  <Field label="Staff ID"      defaultValue="ADM-001" disabled />
                  <Field label="Role"          defaultValue="Administrator" disabled />
                  <Field label="Email"         type="email"    defaultValue="ryan@preskool.in" />
                  <Field label="Mobile"        type="tel"      defaultValue="9876000001" />
                  <Field label="Date of Birth" type="date"     defaultValue="1988-05-14" />
                  <Field label="Gender"        defaultValue="Male" />
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Address</label>
                    <textarea className="form-control" rows={2} defaultValue="1, Admin Block, Preskool Campus, Bhubaneswar" style={{ resize: "vertical" }} />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <button type="submit" className="btn btn-primary"><Save size={16} />Update Profile</button>
                  </div>
                </div>
              </form>
            )}

            {tab === "security" && (
              <form onSubmit={(e) => e.preventDefault()}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", maxWidth: 420 }}>
                  <div style={{ marginBottom: "0.5rem" }}><span className="form-section-title">Change Password</span></div>
                  <Field label="Current Password"    type="password" />
                  <Field label="New Password"        type="password" />
                  <Field label="Confirm New Password" type="password" />
                  <div>
                    <button type="submit" className="btn btn-primary"><Lock size={16} />Update Password</button>
                  </div>
                </div>
              </form>
            )}

            {tab === "notifications" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <span className="form-section-title">Email Notifications</span>
                {[
                  { label: "New student admission",        defaultChecked: true },
                  { label: "Fee payment received",         defaultChecked: true },
                  { label: "New message received",         defaultChecked: true },
                  { label: "Exam schedule updates",        defaultChecked: false },
                  { label: "Holiday announcements",        defaultChecked: false },
                  { label: "Teacher leave applications",   defaultChecked: true },
                ].map((n) => (
                  <label key={n.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.875rem", cursor: "pointer" }}>
                    <input type="checkbox" defaultChecked={n.defaultChecked} style={{ accentColor: "var(--primary)", width: 16, height: 16 }} />
                    {n.label}
                  </label>
                ))}
                <div style={{ marginTop: "0.5rem" }}>
                  <button className="btn btn-primary"><Save size={16} />Save Preferences</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
