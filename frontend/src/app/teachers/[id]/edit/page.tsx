import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockRooms } from '@/lib/data/hostel';
import RoomForm from '@/components/hostel/RoomForm';

interface Props {
  params: { id: string };
}

export default function EditRoomPage({ params }: Props) {
  const room = mockRooms.find((r) => r.id === params.id);
  if (!room) notFound();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Edit Rooms</h3>
        <nav className="flex items-center gap-2 text-sm mt-1">
          <Link href="/hostel" className="text-orange-500 hover:underline">Hostel</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">Edit Rooms</span>
        </nav>
      </div>

      <RoomForm mode="edit" initialData={room} />
    </div>
  );
}
