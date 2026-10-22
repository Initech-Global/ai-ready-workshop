import type { TimeEntry } from "../../types";

export function totalHours(entries: TimeEntry[]): number {
  const minutes = entries.reduce((sum, e) => sum + e.minutes, 0);
  return minutes / 60;
}

export function formatHours(hours: number): string {
  return hours.toFixed(2);
}

export function groupByEmployee(entries: TimeEntry[]): Map<string, TimeEntry[]> {
  const groups = new Map<string, TimeEntry[]>();
  for (const entry of entries) {
    const list = groups.get(entry.employee) ?? [];
    list.push(entry);
    groups.set(entry.employee, list);
  }
  return groups;
}
