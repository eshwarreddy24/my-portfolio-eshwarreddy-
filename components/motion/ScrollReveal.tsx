"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";

const emptySubscribe = () => () => {};

/** True only after the server HTML has hydrated on the client. */
function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export type RevealDirection = "left" | "right" | "up" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
}

/**
 * Section entrance animation.
 * - Reduced motion: simple opacity fade.
 * - Mobile (<768px): simple opacity + small y-rise.
 * - Desktop: directional 3D reveal (x + rotateY + scale) with perspective.
 * Animates once; content stays stable afterwards.
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className,
  amount = 0.2,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  // useIsMobile reads matchMedia synchronously, so the first client render can
  // differ from the SSR HTML (the server always assumes desktop) — that would be
  // a hydration mismatch on the inline style attribute. Instead, render the
  // server-consistent variant on the first pass (useHydrated is false during
  // hydration, matching SSR) and remount once with the correct responsive
  // variant afterwards. All reveal targets sit below the fold, so the remount
  // is invisible.
  const responsive = useHydrated() ? isMobile : false;

  const hidden = (() => {
    if (reduced) return { opacity: 0 };
    if (responsive || direction === "up" || direction === "fade") {
      return { opacity: 0, y: 24 };
    }
    return {
      opacity: 0,
      x: direction === "left" ? -72 : 72,
      rotateY: direction === "left" ? 4 : -4,
      scale: 0.97,
      transformPerspective: 1000,
    };
  })();

  return (
    <motion.div
      key={String(responsive)}
      className={className}
      initial={hidden}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotateY: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}