"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { Icon, type IconName } from "@/components/ui/icons";
import { aaiExperience, organoExperience } from "@/data/experience";

function RoleHeader({
  org,
  role,
  period,
  location,
}: {
  org: string;
  role: string;
  period: string;
  location: string;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{org}</h3>
        <p className="mt-1 text-sm font-medium text-accent-deep">{role}</p>
        <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-ink-faint">
          <Icon name="map-pin" className="size-3.5" />
          {location}
        </p>
      </div>
      <span className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-xs font-medium text-ink-soft">
        {period}
      </span>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-label="Professional experience" className="bg-card py-24 sm:py-28">
      <div className="page-container">
        <SectionHeading
          eyebrow="Experience"
          title="Professional experience"
          description="Operational and financial-control work in regulated environments — organised around the capabilities it built."
        />

        <div className="mt-14">
          {/* AAI */}
          <ScrollReveal direction="right">
            <div className="rounded-2xl border border-line bg-card p-6 shadow-card sm:p-9">
              <RoleHeader
                org={aaiExperience.org}
                role={aaiExperience.role}
                period={aaiExperience.period}
                location={aaiExperience.location}
              />
              <p className="mt-5 max-w-3xl text-[0.95rem] leading-relaxed text-ink-soft">
                {aaiExperience.summary}
              </p>

              <StaggerContainer
                className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                stagger={0.07}
              >
                {aaiExperience.areas.map((area) => (
                  <StaggerItem key={area.title} className="h-full">
                    <div className="h-full rounded-xl border border-line bg-paper p-5">
                      <div className="flex items-center gap-2.5">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent-deep">
                          <Icon name={area.icon as IconName} className="size-4" />
                        </span>
                        <h4 className="text-[0.95rem] font-semibold text-ink">
                          {area.title}
                        </h4>
                      </div>
                      <ul className="mt-3.5 space-y-2">
                        {area.points.map((point) => (
                          <li key={point} className="flex gap-2 text-[0.84rem] leading-relaxed text-ink-soft">
                            <span aria-hidden="true" className="mt-[0.45em] size-1 shrink-0 rounded-full bg-accent/70" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-wider text-ink-faint">
                Work descriptions are generalised. No confidential AAI data is shown.
              </p>
            </div>
          </ScrollReveal>

          {/* Organo */}
          <ScrollReveal direction="left" className="mt-8">
            <div className="rounded-2xl border border-line bg-card p-6 shadow-card sm:p-9">
              <RoleHeader
                org={organoExperience.org}
                role={organoExperience.role}
                period={organoExperience.period}
                location={organoExperience.location}
              />
              <p className="mt-5 max-w-3xl text-[0.95rem] leading-relaxed text-ink-soft">
                {organoExperience.summary}
              </p>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {organoExperience.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[0.9rem] leading-relaxed text-ink-soft">
                    <Icon name="check-circle" className="mt-0.5 size-4 shrink-0 text-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}