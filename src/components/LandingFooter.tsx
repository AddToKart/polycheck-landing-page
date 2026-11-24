"use client";

import { ShieldCheck, Heart } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="py-16 bg-maroon-dark dark:bg-[#070708] px-6 md:px-8 border-t border-golden/15 text-white grain">
      <div className="max-w-6xl mx-auto text-center">
        {/* PUP Emblem Crest */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-golden flex items-center justify-center text-maroon-dark font-lora font-bold text-2xl shadow-lg shadow-golden/10">
            P
          </div>
        </div>

        {/* Institution */}
        <p className="font-lora font-bold text-base text-golden mb-1">
          Polytechnic University of the Philippines
        </p>
        <p className="text-xs text-white/60 mb-6 uppercase tracking-widest font-mono">
          Republic of the Philippines · Santa Maria, Bulacan
        </p>

        {/* Gold rule */}
        <div aria-hidden="true" className="w-16 h-px bg-golden/40 mx-auto mb-6" />

        {/* Version & Metadata */}
        <p className="text-xs text-white/70 mb-2 font-mono">
          Polycheck · Attendance Management System
        </p>

        {/* Copyright */}
        <p className="text-xs text-white/55 font-dmSans flex items-center justify-center gap-1">
          <span>© 2026 Polycheck · Built for</span>
          <span className="text-golden font-semibold">Iskolar ng Bayan</span>
        </p>
      </div>
    </footer>
  );
}
