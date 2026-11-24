import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import LandingFooter from "@/components/LandingFooter";
import { LEGAL_UPDATED, LEGAL_VERSION } from "@/lib/legal";

export interface TocItem {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  kicker: string;
  title: string;
  intro: string;
  toc: TocItem[];
  /** The sibling document, linked from the header and the end of the page. */
  other: { href: string; label: string };
  children: ReactNode;
}

export default function LegalLayout({ kicker, title, intro, toc, other, children }: LegalLayoutProps) {
  return (
    <>
      <Navbar />

      <header className="relative bg-[#F8F4ED] dark:bg-[#070709] px-6 md:px-8 pt-32 md:pt-40 pb-14 md:pb-16 overflow-hidden grain border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div aria-hidden="true" className="absolute top-0 right-0 w-[460px] h-[460px] translate-x-1/3 -translate-y-1/3 bg-maroon/10 dark:bg-golden/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <span className="kicker mb-6">{kicker}</span>
          <h1 className="font-lora font-bold text-4xl sm:text-5xl md:text-6xl text-zinc-900 dark:text-white leading-[1.05] tracking-[-0.02em] mb-5">
            {title}
            <span className="text-maroon dark:text-golden">.</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 font-dmSans max-w-2xl leading-relaxed mb-8">
            {intro}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span>Version {LEGAL_VERSION}</span>
            <span aria-hidden="true" className="text-golden">◆</span>
            <span>Last updated {LEGAL_UPDATED}</span>
            <span aria-hidden="true" className="text-golden">◆</span>
            <Link href={other.href} className="inline-flex items-center gap-1 font-bold text-maroon dark:text-golden hover:underline underline-offset-4">
              {other.label} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="bg-white dark:bg-[#0A0A0C] px-6 md:px-8 py-14 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Table of contents */}
          <aside className="lg:col-span-3">
            <nav aria-label="On this page" className="lg:sticky lg:top-24">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-500 mb-4">
                On this page
              </p>
              <ol className="space-y-2 border-l border-zinc-200 dark:border-zinc-800">
                {toc.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block -ml-px pl-4 py-0.5 border-l border-transparent text-[13px] leading-snug text-zinc-600 dark:text-zinc-400 hover:text-maroon dark:hover:text-golden hover:border-maroon dark:hover:border-golden transition-colors"
                    >
                      <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600 mr-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Document body */}
          <article className="lg:col-span-9 max-w-3xl space-y-14">
            {children}

            <div className="bento-card p-8 relative overflow-hidden">
              <div aria-hidden="true" className="absolute top-0 left-0 h-[3px] w-12 bg-golden" />
              <p className="font-lora font-bold text-xl text-zinc-900 dark:text-white mb-2">
                Questions about this document?
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-dmSans leading-relaxed mb-5">
                Read the companion document, or head back to the app download.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={other.href} className="btn-primary">
                  {other.label} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/#download" className="btn-ghost">
                  Back to download
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      <LandingFooter />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

export function LegalSection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-baseline gap-4 mb-5 pb-4 border-b border-zinc-200 dark:border-zinc-800 relative">
        <span aria-hidden="true" className="absolute -bottom-px left-0 h-[3px] w-12 bg-golden" />
        <span className="font-mono text-xs tracking-[0.25em] text-maroon dark:text-golden">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="font-lora font-bold text-2xl md:text-3xl text-zinc-900 dark:text-white leading-tight">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-[15px] leading-7 text-zinc-600 dark:text-zinc-300 font-dmSans">
        {children}
      </div>
    </section>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-dmSans font-bold text-base text-zinc-900 dark:text-white pt-2">{children}</h3>
  );
}

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span aria-hidden="true" className="mt-[11px] w-1.5 h-1.5 bg-golden flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bento-card p-6 relative overflow-hidden">
      <div aria-hidden="true" className="absolute top-0 left-0 h-full w-[3px] bg-golden" />
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-maroon dark:text-golden mb-3">
        {title}
      </p>
      <div className="text-[15px] leading-7 text-zinc-700 dark:text-zinc-200 font-dmSans space-y-3">
        {children}
      </div>
    </div>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="bg-maroon text-white dark:bg-maroon-dark">
            {headers.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-golden">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {rows.map((row, r) => (
            <tr key={r} className={r % 2 ? "bg-zinc-50 dark:bg-zinc-900/50" : "bg-white dark:bg-transparent"}>
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`px-4 py-3 align-top leading-relaxed ${
                    c === 0 ? "font-semibold text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
