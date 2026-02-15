"use client";

import { RequireAuth } from "@/lib/auth/RequireAuth";
import { Navbar } from "@/components/navbar";

export default function PortfoliosPage() {
  return (
    <RequireAuth>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-8">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-2xl font-bold text-slate-900">Portfolios</h1>
          <p className="mt-2 text-slate-600">Private page — only for verified users.</p>
        </div>
      </main>
    </RequireAuth>
  );
}
