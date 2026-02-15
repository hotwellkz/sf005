"use client";

import { useAuthGate } from "@/lib/auth/useAuthGate";
import { AuthGateModal } from "./AuthGateModal";

const AUTH_GATE_VARIANT: "session" | "24h" = "24h";

/**
 * Renders AuthGateModal when user is not signed in and not on an allowlisted page.
 * Dismissal is stored in sessionStorage (session = until tab close, 24h = 24 hours).
 */
export function AuthGateGate() {
  const { showGate, dismiss } = useAuthGate(AUTH_GATE_VARIANT);

  return (
    <AuthGateModal open={showGate} onClose={dismiss} />
  );
}
