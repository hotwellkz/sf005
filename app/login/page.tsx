"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import { Navbar } from "@/components/navbar";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [busy, setBusy] = useState(false);
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/portfolios";
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (isSignUp) await signUpWithEmail(email, password);
      else await signInWithEmail(email, password);
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    try {
      await signInWithGoogle();
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="mx-auto max-w-md px-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
              {isSignUp ? "Регистрация" : "Вход"}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {isSignUp
                ? "Создайте аккаунт. После регистрации нужно подтвердить email."
                : "Войдите в StockForge AI"}
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Пароль
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                {isSignUp && (
                  <p className="mt-1 text-xs text-slate-500">Минимум 6 символов</p>
                )}
              </div>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
              >
                {busy ? "..." : isSignUp ? "Зарегистрироваться" : "Войти"}
              </button>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-slate-500">или</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleGoogle}
                disabled={busy}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Войти через Google
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-slate-600">
              {isSignUp ? (
                <>
                  Уже есть аккаунт?{" "}
                  <button type="button" onClick={() => setIsSignUp(false)} className="font-medium text-sky-600 hover:underline">
                    Войти
                  </button>
                </>
              ) : (
                <>
                  Нет аккаунта?{" "}
                  <button type="button" onClick={() => setIsSignUp(true)} className="font-medium text-sky-600 hover:underline">
                    Зарегистрироваться
                  </button>
                </>
              )}
            </p>
          </div>
          <p className="mt-4 text-center text-sm text-slate-500">
            <Link href="/" className="text-sky-600 hover:underline">На главную</Link>
          </p>
        </div>
      </main>
    </>
  );
}

function LoginFallback() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[40vh] items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
      </main>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
