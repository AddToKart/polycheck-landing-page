"use client";

import { useEffect, useState } from "react";
import { Download, ShieldCheck, ArrowRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import DownloadModal from "./DownloadModal";
import Reveal from "./Reveal";
import { APK_FILE, APK_URL, LATEST_RELEASE_API, WEB_APP_URL } from "@/lib/config";

interface ReleaseMeta {
  tagName: string | null;
  sizeMb: string | null;
}

export default function DownloadCta() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [meta, setMeta] = useState<ReleaseMeta | null>(null);

  useEffect(() => {
    let active = true;
    fetch(LATEST_RELEASE_API, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((release) => {
        if (!active || !release) return;
        const asset = Array.isArray(release.assets)
          ? release.assets.find((a: { name: string }) => a.name === APK_FILE)
          : null;
        setMeta({
          tagName: typeof release.tag_name === "string" ? release.tag_name : null,
          sizeMb:
            typeof asset?.size === "number" ? (asset.size / (1024 * 1024)).toFixed(1) : null,
        });
      })
      .catch(() => undefined); // offline: static labels stay, link still works
    return () => {
      active = false;
    };
  }, []);

  const version = meta?.tagName ? `Version ${meta.tagName.replace(/^apk-v/, "")}` : "Latest version";

  return (
    <>
      <section id="download" className="panel px-5 sm:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center">
          <Reveal>
            <span className="label mb-5">Download</span>
            <h2 className="panel-head font-lora font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-0.02em]">
              Get PolyCheck on your Android phone.
            </h2>
            <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed">
              Install the app to scan your class code, check in even without signal, and keep your digital
              student ID with you.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button type="button" onClick={() => setDownloadModalOpen(true)} className="btn btn-panel">
                <Download className="w-4 h-4" />
                Download the app
              </button>
              <a href={WEB_APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-panel-ghost">
                Use the website instead <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-relaxed">
              By installing PolyCheck you agree to the{" "}
              <Link href="/terms" className="panel-head font-bold underline underline-offset-2">Terms</Link>
              {" "}and acknowledge the{" "}
              <Link href="/privacy" className="panel-head font-bold underline underline-offset-2">Privacy Policy</Link>
              , which explains what the app collects and why.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="panel-line panel-wash mx-auto flex w-full max-w-sm flex-col items-center border p-7 text-center">
              <div className="bg-white p-3">
                <QRCodeSVG value={APK_URL} size={160} bgColor="#FFFFFF" fgColor="#7B1113" level="M" />
              </div>
              <p className="panel-head mt-4 font-lora font-bold text-xl">On a computer? Scan this with your phone.</p>
              <p className="mt-2 text-sm">
                {version}
                {meta?.sizeMb ? ` · ${meta.sizeMb} MB` : ""} · Android 8.0 or newer
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm">
                <ShieldCheck aria-hidden="true" className="panel-head w-4 h-4" /> Official signed app file from GitHub
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </>
  );
}
