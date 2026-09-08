import type { ReactNode } from "react";

export default function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent";
}) {
  return (
    <span
      className={
        tone === "accent"
          ? "inline-flex items-center rounded-full border border-accent/25 bg-accent-soft px-3 py-1 font-mono text-xs font-medium text-accent-deep"
          : "inline-flex items-center rounded-full border border-line bg-card px-3 py-1 text-sm text-ink-soft"
      }
    >
      {children}
    </span>
  );
}