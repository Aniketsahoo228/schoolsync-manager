'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Room, ROOM_TYPES, BLOCKS } from '@/lib/data/hostel';

interface RoomFormProps {
  initialData?: Partial<Room>;
  mode: 'add' | 'edit';
}

const EMPTY: Partial<Room> = {
  block: '',
  roomNo: '',
  roomType: 'Normal',
  noOfBeds: 1,
  costPerBed: '',
  availability: 'Available',
};

export default function RoomForm({ initialData, mode }: RoomFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Room>>({ ...EMPTY, ...initialData });
  const [loading, setLoading] = useState(false);

  const setField = (field: keyof Room) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: wire to real API
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    router.push('/hostel');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      {/* Section heading */}
      <div className="mb-6">
        <h5 className="text-sm font-semibold text-gray-700 border-b border-dashed border-orange-300 pb-2 inline-block pr-6">
          Room Information
        </h5>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Block */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Block</label>
          <select
            value={form.block ?? ''}
            onChange={setField('block')}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          >
            <option value="">Select Block</option>
            {BLOCKS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Room No */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Room No</label>
          <input
            type="text"
            value={form.roomNo ?? ''}
            onChange={setField('roomNo')}
            placeholder="e.g. 101"
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          />
        </div>

        {/* Room Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Room Type</label>
          <select
            value={form.roomType ?? ''}
            onChange={setField('roomType')}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          >
            <option value="">Select Type</option>
            {ROOM_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* No of Beds */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">No of Beds</label>
          <input
            type="number"
            min={1}
            value={form.noOfBeds ?? ''}
            onChange={setField('noOfBeds')}
            placeholder="e.g. 4"
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          />
        </div>

        {/* Cost per Bed */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Cost per Bed</label>
          <input
            type="text"
            value={form.costPerBed ?? ''}
            onChange={setField('costPerBed')}
            placeholder="e.g. $25"
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          />
        </div>

        {/* Availability */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-600">Availability</label>
          <select
            value={form.availability ?? ''}
            onChange={setField('availability')}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            required
          >
            <option value="">Select Availability</option>
            <option value="Available">Available</option>
            <option value="Full">Full</option>
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
          {loading ? 'Saving...' : mode === 'add' ? 'Add Room' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/hostel')}
          className="border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
