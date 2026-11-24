"use client";

import Reveal from "./Reveal";

const stats = [
  {
    index: "01",
    value: "Proxy",
    label: "Classmates signing for absent friends",
    detail: "Paper sheets and shared QR screenshots can't prove who was physically in the room.",
  },
  {
    index: "02",
    value: "Offline",
    label: "Campus connectivity can't be assumed",
    detail: "Concrete buildings and congested Wi-Fi shouldn't decide whether attendance counts.",
  },
  {
    index: "03",
    value: "Manual",
    label: "Hours lost consolidating records",
    detail: "Lost sheets, re-keyed grades and unresolvable disputes with no verification trail.",
  },
];

export default function ProblemStatement() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-[#070709] px-6 md:px-8 border-b border-zinc-200/80 dark:border-zinc-800/80 grain">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="kicker kicker--center mb-5">The Problem</span>
            <h2 className="font-lora font-bold text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-white mb-6 leading-tight">
              Traditional attendance is broken.
            </h2>
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-dmSans">
              Paper sign sheets get lost. Proxy attendance goes undetected. Students in remote campuses can&apos;t always reach the system. Manual tallying wastes hours that should be spent teaching.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="bento-card p-8 relative overflow-hidden h-full">
                <div aria-hidden="true" className="absolute top-0 left-0 h-[3px] w-10 bg-golden" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-6 block">
                  {stat.index}
                </span>
                <p className="font-lora font-bold text-5xl text-maroon dark:text-golden mb-3 tracking-tight">
                  {stat.value}
                </p>
                <h3 className="font-dmSans font-bold text-base text-zinc-900 dark:text-white mb-2 leading-snug">
                  {stat.label}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
