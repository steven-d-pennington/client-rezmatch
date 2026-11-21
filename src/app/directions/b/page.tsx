import { notFound } from "next/navigation";
import { DraftNotice } from "@/components/DraftNotice";
import { Placeholder } from "@/components/Placeholder";
import { prelaunchOnly, site } from "@/lib/site";

// Direction B, "Shop window": what they offer is on show, with a clear next step.
export default function DirectionB() {
  if (!prelaunchOnly) notFound();
  return (
    <div data-direction="b" className="flex-1">
      <DraftNotice name="Shop window" />
      <main className="mx-auto w-full max-w-5xl px-4 py-10">
        <header className="grid items-center gap-8 md:grid-cols-2">
          <div className="min-w-0">
            <p className="font-semibold text-accent">{site.name}</p>
            <h1 className="mt-2 font-display text-3xl font-bold md:text-5xl">{site.tagline}</h1>
            <p className="mt-4 text-lg text-muted">{site.intro}</p>
            <a
              href="#contact"
              className="mt-6 inline-flex min-h-11 items-center rounded-token bg-accent px-6 font-semibold text-on-accent"
            >
              {site.contact.heading}
            </a>
          </div>
          <div className="min-w-0">
            <Placeholder label="The main product or service photo" ratio="4 / 3" />
          </div>
        </header>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {site.offers.map((offer) => (
            <li key={offer.title} className="min-w-0 rounded-token border border-line bg-surface p-5">
              <h2 className="font-display text-lg font-bold">{offer.title}</h2>
              <p className="mt-2 text-muted">{offer.body}</p>
            </li>
          ))}
        </ul>
        <section id="contact" className="mt-12 rounded-token bg-surface p-6">
          <h2 className="font-display text-2xl font-bold">{site.contact.heading}</h2>
          <p className="mt-2">{site.contact.body}</p>
        </section>
      </main>
    </div>
  );
}
