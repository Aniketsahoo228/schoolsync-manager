"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--body-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        {/* Illustration */}
        <div
          style={{
            fontSize: "7rem",
            lineHeight: 1,
            marginBottom: "1rem",
            filter: "drop-shadow(0 4px 12px rgba(124,58,237,0.2))",
          }}
        >
          🎒
        </div>

        {/* 404 number */}
        <div
          style={{
            fontSize: "6rem",
            fontWeight: 900,
            color: "var(--primary)",
            lineHeight: 1,
            letterSpacing: -4,
            marginBottom: "0.5rem",
          }}
        >
          404
        </div>

        <h1
          style={{
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "var(--text-primary)",
            margin: "0 0 0.5rem",
          }}
        >
          Oops! Page Not Found
        </h1>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-muted)",
            lineHeight: 1.7,
            margin: "0 0 2rem",
          }}
        >
          Looks like this page went on a field trip and forgot to come back. The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary">
            <Home size={16} />
            Back to Dashboard
          </Link>
          <button className="btn btn-secondary" onClick={() => history.back()}>
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>

        {/* Quick links */}
        <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: "0.875rem" }}>
            Quick Links
          </div>
          <div style={{ display: "flex", gap: "0.625rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "Students",  href: "/students" },
              { label: "Teachers",  href: "/teachers" },
              { label: "Fees",      href: "/fees" },
              { label: "Events",    href: "/events" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  padding: "0.375rem 0.875rem",
                  background: "var(--primary-light)",
                  color: "var(--primary)",
                  borderRadius: 999,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
