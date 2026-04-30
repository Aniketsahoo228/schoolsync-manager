'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddEventPage() {
  const router = useRouter();
  const [form, setForm] = useState({ id: '', name: '', date: '', venue: '', description: '' });
  const [loading, setLoading] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    router.push('/events');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Add Event</h3>
        <nav className="flex items-center gap-2 text-sm mt-1">
          <Link href="/events" className="text-orange-500 hover:underline">Events</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">Add Event</span>
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h5 className="text-sm font-semibold text-gray-700 border-b border-dashed border-orange-300 pb-2 inline-block pr-6">
            Event Information
          </h5>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Event ID">
            <input value={form.id} onChange={set('id')} type="text" placeholder="e.g. EVT001" className={input} required />
          </Field>
          <Field label="Event Name">
            <input value={form.name} onChange={set('name')} type="text" placeholder="e.g. Annual Day" className={input} required />
          </Field>
          <Field label="Event Date">
            <input value={form.date} onChange={set('date')} type="date" className={input} required />
          </Field>
          <Field label="Venue">
            <input value={form.venue} onChange={set('venue')} type="text" placeholder="e.g. Main Hall" className={input} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Description">
              <textarea value={form.description} onChange={set('description')} rows={3} placeholder="Event details..." className={input} />
            </Field>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button type="submit" disabled={loading} className={btn}>
            {loading ? 'Saving...' : 'Add Event'}
          </button>
          <button type="button" onClick={() => router.push('/events')} className={btnOutline}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      {children}
    </div>
  );
}

const input = 'border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent w-full';
const btn = 'bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors';
const btnOutline = 'border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-6 py-2.5 rounded-lg transition-colors';