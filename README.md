# Gagandeep T — Portfolio

React + TypeScript + Vite + Tailwind CSS + Framer Motion + Three.js.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Editing content

All text, links and details live in `src/data.ts`.

- **Project links**: set `url` on each project (currently `null`, which shows a "Project link coming soon" placeholder).
- **CV**: replace `public/Gagandeep_T_CV.pdf` with a new file of the same name. Every "Download Resume / CV" button downloads it.
- **Photos**: `public/images/gagandeep-portrait.webp` (hero) and `public/images/gagandeep-full.webp` (About).

## Deploy

The build uses relative paths, so `dist/` works on any static host:

- **Vercel / Netlify**: import the repo, build command `npm run build`, output `dist`.
- **GitHub Pages**: push `dist/` to a `gh-pages` branch, or use a Pages action.

## Performance notes

- The Three.js scene loads lazily, only on desktops with WebGL and a mouse, and is skipped on phones, low-memory devices, Save-Data and `prefers-reduced-motion`. It pauses when off-screen.
- Custom cursor, tilt and magnetic effects run only with a fine pointer and motion allowed.
- Without WebGL the hero falls back to a static CSS backdrop.
