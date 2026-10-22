---
name: pr-ready
description: Get the current branch ready for a pull request. Use when the user says "get this PR ready", "prepare the PR" or similar.
---

# Get this PR ready

1. **Verify.** Run `npm run verify`. If it fails, stop and report the failure. Do not continue.

2. **Review the diff** against the base branch (`git diff start...HEAD` or the branch the user names):
   - New code that duplicates something listed under "Reuse before you write" in `CLAUDE.md`.
   - Changed logic in `src/**/*.ts` with no matching change in a `*.test.ts` file.
   - Changes to hours, billing, export or weeks: check them against `docs/business-rules.md`.
   List each finding with its file and line. Do not fix anything without asking.

3. **Draft the PR description** using `.github/pull_request_template.md`:
   - What changed and why, in plain words.
   - Paste the real `npm run verify` output.
   - AI-assisted: yes, and which parts.
   - Ticket: take it from the branch name if present, otherwise leave the placeholder.

Do not commit, push or open the pull request. Show the description for the user to review.
