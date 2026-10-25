# Gagandeep T — Portfolio

<p align="center">
  <strong>AI/ML · Data Science · Full-Stack Development</strong><br />
  A high-performance, immersive developer portfolio built with React, TypeScript, and Three.js.
</p>

<p align="center">
  <a href="https://gtx-gagan.github.io/Portfolio/">Live Portfolio</a>
  ·
  <a href="mailto:deepgagan14568@gmail.com">Contact</a>
  ·
  <a href="https://www.linkedin.com/in/gagandeep03">LinkedIn</a>
  ·
  <a href="https://github.com/GTX-Gagan">GitHub</a>
</p>

## Overview

This repository contains the source for **Gagandeep T's personal portfolio** — a responsive, content-driven experience showcasing work across artificial intelligence, machine learning, cybersecurity, NLP, and full-stack development.

The interface combines editorial typography, motion design, interactive project visuals, and a lightweight neural scene to communicate technical depth without sacrificing accessibility or performance.

## Highlights

- Responsive layout optimized for desktop, tablet, and mobile screens
- Interactive Three.js neural visualization with graceful CSS fallback
- Motion effects powered by Framer Motion
- Content centralized in [`src/data.ts`](./src/data.ts) for easy maintenance
- Project, experience, education, skills, certifications, and contact sections
- Downloadable CV and direct professional contact links
- Relative asset paths for portable static hosting
- GitHub Pages deployment through GitHub Actions
- Reduced-motion and low-capability device safeguards

## Technology

| Area | Stack |
| --- | --- |
| UI | React 18, TypeScript |
| Build | Vite, TypeScript project references |
| Styling | Tailwind CSS, PostCSS, Autoprefixer |
| Motion | Framer Motion |
| 3D | Three.js, React Three Fiber, Drei, Postprocessing |
| Icons | Lucide React |
| Deployment | GitHub Pages + GitHub Actions |

## Project Structure

```text
.
├── public/
│   ├── images/              # Portfolio imagery
│   └── Gagandeep_T_CV.pdf   # Downloadable CV
├── src/
│   ├── components/          # Page sections and reusable UI
│   ├── lib/                 # Capability and device checks
│   ├── data.ts              # Portfolio content source of truth
│   ├── index.css            # Global styles and design tokens
│   └── main.tsx             # Application entry point
├── .github/workflows/
│   └── deploy.yml           # Build and GitHub Pages deployment
├── index.html
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer

### Installation

```bash
git clone https://github.com/GTX-Gagan/Portfolio.git
cd Portfolio
npm ci
```

### Development

Start the Vite development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

Create an optimized static build in `dist/`:

```bash
npm run build
```

Preview the production output locally:

```bash
npm run preview
```

## Content Customization

Most portfolio content is managed from [`src/data.ts`](./src/data.ts):

- Profile details, social links, and location
- Skills and technology groups
- Featured projects and project descriptions
- Work experience and education
- Certifications and achievements

To update downloadable assets:

- Replace [`public/Gagandeep_T_CV.pdf`](./public/Gagandeep_T_CV.pdf) with a new CV using the same filename.
- Replace the images in [`public/images/`](./public/images/) while preserving the referenced filenames, or update the paths in `src/data.ts`.

## Deployment

Every push to `main` triggers [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), which:

1. Installs locked dependencies with `npm ci`
2. Runs the TypeScript and Vite production build
3. Uploads the `dist/` directory as a Pages artifact
4. Publishes the artifact to GitHub Pages

The live deployment is available at:

**https://gtx-gagan.github.io/Portfolio/**

For a new repository, enable **Settings → Pages → Source: GitHub Actions** before the first deployment.

## Performance and Accessibility

The portfolio is designed to preserve the core experience across a wide range of devices:

- The Three.js scene loads lazily and is skipped on phones, low-memory devices, Save-Data connections, and reduced-motion preferences.
- The scene pauses when it is outside the viewport.
- Custom cursor, tilt, and magnetic interactions require a fine pointer and enabled motion.
- A static CSS backdrop provides a visual fallback when WebGL is unavailable.
- Semantic structure, responsive layouts, and reduced-motion handling support accessible browsing.

## Quality Checks

Run the production build before opening a pull request:

```bash
npm run build
```

The build performs TypeScript checking and generates the deployable Vite output.

## Contact

**Gagandeep T**  
Karnataka, India  
[deepgagan14568@gmail.com](mailto:deepgagan14568@gmail.com)

- [LinkedIn](https://www.linkedin.com/in/gagandeep03)
- [GitHub](https://github.com/GTX-Gagan)

## License

This repository represents a personal portfolio. Contact the author before reusing personal content, imagery, or the CV.
