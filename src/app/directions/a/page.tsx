import { notFound } from "next/navigation";
import { DraftNotice } from "@/components/DraftNotice";
import { Placeholder } from "@/components/Placeholder";
import { chat, featured } from "@/lib/samples";
import { prelaunchOnly, site } from "@/lib/site";

// Direction A, "Kitchen table": unhurried and warm, words first, a profile you read like a letter.
export default function DirectionA() {
  if (!prelaunchOnly) notFound();
  return (
    <div data-direction="a" className="flex-1">
      <DraftNotice name="Kitchen table" />
      <main className="mx-auto w-full max-w-2xl px-5 pb-20">
        <header className="border-b border-line py-6 text-center">
          <p className="font-display text-2xl tracking-wide">{site.name}</p>
        </header>

        <section className="py-14 text-center">
          <h1 className="font-display text-4xl leading-tight text-balance sm:text-5xl">{site.headlines.a}</h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted">{site.intro}</p>
          <a
            href="#profile"
            className="mt-8 inline-flex min-h-11 items-center border border-accent px-6 text-lg text-accent italic"
          >
            {site.cta}
          </a>
        </section>

        <section aria-labelledby="how" className="border-t border-line py-12">
          <h2 id="how" className="text-center text-sm tracking-[0.25em] text-muted uppercase">
            How it works
          </h2>
          <ol className="mt-8 space-y-8">
            {site.steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3">
                <span className="font-display text-3xl leading-none text-accent italic">{index + 1}.</span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="profile" aria-labelledby="profile-heading" className="border-t border-line py-12">
          <h2 id="profile-heading" className="text-center text-sm tracking-[0.25em] text-muted uppercase">
            A profile you read, not swipe
          </h2>
          <article className="mt-8 border border-line bg-surface p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-[10rem_minmax(0,1fr)]">
              <div className="mx-auto w-full max-w-[11rem] min-w-0 sm:max-w-none">
                <Placeholder label="The member's own photo" ratio="4 / 5" />
              </div>
              <div className="min-w-0">
                <p className="font-display text-3xl">
                  {featured.name}, {featured.age}
                </p>
                <p className="mt-1 text-muted italic">
                  {featured.nation} · {featured.place}
                </p>
                <p className="mt-4 leading-relaxed">{featured.about}</p>
              </div>
            </div>
            <dl className="mt-8 space-y-5 border-t border-line pt-6">
              {featured.prompts.map((prompt) => (
                <div key={prompt.question}>
                  <dt className="text-accent italic">{prompt.question}</dt>
                  <dd className="mt-1 text-lg">{prompt.answer}</dd>
                </div>
              ))}
            </dl>
          </article>
          <p className="mt-3 text-center text-sm text-muted italic">{site.sampleNote}</p>
        </section>

        <section aria-labelledby="talk" className="border-t border-line py-12">
          <h2 id="talk" className="text-center text-sm tracking-[0.25em] text-muted uppercase">
            A first conversation
          </h2>
          <ol className="mt-8 space-y-6">
            {chat.map((line, index) => (
              <li key={index} className={line.mine ? "border-r-2 border-accent pr-4 text-right" : "border-l-2 border-line pl-4"}>
                <p className="text-lg leading-relaxed">{line.text}</p>
                <p className="mt-1 text-sm text-muted italic">{line.from}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="about" className="border-t border-line py-12 text-center">
          <h2 id="about" className="font-display text-2xl">
            {site.about.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-lg leading-relaxed text-muted">{site.about.body}</p>
        </section>
      </main>
    </div>
  );
}
