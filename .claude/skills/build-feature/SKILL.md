---
name: build-feature
description: "Build the next feature from docs/features.json as one verified pull request. Use when Steven says build, continue, next feature, or names a feature id."
---

<!-- Generated from factory-onboarding playbook/skills.json by scripts/build-rules.mjs. Do not edit here. -->

# Build the next feature

1. Read `.factory/playbook/06-build.md` and follow it step by step. It is the source of truth; this file only points to it.
2. Also read `.factory/playbook/07-verify.md`.

## Do not skip

- Write the browser test first and watch it fail.
- One feature, one branch, one pull request.
- Do not rewrite a feature's acceptance checks to fit what you built.
- Run `npm run evidence` on the committed work and paste its output into the pull request. Nothing runs the checks for you.

## Done when

The feature is `passing` in `docs/features.json` with its test named, the pull request says what was and was not verified, and `STATUS.md` is updated.

The factory rules in `AGENTS.md` apply throughout: stop only for a gate or the pause list, and say in the handoff what you did not verify.
