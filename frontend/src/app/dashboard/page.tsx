'use client';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';

/* ─── Data ─── */
const revenueData = [
  { month: 'Jan', Teachers: 45, Students: 24 },
  { month: 'Feb', Teachers: 60, Students: 48 },
  { month: 'Mar', Teachers: 75, Students: 56 },
  { month: 'Apr', Teachers: 51, Students: 32 },
  { month: 'May', Teachers: 42, Students: 34 },
  { month: 'Jun', Teachers: 42, Students: 52 },
  { month: 'Jul', Teachers: 30, Students: 25 },
];

const studentData = [
  { year: '2009', Boys: 420, Girls: 336 },
  { year: '2010', Boys: 532, Girls: 612 },
  { year: '2011', Boys: 516, Girls: 344 },
  { year: '2012', Boys: 575, Girls: 647 },
  { year: '2013', Boys: 519, Girls: 345 },
  { year: '2014', Boys: 517, Girls: 563 },
  { year: '2015', Boys: 454, Girls: 256 },
  { year: '2016', Boys: 392, Girls: 344 },
  { year: '2017', Boys: 262, Girls: 323 },
  { year: '2018', Boys: 383, Girls: 300 },
  { year: '2019', Boys: 446, Girls: 455 },
  { year: '2020', Boys: 551, Girls: 456 },
];

const starStudents = [
  { id: 'PRE2209', name: 'John Smith',      marks: 1185, percent: '98%',   year: 2019 },
  { id: 'PRE1245', name: 'Jolie Hoskins',   marks: 1195, percent: '99.5%', year: 2018 },
  { id: 'PRE1625', name: 'Pennington Joy',  marks: 1196, percent: '99.6%', year: 2017 },
  { id: 'PRE2516', name: 'Millie Marsden',  marks: 1187, percent: '98.2%', year: 2016 },
  { id: 'PRE2209', name: 'John Smith',      marks: 1185, percent: '98%',   year: 2015 },
];

const activityFeed = [
  { date: 'Apr 13', text: 'John Doe',     event: 'won 1st place in',          link: 'Chess'       },
  { date: 'Mar 21', text: 'Justin Lee',   event: 'participated in',            link: 'Carrom'      },
  { date: 'Feb 2',  text: 'Justin Lee',   event: 'attended international conference in', link: 'St.John School' },
  { date: 'Apr 13', text: 'John Doe',     event: 'won 1st place in',          link: 'Chess'       },
  { date: 'Mar 21', text: 'Justin Lee',   event: 'participated in',            link: 'Carrom'      },
];

const socialStats = [
  { platform: 'Facebook',  count: '50,095', sub: 'Likes',   color: 'bg-blue-600',   icon: 'f' },
  { platform: 'Twitter',   count: '48,596', sub: 'Follows', color: 'bg-sky-400',    icon: 't' },
  { platform: 'Instagram', count: '52,085', sub: 'Follows', color: 'bg-pink-500',   icon: 'in' },
  { platform: 'LinkedIn',  count: '69,050', sub: 'Follows', color: 'bg-blue-700',   icon: 'li' },
];

const statCards = [
  {
    label: 'Students', value: '50,055',
    color: 'from-violet-500 to-violet-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    label: 'Awards', value: '50+',
    color: 'from-orange-500 to-orange-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    label: 'Departments', value: '30+',
    color: 'from-green-500 to-green-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    label: 'Revenue', value: '$505',
    color: 'from-blue-500 to-blue-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21l-7-4-7 4V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">

      {/* Page Header */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Welcome Admin!</h3>
        <nav className="flex items-center gap-2 text-sm mt-1">
          <span className="text-gray-500">Dashboard</span>
        </nav>
      </div>

      {/* ── Section 1: Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className={`bg-gradient-to-br ${card.color} rounded-xl p-5 text-white shadow-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">{card.label}</p>
                <p className="text-3xl font-bold mt-1">{card.value}</p>
              </div>
              <div className="opacity-80">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Section 2: Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Chart 1 — Revenue Area Chart */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h5 className="text-sm font-semibold text-gray-700">Revenue</h5>
            <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option>Today</option>
              <option>Last Week</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTeachers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}   />
                  </linearGradient>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#FFBC53" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FFBC53" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                <Area
                  type="monotone" dataKey="Teachers"
                  stroke="#7c3aed" strokeWidth={2}
                  fill="url(#colorTeachers)"
                />
                <Area
                  type="monotone" dataKey="Students"
                  stroke="#FFBC53" strokeWidth={2}
                  fill="url(#colorStudents)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 — Number of Students Stacked Bar */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h5 className="text-sm font-semibold text-gray-700">Number of Students</h5>
            <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option>Today</option>
              <option>Last Week</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={studentData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} stackOffset="sign">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                <Bar dataKey="Boys"  stackId="a" fill="#fdbb38" radius={[0, 0, 0, 0]} maxBarSize={28} />
                <Bar dataKey="Girls" stackId="a" fill="#19affb" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Section 3: Star Students + Activity Feed ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Star Students Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h5 className="text-sm font-semibold text-gray-700">Star Students</h5>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
                  <th className="px-5 py-3 text-left font-medium">ID</th>
                  <th className="px-5 py-3 text-left font-medium">Name</th>
                  <th className="px-5 py-3 text-center font-medium">Marks</th>
                  <th className="px-5 py-3 text-center font-medium">Percentage</th>
                  <th className="px-5 py-3 text-right font-medium">Year</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {starStudents.map((s, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-gray-500 font-mono text-xs">{s.id}</td>
                    <td className="px-5 py-3 font-medium text-gray-800">{s.name}</td>
                    <td className="px-5 py-3 text-center text-gray-600">{s.marks}</td>
                    <td className="px-5 py-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {s.percent}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-gray-500">{s.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Activity Feed */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h5 className="text-sm font-semibold text-gray-700">Student Activity</h5>
          </div>
          <div className="p-5">
            <ul className="space-y-4">
              {activityFeed.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                    {i < activityFeed.length - 1 && (
                      <div className="w-px flex-1 bg-gray-100 mt-1" />
                    )}
                  </div>
                  <div className="pb-4 flex-1">
                    <span className="text-xs text-gray-400 block mb-1">{item.date}</span>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-800">{item.text}</span>
                      {' '}{item.event}{' '}
                      <span className="text-orange-500 font-medium">&quot;{item.link}&quot;</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Section 4: Social Stats ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {socialStats.map((s) => (
          <div key={s.platform} className={`${s.color} rounded-xl p-5 text-white text-center shadow-sm`}>
            <p className="text-2xl font-bold">{s.count}</p>
            <p className="text-white/80 text-sm mt-1">{s.sub}</p>
            <p className="text-white/60 text-xs mt-0.5">{s.platform}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400 pt-2">
        Copyright © 2024 PreSkool. All rights reserved.
      </p>
    </div>
  );
}
