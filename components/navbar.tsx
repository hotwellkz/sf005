import Link from "next/link";
import { ChevronDown, Menu, User, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Top Stocks", href: "#ranking", hasDropdown: true },
  { label: "Trade Ideas", href: "#ranking?tab=trade-ideas" },
  { label: "Pricing", href: "#pricing" },
  { label: "More", href: "#", hasDropdown: true },
  { label: "Portfolios", href: "#portfolios" },
];

export function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10"
      style={{ height: 64, backgroundColor: "#0B1D33" }}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold text-xl tracking-tight"
          >
            StockForge AI
          </Link>
          <span
            className="rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide"
            style={{ backgroundColor: "rgba(29, 116, 198, 0.3)", color: "#93C5FD" }}
          >
            Pro
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <span key={item.label} className="relative group">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/90",
                  "hover:text-white hover:underline underline-offset-4"
                )}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown className="h-4 w-4 opacity-80" />
                )}
              </Link>
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden sm:flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
            aria-label="Portfolios"
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Portfolios</span>
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10"
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-white/10"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
