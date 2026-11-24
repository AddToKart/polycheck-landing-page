"use client";

import { useState, useEffect } from "react";
import { QrCode, MapPin, WifiOff, ShieldCheck, RefreshCw, CheckCircle2, Clock, Smartphone, Monitor } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function DeviceMockup() {
  const [activeTab, setActiveTab] = useState<"qr" | "gps" | "offline">("qr");
  const [timeLeft, setTimeLeft] = useState(124); // 2:04 timer
  const [sessionToken, setSessionToken] = useState("https://polycheck.app/verify?session=PUP-BSIT-31-802&token=ed25519_9a8f4c2e1b");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 180));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full">
      {/* Interactive Mode Switches */}
      <div className="flex items-center justify-center gap-2 mb-6 p-1.5 rounded-2xl bg-zinc-200/80 dark:bg-zinc-800/60 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("qr")}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "qr"
              ? "bg-white dark:bg-zinc-900 text-maroon dark:text-golden shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <QrCode className="w-3.5 h-3.5" /> Scannable QR
        </button>
        <button
          onClick={() => setActiveTab("gps")}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "gps"
              ? "bg-white dark:bg-zinc-900 text-maroon dark:text-golden shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <MapPin className="w-3.5 h-3.5" /> GPS Radar
        </button>
        <button
          onClick={() => setActiveTab("offline")}
          className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "offline"
              ? "bg-white dark:bg-zinc-900 text-maroon dark:text-golden shadow-sm"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <WifiOff className="w-3.5 h-3.5" /> Offline Queue
        </button>
      </div>

      {/* Main Mockup Frame */}
      <div className="relative mx-auto max-w-lg rounded-3xl p-4 bg-zinc-900 border border-zinc-800 shadow-2xl shadow-maroon/10 text-white overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 text-xs text-zinc-400 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] font-semibold text-zinc-300">PUP Santa Maria · Session #802</span>
          </div>
          <span className="font-mono text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-golden">
            ED25519-VERIFIED
          </span>
        </div>

        {/* Tab Content Display */}
        {activeTab === "qr" && (
          <div className="p-4 flex flex-col items-center text-center animate-fade-in-up">
            <p className="text-xs uppercase font-bold text-golden tracking-widest mb-1">
              Active Session QR Token (Scannable)
            </p>
            <h4 className="font-lora font-bold text-lg text-white mb-4">
              BSIT 3-1 · Software Engineering
            </h4>

            {/* REAL SCANNABLE QR CODE */}
            <div className="relative p-3 rounded-2xl bg-white shadow-xl mb-4 group">
              <QRCodeSVG
                value={sessionToken}
                size={180}
                bgColor="#FFFFFF"
                fgColor="#7B1113"
                level="H"
                includeMargin={false}
              />

              {/* Scanning Laser Overlay */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-golden to-transparent animate-scan-laser shadow-[0_0_12px_#FFDF00]" />
            </div>

            {/* Expiry Counter */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-800/80 px-3 py-1.5 rounded-full mb-2">
              <Clock className="w-3.5 h-3.5 text-golden" />
              <span>Token Expires In: <strong className="text-golden">{formatTime(timeLeft)}</strong></span>
            </div>
            <p className="text-[11px] text-zinc-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Point your smartphone camera at the screen to test scanning!</span>
            </p>
          </div>
        )}

        {activeTab === "gps" && (
          <div className="p-4 flex flex-col items-center text-center animate-fade-in-up">
            <p className="text-xs uppercase font-bold text-golden tracking-widest mb-1">
              Haversine Distance Engine
            </p>
            <h4 className="font-lora font-bold text-lg text-white mb-4">
              PUP Main Building Geofence
            </h4>

            {/* Radar Animation Box */}
            <div className="relative w-48 h-48 rounded-full border border-golden/30 bg-maroon-dark/30 flex items-center justify-center mb-4 overflow-hidden">
              <div className="absolute w-36 h-36 rounded-full border border-golden/20 animate-ping-slow" />
              <div className="absolute w-24 h-24 rounded-full border border-dashed border-golden/40" />
              <div className="z-10 w-10 h-10 rounded-full bg-maroon border-2 border-golden flex items-center justify-center shadow-lg">
                <MapPin className="w-5 h-5 text-golden" />
              </div>
              <div className="absolute bottom-4 text-[10px] font-mono bg-zinc-900/90 text-golden px-2 py-0.5 rounded border border-golden/30">
                12.4m from Center (Limit 30m)
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4" /> Geofence Verified: PASS
            </div>
          </div>
        )}

        {activeTab === "offline" && (
          <div className="p-4 flex flex-col items-center text-center animate-fade-in-up">
            <p className="text-xs uppercase font-bold text-golden tracking-widest mb-1">
              Offline-First Attendance Vault
            </p>
            <h4 className="font-lora font-bold text-lg text-white mb-4">
              Zero Connectivity Required
            </h4>

            <div className="w-full bg-zinc-800/80 border border-zinc-700/60 rounded-2xl p-4 text-left space-y-3 mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-golden" /> Check-in Encrypted (SQLite)
                </span>
                <span className="font-mono text-[10px] text-zinc-400">14:02:18</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-300 flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" /> Auto-Syncing Queue
                </span>
                <span className="font-mono text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                  2 Items Pending
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400">
              Attendance records remain tamper-proof locally and automatically sync via WebSockets once network reconnects.
            </p>
          </div>
        )}

        {/* Footer device indicator */}
        <div className="mt-2 pt-3 border-t border-zinc-800/80 flex items-center justify-between px-3 text-[11px] text-zinc-500">
          <span className="flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-golden" /> Polycheck Mobile OS
          </span>
          <span className="flex items-center gap-1">
            <Monitor className="w-3.5 h-3.5 text-zinc-400" /> Web Console Linked
          </span>
        </div>
      </div>
    </div>
  );
}
