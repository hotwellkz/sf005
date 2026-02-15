"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import { LOGIN_PATH, VERIFY_EMAIL_PATH, isPrivatePath } from "@/lib/auth/config";

type RequireAuthProps = {
  children: React.ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const { user, loading, isVerified } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!isPrivatePath(pathname)) return;

    if (!user) {
      router.replace(`${LOGIN_PATH}?next=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!isVerified) {
      router.replace(`${VERIFY_EMAIL_PATH}?next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, isVerified, pathname, router]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  if (!user || !isVerified) {
    return null;
  }

  return <>{children}</>;
}
