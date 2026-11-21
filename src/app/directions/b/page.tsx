import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DraftNotice } from "@/components/DraftNotice";
import { directionFonts } from "@/lib/fonts";
import { prelaunchOnly, site } from "@/lib/site";
import "./b.css";

export const metadata: Metadata = { title: `After dark, an early look at ${site.name}`, robots: { index: false, follow: false } };

const prompts = ["Where's home?", "Coffee or a drive?", "Two hours is close.", "Best thing your auntie ever told you?", "Early riser or night owl?", "What are you listening to right now?"];

const members = [
  { name: "Jordan", age: 29, away: "[Nation] · 25 min away", prompt: "Early riser or night owl? Night owl, sorry." },
  { name: "Tayla", age: 33, away: "[Nation] · 1 hr 40 away", prompt: "Where's home? Ask me in person." },
  { name: "Rae", age: 27, away: "[Nation] · 40 min away", prompt: "Coffee or a drive? A drive, always." },
  { name: "Dez", age: 31, away: "[Nation] · 2 hrs away", prompt: "Listening to: whatever my nephew put on." },
];

const steps = [
  { title: "Make your profile", body: "Your photos, where you're from if you want to say, and a few prompts in your own words.", icon: ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M4 21a8 8 0 0 1 16 0"] },
  { title: "Swipe who you like", body: "Set your range in drive time. Say yes, say no, nobody knows unless it's mutual.", icon: ["M9 6h9a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z", "M4 17V5a2 2 0 0 1 2-2h8"] },
  { title: "Match, then talk", body: "Both said yes? The chat opens. Take it from there.", icon: ["M4 5h16v11H9l-5 4z"] },
];

const safety = [
  { title: "Hide from people you know", body: "Keep your profile away from family and coworkers you choose.", icon: ["M3 3l18 18", "M10.6 5.1A9.8 9.8 0 0 1 12 5c5 0 9 4.5 10 7a13 13 0 0 1-3 4.2", "M6.1 6.2A13 13 0 0 0 2 12c1 2.5 5 7 10 7a9.6 9.6 0 0 0 4.6-1.2"] },
  { title: "You control what's shown", body: "Where you're from is yours to share, or not.", icon: ["M6 10h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z", "M8 10V7a4 4 0 0 1 8 0v3"] },
  { title: "Report in two taps", body: "Block and report from any chat. A real person reads it.", icon: ["M5 21V4", "M5 4h11l-2 4 2 4H5"] },
];

function Icon({ d, size = 26 }: { d: string[]; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}

const heart = "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z";

function Heart({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={heart} />
    </svg>
  );
}

function Prompts({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined}>
      {prompts.flatMap((prompt) => [
        <li key={prompt}>{prompt}</li>,
        <li key={`${prompt}-sep`} className="b-sep" aria-hidden="true">
          /
        </li>,
      ])}
    </ul>
  );
}

// Direction B, After dark: a sharp modern app. Dark and photo-led, with one ember-bright action.
export default function DirectionB() {
  if (!prelaunchOnly) notFound();
  return (
    <div data-direction="b" className={`flex-1 ${directionFonts.b}`}>
      <svg className="b-grain" aria-hidden="true">
        <filter id="b-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#b-grain)" />
      </svg>
      <DraftNotice name="After dark" />

      <header className="b-wrap b-nav">
        <p className="b-mark">
          rez<span>.</span>match
        </p>
        <nav aria-label="Main" className="b-links">
          <a href="#how">How it works</a>
          <a href="#safety">Safety</a>
          <a href="#join" className="b-pill">
            Join the waitlist
          </a>
        </nav>
      </header>

      <main>
        <section className="b-wrap b-hero">
          <div className="b-glow" aria-hidden="true" />
          <div className="b-hero-copy">
            <p className="b-badge">
              <span className="b-dot" aria-hidden="true" />
              Opening soon. Native people only.
            </p>
            <h1 className="b-display b-h1">
              Dating,
              <br />
              for <span>us.</span>
            </h1>
            <p className="b-lede">
              Swipe through Native singles near you and across the region. No explaining yourself, no being someone&apos;s &ldquo;experience.&rdquo; Just people who get it.
            </p>
            <div className="b-actions">
              <a href="#join" className="b-pill b-cta">
                Join the waitlist
                <Icon d={["M5 12h14M13 6l6 6-6 6"]} size={20} />
              </a>
              <a href="#how" className="b-pill b-big">
                See how it works
              </a>
            </div>
          </div>

          <div className="b-stage">
            <div className="b-phone b-phone-back" aria-hidden="true">
              <div className="b-screen">
                <div className="b-pair">
                  <div className="b-pair-a" />
                  <div className="b-pair-b" />
                  <div className="b-heart">
                    <Heart size={18} />
                  </div>
                  <div className="b-ring" />
                </div>
                <p className="b-match">
                  It&apos;s a
                  <br />
                  <span>match.</span>
                </p>
                <p className="b-muted" style={{ margin: 0, fontSize: 14 }}>
                  You and Rae both said yes.
                </p>
                <span className="b-fake-btn">Say something</span>
              </div>
            </div>

            <figure className="b-phone b-phone-front" aria-label="Sample profile screen">
              <div className="b-screen">
                <div data-placeholder role="img" aria-label="Placeholder: the member's main photo, full screen" className="b-photo" />
                <p className="b-photo-label">The member&apos;s own photo</p>
                <div className="b-bars" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="b-overlay">
                  <p className="b-who">
                    Rae <span>27</span>
                  </p>
                  <p className="b-where">[Nation] · [Home community] · 40 min away</p>
                  <p className="b-prompt">
                    <span>Coffee or a drive?</span> A drive, always.
                  </p>
                  <div className="b-choices" aria-hidden="true">
                    <span className="b-no">
                      <Icon d={["M6 6l12 12M18 6L6 18"]} size={22} />
                    </span>
                    <span className="b-yes">
                      <Heart size={22} />
                    </span>
                  </div>
                </div>
              </div>
            </figure>
            <p className="b-stage-note">Sample screens. Not real people.</p>
          </div>
        </section>

        <div className="b-marquee" role="region" aria-label="Sample profile prompts">
          <div className="b-track">
            <Prompts />
            <Prompts hidden />
          </div>
        </div>

        <section id="how" aria-labelledby="how-h" className="b-wrap b-section">
          <div className="b-split">
            <h2 id="how-h" className="b-display b-h2" style={{ maxWidth: "12ch" }}>
              Three steps. Zero explaining.
            </h2>
            <p className="b-muted" style={{ margin: 0, maxWidth: "24rem" }}>
              Draft steps. The founder decides what joining actually asks for.
            </p>
          </div>
          <ol className="b-steps">
            {steps.map((step, index) => (
              <li key={step.title} className={index === 2 ? "b-step hot" : "b-step"}>
                <div className="b-step-top">
                  <span className="b-icon">
                    <Icon d={step.icon} />
                  </span>
                  <span>0{index + 1}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="near-h" className="b-wrap b-people">
          <div className="b-split" style={{ alignItems: "center" }}>
            <h2 id="near-h" className="b-display b-h2-sm">
              People near you
            </h2>
            <div role="group" aria-label="Range" className="b-range">
              <button type="button" className="b-pill" aria-pressed="false">
                30 min
              </button>
              <button type="button" className="b-pill" aria-pressed="true">
                2 hrs
              </button>
              <button type="button" className="b-pill" aria-pressed="false">
                Whole region
              </button>
            </div>
          </div>
          <ul className="b-members">
            {members.map((member) => (
              <li key={member.name} className="b-member">
                <div data-placeholder role="img" aria-label={`Placeholder: photo of sample member ${member.name}`} className="b-photo" style={{ background: "none" }} />
                <span className="b-member-tag">Placeholder: {member.name}&apos;s photo</span>
                <div className="b-overlay">
                  <p className="b-who">
                    {member.name} <span>{member.age}</span>
                  </p>
                  <p className="b-where">{member.away}</p>
                  <p className="b-member-prompt">{member.prompt}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="b-muted" style={{ margin: "16px 0 0", fontSize: 14 }}>
            Sample members with placeholder details. Not real people.
          </p>
        </section>

        <section aria-labelledby="chat-h" className="b-band">
          <div className="b-wrap b-chat-wrap">
            <div className="b-chat-intro">
              <p className="b-tag">It&apos;s a match</p>
              <h2 id="chat-h" className="b-display" style={{ marginTop: 20, fontSize: "clamp(44px, 5.4vw, 80px)", lineHeight: 0.92, letterSpacing: "-0.05em" }}>
                Then you
                <br />
                actually talk.
              </h2>
              <p className="b-muted" style={{ margin: "22px 0 0", maxWidth: "28rem" }}>
                Every chat opens with the prompt that got you matched, so nobody has to start with &ldquo;hey.&rdquo;
              </p>
            </div>
            <ol aria-label="A sample conversation" className="b-chat">
              <li className="system">You matched on &ldquo;Coffee or a drive?&rdquo;</li>
              <li className="theirs">A drive, always. Where would you take me?</li>
              <li className="mine">Back roads to the lake. I know a spot with zero cell service.</li>
              <li className="theirs">Okay that&apos;s either romantic or a horror movie.</li>
              <li className="mine">Bring your cousin. Saturday?</li>
              <li className="typing" aria-label="Rae is typing">
                <span />
                <span />
                <span />
              </li>
            </ol>
          </div>
        </section>

        <section id="safety" aria-labelledby="safety-h" className="b-wrap b-section" style={{ paddingBottom: "clamp(72px, 9vw, 120px)" }}>
          <h2 id="safety-h" className="b-display b-h2-sm">
            Safety ideas <span className="b-muted" style={{ fontWeight: 500 }}>for the founder to decide</span>
          </h2>
          <ul className="b-safety">
            {safety.map((item) => (
              <li key={item.title}>
                <Icon d={item.icon} size={30} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="join" aria-labelledby="join-h" className="b-wrap" style={{ paddingBottom: "clamp(72px, 9vw, 120px)" }}>
          <div className="b-join">
            <div className="b-join-glow" aria-hidden="true" />
            <div style={{ position: "relative", flex: "1 1 380px", minWidth: 0 }}>
              <h2 id="join-h" className="b-display">
                Get in
                <br />
                <span>early.</span>
              </h2>
              <p className="b-soft" style={{ margin: "20px 0 0", maxWidth: "26rem" }}>
                First invites go out by region. Leave your email and we&apos;ll tell you when yours opens.
              </p>
            </div>
            <form className="b-form">
              <label htmlFor="b-email">Email</label>
              <div className="b-form-row">
                <input id="b-email" type="email" placeholder="you@example.com" autoComplete="email" />
                <button type="button" className="b-pill b-cta">
                  Join the waitlist
                </button>
              </div>
              <p className="b-muted" style={{ margin: "12px 0 0", fontSize: 14 }}>
                Mockup only: this form doesn&apos;t send anything yet.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="b-footer">
        <div className="b-wrap">
          <p className="b-mark">
            rez<span>.</span>match
          </p>
          <span>[Founder&apos;s name] and team · Draft for review, not live, all members are samples.</span>
        </div>
      </footer>
    </div>
  );
}
