# Tool map

Each job has one owner. Where two tools could do the same thing, this says which one wins, so Steven does not pay twice and agents do not have to choose.

| Tool | Owns | Do not use it for |
|---|---|---|
| **Claude Code** (terminal, desktop, cloud sessions, projects) | Planning, coordinating, building, reviewing. Runs every playbook stage. Its skills live in `.claude/skills/`. | Steven's own pixel-level polish, which is quicker in an editor |
| **Cursor** (editor and cloud agents) | Steven's hands-on design and taste passes. Parallel fan-out: several small features at once, each on its own branch and pull request. Reads `AGENTS.md`, `.cursor/rules/` and `.cursor/commands/`. | Being a second source of rules. Bugbot review, which overlaps the independent review in stage 07. |
| **GitHub** | Source of truth: repos, pull requests, the audit trail. | Running checks: they run in agent sessions, so no Actions minutes are spent (D-013). Client-facing feedback: clients never need a GitHub account. |
| **Vercel** | Hosting for every client app: a preview per pull request, the public review address, production, rollback. | Buying domains or holding DNS |
| **Cloudflare** | DNS for client domains, email routing, R2 for client media, Turnstile on public forms, hosting for a plain static site that needs no previews | Hosting Next.js apps |
| **boat.dev** | A full, persistent VM when a job needs Docker, a local database, a desktop browser or many hours. Snapshot a configured machine once and fork it per job. | Routine pull request work: Claude and Cursor cloud sessions already give each task a machine |
| **Runpod** | GPU work when a client feature needs it: self-hosted models, image generation, bulk transcription | Anything in the default pipeline |
| **Wispr Flow** | Recording and notes for client calls. Stage 01 reads them through the connector. | Storing the brief, which lives in the repo |

## Choosing where an agent runs

Three of these give an agent a remote machine. Default to a Claude Code cloud session. Use a Cursor cloud agent when Steven is already in Cursor or when fanning out small tasks. Use boat.dev only when the job needs a machine that persists.

Whatever runs the work, it must be runnable in the cloud: no homelab paths, no PowerShell-only scripts, no step that needs Steven's Mac unless the brief says so (native mobile builds are the known exception).

## Worth adding when a client needs it

Not installed by default. Each is a money decision, so it goes in the brief's decisions block.

| Need | Suggested | Replaces |
|---|---|---|
| Contact or order forms that send email | Resend | Hand-configured SMTP, Formsubmit pointing at a personal inbox |
| A database, accounts, file storage | Supabase | Choosing a database per client |
| Error reports | Sentry | Hearing about bugs from the client |
| Booking the first call, collecting intake answers | Cal.com and a short form | Email back-and-forth before the call |
| Dependency updates | Renovate or Dependabot | Remembering to update by hand |

## Not verified here

Prices and plan limits for these services were not checked when this was written. boat.dev's regions were listed as EU only, so check latency before using it for a demo a US client will open.
