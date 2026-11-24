"use client";

import { useState } from "react";
import { Download, ChevronRight, ShieldCheck, MapPin, Lock, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import DownloadModal from "./DownloadModal";
import { DEMO_QR_PAYLOAD } from "@/lib/config";

export default function Hero() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-[#F8F4ED] dark:bg-[#070709] px-6 md:px-8 py-28 md:py-36 overflow-hidden grain">
        {/* Vertical masthead */}
        <div aria-hidden="true" className="hidden lg:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col items-center gap-5 pointer-events-none">
          <span className="h-16 w-px bg-maroon/25 dark:bg-golden/25" />
          <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-400 dark:text-zinc-500 [writing-mode:vertical-rl]">
            Polycheck · Attendance, Verified
          </span>
          <span className="h-16 w-px bg-maroon/25 dark:bg-golden/25" />
        </div>

        {/* Ambient lighting */}
        <div aria-hidden="true" className="absolute top-0 right-0 w-[560px] h-[560px] translate-x-1/4 -translate-y-1/4 bg-maroon/10 dark:bg-golden/5 rounded-full blur-[130px] pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-0 left-0 w-[420px] h-[420px] -translate-x-1/3 translate-y-1/3 bg-golden/10 dark:bg-golden/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 text-left">
            <span className="kicker mb-6 animate-fade-in-up">Attendance Management System</span>

            <h1 className="font-lora font-bold text-[clamp(3.25rem,9vw,7.5rem)] lg:text-8xl text-zinc-900 dark:text-white leading-[0.9] tracking-[-0.02em] mb-7 animate-fade-in-up delay-100">
              Polycheck<span className="text-maroon dark:text-golden">.</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 font-dmSans max-w-xl leading-relaxed mb-10 animate-fade-in-up delay-200">
              An offline-first attendance system for classrooms. Signed QR codes, GPS geofence validation, online and in-person sessions, and live analytics for students, faculty and administrators.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fade-in-up delay-300">
              <button
                type="button"
                onClick={() => setDownloadModalOpen(true)}
                className="btn-primary"
              >
                <Download className="w-4 h-4" />
                <span>Download APK Package</span>
              </button>
              <a href="#stage" className="btn-ghost">
                <span>Explore Interactive Demo</span>
                <ChevronRight className="w-4 h-4 text-maroon dark:text-golden" />
              </a>
            </div>

            {/* Trust Strip */}
            <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 animate-fade-in-up delay-500">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-maroon dark:text-golden" /> Ed25519 Signed
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-maroon dark:text-golden" /> Haversine Geofence
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-maroon dark:text-golden" /> Anti-Proxy Defense
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Luxe Digital ID Card */}
          <div className="lg:col-span-5 relative">
            {/* Offset hairline frames */}
            <div aria-hidden="true" className="absolute -top-4 -right-4 w-40 h-40 border border-maroon/20 dark:border-golden/20 pointer-events-none" />
            <div aria-hidden="true" className="absolute -bottom-4 -left-4 w-28 h-28 border border-maroon/20 dark:border-golden/20 pointer-events-none" />

            <div className="animate-float">
              <div className="bento-card shadow-2xl overflow-hidden lg:rotate-1 lg:hover:rotate-0 transition-transform duration-500">
                {/* Gold rule */}
                <div aria-hidden="true" className="h-[3px] bg-golden" />

                {/* Header band */}
                <div className="px-6 py-5 bg-maroon dark:bg-maroon-dark flex items-center justify-between">
                  <div>
                    <p className="text-[9px] tracking-[0.3em] text-golden font-mono font-semibold uppercase mb-1">
                      Polycheck
                    </p>
                    <p className="font-lora font-bold text-white text-lg leading-none">
                      Digital Student ID
                    </p>
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-maroon-dark bg-golden px-2.5 py-1.5">
                    VERIFIED
                  </span>
                </div>

                {/* Student details */}
                <div className="p-6 space-y-2.5 text-xs font-dmSans">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-zinc-400 dark:text-zinc-500 font-mono uppercase tracking-wider text-[10px]">Student Name</span>
                    <span className="font-bold text-zinc-900 dark:text-white text-right">Dela Cruz, Juan A.</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-zinc-400 dark:text-zinc-500 font-mono uppercase tracking-wider text-[10px]">Student No.</span>
                    <span className="font-mono font-semibold text-maroon dark:text-golden text-right">2023-01942</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-zinc-400 dark:text-zinc-500 font-mono uppercase tracking-wider text-[10px]">Program</span>
                    <span className="font-semibold text-zinc-900 dark:text-white text-right">BS Information Technology</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-zinc-400 dark:text-zinc-500 font-mono uppercase tracking-wider text-[10px]">Section</span>
                    <span className="font-semibold text-zinc-900 dark:text-white text-right">BSIT 3-1</span>
                  </div>
                </div>

                {/* Scannable QR token */}
                <div className="mx-6 mb-6 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center">
                  <div className="w-full flex items-center justify-between text-[10px] text-maroon dark:text-golden mb-3 font-mono tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <QrCode className="w-3.5 h-3.5" /> Session #802
                    </span>
                    <span>GPS Radius · 40M</span>
                  </div>

                  <div className="relative p-2.5 bg-white shadow-md mb-2">
                    <QRCodeSVG
                      value={DEMO_QR_PAYLOAD}
                      size={150}
                      bgColor="#FFFFFF"
                      fgColor="#7B1113"
                      level="H"
                    />
                    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-golden animate-scan-laser shadow-[0_0_10px_#FFDF00]" />
                  </div>

                  <p className="text-[10px] font-mono text-zinc-500 mt-1">
                    Sample QR · not a live session
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APK Download Drawer Modal */}
      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </>
  );
}
