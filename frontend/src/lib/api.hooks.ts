"use client";

import { useCallback, useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/lib/api.config";
import { apiFetch, getDashboardStats } from "@/lib/api.fetch";

export interface Student {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  gender: "Male" | "Female" | "Other" | string;
  date_of_birth: string;
  class_name: string;
  section: string;
  religion: string;
  joining_date: string;
  mobile_number: string;
  admission_number: string;
  father_name: string;
  image: string | null;
  created_at: string;
}

export interface Teacher {
  id: number;
  teacher_id: string;
  name: string;
  gender: "Male" | "Female" | "Other" | string;
  date_of_birth: string;
  mobile: string;
  joining_date: string;
  qualification: string;
  experience: string;
  username: string;
  email: string;
  address: string;
  image: string | null;
  created_at: string;
}

export interface Department {
  id: number;
  department_id: string;
  name: string;
  head: string;
  start_date: string;
  no_of_students: number;
  created_at: string;
}

export interface Subject {
  id: number;
  subject_id: string;
  name: string;
  class_name: string;
  created_at: string;
}

export interface Fee {
  id: number;
  student_name?: string;
  amount: string;
  due_date: string;
  paid_date: string | null;
  status: "Paid" | "Unpaid" | "Partial" | string;
  created_at: string;
  student: number;
}

export interface FeesCollection {
  id: number;
  student_name?: string;
  fees_type: string;
  amount: string;
  payment_date: string;
  payment_method: "Cash" | "Card" | "Online" | string;
  status: string;
  created_at: string;
  student: number;
}

export interface Expense {
  id: number;
  name: string;
  amount: string;
  date: string;
  category: string;
  notes: string;
  created_at: string;
}

export interface Salary {
  id: number;
  teacher_name?: string;
  amount: string;
  month: string;
  year: number;
  paid_date: string | null;
  status: "Paid" | "Pending" | string;
  created_at: string;
  teacher: number;
}

export interface Book {
  id: number;
  book_id: string;
  name: string;
  language: string;
  department: string;
  class_name: string;
  book_type: string;
  status: "In Stock" | "Out of Stock" | string;
  created_at: string;
}

export interface HostelRoom {
  id: number;
  block: string;
  room_no: string;
  room_type: string;
  no_of_beds: number;
  cost_per_bed: string;
  availability: "Available" | "Full" | string;
  created_at: string;
}

export interface Transport {
  id: number;
  route_name: string;
  vehicle_number: string;
  driver_name: string;
  license_number: string;
  contact_number: string;
  driver_address: string;
  created_at: string;
}

export interface Sport {
  id: number;
  sports_id: string;
  name: string;
  coach_name: string;
  started_year: string;
  created_at: string;
}

export interface Exam {
  id: number;
  name: string;
  class_name: string;
  subject: string;
  fees: string;
  start_time: string;
  end_time: string;
  event_date: string;
  created_at: string;
}

export interface Event {
  id: number;
  event_id: string;
  name: string;
  event_date: string;
  venue: string;
  description: string;
  created_at: string;
}

export interface Holiday {
  id: number;
  holiday_id: string;
  name: string;
  holiday_type: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface Timetable {
  id: number;
  teacher_name?: string;
  class_name: string;
  section: string;
  subject: string;
  day: string;
  date: string | null;
  start_time: string;
  end_time: string;
  created_at: string;
  teacher: number;
}

export interface Message {
  id: number;
  sender_name?: string;
  recipient_name?: string;
  subject: string;
  body: string;
  is_read: boolean;
  created_at: string;
  sender: number;
  recipient: number;
}

export interface DashboardStats {
  students: number;
  teachers: number;
  departments: number;
  subjects: number;
  books: number;
  hostel_rooms: number;
  transports: number;
  sports: number;
  exams: number;
  events: number;
  holidays: number;
  revenue: {
    total_fees: string;
    total_expenses: string;
  };
  hostel: {
    available: number;
    full: number;
  };
  library: {
    in_stock: number;
    out_of_stock: number;
  };
}

interface HookResult<T> {
  data: T;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

function emptyFor<T>(fallback: T): T {
  return fallback;
}

function useApiData<T>(endpoint: string, fallback: T): HookResult<T> {
  const [stableFallback] = useState<T>(fallback);
  const [data, setData] = useState<T>(() => emptyFor(fallback));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      setData(await apiFetch<T>(endpoint));
    } catch (err) {
      setData(stableFallback);
      setError(err instanceof Error ? err.message : "Unable to fetch data");
    } finally {
      setLoading(false);
    }
  }, [endpoint, stableFallback]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void refetch();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [refetch]);

  return { data, loading, error, refetch };
}

export function useStudents(): HookResult<Student[]> {
  return useApiData<Student[]>(API_ENDPOINTS.students, []);
}

export function useTeachers(): HookResult<Teacher[]> {
  return useApiData<Teacher[]>(API_ENDPOINTS.teachers, []);
}

export function useDepartments(): HookResult<Department[]> {
  return useApiData<Department[]>(API_ENDPOINTS.departments, []);
}

export function useSubjects(): HookResult<Subject[]> {
  return useApiData<Subject[]>(API_ENDPOINTS.subjects, []);
}

export function useBooks(): HookResult<Book[]> {
  return useApiData<Book[]>(API_ENDPOINTS.books, []);
}

export function useHostel(): HookResult<HostelRoom[]> {
  return useApiData<HostelRoom[]>(API_ENDPOINTS.hostel, []);
}

export function useTransport(): HookResult<Transport[]> {
  return useApiData<Transport[]>(API_ENDPOINTS.transport, []);
}

export function useSports(): HookResult<Sport[]> {
  return useApiData<Sport[]>(API_ENDPOINTS.sports, []);
}

export function useExams(): HookResult<Exam[]> {
  return useApiData<Exam[]>(API_ENDPOINTS.exams, []);
}

export function useEvents(): HookResult<Event[]> {
  return useApiData<Event[]>(API_ENDPOINTS.events, []);
}

export function useHolidays(): HookResult<Holiday[]> {
  return useApiData<Holiday[]>(API_ENDPOINTS.holiday, []);
}

export function useTimetable(): HookResult<Timetable[]> {
  return useApiData<Timetable[]>(API_ENDPOINTS.timetable, []);
}

const emptyDashboardStats: DashboardStats = {
  students: 0,
  teachers: 0,
  departments: 0,
  subjects: 0,
  books: 0,
  hostel_rooms: 0,
  transports: 0,
  sports: 0,
  exams: 0,
  events: 0,
  holidays: 0,
  revenue: {
    total_fees: "0",
    total_expenses: "0",
  },
  hostel: {
    available: 0,
    full: 0,
  },
  library: {
    in_stock: 0,
    out_of_stock: 0,
  },
};

export function useDashboardStats(): HookResult<DashboardStats> {
  const [data, setData] = useState<DashboardStats>(emptyDashboardStats);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      setData(await getDashboardStats());
    } catch (err) {
      setData(emptyDashboardStats);
      setError(err instanceof Error ? err.message : "Unable to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void refetch();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [refetch]);

  return { data, loading, error, refetch };
}
