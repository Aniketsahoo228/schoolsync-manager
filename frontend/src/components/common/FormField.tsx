interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  accept?: string;
  colSpan?: "half" | "full";
}

export default function FormField({
  label,
  type = "text",
  placeholder,
  required,
  options,
  rows,
  accept,
  colSpan = "half",
}: FormFieldProps) {
  return (
    <div className={colSpan === "full" ? "col-span-2" : ""} style={{ marginBottom: "1rem" }}>
      <label className="form-label">
        {label}
        {required && <span style={{ color: "var(--danger)", marginLeft: 2 }}>*</span>}
      </label>
      {type === "select" && options ? (
        <select className="form-control">
          <option value="">Select {label}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          className="form-control"
          rows={rows ?? 3}
          placeholder={placeholder}
          style={{ resize: "vertical" }}
        />
      ) : (
        <input
          type={type}
          className="form-control"
          placeholder={placeholder}
          accept={accept}
          required={required}
        />
      )}
    </div>
  );
}