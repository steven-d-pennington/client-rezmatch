# 07 Verify

**Purpose:** make "done" mean the same thing every time, and make a pull request safe to merge from a phone.

**Runs in:** the client repo, on every pull request. **Skill:** `build-feature`.

## The gate

| Check | Command | Proves | Does not prove |
|---|---|---|---|
| Factory contract | `npm run check:factory` | Required files, feature list, lessons format, env names, managed files untouched, no workflow that starts on its own | That the content is right |
| Types and lint | `npm run typecheck`, `npm run lint` | The code is consistent | Behavior |
| Unit and policy tests | `npm test` | Logic, and taste rules written as tests (tokens only, banned wording) | Layout |
| Build | `npm run build` | It compiles for production | That it works |
| Browser tests | `npm run test:e2e` | Each feature works in a real browser against a production build, at phone and desktop sizes, with no sideways scroll, big enough tap targets and no serious accessibility faults | A real phone, real email or payments |

`npm run check` runs the first four. To run the browser tests against a deployed site instead: `E2E_BASE_URL=<url> npm run test:e2e`.

## Who runs it

Agents do. GitHub Actions is not used (decision D-013: no Actions minutes), so a pull request has no automatic status and a missing check looks the same as a passing one. Two things replace it:

1. **The builder's evidence.** Commit, run `npm run evidence`, and paste the block it prints under "Gate evidence" in the pull request. It runs the gate and the browser tests on the committed work, refuses to run with uncommitted changes, and names the commit. A later commit voids it.
2. **The reviewer's own run.** The reviewer checks out the head commit and runs `npm run evidence` again before reading the diff. A pull request is ready for Steven only when both blocks name the head commit and both passed.

The workflows in `.github/workflows/` still exist and start by hand from the Actions tab, if Steven ever wants a run on GitHub's machines.

## Beyond the gate

- **Look at it.** Rendering is not design verification. Open the page at 390 and 1440 wide, or take screenshots, and judge it against the direction. Put the screenshots in the pull request.
- **Independent review.** Before asking Steven to merge anything larger than a copy change, get a review from the reviewer named in `factory.json` under `review.reviewer`:

  | Value | Who reviews |
  |---|---|
  | `claude-session` (default) | A second Claude session on a different model from the one that wrote the code. The coordinator starts it. |
  | `cursor` | A Cursor cloud agent, or Bugbot if Steven has it switched on |
  | `github-action` | The Claude Code Action on the pull request. It needs a paid API key and Actions minutes, so Steven sets it up. |
  | `steven` | Steven reads the diff himself. The builder's evidence is then the only run of the gate. |

  To switch a project, change that one value in a pull request and note why in `DECISIONS.md`. Whoever reviews gets the diff, the feature's acceptance checks, `LESSONS.md` and the rules block, runs the gate on the head commit, and posts a verdict on the pull request in this shape:
  ```
  Review of <head commit sha>: CLEAN | BLOCKING
  Reviewer: <tool and model>. Builder: <tool and model>.
  Gate: <the reviewer's own "Gate evidence" block, or "not run" and why>
  Blocking: <file>:<line> <issue> <why it matters>   (one line each, or "none")
  Non-blocking: <file> <note>                         (or "none")
  Checked: everything the description claims is in the diff; no file is cited that the diff does not touch; the target branch is main.
  ```
  A verdict for an older commit is void. A missing review is not a clean review. After three fix rounds without a clean verdict, stop and tell Steven.
- **Flaky test?** Find the cause. No retries added, no timeouts raised, no assertion loosened. Prove the fix by repeating the test (`npx playwright test <file> --repeat-each 10`).
- **Say what you did not check.** The pull request's "Not run" and "Not verified" sections are required. Typical entries: a physical phone, real inbox delivery, the live domain, a paid service.

## Taste rules become tests

When Steven or the client corrects wording, color or layout, add it to the repo as a test where you can: a banned phrase in `content/copy-rules.json`, a token in `src/styles/tokens.css`, an assertion in `e2e/`. A rule that is only written down gets forgotten.

*Sources: nugget-miner CI and its policy tests; symptom-tracker-2's contract tests on CI and "only a test that fails without its fix is a guarantee"; dev-pipeline's review validator; violytic-native's "Check, Result, Limits" table and "Not verified" section.*
