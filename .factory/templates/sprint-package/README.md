# Sprint package

For tier L work: a multi-week feature set run by an agent over many sessions. Copy this folder to `docs/sprints/<name>-<YYYY-MM-DD>/` and fill it in. Do not use it for small jobs: for a brochure site it is about a thousand lines of planning with nothing to plan.

| File | Role |
|---|---|
| `MASTER.md` | How the run works: what to read, the loop, when to repair and when to pause |
| `GOAL.md` | The objective, and the startup interview that asks Steven every decision once |
| `REQUIREMENTS.md` | Every requirement with a stable ID |
| `DECISIONS.md` | Decisions for this package, including the interview answers |
| `PROGRESS.md` | Status board and an append-only log. A fresh agent resumes from this alone. |
| `ACCEPTANCE.md` | One row per requirement: how it is proven |
| `VERIFICATION.md` | The exact commands, expected results, and what each does not prove |
| `tasks/<id>.md` | One task per file, from `../task-spec.md` |

For a package with several sprints, repeat `ACCEPTANCE.md`, `VERIFICATION.md` and `tasks/` in a folder per sprint.
