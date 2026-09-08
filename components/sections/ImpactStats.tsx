"use client";

import { siteConfig } from "@/data/siteConfig";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { Icon, type IconName } from "@/components/ui/icons";

function StatCard({
  stat,
}: {
  stat: (typeof siteConfig.impactStats)[number];
}) {
  const isNumeric = typeof stat.value === "number";
  return (
    <div className="h-full rounded-2xl border border-line bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
        <Icon name={stat.icon as IconName} className="size-5" />
      </div>
      <div className="mt-4">
        {isNumeric ? (
          <AnimatedCounter
            value={stat.value as number}
            suffix={stat.suffix}
            className="font-mono text-3xl font-semibold tabular-nums text-ink"
          />
        ) : (
          <p className="font-mono text-2xl font-semibold leading-snug text-ink">
            {stat.label.split(" — ")[0]}
          </p>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{stat.label}</p>
    </div>
  );
}

export default function ImpactStats() {
  return (
    <section aria-label="Key metrics" className="relative bg-paper py-10 sm:py-14">
      <div className="page-container">
        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.impactStats.map((stat) => (
            <StaggerItem key={stat.label} className="h-full">
              <StatCard stat={stat} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}