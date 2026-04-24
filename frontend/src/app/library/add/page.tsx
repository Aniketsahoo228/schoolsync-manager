import Link from 'next/link';
import BookForm from '@/components/library/BookForm';

export default function AddBookPage() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Add Books</h3>
        <nav className="flex items-center gap-2 text-sm mt-1">
          <Link href="/library" className="text-orange-500 hover:underline">Library</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">Add Books</span>
        </nav>
      </div>

      <BookForm mode="add" />
    </div>
  );
}
