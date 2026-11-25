/**
 * Single source of truth for every external link on the landing page.
 *
 * The APK permalink is maintained on the monorepo's GitHub Releases: the
 * `polycheck-release.apk` asset on the release marked "latest" is what
 * visitors get, so this page never needs a redeploy when a new APK ships.
 */
export const GITHUB_REPO = "AddToKart/polycheck";

export const APK_FILE = "polycheck-release.apk";
export const APK_URL = `https://github.com/${GITHUB_REPO}/releases/latest/download/${APK_FILE}`;
export const RELEASES_PAGE = `https://github.com/${GITHUB_REPO}/releases`;
export const LATEST_RELEASE_API = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;

/** Production web dashboard (faculty, admins, students). */
export const WEB_APP_URL =
  process.env.NEXT_PUBLIC_WEB_APP_URL ?? "https://app.polycheck.live";

/** This landing page's own public address (canonical / Open Graph base). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://polycheck.live";

/** Inert payload for the decorative demo QR codes — not a URL, not a real token. */
export const DEMO_QR_PAYLOAD = "POLYCHECK-DEMO-QR (sample only, not a real session)";
