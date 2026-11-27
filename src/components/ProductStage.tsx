"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Monitor, Clock, Smartphone, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { DEMO_QR_PAYLOAD } from "@/lib/config";

const tabs = [
  { id: "scanner", label: "The code", icon: Smartphone },
  { id: "console", label: "Teacher's view", icon: Monitor },
  { id: "radar", label: "Location check", icon: MapPin },
] as const;

type TabId = (typeof tabs)[number]["id"];

const sampleStudents = [
  { name: "Dela Cruz, Juan A.", time: "Just now", status: "present" },
  { name: "Santos, Maria Clara", time: "2 minutes ago", status: "present" },
  { name: "Reyes, Mark Anthony", time: "9 minutes ago", status: "late" },
];

export default function ProductStage() {
  const [activeTab, setActiveTab] = useState<TabId>("scanner");
  const [timeLeft, setTimeLeft] = useState(140);
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
    <section id="demo" className="band px-5 sm:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Take a look" title="See what happens in class." onBand>
          Tap through the three views. Everything shown here is made-up sample data.
        </SectionHeading>

        <Reveal>
          <div role="tablist" aria-label="Sample views" className="grid grid-cols-3 sm:inline-grid gap-px bg-golden/30 border border-golden/30">
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
                className={`flex min-h-12 min-w-0 flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 py-2.5 sm:px-6 text-xs sm:text-sm font-bold leading-tight text-center transition-colors ${
                  activeTab === tab.id ? "bg-golden text-maroon-dark" : "bg-maroon-dark text-white/85 hover:text-golden dark:bg-[#0D0D0D]"
                }`}
              >
                <tab.icon aria-hidden="true" className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-4 card p-5 sm:p-8 lg:p-10 lg:min-h-[25rem] flex flex-col justify-center text-ink">
            {activeTab === "scanner" && (
              <div role="tabpanel" id="stage-panel-scanner" aria-labelledby="stage-tab-scanner" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-lora font-bold text-2xl sm:text-3xl mb-3">A code that runs out</h3>
                  <p className="text-[15px] sm:text-base leading-relaxed text-muted">
                    Your teacher decides how long the code stays open. When the countdown ends, scanning it no
                    longer counts as on time, so an old photo of it is no use.
                  </p>
                  <p className="mt-5 inline-flex items-center gap-2 border border-accent px-4 py-2 text-sm font-bold text-accent">
                    <Clock aria-hidden="true" className="w-4 h-4" /> Sample countdown {formatTime(timeLeft)}
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="relative bg-white p-6 border border-zinc-200">
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                      <span className="absolute top-2 left-2 w-6 h-6 border-t-[3px] border-l-[3px] border-maroon" />
                      <span className="absolute top-2 right-2 w-6 h-6 border-t-[3px] border-r-[3px] border-maroon" />
                      <span className="absolute bottom-2 left-2 w-6 h-6 border-b-[3px] border-l-[3px] border-maroon" />
                      <span className="absolute bottom-2 right-2 w-6 h-6 border-b-[3px] border-r-[3px] border-maroon" />
                    </div>
                    <QRCodeSVG value={DEMO_QR_PAYLOAD} size={190} bgColor="#FFFFFF" fgColor="#7B1113" level="H" />
                    <p className="mt-3 text-center text-[11px] font-bold uppercase tracking-wider text-maroon">Sample only</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "console" && (
              <div role="tabpanel" id="stage-panel-console" aria-labelledby="stage-tab-console">
                <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
                  <div>
                    <h3 className="font-lora font-bold text-2xl sm:text-3xl">Names appear as students scan</h3>
                    <p className="mt-1 text-sm text-muted">Software Engineering · sample data</p>
                  </div>
                  <p className="font-lora font-bold text-lg text-accent">41 of 45 checked in</p>
                </div>
                <ul className="space-y-2.5">
                  {sampleStudents.map((student) => (
                    <li key={student.name} className="card card-edge flex flex-wrap items-center justify-between gap-3 p-4">
                      <div>
                        <p className="font-bold text-sm sm:text-base">{student.name}</p>
                        <p className="text-xs sm:text-sm text-muted">{student.time}</p>
                      </div>
                      <span className={`badge ${student.status === "late" ? "badge-late" : "badge-present"}`}>
                        {student.status === "late" ? "Late" : "Present"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "radar" && (
              <div role="tabpanel" id="stage-panel-radar" aria-labelledby="stage-tab-radar" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-lora font-bold text-2xl sm:text-3xl mb-3">A circle around the classroom</h3>
                  <p className="text-[15px] sm:text-base leading-relaxed text-muted">
                    For face-to-face classes, your teacher picks a spot on a map and how wide the circle is, from
                    10 to 500 meters. Inside the circle you can check in. Outside it you can&apos;t. Online
                    classes never ask for your location.
                  </p>
                  <p className="mt-5 flex items-start gap-3 text-sm font-bold">
                    <span className="badge badge-present">
                      <Check aria-hidden="true" className="w-3.5 h-3.5" strokeWidth={3.5} /> Inside
                    </span>
                    <span className="pt-0.5">Sample: 12 m away, limit 40 m</span>
                  </p>
                </div>

                <div className="flex justify-center">
                  <div aria-hidden="true" className="relative flex h-60 w-60 items-center justify-center rounded-full border-2 border-accent bg-[var(--accent-wash)]">
                    <div className="absolute h-36 w-36 rounded-full border border-dashed border-accent" />
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-maroon border-2 border-golden">
                      <MapPin className="w-7 h-7 text-golden" />
                    </div>
                    {/* The sample student, inside the circle. */}
                    <span className="absolute right-[22%] top-[27%] h-4 w-4 rounded-full bg-golden border-2 border-maroon-dark" />
                    <span className="absolute -bottom-3 whitespace-nowrap bg-maroon px-3 py-1 text-xs font-bold text-golden">
                      Classroom area
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
