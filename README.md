# Gali Eshwar Reddy — Operations & Controls Portfolio

Premium, production-ready portfolio for **Gali Eshwar Reddy** — positioned for
early-career Operations, Controls, Financial Operations, Risk, Transaction
Operations, and Process Improvement roles.

Built with **Next.js (App Router)**, **React 19**, **TypeScript**, **Tailwind
CSS v4**, **Framer Motion**, and a restrained **React Three Fiber** hero scene.

The visual language follows a dark catalog style inspired by Codecademy's
projects page — near-black blue-tinted surfaces, light text, one violet accent,
and gradient thumbnail graphics on the case-study cards.

## Tech stack

| Concern        | Tooling                                                        |
| -------------- | -------------------------------------------------------------- |
| Framework      | Next.js 16 (App Router), React 19, TypeScript                  |
| Styling        | Tailwind CSS v4 (CSS-first `@theme` config)                    |
| Motion         | Framer Motion (page/scroll animations, reduced-motion aware)   |
| 3D (hero only) | three, @react-three/fiber, @react-three/drei, postprocessing   |
| Icons          | lucide-react                                                   |
| Deployment     | Vercel (zero-config)                                           |

The 3D scene is lazy-loaded, capped at `dpr 1.5`, paused offscreen, and falls
back to a static SVG network when WebGL is unavailable or the user prefers
reduced motion. The site is fully usable without it.

## Getting started

Requires Node.js 20.9+ (tested on Node 24).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

The build must complete with **zero TypeScript errors**. ESLint can be run
separately with `npm run lint`.

## Deploying to Vercel

The project is ready for **GitHub → Vercel import → Deploy** with zero config.

1. Create a Git repository and push this folder (the unrelated
   `desktop-tutorial/` folder is git-ignored).
2. On [vercel.com/new](https://vercel.com/new), import the repository.
3. Vercel auto-detects Next.js — keep the default settings:
   - Framework preset: **Next.js**
   - Build command: `npm run build` (default)
   - Output directory: `.next` (default)
4. Click **Deploy**.

No environment variables or secrets are required.

### Custom domain

Add your domain under **Project → Settings → Domains**. If it is not
`eshwarreddy.vercel.app`, update `domain` in `data/siteConfig.ts` so canonical
URLs, sitemap, and Open Graph links point at the right address.

## Where to edit content

Everything user-editable lives in `data/` — no component changes needed:

| File                  | What it controls                                                     |
| --------------------- | -------------------------------------------------------------------- |
| `data/siteConfig.ts`  | Name, headline, email, LinkedIn URL, domain, nav, hero CTAs, impact stats, certifications, education, footer |
| `data/experience.ts`  | AAI experience (six operational areas) and Organo experience         |
| `data/caseStudies.ts` | All four case studies — titles, summaries, workflows, tools, outcomes (drives homepage cards **and** detail pages) |
| `data/skills.ts`      | The five grouped skill categories                                    |

### Replace the resume PDF

1. Put your actual resume PDF at **`public/resume.pdf`** (same filename).
2. Every Resume button (hero, navbar, resume section, footer) picks it up
   automatically. Nothing else to change.

A placeholder `public/resume.pdf` is generated automatically by the repo —
regenerate it anytime with `npm run resume:placeholder`.

### Update the LinkedIn URL

In `data/siteConfig.ts`, replace:

```ts
linkedin: "https://www.linkedin.com/in/PLACEHOLDER_TO_REPLACE",
```

with your real profile URL. It flows into the hero, contact section, footer,
and JSON-LD structured data.

## Routes

| Route                                   | Purpose                          |
| --------------------------------------- | -------------------------------- |
| `/`                                     | Homepage (all sections)          |
| `/case-studies/reconciliation`          | SAP MM invoice reconciliation    |
| `/case-studies/statutory-analysis`      | Land management & statutory analysis |
| `/case-studies/budget-controls`         | Budget verification & technical sanction |
| `/case-studies/excel-automation`        | Excel dashboard & automation     |
| `/resume.pdf`                           | Resume PDF (replace the file)    |

Generated automatically: `/sitemap.xml`, `/robots.txt`, `/opengraph-image`,
`/icon.svg`.

## Project structure

```
app/
  layout.tsx, page.tsx, globals.css
  case-studies/[slug]/page.tsx   (static params for all four studies)
  sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
components/
  layout/     Navbar, Footer
  sections/   Hero, ImpactStats, About, Experience, CaseStudies, Skills,
              Certifications, ResumeSection, Contact
  motion/     ScrollReveal, StaggerContainer, AnimatedCounter
  three/      HeroScene, SceneCanvas, ControlNetwork, Particles,
              CameraRig, SceneLighting, StaticFallback
  ui/         Button, SectionHeading, Chip, CaseStudyCard, SkillGroup, icons
  case-study/ CaseStudyLayout, WorkflowSteps, LiabilitySimulator, DashboardDemo
data/         siteConfig, experience, skills, caseStudies
lib/          hooks, seo, three helpers
public/       resume.pdf
scripts/      generate-placeholder-resume.mjs
```

## Accessibility & performance notes

- Semantic HTML, skip link, ARIA labels, focus-visible states, keyboard
  navigation, accessible mobile menu.
- `prefers-reduced-motion` is respected everywhere (Framer Motion
  `useReducedMotion` + CSS) — 3D and horizontal reveals are disabled.
- On screens below 768px the 3D scene drops particle count, disables
  postprocessing and camera parallax, and reveals become simple fades.
- The 3D canvas is marked `aria-hidden`, lazy-loaded via `next/dynamic`
  (`ssr: false`), paused when offscreen, and capped at `dpr [1, 1.5]`.
- All portfolio demonstrations are sanitized or explicitly fictionalized —
  no confidential employer data is shown anywhere.

## Content accuracy

All claims on the site are intentionally conservative and interview-defensible:
the site states operational and financial-control experience from a regulated
public-sector environment (Airports Authority of India) and makes no banking,
financial-services employment, or automation-engineering claims.