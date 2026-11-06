"use client";

import React, {
  useState,
  useEffect,
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
}: {
  targetPos: [number, number, number];
  zoomActive: boolean;
}) {
  const { camera } = useThree();
  const desiredCamPos = useRef(new THREE.Vector3(0, 0.8, 8.8));

  useFrame(() => {
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
  isPlaying,
  reducedMotion,
  onArrive,
}: {
  fromPos: [number, number, number];
  toPos: [number, number, number];
  isPlaying: boolean;
  reducedMotion: boolean;
  onArrive: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    progressRef.current = 0;
  }, [fromPos, toPos]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (isPlaying && !reducedMotion) {
      progressRef.current += Math.min(delta, 0.05) * 0.65;
      if (progressRef.current >= 1) {
        progressRef.current = 0;
        onArrive();
      }
    }
    const t = progressRef.current;
    const x = THREE.MathUtils.lerp(fromPos[0], toPos[0], t);
    const y = THREE.MathUtils.lerp(fromPos[1], toPos[1], t);
    const z = THREE.MathUtils.lerp(fromPos[2], toPos[2], t);
    meshRef.current.position.set(x, y, z);
  });

  return (
    <mesh ref={meshRef} position={fromPos}>
      <sphereGeometry args={[0.14, 16, 16]} />
      <meshStandardMaterial
        color="#25C8BD"
        emissive="#25C8BD"
        emissiveIntensity={2.6}
      />
    </mesh>
  );
}

