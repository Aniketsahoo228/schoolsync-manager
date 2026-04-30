import Link from 'next/link';
import { mockBooks } from '@/lib/data/library';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default function BookDetailPage({ params }: Props) {
  const book = mockBooks.find((b) => b.id === params.id);
  if (!book) notFound();

  const isInStock = book.status === 'Available';

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Book Details</h3>
          <nav className="flex items-center gap-2 text-sm mt-1">
            <Link href="/library" className="text-orange-500 hover:underline">Library</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">{book.title}</span>
          </nav>
        </div>
        <Link
          href={`/library/${book.id}/edit`}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Book
        </Link>
      </div>

      {/* Detail Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start gap-6 mb-6 pb-6 border-b border-gray-100">
          {/* Book Icon */}
          <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
            <p className="text-gray-400 text-sm mt-1">{book.id}</p>
            <span className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-xs font-medium ${
              isInStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
            }`}>
              {book.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DetailRow label="Book ID"    value={book.id} />
          <DetailRow label="Author"     value={book.author} />
          <DetailRow label="ISBN"       value={book.isbn} />
          <DetailRow label="Category"   value={book.category} />
          <DetailRow label="Publisher"  value={book.publisher} />
          <DetailRow label="Year"       value={String(book.publishedYear)} />
          <DetailRow label="Quantity"   value={String(book.quantity)} />
          <DetailRow label="Available"  value={String(book.available)} />
          <DetailRow label="Status"     value={book.status} />
        </div>
      </div>

      <div className="mt-4">
        <Link href="/library" className="text-sm text-orange-500 hover:underline flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Library
        </Link>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-gray-700 mt-1">{value}</p>
    </div>
  );
}
