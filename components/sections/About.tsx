import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/motion/ScrollReveal";

const focusAreas = [
  "Operations",
  "Controls",
  "Risk",
  "Financial Operations",
  "Transaction Operations",
  "Data-driven Process Improvement",
];

export default function About() {
  return (
    <section id="about" aria-label="About" className="bg-paper py-24 sm:py-28">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ScrollReveal direction="left">
              <SectionHeading
                eyebrow="About"
                title="An analytical eye for operational control"
              />
              <blockquote className="mt-8 border-l-2 border-accent pl-5">
                <p className="font-display text-lg italic leading-relaxed text-ink">
                  Early-career Operations &amp; Controls professional from a
                  regulated public-sector environment — hands-on experience in
                  reconciliation, financial calculations, approval controls,
                  procurement workflows, Excel analytics, documentation quality
                  checks, and stakeholder coordination.
                </p>
              </blockquote>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal direction="right">
              <div className="space-y-5 text-base leading-relaxed text-ink-soft">
                <p>
                  I am an early-career Operations &amp; Controls professional
                  based in Bengaluru with experience at Airports Authority of
                  India. My work in the Civil Engineering Wing includes
                  operational and financial-control responsibilities across SAP
                  MM invoice validation, procurement administration,
                  infrastructure estimates, budget verification,
                  technical-sanction workflows, statutory payment analysis,
                  tender and quotation reviews, documentation checks, and
                  stakeholder coordination.
                </p>
                <p>
                  This experience has developed strong capabilities in
                  structured analysis, financial workflow validation,
                  discrepancy identification, quality reviews, documentation
                  accuracy, operational risk awareness, and process
                  improvement.
                </p>
                <p>
                  I am particularly interested in early-career opportunities
                  across Operations, Controls, Risk, Financial Operations,
                  Transaction Operations, and data-driven process improvement —
                  roles where disciplined validation and clear documentation
                  directly protect accuracy and speed.
                </p>
              </div>
              <ul
                className="mt-8 flex flex-wrap gap-2"
                aria-label="Focus areas"
              >
                {focusAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-line bg-card px-3.5 py-1.5 text-sm text-ink-soft"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}