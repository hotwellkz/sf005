/**
 * Map country names (e.g. from Finnhub profile2) to ISO 3166-1 alpha-2 codes.
 * Used for consistent flag display. No default to US — use toCountryCodeOrNull for API data.
 * Example tickers (Finnhub profile2.country): SAN->ES, BCS->GB, BTG->CA, GGB->BR.
 */
const NAME_TO_ISO: Record<string, string> = {
  "United States": "US",
  "United States of America": "US",
  USA: "US",
  US: "US",
  Canada: "CA",
  CA: "CA",
  "United Kingdom": "GB",
  UK: "GB",
  GB: "GB",
  "Great Britain": "GB",
  Spain: "ES",
  ES: "ES",
  France: "FR",
  FR: "FR",
  Germany: "DE",
  DE: "DE",
  Italy: "IT",
  IT: "IT",
  Netherlands: "NL",
  NL: "NL",
  Switzerland: "CH",
  CH: "CH",
  Austria: "AT",
  AT: "AT",
  Belgium: "BE",
  BE: "BE",
  Denmark: "DK",
  DK: "DK",
  Finland: "FI",
  FI: "FI",
  Sweden: "SE",
  SE: "SE",
  Norway: "NO",
  NO: "NO",
  Ireland: "IE",
  IE: "IE",
  Portugal: "PT",
  PT: "PT",
  Poland: "PL",
  PL: "PL",
  Brazil: "BR",
  BR: "BR",
  "Korea, Republic of": "KR",
  "South Korea": "KR",
  KR: "KR",
  "Russian Federation": "RU",
  Russia: "RU",
  RU: "RU",
  China: "CN",
  CN: "CN",
  Japan: "JP",
  JP: "JP",
  India: "IN",
  IN: "IN",
  Australia: "AU",
  AU: "AU",
  Mexico: "MX",
  MX: "MX",
  Argentina: "AR",
  AR: "AR",
  Chile: "CL",
  CL: "CL",
  Colombia: "CO",
  CO: "CO",
  "South Africa": "ZA",
  ZA: "ZA",
  Israel: "IL",
  IL: "IL",
  Turkey: "TR",
  TR: "TR",
  "Hong Kong": "HK",
  HK: "HK",
  Singapore: "SG",
  SG: "SG",
  Taiwan: "TW",
  TW: "TW",
  Europe: "EU",
  EU: "EU",
};

/** Match 2-letter uppercase (ISO 3166-1 alpha-2). */
function isIso2(s: string): boolean {
  return /^[A-Z]{2}$/.test(s);
}

/**
 * Normalize country name or code to ISO alpha-2, or null if empty/unrecognized.
 * Use this for API-sourced country so we never default to US.
 */
export function toCountryCodeOrNull(country: string | undefined | null): string | null {
  if (country == null || String(country).trim() === "") return null;
  const trimmed = String(country).trim();
  const byName = NAME_TO_ISO[trimmed] ?? NAME_TO_ISO[trimmed.toUpperCase()];
  if (byName) return byName;
  const two = trimmed.toUpperCase().slice(0, 2);
  if (two.length === 2 && isIso2(two)) return two;
  return null;
}

/**
 * Normalize country to ISO alpha-2 for display (e.g. FlagIcon).
 * When code is already valid, returns it; otherwise null. No US default.
 */
export function toCountryCode(country: string | undefined | null): string | null {
  return toCountryCodeOrNull(country);
}

export function isEuCode(code: string): boolean {
  return code.toUpperCase() === "EU";
}
