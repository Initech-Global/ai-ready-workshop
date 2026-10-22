import { describe, expect, it } from "vitest";
import { formatHours, groupByEmployee, totalHours } from "./hours";
import type { TimeEntry } from "../../types";

const entry = (overrides: Partial<TimeEntry>): TimeEntry => ({
  id: "1",
  employee: "Asha Rao",
  date: "2026-10-19",
  project: "Atlas Portal",
  billable: true,
  minutes: 60,
  status: "submitted",
  note: "",
  ...overrides,
});

describe("totalHours", () => {
  it("should add up minutes as hours", () => {
    expect(totalHours([entry({ minutes: 90 }), entry({ minutes: 30 })])).toBe(2);
  });

  it("should return 0 for no entries", () => {
    expect(totalHours([])).toBe(0);
  });
});

describe("formatHours", () => {
  it("should show two decimals", () => {
    expect(formatHours(7.5)).toBe("7.50");
  });
});

describe("groupByEmployee", () => {
  it("should group entries by employee name", () => {
    const groups = groupByEmployee([
      entry({ id: "1", employee: "Asha Rao" }),
      entry({ id: "2", employee: "Ben Ortiz" }),
      entry({ id: "3", employee: "Asha Rao" }),
    ]);
    expect(groups.get("Asha Rao")).toHaveLength(2);
  });
});
