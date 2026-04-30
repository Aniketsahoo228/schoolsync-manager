"use client";

import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ width: "100%", maxWidth: 400 }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto 0.5rem" }}>🎨</div>
        <h1 style={{ color: "white", fontWeight: 900, fontSize: "1.5rem", letterSpacing: -0.5, margin: 0 }}>
          Pre<span style={{ color: "#fbbf24" }}>skool</span>
        </h1>
      </div>

      <div className="card">
        <div className="card-body">
          {!sent ? (
            <>
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.875rem" }}>
                  <Mail size={24} style={{ color: "var(--primary)" }} />
                </div>
                <h2 style={{ fontWeight: 800, fontSize: "1.1rem", margin: "0 0 0.375rem" }}>Forgot Password?</h2>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>
                  Enter your registered email address and we&apos;ll send you a password reset link.
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" placeholder="admin@preskool.in" required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", padding: "0.625rem" }}>
                    Send Reset Link
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.875rem" }}>
                <span style={{ fontSize: "1.75rem" }}>✅</span>
              </div>
              <h2 style={{ fontWeight: 800, fontSize: "1.05rem", margin: "0 0 0.5rem" }}>Reset Link Sent!</h2>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                Check your inbox for the password reset link. It will expire in 30 minutes.
              </p>
            </div>
          )}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Link href="/login" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.375rem" }}>
          <ArrowLeft size={14} /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
