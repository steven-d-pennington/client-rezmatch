<!-- Generated from factory-onboarding playbook/skills.json by scripts/build-rules.mjs. Do not edit here. -->

# Launch (Gate 3)

1. Read `.factory/playbook/08-launch.md` and follow it step by step. It is the source of truth; this file only points to it.

## Do not skip

- DNS, domains and anything on the client's existing hosting are Steven's steps. Ask for them in one message.
- `npm run check:launch` must pass: no placeholders, no bracketed draft copy, every checklist item ticked with evidence.
- Merged is not deployed. Confirm `/version.json` on the real domain shows the merged commit.

## Done when

The real domain serves the merged commit, search engines are allowed in, the pre-launch pages return 404, and the registry row has the launch date.

The factory rules in `AGENTS.md` apply throughout: stop only for a gate or the pause list, and say in the handoff what you did not verify.
