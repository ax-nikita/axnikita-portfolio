# axnikitaJS 3.0.1

Compatibility-first JavaScript library for sites that already use the historical
`ax*` API. It keeps the public global names needed by old projects while placing
the portfolio-facing infrastructure behind small, single-purpose classes.

## What changed

The following public names are retained: `axNode`, `axRequest`, `axDate`,
`axCookie`, `axURL`, `axGet`, `axLazy`, `axQS`, `axQSA`, `throttle`,
`getSelectedRadioValue` and `setRadioValue`. Existing `axLoader`,
`axLoaderSVG`, `axJson`, canvas classes, component modules and aliases also
remain available.

The modernized core fixes defects that affected real use:

- `sleep(ms)` is asynchronous and never blocks rendering.
- `axRequest` no longer mutates input data; it has stable cache keys, handles
  GET/POST correctly, and passes errors to the supplied third callback.
- **3.0.1:** the default request mode is `auto`: an empty payload resolves to GET,
  a non-empty payload resolves to POST. This restores the historical `axLoader` /
  `[spa]` read semantics while `/ajax/batch-loader` remains explicitly POST.
- Form-data serialization handles nested objects, `null`, files and arrays.
- `axDate` has no hidden dependency on global `z` or `differenceDate`.
- `axCookie.deleteCookie()` deletes the requested cookie.
- `axLazy` uses `IntersectionObserver` where available and a scroll fallback.
- Legacy prototype extensions are non-enumerable and installed safely even when
  the old non-configurable descriptors already exist.

## Using it

```html
<script src="/assets/axnikitaJS.js" defer></script>
```

The original imperative API continues to work:

```js
const card = new axNode('article.project-card[data-project=portfolio]');
card.axVal('Portfolio project');
document.querySelector('main').append(card);

const request = new axRequest('/api/projects', {
    type: 'auto',
    dataTemplate: {locale: 'ru'},
    saveLoadData: true,
});

request.execute({page: 1}, (response) => {
    console.log(response);
}, (error) => {
    console.error(error.type, error.status);
});
```

The versioned namespace is provided for new code. It makes dependencies clear
without forcing a migration of every legacy script:

```js
const {axNode, axRequest} = axnikitaJS.classes;
const {toFormData} = axnikitaJS.utils;

axnikitaJS.config.serverTimeOffsetMs = 0;
```

## Architecture

| Area | Responsibility | Main public API |
| --- | --- | --- |
| DOM | Element creation and ergonomic legacy methods | `axNode`, `axQS`, `axQSA` |
| Transport | XHR lifecycle, serialization and cache | `axRequest` |
| Browser state | Date, URL and cookies | `axDate`, `axURL`, `axGet`, `axCookie` |
| Loading | Viewport-aware image loading | `axLazy` |
| Compatibility | Explicit adapters for historic prototype helpers | `toFormData`, `axJoin`, `executeFunctions` |

This is SOLID in a practical browser-library sense: responsibilities are kept
separate, `axRequest` depends only on the browser XHR interface, and the legacy
global API is an adapter rather than the place where new features are designed.

## Browser target

The source uses modern evergreen-browser features: classes, private module
scope, `URL`, `URLSearchParams`, `FormData`, optional chaining and nullish
coalescing. It targets current Chrome, Edge, Firefox and Safari. There is an
automatic fallback when `IntersectionObserver` is unavailable.

## Verification

Run from this directory:

```bash
node --check axnikitaJS.js
node --test axnikitaJS.smoke.test.cjs
```

The smoke suite validates public compatibility, DOM syntax parsing, request
cache behavior, non-mutating request inputs, date/URL/cookie helpers and
syntax.
