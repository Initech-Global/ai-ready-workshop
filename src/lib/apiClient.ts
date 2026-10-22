const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const API_KEY = import.meta.env.VITE_TIMESHEET_API_KEY ?? "";

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Accept: "application/json", "X-Api-Key": API_KEY },
  });
  if (!res.ok) {
    throw new ApiError(res.status, `Request failed: ${res.status} ${path}`);
  }
  return (await res.json()) as T;
}
