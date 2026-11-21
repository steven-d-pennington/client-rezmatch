# Launch checklist

Tick an item only when it is done and you can point to the evidence. Items for Steven stay unticked with his name on them until he confirms. `npm run check:launch` fails while any box is open.

## Content

- [ ] No placeholder images and no `[bracketed]` draft text remain.
- [ ] The client approved the final words, in writing, on <date>.
- [ ] Every photo and graphic has permission to publish recorded in `docs/design/creative-direction.md`.
- [ ] Contact details, prices, hours and legal names were checked against what the client sent.

## Pages and behavior

- [ ] Every feature in `docs/features.json` is `passing` or `cut`.
- [ ] Every page is listed in `e2e/routes.ts` and the browser tests pass.
- [ ] Looked at every page at 390 and 1440 wide. Screenshots are in the launch pull request.
- [ ] Every form was tested end to end with outside services mocked. Real delivery: verified on <date>, or listed as not verified.
- [ ] The 404 page works and old URLs redirect (if there was an old site).

## Search and sharing

- [ ] Page titles and descriptions are written for each page.
- [ ] A share image and favicon are in place.
- [ ] `sitemap.xml` exists if there is more than one page.
- [ ] `factory.json` has `"launched": true`, so `noindex` is lifted and `/review` is gone.

## Domain and accounts (Steven)

- [ ] Steven: the domain is added to the Vercel project.
- [ ] Steven: DNS records are set in Cloudflare, for the bare domain and `www`.
- [ ] Steven: production environment variables are set in Vercel. Their names are in `.env.example`.
- [ ] Steven: email sending records (SPF, DKIM) are set, if the site sends email.
- [ ] `factory.json` has the real address in `deploy.production`.

## Safety

- [ ] No secrets in the repo. `.env.example` lists names only.
- [ ] Public forms have spam protection (Turnstile) if they send email.
- [ ] Analytics and error reporting are set up as the brief decided, or the brief says none.

## Sign-off

- [ ] Steven approved the launch preview on <date>.
- [ ] The client approved the launch preview on <date>, in these words: "<quote>".

## After the merge

- [ ] `verify-deploy` confirms the real domain serves the merged commit.
- [ ] Browser tests pass against the live address.
- [ ] Checked signed out: `/robots.txt` allows crawling, `/review` returns 404, bare domain and `www` both work.
- [ ] Tagged `v1.0.0`.
- [ ] `docs/client-guide.md` and `docs/runbook.md` are written.
