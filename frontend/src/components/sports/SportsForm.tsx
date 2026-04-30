"use client";

import { useState } from "react";
import Link from "next/link";
import { Save, X } from "lucide-react";
import type { Sport, SportsStatus } from "@/lib/data/sports";

type FormData = Omit<Sport, "id" | "studentsEnrolled">;

const EMPTY: FormData = {
  sportsId: "",
  name: "",
  coachName: "",
  startedYear: new Date().getFullYear(),
  status: "Active",
  description: "",
  emoji: "🏆",
};

const EMOJIS = ["⚽", "🏸", "🏏", "🏊", "🤸", "🏓", "🏀", "🎾", "🥊", "🏋️", "🏆"];

interface Props {
  initial?: Partial<Sport>;
  mode: "add" | "edit";
}

export default function SportsForm({ initial, mode }: Props) {
  const [form, setForm] = useState<FormData>({ ...EMPTY, ...initial });

  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <span className="form-section-title">Sports Information</span>
        </div>

        {/* Sports ID */}
        <div>
          <label className="form-label">Sports ID <span style={{ color: "var(--danger)" }}>*</span></label>
          <input className="form-control" value={form.sportsId} onChange={(e) => set("sportsId", e.target.value)} required />
        </div>

        {/* Sports Name */}
        <div>
          <label className="form-label">Sports Name <span style={{ color: "var(--danger)" }}>*</span></label>
          <input className="form-control" value={form.name} onChange={(e) => set("name", e.target.value)} required />
        </div>

        {/* Coach Name */}
        <div>
          <label className="form-label">Coach Name <span style={{ color: "var(--danger)" }}>*</span></label>
          <input className="form-control" value={form.coachName} onChange={(e) => set("coachName", e.target.value)} required />
        </div>

        {/* Started Year */}
        <div>
          <label className="form-label">Started Year <span style={{ color: "var(--danger)" }}>*</span></label>
          <input
            type="number"
            className="form-control"
            min={2000}
            max={new Date().getFullYear()}
            value={form.startedYear}
            onChange={(e) => set("startedYear", Number(e.target.value))}
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="form-label">Status</label>
          <select className="form-control" value={form.status} onChange={(e) => set("status", e.target.value as SportsStatus)}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Emoji picker */}
        <div>
          <label className="form-label">Sport Icon</label>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", paddingTop: "0.25rem" }}>
            {EMOJIS.map((em) => (
              <button
                type="button"
                key={em}
                onClick={() => set("emoji", em)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  border: "2px solid",
                  borderColor: form.emoji === em ? "var(--primary)" : "var(--border)",
                  background: form.emoji === em ? "var(--primary-light)" : "white",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                }}
              >
                {em}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows={3}
            style={{ resize: "vertical" }}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
          <button type="submit" className="btn btn-primary">
            <Save size={16} />
            {mode === "add" ? "Save Sport" : "Update Sport"}
          </button>
          <Link href="/sports" className="btn btn-secondary">
            <X size={16} />Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
