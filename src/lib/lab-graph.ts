import { LabSystem, LabNode, LabEdge } from "@/data/architecture-lab-data";
import { LocalizedText } from "@/data/portfolio-data";

export type SimulationPathMode = "default" | "primary" | "branch" | "remediation";

export interface SimulationStep {
  stepIndex: number;
  edge: LabEdge;
  fromNode: LabNode;
  toNode: LabNode;
  isBranch: boolean;
  isCycleFeedback: boolean;
  passNumber: number;
}

export interface SimulationPath {
  id: "primary" | "remediation" | "branch";
  label: LocalizedText;
  description: LocalizedText;
  steps: SimulationStep[];
}

export interface LabGraphValidationResult {
  valid: boolean;
  systemId: string;
  nodeCount: number;
  edgeCount: number;
  entryNodeIds: string[];
  terminalNodeIds: string[];
  branchingNodeIds: string[];
  mergeNodeIds: string[];
  cycleEdges: Array<{ from: string; to: string }>;
  unreachableNodeIds: string[];
  danglingEdges: Array<{ from: string; to: string }>;
  errors: string[];
}

/**
 * Validates that a LabSystem's nodes and edges form a connected, valid directed graph
 * with no dangling edge endpoints and no unreachable/isolated nodes.
 */
export function validateLabGraph(system: LabSystem): LabGraphValidationResult {
  const errors: string[] = [];
  const nodeMap = new Map<string, LabNode>();
  const nodeOrder = new Map<string, number>();

  system.nodes.forEach((n, idx) => {
    if (nodeMap.has(n.id)) {
      errors.push(`Duplicate node ID "${n.id}" in system "${system.id}".`);
    }
    nodeMap.set(n.id, n);
    nodeOrder.set(n.id, idx);
  });

  const inDegree = new Map<string, number>();
  const outDegree = new Map<string, number>();
  const adj = new Map<string, LabEdge[]>();

  for (const n of system.nodes) {
    inDegree.set(n.id, 0);
    outDegree.set(n.id, 0);
    adj.set(n.id, []);
  }

  const danglingEdges: Array<{ from: string; to: string }> = [];
  const cycleEdges: Array<{ from: string; to: string }> = [];

  for (const edge of system.edges) {
    const hasFrom = nodeMap.has(edge.from);
    const hasTo = nodeMap.has(edge.to);
    if (!hasFrom || !hasTo) {
      danglingEdges.push({ from: edge.from, to: edge.to });
      errors.push(
        `Dangling edge "${edge.from} -> ${edge.to}" in system "${system.id}".`
      );
      continue;
    }
    if (edge.from === edge.to) {
      errors.push(
        `Self-loop edge "${edge.from} -> ${edge.to}" is not allowed in system "${system.id}".`
      );
      continue;
    }

    adj.get(edge.from)!.push(edge);
    outDegree.set(edge.from, (outDegree.get(edge.from) ?? 0) + 1);
    inDegree.set(edge.to, (inDegree.get(edge.to) ?? 0) + 1);

    const fromIdx = nodeOrder.get(edge.from) ?? 0;
    const toIdx = nodeOrder.get(edge.to) ?? 0;
    if (edge.kind === "feedback" || toIdx < fromIdx) {
      cycleEdges.push({ from: edge.from, to: edge.to });
    }
  }

  // Entry nodes have inDegree === 0 and outDegree > 0; reachability starts from primary entry node (nodes[0])
  const entryNodeIds = system.nodes
    .filter(
      (n) => (inDegree.get(n.id) ?? 0) === 0 && (outDegree.get(n.id) ?? 0) > 0
    )
    .map((n) => n.id);
  const startNodeIds =
    system.nodes.length > 0 ? [system.nodes[0].id] : [];

  // BFS reachability from startNodeIds along valid directed edges
  const visited = new Set<string>();
  const queue: string[] = [...startNodeIds];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    if (visited.has(curr)) continue;
    visited.add(curr);
    for (const edge of adj.get(curr) ?? []) {
      if (!visited.has(edge.to)) {
        queue.push(edge.to);
      }
    }
  }

  const unreachableNodeIds = system.nodes
    .filter((n) => !visited.has(n.id))
    .map((n) => n.id);

  if (unreachableNodeIds.length > 0) {
    errors.push(
      `Unreachable nodes [${unreachableNodeIds.join(", ")}] in system "${system.id}".`
    );
  }

  const terminalNodeIds = system.nodes
    .filter((n) => (outDegree.get(n.id) ?? 0) === 0)
    .map((n) => n.id);
  const branchingNodeIds = system.nodes
    .filter((n) => (outDegree.get(n.id) ?? 0) > 1)
    .map((n) => n.id);
  const mergeNodeIds = system.nodes
    .filter((n) => (inDegree.get(n.id) ?? 0) > 1)
    .map((n) => n.id);

  return {
    valid:
      errors.length === 0 &&
      system.nodes.length >= 2 &&
      system.edges.length >= 1,
    systemId: system.id,
    nodeCount: system.nodes.length,
    edgeCount: system.edges.length,
    entryNodeIds,
    terminalNodeIds,
    branchingNodeIds,
    mergeNodeIds,
    cycleEdges,
    unreachableNodeIds,
    danglingEdges,
    errors,
  };
}

