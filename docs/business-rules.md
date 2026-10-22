# Business rules

One rule per line. When code and this file disagree, this file wins: raise it, don't guess.
Rules marked **Not in code yet** are agreed with the product owner but not implemented.

## Time entries

1. Time is recorded as whole `minutes` per entry. Dates are `YYYY-MM-DD`. — `src/types.ts`
2. An entry is `draft` or `submitted`, and `billable` or not. — `src/types.ts`
3. Screens show recorded time, unrounded, to 2 decimals. — `src/features/timesheet/hours.ts` (`totalHours`, `formatHours`)

## Billing and export

4. Each entry is rounded **up** to the next 15 minutes: `ceil(minutes / 15) * 15`, per entry, before any summing. Applies to billing, export and overtime, not to screens. **Not in code yet.**
5. Only entries that are **billable and submitted** go to the client. Drafts and non-billable entries never do. **Not in code yet.**
6. Client export is CSV with a header row, one row per entry: `date,employee,project,hours,note`. Hours have 2 decimals. Standard CSV quoting for commas, quotes and line breaks. **Not in code yet.**
7. Export file name is `timesheet-<week start>.csv`, where week start is the Monday as `YYYY-MM-DD`. **Not in code yet.**

## Weeks and overtime

8. A week runs Monday to Sunday. **Not in code yet.**
9. Overtime: more than 40 rounded hours of submitted time per employee in a week, billable or not. Shown in reports; not billed differently. **Not in code yet.**

## Open questions

- Which timezone decides the day of an entry?
- Limits: maximum minutes per entry or per day? Future dates allowed?
- Employees are identified by name today. Is there an employee id?
