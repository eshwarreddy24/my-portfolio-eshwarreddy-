import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { Icon } from "@/components/ui/icons";
import { siteConfig } from "@/data/siteConfig";

export default function Certifications() {
  return (
    <section
      id="certifications"
      aria-label="Certifications and education"
      className="bg-paper py-24 sm:py-28"
    >
      <div className="page-container">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications & education"
          description="Credentials that support the positioning — supplemented, not defined, by an SAP credential."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Certifications */}
          <ScrollReveal direction="right" className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-line bg-card p-7 shadow-card">
              <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
                <Icon name="award" className="size-5 text-accent" />
                Certifications
              </h3>
              <ul className="mt-5 space-y-5">
                {siteConfig.certifications.map((cert) => (
                  <li
                    key={cert.title}
                    className="rounded-xl border border-line bg-paper p-5"
                  >
                    <p className="text-[0.95rem] font-semibold leading-snug text-ink">
                      {cert.title}
                    </p>
                    <p className="mt-1.5 font-mono text-xs text-accent-deep">
                      {cert.issuer}
                    </p>
                    {cert.note && (
                      <p className="mt-2 text-sm leading-relaxed text-ink-faint">
                        {cert.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Education */}
          <ScrollReveal direction="left" className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-line bg-card p-7 shadow-card">
              <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
                <Icon name="graduation-cap" className="size-5 text-accent" />
                Education
              </h3>
              <div className="mt-5 rounded-xl border border-line bg-paper p-5">
                <p className="text-[0.95rem] font-semibold leading-snug text-ink">
                  {siteConfig.education.degree}
                </p>
                <p className="mt-1.5 text-sm font-medium text-ink-soft">
                  {siteConfig.education.institution} · {siteConfig.education.location}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-ink-faint">
                    {siteConfig.education.period}
                  </span>
                  <span className="rounded-full border border-accent/25 bg-accent-soft px-2.5 py-0.5 font-mono text-xs font-medium text-accent-deep">
                    CGPA {siteConfig.education.cgpa}
                  </span>
                </div>
              </div>
              <p className="mt-5 text-sm font-medium text-ink-soft">
                Relevant exposure
              </p>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Relevant exposure">
                {siteConfig.education.exposure.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-paper px-3 py-1 text-sm text-ink-soft"
                  >
                    {item}
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