/**
 * Verifies that a sequence of SimulationSteps is 100% contiguous:
 * every step's `toNode.id` must equal the next step's `fromNode.id` (no teleportation).
 */
export function isPathContiguous(steps: SimulationStep[]): boolean {
  if (steps.length === 0) return false;
  for (let i = 0; i < steps.length - 1; i++) {
    if (steps[i].toNode.id !== steps[i + 1].fromNode.id) {
      return false;
    }
  }
  return true;
}

/**
 * Internal helper that walks a contiguous path from `nodes[0]` to a terminal node
 * according to the requested strategy (`"primary"`, `"remediation"`, or `"branch"`).
 *
 * Continuity Guarantee:
 * - Every transition starts strictly from `currentId` (the `to` node of the previous step).
 * - In `"remediation"` mode, each `"feedback"` edge is taken at most ONCE; subsequent
 *   visits to nodes re-traverse `"primary"` edges forward until the terminal node is reached.
 * - In `"branch"` mode, when a node has an outgoing `"branch"` edge, it takes the `"branch"`
 *   edge and then continues along `"primary"` edges to the terminal node.
 * - In `"primary"` mode, only `"primary"` (or default) forward edges are taken.
 */
function traceContiguousPath(
  system: LabSystem,
  strategy: "primary" | "remediation" | "branch"
): SimulationStep[] {
  const nodeMap = new Map<string, LabNode>();
  const nodeOrder = new Map<string, number>();
  system.nodes.forEach((n, idx) => {
    nodeMap.set(n.id, n);
    nodeOrder.set(n.id, idx);
  });

  const adj = new Map<string, LabEdge[]>();
  for (const n of system.nodes) {
    adj.set(n.id, []);
  }

  let validEdgeCount = 0;
  for (const edge of system.edges) {
    if (
      nodeMap.has(edge.from) &&
      nodeMap.has(edge.to) &&
      edge.from !== edge.to
    ) {
      adj.get(edge.from)!.push(edge);
      validEdgeCount++;
    }
  }

  if (system.nodes.length < 2 || validEdgeCount === 0) {
    return [];
  }

  const feedbackUsed = new Set<string>();
  const branchUsed = new Set<string>();
  const edgeVisitCount = new Map<string, number>();
  const rawSteps: Array<{ edge: LabEdge; passNumber: number }> = [];

  let currentId = system.nodes[0].id;
  const maxSteps = system.nodes.length * 3 + 4;
  let guard = 0;

  while (guard < maxSteps) {
    guard++;
    const outgoing = adj.get(currentId) ?? [];
    if (outgoing.length === 0) {
      break;
    }

    const feedbackEdge = outgoing.find(
      (e) =>
        (e.kind === "feedback" ||
          (nodeOrder.get(e.to) ?? 0) < (nodeOrder.get(e.from) ?? 0)) &&
        !feedbackUsed.has(`${e.from}->${e.to}`)
    );
    const branchEdge = outgoing.find(
      (e) => e.kind === "branch" && !branchUsed.has(`${e.from}->${e.to}`)
    );
    const primaryEdge = outgoing.find(
      (e) => !e.kind || e.kind === "primary"
    );

    let chosen: LabEdge | undefined;

    if (strategy === "remediation" && feedbackEdge) {
      chosen = feedbackEdge;
      feedbackUsed.add(`${chosen.from}->${chosen.to}`);
    } else if (strategy === "branch" && branchEdge) {
      chosen = branchEdge;
      branchUsed.add(`${chosen.from}->${chosen.to}`);
    } else if (primaryEdge) {
      // Prevent infinite cycles if a graph only has a primary cycle with no terminal exit
      const key = `${primaryEdge.from}->${primaryEdge.to}`;
      const visits = edgeVisitCount.get(key) ?? 0;
      const maxAllowedVisits = feedbackUsed.size > 0 ? 2 : 1;
      if (visits < maxAllowedVisits) {
        chosen = primaryEdge;
      }
    } else if (strategy === "primary" && outgoing.length > 0) {
      // Fallback if a node only has non-feedback outgoing edges
      const nonFeedback = outgoing.find((e) => e.kind !== "feedback");
      if (nonFeedback) {
        const key = `${nonFeedback.from}->${nonFeedback.to}`;
        if ((edgeVisitCount.get(key) ?? 0) < 1) {
          chosen = nonFeedback;
        }
      }
    }

    if (!chosen) {
      break;
    }

    const edgeKey = `${chosen.from}->${chosen.to}`;
    const nextPass = (edgeVisitCount.get(edgeKey) ?? 0) + 1;
    edgeVisitCount.set(edgeKey, nextPass);

    rawSteps.push({ edge: chosen, passNumber: nextPass });
    currentId = chosen.to;
  }

  return rawSteps.map(({ edge, passNumber }, idx) => {
    const fromNode = nodeMap.get(edge.from)!;
    const toNode = nodeMap.get(edge.to)!;
    const fromOrder = nodeOrder.get(edge.from) ?? 0;
    const toOrder = nodeOrder.get(edge.to) ?? 0;
    const isCycleFeedback = edge.kind === "feedback" || toOrder < fromOrder;
    const isBranch =
      edge.kind === "branch" || (adj.get(edge.from)?.length ?? 0) > 1;

    return {
      stepIndex: idx,
      edge,
      fromNode,
      toNode,
      isBranch,
      isCycleFeedback,
      passNumber,
    };
  });
}

