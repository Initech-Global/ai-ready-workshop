import { useState } from "react";
import { ReportsPage } from "./features/reports/ReportsPage";
import { TimesheetPage } from "./features/timesheet/TimesheetPage";

type Tab = "timesheet" | "reports";

export function App() {
  const [tab, setTab] = useState<Tab>("timesheet");

  return (
    <main>
      <header>
        <h1>Initech Timesheet</h1>
        <nav>
          <button className={tab === "timesheet" ? "active" : ""} onClick={() => setTab("timesheet")}>
            Timesheet
          </button>
          <button className={tab === "reports" ? "active" : ""} onClick={() => setTab("reports")}>
            Reports
          </button>
        </nav>
      </header>
      {tab === "timesheet" ? <TimesheetPage /> : <ReportsPage />}
    </main>
  );
}
