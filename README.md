# Abhishek Agrahari — Engineering Portfolio

A portfolio for embedded software and EV firmware roles, focused on practical engineering contributions, vehicle connectivity and product development.

Built with **Next.js 15, React 19, TypeScript and Tailwind CSS 4**, with custom CSS and bundled Geist fonts. The interface uses native scrolling and lightweight SVG graphics. It includes an interactive conceptual EV architecture diagram, four curated case studies with filters and detail dialogs, technical capabilities, career history and contact links.

## Run and verify

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

`typecheck` and `lint` both run TypeScript validation. `start` serves the production build.

## Update content

| File | Purpose |
| --- | --- |
| `src/data/portfolio.ts` | Selected work, career history, capabilities and current development focus |
| `src/data/site.ts` | Identity, contact links, photo and résumé paths |
| `src/app/page.tsx` | Page composition |
| `src/app/globals.css` | Layout, visual styling and responsive behavior |
| `src/components/portfolio/` | Navigation, EV diagram, case-study interactions and supporting components |
| `src/app/layout.tsx` | Metadata, local fonts and Person structured data |
| `src/app/opengraph-image.tsx` | Social preview image |

Case studies describe project context, individual contributions and outcomes. They are engineering overviews, not proprietary source releases. The EV diagram illustrates a conceptual architecture; it does not display live vehicle telemetry. Performance metrics are omitted from the public presentation pending corroboration.

Geist and Geist Mono are served from `public/fonts/`; no Google Fonts download is needed to build or display the site. The page has no WebGL scene or loading gate.

## Résumé and photo

The résumé link serves `public/Abhishek_Agrahari_Resume.pdf`. Its existing generation workflow is unchanged:

1. Edit `tools/resume/resume.html`.
2. Run `npm run resume` to regenerate the PDF.

The generator requires Microsoft Edge, or a Chromium binary supplied through `EDGE_PATH`. Review the generated PDF before publishing it. Update photo assets in `public/` and their paths in `src/data/site.ts`.

## Deploy to Vercel

Authenticate, link the repository to the intended Vercel project, and deploy:

```bash
npx vercel login
npx vercel link
npx vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL` in the Vercel project's production environment to the final HTTPS domain, then redeploy if the domain was assigned after the first build. For a local production build, the same variable can be set in `.env.local`:

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-portfolio-domain.example
```

The shared URL helper in `src/data/site-url.ts` supplies the canonical URL, structured data, Open Graph URL, robots sitemap reference and sitemap entries. Replace the example with the real domain; the repository fallback does not confirm that a deployment exists.

After deployment, check the page on desktop and mobile, open a case study, test the résumé and contact links, and verify `/robots.txt`, `/sitemap.xml` and the social preview.
