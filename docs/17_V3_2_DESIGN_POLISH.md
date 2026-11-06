# 17. PORTFOLIO 3D REBORN v3.2 — DESIGN SYSTEM & UI/UX POLISH REPORT

- **Version**: `v3.2.0` (Final Polish)
- **Branch**: `fix/portfolio-3d-reborn-v3.1`
- **Design Paradigm**: `NEXUS CORE × SYSTEM ATLAS × OPS COMMAND`

---

## 1. Global Design System & Typography Polish (`src/app/globals.css`)

### 1.1 High-Contrast Color Tokens (WCAG 2.2 AA Compliant)
- **Dark Theme (`:root`)**:
  - Background Primary: `#070B14`
  - Surface Panel: `#0F172A` (`rgba(15, 23, 42, 0.88)`)
  - Elevated Surface: `#15203B` (`rgba(21, 32, 59, 0.94)`)
  - Primary Text: `#F8FAFC` (**19.3:1** contrast against `#070B14`)
  - Secondary Text: `#CBD5E1` (**13.1:1** contrast against `#070B14`)
  - Muted Text: `#94A3B8` (**6.5:1** contrast against `#070B14`, up from `#8B9BB4` in v3.1)
  - Subtle Border: `rgba(148, 163, 184, 0.20)`
- **Light Theme (`html.light`)**:
  - Background Primary: `#F8FAFC`
  - Surface Panel: `#FFFFFF` (`rgba(255, 255, 255, 0.96)`)
  - Elevated Surface: `#F1F5F9`
  - Primary Text: `#0F172A` (**17.4:1** contrast against `#FFFFFF`)
  - Secondary Text: `#334155` (**10.2:1** contrast against `#FFFFFF`)
  - Muted Text: `#475569` (**7.5:1** contrast against `#FFFFFF`)
  - Accent Tokens: `#1D4ED8` (Blue), `#0F766E` (Cyan), `#6D28D9` (Violet)

### 1.2 CJK & Technical Typography Rules
- **Body Line Height**: Standardized at `line-height: 1.7` (`1.65`–`1.75` range) for long-form Korean/English technical narratives.
- **Word Breaking**: Applied `word-break: keep-all; overflow-wrap: break-word;` globally on `body`, `p`, `li`, `dd`, and headings (`h1`–`h4`) to eliminate awkward mid-word Korean line breaks while safely wrapping long English identifiers and URLs.

---

## 2. Navigation Bar & Tablet Breakpoint Polish (`src/components/layout/Navbar.tsx`)

- **Fixed Tablet (`768px`) Line Wrapping**:
  - Added `whitespace-nowrap shrink-0` to every navigation pill and adjusted padding (`md:px-2.5 lg:px-3.5`) so `Home`, `Projects (14)`, `Architecture Lab`, `About`, and `Contact` remain on a single horizontal row across all `768px`–`1920px` viewports.
- **Mobile Drawer**:
  - Preserved `<640px` slide-down drawer with explicit `aria-expanded`, `aria-controls="mobile-nav-drawer"`, and direct Resume PDF download CTA.

---

## 3. Home Hero & 3D Nexus Core Polish (`src/app/page.tsx`, `src/components/three/NexusCoreScene.tsx`)

- **3-Second Comprehension Hierarchy**:
  1. **Identity & Status**: `링크21 재직 중 · AI SERVICE BACKEND ENGINEER`
  2. **Name & Role**: `권상헌 (Sangheon Kwon) — AI Service Backend Engineer`
  3. **Core Engineering Statement**: *"19-에이전트 오케스트레이션, 이중 법령 RAG, 5.8만 건 시세 예측 파이프라인을 설계·구현·검증·배포하는 AI 시스템 엔지니어"*
  4. **Primary CTAs**: `Explore 14 Projects`, `3D Architecture Lab`, `Resume PDF`
