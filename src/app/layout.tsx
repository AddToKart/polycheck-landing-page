import type { Metadata } from "next";
import { Lora, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { WEB_APP_URL } from "@/lib/config";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(WEB_APP_URL),
  title: "Polycheck — Attendance Management System",
  description:
    "An offline-first attendance management system. Signed QR codes, GPS geofencing, online and in-person sessions, and live analytics for students, faculty and administrators.",
  openGraph: {
    title: "Polycheck — Attendance Management System",
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
