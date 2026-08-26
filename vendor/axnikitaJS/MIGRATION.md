# Migration notes: axnikitaJS 2.31 → 3.0.1

## Safe without changes

- Keep loading the library as an ordinary `<script>`.
- Keep all historical function and class names.
- Keep `axLoader`, `axLoaderSVG`, `axJson`, `axCanvas`, modules and existing
  element methods. They remain globally accessible.

## Behaviour corrected deliberately

| API | Before | Now |
| --- | --- | --- |
| `sleep(ms)` | Blocked the browser's main thread | Returns `Promise`; use `await sleep(ms)` |
| `axRequest.execute()` | Changed the supplied object and effectively did not distinguish cached request data | Does not mutate data; caches by method, URL and data |
| `axRequest.execute(..., errorCallback)` | Third callback was ignored | Receives HTTP/network/timeout error object |
| `axCookie.deleteCookie(name)` | Called nonexistent `setCookie()` | Deletes `name` with `max-age=-1` |
| `axDate` | Could throw because `z` / `differenceDate` were undeclared | Uses milliseconds and `axnikitaJS.config.serverTimeOffsetMs` |
| `axURL` / `axJoin` | Did not encode query string values | Uses `URLSearchParams` |

## Recommended style for new portfolio code

Prefer the namespace for dependencies that are easy to identify during review:

```js
const {axNode, axRequest, axURL} = axnikitaJS.classes;
```

Avoid adding new methods to built-in prototypes. The historical extensions stay
only for backward compatibility; new code should use `axnikitaJS.utils`, native
`URLSearchParams`, `FormData` and small local functions instead.

## Release discipline

1. Add or update a smoke test for each changed public API.
2. Run `node --check` and the smoke suite before publishing.
3. Use a minor release for compatible additions and a major release only for an
   intentional behavior change such as the asynchronous `sleep` fix.


## 3.0.1 request-method correction

`axRequest.type` now defaults to `auto` instead of `post`.

- empty request data → GET;
- non-empty request data → POST;
- FormData in auto mode → POST;
- explicit `type: 'get'` / `type: 'post'` still wins;
- `axLoader` single-resource loads and the historical `[spa]` navigation therefore use GET;
- `/ajax/batch-loader` stays explicitly POST because it submits a request bundle.

This is a compatibility correction: loaders read resources, while command/API calls can still choose POST explicitly or let `auto` select it from non-empty data.
