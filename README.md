# axnikita / Zonov Nikita Portfolio

Astro portfolio site rebuilt from the approved handoff in `baza/reference`.

## Routes

- `/` - About
- `/web/` - WEB portfolio
- `/gamedev/` - GameDev portfolio

## Architecture

- `src/layouts/BaseLayout.astro` - outer document shell
- `src/components/SiteHeader.astro` - the only header markup source
- `src/components/SiteFooter.astro` - the only footer markup source
- `src/pages/` - page content ported from the reference `<main>` blocks
- `src/styles/` - modular SCSS with `@use`
- `src/scripts/portfolio-runtime.js` - shared axnikitaJS-powered behavior
- `public/assets/js/axnikitaJS.js` - supplied axnikitaJS 3.0.1 runtime

## Commands

```bash
npm install
npm test
npm run build
npm run dev
```

If Astro telemetry cannot write to the local user profile in a restricted environment, run:

```bash
ASTRO_TELEMETRY_DISABLED=1 npm run build
```

On PowerShell:

```powershell
$env:ASTRO_TELEMETRY_DISABLED='1'; npm run build
```

## GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`. Enable GitHub Pages with **GitHub Actions** as the source; the workflow installs dependencies, builds Astro into `dist`, and deploys that artifact.
