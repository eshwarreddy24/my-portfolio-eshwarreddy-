"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function StaggerContainer({
  children,
  className,
  delayChildren = 0.05,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();

  const container: Variants = reduced
    ? { hidden: {}, show: {} }
    : {
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  const item: Variants = reduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 26 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE_OUT },
        },
      };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}