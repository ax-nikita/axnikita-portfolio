# Changelog

## 3.0.1 — 2026-08-26

- Changed the default `axRequest.type` from `post` to `auto` in both compatibility and modern request implementations.
- Empty request payloads now resolve to GET by default.
- Non-empty payloads resolve to POST by default.
- FormData resolves to POST in the compatibility request implementation.
- Restored GET semantics for `axLoader` single-resource loads and `[spa]` page loading.
- Kept `/ajax/batch-loader` explicitly POST.
- Added regression coverage for default GET/POST selection and loader/batch method semantics.
