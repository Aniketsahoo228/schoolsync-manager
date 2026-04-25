import Header from './header';
import Sidebar from './sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="min-h-screen md:pl-64">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
