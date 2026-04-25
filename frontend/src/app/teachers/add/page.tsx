import Link from 'next/link';
import RoomForm from '@/components/hostel/RoomForm';

export default function AddRoomPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Add Rooms</h3>
        <nav className="flex items-center gap-2 text-sm mt-1">
          <Link href="/hostel" className="text-orange-500 hover:underline">Hostel</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">Add Rooms</span>
        </nav>
      </div>

      <RoomForm mode="add" />
    </div>
  );
}
