# Danelfin Homepage Clone

Клон главной страницы и раздела ранжирования Danelfin с реальными данными через Danelfin API.

## Стек

- **Frontend:** Next.js 14 (App Router), TypeScript, TailwindCSS, TanStack Table, Recharts, Lucide React
- **Backend:** Next.js API routes (прокси к Danelfin API)

## Запуск

1. Установка зависимостей и запуск dev-сервера уже выполнены.
2. API-ключ задаётся в `.env.local`:
   ```env
   DANELFIN_API_KEY=your_api_key_here
   ```
3. Откройте [http://localhost:3000](http://localhost:3000).

## Скрипты

- `npm run dev` — режим разработки
- `npm run build` — сборка
- `npm run start` — запуск production-сборки

## Структура

- `app/` — страницы и API routes
- `components/` — Navbar, Hero, Ranking (таблица, вкладки), ScoreRing, CountryChips
- `lib/` — api.ts (клиентские вызовы), types.ts, utils.ts

Данные рейтинга (Top Stocks, ETFs, Trade Ideas) загружаются с Danelfin API через прокси `/api/ranking`, `/api/sectors`, `/api/industries`.
