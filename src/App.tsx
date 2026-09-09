import { useMemo, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";

type SectionKey =
  | "profile"
  | "experience"
  | "education"
  | "skills"
  | "certifications"
  | "additional"
  | "contact";

const experience = [
  {
    role: "Graduate Apprentice — Civil Engineering Wing",
    company: "Airports Authority of India (AAI), Bengaluru",
    period: "Sep 2025 – Aug 2026",
    highlights: [
      "Reconciled and validated 30+ high-value infrastructure and maintenance invoices monthly in SAP MM (ME22N, MIGO, MIR7).",
      "Supported estimate, budget and technical-sanction review for infrastructure files before approvals.",
      "Performed quality/compliance checks across quotations, tenders and invoices; flagged inconsistencies and drove clarifications.",
      "Managed procurement administration for 150+ MSME/vendor partners via GeM and SAP MM, with Excel automation dashboards for payment tracking."
    ]
  },
  {
    role: "Graduate Engineer Trainee — Metaphor Interiors",
    company: "Organo Eco Habitats Pvt Ltd, Hyderabad",
    period: "Nov 2024 – Jun 2025",
    highlights: [
      "Monitored cross-functional milestones in ClickUp and escalated timeline risks to leadership.",
      "Coordinated multi-city stakeholder travel, schedules and site logistics for executive visits.",
      "Co-authored a microclimate case study showing a 17°C surface-temperature reduction and presented findings to senior leadership."
    ]
  }
];

const certifications = [
  "SAP Certified – Implementation Consultant (SAP Service Cloud Version 2), Aug 2026 – Present",
  "Entrepreneurship Development (AIC-SKU), supported by Atal Innovation Mission, NITI Aayog"
];

const skillGroups = [
  {
    title: "Operations & Analytics",
    items: [
      "Procurement Operations",
      "Vendor Management",
      "Invoice Validation",
      "MIS Reporting",
      "Purchase Order Management",
      "Process Documentation"
    ]
  },
  {
    title: "SAP & Enterprise",
    items: [
      "SAP Service Cloud Version 2",
      "SAP MM",
      "ME22N / MIGO / MIR7",
      "Procurement-to-Pay Exposure",
      "SAP Implementation Fundamentals"
    ]
  },
  {
    title: "Tools & Productivity",
    items: [
      "Advanced Excel",
      "PowerPoint",
      "Outlook",
      "Teams",
      "SharePoint",
      "ClickUp",
      "GeM Portal",
      "Government e-Office / EDMS",
      "Microsoft 365 Copilot",
      "Basic VBA Macro Automation"
    ]
  },
  {
    title: "Professional Strengths",
    items: [
      "Stakeholder Management",
      "Consultative Communication",
      "Root Cause Analysis",
      "SLA Tracking",
      "Change Management Support",
      "Presentation & Storytelling"
    ]
  }
];

const App = () => {
  const [visibleSections, setVisibleSections] = useState<Record<SectionKey, boolean>>({
    profile: true,
    experience: true,
    education: true,
    skills: true,
    certifications: true,
    additional: true,
    contact: true
  });

  const controls = useMemo(
    () => [
      { key: "profile", label: "Profile" },
      { key: "experience", label: "Experience" },
      { key: "education", label: "Education" },
      { key: "skills", label: "Skills" },
      { key: "certifications", label: "Certifications" },
      { key: "additional", label: "Additional" },
      { key: "contact", label: "Contact" }
    ] as { key: SectionKey; label: string }[],
    []
  );

  return (
    <div className="portfolio-shell">
      <header className="hero">
        <p className="badge">Project-ready operations profile</p>
        <h1>GALI ESHWAR REDDY</h1>
        <p className="subtitle">Operations • Controls • SAP MM • Data Analysis</p>
        <p className="meta">Bengaluru, Karnataka, India</p>
      </header>

      <section className="control-panel">
        <h2>Preview Controls</h2>
        <p>Turn sections on/off and review your portfolio one by one.</p>
        <div className="controls-grid">
          {controls.map((item) => (
            <label key={item.key} className="toggle-chip">
              <input
                type="checkbox"
                checked={visibleSections[item.key]}
                onChange={() =>
                  setVisibleSections((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                }
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </section>

      <main className="portfolio-grid">
        {visibleSections.profile && (
          <section className="portfolio-section">
            <h3>Profile</h3>
            <p>
              Operations and controls professional with experience in SAP MM-based procurement,
              reconciliations and invoice validation. Skilled at spotting control gaps, resolving
              process breaks, and using Excel plus light automation/AI tools for risk and delay
              tracking.
            </p>
          </section>
        )}

        {visibleSections.experience && (
          <section className="portfolio-section">
            <h3>Work Experience</h3>
            <div className="card-grid">
              {experience.map((job) => (
                <article key={job.role} className="info-card">
                  <h4>{job.role}</h4>
                  <p className="card-meta">{job.company}</p>
                  <p className="card-meta">{job.period}</p>
                  <ul>
                    {job.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}

        {visibleSections.education && (
          <section className="portfolio-section">
            <h3>Education</h3>
            <article className="info-card">
              <h4>B.Tech in Civil Engineering</h4>
              <p className="card-meta">
                Srinivasa Ramanujan Institute of Technology, Anantapur (Jan 2020 – May 2024)
              </p>
              <p>CGPA: 7.59 / 10</p>
              <p>
                Key coursework: Data Analysis, Project Management, Fundamentals of SAP.
                Leadership: Student Club Executive (20+ members), NSS Representative.
              </p>
            </article>
          </section>
        )}

        {visibleSections.skills && (
          <section className="portfolio-section">
            <h3>Skills</h3>
            <div className="card-grid">
              {skillGroups.map((group) => (
                <article key={group.title} className="info-card">
                  <h4>{group.title}</h4>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}

        {visibleSections.certifications && (
          <section className="portfolio-section">
            <h3>Certifications</h3>
            <article className="info-card">
              <ul>
                {certifications.map((certificate) => (
                  <li key={certificate}>{certificate}</li>
                ))}
              </ul>
            </article>
          </section>
        )}

        {visibleSections.additional && (
          <section className="portfolio-section">
            <h3>Additional</h3>
            <article className="info-card">
              <p>
                Awards: National-Framework Incubation and Innovation Program.
              </p>
              <p>
                Languages: English (Professional Working Proficiency), Hindi (Native), Telugu
                (Native).
              </p>
              <p>Hobbies: Running, Cooking, Playing Chess, Calisthenic.</p>
            </article>
          </section>
        )}

        {visibleSections.contact && (
          <section className="portfolio-section">
            <h3>Contact</h3>
            <article className="info-card">
              <p>Phone: +91 9515291117</p>
              <p>Email: eshwarreddy.gali@outlook.com</p>
              <p>
                LinkedIn: <a href="https://www.linkedin.com/in/eshwar-reddy-gali-">eshwar-reddy-gali-</a>
              </p>
              <p>
                GitHub: <a href="https://github.com/eshwarreddy24">github.com/eshwarreddy24</a>
              </p>
              <p>
                Resume: <a href="/resume/Eshwar_Reddy_Gali_Resume.docx">Download Resume</a>
              </p>
            </article>
          </section>
        )}
      </main>

      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
