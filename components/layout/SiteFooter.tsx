"use client";

import Link from "next/link";
import {
  Linkedin,
  Facebook,
  Twitter,
} from "lucide-react";
import {
  companyLinks,
  rankingLinks,
  indexLinks,
  popularSearches,
  popularComparisons,
  popularThemes,
  azLetters,
  azDigits,
} from "./footerLinks";

const SOCIAL = [
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "X (Twitter)", href: "https://x.com", Icon: Twitter },
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-[#182B49] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Top: logo + columns */}
        <div className="pt-12 pb-10 grid gap-10 lg:grid-cols-12">
          {/* Left column */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Link href="/" className="text-xl font-extrabold tracking-tight text-white">
                StockForge AI
              </Link>
              <p className="mt-1 text-sm text-white/60">Smart investing made easy</p>
            </div>
            <p className="max-w-sm text-sm text-white/60 leading-relaxed">
              StockForge AI delivers AI-powered stock analytics and rankings to help you discover opportunities and track your portfolio with clarity—no black box, no hype.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 inline-block">
              <span className="text-xs font-semibold text-white/70">Award / Featured</span>
              <p className="mt-0.5 text-[11px] text-white/50">Placeholder — replace with asset</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-white/80 uppercase tracking-wide">HQ</p>
                <p className="mt-1 text-sm text-white/60">Address placeholder</p>
                <p className="text-sm text-white/60">City, Country</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-white/80 uppercase tracking-wide">Office</p>
                <p className="mt-1 text-sm text-white/60">Office address placeholder</p>
                <p className="text-sm text-white/60">City, Country</p>
              </div>
            </div>
          </div>

          {/* Right: 3 columns */}
          <div className="lg:col-span-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Company */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white/80">Company</h3>
              <ul className="space-y-2">
                {companyLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-white/70 hover:text-white transition">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stock Rankings + Index */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white/80">Stock Rankings</h3>
                <ul className="space-y-2">
                  {rankingLinks.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-white/70 hover:text-white transition">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white/80">Index</h3>
                <ul className="space-y-2">
                  {indexLinks.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-white/70 hover:text-white transition">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Popular Searches, Comparisons, Themes */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white/80">Popular Searches</h3>
                <ul className="space-y-2">
                  {popularSearches.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-white/70 hover:text-white transition">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white/80">Popular Comparisons</h3>
                <ul className="space-y-2">
                  {popularComparisons.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-white/70 hover:text-white transition">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white/80">Popular Investment Themes</h3>
                <ul className="space-y-2">
                  {popularThemes.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-white/70 hover:text-white transition">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* A–Z bar */}
        <div className="mt-10">
          <div className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-sm font-semibold text-white/80">All Stocks:</span>
            {azLetters.map((letter) => (
              <Link
                key={letter}
                href={`/stocks?letter=${letter}`}
                className="text-xs text-white/70 hover:text-white transition"
              >
                {letter}
              </Link>
            ))}
            <Link
              href="/stocks?letter=0-9"
              className="text-xs text-white/70 hover:text-white transition"
            >
              {azDigits}
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-10 text-xs leading-relaxed text-white/55 max-w-4xl">
          StockForge AI provides analytics and tools for informational purposes only; this is not financial or investment advice. Past performance does not guarantee future results. Use our platform at your own risk and consult a qualified professional for personal financial decisions.{" "}
          <Link href="/terms" className="text-white/70 hover:text-white underline">Terms of Use</Link>
          {" · "}
          <Link href="/privacy" className="text-white/70 hover:text-white underline">Privacy Policy</Link>
          {" · "}
          <Link href="/disclaimer" className="text-white/70 hover:text-white underline">Disclaimer</Link>
          {" · "}
          <Link href="/cookies" className="text-white/70 hover:text-white underline">Cookie Policy</Link>
        </p>

        <div className="mt-8 border-t border-white/10" aria-hidden />

        {/* Bottom row */}
        <div className="py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded border border-white/20 px-2 py-1 text-[10px] font-semibold text-white/60">
              Placeholder
            </span>
            <span className="rounded border border-white/20 px-2 py-1 text-[10px] font-semibold text-white/60">
              Badge
            </span>
          </div>
          <div className="flex items-center gap-2">
            {SOCIAL.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition"
                aria-label={label}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
