"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { CaseStudy } from "@/data/caseStudies";
import { Icon, type IconName } from "./icons";

const MAX_TILT = 2; // degrees — deliberately restrained

/** Original thumbnail art in Codecademy's dark-catalog style: one gradient +
 *  pattern + icon per study. */
const THUMBNAILS: Record<
  CaseStudy["slug"],
  { gradient: string; icon: IconName }
> = {
  reconciliation: {
    gradient: "bg-linear-to-br from-violet-600 via-indigo-600 to-indigo-950",
    icon: "file-check",
  },
  "statutory-analysis": {
    gradient: "bg-linear-to-br from-fuchsia-600 via-violet-600 to-indigo-950",
    icon: "scale",
  },
  "budget-controls": {
    gradient: "bg-linear-to-br from-indigo-500 via-blue-600 to-indigo-950",
    icon: "calculator",
  },
  "excel-automation": {
    gradient: "bg-linear-to-br from-violet-500 via-purple-600 to-fuchsia-950",
    icon: "bar-chart",
  },
};

export default function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const thumb = THUMBNAILS[study.slug];

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 160, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 160, damping: 20 });

  // Cursor-follow spotlight position (percentages, 0–100).
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const springSpotX = useSpring(spotX, { stiffness: 200, damping: 28 });
  const springSpotY = useSpring(spotY, { stiffness: 200, damping: 28 });
  const spotlight = useMotionTemplate`radial-gradient(15rem circle at ${springSpotX}% ${springSpotY}%, rgb(255 255 255 / 0.18), transparent 55%)`;

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * MAX_TILT * 2);
    rotateX.set(-py * MAX_TILT * 2);
    spotX.set((px + 0.5) * 100);
    spotY.set((py + 0.5) * 100);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    spotX.set(50);
    spotY.set(50);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduced ? undefined : { rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
      whileHover={{ y: reduced ? -4 : -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="h-full"
    >
      <Link
        href={`/case-studies/${study.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-card transition-all duration-300 hover:border-accent/45 hover:shadow-card-hover"
        aria-label={`${study.title} — ${study.subtitle}`}
      >
        {/* Thumbnail graphic */}
        <div
          className={`relative h-32 shrink-0 overflow-hidden sm:h-36 ${thumb.gradient}`}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-40" />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(16rem 10rem at 15% -20%, rgb(255 255 255 / 0.28), transparent 55%)",
            }}
          />
          {/* Cursor-follow spotlight (pointer interface) */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={reduced ? undefined : { background: spotlight }}
          />
          <span
            aria-hidden="true"
            className="absolute right-4 top-2 font-mono text-4xl font-bold tracking-tight text-white/25 sm:text-5xl"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm">
              <Icon name={thumb.icon} className="size-4.5" />
            </span>
            <span className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.18em] text-white/85">
              Case Study
            </span>
          </div>
          {/* Hover-reveal pill, like Codecademy's card hover layers */}
          <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-full border border-white/25 bg-card/85 px-4 py-2 text-sm font-semibold text-ink shadow-panel backdrop-blur-sm">
              View case study
              <Icon
                name="arrow-up-right"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </span>
          <span className="absolute bottom-3 right-4 flex size-9 items-center justify-center rounded-full border border-white/25 bg-card/70 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            <Icon name="arrow-up-right" className="size-4" />
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="font-display text-xl font-semibold leading-snug text-ink">
            {study.title}
          </h3>
          <p className="mt-1.5 font-mono text-xs uppercase tracking-wide text-accent-deep">
            {study.subtitle}
          </p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
            {study.shortSummary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
            {study.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line bg-card-2 px-2.5 py-0.5 font-mono text-[0.7rem] text-ink-soft"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.div>
  );
}