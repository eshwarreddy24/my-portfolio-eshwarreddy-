import Link from "next/link";
import { Icon } from "@/components/ui/icons";
import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-card" aria-label="Footer">
      <div className="page-container py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-md bg-accent text-white">
                <Icon name="workflow" className="size-4" />
              </span>
              <span className="font-display text-base font-semibold text-ink">
                {siteConfig.name}
              </span>
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-wider text-ink-faint">
              {siteConfig.footer.blurb}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3">
            {siteConfig.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink-soft transition-colors hover:text-accent-deep"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-2.5">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-accent-deep"
            >
              <Icon name="mail" className="size-4 text-accent" />
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-accent-deep"
            >
              <Icon name="linkedin" className="size-4 text-accent" />
              LinkedIn
            </a>
            <a
              href={siteConfig.resume}
              download="Gali-Eshwar-Reddy-Resume.pdf"
              className="flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-accent-deep"
            >
              <Icon name="download" className="size-4 text-accent" />
              Resume
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-ink-faint">
            Operations &amp; Controls · {siteConfig.location}
          </p>
        </div>
      </div>
    </footer>
  );
}