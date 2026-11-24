"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, Download } from "lucide-react";
import Link from "next/link";
import DownloadModal from "./DownloadModal";

const navLinks = [
  { label: "Overview", href: "#stage" },
  { label: "Features", href: "#features" },
  { label: "Download", href: "#download" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 dark:bg-[#070709]/85 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 bg-maroon dark:bg-golden flex items-center justify-center text-golden dark:text-maroon-dark font-lora font-bold text-lg transition-transform group-hover:-translate-y-0.5">
              P
              <span aria-hidden="true" className="absolute inset-x-0 -bottom-[3px] h-[3px] bg-golden dark:bg-maroon" />
            </div>
            <span className="font-lora font-bold text-xl text-zinc-900 dark:text-white tracking-tight">
              Polycheck
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-300 hover:text-maroon dark:hover:text-golden transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-maroon dark:after:bg-golden after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/80 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-golden" />}
            </button>

            {/* Download Button - Desktop */}
            <button
              type="button"
              onClick={() => setDownloadModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 text-[11px] font-bold font-dmSans uppercase tracking-[0.18em] bg-maroon text-golden dark:bg-golden dark:text-maroon-dark border border-maroon dark:border-golden hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get APK</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div id="mobile-menu" className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-[#070709]/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 shadow-xl">
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700 dark:text-zinc-200 hover:text-maroon dark:hover:text-golden transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setDownloadModalOpen(true);
                }}
                className="w-full text-center px-4 py-3 text-xs font-bold uppercase tracking-wider bg-golden text-maroon-dark shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Get APK</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* APK Download Drawer Modal */}
      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </>
  );
}
