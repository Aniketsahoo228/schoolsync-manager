import { API_ENDPOINTS, type ApiResponse } from "@/lib/api.config";
import type { DashboardStats } from "@/lib/api.hooks";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiFetchOptions extends Omit<RequestInit, "body" | "method"> {
  method?: HttpMethod;
  body?: unknown;
  token?: string;
}

export class ApiFetchError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiFetchError";
    this.status = status;
    this.details = details;
  }
}

function isApiResponse<T>(value: unknown): value is ApiResponse<T> {
  return Boolean(value && typeof value === "object" && "status" in value && "data" in value);
}

function getErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") return fallback;
  const body = payload as { detail?: string; message?: string; errors?: unknown };
  if (body.detail) return body.detail;
  if (body.message) return body.message;
  if (body.errors) return JSON.stringify(body.errors);
  return fallback;
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { method = "GET", body, token, headers, ...init } = options;
  const requestHeaders = new Headers(headers);

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(endpoint, {
    ...init,
    method,
    headers: requestHeaders,
    body:
      body === undefined
        ? undefined
        : body instanceof FormData
          ? body
          : JSON.stringify(body),
  });

  if (response.status === 204) {
    return undefined as T;
  }

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new ApiFetchError(
      getErrorMessage(payload, `Request failed with status ${response.status}`),
      response.status,
      payload
    );
  }

  if (isApiResponse<T>(payload)) {
    return payload.data;
  }

  return payload as T;
}

export function getDashboardStats(token?: string): Promise<DashboardStats> {
  return apiFetch<DashboardStats>(API_ENDPOINTS.dashboardStats, { token });
}
