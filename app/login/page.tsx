"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import { authTokens } from "@/lib/auth/tokens";
import { AuthCard } from "@/components/auth/AuthCard";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { TextInput } from "@/components/auth/TextInput";
import { StockForgeLogo } from "@/components/auth/StockForgeLogo";

const {
  page,
  typography,
  controls,
  copy,
} = authTokens;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/portfolios";
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, sendPasswordReset } = useAuth();

  const canSubmit = email.trim().length > 0 && password.length >= (isSignUp ? 6 : 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setBusy(true);
    try {
      if (isSignUp) {
        const err = await signUpWithEmail(email.trim(), password);
        if (err) setFormError(err);
      } else {
        const err = await signInWithEmail(email.trim(), password);
        if (err) setFormError(err);
      }
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setFormError(null);
    setBusy(true);
    try {
      await signInWithGoogle();
    } finally {
      setBusy(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setFormError("Enter your email address first.");
      return;
    }
    setFormError(null);
    setBusy(true);
    try {
      const err = await sendPasswordReset(email.trim());
      if (err) setFormError(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-4 py-12"
      style={{
        background: `radial-gradient(ellipse 80% 80% at 50% 0%, ${page.bg.colors[1]}, ${page.bg.colors[0]}), linear-gradient(180deg, ${page.bg.colors[0]} 0%, ${page.bg.colors[2]} 100%)`,
      }}
    >
      <AuthCard className="p-8">
        <div className="flex flex-col items-center">
          <StockForgeLogo className="h-8 text-gray-900" />
          <h1 className="mt-6 text-xl font-semibold text-gray-900">
            {isSignUp ? "Create account" : typography.title}
          </h1>
        </div>

        <div className="mt-6">
          <GoogleButton onClick={handleGoogle} disabled={busy} />
        </div>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">{controls.dividerText}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <TextInput
            id="login-email"
            label={copy.emailLabel}
            type="email"
            placeholder={copy.emailPlaceholder}
            value={email}
            onChange={setEmail}
            required
            autoComplete="email"
            disabled={busy}
          />
          <TextInput
            id="login-password"
            label={copy.passwordLabel}
            type="password"
            placeholder={copy.passwordPlaceholder}
            value={password}
            onChange={setPassword}
            required
            minLength={isSignUp ? 6 : undefined}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            disabled={busy}
          />
          {!isSignUp && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={busy}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none focus:underline disabled:opacity-60"
                style={{ color: controls.mutedText }}
              >
                {copy.forgotPassword}
              </button>
            </div>
          )}
          {formError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {formError}
            </p>
          )}
          <button
            type="submit"
            disabled={busy || !canSubmit}
            className="w-full font-semibold text-white transition-colors hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D9BF0] disabled:opacity-60"
            style={{
              borderRadius: controls.primaryButton.radius,
              height: controls.primaryButton.height,
              backgroundColor: controls.primaryButton.bg,
            }}
          >
            {busy ? (
              <span className="inline-flex items-center gap-2">
                <Spinner className="h-4 w-4" />
                {isSignUp ? "Creating account…" : "Signing in…"}
              </span>
            ) : isSignUp ? (
              "Create account"
            ) : (
              copy.submit
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: controls.mutedText }}>
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => { setIsSignUp(false); setFormError(null); }}
                className="font-medium text-gray-900 underline hover:no-underline focus:outline-none focus:underline"
                style={{ color: page.bg.colors[1] }}
              >
                Log in
              </button>
            </>
          ) : (
            <>
              {copy.noAccount}{" "}
              <button
                type="button"
                onClick={() => { setIsSignUp(true); setFormError(null); }}
                className="font-medium underline hover:no-underline focus:outline-none focus:underline"
                style={{ color: page.bg.colors[1] }}
              >
                {copy.createAccount}
              </button>
            </>
          )}
        </p>

        <p className="mt-6 text-center text-xs" style={{ color: controls.mutedText }}>
          By using StockForge AI you agree to our{" "}
          <Link href="/terms" className="underline hover:no-underline focus:outline-none focus:underline">Terms of Use</Link>
          {" "}and{" "}
          <Link href="/privacy" className="underline hover:no-underline focus:outline-none focus:underline">Privacy Policy</Link>.
        </p>
      </AuthCard>
    </main>
  );
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className ?? ""}`} viewBox="0 0 24 24" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

function LoginFallback() {
  return (
    <main
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        background: `radial-gradient(ellipse 80% 80% at 50% 0%, ${page.bg.colors[1]}, ${page.bg.colors[0]}), linear-gradient(180deg, ${page.bg.colors[0]} 0%, ${page.bg.colors[2]} 100%)`,
      }}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
