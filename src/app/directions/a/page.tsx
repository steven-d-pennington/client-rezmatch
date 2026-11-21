import { notFound } from "next/navigation";
import { DraftNotice } from "@/components/DraftNotice";
import { Placeholder } from "@/components/Placeholder";
import { prelaunchOnly, site } from "@/lib/site";

// Direction A, "Field notes": one quiet column, the story first.
export default function DirectionA() {
  if (!prelaunchOnly) notFound();
  return (
    <div data-direction="a" className="flex-1">
      <DraftNotice name="Field notes" />
      <main className="mx-auto w-full max-w-xl px-5 py-14">
        <p className="text-sm uppercase tracking-widest text-muted">{site.name}</p>
        <h1 className="mt-4 font-display text-4xl leading-tight">{site.tagline}</h1>
        <p className="mt-6 text-lg leading-relaxed">{site.intro}</p>
        <div className="mt-10">
          <Placeholder label="A portrait or workplace photo from the client" ratio="3 / 2" />
        </div>
        <ol className="mt-12 space-y-8 border-t border-line pt-8">
          {site.offers.map((offer, index) => (
            <li key={offer.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
              <span className="font-display text-xl text-accent">{index + 1}</span>
              <div className="min-w-0">
                <h2 className="font-display text-xl">{offer.title}</h2>
                <p className="mt-1 leading-relaxed text-muted">{offer.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <section className="mt-12 border-t border-line pt-8">
          <h2 className="font-display text-2xl">{site.contact.heading}</h2>
          <p className="mt-2 leading-relaxed">{site.contact.body}</p>
        </section>
      </main>
    </div>
  );
}
