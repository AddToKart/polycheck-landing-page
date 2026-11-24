"use client";

import { Code2, Cpu, Database, Layout, Layers } from "lucide-react";
import Reveal from "./Reveal";

interface TechGroup {
  layer: string;
  icon: any;
  items: { name: string; tag: string }[];
}

const techGroups: TechGroup[] = [
  {
    layer: "Frontend & UI",
    icon: Layout,
    items: [
      { name: "Next.js 16", tag: "App Router" },
      { name: "Tailwind CSS v4", tag: "Design Tokens" },
      { name: "shadcn/ui", tag: "Primitives" },
      { name: "TypeScript", tag: "Strict Mode" },
    ],
  },
  {
    layer: "Mobile Architecture",
    icon: Cpu,
    items: [
      { name: "Flutter", tag: "Native Android" },
      { name: "Riverpod", tag: "State & Routing" },
      { name: "Drift + SQLite", tag: "Offline Queue" },
    ],
  },
  {
    layer: "Backend & API Services",
    icon: Code2,
    items: [
      { name: "NestJS 11", tag: "REST & WebSockets" },
      { name: "Better Auth", tag: "HttpOnly Cookies" },
      { name: "Ed25519 Cryptography", tag: "Signed Tokens" },
    ],
  },
  {
    layer: "Database, Cache & Infra",
    icon: Database,
    items: [
      { name: "PostgreSQL", tag: "Relational Storage" },
      { name: "Prisma 7", tag: "Type-Safe Queries" },
      { name: "Redis + BullMQ", tag: "Cache & Queues" },
      { name: "Turborepo", tag: "Monorepo Build" },
    ],
  },
];

export default function TechStack() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-[#070709] px-6 md:px-8 border-b border-zinc-200/80 dark:border-zinc-800/80 grain">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="kicker kicker--center mb-5">Architecture &amp; Stack</span>
            <h2 className="font-lora font-bold text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-white mb-4">
              Built with modern technology.
            </h2>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-dmSans">
              Enterprise-grade monorepo stack crafted for performance, security, and scalability.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techGroups.map((group, idx) => (
            <Reveal key={group.layer} delay={(idx % 2) * 100}>
              <div className="bento-card p-8 h-full">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-400 dark:text-zinc-600">
                    0{idx + 1}
                  </span>
                  <div className="w-10 h-10 bg-maroon/5 dark:bg-golden/10 flex items-center justify-center text-maroon dark:text-golden border border-maroon/10 dark:border-golden/20">
                    <group.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-lora font-bold text-xl text-zinc-900 dark:text-white">
                    {group.layer}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="p-3 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col justify-between transition-colors hover:border-maroon/40 dark:hover:border-golden/40"
                    >
                      <span className="font-dmSans font-bold text-sm text-zinc-800 dark:text-zinc-200">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mt-1">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
