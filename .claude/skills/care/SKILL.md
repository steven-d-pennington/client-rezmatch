---
name: care
description: "Run the monthly maintenance pass on a launched site and write the short note for Steven. Use on the monthly schedule, or when Steven asks for a health check on a live client site."
---

<!-- Generated from factory-onboarding playbook/skills.json by scripts/build-rules.mjs. Do not edit here. -->

# Care: monthly maintenance

1. Read `.factory/playbook/10-care.md` and follow it step by step. It is the source of truth; this file only points to it.

## Do not skip

- Dependency updates go through the same gate as features: a pull request with passing checks.
- Never fix a client's content or hosting directly. Report it.

## Done when

A maintenance record from `.factory/templates/maintenance-run.md` and a note of anything that needs Steven or the client.

The factory rules in `AGENTS.md` apply throughout: stop only for a gate or the pause list, and say in the handoff what you did not verify.
