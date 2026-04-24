'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Book, LANGUAGES, BOOK_TYPES, CLASSES } from '@/lib/data/library';

interface BookFormProps {
  initialData?: Partial<Book>;
  mode: 'add' | 'edit';
}

const EMPTY: Partial<Book> = {
  id: '',
  name: '',
  language: 'English',
  department: '',
  class: '',
  type: 'Book',
  status: 'In Stock',
};

export default function BookForm({ initialData, mode }: BookFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Book>>({ ...EMPTY, ...initialData });
  const [loading, setLoading] = useState(false);

  const set = (field: keyof Book) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
            value={form.name ?? ''}
            onChange={set('name')}
            placeholder="e.g. Acoustics"
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          />
        </div>

        {/* Language */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Language</label>
          <select
            value={form.language ?? ''}
            onChange={set('language')}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          >
            <option value="">Select Language</option>
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Department */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Department</label>
          <input
            type="text"
            value={form.department ?? ''}
            onChange={set('department')}
            placeholder="e.g. Science"
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          />
        </div>

        {/* Class */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Class</label>
          <select
            value={form.class ?? ''}
            onChange={set('class')}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          >
            <option value="">Select Class</option>
            {CLASSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Type</label>
          <select
            value={form.type ?? ''}
            onChange={set('type')}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          >
            <option value="">Select Type</option>
            {BOOK_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Status</label>
          <select
            value={form.status ?? ''}
            onChange={set('status')}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          >
            <option value="">Select Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
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
