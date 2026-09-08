import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import WorkflowSteps from "@/components/case-study/WorkflowSteps";
import LiabilitySimulator from "@/components/case-study/LiabilitySimulator";
import DashboardDemo from "@/components/case-study/DashboardDemo";
import { caseStudies } from "@/data/caseStudies";
import { buildMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return buildMetadata({
    title: `${study.title} — Case Study`,
    description: `${study.subtitle}. ${study.shortSummary}`,
    path: `/case-studies/${study.slug}`,
  });
}

function DemoFor({ slug }: { slug: string }) {
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return null;
  switch (study.demo) {
    case "reconciliation-workflow":
      return <WorkflowSteps steps={study.workflow.steps} decision={study.workflow.decision} label="Validation workflow" />;
    case "budget-workflow":
      return <WorkflowSteps steps={study.workflow.steps} label="Sanction workflow" />;
    case "statutory-calculator":
      return <LiabilitySimulator />;
    case "excel-dashboard":
      return <DashboardDemo />;
    default:
      return null;
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  return (
    <CaseStudyLayout study={study} demo={<DemoFor slug={study.slug} />} />
  );
}