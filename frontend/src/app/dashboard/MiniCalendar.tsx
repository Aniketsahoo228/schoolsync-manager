'use client';

import { useState } from 'react';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

interface CalendarEvent {
  time: string;
  label: string;
  color: 'blue' | 'violet' | 'red' | 'orange';
}

interface MiniCalendarProps {
  events?: CalendarEvent[];
}

const COLOR_MAP = {
  blue:   'border-l-4 border-blue-400   bg-blue-50   text-blue-700',
  violet: 'border-l-4 border-purple-400 bg-purple-50 text-purple-700',
  red:    'border-l-4 border-red-400    bg-red-50    text-red-700',
  orange: 'border-l-4 border-orange-400 bg-orange-50 text-orange-700',
};

export default function MiniCalendar({ events = [] }: MiniCalendarProps) {
  const today = new Date();
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year  = current.getFullYear();
  const month = current.getMonth();
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prev = () => setCurrent(new Date(year, month - 1, 1));
  const next = () => setCurrent(new Date(year, month + 1, 1));

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prev} className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-gray-700">{MONTHS[month]} {year}</span>
        <button onClick={next} className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
          return (
            <div
              key={i}
              className={`text-center text-xs py-1 rounded cursor-pointer transition-colors ${
                day === null
                  ? ''
                  : isToday
                  ? 'bg-orange-500 text-white font-bold'
                  : 'text-gray-600 hover:bg-orange-50'
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Events */}
      {events.length > 0 && (
        <div className="mt-4 space-y-2">
          {events.map((ev, i) => (
            <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${COLOR_MAP[ev.color]}`}>
              <span className="font-medium">{ev.label}</span>
              <span className="opacity-70">{ev.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
