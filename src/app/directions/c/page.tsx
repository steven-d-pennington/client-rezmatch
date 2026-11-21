import { notFound } from "next/navigation";
import { DraftNotice } from "@/components/DraftNotice";
import { prelaunchOnly, site } from "@/lib/site";

// Direction C, "Poster": one big statement, strong color, very little else.
export default function DirectionC() {
  if (!prelaunchOnly) notFound();
  return (
    <div data-direction="c" className="flex flex-1 flex-col">
      <DraftNotice name="Poster" />
      <main className="flex flex-1 flex-col">
        <header className="flex min-h-[70vh] flex-col justify-end px-5 pb-10 pt-16">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">{site.name}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-black uppercase leading-none break-words md:text-7xl">
            {site.tagline}
          </h1>
          <a
            href="#contact"
            className="mt-8 inline-flex min-h-12 w-fit items-center bg-accent px-7 text-lg font-black uppercase text-on-accent"
          >
            {site.contact.heading}
          </a>
        </header>
        <section className="border-t border-line px-5 py-10">
          <p className="max-w-2xl text-xl">{site.intro}</p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {site.offers.map((offer) => (
              <li key={offer.title} className="py-5">
                <h2 className="font-display text-2xl font-black uppercase">{offer.title}</h2>
                <p className="mt-1 text-muted">{offer.body}</p>
              </li>
            ))}
          </ul>
        </section>
        <section id="contact" className="bg-surface px-5 py-10">
          <h2 className="font-display text-3xl font-black uppercase">{site.contact.heading}</h2>
          <p className="mt-2 text-lg">{site.contact.body}</p>
        </section>
      </main>
    </div>
  );
}
