"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import HeroScene from "@/components/three/HeroScene";
import HeroOrbs from "@/components/sections/HeroOrbs";
import { siteConfig } from "@/data/siteConfig";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: reduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: {
      duration: 0.7,
      ease: EASE,
      delay,
    },
  });

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-paper"
    >
      {/* 3D network (or static fallback) — decorative, behind content */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Codecademy-style ambient gradient orbs + pause control */}
      <HeroOrbs />

      {/* Readability scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-paper via-paper/80 to-paper/10 sm:via-paper/60"
      />

      <div className="page-container relative z-10 py-24 sm:py-28">
        <div className="max-w-2xl">
          <motion.p
            {...rise(0.05)}
            className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-deep"
          >
            <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-accent" />
            {siteConfig.hero.kicker}
          </motion.p>

          <motion.h1
            {...rise(0.15)}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            {...rise(0.25)}
            className="mt-5 text-base font-semibold leading-relaxed text-ink sm:text-lg"
          >
            {siteConfig.headline.split(" | ").map((part, i, arr) => (
              <span key={part}>
                {part}
                {i < arr.length - 1 && (
                  <span aria-hidden="true" className="mx-2 text-accent">
                    |
                  </span>
                )}
              </span>
            ))}
          </motion.p>

          <motion.p {...rise(0.35)} className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
            {siteConfig.hero.summary}
          </motion.p>

          <motion.div
            {...rise(0.45)}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href={siteConfig.hero.cta.primary.href} variant="primary" size="lg" icon="arrow-right">
              {siteConfig.hero.cta.primary.label}
            </Button>
            <Button href={siteConfig.hero.cta.secondary.href} variant="secondary" size="lg">
              {siteConfig.hero.cta.secondary.label}
            </Button>
            <Button href={siteConfig.hero.cta.resume.href} variant="secondary" size="lg" icon="download" download>
              {siteConfig.hero.cta.resume.label}
            </Button>
          </motion.div>

          <motion.div
            {...rise(0.55)}
            className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <Button href={siteConfig.hero.cta.linkedin.href} variant="ghost" size="sm" icon="external" external>
              {siteConfig.hero.cta.linkedin.label}
            </Button>
            <Button href={siteConfig.hero.cta.contact.href} variant="ghost" size="sm" icon="mail">
              {siteConfig.hero.cta.contact.label}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}