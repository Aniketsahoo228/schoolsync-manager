'use client';

import { useState } from 'react';
import Link from 'next/link';
import RoomTable from '@/components/hostel/RoomTable';
import { mockRooms } from '@/lib/data/hostel';

export default function HostelPage() {
  const [rooms, setRooms] = useState(mockRooms);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this room?')) {
      setRooms((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const available = rooms.filter((r) => r.availability === 'Available').length;
  const full      = rooms.filter((r) => r.availability === 'Full').length;
  const totalBeds = rooms.reduce((sum, r) => sum + r.noOfBeds, 0);

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Hostel</h3>
          <nav className="flex items-center gap-2 text-sm mt-1">
            <Link href="/" className="text-orange-500 hover:underline">Dashboard</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">Hostel</span>
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
            href="/hostel/add"
            className="flex items-center justify-center w-9 h-9 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            title="Add Room"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Total Rooms"
          value={rooms.length}
          sub={`${totalBeds} beds total`}
          color="orange"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          }
        />
        <StatCard
          label="Available"
          value={available}
          sub="rooms open"
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Full"
          value={full}
          sub="rooms occupied"
          color="red"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Table */}
      <RoomTable rooms={rooms} onDelete={handleDelete} />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  sub: string;
  color: 'orange' | 'green' | 'red';
  icon: React.ReactNode;
}

function StatCard({ label, value, sub, color, icon }: StatCardProps) {
  const styles = {
    orange: { card: 'border-orange-100', icon: 'bg-orange-100 text-orange-500', text: 'text-orange-600' },
    green:  { card: 'border-green-100',  icon: 'bg-green-100  text-green-600',  text: 'text-green-600'  },
    red:    { card: 'border-red-100',    icon: 'bg-red-100    text-red-500',    text: 'text-red-500'    },
  };
  const s = styles[color];

  return (
    <div className={`bg-white border ${s.card} rounded-lg p-4 flex items-center gap-4`}>
      <div className={`${s.icon} rounded-xl p-3 flex-shrink-0`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`text-2xl font-bold ${s.text}`}>{value}</p>
        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}