- **3D Nexus Core Visual & Interactive Upgrades**:
  - Balanced core emissive intensity (`emissiveIntensity={0.48}`) so overlaid HUD typography remains crisp.
  - Added pointer cursor feedback (`document.body.style.cursor = "pointer"`) when hovering 3D satellite nodes.
  - Upgraded the bottom **Satellite Inspector HUD** with:
    - Active satellite architecture summary (`archSummary`)
    - Verified metric badge (`shortMetric` from `VERIFIED_PROJECT_METRICS`)
    - Direct **`3D Lab`** deep-link (`/lab?system=...`) alongside **`Case Study`** link (`/work/[slug]`)
    - Numbered selector pills (`01 · JARVIS OFFICE` through `06 · k-safety-law-rag`)
- **Flagship Top 4 vs Secondary Featured Hierarchy**:
  - **Flagship Top 4** (`2×2` grid): `LINK21 AI JARVIS OFFICE`, `LINK21 BidPilot AI`, `LINK21 AI Hub`, `tri-agent-control`
  - **Secondary Featured** (`2-column` grid): `Market Pulse`, `LINK21 Premium`

---

## 4. Projects Atlas (`/work`) & Card Hierarchy (`src/app/work/page.tsx`, `src/components/ui/ProjectCard.tsx`)

- **Mobile Filter Compaction**:
  - Added a mobile collapsible toggle (`data-testid="toggle-mobile-filters-btn"`) for Status and Tech Stack filters on `<640px` viewports so mobile users immediately see project cards without scrolling past 25+ filter buttons.
  - Added active filter summary badges above the project grid with one-click removal.
- **Card Density & Theme Adaptation**:
  - Unified card summary height (`line-clamp-3`) and prioritized top 6 core tech stack pills + `+N` overflow badge.
  - Updated `ScreenshotCarousel.tsx` bottom caption bar to use `var(--bg-elevated)` and `var(--text-secondary)` so Light Mode cards maintain seamless contrast.

---

## 5. Case Study Detail (`/work/[slug]`) Polish (`src/components/work/CaseStudyView.tsx`)

- **01–09 Section Index Jump Bar**:
  - Added a quick-navigation index strip (`01. Overview` through `09. Live Links`) below the header so technical reviewers can jump directly to `04. System Architecture`, `06. Verification`, or `07. Challenges`.
- **Visual Pipeline Flow in `04. System Architecture`**:
  - Styled numbered pipeline stages with step badges (`STEP 01`, `STEP 02`, ...) and directional connector accents.
- **Spacious 2-Column Layout for `07. Challenges` & `08. Limitations`**:
  - Upgraded from a cramped 3-column row to a readable 2-column engineering breakdown with numbered items (`08.1`, `08.2`, ...).

---

## 6. Architecture Lab (`/lab`) UX & Readability (`src/components/three/ArchitectureLabScene.tsx`)

- **Simulation Path Selector**:
  - Added explicit path toggle buttons (`data-testid="lab-path-btn-remediation"` / `data-testid="lab-path-btn-branch"` / `data-testid="lab-path-btn-primary"`) so users can switch between the **Remediation / Branch Path** and the **Primary Happy Path**.
- **Clickable Step Timeline & Layer Legend**:
  - Added clickable step pills (`S1`, `S2`, ...) and a Layer & Edge Legend strip (`Ingress`, `Orchestrator`, `Processing`, `Storage`, `Validation Gate`, `Feedback Edge`).
- **2D SVG Multi-line Node Labels & Mobile Default**:
  - Implemented `wrapSvgLabel()` to split long node titles across 2 lines inside widened (`158×60`) rounded SVG rects, preventing text clipping.
  - Defaulted `<768px` mobile viewports to 2D SVG mode on initial mount for immediate legibility while allowing 3D WebGL toggle at any time.
- **8-Section Structured Node Inspector**:
  - Explicitly numbered `01 Role & Responsibility` through `08 Sample Payload` with theme-aware code blocks.

---

## 7. About (`/about`) & Contact (`/contact`) Narrative Reorganization

- **About Page Narrative Order**:
  - Reorganized into: **`01. Who I Am` → `02. What I Build` → `03. How I Work (4-Stage Process)` → `04. Engineering Skills Mapped to Projects` → `05. Experience, Education & Certifications`**.
- **Privacy & Contact Refinement**:
  - Removed unnecessary personal birth date and phone number exposure from public pages while highlighting verified engineering channels (`Email`, `GitHub`, `Architecture Lab`, `Resume PDF`, and `Verified Production & Open-Source Links`).
