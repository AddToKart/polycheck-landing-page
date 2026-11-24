"use client";

import { useEffect, useRef, useState } from "react";
import { Download, X, ShieldCheck, CheckCircle2, FileCode, Copy, Check } from "lucide-react";
import { APK_FILE, APK_URL, LATEST_RELEASE_API, RELEASES_PAGE } from "@/lib/config";

/**
 * Live metadata for the pinned GitHub Release the download button serves.
 * All fields optional — the modal renders the metadata grid only when the
 * release lookup succeeds, and the download link is always a real permalink:
 *
 *   https://github.com/AddToKart/polycheck/releases/latest/download/polycheck-release.apk
 *
 * That URL is maintained by the monorepo's `flutter-android-release.yml`
 * workflow, which re-attaches `polycheck-release.apk` to the release marked
 * latest on every push to main/dev, so this page never needs a redeploy when
 * a new APK ships.
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
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-md animate-fade-in-up"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-modal-title"
        tabIndex={-1}
        className="relative w-full max-w-lg bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl shadow-maroon/20 overflow-hidden focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onDialogKeyDown}
      >
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-golden/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-maroon/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-maroon flex items-center justify-center text-golden font-lora font-bold text-2xl shadow-md shadow-maroon/30 flex-shrink-0">
            P
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 id="download-modal-title" className="font-lora font-bold text-xl text-zinc-900 dark:text-white">
                Polycheck APK
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-golden/20 text-maroon-dark dark:text-golden border border-golden/30">
                {meta?.tagName ?? "latest release"}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Android Application Package · Official PUP Release
              {buildDate ? ` · ${buildDate}` : ""}
            </p>
          </div>
        </div>

        {/* Metadata Badges — live from the GitHub Release */}
        {meta ? (
          <div className="grid grid-cols-3 gap-3 mb-6 p-3 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 text-center">
            <div>
              <p className="text-[10px] uppercase font-semibold text-zinc-400">File Size</p>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                {meta.sizeMb ? `${meta.sizeMb} MB` : "—"}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-zinc-400">Min Android</p>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">8.0 (Oreo)</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-zinc-400">Security</p>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Signed
              </p>
            </div>
          </div>
        ) : null}

        {/* Installation Steps */}
        <div className="mb-6 space-y-2.5">
          <p className="text-xs font-bold uppercase tracking-wider text-maroon dark:text-golden">
            Quick Setup Steps:
          </p>
          <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-golden flex-shrink-0 mt-0.5" />
              <span>Tap <strong>Download Package</strong> to fetch the signed release APK.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-golden flex-shrink-0 mt-0.5" />
              <span>Allow &quot;Install from unknown sources&quot; in Android settings if prompted.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-golden flex-shrink-0 mt-0.5" />
              <span>Open Polycheck, grant Location &amp; Camera permissions to start scanning!</span>
            </li>
          </ul>
        </div>

        {/* Checksum Info */}
        {meta?.sha256 ? (
          <div className="mb-6 p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="overflow-hidden mr-2">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                <FileCode className="w-3 h-3" /> SHA-256 Checksum
              </p>
              <p className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 truncate">
                {meta.sha256.slice(0, 28)}…
              </p>
            </div>
            <button
              type="button"
              onClick={copyHash}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors flex-shrink-0"
              title="Copy checksum"
              aria-label="Copy SHA-256 checksum"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ) : null}

        {/* CTA — a real permalink; the browser handles the download */}
        {downloaded ? (
          <div className="text-center p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Download started — if it did not, use the button again.
          </div>
        ) : (
          <a
            href={APK_URL}
            download={FALLBACK_FILE}
            onClick={() => setDownloaded(true)}
            rel="noopener"
            className="btn-gold w-full flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" /> Download Package{meta?.sizeMb ? ` (${meta.sizeMb} MB)` : ""}
          </a>
        )}
        <p className="mt-3 text-center text-[11px] text-zinc-500 dark:text-zinc-400">
          Always the latest signed build ·{" "}
          <a href={RELEASES_PAGE} target="_blank" rel="noopener noreferrer" className="underline hover:text-maroon dark:hover:text-golden">
            all releases
          </a>
        </p>
      </div>
    </div>
  );
}
