# Abhishek Agrahari — Portfolio

Personal portfolio for an Embedded Software Engineer / EV firmware consultant.
A 3D vehicle-intelligence-module (PCB, MCU, CAN packets riding live traces) sits in the hero, followed by
case-study style project write-ups, an interactive skill matrix, experience timeline and credentials.

**Stack:** Next.js 15 (App Router) · React 19 · React Three Fiber + drei + postprocessing · Tailwind CSS v4 · Framer Motion · TypeScript

---

## 1. Run locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

Production build check:

```bash
npm run build
```

## 2. Add your two files (do this first)

Drop these into `public/` — the site works without them, but shows a fallback:

| File | Used for |
| --- | --- |
| `public/profile.jpg` | Your photo in the About section. Portrait orientation, ~800×1000 px, JPG. The site applies the holographic 3D treatment automatically — no editing needed. |
| `public/Abhishek_Agrahari_Resume.pdf` | The **Résumé** button in the nav and Contact section. |

## 3. Edit your content

**Everything on the page comes from one file: [`src/data/site.ts`](src/data/site.ts).**
Roles, hero copy, metrics, experience, projects, skills, services, credentials, links — change it there and the site updates.

To add a project, copy one of the objects in `projects` and fill in `problem` / `build` / `impact` — that's what the case-study modal renders.

## 4. Deploy to Vercel (free)

1. Push this repo to GitHub (already wired to `https://github.com/Abhishek-ESE/Portfolio`).
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** the `Portfolio` repo.
3. Leave every setting at its default (Vercel detects Next.js). Click **Deploy**.
4. Every push to `main` redeploys automatically.

After the first deploy, update the domain in three places so social cards and SEO point at the real URL:

- `src/app/layout.tsx` → `metadataBase` and `jsonLd.url`
- `src/app/robots.ts` → `BASE`
- `src/app/sitemap.ts` → `BASE`

(Default is `https://abhishek-agrahari.vercel.app`. If you set a custom domain in Vercel, use that instead.)

## 5. Project layout

```
src/
├─ app/
│  ├─ layout.tsx          # fonts, metadata, JSON-LD
│  ├─ page.tsx            # section order
│  ├─ globals.css         # Tailwind v4 theme tokens + utilities
│  ├─ opengraph-image.tsx # social share card (auto-generated)
│  ├─ robots.ts / sitemap.ts
├─ components/
│  ├─ three/              # HeroScene, EcuModule (the PCB), Starfield, SceneMount
│  ├─ sections/           # Nav, Hero, About, Expertise, Experience, Projects, Credentials, Contact, Chrome
│  └─ ui/Primitives.tsx   # Reveal, SectionHeading, Tag, Panel, Section
└─ data/site.ts           # ← all content
```

## Notes

- The 3D canvas only mounts while the hero is on screen and unmounts when you scroll away, so the rest of the page stays smooth.
- Respects `prefers-reduced-motion` (scene renders a single frame, page animations are disabled).
- No external 3D assets — the module is procedural geometry, so there is nothing to load and nothing to break.
