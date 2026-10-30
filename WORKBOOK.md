# AI-Ready Repo Workbook

Standard prompts that set up a repository for AI-assisted development with Claude Code.
They work on any repo: practise on this one, then run them on your own.

## Before you start

- Node 20 or later, git, and Claude Code installed and logged in
- Clone the practice repo on the `start` branch, make your own branch, and switch off pushing
  from your copy (replace `your-name`):

      git clone -b start https://github.com/Initech-Global/ai-ready-workshop.git
      cd ai-ready-workshop
      git switch -c workshop/your-name origin/start
      git remote set-url --push origin no-push
      npm install
      claude

- **Already cloned it?** Run just these two lines inside your `ai-ready-workshop` folder, whichever
  branch you are on. Your branch starts from `start` (`finished` is the answer key, so don't work on it):

      git switch -c workshop/your-name origin/start
      git remote set-url --push origin no-push

- Everything you do stays on your machine. Commit to your own branch as often as you like;
  nothing goes back to GitHub. (`git push` will fail on purpose.)

- Run each prompt in a fresh session, or type `/clear` between steps.
- Read what Claude changed before you move on. You are the reviewer.
- Claude asks before writing in `.claude/`. That's expected: read it, then approve.

## The checklist

| # | Item | Fixes |
|---|------|-------|
| 1 | One command proves a change works (lint, type-check, test) | "It says done, but nothing was checked" |
| 2 | Secrets out, guardrails in (`.gitignore`, `.env.example`, `.claude/settings.json`) | "It read or committed something it shouldn't" |
| 3 | Business rules written down, gaps answered by a person | "It guesses the business logic" |
| 4 | A short `CLAUDE.md` that points to the details | "It assumes instead of asking"; context full before you start |
| 5 | A reuse map | "It copies code instead of reusing it" |
| 6 | A team skill and a PR template | "Same task, done differently every time" |

---

## Step 0: The "before" test (5 min)

Make a throwaway branch and ask for a real feature, before changing anything.

    git switch -c before-test

**Prompt**

```
Add a CSV export of this week's timesheet that we can send to the client.
```

Note what it did. Keep it for comparison, then go back to your branch:

    git add -A
    git commit -m "before test"
    git switch workshop/your-name

**Look for:** did it ask any questions? Did it reuse `src/lib/apiClient.ts` or copy the fetch code again?
Did it export draft or non-billable time? How did it round hours? Did it run the tests?

---

## Step 1: Score the repo (3 min)

**Prompt**

```
Audit this repository for AI-readiness. Do not change any files.

Check each item and report a table: Item | Pass / Partial / Fail | Evidence (file path) | Smallest fix.

1. One command runs lint, type-check and tests, and it passes.
2. No secrets in tracked files; .env files are gitignored; a .env.example exists.
3. .claude/settings.json is committed, denies reading secrets and pushing, and allows the verify command.
4. CLAUDE.md exists, is under 100 lines, and points to docs instead of copying them.
5. Shared code (API clients, helpers, components) is listed so new code reuses it.
6. Business rules are written down in the repo.
7. At least one team skill exists in .claude/skills.
8. A pull request template asks for test evidence.

End with a score out of 8.
```

Write your score down. You will score again at the end.

---

## Step 2: One command to verify (5 min)

**Prompt**

```
Set up a single command that proves a change works.

Find how this repo lints, type-checks and runs tests. Add a "verify" command, using the
tool this repo already uses (package.json scripts, Makefile, Gradle, etc.), that runs
lint, then type-check, then tests, and stops at the first failure.

Do not add new tools or dependencies. If one of the three is missing, tell me and stop.
Run verify and show me the result. If tests fail, report them; do not fix them.
Update the README if its run instructions are wrong.
```

**Check:** `npm run verify` passes on your machine.

---

## Step 3: Secrets out, guardrails in (5 min)

**Prompt**

```
Make this repo safe for an AI agent to work in.

1. List every tracked file that may hold secrets, credentials or real customer data.
   Show the path and key names only. Never print the values.
2. Update .gitignore to cover .env files (but not .env.example), CLAUDE.local.md and
   .claude/settings.local.json.
3. Create .env.example with the same keys. Use values that keep the app running locally;
   use an obvious placeholder for real secrets.
4. Create .claude/settings.json that:
   - denies reading .env files and any secrets folders
   - denies git push
   - allows the verify command without asking
5. Do not delete files. Tell me which files I need to remove from git
   (git rm --cached) and which secrets to rotate.
```

**Check:** run `git rm --cached .env` yourself, then ask Claude to read `.env`. It should be refused.

> A rule in a prompt is a request. A deny rule in settings is enforced.

---

## Step 4: Business rules, asked not assumed (10 min)

**Prompt**

```
Find the business rules in this code: calculations, statuses, validations, limits,
rounding and date logic.

Write docs/business-rules.md with one numbered rule per line and where it lives in the code.

Then list what you could not find or had to guess, as questions for me.
Do not invent rules. Ask me the questions one at a time and write my answers into the file.
```

**For the workshop:** answer as the product owner, using this card.

| Question | Product owner's answer |
|---|---|
| Rounding | Each entry is rounded **up** to the next 15 minutes for billing and export |
| What goes to the client | Only **billable** entries |
| Drafts | Only **submitted** entries are exported; drafts never are |
| Overtime | More than 40 rounded hours per employee in a week (Monday to Sunday). Shown in reports, not billed differently |
| Export format | CSV, one row per entry: date (YYYY-MM-DD), employee, project, hours (2 decimals), note. File name `timesheet-<week start>.csv` |

On your own repo, the product owner or lead answers these. Anything nobody can answer is a
finding in itself.

---

## Step 5: A short CLAUDE.md (7 min)

`CLAUDE.md` is loaded at the start of every session. Keep it short and point to the details.

**Prompt**

```
Create CLAUDE.md for this repo. It is loaded at the start of every session, so keep it
under 100 lines.

Include:
- What the app does, in two lines.
- Exact commands to install, run and verify.
- A folder map: one line per important folder.
- Conventions we actually follow, each with one example file path.
- A "Before you write code" section:
  - Read docs/business-rules.md before changing anything that touches business logic.
  - If a rule is missing or unclear, ask me. Do not assume.
  - Reuse shared code listed below before writing new code.
  - Run the verify command before saying you are done.

Point to other docs by path. Do not copy their content.
Only write what you can confirm from this repo. Leave out anything from my personal setup.
Mark anything unsure with TODO.
```

Already have one, or used `/init`? Use this instead:

```
Cut CLAUDE.md to under 100 lines. Remove anything you could work out by reading the code
in a few seconds. Keep commands, conventions, the things that went wrong before, and
pointers to docs. Show me what you removed.
```

Personal preferences (your editor, your shortcuts) go in `CLAUDE.local.md`, which is not committed.

---

## Step 6: A reuse map (5 min)

**Prompt**

```
Find the shared code in this repo that new code is meant to use: API clients, helpers,
hooks, components, utilities.

Add a "Reuse before you write" section to CLAUDE.md, one line each: what it does and its path.

Then list places where code was copied instead of using a shared helper, with file paths.
Do not fix them. I will raise tickets.
```

---

## Step 7: A team skill and a PR template (7 min)

A skill is a written-down way of doing a task, so everyone (and the AI) does it the same way.

**Prompt**

```
Create a pull request template at .github/pull_request_template.md if one does not exist:
what changed, why, how it was tested (paste the verify output), AI-assisted yes/no, ticket link.

Then create a skill at .claude/skills/pr-ready/SKILL.md. When I say "get this PR ready", it:
1. Runs the verify command and stops if it fails.
2. Reviews the diff for copied code that should reuse shared code, and for changed logic
   without tests.
3. Drafts the PR description using the template.

Keep the skill under 40 lines. Use the skill format with name and description in the front matter.
```

**Check:** make a small change, then type `get this PR ready`.

---

## Step 8: The "after" test (5 min)

Commit your setup on your branch, then run the same prompt as Step 0 on a new branch:

    git add -A
    git commit -m "ai-ready setup"
    git switch -c after-test

```
Add a CSV export of this week's timesheet that we can send to the client.
```

**Compare with Step 0:** questions asked, `apiClient` reused, only billable and submitted entries,
rounding to 15 minutes, verify run at the end. To see the "before" code again: `git show before-test --stat`.
Then run the Step 1 audit again and compare scores.

---

## Monorepos

Keep one short root `CLAUDE.md` for what is shared. Add a `CLAUDE.md` in each package or
service; Claude loads it only when working in that folder.

```
This is a monorepo. Keep the root CLAUDE.md for what all packages share.
Create a CLAUDE.md in each package or service folder with what it does, its own commands,
its own conventions and its shared code. Under 50 lines each. Do not repeat the root file.
```

## Keeping it working

- When the AI makes the same mistake twice, add one line to `CLAUDE.md`.
- Review `CLAUDE.md` once a month. Delete what is no longer true.
- New rule from the business? It goes in `docs/business-rules.md`, not in someone's head.
- Run the Step 1 audit on every repo your team owns. Share the scores.
