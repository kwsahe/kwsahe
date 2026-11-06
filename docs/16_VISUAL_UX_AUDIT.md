# 16. PORTFOLIO 3D REBORN v3.2 — Visual, UX & Functional Audit Report

- **Date**: 2026-11-06
- **Branch**: `fix/portfolio-3d-reborn-v3.1` (Target PR: [#2](https://github.com/kwsahe/kwsahe/pull/2))
- **Audited URL**: `http://localhost:3000/kwsahe/`
- **Audited Viewports**: `1920×1080`, `1440×900`, `1024×768`, `768×1024`, `390×844`, `360×800`
- **Audited Pages**: Home (`/`), Projects (`/work`), Case Study (`/work/[slug]`), Architecture Lab (`/lab`), About (`/about`), Contact (`/contact`)

---

## 1. Executive Summary

Following the v3.1 performance and E2E stabilization, a full visual, UX, and graph-logic inspection was conducted on the live rendered site across all 6 pages and 6 target viewports. While v3.1 achieved 0 console/page errors and strong rendering performance (`56.8 FPS`, `0.0026` CLS on `/work`), **10 concrete visual, UX, graph-continuity, and CI protection issues** were identified and prioritized for **v3.2 Final Polish**.

---

## 2. Detailed Findings & Remediation Plan

### 2.1 Functional & CI Protection Findings

| ID | Target File(s) | Problem Cause | Remediation Direction (v3.2) |
|---|---|---|---|
| **FUNC-01** | `src/lib/lab-graph.ts`, `src/components/three/ArchitectureLabScene.tsx` | `buildSimulationSteps()` appended unvisited parallel branch edges (`mp-filter -> mp-api-ui`, `ks-scenario -> ks-claude-route`) at the end of the primary path, causing the packet to teleport non-contiguously from the terminal node back to an earlier node. Additionally, in `tri-agent-control`, taking the feedback edge `tri-review-commit -> tri-implement` halted traversal at `tri-implement` because its outgoing edge was already marked used. | Redesign `src/lib/lab-graph.ts` to generate strictly contiguous simulation paths (`steps[i].toNode.id === steps[i+1].fromNode.id` for 100% of steps) from entry node to terminal output node. Support explicit **Simulation Path Modes** (`primary` Happy Path vs `remediation`/`branch` Path) so users can inspect both normal and branch/feedback flows without any node teleportation. |
| **CI-01** | `.github/workflows/deploy.yml` | The `Upload Pages artifact` step and `deploy` job used `if: github.ref == 'refs/heads/main' || github.event_name == 'workflow_dispatch'`, which would allow a manual `workflow_dispatch` trigger on a non-`main` branch to deploy to production GitHub Pages. | Restrict both conditions to `github.ref == 'refs/heads/main' && (github.event_name == 'push' || github.event_name == 'workflow_dispatch')`. |

---

### 2.2 Visual, Typography & Responsive UX Findings

| ID | Page / Viewport | Target File(s) | Visual / UX Issue | Remediation Direction (v3.2) |
|---|---|---|---|---|
| **VIS-01** | Global Navbar (`768×1024` Tablet) | `src/components/layout/Navbar.tsx` | On `768px` (`md:`), the horizontal navigation pill renders Korean labels without `whitespace-nowrap`, causing `프로젝트`, `아키텍처 랩`, `소개 & 경력`, `연락처` to break awkwardly across 2 lines (`v31_vp_768x1024_work.png`). | Add `whitespace-nowrap` to all nav items and brand labels; use compact horizontal padding at `md:` and full spacing at `lg:` so nav labels never wrap onto two lines. |
| **VIS-02** | Architecture Lab (`/lab`, 2D & Mobile) | `src/components/three/ArchitectureLabScene.tsx` | In `Lab2DSvgView`, `node.label[locale].slice(0, 17)` truncates Korean titles mid-word (`1. 말로 부탁하기 (Ask J`, `5. 게시 가능 판정 (Publ`). Also, mobile screens (`360px`/`390px`) load 3D mode by default where small 3D dodecahedrons are harder to read than the 2D topology diagram. | Render multi-line wrapped node labels inside wider SVG node cards (`156×78`) with layer color badges and edge labels. Default mobile viewports (`< 768px`) to 2D topology view while keeping 1-click 3D WebGL switching available. |
| **VIS-03** | Architecture Lab Inspector & Controls (`/lab`) | `src/components/three/ArchitectureLabScene.tsx` | The stage toolbar lacks a clear visual indicator of the active simulation path (Normal vs Branch/Remediation), a clickable step progress timeline bar, and a layer color legend (`INPUT`, `API`, `ORCHESTRATOR`, `AI_DATA`, `VALIDATION`, `OUTPUT`). | Add an interactive **Path Mode Selector** (`기본 경로` / `보완·분기 경로`), a clickable **Step Progress Timeline Bar**, a **Layer Color Legend**, and clearer typography hierarchy in the Node Inspector. |
| **VIS-04** | Home Hero & Flagship Ordering (`/`) | `src/app/page.tsx`, `src/components/three/NexusCoreScene.tsx`, `src/data/portfolio-data.ts` | 1) Hero left summary is a single dense 6-line block. 2) `NexusCoreScene` bottom HUD only shows a 1-line title + metric without explaining the selected satellite's architecture or linking to its 3D Lab. 3) Main Flagship Top 4 had `LINK21 Premium` at #4 instead of `tri-agent-control`. | 1) Refine Hero copy for 3-second comprehension with scannable architecture highlights. 2) Upgrade `NexusCoreScene` HUD with satellite architecture summary, metric badge, 3D Lab link, and Case Study CTA. 3) Reorder Flagship Top 4 to `JARVIS OFFICE`, `BidPilot AI`, `LINK21 AI Hub`, `tri-agent-control`, and Secondary Featured to `Market Pulse`, `LINK21 Premium`. |
| **VIS-05** | Projects Atlas (`/work`) | `src/app/work/page.tsx`, `src/components/ui/ProjectCard.tsx`, `src/components/ui/ScreenshotCarousel.tsx` | 1) On mobile (`360px`/`390px`), displaying all 26 filter buttons pushes the first project card below the fold. 2) `ScreenshotCarousel` caption bar uses hardcoded dark background `#0D1424` even in Light Mode. | 1) Make secondary filters (Operational Status & Tech Stack) collapsible on mobile (`< 768px`) with an active-filter counter badge, while keeping them always visible on desktop. 2) Make `ScreenshotCarousel` and `ProjectCard` surfaces fully theme-aware with consistent height and typography hierarchy. |
| **VIS-06** | Case Study (`/work/[slug]`) | `src/components/work/CaseStudyView.tsx` | Sections `07. Challenges` and `08. Limitations` are squeezed into narrow 1/3 columns (`md:grid-cols-3`), making detailed engineering explanations feel cramped. No quick section jump bar exists. | Add a sticky/scannable `01`–`09` section index bar, widen `07. Challenges` and `08. Limitations` into a readable 2-column layout with bullet points, and enhance `04. Architecture` with a visual step-flow diagram. |
| **VIS-07** | About & Contact (`/about`, `/contact`) | `src/app/about/page.tsx`, `src/app/contact/page.tsx` | On `/about`, the `4-Stage Engineering Process (How I Work)` is buried at the very bottom below certificates instead of following `Who I Am → What I Build → How I Work → Engineering Skills → Experience`. On `/contact`, phone number is exposed as a primary card alongside email/GitHub/Resume. | Reorder `/about` into the logical 5-stage narrative flow (`Who I Am → What I Build → How I Work → Engineering Skills → Experience & Credentials`), and streamline `/contact` around Email, GitHub, Resume PDF, and Verified Production Service Links. |
| **A11Y-01** | Accessibility & Light Mode Contrast | `src/app/globals.css`, `tests/e2e/accessibility.spec.ts` | Automated `axe-core` WCAG 2.2 AA scan was not yet integrated into Playwright E2E tests, and Light Mode border/muted contrast can be sharpened. | Integrate `axe-core` automated accessibility assertions into `tests/e2e/accessibility.spec.ts` and refine CSS variables in `globals.css` for high-contrast Dark & Light themes. |
