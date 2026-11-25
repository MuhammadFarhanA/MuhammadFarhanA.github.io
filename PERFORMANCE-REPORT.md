# Performance report

The production build completed successfully with Vite 5.4.8. The main generated JavaScript bundle is approximately 1.15 MB before compression (339 kB gzip) because Three.js, React Three Fiber, Drei, and GSAP are now included; the CSS bundle is approximately 16 kB (4 kB gzip). No external 3D model is used.

Core Web Vitals were not field-measured in this environment because the browser QA harness was unavailable. Run Lighthouse against the production preview for representative mobile LCP, CLS, and INP measurements.
