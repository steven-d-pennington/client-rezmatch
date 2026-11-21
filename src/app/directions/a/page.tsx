import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DraftNotice } from "@/components/DraftNotice";
import { directionFonts } from "@/lib/fonts";
import { prelaunchOnly, site } from "@/lib/site";
import "./a.css";

export const metadata: Metadata = { title: `Letterpress, an early look at ${site.name}`, robots: { index: false, follow: false } };

// Drawn contour lines for the hero map. Invented shapes, not a real place.
const contours = [
  "M337 267 Q335 274 330 279 Q324 284 316 286 Q308 289 300 288 Q292 287 284 285 Q276 284 269 279 Q263 274 264 267 Q264 260 266 254 Q268 248 272 242 Q277 237 284 234 Q292 230 300 229 Q309 228 316 233 Q322 237 327 243 Q331 248 335 254 Q339 260 337 267Z",
  "M375 273 Q370 287 359 297 Q348 308 332 312 Q316 316 300 315 Q285 314 267 312 Q249 311 239 299 Q228 288 229 274 Q230 260 232 247 Q235 235 244 225 Q254 214 268 206 Q282 199 300 198 Q318 197 330 207 Q343 217 353 226 Q363 236 371 248 Q380 260 375 273Z",
  "M412 280 Q404 300 388 316 Q372 332 347 336 Q323 340 300 342 Q276 343 249 341 Q221 339 209 320 Q196 300 196 280 Q196 260 198 241 Q201 222 216 207 Q231 191 252 178 Q273 165 300 166 Q326 168 344 183 Q361 198 380 210 Q399 222 410 241 Q421 260 412 280Z",
  "M449 287 Q439 313 416 334 Q394 354 362 359 Q330 364 298 370 Q267 377 230 372 Q194 367 181 339 Q168 311 164 285 Q160 260 164 235 Q168 209 188 188 Q207 166 235 148 Q263 130 298 136 Q333 143 357 161 Q381 179 409 193 Q438 207 449 233 Q460 260 449 287Z",
  "M486 294 Q474 327 444 350 Q413 374 375 381 Q337 388 296 402 Q256 416 212 404 Q169 391 155 356 Q141 321 132 291 Q122 260 129 228 Q136 197 158 168 Q180 139 216 117 Q253 96 296 109 Q339 123 371 140 Q403 157 441 174 Q479 191 488 225 Q497 260 486 294Z",
  "M522 300 Q510 341 470 366 Q430 390 387 404 Q345 417 294 437 Q244 457 196 434 Q149 412 132 372 Q114 332 99 296 Q84 260 94 222 Q104 185 127 147 Q149 109 197 88 Q245 66 294 86 Q344 106 387 118 Q429 130 475 153 Q520 175 527 218 Q534 260 522 300Z",
  "M557 307 Q542 353 493 379 Q444 405 400 429 Q355 453 294 476 Q232 498 183 463 Q133 428 109 385 Q84 343 65 302 Q46 260 58 216 Q69 171 93 124 Q117 76 178 60 Q238 44 294 66 Q349 89 405 94 Q460 99 509 130 Q557 161 564 210 Q571 260 557 307Z",
  "M590 312 Q570 364 514 392 Q459 420 413 459 Q368 498 295 516 Q222 533 171 487 Q120 441 85 398 Q51 356 31 308 Q11 260 20 208 Q29 156 57 100 Q85 44 160 37 Q234 30 295 48 Q356 65 425 65 Q494 65 543 107 Q591 148 601 204 Q611 260 590 312Z",
  "M580 474 Q578 478 574 481 Q570 483 565 484 Q560 484 554 485 Q549 486 546 482 Q542 478 542 474 Q541 470 542 466 Q543 462 546 459 Q550 456 555 454 Q560 452 564 455 Q569 458 573 460 Q577 462 579 466 Q581 470 580 474Z",
  "M601 479 Q598 488 589 492 Q580 497 570 500 Q560 502 548 503 Q536 504 530 495 Q525 486 522 478 Q520 470 522 462 Q524 454 531 446 Q537 438 549 436 Q560 434 569 439 Q578 445 588 449 Q598 452 601 461 Q605 470 601 479Z",
  "M622 483 Q618 497 603 503 Q589 510 574 516 Q560 523 542 522 Q524 520 516 507 Q508 494 502 482 Q497 470 501 457 Q505 445 514 432 Q524 420 542 419 Q560 419 574 425 Q589 430 604 436 Q620 442 624 456 Q627 470 622 483Z",
  "M643 488 Q636 505 617 514 Q598 523 579 535 Q560 546 537 540 Q513 535 502 519 Q490 502 482 486 Q475 470 480 453 Q484 435 498 419 Q511 402 535 404 Q560 406 580 410 Q601 414 621 423 Q642 432 646 451 Q650 470 643 488Z",
];

