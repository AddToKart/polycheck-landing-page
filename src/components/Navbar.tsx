"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, Download } from "lucide-react";
import Link from "next/link";
import DownloadModal from "./DownloadModal";
import { useSignUpOpen } from "@/lib/registration";

const navLinks = [
  { label: "How it works", href: "/#how" },
  { label: "Features", href: "/#features" },
  { label: "Who it's for", href: "/#roles" },
  { label: "Fair attendance", href: "/#fair" },
  { label: "Download", href: "/#download" },
];

// Maroon with golden text in light mode, near-black in dark mode: the dashboard's top bar.
const BAR = "bg-maroon dark:bg-[#09090B] text-white";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const signUpOpen = useSignUpOpen();

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <nav
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-50 h-16 border-b border-golden/25 ${BAR} [&_:focus-visible]:outline-golden`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-full flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export serves the file as is */}
            <img src="/logo.png" alt="PolyCheck logo" width={36} height={36} className="w-9 h-9 shrink-0" />
            <span className="font-lora font-bold text-xl text-golden tracking-tight">PolyCheck</span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium text-white/85 hover:text-golden transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center text-golden hover:bg-white/10 transition-colors"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {signUpOpen ? (
              <Link
                href="/register"
                className="hidden lg:inline-flex h-10 items-center border border-golden px-4 text-xs font-bold uppercase tracking-[0.1em] text-golden hover:bg-white/10"
              >
                Sign up
              </Link>
            ) : null}

            <button
              type="button"
              onClick={() => setDownloadModalOpen(true)}
              className="hidden lg:inline-flex h-10 items-center gap-1.5 bg-golden px-4 text-xs font-bold uppercase tracking-[0.1em] text-maroon-dark hover:bg-[#f0d200]"
            >
              <Download className="w-3.5 h-3.5" />
              Get the app
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex h-11 w-11 items-center justify-center text-white"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            id="mobile-menu"
            className={`lg:hidden absolute top-16 left-0 right-0 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-golden/25 shadow-xl ${BAR}`}
          >
            <div className="px-4 sm:px-6 py-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-white/10 py-3.5 text-base font-medium text-white hover:text-golden"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                {signUpOpen ? (
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="btn border-golden text-golden"
                  >
                    Sign up
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setDownloadModalOpen(true);
                  }}
                  className="btn bg-golden text-maroon-dark"
                >
                  <Download className="w-4 h-4" />
                  Get the app
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </>
  );
}
