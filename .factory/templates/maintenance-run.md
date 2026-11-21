# Maintenance run: <what>, <YYYY-MM-DD>

One file per session that changes a client's live hosting, DNS, email, database or third-party account. Write the first four sections before touching anything.

## Authorisation

<Who approved this, when, and in what words. A link or a quote.>

## Scope

<What will change. What must be preserved. What is explicitly not touched.>

## State before

<What is there now: versions, DNS records, settings, with timestamps. Observations, not assumptions.>

## Backup

| What | Where it is | Taken at | Restore tested? |
|---|---|---|---|
| | | | |

A completion message is not a successful restore test. If a restore was not tested, say so here.

## Actions

| # | Action | State | Result |
|---|---|---|---|
| 1 | | attempted, running, completed, verified, failed or blocked | |

## Verification

<How you know it worked, checked from outside, signed out.>

## Rollback

<How to undo it, step by step.>

## Lessons

<Anything for `LESSONS.md`.>
