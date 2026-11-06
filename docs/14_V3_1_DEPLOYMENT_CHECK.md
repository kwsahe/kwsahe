# PHASE 4 & 10 — DEPLOYMENT & STATIC EXPORT CHECK (`14_V3_1_DEPLOYMENT_CHECK.md`)

## 1. Current Live Production (`main`) Verification

Prior to v3.1 changes, commit `41fd68f` was deployed via GitHub Actions (`Run #42176499374`) to `https://kwsahe.github.io/kwsahe/`.

- **GitHub Pages Source Configuration**: `build_type: "workflow"` (verified via `gh api repos/kwsahe/kwsahe/pages`)
- **Live URL Status (`https://kwsahe.github.io/kwsahe/`)**: `HTTP 200 OK`
- **Legacy Static Backup Tag**: `v2.0-legacy-static` (`1d21ad6`)

---

## 2. Static Export Build Verification (`./out` on `fix/portfolio-3d-reborn-v3.1`)

Running `npm run build` (`next build` with `output: "export"`, `basePath: "/kwsahe"`, `trailingSlash: true`) generates the following verified static artifacts in `./out`:

| Route / Artifact | Static Output Path in `./out` | Status |
|---|---|---|
| `/kwsahe/` | `out/index.html` | **PASS** |
| `/kwsahe/work/` | `out/work/index.html` | **PASS** |
| `/kwsahe/lab/` | `out/lab/index.html` | **PASS** |
| `/kwsahe/about/` | `out/about/index.html` | **PASS** |
| `/kwsahe/contact/` | `out/contact/index.html` | **PASS** |
| `/kwsahe/work/link21-ai-jarvis-office/` | `out/work/link21-ai-jarvis-office/index.html` | **PASS** |
| `/kwsahe/work/link21-ai-hub/` | `out/work/link21-ai-hub/index.html` | **PASS** |
| `/kwsahe/work/link21-bidpilot-ai/` | `out/work/link21-bidpilot-ai/index.html` | **PASS** |
| `/kwsahe/work/tri-agent-control/` | `out/work/tri-agent-control/index.html` | **PASS** |
| `/kwsahe/work/market-pulse/` | `out/work/market-pulse/index.html` | **PASS** |
| All remaining 9 `/kwsahe/work/[slug]/` routes | `out/work/<slug>/index.html` (14 / 14 total) | **PASS** |
| `/kwsahe/sitemap.xml` | `out/sitemap.xml` (20 canonical URLs) | **PASS** |
| `/kwsahe/robots.txt` | `out/robots.txt` | **PASS** |
| `.nojekyll` | `out/.nojekyll` | **PASS** |
| Resume PDF | `out/assets/resume-kwon-sangheon.pdf` | **PASS** |
| 404 Fallback | `out/404.html` | **PASS** |

---

## 3. GitHub Actions CI/CD Separation (`.github/workflows/deploy.yml`)

The updated workflow in `.github/workflows/deploy.yml` enforces a strict separation between **PR Verification** and **Production Deployment**:

1. **`verify-and-build` Job** (runs on `pull_request` to `main` AND `push` to `main`, `fix/**`, `feat/**`):
   - `npm ci --legacy-peer-deps`
   - `npm run typecheck`
   - `npm run test` (14 Vitest unit & graph tests)
   - `npx playwright install --with-deps chromium`
   - `npm run test:e2e` (14 Playwright E2E tests across 8 spec files)
   - `npm run build`
   - Shell verification that `out/.nojekyll`, `out/index.html`, `out/work/index.html`, `out/lab/index.html`, `out/sitemap.xml`, and `out/robots.txt` exist.
2. **`deploy` Job** (gated by `if: github.event_name == 'workflow_dispatch' || (github.event_name == 'push' && github.ref == 'refs/heads/main')`):
   - Runs **ONLY** after `fix/portfolio-3d-reborn-v3.1` is approved and merged into `main`.
