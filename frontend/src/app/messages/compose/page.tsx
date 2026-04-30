"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import { Send, X, Paperclip } from "lucide-react";
import { useState } from "react";

export default function ComposePage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <DashboardLayout>
      <PageHeader
        title="Compose Message"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Messages", href: "/messages" }, { label: "Compose" }]}
      />

      <div className="card" style={{ maxWidth: 780 }}>
        <div className="card-header">
          <span style={{ fontWeight: 700 }}>New Message</span>
        </div>
        <div className="card-body">
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {/* To */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)", width: 60, flexShrink: 0 }}>To</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Recipient name or email"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  style={{ border: "none", boxShadow: "none", padding: 0, fontSize: "0.875rem" }}
                />
              </div>

              {/* CC */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)", width: 60, flexShrink: 0 }}>CC</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Optional CC"
                  style={{ border: "none", boxShadow: "none", padding: 0, fontSize: "0.875rem" }}
                />
              </div>

              {/* Subject */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)", width: 60, flexShrink: 0 }}>Subject</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Message subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{ border: "none", boxShadow: "none", padding: 0, fontSize: "0.875rem" }}
                />
              </div>

              {/* Body */}
              <textarea
                className="form-control"
                rows={10}
                placeholder="Write your message here…"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                style={{ resize: "vertical", border: "none", boxShadow: "none", padding: 0, fontSize: "0.875rem", lineHeight: 1.7 }}
              />

              {/* Footer */}
              <div style={{ display: "flex", gap: "0.625rem", paddingTop: "0.5rem", borderTop: "1px solid var(--border)", alignItems: "center" }}>
                <button type="submit" className="btn btn-primary">
                  <Send size={15} /> Send Message
                </button>
                <button type="button" className="btn btn-secondary">
                  <Paperclip size={15} /> Attach
                </button>
                <div style={{ flex: 1 }} />
                <Link href="/messages" className="btn btn-secondary" style={{ color: "var(--danger)", borderColor: "#fecaca" }}>
                  <X size={15} /> Discard
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
