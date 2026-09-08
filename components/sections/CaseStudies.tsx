import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/motion/ScrollReveal";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import { caseStudies } from "@/data/caseStudies";

export default function CaseStudies() {
  return (
    <section id="case-studies" aria-label="Selected case studies" className="bg-paper py-24 sm:py-28">
      <div className="page-container">
        <SectionHeading
          eyebrow="Case Studies"
          title="How I think, validate & structure work"
          description="The resume lists what I did; these studies show how I analyse, control, and communicate. All examples are sanitised or fictionalised — no confidential employer data."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {caseStudies.map((study, index) => (
            <ScrollReveal
              key={study.slug}
              direction={index % 2 === 0 ? "right" : "left"}
              className="h-full"
            >
              <CaseStudyCard study={study} index={index} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="fade" className="mt-10">
          <p className="border-l-2 border-line pl-4 font-mono text-xs leading-relaxed text-ink-faint">
            Illustrative workflows based on professional experience. No
            confidential employer data is shown — datasets used in
            demonstrations are fictional.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}