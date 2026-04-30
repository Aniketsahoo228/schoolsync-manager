'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Book, BOOK_CATEGORIES, type BookCategory, type BookStatus } from '@/lib/data/library';

interface BookFormProps {
  initialData?: Partial<Book>;
  mode: 'add' | 'edit';
}

const EMPTY: Partial<Book> = {
  id: '',
  title: '',
  author: '',
  isbn: '',
  category: 'Picture Book',
  publisher: '',
  publishedYear: new Date().getFullYear(),
  quantity: 1,
  available: 1,
  status: 'Available',
  description: '',
};

export default function BookForm({ initialData, mode }: BookFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Book>>({ ...EMPTY, ...initialData });
  const [loading, setLoading] = useState(false);

  const set = (field: keyof Book) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: wire to real API
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    router.push('/library');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      {/* Section heading */}
      <div className="mb-6">
        <h5 className="text-sm font-semibold text-gray-700 border-b border-dashed border-orange-300 pb-2 inline-block pr-6">
          Book Information
        </h5>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Book ID */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Book ID</label>
          <input
            type="text"
            value={form.id ?? ''}
            onChange={set('id')}
            placeholder="e.g. PRE2309"
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          />
        </div>

        {/* Book Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Book Name</label>
          <input
            type="text"
            value={form.title ?? ''}
            onChange={set('title')}
            placeholder="e.g. The Very Hungry Caterpillar"
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          />
        </div>

        {/* Author */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Author</label>
          <input
            type="text"
            value={form.author ?? ''}
            onChange={set('author')}
            placeholder="e.g. Eric Carle"
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          />
        </div>

        {/* ISBN */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">ISBN</label>
          <input
            type="text"
            value={form.isbn ?? ''}
            onChange={set('isbn')}
            placeholder="e.g. 978-0-399-22690-6"
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Category</label>
          <select
            value={form.category ?? ''}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as BookCategory }))}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          >
            <option value="">Select Category</option>
            {BOOK_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Publisher */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Publisher</label>
          <input
            type="text"
            value={form.publisher ?? ''}
            onChange={set('publisher')}
            placeholder="e.g. Philomel Books"
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          />
        </div>

        {/* Published Year */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Published Year</label>
          <input
            type="number"
            value={form.publishedYear ?? ''}
            onChange={(e) => setForm((prev) => ({ ...prev, publishedYear: Number(e.target.value) }))}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Quantity</label>
          <input
            type="number"
            value={form.quantity ?? ''}
            onChange={(e) => setForm((prev) => ({ ...prev, quantity: Number(e.target.value) }))}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          />
        </div>

        {/* Available */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Available</label>
          <input
            type="number"
            value={form.available ?? ''}
            onChange={(e) => setForm((prev) => ({ ...prev, available: Number(e.target.value) }))}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Status</label>
          <select
            value={form.status ?? ''}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as BookStatus }))}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-sm font-medium text-gray-600">Description</label>
          <textarea
            value={form.description ?? ''}
            onChange={set('description')}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            rows={3}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          {loading ? 'Saving...' : mode === 'add' ? 'Add Book' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/library')}
          className="border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
