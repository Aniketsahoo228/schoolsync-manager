import Sidebar from "./Sidebar";
import Header from "./header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="page-wrapper">
          <div className="page-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
