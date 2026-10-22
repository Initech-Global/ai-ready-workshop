export type EntryStatus = "draft" | "submitted";

export interface TimeEntry {
  id: string;
  employee: string;
  date: string; // YYYY-MM-DD
  project: string;
  billable: boolean;
  minutes: number;
  status: EntryStatus;
  note: string;
}