const principles = [
  { title: "Profiles you read", body: "A few honest answers instead of a hundred photos. You learn who someone is before you decide anything." },
  { title: "Distance that makes sense", body: "Out here two hours is close. Search by drive time, not by a five-mile circle drawn for a city." },
  { title: "You decide who sees you", body: "Small communities mean everybody knows everybody. You choose what you share and who gets to see it." },
];

const prompts = [
  { q: "A perfect Sunday", a: "Breakfast with my cousins, then a long drive with the windows down." },
  { q: "I'm looking for", a: "Someone steady who laughs easily and means what they say." },
  { q: "Ask me about", a: "The worst road trip of my life, and why I'd do it again." },
  { q: "Home for me is", a: "[In the member's own words]" },
];

const letters = [
  { text: "Okay, the worst road trip of your life. I need the whole story.", meta: "Rae · Tue, 8:14 pm", mine: false },
  { text: "Flat tire, no spare, my uncle's truck, a herd of cattle on the road. It's a lot. Coffee first?", meta: "You · Tue, 8:31 pm", mine: true },
  { text: "Coffee first. Saturday, halfway between us?", meta: "Rae · Tue, 8:33 pm", mine: false },
];

const ideas = ["Idea for discussion: drive time instead of miles", "Idea for discussion: a \"visiting home\" mode", "Idea for discussion: powwow and gathering weekends"];

function Icon({ d }: { d: string[] }) {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}

const safety = [
  { title: "Hide from people you know", body: "Keep your profile out of sight of family and coworkers you pick.", icon: ["M3 3l18 18", "M10.6 5.1A9.8 9.8 0 0 1 12 5c5 0 9 4.5 10 7a13 13 0 0 1-3 4.2", "M6.1 6.2A13 13 0 0 0 2 12c1 2.5 5 7 10 7a9.6 9.6 0 0 0 4.6-1.2", "M9.9 9.9a3 3 0 0 0 4.2 4.2"] },
  { title: "Your details stay yours", body: "Share your community only with people you choose to.", icon: ["M6 10h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z", "M8 10V7a4 4 0 0 1 8 0v3"] },
  { title: "Report and block, fast", body: "Two taps, and a real person reads every report.", icon: ["M5 21V4", "M5 4h11l-2 4 2 4H5"] },
];

