import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DraftNotice } from "@/components/DraftNotice";
import { directionFonts } from "@/lib/fonts";
import { prelaunchOnly, site } from "@/lib/site";
import { PromptPicker } from "./PromptPicker";
import "./c.css";

export const metadata: Metadata = { title: `Big sky, an early look at ${site.name}`, robots: { index: false, follow: false } };

const stickers = [
  { name: "Jordan, 29", meta: "[Nation] · 25 min", hatch: "c-hatch-sun", className: "c-sticker-1" },
  { name: "Tayla, 33", meta: "[Nation] · 1 hr 40", hatch: "c-hatch-coral", className: "c-sticker-2" },
  { name: "Rae, 27", meta: "[Nation] · 40 min", hatch: "c-hatch-blue", className: "c-sticker-3" },
];

const steps = [
  { title: "Say who you are", body: "Photos, a few fun prompts, and where you're from if you feel like sharing." },
  { title: "Pick your range", body: "Down the road or a few hours out. You set the drive, we show the people." },
  { title: "Say hi", body: "Both said yes? Chat opens. The rest is up to you two." },
];

const chat = [
  { text: "Bring snacks and a good story and we'll be fine.", side: "theirs" },
  { text: "Deal. My story involves a flat tire and a herd of cattle.", side: "mine" },
  { text: "Okay I need to hear this in person.", side: "theirs" },
  { text: "Saturday, halfway between us?", side: "mine sun" },
];

const ribbon = ["Native singles", "Near home and far", "Two hours is close", "Coffee first", "No explaining"];

const safety = [
  { title: "Hide from people you know", body: "Keep your profile away from family and coworkers you choose.", fill: "var(--t-accent-2)", icon: ["M3 3l18 18", "M10.6 5.1A9.8 9.8 0 0 1 12 5c5 0 9 4.5 10 7a13 13 0 0 1-3 4.2", "M6.1 6.2A13 13 0 0 0 2 12c1 2.5 5 7 10 7a9.6 9.6 0 0 0 4.6-1.2"] },
  { title: "You choose what's shown", body: "Where you're from is yours to share, or not.", fill: "var(--c-coral)", icon: ["M6 10h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z", "M8 10V7a4 4 0 0 1 8 0v3"] },
  { title: "Report in two taps", body: "Block and report from any chat. A real person reads it.", fill: "var(--t-surface)", icon: ["M5 21V4", "M5 4h11l-2 4 2 4H5"] },
];

