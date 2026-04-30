"use client";

import Link from "next/link";
import { useState } from "react";
import { LogIn, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", margin: "0 auto 0.75rem" }}>🎨</div>
        <h1 style={{ color: "white", fontWeight: 900, fontSize: "1.75rem", letterSpacing: -1, margin: 0 }}>
          Pre<span style={{ color: "#fbbf24" }}>skool</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", marginTop: "0.25rem" }}>Pre-School Management System</p>
      </div>

      {/* Card */}
      <div className="card">
        <div className="card-header">
          <span style={{ fontWeight: 800, fontSize: "1.1rem" }}>Sign In to Your Account</span>
        </div>
        <div className="card-body">
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="form-label">Username or Email</label>
                <input type="text" className="form-control" placeholder="admin@preskool.in" />
              </div>
              <div>
                <label className="form-label">Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPwd ? "text" : "password"} className="form-control" placeholder="••••••••" style={{ paddingRight: "2.75rem" }} />
                  <button
                    type="button"
                    onClick={() => setShowPwd((p) => !p)}
                    style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
                  >
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", cursor: "pointer" }}>
                  <input type="checkbox" style={{ accentColor: "var(--primary)", width: 15, height: 15 }} />
                  Remember me
                </label>
                <Link href="/forgot-password" style={{ fontSize: "0.82rem", color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}>
                  Forgot password?
                </Link>
              </div>

              <Link href="/" className="btn btn-primary" style={{ justifyContent: "center", padding: "0.625rem" }}>
                <LogIn size={16} /> Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>

      <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: "1.25rem" }}>
        Don&apos;t have an account?{" "}
        <Link href="/register" style={{ color: "#fbbf24", fontWeight: 700, textDecoration: "none" }}>Register</Link>
      </p>
    </div>
  );
}
