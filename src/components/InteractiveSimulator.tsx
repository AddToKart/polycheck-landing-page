"use client";

import { useState } from "react";
import { QrCode, MapPin, Smartphone, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Volume2, Camera } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function InteractiveSimulator() {
  const [mode, setMode] = useState<"scan" | "id" | "geofence">("scan");
  const [distance, setDistance] = useState(14); // default 14 meters
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);

  const isGeofenceValid = distance <= 30;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanSuccess(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      setTimeout(() => setScanSuccess(false), 4000);
    }, 1200);
  };

  return (
    <section className="py-24 md:py-32 bg-zinc-900 text-white px-6 md:px-8 border-b border-zinc-800 relative overflow-hidden">
      {/* Background Mesh Grid */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-10 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-maroon/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10" data-animate>
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-golden/10 border border-golden/30 text-golden text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Live Sandbox</span>
          </div>
          <h2 className="font-lora font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-6">
            Test the Polycheck Mobile Experience.
          </h2>
          <p className="text-sm md:text-base text-zinc-400 font-dmSans">
            Interact with the live phone simulator below to test dynamic QR scanning, digital PUP student ID verification, and local Haversine geofence calculations.
          </p>
        </div>

        {/* Sandbox Controls & Device Frame Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Mode Selector & Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <button
                onClick={() => setMode("scan")}
                className={`w-full p-5 rounded-2xl text-left border transition-all flex items-start gap-4 ${
                  mode === "scan"
                    ? "bg-maroon-dark border-golden text-white shadow-xl scale-[1.01]"
                    : "bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                <div className={`p-2.5 rounded-xl ${mode === "scan" ? "bg-golden text-maroon-dark" : "bg-zinc-800 text-zinc-400"}`}>
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-dmSans font-bold text-base text-white">1. Real-Time Camera Scanner</h3>
                  <p className="text-xs text-zinc-400 mt-1">Simulate scanning dynamic Ed25519 classroom QR tokens.</p>
                </div>
              </button>

              <button
                onClick={() => setMode("id")}
                className={`w-full p-5 rounded-2xl text-left border transition-all flex items-start gap-4 ${
                  mode === "id"
                    ? "bg-maroon-dark border-golden text-white shadow-xl scale-[1.01]"
                    : "bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                <div className={`p-2.5 rounded-xl ${mode === "id" ? "bg-golden text-maroon-dark" : "bg-zinc-800 text-zinc-400"}`}>
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-dmSans font-bold text-base text-white">2. Flippable Digital PUP ID</h3>
                  <p className="text-xs text-zinc-400 mt-1">Tap to flip digital student ID showing credentials &amp; barcode.</p>
                </div>
              </button>

              <button
                onClick={() => setMode("geofence")}
                className={`w-full p-5 rounded-2xl text-left border transition-all flex items-start gap-4 ${
                  mode === "geofence"
                    ? "bg-maroon-dark border-golden text-white shadow-xl scale-[1.01]"
                    : "bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                <div className={`p-2.5 rounded-xl ${mode === "geofence" ? "bg-golden text-maroon-dark" : "bg-zinc-800 text-zinc-400"}`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-dmSans font-bold text-base text-white">3. Haversine Radius Slider</h3>
                  <p className="text-xs text-zinc-400 mt-1">Adjust distance slider to test local geofence validation engine.</p>
                </div>
              </button>
            </div>

            {/* Geofence Interactive Slider (When mode === 'geofence') */}
            {mode === "geofence" && (
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 animate-fade-in-up">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Student Proximity:</span>
                  <span className={isGeofenceValid ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                    {distance} Meters {isGeofenceValid ? "(<= 30m PASS)" : "(> 30m OUT OF RANGE)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full accent-golden cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>5m (Podium)</span>
                  <span>30m (Class Limit)</span>
                  <span>60m (Outside)</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Realistic Phone Shell Simulator */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-[340px] h-[580px] bg-black rounded-[48px] border-[8px] border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4">
              {/* Dynamic Island / Notch */}
              <div className="w-28 h-5 bg-zinc-900 rounded-full mx-auto flex items-center justify-center gap-2 z-20 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-950" />
                <span className="w-2 h-2 rounded-full bg-blue-900/60" />
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 px-2 mb-2 z-10">
                <span>09:41</span>
                <span>PUP-5G</span>
                <span>100% ⚡</span>
              </div>

              {/* View Screen Content */}
              <div className="flex-1 bg-zinc-950 rounded-3xl border border-zinc-800/80 p-4 flex flex-col justify-between relative overflow-hidden z-10">
                {mode === "scan" && (
                  <div className="flex flex-col items-center justify-between h-full text-center">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-golden">Polycheck Scanner</p>
                      <h4 className="font-lora font-bold text-sm text-white">COMP 20133 · Sec 802</h4>
                    </div>

                    {/* Camera Frame Viewfinder */}
                    <div className="relative w-44 h-44 border-2 border-dashed border-golden/60 rounded-2xl flex items-center justify-center bg-black/40 overflow-hidden">
                      <QRCodeSVG
                        value="https://polycheck.app/verify?session=COMP20133-802&ts=1722400000"
                        size={120}
                        bgColor="#FFFFFF"
                        fgColor="#7B1113"
                        level="M"
                      />
                      {isScanning && (
                        <div className="absolute inset-0 bg-golden/20 flex items-center justify-center">
                          <RefreshCw className="w-8 h-8 text-golden animate-spin" />
                        </div>
                      )}
                      <div className="absolute inset-x-0 top-0 h-1 bg-golden animate-scan-laser shadow-[0_0_10px_#FFDF00]" />
                    </div>

                    {scanSuccess ? (
                      <div className="w-full p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-semibold animate-fade-in-up flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Attendance Verified! (14ms)
                      </div>
                    ) : (
                      <button
                        onClick={handleSimulateScan}
                        disabled={isScanning}
                        className="w-full py-2.5 text-xs font-bold uppercase tracking-wider bg-golden text-maroon-dark rounded-xl shadow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                      >
                        <Camera className="w-3.5 h-3.5" /> {isScanning ? "Scanning..." : "Simulate QR Scan"}
                      </button>
                    )}
                  </div>
                )}

                {mode === "id" && (
                  <div
                    onClick={() => setCardFlipped(!cardFlipped)}
                    className="flex flex-col items-center justify-between h-full text-center cursor-pointer select-none"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-golden">
                      Tap Card to Flip ({cardFlipped ? "BACK" : "FRONT"})
                    </p>

                    {!cardFlipped ? (
                      <div className="w-full p-4 rounded-2xl bg-gradient-to-br from-maroon to-maroon-dark border border-golden/30 text-white text-left space-y-3 shadow-lg">
                        <div className="flex items-center justify-between border-b border-golden/20 pb-2">
                          <span className="font-lora font-bold text-xs text-golden">PUP DIGITAL ID</span>
                          <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">ACTIVE</span>
                        </div>
                        <div>
                          <p className="text-[9px] text-white/50">STUDENT NAME</p>
                          <p className="font-bold text-xs text-white">DELA CRUZ, JUAN A.</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-white/50">STUDENT NUMBER</p>
                          <p className="font-mono font-semibold text-xs text-golden">2023-01942-SM-0</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-white/50">PROGRAM</p>
                          <p className="font-semibold text-xs text-white">BS INFORMATION TECH</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700 text-white text-center space-y-3 shadow-lg">
                        <p className="text-[10px] font-mono text-zinc-400">HARDWARE BARCODE</p>
                        <div className="h-10 bg-white p-1 rounded flex items-center justify-center">
                          <div className="w-full h-full bg-zinc-950 flex items-center justify-around px-2">
                            {[...Array(20)].map((_, i) => (
                              <div key={i} className={`h-full ${i % 2 === 0 ? "w-1 bg-white" : "w-0.5 bg-zinc-800"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-[9px] text-zinc-400">Encrypted Ed25519 Device Key Token</p>
                      </div>
                    )}

                    <p className="text-[10px] text-zinc-500 italic">Tap anywhere on the card to flip</p>
                  </div>
                )}

                {mode === "geofence" && (
                  <div className="flex flex-col items-center justify-between h-full text-center">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-golden">Haversine GPS Test</p>
                      <h4 className="font-lora font-bold text-sm text-white">PUP Santa Maria Main Bldg</h4>
                    </div>

                    <div className="relative w-36 h-36 rounded-full border border-golden/30 flex items-center justify-center bg-black/40">
                      <div className={`w-28 h-28 rounded-full border ${isGeofenceValid ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"} flex items-center justify-center transition-colors`}>
                        <MapPin className={`w-8 h-8 ${isGeofenceValid ? "text-emerald-400" : "text-rose-400"} animate-bounce`} />
                      </div>
                    </div>

                    <div className={`w-full p-2.5 rounded-xl border text-xs font-bold font-mono ${
                      isGeofenceValid
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                        : "bg-rose-500/20 border-rose-500/40 text-rose-400"
                    }`}>
                      {isGeofenceValid ? "✓ GEOFENCE VERIFIED (PASS)" : "✗ OUTSIDE GEOFENCE (REJECT)"}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-28 h-1 bg-zinc-700 rounded-full mx-auto mt-2 z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
