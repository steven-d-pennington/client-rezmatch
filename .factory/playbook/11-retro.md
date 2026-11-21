# 11 Retro and lessons

**Purpose:** make each job improve the next one, without lesson files that grow until nobody reads them.

**Runs in:** every repo, at the end of every pull request, and in `factory-onboarding` weekly. **Skills:** `retro`, `harvest-lessons`.

## Capture: at the end of every pull request

Ask three questions. Did anything surprise you? Did anything fail twice? Did Steven or the client correct you? If yes to any, add one entry to `LESSONS.md` in the same pull request:

```markdown
### Verify the public link while signed out (2026-11-18)
- **Status:** active
- **Scope:** factory
- **What happened:** The review link redirected the client to a Vercel login.
- **Root cause:** Preview addresses are protected by default; only the production address is public.
- **Fix:** Send the production review address, and check it with a signed-out request first.
- **Evidence:** e2e/site.spec.ts and the signed-out check in stage 05.
- **Applies to:** Any link sent to a client.
```

- **The title is the rule**, as an instruction, so the list of titles reads as a checklist.
- **Status:** `candidate` (seen once, not yet confirmed), `active`, or `superseded` (say by what; never delete).
- **Scope:** `repo` if it only makes sense here, `factory` if another client's project could hit it.
- **Evidence** is required: a test, a pull request, or "Steven's correction, <date>". No evidence, no lesson.
- A correction from Steven about look, feel or wording is a lesson too. Start its title with "Taste:". These feed `playbook/taste-guide.md`.
- Update an existing lesson instead of adding a near-duplicate. Never paste transcripts or client data.

## Keep it short

`npm run check:factory` fails on a malformed entry and on more than 30 active lessons. Before that point: merge duplicates, turn a lesson into a check and mark it superseded ("now enforced by <test>"), or move old entries word for word to `docs/lessons-archive/<first-date>_<last-date>.md` with a pointer line. A lesson that became a check has done its job.

## Harvest: weekly, in factory-onboarding

```bash
node scripts/harvest-lessons.mjs ../client-a ../client-b ../nugget-miner
```

It reads each repo's `LESSONS.md`, picks active lessons with factory scope that the library does not have yet, and writes a report. Then open **one** pull request against `factory-onboarding` that, for each lesson, does the strongest thing available:

1. a check in the client template (best);
2. a step in a playbook stage or a line in a template;
3. a line in `playbook/taste-guide.md` for taste lessons;
4. an entry in `lessons/LESSONS.md` (when nothing above fits);
5. a rule in `rules/core.md` (rarely: the rules block is read in every session).

Bump `VERSION` if the change should reach client repos, and say so in the pull request. Steven reviews one pull request a week instead of reading notes.

## Retro: at launch and at handover

Fill in the client's row in `registry/clients.json` and report the four numbers: days from first call to first mockup, revision rounds, days from first call to launch, and the number of times Steven had to step in outside the three gates. For each unplanned interruption, say what would have prevented it and put that in the harvest.

*Sources: dev-pipeline's four-field lesson and its "required, read by coders, fed to reviewers" protocol; the-first-fifteen's candidate, active, superseded statuses; violytic-native's evidence line; polymarket's verbatim archive rotation; the blueprint's weekly harvest and "prefer checks to prose".*
