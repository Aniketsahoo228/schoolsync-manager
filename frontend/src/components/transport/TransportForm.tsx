"use client";

import { useState } from "react";
import Link from "next/link";
import { Save, X } from "lucide-react";
import type { Transport, TransportStatus } from "@/lib/data/transport";

type FormData = Omit<Transport, "id" | "studentsAssigned">;

const EMPTY: FormData = {
  routeName: "",
  vehicleNumber: "",
  driverName: "",
  licenseNumber: "",
  contactNumber: "",
  driverAddress: "",
  status: "Active",
  capacity: 35,
};

interface Props {
  initial?: Partial<Transport>;
  mode: "add" | "edit";
}

function Field({
  label, name, type = "text", value, onChange, required,
}: {
  label: string; name: keyof FormData; type?: string;
  value: string | number; onChange: (k: keyof FormData, v: string) => void; required?: boolean;
}) {
  return (
    <div>
      <label className="form-label">
        {label}
        {required && <span style={{ color: "var(--danger)", marginLeft: 2 }}>*</span>}
      </label>
      <input
        type={type}
        className="form-control"
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required={required}
      />
    </div>
  );
}

export default function TransportForm({ initial, mode }: Props) {
  const [form, setForm] = useState<FormData>({ ...EMPTY, ...initial });

  function set(key: keyof FormData, val: string) {
    setForm((p) => ({ ...p, [key]: key === "capacity" ? Number(val) : val }));
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
        {/* Section header */}
        <div style={{ gridColumn: "1 / -1" }}>
          <span className="form-section-title">Transport Information</span>
        </div>

        <Field label="Route Name"      name="routeName"      value={form.routeName}      onChange={set} required />
        <Field label="Vehicle Number"  name="vehicleNumber"  value={form.vehicleNumber}  onChange={set} required />
        <Field label="Driver Name"     name="driverName"     value={form.driverName}     onChange={set} required />
        <Field label="License Number"  name="licenseNumber"  value={form.licenseNumber}  onChange={set} required />
        <Field label="Contact Number"  name="contactNumber"  type="tel" value={form.contactNumber} onChange={set} required />
        <Field label="Vehicle Capacity (seats)" name="capacity" type="number" value={form.capacity} onChange={set} required />

        {/* Status */}
        <div>
          <label className="form-label">Status</label>
          <select
            className="form-control"
            value={form.status}
            onChange={(e) => set("status", e.target.value as TransportStatus)}
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Maintenance</option>
          </select>
        </div>

        {/* Driver Address — full width */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label className="form-label">Driver Address</label>
          <textarea
            className="form-control"
            rows={3}
            style={{ resize: "vertical" }}
            value={form.driverAddress}
            onChange={(e) => set("driverAddress", e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
          <button type="submit" className="btn btn-primary">
            <Save size={16} />
            {mode === "add" ? "Save Transport" : "Update Transport"}
          </button>
          <Link href="/transport" className="btn btn-secondary">
            <X size={16} />
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
