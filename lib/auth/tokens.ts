/**
 * Auth UI design tokens — single source of truth for login/signup styling.
 */
export const authTokens = {
  brand: {
    name: "StockForge AI",
    logoVariant: "inline-svg" as const,
    accent: "#1D9BF0",
  },
  page: {
    bg: {
      type: "radial+linear" as const,
      colors: ["#0B1B35", "#0A2A5B", "#07162B"],
    },
    layout: {
      maxWidth: 420,
      cardRadius: 12,
      cardShadow: "0 18px 50px rgba(0,0,0,0.22)",
    },
  },
  typography: {
    title: "Member Login",
    subtitle: null as string | null,
  },
  controls: {
    primaryButton: {
      bg: "#1D9BF0",
      hoverBg: "#1788D6",
      textColor: "#FFFFFF",
      radius: 8,
      height: 44,
    },
    input: {
      radius: 8,
      border: "#D8DEE8",
      focusRing: "#1D9BF0",
      bg: "#FFFFFF",
    },
    mutedText: "#6B7280",
    dividerText: "or",
  },
  copy: {
    googleBtn: "Continue with Google",
    emailLabel: "Email address",
    emailPlaceholder: "e.g. you@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "e.g. ••••••••",
    forgotPassword: "Forgot password?",
    submit: "Log in",
    noAccount: "Not a member?",
    createAccount: "Create a free account",
    legal: "By using StockForge AI you agree to our Terms of Use and Privacy Policy",
  },
} as const;
