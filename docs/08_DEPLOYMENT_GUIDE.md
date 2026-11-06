# PHASE 9 — DEPLOYMENT & ROLLBACK GUIDE (`08_DEPLOYMENT_GUIDE.md`)

## 1. Branch & Worktree Isolation

All development for **PORTFOLIO 3D REBORN v3.0** was performed strictly inside an isolated Git worktree and feature branch:

- **Main Repository (`main`)**: `C:\Users\sangh\Desktop\Gram\Victus\Code\Portfolio` (`1d21ad6` — untouched)
- **Feature Worktree (`feat/portfolio-3d-reborn`)**: `C:\Users\sangh\orca\workspaces\Portfolio\soapfish`

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
- `.nojekyll` is included in `./public/.nojekyll` and automatically copied to `./out/.nojekyll` so GitHub Pages serves `/_next/static/...` assets without Jekyll filtering.
- All static images (`/png/...`, `/assets/...`) and the resume PDF (`/assets/resume/권상헌_이력서.pdf`) are resolved through `assetPath()` (`src/lib/utils.ts`) to guarantee `/kwsahe/...` prefix accuracy in both local development and production GitHub Pages.

---

## 3. GitHub Actions CI/CD Workflow (`.github/workflows/deploy.yml`)

A full automated build, verification, and GitHub Pages deployment pipeline is configured in `.github/workflows/deploy.yml`:

1. **Install Dependencies**: `npm ci --legacy-peer-deps`
2. **TypeScript Check**: `npm run typecheck`
3. **Unit & Content Integrity Tests**: `npm run test`
4. **Next.js Static Export**: `npm run build`
5. **Artifact Upload & Pages Deployment**: `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4` (runs only when merged/pushed to `main` or triggered via `workflow_dispatch`).

---

## 4. Production Release Procedure (After User Approval)

When ready to publish `feat/portfolio-3d-reborn` to the live `https://kwsahe.github.io/kwsahe/` site:

```powershell
# 1. Push the feature branch to GitHub
git push -u origin feat/portfolio-3d-reborn

# 2. Open a Pull Request on GitHub or merge into main after review:
git checkout main
git merge --no-ff feat/portfolio-3d-reborn -m "feat: release Portfolio 3D Reborn v3.0 (Nexus Core x System Atlas x Ops Command)"
git push origin main
```

Ensure GitHub Repository **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions**.

---

## 5. Instant Rollback Plan

If you ever need to revert to the legacy static HTML/CSS/JS portfolio (`1d21ad6`):

```powershell
git checkout main
git revert -m 1 HEAD
git push origin main
```

Or switch GitHub Pages source back to `Deploy from a branch (main / root)` targeting commit `1d21ad6`.
