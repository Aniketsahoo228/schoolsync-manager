import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockRooms } from '@/lib/data/hostel';

interface Props {
  params: { id: string };
}

export default function RoomDetailPage({ params }: Props) {
  const room = mockRooms.find((r) => r.id === params.id);
  if (!room) notFound();

  const isAvailable = room.availability === 'Available';

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Room Details</h3>
          <nav className="flex items-center gap-2 text-sm mt-1">
            <Link href="/hostel" className="text-orange-500 hover:underline">Hostel</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">Room {room.roomNo}</span>
          </nav>
        </div>
        <Link
          href={`/hostel/${room.id}/edit`}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Room
        </Link>
      </div>

      {/* Detail Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Header strip */}
        <div className="flex items-start gap-5 mb-6 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {room.block} — Room {room.roomNo}
            </h2>
            <p className="text-gray-400 text-sm mt-1">{room.roomType} Room</p>
            <span
              className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
              }`}
            >
              {room.availability}
            </span>
          </div>
        </div>

        {/* Detail grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DetailItem label="Block"        value={room.block}                    />
          <DetailItem label="Room No"      value={room.roomNo}                   />
          <DetailItem label="Room Type"    value={room.roomType}                 />
          <DetailItem label="No of Beds"   value={String(room.noOfBeds)}         />
          <DetailItem label="Cost per Bed" value={room.costPerBed}               />
          <DetailItem label="Availability" value={room.availability}             />
        </div>

        {/* Bed capacity visual */}
        <div className="mt-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
            Bed Capacity
          </p>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: room.noOfBeds }).map((_, i) => (
              <div
                key={i}
                className={`w-10 h-6 rounded flex items-center justify-center text-xs font-medium ${
                  isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link href="/hostel" className="text-sm text-orange-500 hover:underline flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Hostel
        </Link>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-gray-700 mt-1">{value}</p>
    </div>
  );
}
