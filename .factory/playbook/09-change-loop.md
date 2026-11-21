# 09 Change loop

**Purpose:** turn "Cat emailed eleven edits" into one reviewed pull request, with nothing lost and nothing invented.

**Runs in:** the client repo. **Skill:** `client-changes`.

## Steps

1. Steven forwards the client's list (email, text, call notes). Paste it into the pull request description **word for word**, as a numbered checklist under "Client checklist". Do not tidy their wording.
2. Sort each item:
   - **In scope:** do it.
   - **Needs their words or files:** do what you can, mark the rest "Needed from the client", and add a row to **Waiting on the client** in `STATUS.md`.
   - **Our draft of their copy:** mark it "Draft for approval" in the checklist. It ships only after they approve the exact words.
   - **Outside the brief:** do not build it. List it under "Left out on purpose" as a change order for Steven to price.
   - **Unclear:** state your interpretation in the pull request and build that, unless a wrong guess would be expensive, in which case ask.
3. Branch, change, test. A changed behavior gets a changed or new browser test in the same pull request. A copy rule the client states ("never call it X") goes into `content/copy-rules.json`.
4. Tick each item only when it is done and you looked at it in the browser. Put Steven-only steps under "Before merging".
5. After the merge, confirm the live site serves the change (`verify-deploy`), then draft a short reply for Steven to send: what changed, what is waiting on them. Add the `WORKLOG.md` row and count the round in the registry (`revisionRounds`).

## Stop

For change orders, for anything that needs the client's approval of exact words, and for the usual pause list.

*Sources: grandma-cat-jeter pull requests #8, #12 and #15 (the client's numbered list as a checklist, "Before merging", "Draft for approval", "Cat to review / Needed from Cat").*
