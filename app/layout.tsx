import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { AuthGateGate } from "@/components/auth/AuthGateGate";

export const metadata: Metadata = {
  title: "StockForge AI",
  description:
    "AI-powered stock rankings and investment insights by StockForge AI",
  applicationName: "StockForge AI",
  appleWebApp: {
    title: "StockForge AI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="StockForge AI" />
        <meta name="apple-mobile-web-app-title" content="StockForge AI" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <ToastProvider>
            {children}
            <SiteFooter />
            <AuthGateGate />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
