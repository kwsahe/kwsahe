# PHASE 1 — PORTFOLIO 3D REBORN v3.1 FULL AUDIT (`10_V3_1_AUDIT.md`)

- **Audited Commit (`v3.0` HEAD)**: `41fd68f` (`origin/main`, `origin/feat/portfolio-3d-reborn`)
- **Legacy Rollback Tag**: `v2.0-legacy-static` (`1d21ad6`)
- **Working Remediation Branch**: `fix/portfolio-3d-reborn-v3.1`
- **Audit Date**: 2026-11-06

---

## 1. Executive Summary of Audited Issues

We inspected every target file in the repository against the v3.1 quality, performance, graph accuracy, E2E testing, SEO/accessibility, and CI/CD requirements. Every issue below was **reproduced and confirmed** against commit `41fd68f`.

| ID | Category | Target File(s) | Reproduced? | Severity | Summary |
|---|---|---|---|---|---|
| **AUD-01** | WebGL / R3F Perf | `src/components/three/NexusCoreScene.tsx` | **YES (Lines 128–192)** | **HIGH** | `setSatPositions(next)` is called inside `useFrame()` on every animation frame, triggering ~60 React state updates & re-renders per second and reallocating `<Line points={...}>` geometry every frame. |
| **AUD-02** | Canvas Lifecycle & DPR | `NexusCoreScene.tsx`, `ArchitectureLabScene.tsx`, `docs/07_PERFORMANCE_REPORT.md` | **YES** | **MEDIUM** | Code sets `dpr={[1, 1.75]}` while docs claim `dpr={[1, 1.5]}`. Additionally, `document.visibilityState === "hidden"` does not pause the 3D simulation clock, and `scrollRatio` state updates on window scroll trigger React re-renders of `NexusCoreScene`. |
| **AUD-03** | Graph Traversal Logic | `src/components/three/ArchitectureLabScene.tsx` | **YES (Lines 157–159, 289–312, 488–494)** | **HIGH** | Packet simulation advances by array index `(idx + 1) % system.nodes.length` instead of traversing `system.edges`. Furthermore, `Lab2DSvgView` draws edges between `idx` and `idx + 1` rather than `system.edges`. |
| **AUD-04** | Lab State Coupling | `src/components/three/ArchitectureLabScene.tsx` | **YES (Lines 453–505, 694–697)** | **MEDIUM** | `selectedNodeId` is used for both the Telemetry Inspector panel AND the active packet simulation node. Clicking any node to inspect its specs hijacks the active packet simulation position. |
| **AUD-05** | E2E Test Automation | `package.json`, `playwright.config.ts`, `tests/e2e/` | **YES** | **HIGH** | `@playwright/test` is installed in `devDependencies`, but no `playwright.config.ts`, `tests/e2e/*.spec.ts`, or `npm run test:e2e` script exists in the repository. |
| **AUD-06** | Satellite Count Discrepancy | `README.md`, `docs/04_3D_INTERACTIONS.md`, `docs/09_FINAL_HANDOFF.md` | **YES** | **MEDIUM** | Docs state "14 project satellites" in `NexusCoreScene`, whereas `SATELLITES` in `NexusCoreScene.tsx` intentionally renders **6 Flagship Satellites** (while the full 14 projects are in `/work`). |
| **AUD-07** | Resume Path Doc Discrepancy | `docs/06_TEST_REPORT.md`, `docs/08_DEPLOYMENT_GUIDE.md`, `docs/09_FINAL_HANDOFF.md` | **YES** | **MEDIUM** | Actual file on disk and in `src/data/portfolio-data.ts` is `/assets/resume-kwon-sangheon.pdf` (`public/assets/resume-kwon-sangheon.pdf`), whereas several docs erroneously wrote `/assets/resume/권상헌_이력서.pdf`. |
| **AUD-08** | Duplicated Metric Strings | `NexusCoreScene.tsx`, `architecture-lab-data.ts`, `portfolio-data.ts` | **YES** | **LOW** | Key verified metrics (JARVIS 873/252/19 tests, BidPilot 2,659 tests & 188/191, AI Hub 515 Vitest, tri-agent-control 384 tests, Market Pulse 57,690 rows & R² 0.78, K-Safety 90.0 score & 41 tests) are hardcoded across multiple files instead of referencing a single source of truth. |
| **AUD-09** | SEO & Static Metadata | `src/app/layout.tsx`, `src/app/*/page.tsx`, `public/robots.txt`, `src/app/sitemap.ts` | **YES** | **MEDIUM** | Sub-routes (`/work`, `/lab`, `/about`, `/contact`, `/work/[slug]`) lack route-specific metadata/canonical tags; `robots.txt`, `sitemap.xml`, JSON-LD structured data, and a custom `not-found.tsx` page are missing. |
| **AUD-10** | Modal & Keyboard Accessibility | `ScreenshotCarousel.tsx`, `ArchitectureLabScene.tsx`, `layout.tsx` | **YES** | **MEDIUM** | Lightbox modal in `ScreenshotCarousel.tsx` and fullscreen mode in `ArchitectureLabScene.tsx` do not close on `Escape` key or restore focus to the trigger button on close; no Skip-to-Content link in `layout.tsx`. |
| **AUD-11** | CI/CD PR Gate & Rollback Docs | `.github/workflows/deploy.yml`, `docs/08_DEPLOYMENT_GUIDE.md` | **YES** | **MEDIUM** | `deploy.yml` uses `npm install --legacy-peer-deps` instead of `npm ci --legacy-peer-deps`, does not run on `pull_request` (without deploying), and does not execute Playwright E2E tests. Rollback guide suggested `git revert -m 1 HEAD` unconditionally even for non-merge commits. |

