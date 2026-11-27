"use client";

import { useState } from "react";
import { ShieldCheck, Lock, Smartphone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

interface ThreatItem {
  threat: string;
  solution: string;
  detail: string;
  icon: any;
  securityLayer: string;
  status: string;
}

const threats: ThreatItem[] = [
  {
    threat: "Sending QR to absent friend",
    solution: "Short expiry (1–15 min) + in-person GPS geofence + server re-validation",
    detail: "QR tokens expire quickly. In in-person classes, a check-in from outside the classroom geofence is not accepted. Online classes use no location and rely on short windows and an optional meeting PIN.",
    icon: MapPin,
    securityLayer: "Dual-Fence Verification",
    status: "CHECKED",
  },
  {
    threat: "Logging into someone else's account",
    solution: "One active device per student account",
    detail: "While a student is signed in on one phone, a login from any other device is rejected. After logging out, a different device has to wait out a cooldown (2 hours by default), and faculty can release a device in an emergency.",
    icon: Lock,
    securityLayer: "Device Session Binding",
    status: "REJECTED",
  },
  {
    threat: "GPS spoofing apps",
    solution: "Mock-GPS detection in the Android app + server-side checks",
    detail: "The Android app refuses a check-in when it detects a mock-location provider, and the server flags rooted devices, emulators, hooking tools and suspicious GPS accuracy for teacher review. These signals come from the phone and cannot catch everything, and web check-ins cannot detect fake GPS.",
    icon: ShieldCheck,
    securityLayer: "Mock Location Detector",
    status: "CHECKED ON ANDROID",
  },
  {
    threat: "Screenshot replay of QR",
    solution: "Signed issue time + short validity + geofence + duplicate rejection",
    detail: "Every token carries a signed issue time and a short validity window. A forwarded screenshot goes stale quickly, in in-person classes it also fails the geofence if the student is not in the room, and duplicate submissions are rejected by the server.",
    icon: Smartphone,
    securityLayer: "Signed Time Window",
    status: "REJECTED",
  },
  {
    threat: "Clock manipulation",
    solution: "issuedAt is cryptographically signed into the token — device clock is irrelevant",
    detail: "Device system clock modifications do not alter the signed timestamp embedded in the Ed25519 token signature verified against server UTC time.",
    icon: Clock,
    securityLayer: "Trusted Server Clock",
    status: "SERVER-CHECKED",
  },
];

export default function AntiCheatShowcase() {
  const [selectedThreat, setSelectedThreat] = useState(0);

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-[#070709] px-6 md:px-8 border-b border-zinc-200/80 dark:border-zinc-800/80 grain">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="kicker kicker--center mb-5">Anti-Cheat Defense</span>
          <h2 className="font-lora font-bold text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-white mb-4">
            Layers of defense.
          </h2>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-dmSans">
            Layered checks that make proxy attendance harder to pull off and easier to catch. No single check is foolproof.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <Reveal className="lg:col-span-6" delay={0}>
            <div className="space-y-3">
              {threats.map((item, i) => {
                const isSelected = selectedThreat === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedThreat(i)}
                    aria-pressed={isSelected}
                    className={`w-full p-4 text-left transition-all border flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
                      isSelected
                        ? "bento-card border-maroon dark:border-golden"
                        : "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-[10px] tracking-[0.25em] flex-shrink-0 ${
                        isSelected ? "text-maroon dark:text-golden" : "text-zinc-400 dark:text-zinc-600"
                      }`}>
                        0{i + 1}
                      </span>
                      <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 border ${
                        isSelected ? "bg-maroon text-golden dark:bg-golden dark:text-maroon-dark border-maroon dark:border-golden" : "bg-maroon/5 dark:bg-golden/10 text-maroon dark:text-golden border-maroon/10 dark:border-golden/20"
                      }`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-dmSans font-bold text-sm leading-snug">
                          {item.threat}
                        </p>
                        <p className="text-xs text-zinc-400">
                          Layer: {item.securityLayer}
                        </p>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase flex-shrink-0 border ${
                      isSelected ? "bg-maroon/10 dark:bg-golden/10 text-maroon dark:text-golden border-maroon/20 dark:border-golden/30" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800"
                    }`}>
                      {item.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={150}>
            <div
              aria-live="polite"
              className="bento-card p-8 relative overflow-hidden h-full"
            >
              <div aria-hidden="true" className="absolute top-0 left-0 h-[3px] w-16 bg-golden" />
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-6">
                <span className="text-xs font-mono font-bold uppercase text-maroon dark:text-golden flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Defense Protocol Details
                </span>
                <span className="text-xs font-mono text-zinc-400">LAYERED DEFENSE</span>
              </div>

              <h3 className="font-lora font-bold text-xl text-zinc-900 dark:text-white mb-2">
                Threat: &quot;{threats[selectedThreat].threat}&quot;
              </h3>

              <div className="mb-6 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  How PolyCheck Counters It:
                </p>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-dmSans">
                  {threats[selectedThreat].solution}
                </p>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-dmSans mb-6">
                {threats[selectedThreat].detail}
              </p>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-mono flex items-center justify-between">
                <span>STATUS: {threats[selectedThreat].status}</span>
                <span className="text-[10px] uppercase">Server Verified</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