function Icon({ d, size = 26, fill = "none" }: { d: string[]; size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}

function Ribbon({ hidden }: { hidden?: boolean }) {
  return (
    <p aria-hidden={hidden || undefined}>
      {ribbon.map((word) => (
        <span key={word} style={{ color: "inherit" }}>
          {word} <span aria-hidden="true">*</span>{" "}
        </span>
      ))}
    </p>
  );
}

// Direction C, Big sky: bright, open and a little cheeky. Big friendly type, stickers and bold blocks of color.
export default function DirectionC() {
  if (!prelaunchOnly) notFound();
  return (
    <div data-direction="c" className={`flex-1 ${directionFonts.c}`}>
      <DraftNotice name="Big sky" />

      <header className="c-wrap c-nav">
        <p className="c-mark">RezMatch</p>
        <nav aria-label="Main" className="c-links">
          <a href="#how">How it works</a>
          <a href="#safety">Safety</a>
          <a href="#join" className="c-btn c-btn-blue">
            Get early access
          </a>
        </nav>
      </header>

      <main>
        <section className="c-wrap c-hero">
          <h1 className="c-display c-h1">
            Find your <span className="c-hl c-hl-blue">match.</span> Skip the <span className="c-hl c-hl-sun">explaining.</span>
          </h1>
          <div className="c-hero-row">
            <div className="c-hero-copy">
              <p className="c-lede">A bright, easy dating app for Native people. Meet folks who already know your world, near home or a few hours out.</p>
              <div className="c-actions">
                <a href="#join" className="c-btn c-btn-coral c-btn-xl">
                  Get early access
                </a>
                <a href="#meet" className="c-btn c-btn-lg">
                  Meet someone
                </a>
              </div>
            </div>
            <div className="c-stickers">
              {stickers.map((sticker) => (
                <article key={sticker.name} aria-label="Sample member sticker" className={`c-sticker ${sticker.className}`}>
                  <div data-placeholder role="img" aria-label="Placeholder: the member's own photo" className={`c-sticker-photo ${sticker.hatch}`} />
                  <p className="c-sticker-name">{sticker.name}</p>
                  <p className="c-sticker-meta">{sticker.meta}</p>
                </article>
              ))}
              <span className="c-mutual">
                <Icon d={["M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"]} size={20} fill="currentColor" />
                It&apos;s mutual!
              </span>
              <p className="c-stickers-note c-muted">Samples, not real people.</p>
            </div>
          </div>
        </section>

        <div className="c-ribbon" role="region" aria-label="RezMatch in a few words">
          <div className="c-ribbon-track">
            <Ribbon />
            <Ribbon hidden />
          </div>
        </div>

        <section id="how" aria-labelledby="how-h" className="c-wrap c-section">
          <h2 id="how-h" className="c-display c-h2">
            Easy as
            <br />
            one, two, three.
          </h2>
          <ol className="c-tiles">
            {steps.map((step, index) => (
              <li key={step.title} className="c-tile">
                <span className="c-num" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="meet" aria-labelledby="meet-h" className="c-wrap c-meet">
          <div className="c-meet-card">
            <h2 id="meet-h" className="c-display" style={{ margin: "0 0 26px", fontSize: "clamp(40px, 4.6vw, 64px)", lineHeight: 0.95 }}>
              Say hi to Tayla.
            </h2>
            <article className="c-profile">
              <div data-placeholder role="img" aria-label="Placeholder: the member's own photo" className="c-profile-photo c-hatch-coral">
                <span>The member&apos;s own photo</span>
              </div>
              <div style={{ padding: "16px 6px 6px" }}>
                <p className="c-display" style={{ fontSize: 36, lineHeight: 1 }}>
                  Tayla, 33
                </p>
                <p className="c-muted" style={{ margin: "6px 0 0" }}>
                  [Nation] · from [Home community]
                </p>
                <ul className="c-tags">
                  <li>Night-shift nurse</li>
                  <li>Aunt to four</li>
                  <li>Road trips</li>
                </ul>
              </div>
            </article>
            <p className="c-muted" style={{ margin: "22px 0 0", fontSize: 15 }}>
              Sample member. Not a real person.
            </p>
          </div>
          <ol aria-label="A sample conversation" className="c-chat">
            {chat.map((line) => (
              <li key={line.text} className={line.side}>
                {line.text}
              </li>
            ))}
            <li className="done">
              <Icon d={["M6 5h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z", "M3 10h18M8 3v4M16 3v4"]} size={18} />
              Plans made
            </li>
          </ol>
        </section>

        <section aria-labelledby="prompts-h" className="c-white">
          <div className="c-wrap">
            <div className="c-split">
              <h2 id="prompts-h" className="c-display" style={{ fontSize: "clamp(40px, 4.8vw, 68px)", lineHeight: 0.95, maxWidth: "13ch" }}>
                Pick three. Answer honestly.
              </h2>
              <p className="c-muted" style={{ margin: 0, maxWidth: "24rem" }}>
                Sample prompts. The founder and early members would write the real ones.
              </p>
            </div>
            <PromptPicker />
          </div>
        </section>

        <section id="safety" aria-labelledby="safety-h" className="c-wrap" style={{ paddingBlock: "clamp(72px, 9vw, 120px)" }}>
          <div className="c-navy">
            <h2 id="safety-h" className="c-display" style={{ fontSize: "clamp(34px, 4vw, 54px)", letterSpacing: "-0.03em" }}>
              Safety ideas <span>(the founder decides)</span>
            </h2>
            <ul className="c-safety">
              {safety.map((item) => (
                <li key={item.title}>
                  <span className="c-safety-icon" style={{ background: item.fill }}>
                    <Icon d={item.icon} />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="join" aria-labelledby="join-h" className="c-wrap" style={{ paddingBottom: "clamp(72px, 9vw, 120px)" }}>
          <div className="c-join">
            <div style={{ flex: "1 1 360px", minWidth: 0 }}>
              <h2 id="join-h" className="c-display">
                Save your spot.
              </h2>
              <p style={{ margin: "18px 0 0", maxWidth: "26rem", fontSize: 20, fontWeight: 500 }}>
                We&apos;ll email once when RezMatch opens in your area. That&apos;s it.
              </p>
            </div>
            <form className="c-form">
              <label htmlFor="c-email">Your email</label>
              <div className="c-form-row">
                <input id="c-email" type="email" placeholder="you@example.com" autoComplete="email" />
                <button type="button" className="c-btn c-btn-navy c-btn-xl">
                  Count me in
                </button>
              </div>
              <p style={{ margin: "12px 0 0", fontSize: 15, fontWeight: 500 }}>Mockup only: this form doesn&apos;t send anything yet.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="c-footer">
        <div className="c-wrap">
          <p className="c-word">RezMatch</p>
          <span>Made by [Founder&apos;s name] · Draft for review, not live, all members are samples.</span>
        </div>
      </footer>
    </div>
  );
}
