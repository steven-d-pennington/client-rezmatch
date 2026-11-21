# Status

The one place that says where this project stands. Update the handoff block at the end of every session. A new agent with no chat history must be able to carry on from this file alone.

## Handoff

- **Stage:** 04 Mockups (see `.factory/playbook/README.md`)
- **Current state:** Round two of the mockups (D-003: A Letterpress, B After dark, C Big sky, redesigned in Claude Design) is on `claude/mockups-round-2`, waiting for Steven's merge. Round one is live on the review address. No brief, no call yet.
- **Last successful command:** `npm run evidence` on `claude/mockups-round-2`
- **Next safe action:** After Steven merges, confirm `https://rezmatch.spennington.dev/version.json` shows the merged commit (through the Vercel connector's deployment fetch if the session's proxy blocks the domain). Then draft the message for Steven to send with the review link.
- **Blockers:** None

## Addresses

| What | Address |
|---|---|
| Review (public, not indexed) | https://rezmatch.spennington.dev (Vercel project `client-rezmatch`; serves production once `main` has a production deployment) |
| Production | *not launched* |

## Waiting on the client

| Question | Options | Our recommendation so far | Asked on |
|---|---|---|---|
| | | | |

## Waiting on Steven

| What | Why | Since |
|---|---|---|
| | | |

## Backlog

Ideas that are not in the brief. They stay here until Steven prices them as a change order.

## History

Newest first. One or two lines per session: what changed, the pull request, what was verified. When this passes about 150 lines, move the oldest entries word for word to `docs/status-archive/<first-date>_<last-date>.md` and leave a pointer.

- 2026-11-21: Round two of the mockups (D-003), designed on a Claude Design canvas and rebuilt by hand with self-hosted fonts and motion, on `claude/mockups-round-2`.
- 2026-11-21: Three mockup directions and the review page (stage 04), on `claude/mockups`. Vercel project `client-rezmatch` created and linked; `rezmatch.spennington.dev` added and verified on it.
- 2026-11-21: Repo created from factory template.
