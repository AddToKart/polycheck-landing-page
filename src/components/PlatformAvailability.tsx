"use client";

import { useState } from "react";
import { Globe, Smartphone, Apple, Download, ExternalLink } from "lucide-react";
import DownloadModal from "./DownloadModal";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { WEB_APP_URL } from "@/lib/config";

const platforms = [
  {
    icon: Smartphone,
    name: "Android phone",
    description:
      "The app for students and teachers. Scan quickly, check in without signal, and keep your digital student ID with you. Needs Android 8.0 or newer.",
    cta: "Download the app",
    action: "download" as const,
  },
  {
    icon: Globe,
    name: "Any web browser",
    description:
      "Use PolyCheck on a computer or phone without installing from a file. You can also add it to your home screen like an app.",
    cta: "Open the website",
    action: "web" as const,
  },
  {
    icon: Apple,
    name: "iPhone and iPad",
    description:
      "There is no iPhone app yet. Open the website in Safari, tap Share, then Add to Home Screen.",
    cta: "Open the website",
    action: "web" as const,
  },
];

export default function PlatformAvailability() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <>
      <section className="bg-soft border-y px-5 sm:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label="Where to use it" title="On your phone or computer." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {platforms.map((platform, i) => (
              <Reveal key={platform.name} delay={i * 90}>
                <div className="card card-edge flex h-full flex-col p-6 lg:p-8">
                  <div className="icon-box mb-5">
                    <platform.icon aria-hidden="true" className="w-6 h-6" />
                  </div>
                  <h3 className="font-lora font-bold text-2xl text-ink mb-2">{platform.name}</h3>
                  <p className="mb-6 flex-1 text-[15px] leading-relaxed text-muted">{platform.description}</p>
                  {platform.action === "download" ? (
                    <button type="button" onClick={() => setDownloadModalOpen(true)} className="btn btn-primary w-full">
                      <Download className="w-4 h-4" /> {platform.cta}
                    </button>
                  ) : (
                    <a href={WEB_APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full">
                      {platform.cta} <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </>
  );
}
