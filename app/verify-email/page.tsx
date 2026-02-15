"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import { auth } from "@/lib/firebase/client";
import { Navbar } from "@/components/navbar";
import { useToast } from "@/components/ui/toast";

const RESEND_COOLDOWN_SEC = 60;

function VerifyEmailContent() {
  const [checking, setChecking] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const next = searchParams.get("next") ?? "/portfolios";
  const { user, loading, signOut, resendVerificationEmail } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(next)}`);
    }
  }, [loading, user, next, router]);

  const handleCheck = async () => {
    if (!auth?.currentUser) return;
    setChecking(true);
    try {
      await auth.currentUser.reload();
      const updated = auth.currentUser;
      if (updated?.emailVerified) {
        toast.show("Email подтверждён. Добро пожаловать!");
        router.push(next);
      } else {
        toast.show("Письмо ещё не подтверждено. Перейдите по ссылке из письма.");
      }
    } catch {
      toast.show("Ошибка проверки. Попробуйте позже.");
    } finally {
      setChecking(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    await resendVerificationEmail();
    setResendCooldown(RESEND_COOLDOWN_SEC);
  };

  if (loading || !user) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[40vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 py-12">
        <div className="mx-auto max-w-md px-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">Подтвердите email</h1>
            <p className="mt-3 text-slate-600">
              Мы отправили письмо на <strong>{user.email}</strong>. Перейдите по ссылке в письме, чтобы активировать аккаунт.
            </p>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={handleCheck}
                disabled={checking}
                className="w-full rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
              >
                {checking ? "Проверяем…" : "Я подтвердил(а) — проверить"}
              </button>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                {resendCooldown > 0
                  ? `Отправить письмо ещё раз (${resendCooldown} с)`
                  : "Отправить письмо ещё раз"}
              </button>
              <button
                type="button"
                onClick={() => signOut()}
                className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Выйти
              </button>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-slate-500">
            <Link href="/" className="text-sky-600 hover:underline">
              На главную
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

function VerifyEmailFallback() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[40vh] items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
      </main>
    </>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
