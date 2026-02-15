"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  User,
  LayoutGrid,
  Settings,
  CreditCard,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { cn } from "@/lib/utils";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { user, isVerified, signOut } = useAuth();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current?.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!user) return null;

  const displayName = user.displayName || user.email?.split("@")[0] || "User";
  const planLabel = "Pro"; // TODO: from Firestore plan

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden ring-1 ring-white/15 hover:ring-white/30 transition"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Profile menu"
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt="" className="h-full w-full object-cover" />
        ) : (
          <User className="h-5 w-5 text-white/90" />
        )}
      </button>
      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-3 w-[320px] rounded-2xl bg-gradient-to-b from-[#13294B] to-[#0E1F3C] shadow-2xl ring-1 ring-white/10 overflow-hidden z-50"
        >
          <div className="px-5 pt-5 pb-4">
            <p className="text-base font-semibold text-white">{displayName}</p>
            <p className="mt-1 text-sm text-white/70">{user.email}</p>
            <p className="mt-2 text-sm text-white/75">
              План: <span className="text-amber-300 font-medium">{planLabel}</span>
            </p>
            {!isVerified && (
              <p className="mt-1 text-xs text-amber-400/90">Email не подтверждён</p>
            )}
          </div>
          <div className="h-px bg-white/10" />
          <Link
            href="/portfolios"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-5 py-3 text-sm text-white/85 hover:bg-white/5 transition"
          >
            <LayoutGrid className="h-5 w-5 text-white/60 shrink-0" />
            Portfolios
          </Link>
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-5 py-3 text-sm text-white/85 hover:bg-white/5 transition"
          >
            <Settings className="h-5 w-5 text-white/60 shrink-0" />
            Settings
          </Link>
          <Link
            href="/billing"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-5 py-3 text-sm text-white/85 hover:bg-white/5 transition"
          >
            <CreditCard className="h-5 w-5 text-white/60 shrink-0" />
            Billing
          </Link>
          <div className="h-px bg-white/10" />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="flex w-full items-center gap-3 px-5 py-3 text-sm text-white/85 hover:bg-white/5 transition"
          >
            <LogOut className="h-5 w-5 text-white/50 shrink-0" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
