import { notFound } from "next/navigation";
import { DraftNotice } from "@/components/DraftNotice";
import { Placeholder } from "@/components/Placeholder";
import { chat, featured, members } from "@/lib/samples";
import { prelaunchOnly, site } from "@/lib/site";

// Direction B, "After dark": a sharp modern app, dark and photo-led, one ember-bright action.
export default function DirectionB() {
  if (!prelaunchOnly) notFound();
  return (
    <div data-direction="b" className="flex-1">
      <DraftNotice name="After dark" />
      <main className="mx-auto w-full max-w-6xl px-4 pb-20">
        <header className="flex items-center justify-between gap-4 py-5">
          <p className="font-display text-xl font-extrabold tracking-tight">
            Rez<span className="text-accent">Match</span>
          </p>
          <a
            href="#browse"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-semibold"
          >
            See how it works
          </a>
        </header>

        <section className="grid items-center gap-12 py-10 md:grid-cols-[minmax(0,1fr)_22rem] md:py-16">
          <div className="min-w-0">
            <h1 className="font-display text-6xl leading-[0.95] font-black tracking-tighter sm:text-7xl md:text-8xl">
              {site.headlines.b}
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted">{site.intro}</p>
            <a
              href="#browse"
              className="mt-8 inline-flex min-h-12 items-center rounded-full bg-accent px-7 text-lg font-bold text-on-accent"
            >
              {site.cta}
            </a>
          </div>

          <figure className="mx-auto w-full max-w-[22rem] min-w-0">
            <div className="rounded-[2.5rem] border border-line bg-surface p-3">
              <div className="overflow-hidden rounded-[2rem] bg-canvas">
                <div className="relative">
                  <Placeholder label="The member's main photo, full screen" ratio="3 / 4" />
                  <div className="absolute inset-x-0 bottom-0 bg-canvas/80 p-4">
                    <p className="text-2xl font-extrabold tracking-tight">
                      {featured.name} <span className="font-normal text-muted">{featured.age}</span>
                    </p>
                    <p className="text-sm text-muted">
                      {featured.nation} · {featured.place}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center gap-6 p-5" aria-hidden="true">
                  <span className="flex size-14 items-center justify-center rounded-full border border-line text-2xl text-muted">
                    ✕
                  </span>
                  <span className="flex size-14 items-center justify-center rounded-full bg-accent text-2xl text-on-accent">
                    ♥
                  </span>
                </div>
              </div>
            </div>
            <figcaption className="mt-3 text-center text-sm text-muted">{site.sampleNote}</figcaption>
          </figure>
        </section>

        <section id="browse" aria-labelledby="browse-heading" className="py-12">
          <h2 id="browse-heading" className="font-display text-3xl font-extrabold tracking-tight">
            People near you
          </h2>
          <ul
            tabIndex={0}
            aria-label="Sample members, swipe sideways for more"
            className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:max-w-4xl sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {members.map((member) => (
              <li
                key={member.name}
                className="w-[68%] shrink-0 snap-start overflow-hidden rounded-token border border-line bg-surface sm:w-auto sm:min-w-0"
              >
                <Placeholder label={`Photo of ${member.name}`} ratio="4 / 5" />
                <div className="p-4">
                  <p className="text-lg font-bold">
                    {member.name}, {member.age}
                  </p>
                  <p className="text-sm text-muted">{member.place}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="match" className="grid gap-10 py-12 md:grid-cols-2">
          <div className="min-w-0">
            <p className="inline-flex rounded-full bg-accent-2 px-3 py-1 text-sm font-bold text-on-accent-2">It&apos;s a match</p>
            <h2 id="match" className="mt-4 font-display text-3xl font-extrabold tracking-tight">
              Then you talk.
            </h2>
            <ol className="mt-6 space-y-6">
              {site.steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                  <span className="font-mono text-accent">0{index + 1}</span>
                  <div className="min-w-0">
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="mt-1 text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <ol className="min-w-0 space-y-3 rounded-token border border-line bg-surface p-5" aria-label="A sample conversation">
            {chat.map((line, index) => (
              <li key={index} className={line.mine ? "flex justify-end" : "flex"}>
                <p
                  className={
                    line.mine
                      ? "max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-4 py-2 text-on-accent"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm bg-canvas px-4 py-2"
                  }
                >
                  {line.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="about" className="border-t border-line py-12">
          <h2 id="about" className="font-display text-2xl font-extrabold tracking-tight">
            {site.about.heading}
          </h2>
          <p className="mt-3 max-w-xl text-muted">{site.about.body}</p>
        </section>
      </main>
    </div>
  );
}