---

## 2. Detailed Cause, Impact, Reproduction & Fix Specification

### AUD-01 & AUD-02: `NexusCoreScene.tsx` Per-Frame React State Updates & Canvas Lifecycle
- **Root Cause**:
  - `CoreAssembly` holds `const [satPositions, setSatPositions] = useState(...)` and calls `setSatPositions(next)` inside `useFrame()` every tick (`60Hz`).
  - `NexusCoreScene` holds `const [scrollRatio, setScrollRatio] = useState(0)` updated in a window `scroll` listener, causing full React component re-renders during page scroll.
- **Impact**:
  - Triggers ~60 React reconciliations/sec in `CoreAssembly` and recreates 6 `<Line points={[[0,0,0], pos]} />` geometries every frame, increasing GC pressure, CPU script time, and frame jitter.
- **Reproduction**:
  - Open `/` (`http://localhost:3000/kwsahe/`) and inspect `CoreAssembly` render frequency or CDP `ScriptDuration` / `RecalcStyleCount`.
- **Fix Plan**:
  1. Remove `satPositions` React state entirely.
  2. Store `scrollRatio` in a `useRef<number>(0)` rather than `useState`.
  3. Use `THREE.Group` refs (`satGroupRefs`) for the 6 satellite meshes and `THREE.BufferGeometry` refs (`beamGeomRefs`) with pre-allocated `Float32Array(6)` position buffers for the radial energy beams, mutating `position` and `attributes.position.needsUpdate = true` directly inside `useFrame()`.
  4. Pause `useFrame` updates when `document.hidden` is true or `inView` is false.
  5. Standardize `dpr={[1, 1.5]}` across both 3D scenes and documentation, and dispose custom buffer geometries on unmount.
- **Verification Criteria**:
  - `CoreAssembly` React re-renders during idle 3D animation drop from **~60/sec to 0/sec**.
  - Verified improvement in CDP `ScriptDuration` / `TaskDuration` and steady frame times.

---

### AUD-03 & AUD-04: `ArchitectureLabScene.tsx` Graph Traversal & State Decoupling
- **Root Cause**:
  - `Lab3DGraph` and `handleAdvanceStep` compute the next node via `(currentIdx + 1) % system.nodes.length`, ignoring `system.edges`.
  - `Lab2DSvgView` renders `<line>` elements between `system.nodes[idx]` and `system.nodes[idx + 1]`, ignoring `system.edges`.
  - `selectedNodeId` is overloaded to represent both the user-inspected node and the active packet simulation node.
- **Impact**:
  - Branching architectures (e.g., Publish Gate auto-remediation branch, Codex `REVIEW: CHANGES` feedback loop, Market Pulse anomaly feed, K-Safety Direct Route) cannot be represented or traversed accurately.
  - Clicking a node to inspect its I/O specs jumps the packet simulation to that node.
- **Fix Plan**:
  1. Create `src/lib/lab-graph.ts` with:
     - `validateLabGraph(system)`: Validates that all `edges` reference valid `nodes`, detects unreachable nodes, identifies branching nodes (`outDegree > 1`) and feedback cycles, and returns a structured validation report.
     - `buildSimulationSteps(system)`: Builds an explicit, cycle-safe sequence of directed edge transitions (`SimulationStep[]`) directly from `system.edges`. Branching nodes follow a deterministic policy (primary forward pipeline edge first, plus explicit branch/remediation edges), and cycle edges are traversed at most once per simulation pass to prevent infinite loops.
  2. Enrich `src/data/architecture-lab-data.ts` with verified branching/feedback edges (`edge.kind?: "primary" | "branch" | "feedback"`) reflecting the documented behavior of each system.
  3. Separate `simStepIndex` (packet position along `SimulationStep[]`) from `selectedNodeId` (Node Telemetry Inspector selection) with an optional `followSimulation` toggle so clicking a node inspects it without corrupting simulation progress.
  4. Update `Lab2DSvgView` to render all `system.edges` (using curved quadratic Bezier `<path>` for branch/feedback edges and straight directed lines for primary edges) and synchronize 100% of state across 3D ↔ 2D mode switches.
- **Verification Criteria**:
  - Unit tests in `src/__tests__/lab-graph.test.ts` verify graph validity, branching traversal, cycle termination, and zero unreachable nodes across all 6 Lab systems.
  - Playwright E2E tests in `tests/e2e/architecture-lab.spec.ts` verify Play, Pause, Step, Reset, Node Select independence, and 3D ↔ 2D synchronization.
