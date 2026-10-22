# Initech Timesheet

Weekly timesheets for project teams: entries per employee and hours per project.
Front end only (React, Vite, TypeScript). Data is read from `public/data/entries.json`.

## Commands

    npm install
    cp .env.example .env
    npm run dev       # local server
    npm run verify    # lint, type-check, tests; stops at the first failure

## Folder map

- `src/features/<feature>/` — one folder per feature, with its page, logic and tests
- `src/lib/` — shared infrastructure (API client)
- `src/types.ts` — shared domain types
- `public/data/` — sample data, served as `/data/entries.json`
- `docs/business-rules.md` — the business rules; read before touching logic

## Conventions

- Pages are `<Name>Page.tsx` in their feature folder: `src/features/timesheet/TimesheetPage.tsx`
- Logic goes in plain `.ts` files, not components: `src/features/timesheet/hours.ts`
- Tests sit next to the code as `<name>.test.ts`, named "should ...": `src/features/timesheet/hours.test.ts`
- Time stays in `minutes` until display. Dates are `YYYY-MM-DD` strings.
- Named exports only. Exact dependency versions in `package.json`.

## Reuse before you write

- `getJson<T>(path)` — GET with base URL and API key, throws `ApiError`: `src/lib/apiClient.ts`
- `totalHours`, `formatHours`, `groupByEmployee` — hour maths and grouping: `src/features/timesheet/hours.ts`
- `TimeEntry`, `EntryStatus` — domain types: `src/types.ts`

`src/features/reports/ReportsPage.tsx` calls `fetch` directly. That is known debt; do not copy it.

## Before you write code

1. Read `docs/business-rules.md` for anything that touches hours, billing, export or weeks.
2. If a rule is missing or unclear, ask. Do not assume.
3. Reuse the code above before writing new code.
4. Add or update tests for changed logic.
5. Run `npm run verify` before saying you are done, and report the real result.

## Never

- Read or print `.env`. Use `.env.example` for key names.
- Push, or commit to `finished` or `start`.
