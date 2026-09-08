"use client";

import type { WorkflowDecision, WorkflowStep } from "@/data/caseStudies";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { Icon } from "@/components/ui/icons";

interface WorkflowStepsProps {
  steps: WorkflowStep[];
  decision?: WorkflowDecision;
  label?: string;
}

export default function WorkflowSteps({ steps, decision, label = "Workflow" }: WorkflowStepsProps) {
  return (
    <div>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-deep">
        {label}
      </p>

      <StaggerContainer className="relative mt-6" stagger={0.08}>
        {/* Spine */}
        <div
          aria-hidden="true"
          className="absolute bottom-4 left-[0.4375rem] top-2 w-px bg-line-strong"
        />

        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={step.title}>
              <StaggerItem>
                <div className="relative flex gap-4 pl-0">
                  <span
                    aria-hidden="true"
                    className="relative z-10 mt-4 flex size-3.5 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-paper"
                  />
                  <div className="flex-1 rounded-xl border border-line bg-card p-4 shadow-card sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[0.95rem] font-semibold text-ink">
                        <span className="mr-2 font-mono text-xs font-medium text-ink-faint">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {step.title}
                      </p>
                      {index < steps.length - 1 && (
                        <span className="hidden font-mono text-[0.7rem] uppercase tracking-wider text-ink-faint sm:inline">
                          ↓ next
                        </span>
                      )}
                    </div>
                    {step.detail && (
                      <p className="mt-1 pl-8 text-sm text-ink-faint">{step.detail}</p>
                    )}
                  </div>
                </div>
              </StaggerItem>

              {decision && index === decision.afterIndex && (
                <StaggerItem>
                  <div className="mt-3 rounded-xl border border-accent/30 bg-accent-soft p-4 sm:p-5">
                    <p className="flex items-center gap-2 text-[0.95rem] font-semibold text-accent-deep">
                      <Icon name="fingerprint" className="size-4" />
                      {decision.question}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3" role="group" aria-label={decision.question}>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-white">
                        <Icon name="check-circle" className="size-4" />
                        Yes — {decision.yes}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-1.5 text-sm font-semibold text-ink-soft">
                        <Icon name="arrow-right" className="size-4" />
                        No — {decision.no}
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              )}
            </li>
          ))}
        </ol>
      </StaggerContainer>
    </div>
  );
}