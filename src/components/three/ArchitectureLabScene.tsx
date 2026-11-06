"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  Component,
  ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import {
  LAB_SYSTEMS,
  LabSystem,
  LabNode,
} from "@/data/architecture-lab-data";
import { buildSimulationSteps, SimulationStep } from "@/lib/lab-graph";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  Maximize2,
  Minimize2,
  Box,
  Layers,
  ShieldCheck,
  AlertTriangle,
  Cpu,
  ArrowRight,
  Terminal,
  GitBranch,
} from "lucide-react";

class LabWebGLBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function CameraController({
  targetPos,
  zoomActive,
  isTabVisibleRef,
}: {
  targetPos: [number, number, number];
  zoomActive: boolean;
  isTabVisibleRef: React.MutableRefObject<boolean>;
}) {
  const { camera } = useThree();
  const desiredCamPos = useRef(new THREE.Vector3(0, 0.8, 8.8));

  useFrame(() => {
    if (!isTabVisibleRef.current) return;
    if (zoomActive) {
      desiredCamPos.current.set(
        targetPos[0] * 0.55,
        targetPos[1] * 0.55 + 0.6,
        5.8
      );
    } else {
      desiredCamPos.current.set(0, 0.7, 8.8);
    }
    camera.position.lerp(desiredCamPos.current, 0.07);
    camera.lookAt(
      zoomActive ? targetPos[0] * 0.35 : 0,
      zoomActive ? targetPos[1] * 0.35 : 0,
      0
    );
  });

  return null;
}

function PacketTraveler({
  fromPos,
  toPos,
  isCycleFeedback,
  isPlaying,
  reducedMotion,
  isTabVisibleRef,
  onArrive,
}: {
  fromPos: [number, number, number];
  toPos: [number, number, number];
  isCycleFeedback: boolean;
  isPlaying: boolean;
  reducedMotion: boolean;
  isTabVisibleRef: React.MutableRefObject<boolean>;
  onArrive: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    progressRef.current = 0;
  }, [fromPos, toPos]);

  useFrame((_, delta) => {
    if (!meshRef.current || !isTabVisibleRef.current) return;
    if (isPlaying && !reducedMotion) {
      progressRef.current += Math.min(delta, 0.05) * 0.65;
      if (progressRef.current >= 1) {
        progressRef.current = 0;
        onArrive();
      }
    }
    const t = progressRef.current;
    const x = THREE.MathUtils.lerp(fromPos[0], toPos[0], t);
    const arcLift = isCycleFeedback ? Math.sin(t * Math.PI) * 0.75 : 0;
    const y = THREE.MathUtils.lerp(fromPos[1], toPos[1], t) + arcLift;
    const z = THREE.MathUtils.lerp(fromPos[2], toPos[2], t);
    meshRef.current.position.set(x, y, z);
  });

  return (
    <mesh ref={meshRef} position={fromPos}>
      <sphereGeometry args={[0.14, 16, 16]} />
      <meshStandardMaterial
        color={isCycleFeedback ? "#AB83FF" : "#25C8BD"}
        emissive={isCycleFeedback ? "#AB83FF" : "#25C8BD"}
        emissiveIntensity={2.6}
      />
    </mesh>
  );
}

