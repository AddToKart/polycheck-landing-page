"use client";

import { Fragment } from "react";
import {
  Smartphone,
  Zap,
  Layers,
  Database,
  Inbox,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  RefreshCw,
  Archive,
  Check,
  X,
} from "lucide-react";
import Reveal from "./Reveal";

/* ------------------------------------------------------------------ */
/* Content — every figure below comes from PolyCheck's own load tests  */
/* and the gateway's default configuration (services/ingest).          */
/* ------------------------------------------------------------------ */

const pipeline = [
  {
    icon: Smartphone,
    step: "01",
    title: "Scan arrives",
    body: "A signed QR, the phone's location and its device signals — from the app, the web dashboard, or an offline queue catching up.",
    tag: "Client",
  },
  {
    icon: Zap,
    step: "02",
    title: "Fastify gateway",
    body: "Validates entirely in memory: Ed25519 signature, time window, geofence, PIN and risk signals. No database call on the request path.",
    tag: "~0.1 ms signature check",
  },
  {
    icon: Inbox,
    step: "03",
    title: "Redis Stream buffer",
    body: "Accepted scans are acknowledged immediately and queued. A repeat scan is recognised here and told so straight away.",
    tag: "50,000-scan buffer",
  },
  {
    icon: Layers,
    step: "04",
    title: "Ordered micro-batches",
    body: "One writer drains the stream in batches of up to 200, one transaction per session, extending the hash-chained ledger in order.",
    tag: "Single ordered writer",
  },
  {
    icon: Database,
    step: "05",
    title: "PostgreSQL ledger",
    body: "The durable attendance record. Every accepted scan is chained to the one before it, so tampering shows up on verification.",
    tag: "Verifiable end to end",
  },
];

const comparison: { topic: string; typical: string; polycheck: string }[] = [
  {
    topic: "Where a scan is validated",
    typical: "Inside the main API, with several database reads for every single scan.",
    polycheck: "In a dedicated gateway, in memory, from a cached session snapshot — the database is not touched.",
  },
  {
    topic: "How scans reach the database",
    typical: "One transaction per scan, all contending for the same rows and locks at bell time.",
    polycheck: "Ordered micro-batches: one multi-row insert per session per batch, under a single lock.",
  },
  {
    topic: "When everyone scans at once",
    typical: "Requests queue up until they time out and some scans are lost.",
    polycheck: "A Redis buffer absorbs the burst. Past its limit the gateway answers “retry shortly”, and queued check-ins are retried rather than discarded.",
  },
  {
    topic: "Double scans",
    typical: "Both are accepted, then one is thrown away later by the database.",
    polycheck: "The second request is recognised in Redis and told immediately. Nothing extra is buffered or written.",
  },
  {
    topic: "A record that can never be saved",
    typical: "Can block or endlessly retry, holding up everyone behind it.",
    polycheck: "Quarantined to a dead-letter stream after a few attempts, where it can be inspected and replayed.",
  },
  {
    topic: "Proof it wasn’t altered",
    typical: "Rows in a table.",
    polycheck: "A hash-chained ledger that can be verified end to end.",
  },
];

const stats = [
  {
    value: "50,000",
    label: "requests in one run",
    detail: "200 concurrent users · 0% failed · median 92 ms · p95 138 ms",
    note: "2,000 new check-ins plus 48,000 repeat scans",
  },
  {
    value: "2,000",
    label: "first-time scans, worst case",
    detail: "Every request cold and every scan buffered · 0% failed · median 501 ms · p95 740 ms",
    note: "100 concurrent users",
  },
  {
    value: "6,042 / 6,042",
    label: "accepted scans committed",
    detail: "Zero write failures and an empty backlog once the run finished",
    note: "Across all benchmark runs",
  },
  {
    value: "82,996",
    label: "ledger records verified",
    detail: "Hash chain intact · 0 broken links",
    note: "Across 1,468 sessions",
  },
];

