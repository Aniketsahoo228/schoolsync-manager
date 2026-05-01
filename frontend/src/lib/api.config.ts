export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export const API_ENDPOINTS = {
  students: `${BASE_URL}/students/`,
  teachers: `${BASE_URL}/teachers/`,
  departments: `${BASE_URL}/departments/`,
  subjects: `${BASE_URL}/subjects/`,
  fees: `${BASE_URL}/fees/`,
  feesCollections: `${BASE_URL}/fees-collections/`,
  expenses: `${BASE_URL}/expenses/`,
  salary: `${BASE_URL}/salary/`,
  books: `${BASE_URL}/books/`,
  hostel: `${BASE_URL}/hostel/`,
  transport: `${BASE_URL}/transport/`,
  sports: `${BASE_URL}/sports/`,
  exams: `${BASE_URL}/exams/`,
  events: `${BASE_URL}/events/`,
  holiday: `${BASE_URL}/holiday/`,
  timetable: `${BASE_URL}/timetable/`,
  messages: `${BASE_URL}/messages/`,
  dashboardStats: `${BASE_URL}/dashboard/stats/`,
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];

export interface ApiResponse<T> {
  status: "success" | "error";
  count?: number;
  data: T;
  message?: string;
  errors?: unknown;
}
