# axnikita / Zonov Nikita Portfolio

Static portfolio rebuilt from the approved files in `reference/`.

## Routes

- `/` - About
- `/web/` - WEB portfolio
- `/gamedev/` - GameDev portfolio

## Architecture

- `reference/` - approved visual/content reference only
- `index.html`, `web/index.html`, `gamedev/index.html` - generated static pages with ported `<main>` content
- `templates/header.html`, `templates/footer.html` - the only shared header/footer markup
- `assets/scss/main.scss` - Sass entrypoint compiled to `assets/css/main.css`
- `assets/js/site-runtime.js` - shared axnikitaJS-powered runtime
- `assets/js/about.js`, `assets/js/web.js`, `assets/js/gamedev.js` - page modules reinitialized after `end_load_spa`
- `assets/images/` - organized image assets copied from `reference/assets/`
- `vendor/axnikitaJS/axnikitaJS.js` - supplied axnikitaJS 3.0.1 runtime copied into `assets/js/`

## Commands

```bash
npm install
npm run build
npm test
npm run dev
```

`npm run build` regenerates the static pages from `reference/` and compiles `assets/scss/main.scss` to `assets/css/main.css`.
