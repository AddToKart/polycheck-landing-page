"use client";

import { useState } from "react";
import { Download, Check, Globe } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import DownloadModal from "./DownloadModal";
import Link from "next/link";
import { useSignUpOpen } from "@/lib/registration";
import { DEMO_QR_PAYLOAD, WEB_APP_URL } from "@/lib/config";

const promises = [
  "Works even with no signal in class",
  "Checks you're in the room for face-to-face classes",
  "One signed-in device per student",
];

export default function Hero() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const signUpOpen = useSignUpOpen();

  return (
    <>
      {/* Split like the dashboard's sign-in screen: brand block beside a plain work area. */}
      <section className="pt-16 grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] lg:min-h-[min(100svh,54rem)]">
        <div className="panel flex items-center px-5 sm:px-8 lg:pr-12 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))] py-12 sm:py-16">
          <div className="w-full max-w-xl">
            <span className="label mb-6">Class attendance app</span>

            <h1 className="panel-head font-lora font-bold text-[clamp(3.25rem,13vw,6rem)] leading-[0.95] tracking-[-0.03em]">
              PolyCheck.
            </h1>
            <p className="mt-5 font-lora font-bold text-2xl sm:text-3xl leading-snug">
              Scan once. You&apos;re marked present.
            </p>
            <p className="mt-4 max-w-lg text-base sm:text-lg leading-relaxed">
              Your teacher shows a QR code, you scan it with your phone, and your attendance is saved. No paper
              sheet to pass around.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3">
              {signUpOpen ? (
                <Link href="/register" className="btn btn-panel">
                  Sign up for an account
                </Link>
              ) : null}
              <button
                type="button"
                onClick={() => setDownloadModalOpen(true)}
                className={`btn ${signUpOpen ? "btn-panel-ghost" : "btn-panel"}`}
              >
                <Download className="w-4 h-4" />
                Get the Android app
              </button>
              <a href={WEB_APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-panel-ghost">
                <Globe className="w-4 h-4" />
                Use it in your browser
              </a>
            </div>

            <ul className="mt-10 border-t panel-line pt-6 space-y-3">
              {promises.map((promise) => (
                <li key={promise} className="flex items-start gap-3 text-sm sm:text-base">
                  <Check aria-hidden="true" className="panel-head mt-0.5 w-5 h-5 shrink-0" strokeWidth={3} />
                  {promise}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The whole idea in one picture: the teacher's code, then the student's result. */}
        <div className="flex items-center justify-center bg-page px-5 sm:px-8 py-12 sm:py-16">
          <figure className="w-full max-w-sm">
            <div className="card shadow-[0_30px_60px_-40px_rgba(74,10,11,0.55)]">
              <div className="flex items-center justify-between gap-3 border-b px-5 py-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Your teacher shows</p>
                  <p className="font-lora font-bold text-lg text-ink">Software Engineering</p>
                </div>
                <span className="badge badge-late">Open</span>
              </div>
              <div className="flex flex-col items-center px-5 pt-6 pb-14">
                <div className="relative bg-white p-3 border border-zinc-200">
                  <QRCodeSVG value={DEMO_QR_PAYLOAD} size={184} bgColor="#FFFFFF" fgColor="#7B1113" level="H" />
                  <div aria-hidden="true" className="scan-line absolute inset-x-1 h-[3px] bg-golden shadow-[0_0_10px_#FFDF00]" />
                </div>
                <p className="mt-3 text-sm text-muted">Closes when the time is up</p>
              </div>
            </div>

            <div className="stamp relative -mt-8 mx-3 sm:-mx-6 card card-edge p-4 sm:p-5 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.45)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted mb-2">Your phone shows</p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-lora font-bold text-xl text-ink">You&apos;re checked in</p>
                <span className="badge badge-present">
                  <Check aria-hidden="true" className="w-3.5 h-3.5" strokeWidth={3.5} /> Present
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">8:02 AM · inside the classroom area</p>
            </div>

            <figcaption className="mt-4 text-center text-xs text-muted">
              Example only. This code does not check anyone in.
            </figcaption>
          </figure>
        </div>
      </section>

      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </>
  );
}
