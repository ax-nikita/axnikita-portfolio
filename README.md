# axnikita / Zonov Nikita

**Full-stack WEB developer · PHP / JavaScript / WordPress · Game systems & tooling**

This repository is my portfolio and, at the same time, one of the projects in it.

It collects work from commercial WEB development, production/legacy systems, my own browser libraries and GameDev tooling. The point is not to present a list of technologies — it is to show how I approach real systems: what I built, why the architecture looks the way it does, and how the same ideas evolved from early projects into reusable infrastructure.

<p align="center">
  <img src="docs/readme/mprus-feed.png" alt="MPRUS marketplace sellers platform" width="49%">
  <img src="docs/readme/kazaxlibers-inventory.png" alt="KazAXLibers 7 Days to Die systems mod" width="49%">
</p>

## What I work with

My main WEB stack is **PHP, JavaScript, WordPress and MySQL**. Most of my commercial work is not greenfield landing pages: it includes existing production code, integrations, custom WordPress architecture, dynamic loading, real-time features, internal tools and long-lived projects that have to keep working while they evolve.

GameDev is the second part of the portfolio. I use it mostly for **systems design, balance and tooling**: procedural logic, progression, multiplayer state, modding APIs, data-driven content and utilities that help manage large amounts of game data.

## Selected engineering work

| Project | What it demonstrates | Main technology |
| --- | --- | --- |
| **MPRUS** | Generalized content loading for Post/User/Term/Comment, custom API dispatcher, reactions, ratings, notifications, rate limiting and WordPress-side service separation | PHP, WordPress, JavaScript, MySQL, WP Object Cache |
| **MamaMind / Momspace** | Server-rendered WordPress with SPA-like navigation, reusable dynamic loader, infinite article reading with URL synchronization, CPT/search/SEO integrations | PHP, WordPress, Vanilla JS, SCSS |
| **AxNikita.com / axnikitaJS** | Custom full-stack site that grew into reusable PHP/JS tooling: WebSocket, client-side loading, History API navigation, cache and reusable browser utilities | PHP, JavaScript, MySQL, WebSocket |
| **Production legacy / commerce** | Long-term development inside a large PHP 7.4 codebase: internal call-center tools, delivery/payment integrations and safe changes across existing business flows | PHP 7.4, external APIs |
| **KazAXLibers** | Data-driven build pipeline for a 7 Days to Die overhaul: XML generation, recursive resource-cost calculation, balance analytics, icon generation and 3-language content | PHP, XML/XPath, JSON, ImageMagick, PHPExcel |
| **Uranium** | Large Mindustry systems expansion with factories, ammunition, turret progression, random quality, multi-crafters and synchronized gameplay state | JavaScript, Mindustry API, HJSON/JSON |

The portfolio also contains smaller commercial WordPress projects, focused GameDev mods and my first projects from 2018–2019. I keep them because the progression is useful: the older work explains where the current abstractions came from.

## This portfolio is an engineering project too

The site itself is intentionally built around the same principles I use in application code:

- one shared header and one shared footer instead of duplicated page markup;
- semantic HTML with normal URLs and progressive enhancement;
- **axnikitaJS 3.0.1** as the browser runtime;
- native `[spa]` navigation from axnikitaJS with GET semantics for page loading;
- server-rendered pages remain independently accessible without JavaScript;
- modular SCSS with Sass `@use`, shared tokens and component ownership;
- separate desktop and mobile compositions instead of shrinking desktop until it fits;
- visual QA at desktop, tablet, 390 px and 320 px widths;
- real project screenshots and technical diagrams instead of invented UI or fake metrics.

### Why axnikitaJS

`axnikitaJS` is my own browser library that originated in earlier personal/commercial work and is still used by several of my projects.

The current **3.0.1** release keeps the historical `ax*` API for backward compatibility while moving new code toward explicit, versioned dependencies.

```js
const { axRequest, axURL, axCookie } = axnikitaJS.classes;
const { throttle } = axnikitaJS.utils;
```

For this portfolio the library is responsible for the browser-side infrastructure:

