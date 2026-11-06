# 18. PORTFOLIO 3D REBORN v3.2 — ARCHITECTURE LAB GRAPH & CI/CD FIXES

- **Version**: `v3.2.0`
- **Target Modules**:
  - `src/lib/lab-graph.ts`
  - `src/components/three/ArchitectureLabScene.tsx`
  - `src/__tests__/lab-graph.test.ts`
  - `.github/workflows/deploy.yml`

---

## 1. Architecture Lab Contiguous Graph Traversal Engine (`src/lib/lab-graph.ts`)

### 1.1 Root Cause in v3.1
In `v3.1`, `buildSimulationSteps()` appended unvisited secondary/branch edges at the end of the main traversal loop so every edge in `system.edges` would appear in a single flat step list. This caused two graph-continuity defects:
1. **JARVIS OFFICE**: After traversing `5 (Publish Gate) -> 4 (QA Reviewer)` (feedback edge), node `4` was already marked visited, so the traversal jumped directly to `5 -> 6 (Workspace UI)` without re-traversing `4 -> 5`.
2. **Market Pulse & k-safety-law-rag**: Unvisited branch edges (`2 -> 4`, `1 -> 3`) were appended after the terminal output node `4` was already reached, causing the packet to teleport backward from node `4` to node `2` or `1`.

### 1.2 v3.2 Solution: Multi-Path Contiguous Graph Engine
We replaced the single flat list with **`buildSimulationPaths(system): LabSimulationPath[]`**, generating strictly contiguous directed walks (`traceContiguousPath`) for each system:

- **Invariant Enforced (`isPathContiguous`)**:
  $$\forall i \in [0, \text{steps.length} - 2]: \quad \text{steps}[i].\text{toNode.id} === \text{steps}[i + 1].\text{fromNode.id}$$
- **Start & Terminal Invariant**:
  - Every simulation path starts at `system.nodes[0]` (Ingress) and terminates at `system.nodes[system.nodes.length - 1]` (Final Output).
- **Verified Path Breakdown Across All 6 Systems**:

| System ID | Path ID | Strategy | Step Count | Contiguous Node Sequence |
| --- | --- | --- | --- | --- |
| `link21-ai-jarvis-office` | `remediation` (Default) | 1-Pass Feedback Loop + Recovery | **7 steps** | `1 → 2 → 3 → 4 → 5 → 4 → 5 → 6` |
| `link21-ai-jarvis-office` | `primary` | Primary Happy Path | **5 steps** | `1 → 2 → 3 → 4 → 5 → 6` |
| `link21-bidpilot-ai` | `primary` | Primary Happy Path | **5 steps** | `1 → 2 → 3 → 4 → 5 → 6` |
| `tri-agent-control` | `remediation` (Default) | 1-Pass Review Rejection + Recovery | **8 steps** | `1 → 2 → 3 → 4 → 5 → 2 → 3 → 4 → 5` |
| `tri-agent-control` | `primary` | Primary Happy Path | **4 steps** | `1 → 2 → 3 → 4 → 5` |
| `market-pulse` | `primary` (Default) | Primary ML Forecast Path | **3 steps** | `1 → 2 → 3 → 4` |
| `market-pulse` | `branch` | Direct Stats Branch Path | **2 steps** | `1 → 2 → 4` |
| `k-safety-law-rag` | `primary` (Default) | Law + Manual Dual RAG Path | **3 steps** | `1 → 2 → 3 → 4` |
| `k-safety-law-rag` | `branch` | Field Manual Direct Path | **2 steps** | `1 → 3 → 4` |
| `link21-ai-chatbot` | `primary` | Intent-Routed SSE Path | **3 steps** | `1 → 2 → 3 → 4` |

### 1.3 Unit Test Coverage (`src/__tests__/lab-graph.test.ts`)
- Verifies structural graph validity across all 6 systems (`0 errors`).
- Asserts `isPathContiguous(path.steps) === true` for **every path of every system** (zero teleportation).
- Asserts exact node sequences for `JARVIS OFFICE` (`7` remediation steps, `5` primary steps), `tri-agent-control` (`8` remediation steps, `4` primary steps), `Market Pulse` (`3` primary, `2` branch), and `k-safety-law-rag` (`3` primary, `2` branch).
- Asserts 100% union edge coverage across each system's available paths.

---

## 2. GitHub Actions Deployment Guard Hardening (`.github/workflows/deploy.yml`)

### 2.1 Issue Identified (`CI-01`)
In `v3.1`, the `if:` condition checked `github.event_name == 'push' || github.event_name == 'workflow_dispatch'` without explicitly checking `github.ref == 'refs/heads/main'`. While `on.push.branches: [main]` restricted push triggers, a manual `workflow_dispatch` on a feature branch could have triggered artifact upload and deployment.

### 2.2 Fix Applied
Both the **`Upload Pages artifact`** step and the **`deploy`** job now enforce an explicit branch + event guard:

```yaml
if: >-
  github.ref == 'refs/heads/main' &&
  (github.event_name == 'push' ||
   github.event_name == 'workflow_dispatch')
```

This guarantees that PR runs and non-`main` workflow dispatches run full verification (`typecheck`, `vitest`, `playwright`, `next build`, `./out` verification) while never uploading Pages artifacts or deploying to production.
