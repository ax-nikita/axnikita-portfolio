# Portfolio — three static pages + axnikitaJS

Structure:

- `index.html` — About
- `web/index.html` — WEB
- `gamedev/index.html` — GameDev
- `templates/header.html` — one shared header
- `templates/footer.html` — one shared footer
- `assets/css/main.css` — single bundle containing the three approved layouts
- `assets/js/axnikitaJS.js` — axnikitaJS 3.0.1
- `assets/js/site.js` + `assets/js/modules/` — externalized runtime
- `assets/images/` — organized page images

Header/footer are loaded by axnikitaJS `domLoader` with `cacheTime="86400"`.

All navigation links between About / WEB / GameDev use the native `spa` attribute.

Important deployment base in the shared header and runtime:

`/axnikita-portfolio/`

This matches the current GitHub Pages project URL.


## Single CSS bundle

The browser loads only `assets/css/main.css`.

The original About, WEB and GameDev styles are kept isolated inside the bundle by:

- `body[data-page="about"]`
- `body[data-page="web"]`
- `body[data-page="gamedev"]`

During native axnikitaJS SPA navigation `site.js` updates `body[data-page]`.
Therefore the correct page rules become active immediately without replacing or
loading another stylesheet.
