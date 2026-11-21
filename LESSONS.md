# Lessons

Read the active titles before you start: each title is a rule. Add an entry at the end of a pull request when something surprised you, failed twice, or was corrected by Steven or the client. Format, statuses and limits: `.factory/playbook/11-retro.md`. `npm run check:factory` checks this file.

Every entry needs: Status (candidate, active, superseded), Scope (repo, factory), What happened, Root cause, Fix, Evidence, Applies to. Use `Scope: factory` when another client's project could hit the same thing; the weekly harvest picks those up.

## Active

## Candidates

### Never fade text in on load; move it instead (2026-11-21)
- **Status:** candidate
- **Scope:** factory
- **What happened:** Round-two mockups faded the hero copy in, and the axe check failed color contrast on A and B because it ran mid-animation.
- **Root cause:** axe measures text at its current opacity; the tests start right after load, while the fade is still running.
- **Fix:** Entrance motion uses transform only. Opacity animation is for decoration that holds no text.
- **Evidence:** e2e/site.spec.ts accessibility test on /directions/a and /directions/b, branch claude/mockups-round-2.
- **Taste:** Steven's correction on 2026-11-21 ("SUPER BASIC") is why the motion exists at all.
- **Applies to:** Any page with load-in animation.

## Superseded