// Direction A, Letterpress: editorial and unhurried. A profile you read like a letter, on a drawn map.
export default function DirectionA() {
  if (!prelaunchOnly) notFound();
  return (
    <div data-direction="a" className={`flex-1 ${directionFonts.a}`}>
      <DraftNotice name="Letterpress" />

      <header className="a-wrap a-nav">
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <p className="a-mark">
            Rez<em>Match</em>
          </p>
          <span className="a-chip">Early look</span>
        </div>
        <nav aria-label="Main" className="a-links">
          <a href="#how">How it works</a>
          <a href="#safety">Safety</a>
          <a href="#behind">Who&apos;s behind it</a>
          <a href="#join" className="a-btn">
            Get early access
          </a>
        </nav>
      </header>

      <main>
        <section className="a-wrap a-hero">
          <div className="a-hero-copy">
            <p className="a-eyebrow">A dating app for Native people</p>
            <h1 className="a-display a-h1">
              Meet someone who knows <em className="a-em">where you&apos;re from.</em>
            </h1>
            <p className="a-lede a-body">
              RezMatch is for Native people looking for something real. Slow down, read a person&apos;s own words, and start a conversation that doesn&apos;t need a footnote.
            </p>
            <div className="a-actions">
              <a href="#join" className="a-btn a-btn-lg">
                Get early access
              </a>
              <a href="#profile" className="a-textlink">
                Read a sample profile
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="a-hero-art">
            <div className="a-map">
              <svg viewBox="-20 -20 700 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <g fill="none" stroke="var(--a-contour)" strokeWidth="1.1">
                  {contours.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </g>
                <path d="M300 258 C 380 300, 470 340, 560 468" fill="none" stroke="var(--t-accent)" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
                <circle cx="300" cy="258" r="7" fill="var(--t-accent)" />
                <circle cx="560" cy="468" r="7" fill="var(--t-accent-2)" />
                <circle className="a-pin-ring" cx="560" cy="468" r="14" fill="none" stroke="var(--t-accent-2)" strokeWidth="2" />
              </svg>
              <p className="a-map-note">Drawn contours, not a real place</p>
            </div>
            <article aria-label="Sample member card" className="a-card">
              <div className="a-card-head">
                <div data-placeholder role="img" aria-label="Placeholder: the member's own photo" className="a-avatar" />
                <div style={{ minWidth: 0 }}>
                  <p className="a-card-name">Jordan, 29</p>
                  <p className="a-meta">[Nation] · [Home community]</p>
                </div>
              </div>
              <p className="a-card-quote">&ldquo;Looking for someone who&apos;ll still be up for a long drive at 11 at night.&rdquo;</p>
              <div className="a-card-foot">
                <span className="a-pill-sage">About 2 hrs away</span>
                <span className="a-tiny">Sample</span>
              </div>
            </article>
          </div>
        </section>

        <section id="how" aria-labelledby="how-h" className="a-band">
          <div className="a-wrap a-section">
            <div className="a-split">
              <h2 id="how-h" className="a-display a-h2" style={{ maxWidth: "14ch" }}>
                Three things we&apos;d do differently.
              </h2>
              <p className="a-note">Draft principles for the founder to rewrite in his own words.</p>
            </div>
            <ol className="a-principles">
              {principles.map((principle, index) => (
                <li key={principle.title}>
                  <p className="a-numeral" aria-hidden="true">
                    {["i.", "ii.", "iii."][index]}
                  </p>
                  <h3 className="a-h3">{principle.title}</h3>
                  <p>{principle.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="profile" aria-labelledby="profile-h" className="a-wrap a-section-lg">
          <p className="a-eyebrow">A profile, read like a letter</p>
          <div className="a-spread">
            <figure className="a-photo">
              <div data-placeholder role="img" aria-label="Placeholder: the member's own photo" className="a-photo-box">
                <span>The member&apos;s own photo goes here</span>
              </div>
              <figcaption>Sample member. Not a real person.</figcaption>
            </figure>
            <div className="a-spread-copy">
              <h2 id="profile-h" className="a-display a-name">
                Tayla<span>,</span> 33
              </h2>
              <p className="a-place">[Nation] · from [Home community] · lives in [City]</p>
              <p className="a-about">
                Nurse on night shifts, aunt to four, terrible at texting back but I always call. I want someone who gets why I drive home every other weekend.
              </p>
              <blockquote className="a-pull">&ldquo;Bring snacks and a good story and we&apos;ll be fine.&rdquo;</blockquote>
              <dl className="a-prompts">
                {prompts.map((prompt) => (
                  <div key={prompt.q}>
                    <dt>{prompt.q}</dt>
                    <dd>{prompt.a}</dd>
                  </div>
                ))}
              </dl>
              <div className="a-buttons">
                <button type="button" className="a-btn a-btn-lg">
                  Write to Tayla
                </button>
                <button type="button" className="a-btn a-btn-ghost">
                  Not right now
                </button>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="dist-h" className="a-night">
          <div className="a-wrap a-section-lg">
            <div className="a-split" style={{ gap: "24px 64px" }}>
              <h2 id="dist-h" className="a-display a-night-h">
                Two hours <em>is close.</em>
              </h2>
              <p className="a-night-p">
                Most apps assume everyone lives in a city. Here you&apos;d set how far you&apos;re willing to drive, and see people on the same roads you already know.
              </p>
            </div>
            <div className="a-ruler" aria-hidden="true">
              <div className="a-ruler-line" />
              <div className="a-ruler-fill" />
              <div className="a-ruler-dot a-ruler-you" />
              <div className="a-ruler-dot a-ruler-here" />
              <div className="a-ruler-label" style={{ left: 0 }}>
                You
              </div>
              <div className="a-ruler-label" style={{ left: "22%" }}>
                30 min
              </div>
              <div className="a-ruler-label a-ruler-strong" style={{ left: "calc(58% - 16px)" }}>
                2 hrs
              </div>
              <div className="a-ruler-label" style={{ right: 0 }}>
                4 hrs
              </div>
            </div>
            <ul className="a-ideas">
              {ideas.map((idea) => (
                <li key={idea}>{idea}</li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="talk-h" className="a-wrap a-section-lg">
          <div className="a-talk">
            <div className="a-talk-intro">
              <p className="a-eyebrow">A first conversation</p>
              <h2 id="talk-h" className="a-display a-talk-h">
                Start with something better than &ldquo;hey.&rdquo;
              </h2>
              <p className="a-body" style={{ margin: "20px 0 0" }}>
                Every profile ends with a question. Answer it and you&apos;ve already started talking about something that matters to them.
              </p>
            </div>
            <ol aria-label="A sample conversation" className="a-letters">
              {letters.map((letter) => (
                <li key={letter.meta} className={letter.mine ? "a-letter mine" : "a-letter"}>
                  <p>{letter.text}</p>
                  <p>{letter.meta}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="safety" aria-labelledby="safety-h" className="a-band" style={{ borderBottom: 0 }}>
          <div className="a-wrap a-section">
            <h2 id="safety-h" className="a-display" style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}>
              Safety ideas, for the founder to decide
            </h2>
            <ul className="a-safety">
              {safety.map((item) => (
                <li key={item.title}>
                  <Icon d={item.icon} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="behind" aria-labelledby="behind-h" className="a-wrap a-behind" style={{ borderTop: "1px solid var(--t-line)" }}>
          <div>
            <p className="a-eyebrow">Who&apos;s behind it</p>
            <h2 id="behind-h" className="a-display a-talk-h">
              Made by one of us, not for us.
            </h2>
            <p className="a-body" style={{ margin: "22px 0 0", maxWidth: "32rem" }}>
              [A few lines from the founder, in his own words: who he is, where he&apos;s from, and why he&apos;s building this.]
            </p>
            <p className="a-sign">[Founder&apos;s name], founder</p>
          </div>
          <form id="join" aria-labelledby="join-h" className="a-form">
            <h2 id="join-h" className="a-display" style={{ fontWeight: 500, fontSize: 30 }}>
              Be first in line
            </h2>
            <p className="a-body" style={{ margin: "8px 0 0" }}>
              We&apos;ll write once when RezMatch opens near you. Nothing else.
            </p>
            <label htmlFor="a-email">Email</label>
            <div className="a-form-row">
              <input id="a-email" type="email" placeholder="you@example.com" autoComplete="email" />
              <button type="button" className="a-btn a-btn-lg">
                Get early access
              </button>
            </div>
            <p className="a-small">Mockup only: this form doesn&apos;t send anything yet.</p>
          </form>
        </section>
      </main>

      <footer className="a-footer">
        <div className="a-wrap">
          <p className="a-mark">
            Rez<em>Match</em>
          </p>
          <span>Draft for review. Not live, not indexed, all members are samples.</span>
        </div>
      </footer>
    </div>
  );
}
