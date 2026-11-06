"use client";

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  Component,
  ReactNode,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore } from "@/store/useAppStore";

interface SatelliteSpec {
  id: string;
  label: string;
  metric: string;
  orbitRadius: number;
  speed: number;
  phase: number;
  tiltX: number;
  tiltZ: number;
  color: string;
}

const SATELLITES: SatelliteSpec[] = [
  {
    id: "jarvis",
    label: "JARVIS OFFICE",
    metric: "19 Agents · Publish Gate",
    orbitRadius: 2.35,
    speed: 0.38,
    phase: 0,
    tiltX: 0.35,
    tiltZ: 0.15,
    color: "#6FA8FF",
  },
  {
    id: "aihub",
    label: "LINK21 AI HUB",
    metric: "Live · 515 Vitest",
    orbitRadius: 2.55,
    speed: -0.31,
    phase: 1.1,
    tiltX: -0.42,
    tiltZ: 0.28,
    color: "#25C8BD",
  },
  {
    id: "bidpilot",
    label: "BidPilot AI",
    metric: "188/191 · 2,659 Tests",
    orbitRadius: 2.2,
    speed: 0.29,
    phase: 2.2,
    tiltX: 0.22,
    tiltZ: -0.45,
    color: "#AB83FF",
  },
  {
    id: "triagent",
    label: "tri-agent-control",
    metric: "3-CLI · 384 Tests",
    orbitRadius: 2.65,
    speed: -0.26,
    phase: 3.3,
    tiltX: 0.52,
    tiltZ: 0.12,
    color: "#6FA8FF",
  },
  {
    id: "marketpulse",
    label: "Market Pulse",
    metric: "57.6k Rows · R² 0.78",
    orbitRadius: 2.4,
    speed: 0.34,
    phase: 4.4,
    tiltX: -0.28,
    tiltZ: -0.32,
    color: "#25C8BD",
  },
  {
    id: "ksafety",
    label: "k-safety-law-rag",
    metric: "Dual RAG · 90.0 Eval",
    orbitRadius: 2.5,
    speed: -0.24,
    phase: 5.3,
    tiltX: -0.18,
    tiltZ: 0.48,
    color: "#AB83FF",
  },
];

function computeSatellitePosition(
  sat: SatelliteSpec,
  t: number
): [number, number, number] {
  const angle = sat.phase + t * sat.speed;
  const x0 = Math.cos(angle) * sat.orbitRadius;
  const z0 = Math.sin(angle) * sat.orbitRadius;
  const y =
    Math.sin(angle * 1.3) * Math.sin(sat.tiltX) * 1.15 +
    Math.cos(angle) * Math.sin(sat.tiltZ) * 0.65;
  return [x0, y, z0];
}

