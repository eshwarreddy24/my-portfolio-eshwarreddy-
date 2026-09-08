import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/siteConfig";

export default function ResumeSection() {
  return (
    <section id="resume" aria-label="Resume" className="bg-card py-24 sm:py-28">
      <div className="page-container">
        <div className="rounded-3xl border border-line bg-paper p-8 shadow-card sm:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <ScrollReveal direction="left">
              <SectionHeading
                eyebrow="Resume"
                title="The same PDF I send to recruiters"
              />
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                One-page resume covering SAP MM reconciliation, procurement and
                payment workflow exposure, statutory analysis, Excel analytics,
                and stakeholder coordination — maintained alongside this site.
              </p>
              <p className="mt-4 max-w-xl font-mono text-xs leading-relaxed text-ink-faint">
                Replace <code className="rounded bg-line/60 px-1.5 py-0.5">/public/resume.pdf</code>{" "}
                anytime — every button on the site picks it up automatically.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button
                  href={siteConfig.resume}
                  variant="primary"
                  size="lg"
                  icon="download"
                  download
                >
                  Download Resume
                </Button>
                <Button
                  href={siteConfig.resume}
                  variant="secondary"
                  size="lg"
                  icon="external"
                  external
                >
                  View Resume
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}