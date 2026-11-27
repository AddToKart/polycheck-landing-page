"use client";

import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="py-16 bg-maroon-dark dark:bg-[#070708] px-6 md:px-8 border-t border-golden/15 text-white grain">
      <div className="max-w-6xl mx-auto text-center">
        {/* Brand mark */}
        <div className="flex justify-center mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export serves the file as is */}
          <img src="/logo.png" alt="PolyCheck logo" width={64} height={64} className="w-16 h-16" />
        </div>

        {/* Product */}
        <p className="font-lora font-bold text-base text-golden mb-1">
          PolyCheck
        </p>
        <p className="text-xs text-white/60 mb-6 uppercase tracking-widest font-mono">
          Attendance Management System
        </p>

        {/* Gold rule */}
        <div aria-hidden="true" className="w-16 h-px bg-golden/40 mx-auto mb-6" />

        {/* Version & Metadata */}
        <p className="text-xs text-white/70 mb-2 font-mono">
          Signed QR · GPS Geofence · Offline-First
        </p>

        {/* Legal */}
        <nav aria-label="Legal" className="flex items-center justify-center gap-6 mb-4 text-xs font-dmSans">
          <Link href="/privacy" className="text-white/80 hover:text-golden underline-offset-4 hover:underline transition-colors">
            Privacy Policy
          </Link>
          <span aria-hidden="true" className="text-golden/60">◆</span>
          <Link href="/terms" className="text-white/80 hover:text-golden underline-offset-4 hover:underline transition-colors">
            Terms &amp; Conditions
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-white/55 font-dmSans flex items-center justify-center gap-1">
          <span>© 2026 PolyCheck · All rights reserved</span>
        </p>
      </div>
    </footer>
  );
}
