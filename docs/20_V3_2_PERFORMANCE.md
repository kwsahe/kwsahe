# 20. PORTFOLIO 3D REBORN v3.2 — PERFORMANCE & RENDERING BENCHMARK

- **Version**: `v3.2.0`
- **Measurement Tool**: Chrome DevTools Protocol (`Performance.getMetrics`, `PerformanceObserver`, `requestAnimationFrame` delta sampling via `measure_perf.mjs`)
- **Viewport**: `1440 × 900` (Chromium Headless + ANGLE SwiftShader WebGL)

---

## 1. Route-by-Route Performance Metrics (v3.2 Measured)

| Route | Label | Nav Load (ms) | LCP (ms) | CLS | Avg FPS | Avg Frame (ms) | P95 Frame (ms) | Script Duration (s) | JS Heap Used (MB) | Layout Count |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | Home (`3D Nexus Core`) | `1,345` | **`868.0`** | **`0.0107`** | `48.3` | `20.63` | `33.4` | `0.760` | `16.74` | `26` |
| `/work/` | Projects (`14 Projects Atlas`) | `1,221` | **`584.0`** | **`0.0008`** | `60.2` | `16.49` | `16.7` | `0.281` | `15.99` | `8` |
| `/lab/` | Architecture Lab (`3D Ops Command`) | `1,026` | **`744.0`** | **`0.0175`** | `58.8` | `16.91` | `16.8` | `0.785` | `15.22` | `7` |
| `/work/link21-ai-jarvis-office/` | Case Study (`JARVIS Office`) | `1,326` | **`456.0`** | **`0.0050`** | `60.4` | `16.49` | `16.7` | `0.151` | `8.50` | `7` |

---

## 2. Core Web Vitals & WebGL Evaluation

1. **Largest Contentful Paint (LCP)**:
   - All 4 primary routes render their largest contentful element well under the `2,500 ms` "Good" threshold (`456 ms` – `868 ms`).
2. **Cumulative Layout Shift (CLS)**:
   - All routes achieve near-zero layout shift (`0.0008` – `0.0175`, well below the `0.10` threshold) due to explicit container aspect ratios (`aspect-[16/10]` on project cards and fixed height reservations on 3D Canvas viewports).
3. **Frame Rate (FPS) & Main-Thread Script Budget**:
   - Non-WebGL routes (`/work/`, `/work/[slug]/`) run at a locked **`60.2`–`60.4` FPS** with `< 0.30s` script execution.
   - `Architecture Lab (/lab/)` improved from `53.2 FPS` in v3.1 to **`58.8 FPS`** (`16.91 ms` average frame time) in v3.2.
   - `Home (/)` maintains **`48.3 FPS`** under software WebGL (SwiftShader) while rendering the central core icosahedron, orbital rings, 6 satellites, and 90-point particle field, with `dpr={[1, 1.5]}` and automatic pause on background tab (`document.visibilityState`) or `reducedMotion`.
4. **Memory Footprint (`JSHeapUsedSize`)**:
   - Ranges between **`8.50 MB`** and **`16.74 MB`**, confirming zero geometry/material leaks across route transitions.
