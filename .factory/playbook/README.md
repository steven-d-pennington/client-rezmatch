# The client lifecycle

One referral, twelve short stages, three gates. Each stage has one file here. A stage names the files it reads and the files it must leave behind, so any agent can pick up where the last one stopped.

Stages 00 to 03 run in `factory-onboarding`, because the client repo does not exist yet. Stages 04 to 11 run in the client repo, which carries its own copy of these files under `.factory/playbook/`.

| # | Stage | Reads | Leaves behind | Steven |
|---|---|---|---|---|
| 00 | Intake | The referral, in Steven's words | `clients/<slug>/intake.md`, a registry row, an interview guide | Decides whether to take the call |
| 01 | Discovery | The recorded call (Wispr Flow) | `clients/<slug>/meetings/<date>.md`, research notes | Runs the call |
| 02 | Brief and quote | Meeting notes, research | `clients/<slug>/brief.md`, `estimate.md`, `quote.md` | **Gate 1:** approves, sets the price, sends the quote |
| 03 | New repo | The approved brief | `client-<slug>` repo, Vercel project, a public review URL | Creates the empty repo, connects Vercel |
| 04 | [Mockups](04-mockups.md) | Brief, creative direction, taste guide | Three different directions as real pages | Merges what he is happy to show |
| 05 | [Client review](05-client-review.md) | The review page | The client's picks, logged in `DECISIONS.md` | Sends the link. **Gate 2:** confirms the direction |
| 06 | [Build](06-build.md) | `docs/features.json` | One pull request per feature | Merges pull requests |
| 07 | [Verify](07-verify.md) | A pull request | Evidence in the pull request, an independent review | Nothing, unless a check is wrong |
| 08 | [Launch](08-launch.md) | `docs/launch-checklist.md` | The live site, verified | **Gate 3:** signs off with the client |
| 09 | [Change loop](09-change-loop.md) | The client's list of edits | A pull request that mirrors the list | Forwards the list, merges |
| 10 | [Care](10-care.md) | The live site | Monthly updates, maintenance records | Reads a short monthly note |
| 11 | [Retro and lessons](11-retro.md) | `LESSONS.md`, `WORKLOG.md` | Lessons promoted to the factory, four numbers | Reviews one factory pull request |

Supporting pages: [taste guide](taste-guide.md), [tool map](tools.md), quoting, working in existing repos, [app builder graduation](builder-graduation.md).

## Size the process to the job

Pick a tier in the brief. It sets how much process the build uses, and nothing else.

| Tier | What it is | Planning format | Typical length |
|---|---|---|---|
| **S** | A site: landing page, brochure site, waitlist, simple shop window | `docs/features.json`, one pull request per feature | Days |
| **M** | An app: accounts, data, payments, an admin area | Feature list plus a task spec (`.factory/templates/task-spec.md`) for anything non-trivial | Weeks |
| **L** | A product: several weeks, several areas, long agent runs | A sprint package (`.factory/templates/sprint-package/`) per sprint | Months |

Most referrals are tier S. Do not use tier L machinery on a tier S job: the Codex era of `violytic-native` produced 671 documents and never reached a phone, and the simple rewrite shipped in three days.

## How Steven's time is protected

- **Questions come once.** At Gate 1 the brief carries a "Decisions asked once" block: every choice the build will need, each with a recommended default. "Use the defaults" is a complete answer.
- **Stops are listed.** Agents pause only for the gates and the short list in `AGENTS.md`. Anything else they decide and record.
- **Timeboxes.** Research before the brief is capped (two hours by default). Grandma Cat's project ran 22 research waves and built an AI editor before the client had chosen a platform.
- **One file tells the story.** `STATUS.md` in each repo says where things stand and what is waiting on whom.

## The four numbers

`registry/clients.json` records the date of each gate. After each client, the retro reports: days from the first call to the first mockup, revision rounds, days from the first call to launch, and how many times Steven had to step in outside the gates. Those show whether the factory is getting faster.
