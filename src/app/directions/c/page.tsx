import { notFound } from "next/navigation";
import { DraftNotice } from "@/components/DraftNotice";
import { Placeholder } from "@/components/Placeholder";
import { chat, featured, members } from "@/lib/samples";
import { prelaunchOnly, site } from "@/lib/site";

const tileColors = ["bg-accent text-on-accent", "bg-accent-2 text-on-accent-2", "bg-surface text-ink"];

// Direction C, "Big sky": bright, open and a little cheeky. Big friendly type, bold blocks of color.
export default function DirectionC() {
  if (!prelaunchOnly) notFound();
  return (
    <div data-direction="c" className="flex-1 overflow-x-hidden">
      <DraftNotice name="Big sky" />
      <main className="mx-auto w-full max-w-6xl px-4 pb-20">
        <header className="py-6">
          <p className="inline-flex rounded-full border-4 border-line bg-accent-2 px-5 py-1 font-display text-2xl font-black text-on-accent-2">
            RezMatch
          </p>
        </header>

        <section className="py-8 md:py-14">
          <h1 className="max-w-5xl font-display text-[2.6rem] leading-[0.95] font-black tracking-tight break-words sm:text-6xl md:text-8xl">
            {site.headlines.c}
          </h1>
          <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="max-w-xl text-xl text-muted">{site.intro}</p>
            <a
              href="#people"
              className="inline-flex min-h-14 w-fit items-center rounded-full border-4 border-line bg-accent px-8 font-display text-xl font-black text-on-accent"
            >
              {site.cta}
            </a>
          </div>
        </section>

        <section aria-labelledby="how" className="py-10">
          <h2 id="how" className="sr-only">
            How it works
          </h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {site.steps.map((step, index) => (
              <li key={step.title} className={`min-w-0 rounded-token border-4 border-line p-6 ${tileColors[index % 3]}`}>
                <span className="font-display text-5xl font-black">{index + 1}</span>
                <h3 className="mt-3 font-display text-2xl font-black">{step.title}</h3>
                <p className="mt-2 text-lg">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="people" aria-labelledby="people-heading" className="grid gap-10 py-10 md:grid-cols-[22rem_minmax(0,1fr)]">
          <div className="min-w-0">
            <h2 id="people-heading" className="font-display text-4xl font-black">
              Say hi to {featured.name}.
            </h2>
            <article className="mt-6 rotate-[-1.5deg] rounded-token border-4 border-line bg-surface p-4">
              <Placeholder label="The member's own photo" ratio="1 / 1" />
              <p className="mt-4 font-display text-3xl font-black">
                {featured.name}, {featured.age}
              </p>
              <p className="mt-1 font-semibold text-muted">
                {featured.nation} · {featured.place}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {featured.prompts.map((prompt) => (
                  <li key={prompt.question} className="rounded-full border-2 border-line px-3 py-1 text-sm font-semibold">
                    {prompt.question}: {prompt.answer}
                  </li>
                ))}
              </ul>
            </article>
            <p className="mt-4 text-sm font-semibold text-muted">{site.sampleNote}</p>
          </div>

          <div className="min-w-0">
            <ol className="space-y-4" aria-label="A sample conversation">
              {chat.map((line, index) => (
                <li key={index} className={line.mine ? "flex justify-end" : "flex"}>
                  <p
                    className={
                      line.mine
                        ? "max-w-[85%] rounded-[2rem] border-4 border-line bg-accent px-5 py-3 text-lg font-semibold text-on-accent"
                        : "max-w-[85%] rounded-[2rem] border-4 border-line bg-surface px-5 py-3 text-lg font-semibold"
                    }
                  >
                    {line.text}
                  </p>
                </li>
              ))}
            </ol>
            <h3 className="mt-10 font-display text-2xl font-black">More people to meet</h3>
            <ul className="mt-4 grid max-w-md grid-cols-3 gap-4">
              {members.map((member) => (
                <li key={member.name} className="min-w-0 text-center">
                  <div
                    data-placeholder
                    role="img"
                    aria-label={`Placeholder: photo of sample member ${member.name}`}
                    className="mx-auto flex aspect-square w-full max-w-28 items-center justify-center rounded-full border-4 border-dashed border-line bg-surface font-display text-3xl font-black text-muted"
                  >
                    {member.name.charAt(0)}
                  </div>
                  <p className="mt-2 font-display font-black">{member.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="about" className="mt-6 rounded-token border-4 border-line bg-accent-2 p-6 text-on-accent-2">
          <h2 id="about" className="font-display text-3xl font-black">
            {site.about.heading}
          </h2>
          <p className="mt-2 max-w-xl text-lg">{site.about.body}</p>
        </section>
      </main>
    </div>
  );
}
