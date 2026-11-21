# RezMatch

The website for RezMatch, built with Steven Pennington's software factory.

- **Where things stand:** `STATUS.md`
- **What is being built:** `docs/brief.md` and `docs/features.json`
- **How agents work here:** `AGENTS.md`

```bash
npm ci
npm run dev        # http://localhost:3000
npm run check      # the gate
npm run test:e2e   # browser tests
npm run evidence   # both, on committed work, with a block to paste into the pull request
```

Before launch the site tells search engines to stay away, and `/review` is the page to send the client. Both change when `factory.json` says `"launched": true`.
