# 04 Mockups

**Purpose:** put three clearly different directions in front of the client as real pages they can open on their phone. Real pages in the real stack mean the chosen direction becomes the build, with nothing to redo.

**Runs in:** the client repo. **Skill:** `mockups`.

## Reads

`docs/brief.md`, `docs/design/creative-direction.md`, `.factory/playbook/taste-guide.md`, the "This client" section of `AGENTS.md`.

## Steps

1. Put the client's real words into `content/site.json`. Where words are missing, write a `[bracketed]` note saying what is needed. Never lorem ipsum, never invented claims.
2. Build each direction in `src/app/directions/<id>/page.tsx`, and describe it in `content/directions.json` (a name and a one-sentence idea in plain words). The starter ships three skeletons, A, B and C. Replace them.
3. Make the directions meaningfully different: layout, type, color and how the first screen behaves, not three palettes on one layout. Each direction sets its own tokens under `[data-direction="<id>"]` in `src/styles/tokens.css`. If two directions could be confused in a thumbnail, one of them is not done.
4. Use the `Placeholder` component for every photo or graphic the client has not supplied, with a label that says what belongs there. Client photos they have supplied are loaded from storage outside Git.
5. Build directions in parallel if you like (one worker per direction, each owning only its own folder and its token block). The coordinator integrates.
6. Edit `content/review.json` so the "Your picks" questions match the real choices: the look, and anything else worth asking now (tone of the words, a color option). Three questions at most. A client facing ten clocks and nine palettes cannot choose.
7. Review each direction yourself at 390 and 1440 wide before anyone else sees it: where the main action sits, hierarchy, legibility, overflow, whether it matches the idea sentence. Then, if you can, have a second agent on a different model score each direction against the creative direction (fit, clarity, distinctiveness, each out of 10, with the gap to a 9) and fix what it finds.
8. Commit and run `npm run evidence`. The tests already cover every direction for sideways scroll, tap target size and accessibility.
9. Open one pull request, "Mockups: <names of the directions>", with phone and desktop screenshots of each direction in the description.

## Leaves behind

Three directions and an updated review page on a pull request preview that only Steven can open.

## Stop

Steven's merge is his taste pass: nothing reaches the client's link until he merges. Record his notes as lessons tagged taste (stage 11 explains how), because the next client's mockups should start from them.

*Sources: grandma-cat-jeter `cloud-mockup-brief.md` ("make the options meaningfully different") and its labeled placeholders; steven-game-arcade's judge agents with numeric scores; the-first-fifteen L-003; the blueprint's directions as real routes.*
