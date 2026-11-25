# Performance report

The production build completed successfully with Vite 5.4.8. The main generated JavaScript bundle is approximately 193 kB before compression (63 kB gzip); the CSS bundle is approximately 15 kB (4 kB gzip). No continuous WebGL render loop or external 3D model is used.

Core Web Vitals were not field-measured in this environment because the browser QA harness was unavailable. Run Lighthouse against the production preview for representative mobile LCP, CLS, and INP measurements.
