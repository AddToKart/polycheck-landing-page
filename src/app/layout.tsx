import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE_URL } from "@/lib/config";

// Fonts are self-hosted from @fontsource (Latin subset) so the build never
// depends on fetching Google Fonts at build time.
const lora = localFont({
  variable: "--font-lora",
  display: "swap",
  src: [
    { path: "../../node_modules/@fontsource/lora/files/lora-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/lora/files/lora-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

const dmSans = localFont({
  variable: "--font-dm-sans",
  display: "swap",
  src: [
    { path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

const dmMono = localFont({
  variable: "--font-dm-mono",
  display: "swap",
  src: [{ path: "../../node_modules/@fontsource/dm-mono/files/dm-mono-latin-400-normal.woff2", weight: "400", style: "normal" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "PolyCheck — Attendance Management System",
  description:
    "An offline-first attendance management system. Signed QR codes, GPS geofencing, online and in-person sessions, and live analytics for students, faculty and administrators.",
  openGraph: {
    title: "PolyCheck — Attendance Management System",
    description:
      "Signed QR codes. GPS geofencing. Offline-first. Attendance that is hard to fake and easy to run.",
  },
  other: {
    "theme-color": "#7B1113",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lora.variable} ${dmSans.variable} ${dmMono.variable} font-dmSans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
