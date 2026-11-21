# Runbook

For whoever maintains this site next, human or agent.

## At a glance

| | |
|---|---|
| Live address | |
| Hosting | Vercel project `<name>`, team `<team>` |
| DNS | Cloudflare zone `<domain>` |
| Repo | |
| Who owns the accounts | |

## Deploy and roll back

Merging to `main` deploys. `/version.json` shows the commit being served. To roll back, promote the previous production deployment in Vercel, then revert the commit so `main` matches.

## Environment variables

Names are in `.env.example`. Values are in Vercel only.

| Name | What it is for | What happens if it is missing |
|---|---|---|
| | | |

## Outside services

| Service | Used for | Account owner | Notes |
|---|---|---|---|
| | | | |

## Known limits

<What was never verified, and what is deliberately not built.>

## Monthly care

See `.factory/playbook/10-care.md`.
