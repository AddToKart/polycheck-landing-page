"use client";

import { useState, useEffect } from "react";
import { Monitor, Users, CheckCircle2, Clock, ShieldCheck, Download, Filter, Search, Sparkles, Activity, Zap } from "lucide-react";

interface StudentCheckIn {
  name: string;
  studentNo: string;
  time: string;
  status: "PRESENT" | "LATE";
  distance: string;
  method: string;
}

const initialCheckIns: StudentCheckIn[] = [
  { name: "Dela Cruz, Juan A.", studentNo: "2023-01942-SM-0", time: "Just now", status: "PRESENT", distance: "12.4m", method: "QR + GPS" },
  { name: "Santos, Maria Clara", studentNo: "2023-08119-SM-0", time: "2m ago", status: "PRESENT", distance: "8.1m", method: "QR + GPS" },
  { name: "Reyes, Mark Anthony", studentNo: "2023-04210-SM-0", time: "5m ago", status: "PRESENT", distance: "14.2m", method: "QR + GPS" },
  { name: "Garcia, Anna Marie", studentNo: "2023-09182-SM-0", time: "8m ago", status: "LATE", distance: "22.0m", method: "QR + GPS" },
  { name: "Aquino, Gabriel V.", studentNo: "2023-01049-SM-0", time: "12m ago", status: "PRESENT", distance: "11.7m", method: "QR + GPS" },
];

export default function DashboardPreview() {
  const [selectedSubject, setSelectedSubject] = useState("BSIT 3-1 · Software Engineering (COMP 20133)");
  const [activeTab, setActiveTab] = useState<"stream" | "roster" | "analytics">("stream");
  const [checkIns, setCheckIns] = useState<StudentCheckIn[]>(initialCheckIns);

  useEffect(() => {
    // Simulate real-time WebSocket student check-in
    const names = [
      "Bautista, Patricia L.",
      "Mendoza, Kenneth R.",
      "Torres, Samantha G.",
      "Villanueva, Paolo M.",
    ];
    let idx = 0;

    const interval = setInterval(() => {
      if (idx < names.length) {
        const newCheckIn: StudentCheckIn = {
          name: names[idx],
          studentNo: `2023-0${Math.floor(10000 + Math.random() * 90000)}-SM-0`,
          time: "Just now",
          status: "PRESENT",
          distance: `${(5 + Math.random() * 15).toFixed(1)}m`,
          method: "QR + GPS",
        };
        setCheckIns((prev) => [newCheckIn, ...prev.slice(0, 5)]);
        idx++;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900/40 px-6 md:px-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto" data-animate>
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-golden/10 border border-golden/30 text-maroon dark:text-golden text-xs font-bold uppercase tracking-widest mb-4">
            <Monitor className="w-3.5 h-3.5" />
            <span>Faculty Live Console</span>
          </div>
          <h2 className="font-lora font-bold text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-white mb-4 leading-tight">
            Real-time analytics for PUP faculty.
          </h2>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-dmSans">
            Monitor live classroom check-ins, view instant donut analytics, and export audit-ready CSV records.
          </p>
        </div>

        {/* Outer Dashboard Window Container */}
        <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl shadow-black/5 dark:shadow-black/40 overflow-hidden">
          {/* Top Header Control Bar */}
          <div className="px-6 py-4 bg-zinc-100/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-xs font-dmSans font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live WebSocket Stream
              </span>
            </div>

            {/* Subject Selector & Export CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold rounded-xl px-3 py-2 cursor-pointer focus:outline-none"
              >
                <option>BSIT 3-1 · Software Engineering (COMP 20133)</option>
                <option>BSCS 2-2 · Data Structures &amp; Algorithms (CS 201)</option>
                <option>BSECE 4-1 · Digital Signal Processing (ECE 402)</option>
              </select>

              <button
                onClick={() => alert("CSV Export Generated: polycheck_bsit31_attendance_20260731.csv downloaded.")}
                className="px-3.5 py-2 text-xs font-bold bg-golden text-maroon-dark rounded-xl shadow-sm hover:scale-105 transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
            </div>
          </div>

          {/* Metrics Grid Cards */}
          <div className="p-6 md:p-8 border-b border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-[10px]">Attendance Rate</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">92.4%</span>
              </div>
              <p className="font-lora font-bold text-3xl text-zinc-900 dark:text-white mb-2">41 <span className="text-sm font-dmSans text-zinc-400 font-normal">/ 45 Present</span></p>
              {/* Progress bar */}
              <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: "91%" }} />
                <div className="h-full bg-amber-500" style={{ width: "4%" }} />
                <div className="h-full bg-rose-500 rounded-r-full" style={{ width: "5%" }} />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-[10px]">Session Status</span>
                <span className="px-2 py-0.5 rounded-full bg-golden/20 text-maroon-dark dark:text-golden font-bold text-[10px]">ACTIVE</span>
              </div>
              <p className="font-lora font-bold text-3xl text-zinc-900 dark:text-white mb-1">1h 24m</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">PUP Santa Maria · Session #802</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-[10px]">Avg Verification</span>
                <Zap className="w-3.5 h-3.5 text-golden" />
              </div>
              <p className="font-lora font-bold text-3xl text-zinc-900 dark:text-white mb-1">14 ms</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Ed25519 + Haversine Engine</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                <span className="font-semibold uppercase tracking-wider text-[10px]">Anti-Cheat Status</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <p className="font-lora font-bold text-3xl text-emerald-600 dark:text-emerald-400 mb-1">100%</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">0 Proxy Attempts Flagged</p>
            </div>
          </div>

          {/* Navigation Tabs & Stream Table */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("stream")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "stream"
                      ? "bg-maroon text-white dark:bg-golden dark:text-maroon-dark shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  Live Activity Stream
                </button>
                <button
                  onClick={() => setActiveTab("roster")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "roster"
                      ? "bg-maroon text-white dark:bg-golden dark:text-maroon-dark shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  Class Roster (45)
                </button>
              </div>

              <span className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:inline-block">
                Auto-refreshing every 5 seconds
              </span>
            </div>

            {/* Student Stream Cards Table */}
            <div className="space-y-3">
              {checkIns.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-maroon/30 dark:hover:border-golden/30 transition-all animate-fade-in-up"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-maroon to-maroon-dark dark:from-golden dark:to-amber-500 text-golden dark:text-maroon-dark font-lora font-bold text-sm flex items-center justify-center shadow-sm flex-shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-dmSans font-bold text-sm text-zinc-900 dark:text-white leading-snug">
                        {item.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {item.studentNo} · Verification: <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{item.method}</strong> ({item.distance})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                    <span className="text-xs text-zinc-400 font-medium">
                      {item.time}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === "PRESENT"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
