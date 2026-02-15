"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthProvider";
import { UserMenu } from "./UserMenu";

export function NavbarAuth() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-9 w-9 rounded-full border border-white/20 bg-white/5 animate-pulse" />
    );
  }

  if (user) {
    return <UserMenu />;
  }

  return (
    <Link
      href="/login"
      className="flex h-9 items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 text-sm font-medium text-white/90 hover:bg-white/10"
    >
      Войти
    </Link>
  );
}
