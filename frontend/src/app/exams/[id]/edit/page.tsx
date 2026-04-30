'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';

const CLASSES = ['LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12'];
const SUBJECTS = ['Mathematics','Science','English','History','Geography','Computer Science','Physics','Chemistry','Biology'];

const mockExam = {
  name: 'Class Test', class: '10', subject: 'Mathematics',
  date: '2024-09-15', startTime: '09:00', endTime: '11:00',
  totalMarks: '100', passingMarks: '35',
};

export default function EditExamPage({ params }: { params: Promise<{ id: string }> }) {
  use(params);
  const router = useRouter();
  const [form, setForm] = useState(mockExam);
  const [loading, setLoading] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    router.push('/exams');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Edit Exam</h3>
        <nav className="flex items-center gap-2 text-sm mt-1">
          <Link href="/exams" className="text-orange-500 hover:underline">Exam</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">Edit Exam</span>
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h5 className="text-sm font-semibold text-gray-700 border-b border-dashed border-orange-300 pb-2 inline-block pr-6">
            Exam Information
          </h5>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Exam Name">
            <input value={form.name} onChange={set('name')} type="text" className={input} required />
          </Field>
          <Field label="Class">
            <select value={form.class} onChange={set('class')} className={input} required>
              <option value="">Select Class</option>
              {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Subject">
            <select value={form.subject} onChange={set('subject')} className={input}>
              <option value="">Select Subject</option>
              {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Exam Date">
            <input value={form.date} onChange={set('date')} type="date" className={input} required />
          </Field>
          <Field label="Start Time">
            <input value={form.startTime} onChange={set('startTime')} type="time" className={input} />
          </Field>
          <Field label="End Time">
            <input value={form.endTime} onChange={set('endTime')} type="time" className={input} />
          </Field>
          <Field label="Total Marks">
            <input value={form.totalMarks} onChange={set('totalMarks')} type="number" className={input} />
          </Field>
          <Field label="Passing Marks">
            <input value={form.passingMarks} onChange={set('passingMarks')} type="number" className={input} />
          </Field>
        </div>

        <div className="mt-8 flex gap-3">
          <button type="submit" disabled={loading} className={btn}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => router.push('/exams')} className={btnOutline}>
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
