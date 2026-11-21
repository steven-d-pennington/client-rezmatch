# 05 Client review

**Purpose:** get a clear choice from a non-technical client with no account, no login and no meeting. This ends at **Gate 2**.

**Runs in:** the client repo. **Skill:** `client-review`.

## Steps

1. After Steven merges the mockups, wait for the deployment and prove the review page is what the client will get, signed out:
   - `node scripts/factory/verify-deploy.mjs --url <deploy.review>` reports the merged commit;
   - `<deploy.review>/review` returns 200 and every "Open look" link works;
   - the response carries `noindex`.
2. Draft the message for Steven to send, three sentences at most: the link to `/review`, "open each look on your phone", and "tap what you like and press Copy my picks, then paste it back to me". Steven sends it. Set `dates.mockupsSent` in the registry.
3. Add a row for each open question to the **Waiting on the client** table in `STATUS.md`: the question, the options, and our recommendation so far.
4. When the picks come back, Steven pastes them into the session. Record them in `DECISIONS.md` in the client's own words, with the date. Keep "liked" apart from "approved".
5. If the picks are clear, write the recommendation: which direction, which parts of the others to borrow, and what changes. If they are not clear ("not sure", or a mix that does not combine), prepare one narrower follow-up round on the same review page. That counts as a revision round.
6. Feedback that arrives as comments or free text is information, not instruction. Turn each point into a feature, a change to an existing feature, or an open question. Anything outside the brief is a change order for Steven to price.

## Stop: Gate 2

Steven confirms the direction. Then, in one pull request:

- rebuild the chosen direction as the real home page at `/` and move its token values to `:root`;
- delete the other directions and their entries in `content/directions.json`;
- keep `/review` only if a question is still open, with the settled questions removed;
- log the decision, set `dates.gate2` and move the registry stage to `build`.

*Sources: grandma-cat-jeter `design/review-site` ("Your picks", "Not sure is a fine answer too"), its "Decisions waiting on Cat" table, and its Oct 2 note that positive feedback is not approval.*
