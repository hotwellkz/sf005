/**
 * "Featured in:" strip — placeholder media/partner logos (fictional names).
 * TODO: Replace with real logos/links when approved for brand use.
 */

const PLACEHOLDER_LOGOS: Array<{ label: string; style: "uppercase" | "mixed" | "thin" }> = [
  { label: "MarketWire", style: "uppercase" },
  { label: "Investing Daily", style: "mixed" },
  { label: "Finimize Pro", style: "mixed" },
  { label: "Kipling Reports", style: "mixed" },
  { label: "BZN Insights", style: "uppercase" },
  { label: "Milano Finance", style: "thin" },
];

function LogoBadge({ label, style }: { label: string; style: "uppercase" | "mixed" | "thin" }) {
  const base = "select-none text-slate-400/90";
  const styleClass =
    style === "uppercase"
      ? "font-extrabold tracking-wide text-sm md:text-base uppercase"
      : style === "thin"
        ? "font-bold tracking-[0.18em] text-xs md:text-sm uppercase"
        : "font-semibold tracking-tight text-sm md:text-base";
  return <span className={`${base} ${styleClass}`}>{label}</span>;
}

export function FeaturedInStrip() {
  return (
    <section className="bg-white py-10 md:py-12" aria-labelledby="featured-in-heading">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 id="featured-in-heading" className="text-center text-sky-600 font-extrabold tracking-tight text-lg md:text-xl">
          Featured in:
        </h2>
        <div
          className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
          aria-label="Placeholder media and partner names"
        >
          {PLACEHOLDER_LOGOS.map(({ label, style }) => (
            <LogoBadge key={label} label={label} style={style} />
          ))}
        </div>
        <div className="mt-8 h-px w-full bg-slate-100" aria-hidden />
      </div>
    </section>
  );
}
