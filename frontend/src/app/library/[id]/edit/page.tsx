import Link from 'next/link';
import { mockBooks } from '@/lib/data/library';
import BookForm from '@/components/library/BookForm';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default function EditBookPage({ params }: Props) {
  const book = mockBooks.find((b) => b.id === params.id);
  if (!book) notFound();

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Edit Books</h3>
        <nav className="flex items-center gap-2 text-sm mt-1">
          <Link href="/library" className="text-orange-500 hover:underline">Library</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">Edit Books</span>
        </nav>
      </div>

      <BookForm mode="edit" initialData={book} />
    </div>
  );
}
