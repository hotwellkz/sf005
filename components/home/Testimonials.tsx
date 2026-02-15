"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  country: string;
  role?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "StockForge AI helps me quickly screen ideas with the AI Score and signals. I use the watchlist to track risk and decide when to add or trim positions. Clear explanations, no clutter.",
    name: "Garrett S.",
    country: "USA",
    role: "Long-term investor",
  },
  {
    quote:
      "I check StockForge AI every week. The AI Score and fundamental breakdown make it easier to compare names and spot when something might be over- or under-priced relative to the signals.",
    name: "Elena M.",
    country: "Spain",
    role: "Independent investor",
  },
  {
    quote:
      "Using StockForge AI for research has improved how I manage my portfolio. I rely on the scores and risk view to time entries and exits. It’s a solid research tool, not a crystal ball.",
    name: "James K.",
    country: "UK",
    role: "Retail investor",
  },
  {
    quote:
      "StockForge AI gives me a clear view of AI Score and technical signals in one place. I use it to narrow down ideas and then do my own homework. Straightforward and useful.",
    name: "Sofia L.",
    country: "Germany",
    role: "Swing trader",
  },
  {
    quote:
      "I like that StockForge AI focuses on signals and scores without promising returns. It supports my process for finding and monitoring positions. The interface is clean and easy to use.",
    name: "Marcus T.",
    country: "Canada",
    role: "Part-time investor",
  },
];

const AUTOPLAY_MS = 7000;

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLElement>) => {
    if (!sectionRef.current?.contains(e.relatedTarget as Node)) {
      setIsPaused(false);
    }
  }, []);

  const goTo = useCallback((targetIndex: number) => {
    const len = TESTIMONIALS.length;
    setCurrentIndex(((targetIndex % len) + len) % len);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, [prev, next]);

  const t = TESTIMONIALS[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="bg-white py-16 md:py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={handleBlur}
      aria-label="User testimonials"
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-sky-600 md:text-5xl">
          What Our Users Say
        </h2>
        <p className="mt-4 text-base text-slate-500 md:text-lg">
          Trusted by independent investors worldwide
        </p>

        <div className="relative mt-10 md:mt-12">
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition hover:border-slate-300 hover:text-slate-600 md:left-2"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition hover:border-slate-300 hover:text-slate-600 md:right-2"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <blockquote className="px-12 md:px-16">
            <p className="mt-4 text-lg leading-relaxed italic text-slate-600 md:mt-0 md:text-2xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-8 text-base font-semibold text-slate-700 md:text-lg">
              {t.name} — {t.country}
            </footer>
          </blockquote>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3" role="tablist" aria-label="Testimonial navigation">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === currentIndex ? "bg-sky-600" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <p className="mt-10 text-xs text-slate-400">
          StockForge AI provides research tools, not investment advice.
        </p>
      </div>
    </section>
  );
}
