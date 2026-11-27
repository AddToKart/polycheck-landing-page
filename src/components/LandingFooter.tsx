"use client";

import Link from "next/link";
import { WEB_APP_URL } from "@/lib/config";

const LINK = "inline-block py-1.5 text-white/85 hover:text-golden underline-offset-4 hover:underline";

export default function LandingFooter() {
  return (
    <footer className="bg-maroon-dark dark:bg-[#09090B] border-t border-golden/25 px-5 sm:px-8 py-12 text-white [&_:focus-visible]:outline-golden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export serves the file as is */}
            <img src="/logo.png" alt="PolyCheck logo" width={56} height={56} className="w-14 h-14" />
            <div>
              <p className="font-lora font-bold text-2xl text-golden leading-tight">PolyCheck</p>
              <p className="text-sm text-white/75">Class attendance, made simple.</p>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 text-sm">
            <ul>
              <li><a href="/#how" className={LINK}>How it works</a></li>
              <li><a href="/#fair" className={LINK}>Fair attendance</a></li>
              <li><a href="/#download" className={LINK}>Download</a></li>
            </ul>
            <ul>
              <li><a href={WEB_APP_URL} className={LINK}>Open the website</a></li>
              <li><Link href="/privacy" className={LINK}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={LINK}>Terms &amp; Conditions</Link></li>
            </ul>
          </nav>
        </div>

        <p className="mt-8 border-t border-golden/20 pt-5 text-xs text-white/65">
          © 2026 PolyCheck · All rights reserved
        </p>
      </div>
    </footer>
  );
}
