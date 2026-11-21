# 08 Launch

**Purpose:** move from the review address to the client's real domain, with evidence, and with a way back. This is **Gate 3**.

**Runs in:** the client repo. **Skill:** `launch`.

## Steps

1. Copy `.factory/templates/launch-checklist.md` to `docs/launch-checklist.md` and add the launch checks from the brief. Work through it. Tick an item only when you have done it and can point to the evidence. Items only Steven can do stay unticked with his name on them.
2. Remove what was only for review: delete `src/app/directions/`, `src/app/review/` if no question is open, and their content files and tests. No `Placeholder` and no `[bracketed]` text may remain.
3. Run `npm run check:launch`. It fails while a placeholder, a bracketed draft string, an unticked checklist item or an empty `deploy.production` remains.
4. Open the launch pull request. It does three things: sets `"launched": true` and `deploy.production` in `factory.json`, removes the review pages, and carries the checklist. Its "Before merging" section lists Steven's steps: the domain on the Vercel project, DNS records in Cloudflare, production environment variables, any third-party accounts.
5. **Gate 3.** Steven and the client look at the pull request's preview and sign off. Record the sign-off in `DECISIONS.md` in their words with the date.
6. Steven merges. Then, without being asked:
   - run `npm run verify:deploy` and wait for it to confirm the real domain serves the merged commit (nothing checks this automatically);
   - run the browser tests against the live site: `E2E_BASE_URL=https://<domain> npm run test:e2e`;
   - check, signed out, that `/robots.txt` allows crawling, the pages no longer carry `noindex`, `/review` returns 404, the bare domain and `www` both resolve, and old URLs redirect if there was an old site;
   - send one real test through every form, if Steven has authorised it, and confirm it arrived. Otherwise list it as not verified.
7. Tag the commit `v1.0.0` only after those checks pass.
8. Write `docs/client-guide.md` and `docs/runbook.md` from the templates. Update the registry (`dates.launched`, `domain`, stage `care`) and `STATUS.md`.

## Rollback

If the live checks fail, tell Steven at once with the evidence. Rolling back is one action in Vercel (promote the previous production deployment) and is his call unless he pre-authorised it.

## Moving a client off an old host

Touching a client's existing hosting, DNS or WordPress is a maintenance run: follow `.factory/templates/maintenance-run.md` and take a backup you have actually restored from before changing anything. A completion message is not a successful restore test.

*Sources: symptom-tracker-2's release flow (`/version.json`, tag only after the production gate); nugget-miner's production smoke checklist; grandma-cat-jeter's maintenance records and its production-only exclusions; polymarket's "merged is not deployed".*
