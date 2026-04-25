import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-gray-100 bg-white p-6 md:block">
      <Link href="/" className="text-xl font-semibold text-orange-500">
        SchoolSync
      </Link>
      <nav className="mt-8 flex flex-col gap-2 text-sm text-gray-600">
        <Link href="/library" className="rounded-lg px-3 py-2 hover:bg-orange-50 hover:text-orange-600">
          Library
        </Link>
        <Link href="/hostel" className="rounded-lg px-3 py-2 hover:bg-orange-50 hover:text-orange-600">
          Hostel
        </Link>
      </nav>
    </aside>
  );
}
