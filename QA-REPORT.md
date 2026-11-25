# QA report

- `npm.cmd run build` — passed.
- `npm.cmd run lint` — passed.
- Utility CSS residue scan — clean.
- Dev server startup — passed at `http://127.0.0.1:5173/`.
- Playwright Chromium verification — passed against the Vite dev server.
- Canvas initialized: `1`; standard-mode canvas count: `0`; reduced-motion canvas count: `0`.
- Scroll progress checkpoints: `0.000`, `0.2506`, `0.5000`, `0.7506`, `1.0000`.
- Backward scroll returned to `0.000`; no console errors were captured.
- Real renderer stats were observed: `53` meshes, changing draw calls/triangle counts, and changing camera coordinates.
- Verification script: `scripts/verify-immersive.mjs`.
- Screenshots: `verification-immersive-0.png`, `verification-immersive-25.png`, `verification-immersive-50.png`, `verification-immersive-75.png`, `verification-immersive-100.png`.
- Raw checkpoint report: `verification-immersive.json`.

Reduced motion is supported through `prefers-reduced-motion`; project and poem routes are regular deep links and all primary content is rendered as HTML.