function Lab3DGraph({
  system,
  selectedNodeId,
  activeStep,
  onSelectNode,
  isPlaying,
  reducedMotion,
  zoomActive,
  isTabVisibleRef,
  onAdvanceStep,
}: {
  system: LabSystem;
  selectedNodeId: string;
  activeStep: SimulationStep;
  onSelectNode: (id: string) => void;
  isPlaying: boolean;
  reducedMotion: boolean;
  zoomActive: boolean;
  isTabVisibleRef: React.MutableRefObject<boolean>;
  onAdvanceStep: () => void;
}) {
  const nodeMap = useMemo(
    () => new Map<string, LabNode>(system.nodes.map((n) => [n.id, n])),
    [system.nodes]
  );
  const selectedNode = nodeMap.get(selectedNodeId) ?? system.nodes[0];

  return (
    <group>
      <CameraController
        targetPos={selectedNode.position}
        zoomActive={zoomActive}
        isTabVisibleRef={isTabVisibleRef}
      />

      {/* Directed Graph Edges from system.edges */}
      {system.edges.map((edge) => {
        const fromNode = nodeMap.get(edge.from);
        const toNode = nodeMap.get(edge.to);
        if (!fromNode || !toNode) return null;

        const isActiveSimEdge =
          activeStep.edge.from === edge.from && activeStep.edge.to === edge.to;
        const isConnectedToSelected =
          edge.from === selectedNodeId || edge.to === selectedNodeId;
        const isFeedback = edge.kind === "feedback";

        // For feedback/branch edges, add a subtle midpoint arc so bidirectional edges don't overlap
        const points: Array<[number, number, number]> = isFeedback
          ? [
              fromNode.position,
              [
                (fromNode.position[0] + toNode.position[0]) / 2,
                Math.max(fromNode.position[1], toNode.position[1]) + 0.9,
                (fromNode.position[2] + toNode.position[2]) / 2 + 0.3,
              ],
              toNode.position,
            ]
          : [fromNode.position, toNode.position];

        const edgeColor = isActiveSimEdge
          ? "#25C8BD"
          : isFeedback
            ? "#AB83FF"
            : isConnectedToSelected
              ? "#6FA8FF"
              : "#475569";

        return (
          <group key={`${edge.from}->${edge.to}`}>
            <Line
              points={points}
              color={edgeColor}
              lineWidth={isActiveSimEdge ? 3.0 : isConnectedToSelected ? 2.0 : 1.2}
              transparent
              opacity={isActiveSimEdge ? 0.98 : isConnectedToSelected ? 0.72 : 0.35}
            />
          </group>
        );
      })}

      {/* Animated Data Packet following actual directed graph edge */}
      <PacketTraveler
        fromPos={activeStep.fromNode.position}
        toPos={activeStep.toNode.position}
        isCycleFeedback={activeStep.isCycleFeedback}
        isPlaying={isPlaying}
        reducedMotion={reducedMotion}
        isTabVisibleRef={isTabVisibleRef}
        onArrive={onAdvanceStep}
      />

      {/* Graph Nodes */}
      {system.nodes.map((node) => {
        const isSelected = node.id === selectedNodeId;
        const isSimEndpoint =
          node.id === activeStep.fromNode.id || node.id === activeStep.toNode.id;
        return (
          <group key={node.id} position={node.position}>
            {isSelected && (
              <mesh>
                <torusGeometry args={[0.52, 0.022, 14, 42]} />
                <meshStandardMaterial
                  color="#25C8BD"
                  emissive="#25C8BD"
                  emissiveIntensity={1.9}
                />
              </mesh>
            )}
            {!isSelected && isSimEndpoint && (
              <mesh>
                <torusGeometry args={[0.44, 0.014, 12, 36]} />
                <meshStandardMaterial
                  color="#6FA8FF"
                  emissive="#6FA8FF"
                  emissiveIntensity={1.2}
                />
              </mesh>
            )}

            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode(node.id);
              }}
            >
              <dodecahedronGeometry args={[isSelected ? 0.38 : 0.3, 0]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isSelected ? 1.8 : 0.75}
                metalness={0.75}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Lab2DSvgView({
  system,
  selectedNodeId,
  activeStep,
  onSelectNode,
  locale,
}: {
  system: LabSystem;
  selectedNodeId: string;
  activeStep: SimulationStep;
  onSelectNode: (id: string) => void;
  locale: "ko" | "en";
}) {
  const count = system.nodes.length;
  const spacing = 780 / Math.max(count - 1, 1);

  const nodeCoords = useMemo(() => {
    const map = new Map<string, { cx: number; cy: number; idx: number }>();
    system.nodes.forEach((node, idx) => {
      const cx = 90 + idx * spacing;
      const cy = idx % 2 === 0 ? 95 : 175;
      map.set(node.id, { cx, cy, idx });
    });
    return map;
  }, [system.nodes, spacing]);

  return (
    <div
      data-testid="lab-2d-svg-view"
      className="flex h-full w-full flex-col justify-between overflow-x-auto p-4 sm:p-6 ops-grid-bg"
      role="region"
      aria-label={
        locale === "ko"
          ? "2D SVG 아키텍처 파이프라인 다이어그램"
          : "2D SVG Architecture Pipeline Diagram"
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#A5B0C6]">
        <span>OPS COMMAND · 2D TOPOLOGY VIEW (GRAPH-ACCURATE)</span>
        <span className="text-[#25C8BD]">
          {activeStep.fromNode.label[locale]} → {activeStep.toNode.label[locale]} (
          {activeStep.edge.label[locale]})
        </span>
      </div>

      {/* SVG Diagram rendering actual system.edges */}
      <svg
        viewBox="0 0 960 270"
        className="my-2 w-full h-auto select-none"
        role="img"
        aria-label={system.title[locale]}
      >
        <defs>
          <marker
            id="arrowCyan"
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#25C8BD" />
          </marker>
          <marker
            id="arrowViolet"
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#AB83FF" />
          </marker>
        </defs>

        {/* Directed Edges from system.edges */}
        {system.edges.map((edge) => {
          const from = nodeCoords.get(edge.from);
          const to = nodeCoords.get(edge.to);
          if (!from || !to) return null;

          const isActiveEdge =
            activeStep.edge.from === edge.from && activeStep.edge.to === edge.to;
          const isFeedback = edge.kind === "feedback" || to.idx < from.idx;
          const isSkipBranch = Math.abs(to.idx - from.idx) > 1;

          const strokeColor = isActiveEdge
            ? "#25C8BD"
            : isFeedback
              ? "#AB83FF"
              : "#6FA8FF";

          if (isFeedback || isSkipBranch) {
            const midX = (from.cx + to.cx) / 2;
            const controlY = isFeedback ? 18 : 252;
            const d = `M ${from.cx} ${from.cy} Q ${midX} ${controlY} ${to.cx} ${to.cy}`;
            return (
              <g key={`${edge.from}->${edge.to}`}>
                <path
                  d={d}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isActiveEdge ? 3 : 1.75}
                  strokeDasharray={isActiveEdge ? "none" : "6 4"}
                  markerEnd={
                    isFeedback ? "url(#arrowViolet)" : "url(#arrowCyan)"
                  }
                />
                {isActiveEdge && (
                  <circle
                    cx={midX}
                    cy={(from.cy + to.cy) / 2 + (isFeedback ? -28 : 28)}
                    r={6}
                    fill="#25C8BD"
                  />
                )}
              </g>
            );
          }

          return (
            <g key={`${edge.from}->${edge.to}`}>
              <line
                x1={from.cx}
                y1={from.cy}
                x2={to.cx}
                y2={to.cy}
                stroke={strokeColor}
                strokeWidth={isActiveEdge ? 3 : 1.75}
                strokeDasharray={isActiveEdge ? "none" : "5 4"}
                markerEnd="url(#arrowCyan)"
              />
              {isActiveEdge && (
                <circle
                  cx={(from.cx + to.cx) / 2}
                  cy={(from.cy + to.cy) / 2}
                  r={6}
                  fill="#25C8BD"
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {system.nodes.map((node) => {
          const coord = nodeCoords.get(node.id);
          if (!coord) return null;
          const { cx, cy } = coord;
          const isSelected = node.id === selectedNodeId;
          const isSimActive =
            node.id === activeStep.fromNode.id ||
            node.id === activeStep.toNode.id;

          return (
            <g
              key={node.id}
              onClick={() => onSelectNode(node.id)}
              className="cursor-pointer"
            >
              <rect
                x={cx - 68}
                y={cy - 34}
                width={136}
                height={68}
                rx={12}
                fill={isSelected ? "#182338" : "#0D1526"}
                stroke={
                  isSelected
                    ? "#25C8BD"
                    : isSimActive
                      ? "#6FA8FF"
                      : node.color
                }
                strokeWidth={isSelected ? 2.6 : isSimActive ? 2.0 : 1.3}
              />
              <text
                x={cx}
                y={cy - 10}
                textAnchor="middle"
                fill="#6FA8FF"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {node.layer}
              </text>
              <text
                x={cx}
                y={cy + 10}
                textAnchor="middle"
                fill="#F5F7FB"
                fontSize="11"
                fontWeight="bold"
              >
                {node.label[locale].slice(0, 17)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Accessible Node Button Strip */}
      <div className="flex flex-wrap gap-2">
        {system.nodes.map((n) => (
          <button
            key={n.id}
            type="button"
            aria-pressed={n.id === selectedNodeId}
            onClick={() => onSelectNode(n.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors cursor-pointer",
              n.id === selectedNodeId
                ? "border-[#25C8BD] bg-[#25C8BD]/15 text-[#F5F7FB] font-bold"
                : "border-white/10 bg-[#0B1220] text-[#A5B0C6] hover:text-white"
            )}
          >
            {n.label[locale]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureLabScene({
  initialSystemId,
}: {
  initialSystemId?: string;
}) {
  const { locale, reducedMotion } = useAppStore();
  const [systemId, setSystemId] = useState<string>(
    initialSystemId && LAB_SYSTEMS.some((s) => s.id === initialSystemId)
      ? initialSystemId
      : LAB_SYSTEMS[0].id
  );

  const system = useMemo(
    () => LAB_SYSTEMS.find((s) => s.id === systemId) ?? LAB_SYSTEMS[0],
    [systemId]
  );

  // Build verified graph simulation steps from system.edges
  const simSteps = useMemo(() => buildSimulationSteps(system), [system]);

  // Separate Node Selection State from Packet Simulation Step State
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    system.nodes[0].id
  );
  const [simStepIndex, setSimStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");
  const [zoomActive, setZoomActive] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const isTabVisibleRef = useRef<boolean>(true);
  const fullscreenBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (initialSystemId && LAB_SYSTEMS.some((s) => s.id === initialSystemId)) {
      setSystemId(initialSystemId);
    }
  }, [initialSystemId]);

  // Reset only when switching to a different system (NOT when toggling 2D/3D)
  useEffect(() => {
    setSelectedNodeId(system.nodes[0].id);
    setSimStepIndex(0);
    setZoomActive(false);
  }, [system]);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        setViewMode("2d");
      }
    } catch {
      setWebglSupported(false);
      setViewMode("2d");
    }

    const onVisibilityChange = () => {
      isTabVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  // Close fullscreen on Escape key and restore focus
  useEffect(() => {
    if (!isFullscreen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
        fullscreenBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFullscreen]);

  // Advance simulation along directed graph edges in 2D mode
  useEffect(() => {
    if (!isPlaying || reducedMotion || viewMode === "3d" || simSteps.length === 0)
      return;
    const timer = window.setInterval(() => {
      setSimStepIndex((prev) => (prev + 1) % simSteps.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [isPlaying, reducedMotion, viewMode, simSteps.length]);

  const handleAdvanceStep = () => {
    if (simSteps.length === 0) return;
    setSimStepIndex((prev) => {
      const nextIdx = (prev + 1) % simSteps.length;
      return nextIdx;
    });
  };

  const handleManualStepClick = () => {
    if (simSteps.length === 0) return;
    const nextIdx = (simStepIndex + 1) % simSteps.length;
    setSimStepIndex(nextIdx);
    setSelectedNodeId(simSteps[nextIdx].toNode.id);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setSimStepIndex(0);
    setSelectedNodeId(system.nodes[0].id);
    setZoomActive(false);
  };

  const activeStep: SimulationStep =
    simSteps[simStepIndex] ??
    simSteps[0] ?? {
      stepIndex: 0,
      edge: system.edges[0],
      fromNode: system.nodes[0],
      toNode: system.nodes[1] ?? system.nodes[0],
      isBranch: false,
      isCycleFeedback: false,
    };

  const selectedNode =
    system.nodes.find((n) => n.id === selectedNodeId) ?? system.nodes[0];
  const selectedNodeOrder =
    system.nodes.findIndex((n) => n.id === selectedNode.id) + 1;

  return (
    <div
      data-testid="architecture-lab-scene"
      className={cn(
        "flex flex-col gap-6",
        isFullscreen &&
          "fixed inset-0 z-50 overflow-y-auto bg-[#070B14] p-4 sm:p-8"
      )}
    >
      {/* Top System Selector Tabs */}
      <div className="surface-panel rounded-2xl p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-cyan)]">
              OPS COMMAND · SYSTEM ARCHITECTURE SELECTOR
            </span>
            <h2 className="mt-1 text-lg font-bold text-[var(--text-primary)]">
              {system.title[locale]}
            </h2>
          </div>

          <div
            role="tablist"
            aria-label={locale === "ko" ? "시스템 선택" : "Select system"}
            className="flex flex-wrap gap-1.5"
          >
            {LAB_SYSTEMS.map((s) => {
              const active = s.id === system.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSystemId(s.id)}
                  className={cn(
                    "rounded-xl border px-3 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer",
                    active
                      ? "border-[#6FA8FF] bg-[#6FA8FF] text-[#070B14] shadow-md"
                      : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Simulation vs Production Honesty Banner */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#25C8BD]/30 bg-[#25C8BD]/10 px-3.5 py-2 text-xs text-[var(--text-primary)]">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 shrink-0 text-[#25C8BD]" aria-hidden="true" />
            <span>{system.simulationNotice[locale]}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {system.metrics.map((m) => (
              <span
                key={m}
                className="rounded-md bg-[#070B14]/70 px-2 py-0.5 font-mono text-[11px] text-[#25C8BD]"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: 3D/2D Viewport (Left 7 cols) + Node Telemetry Inspector (Right 5 cols) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: 3D/2D Interactive Stage */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-[var(--border-subtle)] bg-[#070B14] overflow-hidden shadow-2xl">
          {/* Stage Control Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#0D1526] px-4 py-3">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                data-testid="lab-play-pause-btn"
                onClick={() => setIsPlaying((p) => !p)}
                aria-label={
                  isPlaying
                    ? locale === "ko"
                      ? "데이터 흐름 일시정지"
                      : "Pause data flow"
                    : locale === "ko"
                      ? "데이터 흐름 재생"
                      : "Play data flow"
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#6FA8FF] px-3 py-1.5 font-mono text-xs font-bold text-[#070B14] hover:bg-[#84b5ff] cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-3.5 w-3.5" />
                    <span>{locale === "ko" ? "일시정지" : "Pause"}</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" />
                    <span>{locale === "ko" ? "흐름 재생" : "Simulate"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                data-testid="lab-step-btn"
                onClick={handleManualStepClick}
                aria-label={locale === "ko" ? "다음 연결 단계로 이동" : "Next edge step"}
                className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 font-mono text-xs text-[#F5F7FB] hover:bg-white/10 cursor-pointer"
              >
                <StepForward className="h-3.5 w-3.5" />
                <span>{locale === "ko" ? "다음 단계" : "Step"}</span>
              </button>

              <button
                type="button"
                data-testid="lab-reset-btn"
                onClick={handleReset}
                aria-label={locale === "ko" ? "시뮬레이션 초기화" : "Reset simulation"}
                className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 font-mono text-xs text-[#A5B0C6] hover:text-white cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{locale === "ko" ? "초기화" : "Reset"}</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {viewMode === "3d" && (
                <button
                  type="button"
                  data-testid="lab-focus-btn"
                  onClick={() => setZoomActive((z) => !z)}
                  className={cn(
                    "rounded-lg border px-2.5 py-1.5 font-mono text-xs transition-colors cursor-pointer",
                    zoomActive
                      ? "border-[#25C8BD] bg-[#25C8BD]/20 text-[#25C8BD]"
                      : "border-white/15 bg-white/5 text-[#A5B0C6] hover:text-white"
                  )}
                >
                  {zoomActive
                    ? locale === "ko"
                      ? "카메라: 노드 확대"
                      : "Cam: Node Focus"
                    : locale === "ko"
                      ? "카메라: 전체 보기"
                      : "Cam: Overview"}
                </button>
              )}

              <button
                type="button"
                data-testid="lab-viewmode-btn"
                onClick={() => setViewMode((m) => (m === "3d" ? "2d" : "3d"))}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#AB83FF]/50 bg-[#AB83FF]/15 px-3 py-1.5 font-mono text-xs font-semibold text-[#AB83FF] hover:bg-[#AB83FF]/25 cursor-pointer"
              >
                {viewMode === "3d" ? (
                  <>
                    <Layers className="h-3.5 w-3.5" />
                    <span>
                      {locale === "ko" ? "2D 다이어그램 전환" : "Switch to 2D SVG"}
                    </span>
                  </>
                ) : (
                  <>
                    <Box className="h-3.5 w-3.5" />
                    <span>
                      {locale === "ko" ? "3D WebGL 전환" : "Switch to 3D WebGL"}
                    </span>
                  </>
                )}
              </button>

              <button
                ref={fullscreenBtnRef}
                type="button"
                data-testid="lab-fullscreen-btn"
                onClick={() => setIsFullscreen((f) => !f)}
                aria-label={
                  locale === "ko" ? "전체 화면 전환" : "Toggle fullscreen"
                }
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[#F5F7FB] hover:bg-white/10 cursor-pointer"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* 3D Canvas or 2D SVG Stage */}
          <div className="relative h-[420px] sm:h-[480px] w-full">
            {viewMode === "2d" || !webglSupported ? (
              <Lab2DSvgView
                system={system}
                selectedNodeId={selectedNode.id}
                activeStep={activeStep}
                onSelectNode={(id) => {
                  setSelectedNodeId(id);
                }}
                locale={locale}
              />
            ) : (
              <LabWebGLBoundary
                fallback={
                  <Lab2DSvgView
                    system={system}
                    selectedNodeId={selectedNode.id}
                    activeStep={activeStep}
                    onSelectNode={setSelectedNodeId}
                    locale={locale}
                  />
                }
              >
                <Canvas
                  dpr={[1, 1.5]}
                  camera={{ position: [0, 0.7, 8.8], fov: 45 }}
                  gl={{ antialias: true, powerPreference: "high-performance" }}
                >
                  <ambientLight intensity={0.85} />
                  <directionalLight position={[5, 8, 5]} intensity={1.4} />
                  <pointLight
                    position={[-5, 3, 4]}
                    intensity={2.0}
                    color="#6FA8FF"
                  />
                  <pointLight
                    position={[5, -3, 4]}
                    intensity={1.8}
                    color="#AB83FF"
                  />

                  <Lab3DGraph
                    system={system}
                    selectedNodeId={selectedNode.id}
                    activeStep={activeStep}
                    onSelectNode={(id) => {
                      setSelectedNodeId(id);
                      setZoomActive(true);
                    }}
                    isPlaying={isPlaying}
                    reducedMotion={reducedMotion}
                    zoomActive={zoomActive}
                    isTabVisibleRef={isTabVisibleRef}
                    onAdvanceStep={handleAdvanceStep}
                  />

                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    rotateSpeed={0.55}
                  />
                </Canvas>
                {/* 3D Stage Active Node & Edge Transition HUD Overlay */}
                <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#070B14]/90 px-3.5 py-2 backdrop-blur-md">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#25C8BD]" />
                    <span className="font-bold text-[#F5F7FB]">
                      {selectedNode.label[locale]}
                    </span>
                    <span className="text-[#6FA8FF]">
                      [{selectedNodeOrder}/{system.nodes.length}] ·{" "}
                      {selectedNode.layer}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#25C8BD]">
                    <GitBranch className="h-3.5 w-3.5" />
                    <span data-testid="lab-active-edge-hud">
                      EDGE [{simStepIndex + 1}/{simSteps.length}]:{" "}
                      {activeStep.edge.label[locale]}
                    </span>
                  </div>
                </div>
              </LabWebGLBoundary>
            )}
          </div>

          {/* Bottom Node Selection & Edge Simulation Strip */}
          <div className="border-t border-white/10 bg-[#0B1220] px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#A5B0C6] mb-2">
              <span data-testid="lab-sim-step-indicator">
                {locale === "ko" ? "패킷 이동 경로:" : "Packet Flow Edge:"}{" "}
                <strong className="text-[#25C8BD]">
                  EDGE {simStepIndex + 1} / {simSteps.length}
                </strong>{" "}
                ({activeStep.fromNode.label[locale]} →{" "}
                {activeStep.toNode.label[locale]})
              </span>
              <span data-testid="lab-selected-node-indicator">
                {locale === "ko" ? "선택된 노드:" : "Selected Node:"}{" "}
                <strong className="text-[#6FA8FF]">
                  {selectedNode.label[locale]} ({selectedNode.layer})
                </strong>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-6">
              {system.nodes.map((node, idx) => {
                const active = node.id === selectedNode.id;
                const isPacketTarget = node.id === activeStep.toNode.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    data-testid={`lab-node-btn-${node.id}`}
                    aria-pressed={active}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={cn(
                      "rounded-lg border px-2 py-1.5 text-left font-mono text-[11px] transition-all cursor-pointer truncate",
                      active
                        ? "border-[#25C8BD] bg-[#25C8BD]/15 text-[#F5F7FB] font-bold"
                        : isPacketTarget
                          ? "border-[#6FA8FF]/50 bg-[#6FA8FF]/10 text-[#D4DCEB]"
                          : "border-white/10 bg-white/5 text-[#A5B0C6] hover:text-white"
                    )}
                  >
                    {idx + 1}. {node.label[locale].replace(/^\d+\.\s*/, "")}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Node Telemetry & Verification Inspector */}
        <div
          data-testid="lab-node-inspector"
          className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6 shadow-xl"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#6FA8FF]/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--accent-blue)]">
                  NODE LAYER · {selectedNode.layer}
                </span>
                <h3
                  data-testid="lab-inspector-title"
                  className="mt-2 text-xl font-bold text-[var(--text-primary)]"
                >
                  {selectedNode.label[locale]}
                </h3>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                NODE {selectedNodeOrder} OF {system.nodes.length}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {selectedNode.role[locale]}
            </p>

            {/* Input / Output Specs */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-3">
                <div className="font-mono text-[11px] font-semibold text-[var(--accent-blue)]">
                  {locale === "ko" ? "입력값 (INPUT)" : "INPUT SPEC"}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-primary)]">
                  {selectedNode.inputSpec[locale]}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-3">
                <div className="font-mono text-[11px] font-semibold text-[var(--accent-cyan)]">
                  {locale === "ko" ? "출력값 (OUTPUT)" : "OUTPUT SPEC"}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-primary)]">
                  {selectedNode.outputSpec[locale]}
                </p>
              </div>
            </div>

            {/* Processing Steps */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {locale === "ko" ? "세부 처리 단계 (PROCESSING STEPS)" : "PROCESSING STEPS"}
              </h4>
              <ul className="mt-2 space-y-1.5">
                {selectedNode.steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
                  >
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-blue)]" />
                    <span>{step[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Error Handling & Verification */}
            <div className="space-y-2.5">
              <div className="rounded-xl border border-[#F2B84B]/30 bg-[#F2B84B]/10 p-3">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#F2B84B]">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>
                    {locale === "ko"
                      ? "오류 처리 & 가드레일 (ERROR HANDLING)"
                      : "ERROR HANDLING & GUARDRAILS"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--text-primary)]">
                  {selectedNode.errorHandling[locale]}
                </p>
              </div>

              <div className="rounded-xl border border-[#2EC27E]/30 bg-[#2EC27E]/10 p-3">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#2EC27E]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>
                    {locale === "ko"
                      ? "실제 검증 방법 (VERIFICATION)"
                      : "VERIFICATION & TEST EVIDENCE"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--text-primary)]">
                  {selectedNode.verification[locale]}
                </p>
              </div>
            </div>

            {/* Sample Payload Telemetry */}
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[var(--text-muted)]">
                <Terminal className="h-3.5 w-3.5 text-[var(--accent-cyan)]" />
                <span>
                  {locale === "ko"
                    ? "샘플 상태 페이로드 (TELEMETRY PAYLOAD)"
                    : "SAMPLE TELEMETRY PAYLOAD"}
                </span>
              </div>
              <pre className="mt-1.5 overflow-x-auto rounded-xl border border-white/10 bg-[#070B14] p-3 font-mono text-[11px] text-[#25C8BD]">
                <code>{selectedNode.samplePayload}</code>
              </pre>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="mt-5 border-t border-[var(--border-subtle)] pt-4">
            <div className="flex flex-wrap gap-1.5">
              {selectedNode.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
