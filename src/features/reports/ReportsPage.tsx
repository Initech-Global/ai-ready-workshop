import { useEffect, useState } from "react";
import type { TimeEntry } from "../../types";

export function ReportsPage() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL ?? ""}/data/entries.json`, {
      headers: {
        Accept: "application/json",
        "X-Api-Key": import.meta.env.VITE_TIMESHEET_API_KEY ?? "",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then(setEntries)
      .catch((e: unknown) => setError(String(e)));
  }, []);

  if (error) return <p className="error">{error}</p>;

  const byProject = new Map<string, number>();
  for (const e of entries) {
    byProject.set(e.project, (byProject.get(e.project) ?? 0) + e.minutes / 60);
  }

  return (
    <section>
      <h2>Hours by project</h2>
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {[...byProject].map(([project, hours]) => (
            <tr key={project}>
              <td>{project}</td>
              <td>{hours.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
