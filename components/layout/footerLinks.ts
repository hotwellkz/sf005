/**
 * Footer link groups for SiteFooter. All paths are placeholders where pages may not exist yet.
 */

export const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "API Plans", href: "/api" },
  { label: "Reviews", href: "/reviews" },
  { label: "Help Center", href: "/help" },
  { label: "Blog", href: "/blog" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Affiliate Program", href: "/affiliate" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact Us", href: "/contact" },
  { label: "Log in", href: "/login" },
] as const;

export const rankingLinks = [
  { label: "Top US Stocks", href: "/rankings?market=US" },
  { label: "Top European Stocks", href: "/rankings?market=EU" },
  { label: "Top UK Stocks", href: "/rankings?market=UK" },
  { label: "Top German Stocks", href: "/rankings?market=DE" },
  { label: "Top French Stocks", href: "/rankings?market=FR" },
  { label: "Top Italian Stocks", href: "/rankings?market=IT" },
  { label: "Top Swiss Stocks", href: "/rankings?market=CH" },
  { label: "Top Spanish Stocks", href: "/rankings?market=ES" },
  { label: "Top Dutch Stocks", href: "/rankings?market=NL" },
  { label: "Top Canadian Stocks", href: "/rankings?market=CA" },
  { label: "Top Chinese Stocks", href: "/rankings?market=CN" },
  { label: "Top Brazilian Stocks", href: "/rankings?market=BR" },
] as const;

export const indexLinks = [
  { label: "All Stocks", href: "/stocks" },
  { label: "All ETFs", href: "/etfs" },
] as const;

export const popularSearches = [
  { label: "Is Tesla a Buy?", href: "/stocks/TSLA" },
  { label: "Is Amazon a Buy?", href: "/stocks/AMZN" },
  { label: "Is Apple a Buy?", href: "/stocks/AAPL" },
  { label: "View all →", href: "/stocks" },
] as const;

export const popularComparisons = [
  { label: "AMD vs Intel", href: "/compare/AMD-INTC" },
  { label: "Visa vs MasterCard", href: "/compare/V-MA" },
  { label: "Fedex vs UPS", href: "/compare/FDX-UPS" },
  { label: "View all →", href: "/compare" },
] as const;

export const popularThemes = [
  { label: "AI in Healthcare Stocks", href: "/themes/ai-healthcare" },
  { label: "Copper Stocks", href: "/themes/copper" },
  { label: "Drone Technology Stocks", href: "/themes/drones" },
  { label: "View all →", href: "/themes" },
] as const;

export const azLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
export const azDigits = "0-9";
