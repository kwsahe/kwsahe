import { describe, it, expect } from "vitest";
import { LAB_SYSTEMS, LabSystem } from "@/data/architecture-lab-data";
import {
  validateLabGraph,
  buildSimulationSteps,
} from "@/lib/lab-graph";
import {
  NEXUS_CORE_SATELLITES,
  VERIFIED_PROJECT_METRICS,
  getProjectBySlug,
} from "@/data/portfolio-data";

describe("Architecture Lab Directed Graph Engine & Metrics Single Source", () => {
  it("validates that all 6 LAB_SYSTEMS have 0 dangling edges and 0 unreachable nodes", () => {
    for (const system of LAB_SYSTEMS) {
      const report = validateLabGraph(system);
      expect(report.valid, `Graph invalid for ${system.id}: ${report.errors.join("; ")}`).toBe(true);
      expect(report.danglingEdges).toEqual([]);
      expect(report.unreachableNodeIds).toEqual([]);
      expect(report.errors).toEqual([]);
    }
  });

  it("traverses actual directed edges (including branching and feedback cycles) without infinite loops", () => {
    for (const system of LAB_SYSTEMS) {
      const steps = buildSimulationSteps(system);
      expect(steps.length).toBeGreaterThanOrEqual(system.edges.length);
      expect(steps.length).toBeLessThanOrEqual(system.edges.length * 2 + 4);

      // Every step must correspond to an actual directed edge in system.edges
      for (const step of steps) {
        const matchingEdge = system.edges.find(
          (e) => e.from === step.edge.from && e.to === step.edge.to
        );
        expect(
          matchingEdge,
          `Step ${step.edge.from}->${step.edge.to} not in ${system.id} edges`
        ).toBeDefined();
        expect(step.fromNode.id).toBe(step.edge.from);
        expect(step.toNode.id).toBe(step.edge.to);
      }

      // Every valid edge in system.edges must be covered by the simulation sequence
      for (const edge of system.edges) {
        const covered = steps.some(
          (s) => s.edge.from === edge.from && s.edge.to === edge.to
        );
        expect(covered, `Edge ${edge.from}->${edge.to} was not covered`).toBe(true);
      }
    }
  });

  it("identifies branching and feedback cycle structures in JARVIS, TriAgent, Market Pulse, and K-Safety", () => {
    const jarvisReport = validateLabGraph(
      LAB_SYSTEMS.find((s) => s.id === "link21-ai-jarvis-office")!
    );
    expect(jarvisReport.branchingNodeIds).toContain("jarvis-publish-gate");
    expect(jarvisReport.cycleEdges).toContainEqual({
      from: "jarvis-publish-gate",
      to: "jarvis-production-room",
    });

    const triReport = validateLabGraph(
      LAB_SYSTEMS.find((s) => s.id === "tri-agent-control")!
    );
    expect(triReport.cycleEdges).toContainEqual({
      from: "tri-review-commit",
      to: "tri-implement",
    });

    const mpReport = validateLabGraph(
      LAB_SYSTEMS.find((s) => s.id === "market-pulse")!
    );
    expect(mpReport.branchingNodeIds).toContain("mp-filter");
    expect(mpReport.mergeNodeIds).toContain("mp-api-ui");

    const ksReport = validateLabGraph(
      LAB_SYSTEMS.find((s) => s.id === "k-safety-law-rag")!
    );
    expect(ksReport.branchingNodeIds).toContain("ks-scenario");
    expect(ksReport.mergeNodeIds).toContain("ks-claude-route");
  });

  it("detects disconnected/unreachable nodes and dangling edges in synthetic broken graphs", () => {
    const base = LAB_SYSTEMS[0];
    const brokenSystem: LabSystem = {
      ...base,
      id: "synthetic-broken",
      nodes: [
        base.nodes[0],
        base.nodes[1],
        { ...base.nodes[2], id: "isolated-node" },
      ],
      edges: [
        {
          from: base.nodes[0].id,
          to: base.nodes[1].id,
          label: { ko: "정상 연결", en: "Valid Edge" },
        },
        {
          from: base.nodes[1].id,
          to: "ghost-node-id",
          label: { ko: "잘못된 연결", en: "Dangling Edge" },
        },
      ],
    };

    const validation = validateLabGraph(brokenSystem);
    expect(validation.valid).toBe(false);
    expect(validation.danglingEdges).toEqual([
      { from: base.nodes[1].id, to: "ghost-node-id" },
    ]);
    expect(validation.unreachableNodeIds).toContain("isolated-node");

    // buildSimulationSteps must exclude the dangling edge and isolated node
    const steps = buildSimulationSteps(brokenSystem);
    expect(steps.length).toBe(1);
    expect(steps[0].fromNode.id).toBe(base.nodes[0].id);
    expect(steps[0].toNode.id).toBe(base.nodes[1].id);
  });

  it("keeps NEXUS_CORE_SATELLITES (6 flagships) and VERIFIED_PROJECT_METRICS synchronized with PROJECTS_DATA", () => {
    expect(NEXUS_CORE_SATELLITES.length).toBe(6);
    for (const sat of NEXUS_CORE_SATELLITES) {
      const project = getProjectBySlug(sat.slug);
      expect(project, `Missing project for satellite ${sat.slug}`).toBeDefined();
      expect(sat.metric.length).toBeGreaterThan(3);
    }

    for (const sys of LAB_SYSTEMS) {
      const key = sys.id as keyof typeof VERIFIED_PROJECT_METRICS;
      const registryEntry = VERIFIED_PROJECT_METRICS[key];
      expect(registryEntry).toBeDefined();
      if ("labMetrics" in registryEntry) {
        expect(sys.metrics).toEqual([...registryEntry.labMetrics]);
      }
    }
  });
});
