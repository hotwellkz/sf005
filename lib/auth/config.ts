export const PRIVATE_PATHS = ["/portfolios", "/settings", "/billing", "/api/me"] as const;

export function isPrivatePath(pathname: string): boolean {
  return PRIVATE_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export const LOGIN_PATH = "/login";
export const VERIFY_EMAIL_PATH = "/verify-email";
