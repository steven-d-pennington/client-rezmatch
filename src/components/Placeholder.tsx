/**
 * A labeled stand-in for a photo or graphic the client has not supplied yet.
 * Never swap this for a stock or generated image that could be mistaken for
 * the client's own. `npm run check:launch` fails while any Placeholder remains.
 */
export function Placeholder({
  label,
  ratio = "4 / 3",
}: {
  label: string;
  ratio?: string;
}) {
  return (
    <div
      data-placeholder
      role="img"
      aria-label={`Placeholder: ${label}`}
      style={{ aspectRatio: ratio }}
      className="flex w-full items-center justify-center rounded-token border-2 border-dashed border-line bg-surface p-4 text-center text-sm text-muted"
    >
      <span>
        <span className="block font-semibold uppercase tracking-wide">Placeholder</span>
        {label}
      </span>
    </div>
  );
}
