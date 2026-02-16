"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";

const STORAGE_KEY = "auth-gate-dismissed";
const ALLOWLIST = ["/login", "/verify-email", "/privacy", "/terms"];
const MS_24H = 24 * 60 * 60 * 1000;
const DELAY_MS = 10 * 1000; // 10 секунд до показа модалки

export type AuthGateVariant = "session" | "24h";

function getDismissed(variant: AuthGateVariant): boolean {
  if (typeof window === "undefined") return false;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  if (variant === "session") return true;
  const ts = Number(raw);
  if (Number.isNaN(ts)) return false;
  return Date.now() - ts < MS_24H;
}

function isAllowlisted(pathname: string): boolean {
  return ALLOWLIST.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function useAuthGate(variant: AuthGateVariant = "24h") {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);
  const [delayPassed, setDelayPassed] = useState(false);

  useEffect(() => {
    setDismissed(getDismissed(variant));
    setReady(true);
  }, [variant, pathname]);

  // Запускаем таймер 10 сек сразу при заходе на страницу (если не allowlist)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isAllowlisted(pathname)) {
      setDelayPassed(false);
      return;
    }
    const t = setTimeout(() => setDelayPassed(true), DELAY_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  const showGate =
    ready &&
    delayPassed &&
    !loading &&
    user === null &&
    !isAllowlisted(pathname) &&
    !dismissed;

  const dismiss = useCallback(() => {
    if (typeof window === "undefined") return;
    if (variant === "session") {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } else {
      sessionStorage.setItem(STORAGE_KEY, String(Date.now()));
    }
    setDismissed(true);
  }, [variant]);

  return { showGate, dismiss };
}
