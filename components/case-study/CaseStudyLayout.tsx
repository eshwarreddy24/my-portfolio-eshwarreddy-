import type { ReactNode } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { Icon } from "@/components/ui/icons";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";

function Section({
  id,
  heading,
  children,
  direction = "up",
}: {
  id?: string;
  heading: string;
  children: ReactNode;
  direction?: "left" | "right" | "up" | "fade";
}) {
  return (
    <ScrollReveal direction={direction} className="mt-12 first:mt-0">
      <section id={id} aria-label={heading}>
        <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink">
          <span aria-hidden="true" className="eyebrow-rule" />
          {heading}
        </h2>
        <div className="mt-4">{children}</div>
      </section>
    </ScrollReveal>
  );
}

export default function CaseStudyLayout({
  study,
  demo,
}: {
  study: CaseStudy;
  demo?: ReactNode;
}) {
  const currentIndex = caseStudies.findIndex((s) => s.slug === study.slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <article className="bg-paper pb-24 pt-28 sm:pt-32">
      <div className="page-container">
        {/* Breadcrumb */}
        <ScrollReveal direction="fade">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-faint">
              <li>
                <Link href="/" className="transition-colors hover:text-accent-deep">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#case-studies" className="transition-colors hover:text-accent-deep">
                  Case Studies
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-soft">
                {study.slug.replace(/-/g, " ")}
              </li>
            </ol>
          </nav>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal direction="fade" className="mt-8">
          <header>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent">
              Case Study
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              {study.title}
            </h1>
            <p className="mt-3 font-mono text-sm uppercase tracking-wide text-accent-deep">
              {study.subtitle}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Topics">
              {study.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-card px-3 py-1 font-mono text-xs text-ink-soft"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </header>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main column */}
          <div className="lg:col-span-8">
            <Section id="context" heading="Challenge / Context" direction="left">
              <div className="space-y-4 rounded-xl border border-line bg-card p-6 text-[0.95rem] leading-relaxed text-ink-soft shadow-card">
                {study.context.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Section>

            <Section id="role" heading="My Role" direction="right">
              <p className="rounded-xl border border-line bg-card p-6 text-[0.95rem] leading-relaxed text-ink-soft shadow-card">
                {study.role}
              </p>
            </Section>

            <Section id="approach" heading="Approach" direction="left">
              <ol className="space-y-3">
                {study.approach.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-4 rounded-xl border border-line bg-card p-5 shadow-card"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-xs font-semibold text-accent-deep">
                      {i + 1}
                    </span>
                    <p className="text-[0.95rem] leading-relaxed text-ink-soft">{step}</p>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="workflow" heading="Workflow" direction="up">
              <div className="rounded-xl border border-line bg-paper/60 p-5 sm:p-6">{demo}</div>
            </Section>

            <Section id="outcome" heading="Outcome / Learning" direction="left">
              <div className="rounded-xl border border-line bg-card p-6 shadow-card">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
                  What it enabled
                </h3>
                <ul className="mt-3 space-y-2">
                  {study.outcome.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                      <Icon name="check-circle" className="mt-1 size-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-ink-faint">
                  What I learned
                </h3>
                <p className="mt-3 border-l-2 border-accent/40 pl-4 font-display text-base italic leading-relaxed text-ink">
                  {study.learning}
                </p>
              </div>
            </Section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-24">
              <ScrollReveal direction="right">
                <div className="rounded-2xl border border-line bg-card p-6 shadow-card">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-faint">
                    <Icon name="layers" className="size-4 text-accent" />
                    Tools
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {study.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-xs text-ink-soft"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.08}>
                <div className="rounded-2xl border border-line bg-card p-6 shadow-card">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-faint">
                    <Icon name="shield-check" className="size-4 text-accent" />
                    Controls demonstrated
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {study.controls.map((control) => (
                      <li key={control} className="flex items-center gap-2.5 text-sm text-ink-soft">
                        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent/70" />
                        {control}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.16}>
                <p className="flex items-start gap-2.5 rounded-2xl border border-accent/25 bg-accent-soft p-5 font-mono text-xs leading-relaxed text-accent-deep">
                  <Icon name="alert-triangle" className="mt-0.5 size-4 shrink-0" />
                  {study.confidentiality}
                </p>
              </ScrollReveal>
            </div>
          </aside>
        </div>

        {/* Next study */}
        <ScrollReveal direction="fade" className="mt-16">
          <Link
            href={`/case-studies/${nextStudy.slug}`}
            className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-card p-6 shadow-card transition-all duration-300 hover:border-accent/35 hover:shadow-card-hover sm:p-8"
          >
            <span>
              <span className="block font-mono text-xs uppercase tracking-wider text-ink-faint">
                Next case study
              </span>
              <span className="mt-1.5 block font-display text-lg font-semibold text-ink group-hover:text-accent-deep sm:text-xl">
                {nextStudy.title}
              </span>
            </span>
            <span className="flex size-11 items-center justify-center rounded-full border border-line text-ink-faint transition-colors group-hover:border-accent group-hover:bg-accent-soft group-hover:text-accent-deep">
              <Icon name="arrow-right" className="size-5" />
            </span>
          </Link>
        </ScrollReveal>
      </div>
    </article>
  );
}