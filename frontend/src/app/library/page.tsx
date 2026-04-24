'use client';

import { useState } from 'react';
import Link from 'next/link';
import BookTable from '@/components/library/BookTable';
import { mockBooks } from '@/lib/data/library';

export default function LibraryPage() {
  const [books, setBooks] = useState(mockBooks);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const inStock = books.filter((b) => b.status === 'In Stock').length;
  const outOfStock = books.filter((b) => b.status === 'Out of Stock').length;

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Library</h3>
          <nav className="flex items-center gap-2 text-sm mt-1">
            <Link href="/" className="text-orange-500 hover:underline">Dashboard</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">Library</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-orange-400 text-orange-500 hover:bg-orange-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
          <Link
            href="/library/add"
            className="flex items-center justify-center w-9 h-9 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            title="Add Book"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Books" value={books.length} color="orange" />
        <StatCard label="In Stock" value={inStock} color="green" />
        <StatCard label="Out of Stock" value={outOfStock} color="red" />
      </div>

      {/* Table */}
      <BookTable books={books} onDelete={handleDelete} />
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: 'orange' | 'green' | 'red' }) {
  const colors = {
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    green:  'bg-green-50  text-green-600  border-green-100',
    red:    'bg-red-50    text-red-500    border-red-100',
  };
  return (
    <div className={`border rounded-lg p-4 ${colors[color]}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
