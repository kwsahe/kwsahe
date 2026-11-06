# 권상헌 (Sangheon Kwon) — PORTFOLIO 3D REBORN v3.0

> **"From Architecture to Production"**  
> **AI Service Backend Engineer · AI Engineer · Full-Stack Developer**  
> **Design Concept:** `NEXUS CORE × SYSTEM ATLAS × OPS COMMAND`

---

## 1. Overview

This repository powers the interactive 3D engineering portfolio of **Sangheon Kwon (권상헌)**, built to visually and technically demonstrate end-to-end AI system capabilities — from multi-agent orchestration and hybrid RAG verification to cloud edge deployment (`Cloudflare Workers + D1`, `Supabase`, `FastAPI`, `Docker`).

### Key Highlights
- **NEXUS CORE (Hero & 3D AI Core)**: Interactive Three.js / React Three Fiber 3D AI Core featuring a metallic lattice core, triple orbital rings, and **6 flagship project satellites** (while the complete **14 engineering projects** are explored in the System Atlas).
- **SYSTEM ATLAS (Work & 14 Case Studies)**: Filterable, searchable, and sortable engineering catalog of all 14 projects with 9-section deep-dive Case Studies and 54 verified screenshots.
- **OPS COMMAND (3D & 2D Architecture Lab)**: Interactive system topology simulator (`/lab`) for 6 flagship architectures (`JARVIS Office`, `BidPilot AI`, `tri-agent-control`, `Market Pulse`, `K-Safety Law RAG`, `Linky AI Chatbot`) with real-time packet flow stepping and node I/O telemetry inspection.
- **Full Bilingual (`KO` / `EN`) & Theme (`Dark` / `Light`) + Accessibility (`3D Motion ON/OFF`) Support**.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Static Export `output: "export"`) + React 19 |
| **Language** | TypeScript 5.8 (Strict Mode) |
| **3D / WebGL** | Three.js (`r187`), `@react-three/fiber` v9, `@react-three/drei` v10 |
| **Motion & Styling** | GSAP 3.15 (`ScrollTrigger`), Tailwind CSS v4 |
| **State Management** | Zustand v5 (Persisted `locale`, `theme`, `motionEnabled`, Lab simulation state) |
| **Testing & QA** | Vitest v5 (Data & Asset Integrity), Playwright (Headless Chromium E2E) |
| **Deployment** | GitHub Actions Static Export → GitHub Pages (`https://kwsahe.github.io/kwsahe/`) |

---

## 3. Getting Started

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Run local development server (http://localhost:3000/kwsahe/)
npm run dev

# 3. Run TypeScript check & Vitest suite
npm run typecheck
npm run test

# 4. Generate production static export (./out)
npm run build
```

---

## 4. Architecture & Documentation (`docs/`)

- [`docs/01_SOURCE_AUDIT.md`](docs/01_SOURCE_AUDIT.md) — Phase 1 Source Repository Audit & 14-Project Mapping
- [`docs/02_DESIGN_SYSTEM.md`](docs/02_DESIGN_SYSTEM.md) — Phase 2 Design System (`NEXUS CORE × SYSTEM ATLAS × OPS COMMAND`)
- [`docs/03_ARCHITECTURE.md`](docs/03_ARCHITECTURE.md) — Phase 3 Application & Static Export Architecture
- [`docs/04_3D_INTERACTIONS.md`](docs/04_3D_INTERACTIONS.md) — Phase 4 WebGL 3D Core & Architecture Lab Spec
- [`docs/05_PROJECT_CONTENT.md`](docs/05_PROJECT_CONTENT.md) — Phase 5 Bilingual Case Study Content Mapping
- [`docs/06_TEST_REPORT.md`](docs/06_TEST_REPORT.md) — Phase 8 Unit, Build, and Browser QA Report
- [`docs/07_PERFORMANCE_REPORT.md`](docs/07_PERFORMANCE_REPORT.md) — Phase 8 WebGL Performance & Accessibility Report
- [`docs/08_DEPLOYMENT_GUIDE.md`](docs/08_DEPLOYMENT_GUIDE.md) — Phase 9 GitHub Pages Deployment & Rollback Guide
- [`docs/09_FINAL_HANDOFF.md`](docs/09_FINAL_HANDOFF.md) — Phase 10 Final Handoff Summary
