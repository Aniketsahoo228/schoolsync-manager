"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, GraduationCap, BookOpen, Users, Building2,
  DollarSign, CalendarDays, ClipboardList, Calendar, Table,
  Library, Bus, Home, Trophy, ChevronDown, ChevronRight
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: { label: string; href: string }[];
  section?: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={16} />,
    children: [
      { label: "Admin Dashboard", href: "/" },
      { label: "Teacher Dashboard", href: "/dashboard/teacher" },
      { label: "Student Dashboard", href: "/dashboard/student" },
    ],
  },
  {
    label: "Students",
    icon: <GraduationCap size={16} />,
    children: [
      { label: "Student List", href: "/students" },
      { label: "Student View", href: "/students/view" },
      { label: "Add Student", href: "/students/add" },
      { label: "Edit Student", href: "/students/edit" },
    ],
  },
  {
    label: "Teachers",
    icon: <Users size={16} />,
    children: [
      { label: "Teacher List", href: "/teachers" },
      { label: "Teacher View", href: "/teachers/view" },
      { label: "Add Teacher", href: "/teachers/add" },
      { label: "Edit Teacher", href: "/teachers/edit" },
    ],
  },
  {
    label: "Departments",
    icon: <Building2 size={16} />,
    children: [
      { label: "Department List", href: "/departments" },
      { label: "Add Department", href: "/departments/add" },
    ],
  },
  {
    label: "Subjects",
    icon: <BookOpen size={16} />,
    children: [
      { label: "Subject List", href: "/subjects" },
      { label: "Add Subject", href: "/subjects/add" },
    ],
  },
];

const managementItems: NavItem[] = [
  {
    label: "Accounts",
    icon: <DollarSign size={16} />,
    children: [
      { label: "Fees Collection", href: "/accounts/fees-collections" },
      { label: "Expenses", href: "/accounts/expenses" },
      { label: "Salary", href: "/accounts/salary" },
      { label: "Add Fees", href: "/accounts/fees/add" },
      { label: "Add Expenses", href: "/accounts/expenses/add" },
      { label: "Add Salary", href: "/accounts/salary/add" },
    ],
  },
  { label: "Holiday", href: "/holiday", icon: <CalendarDays size={16} /> },
  { label: "Fees", href: "/fees", icon: <DollarSign size={16} /> },
  { label: "Exam List", href: "/exams", icon: <ClipboardList size={16} /> },
  { label: "Events", href: "/events", icon: <Calendar size={16} /> },
  { label: "Time Table", href: "/timetable", icon: <Table size={16} /> },
  { label: "Library", href: "/library", icon: <Library size={16} /> },
];

const otherItems: NavItem[] = [
  { label: "Sports", href: "/sports", icon: <Trophy size={16} /> },
  { label: "Hostel", href: "/hostel", icon: <Home size={16} /> },
  { label: "Transport", href: "/transport", icon: <Bus size={16} /> },
];

function NavGroup({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isChildActive = item.children?.some((c) => c.href === pathname);
  const [open, setOpen] = useState(isChildActive ?? false);

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={`nav-item ${pathname === item.href ? "active" : ""}`}
      >
        {item.icon}
        <span>{item.label}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`nav-item w-full text-left ${isChildActive ? "active" : ""}`}
        style={{ background: isChildActive && !open ? "rgba(124,58,237,0.15)" : undefined }}
      >
        {item.icon}
        <span className="flex-1">{item.label}</span>
        {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
      </button>
      {open && (
        <div className="nav-sub">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`nav-item ${pathname === child.href ? "active" : ""}`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div
          style={{
            width: 36,
            height: 36,
            background: "var(--primary)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
          }}
        >
          🎨
        </div>
        <span>
          Pre<em>skool</em>
        </span>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Main Menu</div>
        {navItems.map((item) => (
          <NavGroup key={item.label} item={item} />
        ))}

        <div className="sidebar-section-title">Management</div>
        {managementItems.map((item) => (
          <NavGroup key={item.label} item={item} />
        ))}

        <div className="sidebar-section-title">Others</div>
        {otherItems.map((item) => (
          <NavGroup key={item.label} item={item} />
        ))}
      </nav>
    </aside>
  );
}
