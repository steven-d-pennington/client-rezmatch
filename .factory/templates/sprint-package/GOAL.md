# <Package name>: goal

## Objective

<What will be true when this is finished, in terms a user would recognise.>

## Out of scope

<What this package will not do.>

## Startup interview

Before creating the branch, put all of these to Steven together, each with its default. Record the answers in `DECISIONS.md`. If he says **use all recommended defaults**, record the defaults and proceed. Do not ask later about anything resolved here.

| # | Decision | Recommended default |
|---|---|---|
| 1 | May sub-agents be used, and on which models? | Yes, for read-only and independently verifiable work |
| 2 | How is the work published? | One draft pull request per sprint; never merged by the agent |
| 3 | Is any paid API use authorised? | No. If needed, ask with a ceiling in dollars and calls |
| 4 | Which real devices are available for manual checks? | None assumed; device checks are listed as open |
| 5 | If a manual check cannot be done, may the sprint finish as CONDITIONAL? | Yes |
| 6 | <package-specific product decisions> | |

## Launch

- Start: "Run `docs/sprints/<name>/GOAL.md` from the top."
- Resume: "Resume `docs/sprints/<name>/GOAL.md` from `PROGRESS.md` and `DECISIONS.md`. Revalidate the last completed task first."
- Verify only: "Run every command in `VERIFICATION.md` and report. Change nothing."
