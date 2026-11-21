# Decisions

Newest first. Who decided, when, in whose words, what changed, and what was deliberately not done. Never rewrite a closed decision: add a new one that supersedes it. Open questions for the client live in `STATUS.md`.

## Open

*None.*

## Closed

### D-003: Round two of the mockups, designed in Claude Design (2026-11-21)
- **Decided by:** Steven, in the project chat: "Those mockups are SUPER BASIC. Can you use claude design to do better?"
- **Decision:** The three directions were redesigned on a Claude Design canvas (https://claude.ai/artifact/6m2cceg1T7k72jSKvTvr5o, private to Steven) and rebuilt here by hand. A became "Letterpress" (was "Kitchen table"); B and C keep their names. Each direction now uses its own pair of Google fonts, self-hosted at build time by `next/font` (`src/lib/fonts.ts`), replacing round one's system-fonts-only rule. Each direction's styles live in its own CSS file beside its page, reading colors only from `tokens.css`.
- **Why not the Vercel import:** the connector's Claude Design import makes its own protected deployment from a Send to link, not a deployment of this project on the review address.
- **Copy:** mockup copy is written inline in each direction page because only the winning direction survives. When the client picks, move its words into `content/`.
- **Not done:** no features, no real form, no real people or photos. Safety items are labeled ideas for the founder to decide.


### D-002: Mockups come before the call and the brief (2026-11-21)
- **Decided by:** Steven, in the project chat: "Can we start with 3 mockups? 3 different styles", then "put them up on rezmatch.spennington.dev and host at vercel".
- **Decision:** This repo, its Vercel project and the review address `https://rezmatch.spennington.dev` exist before Gate 1. Stage 04 (mockups) runs from `docs/design/creative-direction.md`, which rests on what was known that day: the name, that it is a dating product for Native people, and that the founder is Native and is family to Steven.
- **What it does not decide:** scope, features, price, or that the job is taken. No brief exists. Nothing is sent to the client by an agent.
- **Not done:** No feature work. Everything on the mockup pages is a draft or a labeled placeholder.

### D-001: Built on the factory defaults (2026-11-21)
- **Decided by:** The factory template. There was no Gate 1 for this repo yet (see D-002), so this is the default, not an approval.
- **Decision:** Next.js on Vercel, one repo for this client, trunk on `main` with a preview per pull request, Steven merges.
- **Not done:** No exception to the default stack. A product with members will need one (a database, sign-in, storage); record it as its own decision when the brief is approved.
