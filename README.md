# Eshwar Reddy Gali — Portfolio

A 3D portfolio website built with **React**, **TypeScript**, **Three.js**, and **GSAP**, showcasing design, documentation, and estimation engineering work.

## Tech Stack

- React + TypeScript
- Three.js / WebGL (3D character model)
- GSAP (scroll animations)
- Vite

## Getting Started

### 1) Install

```bash
npm install
```

### 2) Run locally

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

## Customize

All personal content (name, about, experience, skills, contact, tools) lives in one place:

- `src/config.ts` — name, about text, experience entries, contact links, and skill tags
- `src/components/TechStackNew.tsx` — the tools/software icon grid
- `public/resume/` — the downloadable resume file

## Deploying

This project is configured for **Vercel** (see `vercel.json`) — just import the repo in Vercel and deploy.

## License

MIT License. See [LICENSE](LICENSE).
