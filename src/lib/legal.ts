/**
 * Shared metadata for the Privacy Policy and Terms pages.
 * Bump LEGAL_UPDATED whenever either document changes materially.
 */
export const LEGAL_UPDATED = "November 26, 2026";
export const LEGAL_VERSION = "1.2";

/**
 * Optional public contact for privacy requests (set at build time).
 * When empty, the pages tell users to contact their institution's PolyCheck
 * administrator or Data Protection Officer instead.
 */
export const PRIVACY_CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_PRIVACY_CONTACT_EMAIL?.trim() ?? "";
