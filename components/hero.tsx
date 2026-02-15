import Link from "next/link";
import { Search } from "lucide-react";

const popularTickers = [
  { label: "Apple", ticker: "AAPL" },
  { label: "Tesla", ticker: "TSLA" },
  { label: "Amazon", ticker: "AMZN" },
  { label: "Microsoft", ticker: "MSFT" },
  { label: "Alphabet", ticker: "GOOGL" },
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden px-6 pb-16 pt-12 md:pt-16"
      style={{
        background: "linear-gradient(180deg, #0B1D33 0%, #132B4A 100%)",
      }}
    >
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-center">
          <h1
            className="text-4xl font-extrabold tracking-tight text-white md:text-5xl"
            style={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}
          >
            AI-Powered Stock Picking
          </h1>
          <p className="mt-4 max-w-lg text-base leading-6 text-white/80">
            Invest with the odds in your favor. Get unique insights, boost your
            portfolios, and make smart data-driven investment decisions.
          </p>
          <div className="mt-8">
            <div
              className="flex h-11 w-full max-w-xl items-center gap-3 rounded-xl border border-white/10 bg-white px-4 shadow-sm"
              style={{ borderRadius: 12 }}
            >
              <Search className="h-5 w-5 shrink-0 text-gray-400" />
              <input
                type="search"
                placeholder="Search stocks, ETFs, or investment themes for AI analysis"
                className="flex-1 bg-transparent text-gray-900 placeholder:text-gray-500 outline-none"
                aria-label="Search stocks and ETFs"
              />
            </div>
            <p className="mt-4 text-sm text-white/70">
              Popular stocks:{" "}
              {popularTickers.map((t, i) => (
                <span key={t.ticker}>
                  <Link
                    href={`#ranking?ticker=${t.ticker}`}
                    className="font-medium text-white/90 underline-offset-2 hover:underline"
                  >
                    {t.label}
                  </Link>
                  {i < popularTickers.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="relative flex items-center justify-center lg:justify-end">
          <div
            className="relative h-[320px] w-[200px] rounded-[24px] border border-white/10 bg-gray-900/50 shadow-xl md:h-[400px] md:w-[240px]"
            style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)" }}
          >
            <div className="absolute inset-2 rounded-[18px] bg-gray-800/80 flex items-center justify-center text-white/50 text-sm">
              Phone mockup
            </div>
            <div
              className="absolute -right-4 top-1/4 rounded-xl border border-white/20 px-3 py-2 text-xs font-medium text-white"
              style={{ backgroundColor: "#0F172A" }}
            >
              Award badge
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