function Lab3DGraph({
  system,
  selectedNodeId,
  onSelectNode,
  isPlaying,
  reducedMotion,
  zoomActive,
  onAdvanceStep,
  locale,
}: {
  system: LabSystem;
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
  isPlaying: boolean;
  reducedMotion: boolean;
  zoomActive: boolean;
  onAdvanceStep: () => void;
  locale: "ko" | "en";
}) {
  const nodeMap = new Map<string, LabNode>(
    system.nodes.map((n) => [n.id, n])
  );
  const selectedNode =
    nodeMap.get(selectedNodeId) ?? system.nodes[0];

  const currentIdx = system.nodes.findIndex((n) => n.id === selectedNodeId);
  const nextNode =
    system.nodes[(currentIdx + 1) % system.nodes.length] ?? system.nodes[0];

  return (
    <group>
      <CameraController
        targetPos={selectedNode.position}
        zoomActive={zoomActive}
      />

      {/* Edges */}
      {system.edges.map((edge) => {
        const fromNode = nodeMap.get(edge.from);
        const toNode = nodeMap.get(edge.to);
        if (!fromNode || !toNode) return null;
        const isHighlighted =
          edge.from === selectedNodeId || edge.to === selectedNodeId;
        return (
          <group key={`${edge.from}->${edge.to}`}>
            <Line
              points={[fromNode.position, toNode.position]}
              color={isHighlighted ? "#25C8BD" : "#6FA8FF"}
              lineWidth={isHighlighted ? 2.8 : 1.2}
              transparent
              opacity={isHighlighted ? 0.95 : 0.35}
            />
          </group>
        );
      })}

      {/* Animated Data Packet */}
      {system.nodes.length > 1 && (
        <PacketTraveler
          fromPos={selectedNode.position}
          toPos={nextNode.position}
          isPlaying={isPlaying}
          reducedMotion={reducedMotion}
          onArrive={onAdvanceStep}
        />
      )}

      {/* Nodes */}
      {system.nodes.map((node, idx) => {
        const isSelected = node.id === selectedNodeId;
        return (
          <group key={node.id} position={node.position}>
            {/* Outer Halo when selected */}
            {isSelected && (
              <mesh>
                <torusGeometry args={[0.52, 0.02, 16, 48]} />
                <meshStandardMaterial
                  color="#25C8BD"
                  emissive="#25C8BD"
                  emissiveIntensity={1.8}
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
  onSelectNode,
  locale,
}: {
  system: LabSystem;
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
  locale: "ko" | "en";
}) {
  return (
    <div
      className="flex h-full w-full flex-col justify-between overflow-x-auto p-4 sm:p-6 ops-grid-bg"
      role="region"
      aria-label={
        locale === "ko"
          ? "2D SVG 아키텍처 파이프라인 다이어그램"
          : "2D SVG Architecture Pipeline Diagram"
      }
    >
      <div className="flex items-center justify-between text-xs font-mono text-[#A5B0C6]">
        <span>OPS COMMAND · 2D TOPOLOGY VIEW (WCAG AA ACCESSIBLE)</span>
        <span>
          {locale === "ko"
            ? "노드를 클릭해 상세 입출력·검증 명세를 확인하세요"
            : "Click any node to inspect I/O & verification telemetry"}
        </span>
      </div>

      {/* SVG Diagram */}
      <svg
        viewBox="0 0 960 260"
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
        </defs>

        {system.nodes.map((node, idx) => {
          const count = system.nodes.length;
          const spacing = 780 / Math.max(count - 1, 1);
          const cx = 90 + idx * spacing;
          const cy = idx % 2 === 0 ? 90 : 170;
          const nextIdx = idx + 1;
          const nextCx = 90 + nextIdx * spacing;
          const nextCy = nextIdx % 2 === 0 ? 90 : 170;
          const isSelected = node.id === selectedNodeId;

          return (
            <g key={node.id}>
              {idx < count - 1 && (
                <line
                  x1={cx}
                  y1={cy}
                  x2={nextCx}
                  y2={nextCy}
                  stroke={isSelected ? "#25C8BD" : "#6FA8FF"}
                  strokeWidth={isSelected ? 3 : 1.75}
                  strokeDasharray={isSelected ? "none" : "5 4"}
                  markerEnd="url(#arrowCyan)"
                />
              )}

              <g
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
                  stroke={isSelected ? "#25C8BD" : node.color}
                  strokeWidth={isSelected ? 2.5 : 1.4}
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
            </g>
          );
        })}
      </svg>

      {/* Accessible Button Strip */}
      <div className="flex flex-wrap gap-2">
        {system.nodes.map((n) => (
          <button
            key={n.id}
            type="button"
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

  const system =
    LAB_SYSTEMS.find((s) => s.id === systemId) ?? LAB_SYSTEMS[0];

  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    system.nodes[0].id
  );
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [zoomActive, setZoomActive] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  useEffect(() => {
    if (
      initialSystemId &&
      LAB_SYSTEMS.some((s) => s.id === initialSystemId)
    ) {
      setSystemId(initialSystemId);
    }
  }, [initialSystemId]);

  useEffect(() => {
    setSelectedNodeId(system.nodes[0].id);
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
  }, []);

  // Also advance steps on interval when in 2D mode or when reducedMotion is off
  useEffect(() => {
    if (!isPlaying || reducedMotion || viewMode === "3d") return;
    const timer = window.setInterval(() => {
      setSelectedNodeId((prev) => {
        const idx = system.nodes.findIndex((n) => n.id === prev);
        const next = system.nodes[(idx + 1) % system.nodes.length];
        return next ? next.id : system.nodes[0].id;
      });
    }, 2600);
    return () => window.clearInterval(timer);
  }, [isPlaying, reducedMotion, viewMode, system]);

  const handleAdvanceStep = () => {
    setSelectedNodeId((prev) => {
      const idx = system.nodes.findIndex((n) => n.id === prev);
      const next = system.nodes[(idx + 1) % system.nodes.length];
      return next ? next.id : system.nodes[0].id;
    });
  };

  const handleReset = () => {
    setIsPlaying(false);
    setSelectedNodeId(system.nodes[0].id);
    setZoomActive(false);
  };

  const selectedNode =
    system.nodes.find((n) => n.id === selectedNodeId) ?? system.nodes[0];
  const selectedStepIndex =
    system.nodes.findIndex((n) => n.id === selectedNode.id) + 1;

  return (
    <div
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
                onClick={handleAdvanceStep}
                aria-label={locale === "ko" ? "다음 노드로 이동" : "Next node step"}
                className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 font-mono text-xs text-[#F5F7FB] hover:bg-white/10 cursor-pointer"
              >
                <StepForward className="h-3.5 w-3.5" />
                <span>{locale === "ko" ? "다음 단계" : "Step"}</span>
              </button>

              <button
                type="button"
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
                onClick={() =>
                  setViewMode((m) => (m === "3d" ? "2d" : "3d"))
                }
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#AB83FF]/50 bg-[#AB83FF]/15 px-3 py-1.5 font-mono text-xs font-semibold text-[#AB83FF] hover:bg-[#AB83FF]/25 cursor-pointer"
              >
                {viewMode === "3d" ? (
                  <>
                    <Layers className="h-3.5 w-3.5" />
                    <span>{locale === "ko" ? "2D 다이어그램 전환" : "Switch to 2D SVG"}</span>
                  </>
                ) : (
                  <>
                    <Box className="h-3.5 w-3.5" />
                    <span>{locale === "ko" ? "3D WebGL 전환" : "Switch to 3D WebGL"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
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
                onSelectNode={(id) => {
                  setSelectedNodeId(id);
                  setZoomActive(true);
                }}
                locale={locale}
              />
            ) : (
              <LabWebGLBoundary
                fallback={
                  <Lab2DSvgView
                    system={system}
                    selectedNodeId={selectedNode.id}
                    onSelectNode={setSelectedNodeId}
                    locale={locale}
                  />
                }
              >
                <Canvas
                  dpr={[1, 1.75]}
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
                    onSelectNode={(id) => {
                      setSelectedNodeId(id);
                      setZoomActive(true);
                    }}
                    isPlaying={isPlaying}
                    reducedMotion={reducedMotion}
                    zoomActive={zoomActive}
                    onAdvanceStep={handleAdvanceStep}
                    locale={locale}
                  />

                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    rotateSpeed={0.55}
                  />
                </Canvas>
                {/* 3D Stage Active Node HUD Overlay */}
                <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#070B14]/90 px-3.5 py-2 backdrop-blur-md">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#25C8BD]" />
                    <span className="font-bold text-[#F5F7FB]">
                      {selectedNode.label[locale]}
                    </span>
                    <span className="text-[#6FA8FF]">
                      [{selectedStepIndex}/{system.nodes.length}] · {selectedNode.layer}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#A5B0C6]">
                    {locale === "ko"
                      ? "3D 노드를 클릭하거나 아래 단계 버튼을 선택하세요"
                      : "Click a 3D node or select a pipeline step below"}
                  </span>
                </div>
              </LabWebGLBoundary>
            )}
          </div>

          {/* Bottom Step Progress Strip */}
          <div className="border-t border-white/10 bg-[#0B1220] px-4 py-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#A5B0C6] mb-2">
              <span>
                {locale === "ko" ? "파이프라인 단계 진행:" : "Pipeline Stage:"}{" "}
                <strong className="text-[#25C8BD]">
                  STEP {selectedStepIndex} / {system.nodes.length}
                </strong>
              </span>
              <span>{selectedNode.layer}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-6">
              {system.nodes.map((node, idx) => {
                const active = node.id === selectedNode.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => {
                      setSelectedNodeId(node.id);
                      setZoomActive(true);
                    }}
                    className={cn(
                      "rounded-lg border px-2.5 py-1.5 text-left font-mono text-[11px] transition-all cursor-pointer",
                      active
                        ? "border-[#25C8BD] bg-[#25C8BD]/15 text-[#F5F7FB] font-bold"
                        : "border-white/10 bg-white/5 text-[#A5B0C6] hover:border-white/30 hover:text-white"
                    )}
                  >
                    <div className="truncate">
                      {idx + 1}. {node.label[locale].replace(/^\d+\.\s*/, "")}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Node Telemetry Inspector Panel */}
        <div
          className="lg:col-span-5 surface-panel flex flex-col justify-between rounded-2xl p-5 sm:p-6"
          aria-live="polite"
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-md bg-[#6FA8FF]/15 px-2.5 py-1 font-mono text-xs font-bold text-[var(--accent-blue)] border border-[#6FA8FF]/30">
                NODE LAYER · {selectedNode.layer}
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                STEP {selectedStepIndex} OF {system.nodes.length}
              </span>
            </div>

            <h3 className="mt-3 text-xl font-bold text-[var(--text-primary)]">
              {selectedNode.label[locale]}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {selectedNode.role[locale]}
            </p>

            {/* Input / Output Spec */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-[var(--bg-elevated)] p-3 border border-[var(--border-subtle)]">
                <span className="font-mono text-[11px] font-bold uppercase text-[var(--accent-blue)]">
                  {locale === "ko" ? "입력값 (INPUT)" : "INPUT SPEC"}
                </span>
                <p className="mt-1 text-xs text-[var(--text-primary)]">
                  {selectedNode.inputSpec[locale]}
                </p>
              </div>
              <div className="rounded-xl bg-[var(--bg-elevated)] p-3 border border-[var(--border-subtle)]">
                <span className="font-mono text-[11px] font-bold uppercase text-[var(--accent-cyan)]">
                  {locale === "ko" ? "출력값 (OUTPUT)" : "OUTPUT SPEC"}
                </span>
                <p className="mt-1 text-xs text-[var(--text-primary)]">
                  {selectedNode.outputSpec[locale]}
                </p>
              </div>
            </div>

            {/* Processing Steps */}
            <div className="mt-4">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {locale === "ko" ? "세부 처리 단계 (Processing Steps)" : "Processing Steps"}
              </h4>
              <ul className="mt-2 space-y-1.5 text-xs text-[var(--text-secondary)]">
                {selectedNode.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-blue)]" />
                    <span>{step[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Error Handling & Verification */}
            <div className="mt-4 space-y-2.5">
              <div className="flex items-start gap-2.5 rounded-xl bg-[var(--bg-elevated)] p-3 text-xs">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <div>
                  <strong className="font-semibold text-[var(--text-primary)]">
                    {locale === "ko" ? "오류 처리 & 가드레일: " : "Error Handling & Guardrail: "}
                  </strong>
                  <span className="text-[var(--text-secondary)]">
                    {selectedNode.errorHandling[locale]}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl bg-[var(--bg-elevated)] p-3 text-xs">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-cyan)]" />
                <div>
                  <strong className="font-semibold text-[var(--text-primary)]">
                    {locale === "ko" ? "실제 검증 방법: " : "Verification Method: "}
                  </strong>
                  <span className="text-[var(--text-secondary)]">
                    {selectedNode.verification[locale]}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Tech Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {selectedNode.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[11px] text-[var(--accent-blue)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Sample Telemetry Payload */}
          <div className="mt-5 rounded-xl border border-white/10 bg-[#070B14] p-3.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#25C8BD]">
              <span className="inline-flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5" />
                <span>SIMULATION TELEMETRY PAYLOAD</span>
              </span>
              <span className="text-[#A5B0C6]">READ-ONLY</span>
            </div>
            <pre className="mt-2 overflow-x-auto font-mono text-xs leading-relaxed text-[#F5F7FB]">
              <code>{selectedNode.samplePayload}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
