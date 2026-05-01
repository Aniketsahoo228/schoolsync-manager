"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  useDashboardStats,
  useEvents,
  useStudents,
  type Event,
  type Student,
} from "@/lib/api.hooks";

interface StatCard {
  label: string;
  value: string;
  color: string;
  icon: React.ReactNode;
}

interface MonthlyStudentData {
  month: string;
  Students: number;
}

interface ClassGenderData {
  className: string;
  Boys: number;
  Girls: number;
}

interface ActivityItem {
  date: string;
  text: string;
  event: string;
  link: string;
}

interface SocialStat {
  platform: string;
  count: string;
  sub: string;
  color: string;
}

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

function formatCurrency(value: string | number | undefined): string {
  const amount = Number(value ?? 0);
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number.isFinite(amount) ? amount : 0)}`;
}

function formatDate(value: string | null | undefined): string {
  if (!value) return "No date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}

function fullName(student: Student): string {
  return [student.first_name, student.last_name].filter(Boolean).join(" ") || student.student_id;
}

function buildMonthlyStudentData(students: Student[]): MonthlyStudentData[] {
  const months = monthLabels.map((month) => ({ month, Students: 0 }));

  students.forEach((student) => {
    const date = new Date(student.joining_date);
    if (!Number.isNaN(date.getTime())) {
      months[date.getMonth()].Students += 1;
    }
  });

  return months;
}

function buildClassGenderData(students: Student[]): ClassGenderData[] {
  const grouped = new Map<string, ClassGenderData>();

  students.forEach((student) => {
    const className = student.class_name || "Unknown";
    const current = grouped.get(className) ?? { className, Boys: 0, Girls: 0 };

    if (student.gender.toLowerCase() === "female") {
      current.Girls += 1;
    } else {
      current.Boys += 1;
    }

    grouped.set(className, current);
  });

  return Array.from(grouped.values()).sort((a, b) => a.className.localeCompare(b.className));
}

function buildActivityFeed(events: Event[]): ActivityItem[] {
  return events
    .slice()
    .sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime())
    .slice(0, 5)
    .map((event) => ({
      date: formatDate(event.event_date),
      text: event.name,
      event: event.venue ? "scheduled at" : "scheduled",
      link: event.venue || "School",
    }));
}

function getStatIcon(path: string): React.ReactNode {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={path} />
    </svg>
  );
}

export default function DashboardPage(): React.ReactElement {
  const dashboard = useDashboardStats();
  const students = useStudents();
  const events = useEvents();

  const isLoading = dashboard.loading || students.loading || events.loading;
  const error = dashboard.error || students.error || events.error;

  const statCards = useMemo<StatCard[]>(
    () => [
      {
        label: "Students",
        value: formatNumber(dashboard.data.students),
        color: "from-violet-500 to-violet-400",
        icon: getStatIcon("M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"),
      },
      {
        label: "Teachers",
        value: formatNumber(dashboard.data.teachers),
        color: "from-orange-500 to-orange-400",
        icon: getStatIcon("M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m0-4a4 4 0 100-8 4 4 0 000 8zm8 0a4 4 0 100-8 4 4 0 000 8z"),
      },
      {
        label: "Departments",
        value: formatNumber(dashboard.data.departments),
        color: "from-green-500 to-green-400",
        icon: getStatIcon("M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1"),
      },
      {
        label: "Revenue",
        value: formatCurrency(dashboard.data.revenue.total_fees),
        color: "from-blue-500 to-blue-400",
        icon: getStatIcon("M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2"),
      },
    ],
    [dashboard.data]
  );

  const revenueData = useMemo<MonthlyStudentData[]>(
    () => buildMonthlyStudentData(students.data),
    [students.data]
  );

  const studentData = useMemo<ClassGenderData[]>(
    () => buildClassGenderData(students.data),
    [students.data]
  );

  const starStudents = useMemo<Student[]>(
    () => students.data.slice().sort((a, b) => b.id - a.id).slice(0, 5),
    [students.data]
  );

  const activityFeed = useMemo<ActivityItem[]>(
    () => buildActivityFeed(events.data),
    [events.data]
  );

  const socialStats = useMemo<SocialStat[]>(
    () => [
      { platform: "Books", count: formatNumber(dashboard.data.books), sub: "Library items", color: "bg-blue-600" },
      { platform: "Sports", count: formatNumber(dashboard.data.sports), sub: "Programs", color: "bg-sky-400" },
      { platform: "Events", count: formatNumber(dashboard.data.events), sub: "Events", color: "bg-pink-500" },
      { platform: "Exams", count: formatNumber(dashboard.data.exams), sub: "Exams", color: "bg-blue-700" },
    ],
    [dashboard.data]
  );

  if (isLoading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-orange-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-100 text-red-700 rounded-lg p-4 text-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Welcome Admin!</h3>
        <nav className="flex items-center gap-2 text-sm mt-1">
          <span className="text-gray-500">Dashboard</span>
        </nav>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFBC53" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FFBC53" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                <Area type="monotone" dataKey="Students" stroke="#FFBC53" strokeWidth={2} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

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
              <BarChart data={studentData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="className" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                <Bar dataKey="Boys" stackId="a" fill="#fdbb38" radius={[0, 0, 0, 0]} maxBarSize={28} />
                <Bar dataKey="Girls" stackId="a" fill="#19affb" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <th className="px-5 py-3 text-center font-medium">Class</th>
                  <th className="px-5 py-3 text-center font-medium">Gender</th>
                  <th className="px-5 py-3 text-right font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {starStudents.length > 0 ? (
                  starStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-gray-500 font-mono text-xs">{student.student_id}</td>
                      <td className="px-5 py-3 font-medium text-gray-800">{fullName(student)}</td>
                      <td className="px-5 py-3 text-center text-gray-600">{student.class_name || "-"}</td>
                      <td className="px-5 py-3 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          {student.gender || "-"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right text-gray-500">{formatDate(student.joining_date)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-5 py-6 text-center text-gray-400" colSpan={5}>
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h5 className="text-sm font-semibold text-gray-700">Student Activity</h5>
          </div>
          <div className="p-5">
            {activityFeed.length > 0 ? (
              <ul className="space-y-4">
                {activityFeed.map((item, index) => (
                  <li key={`${item.text}-${item.date}`} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                      {index < activityFeed.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-1" />}
                    </div>
                    <div className="pb-4 flex-1">
                      <span className="text-xs text-gray-400 block mb-1">{item.date}</span>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-800">{item.text}</span>{" "}
                        {item.event}{" "}
                        <span className="text-orange-500 font-medium">&quot;{item.link}&quot;</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No activity found.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {socialStats.map((stat) => (
          <div key={stat.platform} className={`${stat.color} rounded-xl p-5 text-white text-center shadow-sm`}>
            <p className="text-2xl font-bold">{stat.count}</p>
            <p className="text-white/80 text-sm mt-1">{stat.sub}</p>
            <p className="text-white/60 text-xs mt-0.5">{stat.platform}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 pt-2">
        Copyright © 2024 PreSkool. All rights reserved.
      </p>
    </div>
  );
}