```text
internal link [spa]
        ↓
axLoader
        ↓
axRequest(type: auto)
        ↓
empty page payload → GET
        ↓
replace <main>
        ↓
end_load_spa
        ↓
page-specific lifecycle is reinitialized
```

Batch loading remains explicitly POST, while normal page navigation keeps the historical GET semantics.

The library source, migration notes and regression tests are included in the repository rather than treated as a black-box dependency.

## Repository architecture

```text
src/
├── layouts/
│   └── BaseLayout.astro
├── components/
│   ├── SiteHeader.astro
│   └── SiteFooter.astro
├── data/
│   └── site.ts
├── pages/
│   ├── index.astro
│   ├── web.astro
│   └── gamedev.astro
├── scripts/
│   └── portfolio-runtime.js
└── styles/
    ├── abstracts/
    ├── base/
    ├── layout/
    ├── components/
    ├── pages/
    └── main.scss

public/assets/js/
├── axnikitaJS.js
└── portfolio-runtime.js
```

`BaseLayout` owns the document shell. `SiteHeader` and `SiteFooter` are the only sources of their markup. Page files own only their page content. Shared visual behavior belongs to shared SCSS partials, not copied page styles.

## SCSS conventions

The production styles use Sass modules rather than a single generated stylesheet:

```scss
@use "abstracts/tokens";
@use "base/reset";
@use "layout/header";
@use "layout/footer";
@use "components/case-index";
@use "pages/gamedev";
```

A few rules I keep explicit:

- no deprecated Sass `@import`;
- shallow nesting;
- reusable colors, spacing, breakpoints and z-indexes are tokens;
- component styles have a clear owner;
- page partials contain only page-specific composition;
- grid/flex children are written defensively for long real content;
- `prefers-reduced-motion` is respected for decorative motion.

## Development and AI-assisted workflow

I use Codex and other AI tools as implementation and review accelerators, not as a substitute for project context.

The architecture, project facts, visual direction, custom libraries, source archives and acceptance criteria come from my own work. AI-assisted changes are made against those constraints and then reviewed with code checks, regression tests and browser QA.

That is also why this repository keeps explicit architecture notes and real reference material: a generated change should be easy to verify against the intended system, not accepted because it merely “looks finished”.

## Verification

The repository includes regression tests for axnikitaJS and structural checks for the portfolio.

For the library:

```bash
node --check public/assets/js/axnikitaJS.js
node --test tests/axnikitaJS.smoke.test.cjs
```

The portfolio QA baseline includes:

- 1440 px desktop;
- 1024 px small desktop/tablet;
- 390×844 mobile;
- 320×568 small mobile;
- no horizontal overflow;
- no gallery overlap;
- no missing assets;
- normal direct URLs;
- SPA navigation and browser history;
- RU/EN switch;
- lightbox;
- mobile case minimap;
- reduced-motion behavior.

## Portfolio sections

- **About** — experience, stack and project timeline
- **WEB** — commercial and personal WEB projects
- **GameDev** — systems, modding, balance and tooling

## Contact

- GitHub: [ax-nikita](https://github.com/ax-nikita)
- Kwork: [axnikita](https://kwork.ru/user/axnikita)

---

<details>
<summary><strong>Кратко по-русски</strong></summary>

Я full-stack WEB-разработчик. Основной стек — PHP, JavaScript, WordPress и MySQL. Работаю не только с новыми сайтами, но и с production/legacy-кодом, API, платежами, доставкой, собственными компонентами и архитектурой WordPress-проектов.

Отдельное направление — GameDev: системы, баланс, моддинг и инструменты для генерации/анализа большого объёма игрового контента.

Это портфолио само является техническим кейсом: единая разметка header/footer, Astro, современный SCSS, собственная библиотека axnikitaJS 3.0.1, SPA с обычными URL и обязательная проверка адаптива в Chromium.

AI-инструменты используются в разработке как ускоритель реализации и проверки. Архитектура, содержание кейсов, исходные проекты, собственные библиотеки и критерии качества не генерируются заново под README — они берутся из реальной кодовой базы и проектных архивов.

</details>
