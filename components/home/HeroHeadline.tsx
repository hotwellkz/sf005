export function HeroHeadline() {
  return (
    <section className="bg-white pt-16 pb-10 md:pt-20 md:pb-12" aria-labelledby="hero-heading">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h1
          id="hero-heading"
          className="text-center text-sky-600 font-extrabold tracking-tight text-4xl md:text-6xl leading-[1.05]"
        >
          Start Making Smarter Investment Decisions
        </h1>
        <div className="mt-5 flex justify-center">
          <p className="max-w-3xl text-center text-slate-600 text-base md:text-xl leading-relaxed">
            StockForge AI helps you discover high-quality opportunities and manage your portfolio with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
