# StockForge AI

AI-powered stock rankings and investment insights by StockForge AI. Clone of a ranking UI with real data via external ranking API.

## Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, TailwindCSS, TanStack Table, Recharts, Lucide React
- **Backend:** Next.js API routes (proxy to external ranking API)

## Run

1. Install dependencies and start the dev server.
2. API keys in `.env.local`:
   ```env
   DANELFIN_API_KEY=your_api_key_here
   FINNHUB_API_KEY=your_finnhub_key_here
   ```
3. Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development
- `npm run build` — build
- `npm run start` — production
- `npm run dev:turbo` — dev with Turbopack

## Structure

- `app/` — pages and API routes
- `components/` — Navbar, Hero, Ranking (table, tabs), ScoreRing, CountryChips
- `lib/` — api.ts, types.ts, utils.ts, brand.ts

Ranking data (Top Stocks, ETFs, Trade Ideas) is loaded via `/api/ranking`, `/api/sectors`, `/api/industries`.
