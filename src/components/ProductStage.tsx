"use client";

import { useState, useEffect, useRef } from "react";
import { QrCode, MapPin, Monitor, ShieldCheck, Clock, Smartphone, RefreshCw, Zap } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Reveal from "./Reveal";
import { DEMO_QR_PAYLOAD } from "@/lib/config";

const tabs = [
  { id: "scanner", label: "Mobile Scanner", icon: Smartphone },
  { id: "console", label: "Faculty Console", icon: Monitor },
  { id: "radar", label: "GPS Radar", icon: MapPin },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ProductStage() {
  const [activeTab, setActiveTab] = useState<TabId>("scanner");
  const [timeLeft, setTimeLeft] = useState(140);
  const [distance, setDistance] = useState(12.4);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 180));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const onTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    const next =
      e.key === "ArrowRight"
        ? (index + 1) % tabs.length
        : e.key === "ArrowLeft"
        ? (index - 1 + tabs.length) % tabs.length
        : null;
    if (next === null) return;
    e.preventDefault();
    setActiveTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <section className="py-24 md:py-32 bg-zinc-900 dark:bg-[#070709] text-white px-6 md:px-8 relative overflow-hidden grain">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-maroon-deep/40 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="kicker kicker--center kicker--light mb-5">Interactive Product Stage</span>
            <h2 className="font-lora font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight">
              Experience Polycheck in Action.
            </h2>
            <p className="text-sm md:text-base text-zinc-400 font-dmSans">
              Switch views to explore the native mobile scanner, live faculty console, and Haversine GPS radar engine.
            </p>
          </div>
        </Reveal>

        {/* Tab Navigation — sharp segmented control */}
        <Reveal delay={100}>
          <div
            role="tablist"
            aria-label="Product stage views"
            className="flex items-center justify-center gap-1 mb-10 p-1 bg-zinc-800/60 max-w-lg mx-auto border border-zinc-700/60"
          >
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                type="button"
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                role="tab"
                id={`stage-tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`stage-panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => onTabKeyDown(e, idx)}
                className={`flex-1 py-2.5 px-4 text-xs font-bold font-dmSans transition-all flex items-center justify-center gap-2 border ${
                  activeTab === tab.id
                    ? "bg-golden text-maroon-dark border-golden shadow-[0_10px_24px_-12px_rgba(255,223,0,0.6)]"
                    : "text-zinc-400 border-transparent hover:text-white hover:border-zinc-600"
                }`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="glass-maroon p-6 sm:p-10 relative overflow-hidden min-h-[480px] flex flex-col justify-between">
            {/* Header Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-golden/20 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-golden text-maroon-dark font-lora font-bold text-xl flex items-center justify-center">
                  P
                </div>
                <div>
                  <h3 className="font-lora font-bold text-white text-base">PUP Santa Maria · Session #802</h3>
                  <p className="text-xs text-golden/80 font-mono">BSIT 3-1 Software Engineering (COMP 20133)</p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5">
                <span className="w-2 h-2 bg-emerald-400 animate-pulse" />
                <span>Ed25519 Active · WebSocket Connected</span>
              </div>
            </div>

            {/* Tab 1: Scanner View */}
            {activeTab === "scanner" && (
              <div
                role="tabpanel"
                id="stage-panel-scanner"
                aria-labelledby="stage-tab-scanner"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="inline-block px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-golden/20 text-golden border border-golden/30">
                    Hardware QR Engine
                  </span>
                  <h3 className="font-lora font-bold text-2xl sm:text-3xl text-white">
                    Real Scannable QR Token
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed font-dmSans">
                    Every attendance QR code is cryptographically signed with an Ed25519 private key. Point your physical smartphone camera at the code to test payload validation.
                  </p>
                  <div className="pt-2 flex items-center gap-4 text-xs font-mono text-golden">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Expiry: {formatTime(timeLeft)}</span>
                    <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> Single Session Only</span>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                  <div className="p-5 bg-white shadow-2xl relative">
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                      <span className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-golden" />
                      <span className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-golden" />
                      <span className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-golden" />
                      <span className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-golden" />
                    </div>
                    <QRCodeSVG
                      value={DEMO_QR_PAYLOAD}
                      size={200}
                      bgColor="#FFFFFF"
                      fgColor="#7B1113"
                      level="H"
                    />
                    <div aria-hidden="true" className="absolute inset-x-2 top-0 h-1 bg-golden animate-scan-laser shadow-[0_0_12px_#FFDF00]" />
                    <p className="text-[10px] font-mono font-bold text-maroon text-center mt-3 uppercase tracking-wider">
                      Sample QR · demo only
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Console Stream View */}
            {activeTab === "console" && (
              <div
                role="tabpanel"
                id="stage-panel-console"
                aria-labelledby="stage-tab-console"
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-lora font-bold text-xl text-white">Live Student Check-In Stream</h3>
                  <span className="text-xs font-mono text-golden">41 / 45 Present (92.4%)</span>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "Dela Cruz, Juan A.", no: "2023-01942-SM-0", dist: "12.4m", time: "Just now" },
                    { name: "Santos, Maria Clara", no: "2023-08119-SM-0", dist: "8.1m", time: "2m ago" },
                    { name: "Reyes, Mark Anthony", no: "2023-04210-SM-0", dist: "14.2m", time: "5m ago" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-black/40 border border-golden/20 flex items-center justify-between font-dmSans">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-golden text-maroon-dark font-bold text-xs flex items-center justify-center">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">{item.name}</p>
                          <p className="text-xs text-white/60 font-mono">{item.no} · GPS: {item.dist}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                        VERIFIED ({item.time})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Radar View */}
            {activeTab === "radar" && (
              <div
                role="tabpanel"
                id="stage-panel-radar"
                aria-labelledby="stage-tab-radar"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-4">
                  <span className="inline-block px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-golden/20 text-golden border border-golden/30">
                    Haversine Geofence Engine
                  </span>
                  <h3 className="font-lora font-bold text-2xl sm:text-3xl text-white">
                    PUP Santa Maria Campus Radar
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed font-dmSans">
                    GPS coordinates are calculated locally using the Haversine distance formula to enforce the geofence radius the instructor sets for the classroom (10–500 m).
                  </p>
                  <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Student Proximity: 12.4m &lt;= 40.0m [PASS]</span>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                  <div className="relative p-6 border border-golden/30 bg-black/50 flex items-center justify-center">
                    <div className="relative w-52 h-52 rounded-full border border-golden/40 bg-black/60 flex items-center justify-center overflow-hidden">
                      <div className="absolute w-40 h-40 rounded-full border border-golden/30 animate-ping-slow" />
                      <div className="absolute w-24 h-24 rounded-full border border-dashed border-golden/50" />
                      <div className="z-10 w-12 h-12 rounded-full bg-maroon border-2 border-golden flex items-center justify-center shadow-lg">
                        <MapPin className="w-6 h-6 text-golden" />
                      </div>
                      <div className="absolute bottom-3 text-[10px] font-mono bg-black/90 text-golden px-2.5 py-1 border border-golden/30">
                        Classroom · 40m Geofence
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Note */}
            <div className="mt-8 pt-4 border-t border-golden/20 flex items-center justify-between text-xs text-white/60 font-mono">
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" /> Polycheck Stage Engine
              </span>
              <span>100% Cryptographically Sealed</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
