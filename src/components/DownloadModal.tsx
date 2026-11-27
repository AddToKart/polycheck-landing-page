"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, X, ShieldCheck, CheckCircle2, FileCode, Copy, Check } from "lucide-react";
import { APK_FILE, APK_URL, LATEST_RELEASE_API, RELEASES_PAGE } from "@/lib/config";

/**
 * Live metadata for the pinned GitHub Release the download button serves.
 * All fields optional — the modal renders the metadata grid only when the
 * release lookup succeeds, and the download link is always a real permalink:
 *
 *   https://github.com/AddToKart/polycheck/releases/latest/download/polycheck-release.apk
 *
 * Publishing a release with `polycheck-release.apk` and marking it latest is
 * all it takes to ship a new APK; this page never needs a redeploy.
 */
interface ReleaseMeta {
  tagName: string | null
  sizeMb: string | null
  sha256: string | null
  publishedAt: string | null
}

const LATEST_API = LATEST_RELEASE_API
const FALLBACK_FILE = APK_FILE

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [meta, setMeta] = useState<ReleaseMeta | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    fetch(LATEST_API, { headers: { Accept: "application/vnd.github+json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((release) => {
        if (!active || !release) return;
        const asset = Array.isArray(release.assets)
          ? release.assets.find((a: { name: string }) => a.name === FALLBACK_FILE)
          : null;
        const sizeBytes = typeof asset?.size === "number" ? asset.size : null;
        setMeta({
          tagName: typeof release.tag_name === "string" ? release.tag_name : null,
          sizeMb: sizeBytes !== null ? (sizeBytes / (1024 * 1024)).toFixed(1) : null,
          sha256: typeof asset?.digest === "string" && asset.digest.startsWith("sha256:")
            ? asset.digest.slice("sha256:".length)
            : null,
          publishedAt: typeof release.published_at === "string" ? release.published_at : null,
        });
      })
      .catch(() => undefined); // offline: the download link still works
    return () => {
      active = false;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, [isOpen]);

  const onDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) return null;

  const copyHash = () => {
    if (!meta?.sha256) return;
    navigator.clipboard.writeText(meta.sha256);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const versionLabel = meta?.tagName?.replace(/^apk-v/, "") ?? "latest";
  const buildDate = meta?.publishedAt
    ? new Date(meta.publishedAt).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-modal-title"
        tabIndex={-1}
        className="card relative w-full max-w-lg border-t-4 !border-t-accent p-6 sm:p-8 shadow-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain text-ink focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onDialogKeyDown}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 pr-9">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export serves the file as is */}
          <img src="/logo.png" alt="PolyCheck logo" width={56} height={56} className="w-14 h-14 flex-shrink-0" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 id="download-modal-title" className="font-lora font-bold text-xl text-zinc-900 dark:text-white">
                Get the Android app
              </h3>
              <span className="badge badge-present">
                {meta?.tagName ? `Version ${versionLabel}` : "Latest version"}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Official PolyCheck app file (APK)
              {buildDate ? ` · ${buildDate}` : ""}
            </p>
          </div>
        </div>

        {/* Metadata Badges — live from the GitHub Release */}
        {meta ? (
          <div className="grid grid-cols-3 gap-3 mb-6 p-3 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 text-center">
            <div>
              <p className="text-[10px] uppercase font-semibold text-zinc-400">Size</p>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                {meta.sizeMb ? `${meta.sizeMb} MB` : "—"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-zinc-400">Needs</p>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Android 8.0+</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-zinc-400">App file</p>
              <p className="text-sm font-bold text-accent flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Signed
              </p>
            </div>
          </div>
        ) : null}

        {/* Installation Steps */}
        <div className="mb-6 space-y-2.5">
          <p className="text-xs font-bold uppercase tracking-wider text-maroon dark:text-golden">
            How to install
          </p>
          <ol className="text-sm text-zinc-600 dark:text-zinc-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-golden text-xs font-bold text-maroon-dark">1</span>
              <span>Tap <strong>Download</strong> and wait for the file to finish.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-golden text-xs font-bold text-maroon-dark">2</span>
              <span>Open the file. If your phone asks, allow installing from this source.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-golden text-xs font-bold text-maroon-dark">3</span>
              <span>Open PolyCheck and allow the camera and location so you can check in.</span>
            </li>
          </ol>
        </div>

        {/* Checksum Info */}
        {meta?.sha256 ? (
          <div className="mb-6 p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="overflow-hidden mr-2">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                <FileCode className="w-3 h-3" /> Advanced: file fingerprint (SHA-256)
              </p>
              <p className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 truncate">
                {meta.sha256.slice(0, 28)}…
              </p>
            </div>
            <button
              type="button"
              onClick={copyHash}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors flex-shrink-0"
              title="Copy"
              aria-label="Copy the file fingerprint"
            >
              {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ) : null}

        <p className="mb-3 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          The app uses your camera and, for face-to-face classes, your location at scan time. Read the{" "}
          <Link href="/privacy" className="underline hover:text-maroon dark:hover:text-golden">Privacy Policy</Link>{" "}
          and{" "}
          <Link href="/terms" className="underline hover:text-maroon dark:hover:text-golden">Terms</Link>{" "}
          before you install.
        </p>

        {/* CTA — a real permalink; the browser handles the download */}
        {downloaded ? (
          <div className="text-center p-3 bg-golden text-maroon-dark font-bold text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" /> Download started. Check your notifications or Downloads folder.
          </div>
        ) : (
          <a
            href={APK_URL}
            download={FALLBACK_FILE}
            onClick={() => setDownloaded(true)}
            rel="noopener"
            className="btn btn-primary w-full"
          >
            <Download className="w-5 h-5" /> Download{meta?.sizeMb ? ` (${meta.sizeMb} MB)` : ""}
          </a>
        )}
        <p className="mt-3 text-center text-[11px] text-zinc-500 dark:text-zinc-400">
          Always the newest version ·{" "}
          <a href={RELEASES_PAGE} target="_blank" rel="noopener noreferrer" className="underline hover:text-maroon dark:hover:text-golden">
            older versions
          </a>
        </p>
      </div>
    </div>
  );
}
