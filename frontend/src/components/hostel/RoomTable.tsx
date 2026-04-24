'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Room } from '@/lib/data/hostel';

interface RoomTableProps {
  rooms: Room[];
  onDelete?: (id: string) => void;
}

export default function RoomTable({ rooms, onDelete }: RoomTableProps) {
  const [search, setSearch] = useState('');

  const filtered = rooms.filter((r) =>
    [r.block, r.roomNo, r.roomType, r.availability].some((f) =>
      f.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Search bar */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search rooms..."
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
              <th className="px-6 py-3 font-medium">Block</th>
              <th className="px-6 py-3 font-medium">Room No</th>
              <th className="px-6 py-3 font-medium">Room Type</th>
              <th className="px-6 py-3 font-medium">No of Beds</th>
              <th className="px-6 py-3 font-medium">Cost per Bed</th>
              <th className="px-6 py-3 font-medium">Availability</th>
              <th className="px-6 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                  No rooms found.
                </td>
              </tr>
            ) : (
              filtered.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{room.block}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <Link
                      href={`/hostel/${room.id}`}
                      className="hover:text-orange-500 transition-colors"
                    >
                      {room.roomNo}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{room.roomType}</td>
                  <td className="px-6 py-4 text-gray-600">{room.noOfBeds}</td>
                  <td className="px-6 py-4 text-gray-600">{room.costPerBed}</td>
                  <td className="px-6 py-4">
                    <AvailabilityBadge status={room.availability} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/hostel/${room.id}/edit`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => onDelete?.(room.id)}
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

function AvailabilityBadge({ status }: { status: Room['availability'] }) {
  const isAvailable = status === 'Available';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isAvailable
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-600'
      }`}
    >
      {status}
    </span>
  );
}
