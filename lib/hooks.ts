"use client";

import { useEffect, useState } from "react";

/** True once the viewport is at or below the given breakpoint (default 768px). */
export function useIsMobile(breakpoint = 768): boolean {
  // Initialise synchronously when a window exists so below-the-fold reveals
  // pick the right (mobile) variant from the very first client render.
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

/** Tracks which section id is currently in view (for navbar highlighting). */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/**
 * Synchronous-first prefers-reduced-motion detection. Unlike framer-motion's
 * useReducedMotion (which returns null on the first client render), this
 * reads matchMedia during the initial render so heavy effects can be skipped
 * from the very first paint. SSR renders the non-reduced branch (false).
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

/**
 * Current color theme ("light" | "dark"), driven by the .dark class on
 * <html> that the pre-hydration inline script in app/layout.tsx sets.
 * SSR-safe: always starts "light" and syncs after mount, so server and
 * client HTML match (the <html> element itself is suppressHydrationWarning).
 */
export function useTheme(): {
  theme: "light" | "dark";
  toggle: () => void;
} {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const sync = () =>
      setTheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    sync();
    // Keep in sync if the class is changed elsewhere (e.g. another tab).
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — class toggle still applies for this visit */
    }
    setTheme(next);
  };

  return { theme, toggle };
}

/** Lightweight WebGL support detection. */
export function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}