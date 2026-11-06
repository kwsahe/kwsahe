import { LabSystem, LabNode, LabEdge } from "@/data/architecture-lab-data";

export interface SimulationStep {
  stepIndex: number;
  edge: LabEdge;
  fromNode: LabNode;
  toNode: LabNode;
  isBranch: boolean;
  isCycleFeedback: boolean;
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
    valid: errors.length === 0 && system.nodes.length >= 2 && system.edges.length >= 1,
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
 * Builds a deterministic, cycle-safe sequence of SimulationSteps purely from `system.edges`.
 *
 * Branching & Cycle Policy:
 * 1. Traversal starts at the graph's entry node (`nodes[0]`) and follows directed `system.edges`.
 * 2. When a node has multiple outgoing edges:
 *    - If an unvisited `"feedback"` edge exists (e.g., auto-remediation or review rework loop),
 *      it is traversed at most ONCE so the simulation demonstrates the feedback loop without infinite cycling,
 *      and subsequent visits to the node take the `"primary"` forward edge.
 *    - If an unvisited `"branch"` edge exists alongside a `"primary"` edge, the primary path is completed
 *      and any remaining unvisited reachable edges are appended in topological order so 100% of valid
 *      connected edges can be stepped through.
 * 3. Disconnected/invalid edges are excluded.
 */
export function buildSimulationSteps(system: LabSystem): SimulationStep[] {
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

  const validEdges: LabEdge[] = [];
  for (const edge of system.edges) {
    if (
      nodeMap.has(edge.from) &&
      nodeMap.has(edge.to) &&
      edge.from !== edge.to
    ) {
      adj.get(edge.from)!.push(edge);
      validEdges.push(edge);
    }
  }

  if (system.nodes.length < 2 || validEdges.length === 0) {
    return [];
  }

  const usedEdges = new Set<string>();
  const rawTransitions: LabEdge[] = [];
  const maxSteps = validEdges.length * 2 + 4;

  let currentId = system.nodes[0].id;
  let guard = 0;

  while (guard < maxSteps) {
    guard++;
    const outgoing = adj.get(currentId) ?? [];
    const unusedOutgoing = outgoing.filter(
      (e) => !usedEdges.has(`${e.from}->${e.to}`)
    );

    if (unusedOutgoing.length === 0) {
      break;
    }

    // Policy: If there is an unused feedback edge from this node, take it once first
    // so the cycle returns to this node and then proceeds along the primary edge.
    const feedbackEdge = unusedOutgoing.find((e) => e.kind === "feedback");
    const primaryEdge = unusedOutgoing.find(
      (e) => !e.kind || e.kind === "primary"
    );
    const branchEdge = unusedOutgoing.find((e) => e.kind === "branch");

    let chosen: LabEdge;
    if (feedbackEdge) {
      chosen = feedbackEdge;
    } else if (primaryEdge) {
      chosen = primaryEdge;
    } else {
      chosen = branchEdge ?? unusedOutgoing[0];
    }

    const edgeKey = `${chosen.from}->${chosen.to}`;
    usedEdges.add(edgeKey);
    rawTransitions.push(chosen);
    currentId = chosen.to;
  }

  // Append any remaining valid parallel branch edges (e.g., secondary branch out of an earlier node)
  for (const edge of validEdges) {
    const edgeKey = `${edge.from}->${edge.to}`;
    if (!usedEdges.has(edgeKey)) {
      usedEdges.add(edgeKey);
      rawTransitions.push(edge);
    }
  }

  return rawTransitions.map((edge, idx) => {
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
    };
  });
}
