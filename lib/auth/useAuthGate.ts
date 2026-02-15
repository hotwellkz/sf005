"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";

const STORAGE_KEY = "auth-gate-dismissed";
const ALLOWLIST = ["/login", "/verify-email", "/privacy", "/terms"];
const MS_24H = 24 * 60 * 60 * 1000;

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

export function useAuthGate(variant: AuthGateVariant = "24h") {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDismissed(getDismissed(variant));
    setReady(true);
  }, [variant, pathname]);

  const showGate =
    ready &&
    !loading &&
    user === null &&
    !ALLOWLIST.some((p) => pathname === p || pathname.startsWith(p + "/")) &&
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
