"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { useActiveSection, useTheme } from "@/lib/hooks";
import { Icon } from "@/components/ui/icons";

const SECTION_IDS = ["about", "experience", "case-studies", "skills", "certifications", "resume", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const { theme, toggle } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open; close on Escape.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  const navLinks = useMemo(() => siteConfig.nav, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-paper/85 shadow-nav backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="page-container flex h-16 items-center justify-between gap-4">
        <Link
          href="#top"
          onClick={close}
          className="flex items-center gap-2.5"
          aria-label={`${siteConfig.name} — back to top`}
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-white">
            <Icon name="workflow" className="size-4.5" />
          </span>
          <span className="font-display text-[0.95rem] font-semibold tracking-tight text-ink">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`group rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent-soft text-accent-deep"
                      : "text-ink-soft hover:bg-card hover:text-ink"
                  }`}
                >
                  <span className="relative">
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={toggle}
            aria-pressed={theme === "dark"}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex size-9 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors hover:border-accent hover:text-accent-deep"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} className="size-4" />
          </button>
          <a
            href={siteConfig.resume}
            download="Gali-Eshwar-Reddy-Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            <Icon name="download" className="size-4" />
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg border border-line bg-card text-ink lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? "x" : "menu"} className="size-5" />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-b border-line bg-paper/95 backdrop-blur-md lg:hidden"
          >
            <ul className="page-container flex max-h-[70vh] flex-col overflow-y-auto py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={close}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-[0.95rem] font-medium text-ink-soft transition-colors hover:bg-accent-soft hover:text-accent-deep"
                  >
                    {link.label}
                    <Icon name="chevron-right" className="size-4 text-ink-faint" />
                  </a>
                </li>
              ))}
              <li className="flex gap-2 px-3 pb-2">
                <button
                  type="button"
                  onClick={toggle}
                  aria-pressed={theme === "dark"}
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors hover:border-accent hover:text-accent-deep"
                >
                  <Icon name={theme === "dark" ? "sun" : "moon"} className="size-4" />
                </button>
                <a
                  href={siteConfig.resume}
                  download="Gali-Eshwar-Reddy-Resume.pdf"
                  onClick={close}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
                >
                  <Icon name="download" className="size-4" />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}