const safetyNets = [
  {
    icon: RefreshCw,
    title: "Backpressure, not data loss",
    body: "If the buffer is full or the writer falls more than 30 seconds behind, the gateway answers 503 with a Retry-After. The app treats that as a retryable condition, so queued check-ins are tried again instead of being thrown away.",
  },
  {
    icon: ShieldCheck,
    title: "Poison-pill quarantine",
    body: "A scan that can never be written is moved to a dead-letter stream after five delivery attempts so it cannot stall the queue. A replay tool puts fixed entries back.",
  },
  {
    icon: Archive,
    title: "Durable by configuration",
    body: "The buffer is stored in Redis with append-only persistence, and the fsync policy is configurable for deployments that want the strictest durability.",
  },
];

/* ------------------------------------------------------------------ */

export default function IngestGateway() {
  return (
    <section
      id="ingest"
      className="py-24 md:py-32 bg-zinc-900 dark:bg-[#070709] text-white px-6 md:px-8 relative overflow-hidden grain"
    >
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gradient-to-b from-maroon-deep/40 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="kicker kicker--center kicker--light mb-5">Ingestion Gateway</span>
            <h2 className="font-lora font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-5 leading-tight">
              Built for the bell rush.
            </h2>
            <p className="text-base md:text-lg text-zinc-300 font-dmSans leading-relaxed">
              When a whole campus scans in the same minute, PolyCheck doesn&rsquo;t make every phone
              wait for a database write. A dedicated Fastify gateway checks each scan in memory,
              buffers it in Redis, and commits it in order — so bursts are absorbed instead of
              dropped.
            </p>
          </div>
        </Reveal>

        {/* Pipeline */}
        <Reveal delay={100}>
          <ol
            aria-label="How a scan travels through the ingestion gateway"
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 lg:gap-2 items-stretch mb-20"
          >
            {pipeline.map((node, i) => (
              <Fragment key={node.step}>
                <li className="relative p-5 bg-black/40 border border-golden/20 flex flex-col">
                  <div aria-hidden="true" className="absolute top-0 left-0 h-[3px] w-10 bg-golden" />
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-golden/10 border border-golden/30 text-golden flex items-center justify-center">
                      <node.icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500">{node.step}</span>
                  </div>
                  <h3 className="font-lora font-bold text-lg text-white mb-2">{node.title}</h3>
                  <p className="text-[13px] leading-relaxed text-zinc-300 font-dmSans mb-4 flex-1">{node.body}</p>
                  <span className="self-start px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-golden/15 text-golden border border-golden/30">
                    {node.tag}
                  </span>
                </li>
                {i < pipeline.length - 1 ? (
                  <li aria-hidden="true" className="flex items-center justify-center text-golden/70">
                    <ChevronDown className="w-5 h-5 lg:hidden" />
                    <ChevronRight className="w-5 h-5 hidden lg:block" />
                  </li>
                ) : null}
              </Fragment>
            ))}
          </ol>
        </Reveal>

        {/* Comparison */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="kicker kicker--center kicker--light mb-4">How It Differs</span>
            <h3 className="font-lora font-bold text-2xl sm:text-3xl text-white mb-3">
              Not a request-per-write design.
            </h3>
            <p className="text-sm md:text-base text-zinc-300 font-dmSans">
              Most attendance systems validate and save every scan inside the same request. PolyCheck
              separates the fast decision from the slower write.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="border border-golden/20 bg-black/30 mb-20">
            {/* Header row (desktop) */}
            <div className="hidden md:grid grid-cols-12 bg-maroon-dark/80 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
              <div className="col-span-3 px-5 py-3 text-zinc-400" />
              <div className="col-span-4 px-5 py-3 text-zinc-300">Typical request-per-write</div>
              <div className="col-span-5 px-5 py-3 text-golden">PolyCheck gateway</div>
            </div>

            <div className="divide-y divide-white/10">
              {comparison.map((row) => (
                <div key={row.topic} className="grid grid-cols-1 md:grid-cols-12">
                  <div className="md:col-span-3 px-5 pt-5 md:py-5 font-dmSans font-bold text-sm text-white">
                    {row.topic}
                  </div>
                  <div className="md:col-span-4 px-5 py-3 md:py-5 flex items-start gap-3 text-[13px] leading-relaxed text-zinc-400 font-dmSans">
                    <X aria-hidden="true" className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-500" />
                    <span>
                      <span className="md:hidden block font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                        Typical request-per-write
                      </span>
                      {row.typical}
                    </span>
                  </div>
                  <div className="md:col-span-5 px-5 pb-5 pt-1 md:py-5 flex items-start gap-3 text-[13px] leading-relaxed text-zinc-100 font-dmSans md:bg-golden/[0.04]">
                    <Check aria-hidden="true" className="w-4 h-4 mt-0.5 flex-shrink-0 text-golden" />
                    <span>
                      <span className="md:hidden block font-mono text-[10px] uppercase tracking-wider text-golden mb-1">
                        PolyCheck gateway
                      </span>
                      {row.polycheck}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Measured */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="kicker kicker--center kicker--light mb-4">Measured</span>
            <h3 className="font-lora font-bold text-2xl sm:text-3xl text-white mb-3">
              Numbers from our own load tests.
            </h3>
            <p className="text-sm md:text-base text-zinc-300 font-dmSans">
              Run with k6 against a deliberately small server profile — two CPU cores, one gateway
              worker — so the results are a floor, not a best case.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="h-full p-6 bg-black/40 border border-golden/20 relative">
                <div aria-hidden="true" className="absolute top-0 left-0 h-[3px] w-10 bg-golden" />
                <p className="font-lora font-bold text-3xl xl:text-4xl text-golden leading-none mb-2 tracking-tight">
                  {stat.value}
                </p>
                <p className="font-dmSans font-bold text-sm text-white mb-3">{stat.label}</p>
                <p className="text-xs text-zinc-300 leading-relaxed mb-3 font-dmSans">{stat.detail}</p>
                <p className="text-[11px] font-mono text-zinc-500">{stat.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Before */}
        <Reveal>
          <div className="p-6 md:p-8 bg-maroon-dark/60 border border-golden/25 mb-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-golden mb-2">
                Why we built it
              </p>
              <p className="font-lora font-bold text-xl text-white mb-2">
                Before the gateway, a 2,000-scan instant burst only succeeded 10.3% of the time.
              </p>
              <p className="text-sm text-zinc-300 font-dmSans leading-relaxed">
                Sent straight to the API, with every scan validated and written inside its own request,
                the 95th-percentile response was 8.5 seconds and most scans never got through.
                Splitting the fast decision from the slow write is what changed that.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <p className="font-lora font-bold text-5xl text-golden leading-none">10.3%</p>
              <p className="text-xs font-mono text-zinc-400 mt-2">succeeded · p95 8,497 ms</p>
              <p className="text-[11px] font-mono text-zinc-500 mt-1">original path, same instant burst</p>
            </div>
          </div>
        </Reveal>

        <p className="text-[11px] leading-relaxed text-zinc-500 font-mono max-w-3xl mb-20">
          Load tests were run by the PolyCheck team in November 2026 against test fixtures on a local
          two-core profile, not a production campus. The 50,000-request run is mostly repeat scans,
          which the gateway rejects cheaply; the 2,000 first-time run is the realistic worst case.
          The before and after runs used different harnesses and concurrency, so they illustrate the
          design change rather than a like-for-like speed-up. Real-world results depend on hardware
          and network.
        </p>

        {/* Safety nets */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="kicker kicker--center kicker--light mb-4">When Things Go Wrong</span>
            <h3 className="font-lora font-bold text-2xl sm:text-3xl text-white">
              Designed to fail safely.
            </h3>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {safetyNets.map((net, i) => (
            <Reveal key={net.title} delay={i * 100}>
              <div className="h-full p-6 bg-black/40 border border-golden/20">
                <div className="w-10 h-10 mb-4 bg-golden/10 border border-golden/30 text-golden flex items-center justify-center">
                  <net.icon className="w-5 h-5" />
                </div>
                <h4 className="font-dmSans font-bold text-base text-white mb-2">{net.title}</h4>
                <p className="text-[13px] leading-relaxed text-zinc-300 font-dmSans">{net.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
