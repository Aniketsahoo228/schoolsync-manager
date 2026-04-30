interface FeedItem {
  date: string;
  title: string;
  status: 'In Progress' | 'Completed';
}

interface ActivityFeedProps {
  items: FeedItem[];
  title: string;
}

export default function ActivityFeed({ items, title }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm h-full">
      <div className="px-5 py-4 border-b border-gray-100">
        <h5 className="text-sm font-semibold text-gray-700">{title}</h5>
      </div>
      <div className="p-5">
        <ul className="space-y-4">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3">
              {/* Timeline dot */}
              <div className="flex flex-col items-center">
                <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${
                  item.status === 'In Progress' ? 'bg-orange-400' : 'bg-green-400'
                }`} />
                {i < items.length - 1 && (
                  <div className="w-px flex-1 bg-gray-100 mt-1" />
                )}
              </div>
              <div className="pb-4">
                <p className="text-xs text-gray-400">{item.date}</p>
                <p className="text-sm font-medium text-gray-700 mt-0.5">{item.title}</p>
                <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                  item.status === 'In Progress'
                    ? 'bg-orange-100 text-orange-600'
                    : 'bg-green-100 text-green-600'
                }`}>
                  {item.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
