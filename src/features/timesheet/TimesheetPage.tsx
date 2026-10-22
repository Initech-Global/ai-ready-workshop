import { useEffect, useState } from "react";
import { getJson } from "../../lib/apiClient";
import type { TimeEntry } from "../../types";
import { formatHours, groupByEmployee, totalHours } from "./hours";

export function TimesheetPage() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getJson<TimeEntry[]>("/data/entries.json")
      .then(setEntries)
      .catch((e: unknown) => setError(String(e)));
  }, []);

  if (error) return <p className="error">{error}</p>;

  return (
    <section>
      <h2>This week</h2>
      {[...groupByEmployee(entries)].map(([employee, rows]) => (
        <div key={employee} className="card">
          <h3>
            {employee} <span className="muted">{formatHours(totalHours(rows))} h</span>
          </h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Project</th>
                <th>Hours</th>
                <th>Status</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.date}</td>
                  <td>{row.project}</td>
                  <td>{formatHours(row.minutes / 60)}</td>
                  <td>{row.status}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
}
