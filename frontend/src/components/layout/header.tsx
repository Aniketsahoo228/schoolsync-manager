"use client";

import { Bell, Search, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="main-header">
      {/* Search */}
      <div className="flex items-center flex-1 gap-3">
        <div className="relative" style={{ maxWidth: 300, flex: 1 }}>
          <Search
            size={15}
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }}
          />
          <input
            type="text"
            placeholder="Search here..."
            className="form-control"
            style={{ paddingLeft: "2.25rem", height: 38 }}
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          className="relative"
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "var(--primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Bell size={16} style={{ color: "var(--primary)" }} />
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              background: "var(--danger)",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
        </button>

        {/* Profile */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            background: "none",
            border: "1.5px solid var(--border)",
            borderRadius: 10,
            padding: "0.375rem 0.75rem",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "0.8rem",
              fontWeight: 700,
            }}
          >
            R
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Ryan Taylor
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Administrator</div>
          </div>
          <ChevronDown size={14} style={{ color: "var(--text-muted)" }} />
        </button>
      </div>
    </header>
  );
}
