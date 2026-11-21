# Taste guide

What Steven's work looks and reads like, gathered from his repos. Agents read this before mockups and before writing any client-facing words. It grows from lessons whose title starts with "Taste:". Where the client's brief says otherwise, the brief wins.

## How it should feel

- **A person, not a template.** The client's own voice, photos and story lead. Grandma Cat's site works because it sounds like her.
- **One idea per direction.** Every direction can be said in one plain sentence and has one thing you would remember it by.
- **Calm first screen.** One clear statement and one clear next step. Everything else can wait for the scroll.
- **Phone first.** Most of these clients' visitors arrive on a phone, from a text or a social post. Design at 390 wide, then widen.

## Words

- Plain verbs, short sentences, the way the client talks. No marketing filler.
- No em dashes in client-facing copy (a test enforces this). Use a comma, a period or parentheses.
- Never invent a quote, a testimonial, a credential, a price, a stock level or a health claim.
- Draft copy is labeled as draft until the client approves the exact words. Text in `[brackets]` is theirs to supply.
- Say what is true about state. Show "sent" only when the service confirmed it. Never imply success after a timeout.
- Keep the client's titles and names exactly as they wrote them.

## Layout and interaction

- Tap targets at least 44 pixels tall (a test enforces this).
- No sideways scroll at 320, 390, 768 or 1440 wide (a test enforces this). Give grid children `min-width: 0`.
- Colors and type come from tokens in `src/styles/tokens.css`, never from literals in components (a test enforces this).
- Visible keyboard focus. Motion respects "reduce motion". The page still makes sense with JavaScript off where that is cheap to do.
- System fonts until a direction is chosen. Then add at most two typefaces, self-hosted or through `next/font`.
- A successful render proves nothing about design. Look at where the main action sits, the hierarchy, legibility, and whether the idea of the direction is actually the first thing you notice.

## Honesty in mockups

- Missing imagery is a labeled placeholder, not a stock photo that could pass for the client's.
- Never regenerate, "enhance" or restyle a client's own artwork or photos. Use the files as supplied.
- Every mockup page says it is an early look.

## Showing options

- Three directions, different enough that a non-designer sees it at a glance.
- Few questions. Three at most on the review page. "Not sure" is always an answer.
- Give a recommendation, in one sentence, and say why.

## Taste notes from Steven

Add dated lines here as he gives them. Until then this section is empty on purpose.

*Sources: nugget-miner's policy tests and design brief; grandma-cat-jeter's design system and content rules; smoke-mask-waitlist's honesty rules; the-first-fifteen L-003; symptom-tracker-2's 44 pixel rule.*
