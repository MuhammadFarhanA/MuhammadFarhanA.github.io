# QA report

- `npm.cmd run build` — passed.
- `npm.cmd run lint` — passed.
- Utility CSS residue scan — clean.
- Dev server startup — passed at `http://127.0.0.1:5173/`.
- Browser screenshot / interaction QA — unavailable because the browser access host was not available in this environment. No screenshot locations are claimed.

Reduced motion is supported through `prefers-reduced-motion`; project and poem routes are regular deep links and all primary content is rendered as HTML.
