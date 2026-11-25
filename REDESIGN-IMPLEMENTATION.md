# Redesign implementation

The portfolio is now an HTML-first, seven-scene “Interface Architect” experience. The home route keeps professional content searchable and semantic while the visual layer uses reusable CSS perspective geometry, architectural grids, layered panels, and scene-specific materials. Project, case-study, poetry, and resume URLs remain accessible.

The previous utility CSS framework has been removed completely: dependency, config, PostCSS plugin, directives, and legacy utility-only UI files are gone. Styling now lives in `src/index.css` with design tokens and responsive rules.

The browser preview harness was unavailable during this handoff, so visual QA is limited to the successful production build and lint checks.
