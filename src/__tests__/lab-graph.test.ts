import { describe, it, expect } from "vitest";
import { LAB_SYSTEMS, LabSystem } from "../data/architecture-lab-data";
import {
  validateLabGraph,
  buildSimulationSteps,
  buildSimulationPaths,
  isPathContiguous,
} from "../lib/lab-graph";
import {
  PROJECTS_DATA,
  VERIFIED_PROJECT_METRICS,
  NEXUS_CORE_SATELLITES,
} from "../data/portfolio-data";

describe("Architecture Lab Directed Graph & Simulation Engine (v3.2)", () => {
  it("validates all 6 LabSystem directed graphs with 0 dangling edges and 0 unreachable nodes", () => {
    expect(LAB_SYSTEMS).toHaveLength(6);

    for (const sys of LAB_SYSTEMS) {
      const report = validateLabGraph(sys);
      expect(report.valid, `Graph errors in ${sys.id}: ${report.errors.join("; ")}`).toBe(true);
      expect(report.danglingEdges).toHaveLength(0);
      expect(report.unreachableNodeIds).toHaveLength(0);
      expect(report.entryNodeIds.length).toBeGreaterThanOrEqual(1);
      expect(report.edgeCount).toBeGreaterThanOrEqual(sys.nodes.length - 1);
    }
  });

  it("guarantees 100% path continuity (no node teleportation) from entry to terminal output across all paths of all 6 systems", () => {
    for (const sys of LAB_SYSTEMS) {
      const paths = buildSimulationPaths(sys);
      expect(paths.length).toBeGreaterThanOrEqual(1);

      const coveredEdges = new Set<string>();

      for (const path of paths) {
        const steps = path.steps;
        expect(steps.length).toBeGreaterThanOrEqual(1);

        // Must start at entry node (nodes[0]) and end at terminal output node (nodes[last])
        expect(steps[0].fromNode.id).toBe(sys.nodes[0].id);
        expect(steps[steps.length - 1].toNode.id).toBe(
          sys.nodes[sys.nodes.length - 1].id
        );

        // Every single adjacent step must satisfy steps[i].toNode.id === steps[i+1].fromNode.id
        expect(
          isPathContiguous(steps),
          `Non-contiguous teleport detected in ${sys.id} (${path.id}): ${steps
            .map((s) => `${s.fromNode.id}->${s.toNode.id}`)
            .join(", ")}`
        ).toBe(true);

        // Every step must correspond to a real edge in sys.edges
        for (const step of steps) {
          const matchingEdge = sys.edges.find(
            (e) => e.from === step.edge.from && e.to === step.edge.to
          );
          expect(matchingEdge).toBeDefined();
          coveredEdges.add(`${step.edge.from}->${step.edge.to}`);
        }
      }

      // Every edge defined in sys.edges must be traversed in at least one valid path
      for (const edge of sys.edges) {
        expect(
          coveredEdges.has(`${edge.from}->${edge.to}`),
          `Edge ${edge.from}->${edge.to} in ${sys.id} was not covered by any simulation path`
        ).toBe(true);
      }
    }
  });

  it("accurately separates JARVIS Publish Gate primary happy path vs 1-pass auto-remediation path", () => {
    const jarvis = LAB_SYSTEMS.find((s) => s.id === "link21-ai-jarvis-office")!;

    const primarySteps = buildSimulationSteps(jarvis, "primary");
    expect(isPathContiguous(primarySteps)).toBe(true);
    expect(
      primarySteps.map((s) => `${s.fromNode.id}->${s.toNode.id}`)
    ).toEqual([
      "jarvis-intake->jarvis-workers-api",
      "jarvis-workers-api->jarvis-strategy-room",
      "jarvis-strategy-room->jarvis-production-room",
      "jarvis-production-room->jarvis-publish-gate",
      "jarvis-publish-gate->jarvis-output-render",
    ]);

    const remediationSteps = buildSimulationSteps(jarvis, "remediation");
    expect(isPathContiguous(remediationSteps)).toBe(true);
    expect(
      remediationSteps.map((s) => `${s.fromNode.id}->${s.toNode.id}`)
    ).toEqual([
      "jarvis-intake->jarvis-workers-api",
      "jarvis-workers-api->jarvis-strategy-room",
      "jarvis-strategy-room->jarvis-production-room",
      "jarvis-production-room->jarvis-publish-gate",
      "jarvis-publish-gate->jarvis-production-room",
      "jarvis-production-room->jarvis-publish-gate",
      "jarvis-publish-gate->jarvis-output-render",
    ]);
  });

  it("accurately separates tri-agent-control primary pass vs Codex REVIEW: CHANGES rework loop and completes to output", () => {
    const tri = LAB_SYSTEMS.find((s) => s.id === "tri-agent-control")!;

    const primarySteps = buildSimulationSteps(tri, "primary");
    expect(isPathContiguous(primarySteps)).toBe(true);
    expect(primarySteps).toHaveLength(4);
    expect(primarySteps[primarySteps.length - 1].toNode.id).toBe(
      "tri-review-commit"
    );

    const reworkSteps = buildSimulationSteps(tri, "remediation");
    expect(isPathContiguous(reworkSteps)).toBe(true);
    expect(
      reworkSteps.map((s) => `${s.fromNode.id}->${s.toNode.id}`)
    ).toEqual([
      "tri-plan-worktree->tri-implement",
      "tri-implement->tri-test",
      "tri-test->tri-verify",
      "tri-verify->tri-review-commit",
      "tri-review-commit->tri-implement",
      "tri-implement->tri-test",
      "tri-test->tri-verify",
      "tri-verify->tri-review-commit",
    ]);
  });

  it("accurately handles forward branching in Market Pulse and k-safety-law-rag without teleportation", () => {
    const mp = LAB_SYSTEMS.find((s) => s.id === "market-pulse")!;
    const mpPrimary = buildSimulationSteps(mp, "primary");
    const mpBranch = buildSimulationSteps(mp, "branch");

    expect(isPathContiguous(mpPrimary)).toBe(true);
    expect(mpPrimary.map((s) => `${s.fromNode.id}->${s.toNode.id}`)).toEqual([
      "mp-scraper->mp-filter",
      "mp-filter->mp-ml",
      "mp-ml->mp-api-ui",
    ]);

    expect(isPathContiguous(mpBranch)).toBe(true);
    expect(mpBranch.map((s) => `${s.fromNode.id}->${s.toNode.id}`)).toEqual([
      "mp-scraper->mp-filter",
      "mp-filter->mp-api-ui",
    ]);

    const ks = LAB_SYSTEMS.find((s) => s.id === "k-safety-law-rag")!;
    const ksPrimary = buildSimulationSteps(ks, "primary");
    const ksBranch = buildSimulationSteps(ks, "branch");

    expect(isPathContiguous(ksPrimary)).toBe(true);
    expect(ksPrimary.map((s) => `${s.fromNode.id}->${s.toNode.id}`)).toEqual([
      "ks-scenario->ks-dual-rag",
      "ks-dual-rag->ks-claude-route",
      "ks-claude-route->ks-citation-validator",
    ]);

    expect(isPathContiguous(ksBranch)).toBe(true);
    expect(ksBranch.map((s) => `${s.fromNode.id}->${s.toNode.id}`)).toEqual([
      "ks-scenario->ks-claude-route",
      "ks-claude-route->ks-citation-validator",
    ]);
  });

  it("detects dangling edges and unreachable nodes on synthetic invalid graphs", () => {
    const brokenSystem: LabSystem = {
      ...LAB_SYSTEMS[0],
      id: "broken-test-system",
      nodes: [
        LAB_SYSTEMS[0].nodes[0],
        LAB_SYSTEMS[0].nodes[1],
        { ...LAB_SYSTEMS[0].nodes[2], id: "isolated-node" },
      ],
      edges: [
        {
          from: LAB_SYSTEMS[0].nodes[0].id,
          to: LAB_SYSTEMS[0].nodes[1].id,
          label: { ko: "정상", en: "Valid" },
        },
        {
          from: LAB_SYSTEMS[0].nodes[1].id,
          to: "non-existent-node",
          label: { ko: "끊어진 엣지", en: "Dangling" },
        },
      ],
    };

    const result = validateLabGraph(brokenSystem);
    expect(result.valid).toBe(false);
    expect(result.danglingEdges).toEqual([
      { from: LAB_SYSTEMS[0].nodes[1].id, to: "non-existent-node" },
    ]);
    expect(result.unreachableNodeIds).toContain("isolated-node");
  });

  it("enforces single-source metric consistency between portfolio-data.ts and architecture-lab-data.ts", () => {
    expect(NEXUS_CORE_SATELLITES).toHaveLength(6);

    for (const sat of NEXUS_CORE_SATELLITES) {
      const project = PROJECTS_DATA.find((p) => p.slug === sat.slug);
      expect(project).toBeDefined();
    }

    for (const sys of LAB_SYSTEMS) {
      const canonical =
        VERIFIED_PROJECT_METRICS[
          sys.id as keyof typeof VERIFIED_PROJECT_METRICS
        ];
      expect(canonical).toBeDefined();
      if ("labMetrics" in canonical) {
        expect(sys.metrics).toEqual([...canonical.labMetrics]);
      }
    }
  });
});
