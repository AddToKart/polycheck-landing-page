"use client";

import { useEffect, useState } from "react";
import { Download, QrCode, ShieldCheck, ArrowRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import DownloadModal from "./DownloadModal";
import Reveal from "./Reveal";
import { APK_FILE, APK_URL, LATEST_RELEASE_API, WEB_APP_URL } from "@/lib/config";

/**
 * The download permalink maintained by the monorepo's flutter-android-release
 * workflow: every push to main/dev rebuilds the signed APK and re-attaches it
 * to the GitHub Release marked latest under this fixed filename.
 */

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

  return (
    <>
      <section
        id="download"
        className="py-24 md:py-32 bg-maroon dark:bg-maroon-dark px-6 md:px-8 relative overflow-hidden text-white grain"
      >
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-golden/10 blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div aria-hidden="true" className="flex justify-center mb-8">
            <div className="pup-star-gold scale-[0.8]" />
          </div>

          <Reveal>
            <span className="kicker kicker--center kicker--light mb-6">Ready to Try Polycheck?</span>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-lora font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
              Download the Android APK
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto font-dmSans mb-10">
              Experience the full attendance management system on your Android device. Scan dynamic QR codes, track your class progress, and test offline attendance capabilities.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="glass-maroon p-8 max-w-xl mx-auto mb-10 relative">
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <span className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-golden/70" />
                <span className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-golden/70" />
                <span className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-golden/70" />
                <span className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-golden/70" />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6 pb-6 border-b border-golden/20">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-lora font-bold text-xl text-white">Polycheck Mobile</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-golden/20 text-golden border border-golden/30">
                      {meta?.tagName ?? "latest release"}
                    </span>
                  </div>
                  <p className="text-xs text-white/70 font-mono">
                    {meta?.sizeMb ? `${meta.sizeMb} MB` : "Signed release"} · Android 8.0+
                  </p>
                  <p className="text-[11px] text-golden mt-2 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Signed release · hosted on GitHub Releases
                  </p>
                </div>

                <div className="p-2 bg-white text-center flex-shrink-0 flex flex-col items-center shadow-lg">
                  <QRCodeSVG
                    value={APK_URL}
                    size={96}
                    bgColor="#FFFFFF"
                    fgColor="#7B1113"
                    level="M"
                  />
                  <span className="text-[9px] font-bold uppercase block mt-1 text-maroon font-mono">Scan to DL</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDownloadModalOpen(true)}
                className="btn-gold w-full"
              >
                <Download className="w-4 h-4" />
                <span>Download APK Package</span>
              </button>
            </div>
          </Reveal>

          <div className="flex items-center justify-center gap-4 text-xs font-dmSans">
            <a
              href={WEB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-golden underline hover:text-golden/80 font-bold transition-colors inline-flex items-center gap-1"
            >
              <span>Or launch the web dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </>
  );
}
