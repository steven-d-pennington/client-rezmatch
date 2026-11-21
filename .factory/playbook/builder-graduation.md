# App builder graduation

Use this only if a mockup or prototype came out of an app builder (OnSpace, Lovable, Bolt or similar). The mockup stage does not use one: agents build the mockups (decision D-008).

`mandelbrot-explorer` shows what a builder hands over: one commit per prompt, a two-way GitHub sync, about 70 unused dependencies, two lockfiles and no tests.

## Before it becomes a client repo

1. **Decide the direction of travel.** Either the builder stays the editor and the repo is a mirror, or the repo takes over. Do not edit in both. Once the repo takes over, turn off the builder's sync and remove its files (for OnSpace: `.onspace/`).
2. **Treat the output as a design reference, not a codebase.** The reliable path is to rebuild the screens inside the factory template, keeping the builder's layout, copy and tokens. Record the builder project's link in `DECISIONS.md`.
3. If you keep the code instead:
   - choose one package manager and delete the other lockfile;
   - remove unused dependencies and dead pages, then confirm it still builds;
   - replace the builder's README;
   - add everything `npm run check:factory` asks for: `AGENTS.md` with the rules block, `STATUS.md`, `LESSONS.md`, `DECISIONS.md`, `.env.example`, `factory.json`, CI and the pull request template;
   - add browser tests for each screen before changing anything.
4. A single-page app with client-side routing needs a rewrite rule on Vercel so deep links work.
5. Say in the first pull request which of these was done and which was skipped.
