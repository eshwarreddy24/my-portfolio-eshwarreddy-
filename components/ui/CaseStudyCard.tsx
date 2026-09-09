"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { CaseStudy } from "@/data/caseStudies";
import { Icon } from "./icons";

const MAX_TILT = 2; // degrees — deliberately restrained

/**
 * Classic Codecademy catalog card (light theme, per screenshot reference):
 * thin near-black border, small mono uppercase label, bold navy title, gray
 * description, and a hard offset drop-shadow on hover.
 */
export default function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 160, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 160, damping: 20 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * MAX_TILT * 2);
    rotateX.set(-py * MAX_TILT * 2);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduced ? undefined : { rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
      whileHover={{ y: reduced ? -3 : -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="h-full"
    >
      <Link
        href={`/case-studies/${study.slug}`}
        className="group flex h-full flex-col rounded-lg border border-line bg-card p-6 shadow-card transition-shadow duration-200 hover:shadow-card-hover sm:p-7"
        aria-label={`${study.title} — ${study.subtitle}`}
      >
        {/* Mono label + index, like Codecademy's "Practice Project" eyebrow */}
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
            Case Study
          </p>
          <span
            aria-hidden="true"
            className="font-mono text-xs tabular-nums text-ink-faint"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-4 font-display text-xl font-bold leading-snug text-ink">
          {study.title}
        </h3>
        <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint">
          {study.subtitle}
        </p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
          {study.shortSummary}
        </p>

        <div className="mt-6 flex items-end justify-between gap-4">
          <ul className="flex flex-wrap gap-2" aria-label="Topics">
            {study.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line bg-card-2 px-2.5 py-0.5 font-mono text-[0.68rem] text-ink-soft"
              >
                {tag}
              </li>
            ))}
          </ul>
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors duration-200 group-hover:bg-ink group-hover:text-card"
          >
            <Icon name="arrow-up-right" className="size-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}