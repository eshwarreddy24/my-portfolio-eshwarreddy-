import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { siteConfig } from "@/data/siteConfig";

export default function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="bg-paper py-24 sm:py-28">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <ScrollReveal direction="fade">
              <SectionHeading
                eyebrow="Contact"
                title="Let's talk operations & controls"
                description="Exploring early-career analyst opportunities in Operations, Controls, Risk, Financial Operations, and Transaction Operations. I respond to clear, relevant outreach."
              />
              <div className="mt-8 space-y-3 text-[0.95rem] leading-relaxed text-ink-soft">
                <p className="flex items-start gap-2.5">
                  <Icon name="map-pin" className="mt-0.5 size-4 shrink-0 text-accent" />
                  {siteConfig.name}, {siteConfig.location}
                </p>
                <p className="flex items-start gap-2.5">
                  <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-accent" />
                  Typically responds within one working day.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6">
            <ScrollReveal direction="right">
              <div className="rounded-2xl border border-line bg-card p-7 shadow-card sm:p-9">
                <h3 className="font-display text-lg font-semibold text-ink">
                  Get in touch
                </h3>
                <div className="mt-6 space-y-4">
                  <a
                    href={`mailto:${siteConfig.email}?subject=Operations%20%26%20Controls%20opportunity`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-paper px-5 py-4 transition-colors hover:border-accent/40"
                  >
                    <span className="flex items-center gap-3">
                      <Icon name="mail" className="size-5 text-accent" />
                      <span>
                        <span className="block text-sm font-medium text-ink">
                          {siteConfig.email}
                        </span>
                        <span className="block text-xs text-ink-faint">
                          Email — preferred channel
                        </span>
                      </span>
                    </span>
                    <Icon name="arrow-up-right" className="size-4 text-ink-faint transition-colors group-hover:text-accent" />
                  </a>

                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-paper px-5 py-4 transition-colors hover:border-accent/40"
                  >
                    <span className="flex items-center gap-3">
                      <Icon name="linkedin" className="size-5 text-accent" />
                      <span>
                        <span className="block text-sm font-medium text-ink">
                          LinkedIn
                        </span>
                        <span className="block text-xs text-ink-faint">
                          Professional profile
                        </span>
                      </span>
                    </span>
                    <Icon name="arrow-up-right" className="size-4 text-ink-faint transition-colors group-hover:text-accent" />
                  </a>

                  <a
                    href={siteConfig.domain}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-paper px-5 py-4 transition-colors hover:border-accent/40"
                  >
                    <span className="flex items-center gap-3">
                      <Icon name="globe" className="size-5 text-accent" />
                      <span>
                        <span className="block text-sm font-medium text-ink">
                          {siteConfig.domain.replace("https://", "")}
                        </span>
                        <span className="block text-xs text-ink-faint">
                          This portfolio
                        </span>
                      </span>
                    </span>
                    <Icon name="arrow-up-right" className="size-4 text-ink-faint transition-colors group-hover:text-accent" />
                  </a>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    href={`mailto:${siteConfig.email}?subject=Operations%20%26%20Controls%20opportunity`}
                    variant="primary"
                    icon="mail"
                  >
                    Email me
                  </Button>
                  <Button
                    href={siteConfig.linkedin}
                    variant="secondary"
                    icon="external"
                    external
                  >
                    Connect on LinkedIn
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}