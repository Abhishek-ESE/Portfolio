# Abhishek Agrahari — Portfolio

Personal portfolio for an Embedded Software Engineer / EV firmware consultant.
The hero leads with a 3D portrait composition (AI-matted photo, parallax HUD readouts, a procedural
vehicle-intelligence PCB behind it), followed by a live simulated BMS/CAN panel, a layered firmware-stack
diagram, experience timeline, case-study projects and credentials.

**Stack:** Next.js 15 (App Router) · React 19 · React Three Fiber + drei + postprocessing · Tailwind CSS v4 · Framer Motion · Lenis · TypeScript

---

## Run locally

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build      # production build check
```

## Edit content

**Everything on the page comes from one file: [`src/data/site.ts`](src/data/site.ts)** — roles, hero copy, metrics,
experience, projects, the firmware-stack layers, services, credentials, links.

To add a project, copy one of the objects in `projects` and fill in `problem` / `build` / `impact` — that is what the
case-study modal renders. Set `domain` to `"EV"`, `"IoT"`, `"Medical"` or `"Industrial"` for the filter.

## Résumé (PDF)

The résumé is generated from HTML so it stays one page, keeps a real text layer for ATS scanners, and matches the site.

1. Edit [`tools/resume/resume.html`](tools/resume/resume.html)
2. `npm run resume` → writes `public/Abhishek_Agrahari_Resume.pdf` and fails if it no longer fits one A4 page

Needs Microsoft Edge installed (or `EDGE_PATH=<chromium binary>`).

## Photo

`tools/photo/source.jpg` is the original. `python tools/photo/enhance.py` regenerates:

| Output | Used for |
| --- | --- |
| `public/profile-cutout.webp` | Hero 3D portrait (background removed by rembg, alpha tightened) |
| `public/profile.jpg` | Enhanced photo with backdrop, for social cards / future use |
| `tools/resume/photo.jpg` | Résumé headshot crop |

Python needs `pillow numpy rembg onnxruntime`. On Windows, install them into a venv at a **short path**
(e.g. `C:\pv`) — onnxruntime's files exceed the 260-character path limit inside deep folders.
A higher-resolution source photo (the current one is a 400 px LinkedIn export) will noticeably improve the hero.

## Deploy to Vercel (free)

1. Push to GitHub (wired to `https://github.com/Abhishek-ESE/Portfolio`).
2. [vercel.com/new](https://vercel.com/new) → **Import** the `Portfolio` repo → **Deploy** with defaults.
3. Every push to `main` redeploys.

After the first deploy, put the real URL in three places so social cards and SEO point at it:
`src/app/layout.tsx` (`metadataBase`, `jsonLd.url`), `src/app/robots.ts` (`BASE`), `src/app/sitemap.ts` (`BASE`).

## Project layout

```
src/
├─ app/                 layout (fonts, metadata, JSON-LD), page (section order), globals.css, icon, OG image, robots, sitemap
├─ components/
│  ├─ three/            HeroScene (camera rig, bloom), EcuModule (the PCB), Starfield, SceneMount (mounts only while visible)
│  ├─ sections/         Nav, Hero (3D portrait), About (live VIM panel), Expertise (stack diagram), Experience, Projects, Credentials, Contact, Chrome
│  ├─ ui/Primitives     Reveal, SectionHeading (watermark numeral), Tag, Panel, Section
│  ├─ Preloader         firmware-style boot screen, once per session
│  └─ SmoothScroll      Lenis
├─ data/site.ts         ← all content
tools/
├─ resume/              resume.html + build.js (→ public/…Resume.pdf)
└─ photo/               enhance.py + source.jpg (→ public/profile*.{jpg,webp})
```

## Notes

- The WebGL canvas mounts only while the hero is on screen and unmounts when scrolled away.
- Respects `prefers-reduced-motion`: single-frame scene, no smooth scroll, no preloader.
- No external 3D assets — the module is procedural geometry, nothing to load and nothing to break.
