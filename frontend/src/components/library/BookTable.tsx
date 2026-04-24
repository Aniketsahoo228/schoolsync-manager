'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Book } from '@/lib/data/library';

interface BookTableProps {
  books: Book[];
  onDelete?: (id: string) => void;
}

export default function BookTable({ books, onDelete }: BookTableProps) {
  const [search, setSearch] = useState('');

  const filtered = books.filter((b) =>
    [b.name, b.id, b.department, b.language].some((f) =>
      f.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Search bar */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <span className="text-sm text-gray-400">{filtered.length} records</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
              <th className="px-6 py-3 font-medium">ID</th>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Language</th>
              <th className="px-6 py-3 font-medium">Department</th>
              <th className="px-6 py-3 font-medium">Class</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                  No books found.
                </td>
              </tr>
            ) : (
              filtered.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-600">{book.id}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/library/${book.id}`}
                      className="font-medium text-gray-800 hover:text-orange-500 transition-colors"
                    >
                      {book.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{book.language}</td>
                  <td className="px-6 py-4 text-gray-600">{book.department}</td>
                  <td className="px-6 py-4 text-gray-600">{book.class}</td>
                  <td className="px-6 py-4 text-gray-600">{book.type}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={book.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/library/${book.id}/edit`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => onDelete?.(book.id)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Book['status'] }) {
  const isInStock = status === 'In Stock';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isInStock
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-600'
      }`}
    >
      {status}
    </span>
  );
}
