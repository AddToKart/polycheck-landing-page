"use client";

import { useState } from "react";
import { Globe, Smartphone, Apple, Download, Monitor } from "lucide-react";
import DownloadModal from "./DownloadModal";
import Reveal from "./Reveal";
import { WEB_APP_URL } from "@/lib/config";

const platforms = [
  {
    icon: Globe,
    name: "Web Dashboard",
    tag: "Faculty, Admins & Students",
    description:
      "Manage subjects and sections, activate sessions, review disputes and proof-of-class photos, and export attendance reports. Installable as a PWA.",
    badge: "Live Web Console",
    cta: "Open Web Dashboard",
    actionType: "link" as const,
  },
  {
    icon: Smartphone,
    name: "Android App",
    tag: "Students, Officers & Faculty",
    description:
      "Native Flutter app for students and faculty. Rapid QR scanning, offline attendance queue that syncs when you reconnect, and your digital student ID.",
    badge: "Official signed APK",
    cta: "Download APK",
    actionType: "modal" as const,
  },
  {
    icon: Apple,
    name: "iOS & iPadOS",
    tag: "Not yet available",
    description:
      "There is no native iOS build yet. iPhone and iPad users can open the web dashboard in Safari and add it to the Home Screen as a PWA.",
    badge: "Coming Soon",
    cta: "Use the Web App on iOS",
    actionType: "ios" as const,
  },
];

export default function PlatformAvailability() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <>
      <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900/40 px-6 md:px-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="kicker kicker--center mb-5">Available On</span>
              <h2 className="font-lora font-bold text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-white mb-4">
                Every device.
              </h2>
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-dmSans">
                Seamlessly sync attendance whether you are teaching at the podium or scanning in class.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, idx) => (
              <Reveal key={platform.name} delay={idx * 100}>
                <div className="bento-card p-8 flex flex-col justify-between h-full relative overflow-hidden">
                  <div aria-hidden="true" className="absolute top-0 left-0 h-[3px] w-12 bg-golden" />
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 bg-maroon/5 dark:bg-golden/10 flex items-center justify-center text-maroon dark:text-golden border border-maroon/10 dark:border-golden/20">
                        <platform.icon className="w-7 h-7" />
                      </div>
                      <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
                        {platform.badge}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider text-maroon dark:text-golden block mb-1">
                      {platform.tag}
                    </span>

                    <h3 className="font-lora font-bold text-2xl text-zinc-900 dark:text-white mb-3">
                      {platform.name}
                    </h3>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-dmSans mb-8">
                      {platform.description}
                    </p>
                  </div>

                  <div>
                    {platform.actionType === "modal" ? (
                      <button
                        type="button"
                        onClick={() => setDownloadModalOpen(true)}
                        className="btn-primary w-full"
                      >
                        <Download className="w-4 h-4" /> {platform.cta}
                      </button>
                    ) : platform.actionType === "link" ? (
                      <a
                        href={WEB_APP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost w-full"
                      >
                        <Monitor className="w-4 h-4" /> {platform.cta}
                      </a>
                    ) : (
                      <a
                        href={WEB_APP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost w-full opacity-90"
                      >
                        {platform.cta}
                      </a>
                    )}
                  </div>
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
