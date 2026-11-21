# 10 Care

**Purpose:** keep a launched site healthy with almost no attention, and keep a record whenever anyone touches a client's live systems.

**Runs in:** the client repo. **Skill:** `care`.

## Monthly

1. Check the site is up and serving `main`: `npm run verify:deploy`, and `E2E_BASE_URL=https://<domain> npm run test:e2e` for the read-only tests.
2. Update dependencies in one pull request. Read the release notes for major versions (for Next.js, read the upgrade guide in `node_modules/next/dist/docs/` after installing). The gate must pass.
3. Run `npm run evidence` on `main`. Nothing runs the checks between visits, so this is the only regular proof that the site still builds and passes. A failure here is the first thing to fix.
4. Look at errors and analytics if the client has them. Note anything worth telling the client.
5. Draft a three-line note for Steven: what was done, anything the client should know, anything that needs a decision. Add the `WORKLOG.md` row.

## Maintenance runs

Any session that changes a client's live hosting, DNS, email, database or third-party account writes a record first, from `.factory/templates/maintenance-run.md`, in `docs/maintenance/<date>-<what>.md`: who authorised it, the scope, the state before, the backup and whether a restore from it was tested, each action and its result, how to undo it. This is a live action: it needs Steven's go-ahead every time.

## Monitoring

The starter has no error or uptime monitoring built in. For a tier M or L client, or any site that takes orders, propose Sentry (errors) and an uptime check in the brief's decisions block. Both are paid above small volumes, so they are Steven's call.

## Handing over

If the client takes over their own hosting: transfer the repo and the Vercel project, confirm they hold the domain, rotate any secret Steven's accounts held, and leave `docs/runbook.md` current. The repo is self-contained, so it keeps working without `factory-onboarding`.

*Sources: grandma-cat-jeter `docs/maintenance/README.md` ("A completion message is not a successful restore test"); symptom-tracker-2's nightly job that failed 59 times unnoticed.*