function CoreAssembly({
  reducedMotion,
  scrollRatio,
  activeSat,
  setActiveSat,
}: {
  reducedMotion: boolean;
  scrollRatio: number;
  activeSat: string | null;
  setActiveSat: (id: string | null) => void;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const latticeRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const clockRef = useRef(0);
  const [satPositions, setSatPositions] = useState<Array<[number, number, number]>>(() =>
    SATELLITES.map((s) => computeSatellitePosition(s, 0))
  );

  // Subtle particle positions
  const particlePositions = useMemo(() => {
    const count = 140;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.8 + (i % 7) * 0.28;
      const theta = (i * 2.39996) % (Math.PI * 2);
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.05);

    if (!reducedMotion) {
      clockRef.current += clampedDelta;
      if (latticeRef.current) {
        latticeRef.current.rotation.y += clampedDelta * 0.28;
        latticeRef.current.rotation.x += clampedDelta * 0.12;
      }
      if (innerCoreRef.current) {
        const pulse = 1 + Math.sin(clockRef.current * 2.2) * 0.045;
        innerCoreRef.current.scale.setScalar(pulse);
      }
      if (ring1Ref.current) {
        ring1Ref.current.rotation.z += clampedDelta * 0.32;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.x -= clampedDelta * 0.24;
      }
      if (ring3Ref.current) {
        ring3Ref.current.rotation.y += clampedDelta * 0.19;
      }
    }

    if (rootRef.current) {
      const targetRotX = scrollRatio * 0.45 + state.pointer.y * 0.18;
      const targetRotY = state.pointer.x * 0.28;
      rootRef.current.rotation.x = THREE.MathUtils.lerp(
        rootRef.current.rotation.x,
        targetRotX,
        0.08
      );
      rootRef.current.rotation.y = THREE.MathUtils.lerp(
        rootRef.current.rotation.y,
        targetRotY,
        0.08
      );
    }

    // Update satellite positions every few frames or smoothly
    if (!reducedMotion) {
      const next = SATELLITES.map((s) =>
        computeSatellitePosition(s, clockRef.current)
      );
      setSatPositions(next);
    }
  });

  return (
    <group ref={rootRef}>
      {/* Central Glowing Inner Sphere */}
      <mesh ref={innerCoreRef}>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshStandardMaterial
          color="#6FA8FF"
          emissive="#4378FF"
          emissiveIntensity={1.65}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {/* Inner Dark Metallic Polyhedron */}
      <mesh>
        <icosahedronGeometry args={[0.98, 1]} />
        <meshStandardMaterial
          color="#121A2B"
          emissive="#182338"
          emissiveIntensity={0.4}
          metalness={0.88}
          roughness={0.22}
          transparent
          opacity={0.78}
        />
      </mesh>

      {/* Outer Metallic Wireframe Lattice Core */}
      <mesh ref={latticeRef}>
        <icosahedronGeometry args={[1.28, 2]} />
        <meshStandardMaterial
          color="#6FA8FF"
          emissive="#6FA8FF"
          emissiveIntensity={0.55}
          metalness={0.92}
          roughness={0.15}
          wireframe
        />
      </mesh>

      {/* Orbital Ring 1 — Electric Blue */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2.6, 0.25, 0]}>
        <torusGeometry args={[1.85, 0.016, 16, 96]} />
        <meshStandardMaterial
          color="#6FA8FF"
          emissive="#6FA8FF"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Orbital Ring 2 — Violet */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3.1, -0.45, 0.3]}>
        <torusGeometry args={[2.18, 0.014, 16, 96]} />
        <meshStandardMaterial
          color="#AB83FF"
          emissive="#AB83FF"
          emissiveIntensity={0.75}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Orbital Ring 3 — Telemetry Cyan */}
      <mesh ref={ring3Ref} rotation={[0.42, Math.PI / 4, -0.5]}>
        <torusGeometry args={[2.52, 0.012, 16, 96]} />
        <meshStandardMaterial
          color="#25C8BD"
          emissive="#25C8BD"
          emissiveIntensity={0.7}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Orbiting Data Nodes & Energy Beams */}
      {SATELLITES.map((sat, idx) => {
        const pos = satPositions[idx] ?? [sat.orbitRadius, 0, 0];
        const isSelected = activeSat === sat.id;
        return (
          <group key={sat.id}>
            <Line
              points={[[0, 0, 0], pos]}
              color={sat.color}
              lineWidth={isSelected ? 2.2 : 1.0}
              transparent
              opacity={isSelected ? 0.85 : 0.32}
            />
            <group position={pos}>
              {isSelected && (
                <mesh>
                  <torusGeometry args={[0.24, 0.015, 16, 40]} />
                  <meshStandardMaterial
                    color="#25C8BD"
                    emissive="#25C8BD"
                    emissiveIntensity={2.0}
                  />
                </mesh>
              )}
              <mesh
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSat(isSelected ? null : sat.id);
                }}
                onPointerOver={() => setActiveSat(sat.id)}
              >
                <sphereGeometry args={[isSelected ? 0.14 : 0.1, 20, 20]} />
                <meshStandardMaterial
                  color={sat.color}
                  emissive={sat.color}
                  emissiveIntensity={isSelected ? 2.2 : 1.3}
                />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* Restrained Particle Field */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#6FA8FF"
          size={0.032}
          transparent
          opacity={0.55}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

class WebGLErrorBoundary extends Component<
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

function StaticCoreFallback({ locale }: { locale: "ko" | "en" }) {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[#070B14] p-6"
      role="img"
      aria-label={
        locale === "ko"
          ? "NEXUS CORE AI 네트워크 다이어그램"
          : "NEXUS CORE AI Network Diagram"
      }
    >
      <svg
        viewBox="0 0 400 400"
        className="h-64 w-64 sm:h-80 sm:w-80"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6FA8FF" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#AB83FF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#070B14" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="165" fill="url(#coreGlow)" />
        <ellipse
          cx="200"
          cy="200"
          rx="145"
          ry="62"
          fill="none"
          stroke="#6FA8FF"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          transform="rotate(-24 200 200)"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="135"
          ry="58"
          fill="none"
          stroke="#AB83FF"
          strokeWidth="1.5"
          transform="rotate(36 200 200)"
        />
        <polygon
          points="200,115 274,158 274,242 200,285 126,242 126,158"
          fill="rgba(18,26,43,0.85)"
          stroke="#6FA8FF"
          strokeWidth="2"
        />
        <circle cx="200" cy="200" r="38" fill="#6FA8FF" fillOpacity="0.85" />
        <circle cx="85" cy="145" r="7" fill="#25C8BD" />
        <circle cx="315" cy="155" r="7" fill="#6FA8FF" />
        <circle cx="290" cy="275" r="7" fill="#AB83FF" />
        <circle cx="110" cy="265" r="7" fill="#25C8BD" />
      </svg>
      <p className="mt-2 font-mono text-xs text-[#A5B0C6]">
        {locale === "ko"
          ? "NEXUS CORE · 정적 아키텍처 뷰 (WebGL 대체 모드)"
          : "NEXUS CORE · Static Architecture View (WebGL Fallback)"}
      </p>
    </div>
  );
}

export function NexusCoreScene() {
  const { locale, reducedMotion } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [inView, setInView] = useState(true);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [activeSat, setActiveSat] = useState<string | null>("jarvis");

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      if (!gl) setWebglAvailable(false);
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);

    const onScroll = () => {
      const ratio = Math.min(window.scrollY / 700, 1);
      setScrollRatio(ratio);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const selectedSpec =
    SATELLITES.find((s) => s.id === activeSat) ?? SATELLITES[0];

  return (
    <div
      ref={containerRef}
      className="relative h-[380px] sm:h-[440px] lg:h-[500px] w-full rounded-3xl border border-[var(--border-subtle)] bg-[#070B14]/90 shadow-2xl overflow-hidden"
      style={{ backgroundImage: "var(--hero-radial)" }}
      aria-label={
        locale === "ko"
          ? "인터랙티브 3D AI 코어 시각화 (드래그하여 회전 가능)"
          : "Interactive 3D AI Core Visualization (Drag to rotate)"
      }
    >
      {/* Top Telemetry Bar */}
      <div className="pointer-events-none absolute left-4 right-4 top-3.5 z-10 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#070B14]/80 px-3 py-1 text-[#6FA8FF] backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-[#25C8BD]" />
          <span>NEXUS CORE v3.0 · WEBGL ACTIVE</span>
        </div>
        <span className="hidden sm:inline-block rounded-full border border-white/10 bg-[#070B14]/80 px-2.5 py-1 text-[#A5B0C6]">
          {locale === "ko" ? "드래그 회전 · 노드 클릭" : "Drag to Rotate · Click Nodes"}
        </span>
      </div>

      {/* 3D Canvas or Fallback */}
      {!webglAvailable ? (
        <StaticCoreFallback locale={locale} />
      ) : (
        <WebGLErrorBoundary fallback={<StaticCoreFallback locale={locale} />}>
          {inView && (
            <Canvas
              dpr={[1, 1.75]}
              camera={{ position: [0, 0.3, 6.1], fov: 44 }}
              frameloop={reducedMotion ? "demand" : "always"}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
              <ambientLight intensity={0.75} />
              <directionalLight position={[4, 6, 4]} intensity={1.4} color="#F5F7FB" />
              <pointLight position={[-3.5, 2.5, 3]} intensity={2.2} color="#6FA8FF" />
              <pointLight position={[3.5, -2.5, 2]} intensity={1.9} color="#AB83FF" />
              <pointLight position={[0, 3, -3]} intensity={1.4} color="#25C8BD" />

              <CoreAssembly
                reducedMotion={reducedMotion}
                scrollRatio={scrollRatio}
                activeSat={activeSat}
                setActiveSat={setActiveSat}
              />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.65}
                dampingFactor={0.08}
                enableDamping
              />
            </Canvas>
          )}
        </WebGLErrorBoundary>
      )}

      {/* Bottom Interactive Node Selector HUD */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#0B1220]/90 p-3 backdrop-blur-md">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-[#F5F7FB]">
            {selectedSpec.label}
          </span>
          <span className="text-[#25C8BD]">{selectedSpec.metric}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SATELLITES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSat(s.id)}
              className={`rounded-md px-2 py-0.5 font-mono text-[10px] transition-colors cursor-pointer ${
                activeSat === s.id
                  ? "bg-[#6FA8FF] text-[#070B14] font-bold"
                  : "bg-white/5 text-[#A5B0C6] hover:bg-white/15 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
