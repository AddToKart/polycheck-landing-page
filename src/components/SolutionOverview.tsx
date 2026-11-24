"use client";

import Reveal from "./Reveal";

const badges = ["Cryptographic QR Scanning", "Haversine GPS Geofencing", "Offline-First Storage Engine"];
const marqueeItems = [
  "Ed25519 Signatures",
  "AES-256-GCM PIN Vault",
  "Layered Anti-Cheat",
  "Offline Sync Queue",
  "Installable PWA",
  "Live Analytics Dashboard",
];

export default function SolutionOverview() {
  return (
    <section id="stage" className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900/40 px-6 md:px-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <span className="kicker kicker--center mb-5">The Solution</span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-lora font-bold text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-white mb-6 leading-tight max-w-3xl mx-auto">
            Attendance that works for everyone.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-dmSans max-w-2xl mx-auto mb-10">
            Polycheck replaces paper sign sheets with a signed-QR, GPS-verified, offline-first digital attendance system. Check-ins still work in a classroom with no signal and sync as soon as the phone is back online.
          </p>
        </Reveal>

        {/* Feature Badges — sharp, editorial */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {badges.map((badge, idx) => (
            <Reveal key={badge} delay={300 + idx * 100}>
              <div className="bento-card px-5 py-4 flex items-center justify-center text-left h-full relative overflow-hidden">
                <span className="font-mono text-[10px] tracking-[0.25em] text-golden bg-maroon dark:bg-golden dark:text-maroon-dark px-2 py-1 mr-3 flex-shrink-0">
                  0{idx + 1}
                </span>
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-dmSans">
                  {badge}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Capabilities marquee */}
      <div className="mt-20 marquee-mask">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex flex-shrink-0">
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center gap-6 mx-5 text-sm font-mono uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 whitespace-nowrap"
                >
                  {item}
                  <span aria-hidden="true" className="text-golden">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
