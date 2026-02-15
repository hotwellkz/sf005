/**
 * Map country names (e.g. from API) to ISO 3166-1 alpha-2 codes.
 * Reuse everywhere for consistent flag display.
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
  Spain: "ES",
  ES: "ES",
  France: "FR",
  FR: "FR",
  Austria: "AT",
  AT: "AT",
  Belgium: "BE",
  BE: "BE",
  Denmark: "DK",
  DK: "DK",
  Finland: "FI",
  FI: "FI",
  Europe: "EU",
  EU: "EU",
};

/**
 * Normalize country name or code to ISO alpha-2 code for flags.
 */
export function toCountryCode(country: string | undefined | null): string {
  if (country == null || country === "") return "US";
  const trimmed = String(country).trim();
  const code = NAME_TO_ISO[trimmed] ?? NAME_TO_ISO[trimmed.toUpperCase()] ?? trimmed.toUpperCase().slice(0, 2);
  return code.length >= 2 ? code.slice(0, 2) : "US";
}

export function isEuCode(code: string): boolean {
  return code.toUpperCase() === "EU";
}
