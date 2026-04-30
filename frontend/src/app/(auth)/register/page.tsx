"use client";

import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto 0.5rem" }}>🎨</div>
        <h1 style={{ color: "white", fontWeight: 900, fontSize: "1.5rem", letterSpacing: -0.5, margin: 0 }}>
          Pre<span style={{ color: "#fbbf24" }}>skool</span>
        </h1>
      </div>

      <div className="card">
        <div className="card-header">
          <span style={{ fontWeight: 800, fontSize: "1.05rem" }}>Create an Account</span>
        </div>
        <div className="card-body">
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
              {[
                { label: "First Name",  type: "text",     col: "half" },
                { label: "Last Name",   type: "text",     col: "half" },
                { label: "Email",       type: "email",    col: "full" },
                { label: "Username",    type: "text",     col: "half" },
                { label: "Mobile",      type: "tel",      col: "half" },
                { label: "Password",    type: "password", col: "half" },
                { label: "Confirm Password", type: "password", col: "half" },
              ].map((f) => (
                <div key={f.label} style={{ gridColumn: f.col === "full" ? "1 / -1" : undefined }}>
                  <label className="form-label">{f.label}</label>
                  <input type={f.type} className="form-control" />
                </div>
              ))}

              <div style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Role</label>
                <select className="form-control">
                  <option>Select Role</option>
                  <option>Administrator</option>
                  <option>Teacher</option>
                  <option>Staff</option>
                </select>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.82rem", cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: "var(--primary)", width: 15, height: 15, marginTop: 2 }} />
                  I agree to the <Link href="#" style={{ color: "var(--primary)", fontWeight: 600 }}>Terms & Conditions</Link>
                </label>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <Link href="/" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.625rem" }}>
                  <UserPlus size={16} /> Create Account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: "1rem" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#fbbf24", fontWeight: 700, textDecoration: "none" }}>Sign In</Link>
      </p>
    </div>
  );
}
