/**
 * Client-side portfolio (localStorage). No server/DB.
 */

const STORAGE_KEY = "stockforge_portfolio_tickers";

export function addTicker(ticker: string): void {
  if (typeof window === "undefined") return;
  const list = listTickers();
  const upper = ticker.toUpperCase();
  if (list.includes(upper)) return;
  list.push(upper);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function removeTicker(ticker: string): void {
  if (typeof window === "undefined") return;
  const list = listTickers().filter((t) => t !== ticker.toUpperCase());
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function listTickers(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((t): t is string => typeof t === "string") : [];
  } catch {
    return [];
  }
}

export function hasTicker(ticker: string): boolean {
  return listTickers().includes(ticker.toUpperCase());
}
