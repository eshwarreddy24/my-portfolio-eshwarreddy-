"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Icon } from "@/components/ui/icons";

/**
 * Ambient floating gradient orbs behind the hero — the same drifting-blob
 * effect Codecademy uses on its catalog pages, with a matching "Pause
 * animation" control. Decorative only (aria-hidden); killed entirely by the
 * global prefers-reduced-motion CSS override.
 */
export default function HeroOrbs() {
  const prefersReduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);

  // Gentle parallax on scroll: orbs drift apart as the page scrolls away.
  const { scrollY } = useScroll();
  const orbA = useTransform(scrollY, [0, 900], [0, -70]);
  const orbB = useTransform(scrollY, [0, 900], [0, 50]);
  const orbC = useTransform(scrollY, [0, 900], [0, -30]);

  const orb = (name: string, size: string, pos: string, bg: string) => (
    <div className={`absolute ${pos} ${size} rounded-full`}>
      <div
        className={`h-full w-full rounded-full ${name}`}
        style={{ background: bg }}
      />
    </div>
  );

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Slow scroll parallax wrapper */}
        <div className={`absolute inset-0 ${paused ? "hero-orbs-paused" : ""}`}>
          <motion.div style={prefersReduced ? undefined : { y: orbA }}>
            {orb(
              "orb-anim-a",
              "size-[34rem] sm:size-[40rem]",
              "-right-[12%] -top-[18%]",
              "radial-gradient(circle at 32% 30%, rgb(139 92 246 / 0.34), rgb(139 92 246 / 0.08) 55%, transparent 72%)"
            )}
          </motion.div>
          <motion.div style={prefersReduced ? undefined : { y: orbB }}>
            {orb(
              "orb-anim-b",
              "size-[26rem] sm:size-[32rem]",
              "-bottom-[22%] left-[8%]",
              "radial-gradient(circle at 60% 40%, rgb(99 102 241 / 0.3), rgb(99 102 241 / 0.07) 55%, transparent 72%)"
            )}
          </motion.div>
          <motion.div style={prefersReduced ? undefined : { y: orbC }}>
            {orb(
              "orb-anim-c",
              "size-[18rem] sm:size-[22rem]",
              "right-[22%] top-[30%]",
              "radial-gradient(circle at 45% 45%, rgb(217 70 239 / 0.22), rgb(217 70 239 / 0.05) 55%, transparent 72%)"
            )}
          </motion.div>
        </div>
      </div>

      {/* Pause / play control — mirrors Codecademy's hero control */}
      {!prefersReduced && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="absolute bottom-5 right-5 z-20 inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-3.5 py-1.5 font-mono text-[0.68rem] font-medium uppercase tracking-wider text-ink-soft backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent-deep"
        >
          <Icon name={paused ? "play" : "pause"} className="size-3.5" />
          {paused ? "Play animation" : "Pause animation"}
        </button>
      )}
    </>
  );
}