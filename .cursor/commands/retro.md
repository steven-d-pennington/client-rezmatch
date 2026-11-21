<!-- Generated from factory-onboarding playbook/skills.json by scripts/build-rules.mjs. Do not edit here. -->

# Retro: record what was learned

1. Read `.factory/playbook/11-retro.md` and follow it step by step. It is the source of truth; this file only points to it.

## Do not skip

- The title is the rule. Evidence is required. Mark the scope `factory` if another client's project could hit it.
- A correction about look, feel or wording is a lesson too: start its title with "Taste:".

## Done when

`LESSONS.md` passes `npm run check:factory`, and at launch the client's row in the factory registry has its dates.

The factory rules in `AGENTS.md` apply throughout: stop only for a gate or the pause list, and say in the handoff what you did not verify.
