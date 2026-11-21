# <Package name>: master

## Read first, in this order

1. `AGENTS.md` (the factory rules) and the active lessons in `LESSONS.md`
2. `GOAL.md`, then `DECISIONS.md`
3. `REQUIREMENTS.md` and `ACCEPTANCE.md`
4. The latest entries in `PROGRESS.md`
5. The task you are about to do

If these disagree, stop and resolve it in this order: the brief, this file, acceptance, the task. Trust the code over the documents: inspect before assuming something is still broken.

## Session start

Run `git status && git branch --show-current && git log --oneline -3`. On resume, re-run the last completed task's verification before moving on.

## Branch and publication

One branch and one pull request per sprint: `<tool>/<package>-s<NN>`. Steven merges between sprints. Never merge on your own.

## The loop, per task

1. **Baseline:** note the commit and that the gate is green.
2. **Test:** write the test for the task.
3. **Prove failure:** run it and record the expected failure.
4. **Implement.**
5. **Verify:** run the task's commands from `VERIFICATION.md`.
6. **Self-review:** re-read the whole diff as a hostile reviewer, against the requirement IDs and the lessons.
7. **Repair** what you find.
8. **Commit**, scoped to the task.
9. **Log** in `PROGRESS.md`.

Never stop because code was written or a first test run passed.

## Repair or pause

**Repair and carry on:** failures your change caused, a regression you can pin down, a broken fixture, a narrow blocking defect (record it first).

**Pause and report:** an unanswered startup decision; a conflict between requirements; missing credentials or spending authority; a destructive or live operation; a change outside the package's scope; the same outside problem three times in a row.

A pause report states: the task, the evidence, the blocker, the safe options with a recommendation, the state of the repo, and how to resume.

## Delegation

Delegate only work that is read-only or can be verified independently. Never delegate schema changes, migrations or deletions. Verify every delegated result yourself.

## Done

A sprint is `COMPLETE` when every acceptance row has evidence, or `CONDITIONAL` when the automated proof passed and a named manual check (for example a real phone) is still open. Say which.
