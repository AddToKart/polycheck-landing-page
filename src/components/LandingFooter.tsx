"use client";

import { ShieldCheck, Heart } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="py-16 bg-maroon-dark dark:bg-[#070708] px-6 md:px-8 border-t border-golden/15 text-white grain">
      <div className="max-w-6xl mx-auto text-center">
        {/* Brand mark */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-golden flex items-center justify-center text-maroon-dark font-lora font-bold text-2xl shadow-lg shadow-golden/10">
            P
          </div>
        </div>

        {/* Product */}
        <p className="font-lora font-bold text-base text-golden mb-1">
          Polycheck
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

        {/* Copyright */}
        <p className="text-xs text-white/55 font-dmSans flex items-center justify-center gap-1">
          <span>© 2026 Polycheck · All rights reserved</span>
        </p>
      </div>
    </footer>
  );
}
