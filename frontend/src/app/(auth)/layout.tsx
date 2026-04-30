export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      {children}
    </div>
  );
}
