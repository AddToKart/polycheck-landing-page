"use client";

import { Code2, Cpu, Database, Layout, Zap, Activity } from "lucide-react";

interface TechGroup {
  layer: string;
  icon: typeof Layout;
  items: { name: string; tag: string }[];
}

const techGroups: TechGroup[] = [
  {
    layer: "Web Dashboard",
    icon: Layout,
    items: [
      { name: "Next.js 16", tag: "App Router" },
      { name: "React 19", tag: "UI Runtime" },
      { name: "Tailwind CSS v4", tag: "Design Tokens" },
      { name: "shadcn/ui + Radix", tag: "Primitives" },
      { name: "MapLibre GL", tag: "Geofence Maps" },
      { name: "Installable PWA", tag: "Offline Shell" },
    ],
  },
  {
    layer: "Android App",
    icon: Cpu,
    items: [
      { name: "Flutter", tag: "Native Android" },
      { name: "Riverpod + go_router", tag: "State & Routing" },
      { name: "Drift + SQLite", tag: "Offline Queue" },
      { name: "mobile_scanner", tag: "QR Scanning" },
      { name: "Geolocator", tag: "Geofence Check" },
      { name: "Secure Storage", tag: "Keys & Credentials" },
    ],
  },
  {
    layer: "API & Realtime",
    icon: Code2,
    items: [
      { name: "NestJS 11", tag: "REST API" },
      { name: "Socket.IO", tag: "Live Updates" },
      { name: "Better Auth", tag: "HttpOnly Sessions" },
      { name: "Ed25519 Signatures", tag: "Signed QR Tokens" },
      { name: "Zod", tag: "Shared Contracts" },
      { name: "Helmet + Throttler", tag: "Hardening" },
    ],
  },
  {
    layer: "Ingestion Gateway",
    icon: Zap,
    items: [
      { name: "Fastify 5", tag: "Hot Path" },
      { name: "Redis Streams", tag: "Scan Buffer" },
      { name: "Micro-Batch Writer", tag: "Ordered Commits" },
      { name: "Native Ed25519", tag: "node:crypto Verify" },
      { name: "Dead-Letter Queue", tag: "Poison-Pill Safety" },
      { name: "Request Dedupe", tag: "Redis NX Claims" },
    ],
  },
  {
    layer: "Data & Infrastructure",
    icon: Database,
    items: [
      { name: "PostgreSQL 16", tag: "Relational Storage" },
      { name: "Prisma 7", tag: "Type-Safe Queries" },
      { name: "Redis 7.4 + BullMQ", tag: "Cache & Queues" },
      { name: "Coolify + Traefik", tag: "Hosting & Proxy" },
      { name: "Docker Compose", tag: "Containers" },
      { name: "Cloudflare Tunnel", tag: "Secure Ingress" },
      { name: "Vercel", tag: "Web Hosting" },
    ],
  },
  {
    layer: "Observability & Quality",
    icon: Activity,
    items: [
      { name: "Prometheus", tag: "Optional Metrics" },
      { name: "Pino", tag: "Structured Logs" },
      { name: "Sentry", tag: "Web Error Reports" },
      { name: "k6", tag: "Load Testing" },
      { name: "Playwright", tag: "End-to-End Tests" },
      { name: "Vitest · Jest · Flutter Test", tag: "Unit Tests" },
    ],
  },
];

export default function TechStack() {
  return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techGroups.map((group) => (
              <div key={group.layer} className="card p-5 sm:p-6 h-full">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="icon-box !h-10 !w-10">
                    <group.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-lora font-bold text-xl text-ink">
                    {group.layer}
                  </h4>
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
          ))}
        </div>
  );
}
