import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-indigo-700 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">SchoolSync</h1>

      <nav className="space-y-3">
        <Link href="/" className="block hover:text-yellow-300">Dashboard</Link>
        <Link href="/Students" className="block font-semibold text-yellow-300">
          Students
        </Link>
        <Link href="/teachers" className="block hover:text-yellow-300">Teachers</Link>
        <Link href="/fees" className="block hover:text-yellow-300">Fees</Link>
      </nav>
    </div>
  );
}