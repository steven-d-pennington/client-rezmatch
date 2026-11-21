# 06 Build

**Purpose:** work through the feature list, one verified feature per pull request, without Steven in the loop except to merge.

**Runs in:** the client repo. **Skill:** `build-feature`.

## The loop, per feature

1. Take the first feature in `docs/features.json` with `"status": "todo"` whose dependencies are done. Set it to `building`.
2. For tier M and L, or anything you cannot hold in your head, write a task spec first from `.factory/templates/task-spec.md`. A task spec must be implementable from the file alone.
3. Branch: `<tool>/<feature-id>-<topic>`. One feature, one branch, one pull request.
4. Write the browser test in `e2e/` first and watch it fail. Then build the feature until it passes. Add each new page to `siteRoutes` in `e2e/routes.ts` so it gets the layout, tap target and accessibility checks.
5. Outside services (email, payments, forms, AI) are mocked in tests with `page.route`, so the tests need no secrets and send nothing. A feature that needs a secret stays switched off, with a sensible fallback, until Steven has added the value in Vercel. Say so under "Before merging".
6. Look at the result at 390 and 1440 wide and compare it with the chosen direction. Fix what a careful person would notice.
7. Set the feature to `passing` and name its test in `"e2e"` (the factory check refuses a passing feature with no test). Commit, then run `npm run evidence`: it runs the gate and the browser tests on the commit and prints the block the pull request needs.
8. Update `STATUS.md`, add a `WORKLOG.md` row, add a lesson if something surprised you. Open the pull request with the template and the evidence block, then get the independent review (stage 07).

## Rules for the build

- Features may be marked `passing`, `blocked` (with `blockedBy`) or `cut` (with Steven's agreement). Do not rewrite a feature's acceptance checks to fit what you built.
- New ideas go to the backlog in `STATUS.md`. They do not enter the current feature.
- Database changes ship as their own pull request, ahead of the feature that needs them. Migrations are additive and come with a written rollback.
- Paid API calls need a written budget from Steven first (for example "at most 20 calls, at most $2"), and a note of what was spent.
- Several small, independent features can go to parallel cloud agents (Cursor is good at this), each on its own branch and pull request. Mega pull requests choke reviewers: keep each one to a single feature.

## Tier L: the sprint package

Use `.factory/templates/sprint-package/` when the work is weeks long. Its startup interview asks Steven every decision once. Its `PROGRESS.md` is append-only and must be enough for a fresh agent to resume. Pause only for the list in `MASTER.md`.

## Stop

For the pause list in `AGENTS.md`. A failing check you caused is something to repair, not a reason to stop.

*Sources: nugget-miner `AGENTS.md` and its sprint package; polymarket-bullpen-lab-v2's task specs ("one task = one agent = one branch = one PR"); symptom-tracker-2's failing-first checkpoints; the-first-fifteen's backlog rule.*