/**
 * Returns all valid, 100%-contiguous simulation paths for a LabSystem.
 * - Every system has a `"primary"` (Normal / Happy Path) flow.
 * - Systems with `"feedback"` edges also provide a `"remediation"` path (e.g., Publish Gate 1-pass auto-remediation or Codex REVIEW: CHANGES rework loop) that returns to the upstream node and then completes forward to the terminal node.
 * - Systems with `"branch"` edges also provide a `"branch"` path (e.g., Anomaly Audit fast-track or Deterministic Direct Route).
 */
export function buildSimulationPaths(system: LabSystem): SimulationPath[] {
  const hasFeedback = system.edges.some((e) => e.kind === "feedback");
  const hasBranch = system.edges.some((e) => e.kind === "branch");

  const primarySteps = traceContiguousPath(system, "primary");
  const paths: SimulationPath[] = [];

  if (hasFeedback) {
    const remediationSteps = traceContiguousPath(system, "remediation");
    paths.push({
      id: "remediation",
      label: {
        ko: "보완·재검증 포함 경로 (Remediation Flow)",
        en: "Auto-Remediation & Re-Verify Flow",
      },
      description: {
        ko: "검증 게이트에서 위반·수정 사항 감지 시 이전 단계로 피드백(1회)하여 보완한 뒤 최종 출력까지 도달하는 연속 경로",
        en: "Triggers 1 bounded feedback remediation pass upon validation gate check, then completes forward to final output",
      },
      steps: remediationSteps,
    });
  }

  paths.push({
    id: "primary",
    label: {
      ko: "정상 기본 경로 (Primary Happy Path)",
      en: "Primary Happy Path",
    },
    description: {
      ko: "입력 노드부터 최종 출력 노드까지 1차 검증을 통과하며 순차 이동하는 표준 파이프라인 경로",
      en: "Standard forward pipeline traversal from intake node to final output node",
    },
    steps: primarySteps,
  });

  if (hasBranch) {
    const branchSteps = traceContiguousPath(system, "branch");
    paths.push({
      id: "branch",
      label: {
        ko: "분기·직행 경로 (Branch / Direct Route)",
        en: "Branch / Fast-Track Route",
      },
      description: {
        ko: "특정 조건(이상치 리포트 직행 또는 정형 조문 Direct Route)에서 분기 간선을 따라 최종 출력으로 합류하는 연속 경로",
        en: "Follows conditional branch edge (Anomaly feed or Direct Statutory Route) and merges into final output",
      },
      steps: branchSteps,
    });
  }

  return paths;
}

/**
 * Builds a deterministic, cycle-safe, and strictly CONTIGUOUS sequence of SimulationSteps
 * from `system.edges` (`steps[i].toNode.id === steps[i+1].fromNode.id` for all steps).
 */
export function buildSimulationSteps(
  system: LabSystem,
  mode: SimulationPathMode = "default"
): SimulationStep[] {
  const hasFeedback = system.edges.some((e) => e.kind === "feedback");
  const hasBranch = system.edges.some((e) => e.kind === "branch");

  if (mode === "primary") {
    return traceContiguousPath(system, "primary");
  }
  if (mode === "branch") {
    return hasBranch
      ? traceContiguousPath(system, "branch")
      : traceContiguousPath(system, "primary");
  }
  if (mode === "remediation") {
    return hasFeedback
      ? traceContiguousPath(system, "remediation")
      : traceContiguousPath(system, "primary");
  }

  // "default" mode: use remediation path if feedback edge exists (so cycle is shown contiguously),
  // otherwise use the primary contiguous path.
  if (hasFeedback) {
    return traceContiguousPath(system, "remediation");
  }
  return traceContiguousPath(system, "primary");
}
