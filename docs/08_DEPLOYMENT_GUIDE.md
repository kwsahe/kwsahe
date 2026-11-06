# PHASE 9 & 10 — DEPLOYMENT & SAFE ROLLBACK GUIDE (`08_DEPLOYMENT_GUIDE.md`)

## 1. Branch & Release State Overview

- **Production Branch (`origin/main`)**: Currently running **PORTFOLIO 3D REBORN v3.0** (`41fd68f`) deployed via GitHub Actions to `https://kwsahe.github.io/kwsahe/`.
- **Legacy v2.0 Backup Tag (`v2.0-legacy-static`)**: Points to commit `1d21ad6` (the final legacy static HTML/CSS/JS commit prior to v3.0).
- **v3.1 Hardening Branch (`fix/portfolio-3d-reborn-v3.1`)**: Contains all v3.1 performance optimizations (`NexusCoreScene` zero-state `useFrame`), directed graph simulation engine (`src/lib/lab-graph.ts`), Playwright E2E test suite (`tests/e2e/`), SEO/accessibility upgrades, and PR-gated CI/CD workflow.

---

## 2. Static Export Architecture (`next.config.ts`)

The Next.js 16 application is configured for zero-backend static hosting on GitHub Pages (`https://kwsahe.github.io/kwsahe/`):

```ts
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/kwsahe",
  assetPrefix: "/kwsahe/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

- Running `npm run build` outputs a complete static bundle to `./out`.
- `.nojekyll` is included in `./public/.nojekyll` and automatically copied to `./out/.nojekyll`.
- All static images (`/png/...`, `/assets/...`) and the resume PDF (`/assets/resume-kwon-sangheon.pdf`) are resolved through `assetPath()` (`src/lib/utils.ts`) to guarantee `/kwsahe/...` prefix accuracy in both local development and production GitHub Pages.

---

## 3. Separated CI Verification vs. Production Deployment (`.github/workflows/deploy.yml`)

In v3.1, `.github/workflows/deploy.yml` strictly separates **Verification (`verify-and-build`)** from **Public Deployment (`deploy`)**:

1. **Pull Requests & Feature/Fix Branches (`pull_request` / `push` to `fix/**`, `feat/**`)**:
   - Runs `verify-and-build` only:
     - `npm ci --legacy-peer-deps` (lockfile-reproducible install)
     - `npm run typecheck`
     - `npm run test` (Vitest unit & graph integrity tests)
     - `npm run build` (Next.js static export + `.nojekyll` verification)
     - `npm run test:e2e` (Playwright Chromium E2E verification)
   - Does **NOT** run `deploy`, keeping the live public site untouched until PR merge approval.
2. **Production Release (`push` to `main` or manual `workflow_dispatch`)**:
   - Runs `verify-and-build`, uploads `./out` via `actions/upload-pages-artifact@v3`, and executes `actions/deploy-pages@v4`.

---

## 4. Safe Rollback Procedures (Commit-Type Aware)

> [!CAUTION]
> Never blindly run `git revert -m 1 HEAD` without first checking whether `HEAD` is a merge commit or a regular single-parent commit, and never use `git reset --hard` + `git push --force` on `main`.

### Case A: Reverting a Standard Single-Parent Commit on `main`
Check parent count first:
```powershell
git show --no-patch --format="%H (parents: %P)" HEAD
```
If `HEAD` has **one parent** (e.g., fast-forward or squash commit):
```powershell
git checkout main
git revert --no-edit HEAD
git push origin main
```

### Case B: Reverting a Merge Commit (`--no-ff` PR Merge) on `main`
If `HEAD` has **two parents** (`<main-parent> <branch-parent>`):
```powershell
git checkout main
git revert -m 1 --no-edit HEAD
git push origin main
```

### Case C: Full Restoration to Legacy v2.0 Static Site (`v2.0-legacy-static` / `1d21ad6`)
If you ever need to restore the pre-Reborn static HTML/CSS/JS version (`1d21ad6`) without rewriting history:
```powershell
git checkout main
git checkout v2.0-legacy-static -- .
git commit -m "revert: restore v2.0-legacy-static (1d21ad6) snapshot"
git push origin main
```
And in GitHub Repository **Settings → Pages → Build and deployment → Source**, switch from **GitHub Actions** to **Deploy from a branch (`main` / `/root`)**.
