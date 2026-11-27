"use client";

import { QrCode, MapPin, WifiOff, Shield, BarChart3, Users, RefreshCw, Lock, ArrowUpRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Reveal from "./Reveal";
import { DEMO_QR_PAYLOAD } from "@/lib/config";

const tiles = [
  {
    index: "01",
    title: "Cryptographic QR Token Engine",
    badge: "Ed25519 Cryptographic Signatures",
    body: "Every attendance QR is signed with an Ed25519 key, bound to its class session, and valid only for a short, instructor-set window of up to 15 minutes. Stale or tampered tokens are rejected, and the server re-verifies every scan.",
    foot: "Signed, Time-Boxed Payload",
    mark: true,
  },
  {
    index: "02",
    title: "GPS Geofencing",
    badge: "Haversine GPS",
    body: "In-person sessions use a geofence (10–500 m) that the instructor sets on a map. The phone checks it with the Haversine formula and the server re-validates it. Online sessions skip GPS and use check-in and check-out checkpoints with an optional meeting PIN.",
    foot: "Proximity Verified",
  },
  {
    index: "03",
    title: "Offline-First Classroom Attendance",
    badge: "Offline Queue",
    body: "Classroom signals are unreliable. PolyCheck validates the signed token and location on the phone, then saves the check-in in an on-device database. It syncs automatically when the phone reconnects or the app is reopened.",
    foot: "Automatic Sync on Reconnect",
  },
  {
    index: "04",
    title: "Live Session Cockpit & Reports",
    badge: "Real-Time",
    body: "Watch check-ins arrive in real time, put a projector-friendly kiosk view on screen, and export attendance reports as CSV.",
  },
  {
    index: "05",
    title: "Section Officers",
    badge: "Role-Based",
    body: "Class presidents can create sessions for their section, and QAC members can upload timestamped proof-of-class photos for faculty review.",
  },
  {
    index: "06",
    title: "Multi-Layered Anti-Cheat Defense",
    badge: "Anti-Proxy",
    body: "One active device per student, a trusted server clock, mock-GPS and rooted-device detection in the Android app, and a dispute workflow where faculty accept, reject or manually override flagged records.",
  },
];

export default function BentoFeatures() {
  return (
    <section id="features" className="py-24 md:py-32 bg-white dark:bg-[#0A0A0C] px-6 md:px-8 grain">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="kicker kicker--center mb-5">Architecture &amp; Features</span>
            <h2 className="font-lora font-bold text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-white mb-4 leading-tight">
              Built so attendance can be trusted.
            </h2>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-dmSans">
              The core mechanics behind every PolyCheck attendance record.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tile 1: Hero Large */}
          <Reveal className="md:col-span-2" delay={0}>
            <div className="bento-card p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group h-full">
              <div aria-hidden="true" className="absolute -right-16 -bottom-20 w-64 h-64 opacity-[0.07] dark:opacity-[0.12] pointer-events-none group-hover:opacity-15 transition-opacity duration-500">
                <QRCodeSVG
                  value={DEMO_QR_PAYLOAD}
                  size={256}
                  bgColor="transparent"
                  fgColor="#7B1113"
                  level="H"
                />
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-golden bg-maroon dark:bg-golden dark:text-maroon-dark px-2 py-1 mb-6 w-fit">
                {tiles[0].index} / ED25519
              </span>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-2 text-maroon dark:text-golden">
                  <QrCode className="w-5 h-5" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{tiles[0].badge}</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-300 dark:text-zinc-600 group-hover:text-maroon dark:group-hover:text-golden transition-colors" />
              </div>

              <div className="space-y-3 mb-8 relative z-10">
                <h3 className="font-lora font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                  {tiles[0].title}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-dmSans max-w-xl">
                  {tiles[0].body}
                </p>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between font-mono text-xs text-zinc-600 dark:text-zinc-400 relative z-10">
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-500" /> {tiles[0].foot}
                </span>
                <span className="text-maroon dark:text-golden font-bold">ED25519</span>
              </div>
            </div>
          </Reveal>

          {/* Tile 2: Tall */}
          <Reveal delay={100}>
            <div className="bento-card p-8 flex flex-col justify-between relative overflow-hidden group h-full">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 dark:text-zinc-600">{tiles[1].index}</span>
                  <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {tiles[1].badge}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-maroon dark:text-golden mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-lora font-bold text-xl text-zinc-900 dark:text-white mb-3">
                  {tiles[1].title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-dmSans mb-6">
                  {tiles[1].body}
                </p>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold text-center">
                ✓ {tiles[1].foot}
              </div>
            </div>
          </Reveal>

          {/* Tile 3: Wide */}
          <Reveal className="md:col-span-2" delay={150}>
            <div className="bento-card p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group h-full">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 dark:text-zinc-600">{tiles[2].index}</span>
                <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {tiles[2].badge}
                </span>
              </div>
              <div className="flex items-center gap-2 text-maroon dark:text-golden mb-4">
                <WifiOff className="w-5 h-5" />
              </div>
              <div className="space-y-3 mb-6">
                <h3 className="font-lora font-bold text-2xl text-zinc-900 dark:text-white">
                  {tiles[2].title}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-dmSans max-w-xl">
                  {tiles[2].body}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                <RefreshCw className="w-4 h-4 text-golden animate-spin" />
                <span>{tiles[2].foot}</span>
              </div>
            </div>
          </Reveal>

          {/* Tile 4 */}
          <Reveal delay={200}>
            <div className="bento-card p-8 flex flex-col justify-between relative overflow-hidden group h-full">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 dark:text-zinc-600">{tiles[3].index}</span>
                  <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {tiles[3].badge}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-maroon dark:text-golden mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="font-lora font-bold text-xl text-zinc-900 dark:text-white mb-3">
                  {tiles[3].title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-dmSans">
                  {tiles[3].body}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Tile 5 */}
          <Reveal delay={250}>
            <div className="bento-card p-8 flex flex-col justify-between relative overflow-hidden group h-full">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 dark:text-zinc-600">{tiles[4].index}</span>
                  <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {tiles[4].badge}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-maroon dark:text-golden mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-lora font-bold text-xl text-zinc-900 dark:text-white mb-3">
                  {tiles[4].title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-dmSans">
                  {tiles[4].body}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Tile 6: Wide */}
          <Reveal className="md:col-span-2" delay={300}>
            <div className="bento-card p-8 flex flex-col justify-between relative overflow-hidden group h-full">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 dark:text-zinc-600">{tiles[5].index}</span>
                <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {tiles[5].badge}
                </span>
              </div>
              <div className="flex items-center gap-2 text-maroon dark:text-golden mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="font-lora font-bold text-xl text-zinc-900 dark:text-white">
                  {tiles[5].title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-dmSans">
                  {tiles[5].body}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
