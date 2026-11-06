"use client";

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  Component,
  ReactNode,
} from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore } from "@/store/useAppStore";
import {
  NEXUS_CORE_SATELLITES,
  NexusSatelliteSpec,
} from "@/data/portfolio-data";
import { ArrowRight, Network } from "lucide-react";

function computeSatellitePositionToOut(
  sat: NexusSatelliteSpec,
  t: number,
  out: [number, number, number]
): void {
  const angle = sat.phase + t * sat.speed;
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  out[0] = cosA * sat.orbitRadius;
  out[1] =
    Math.sin(angle * 1.3) * Math.sin(sat.tiltX) * 1.12 +
    cosA * Math.sin(sat.tiltZ) * 0.62;
  out[2] = sinA * sat.orbitRadius;
}

function CoreAssembly({
  reducedMotion,
  isTabVisibleRef,
  scrollRatioRef,
  activeSat,
  setActiveSat,
  isMobile,
}: {
  reducedMotion: boolean;
  isTabVisibleRef: React.MutableRefObject<boolean>;
  scrollRatioRef: React.MutableRefObject<number>;
  activeSat: string | null;
  setActiveSat: (id: string | null) => void;
  isMobile: boolean;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const latticeRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const satGroupRefs = useRef<Array<THREE.Group | null>>([]);
  const clockRef = useRef(0);
  const scratchPos = useRef<[number, number, number]>([0, 0, 0]);

  // Pre-allocate 1 BufferGeometry + LineBasicMaterial per satellite beam (zero per-frame allocations)
  const beamResources = useMemo(() => {
    return NEXUS_CORE_SATELLITES.map((sat) => {
      const initialPos: [number, number, number] = [0, 0, 0];
      computeSatellitePositionToOut(sat, 0, initialPos);
      const positions = new Float32Array([
        0,
        0,
        0,
        initialPos[0],
        initialPos[1],
        initialPos[2],
      ]);
      const geometry = new THREE.BufferGeometry();
      const attr = new THREE.BufferAttribute(positions, 3);
      attr.setUsage(THREE.DynamicDrawUsage);
      geometry.setAttribute("position", attr);

      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(sat.color),
        transparent: true,
        opacity: 0.32,
      });

      const lineObj = new THREE.Line(geometry, material);
      return { geometry, attr, material, lineObj, initialPos };
    });
  }, []);

  // Update beam opacity only when activeSat changes (UI state)
  useEffect(() => {
    beamResources.forEach((res, idx) => {
      const sat = NEXUS_CORE_SATELLITES[idx];
      const isSelected = sat.id === activeSat;
      res.material.opacity = isSelected ? 0.92 : 0.28;
      res.material.needsUpdate = true;
    });
  }, [activeSat, beamResources]);

  // Dispose custom beam geometries & materials on unmount
  useEffect(() => {
    return () => {
      beamResources.forEach((res) => {
        res.geometry.dispose();
        res.material.dispose();
      });
    };
  }, [beamResources]);

  // Restrained particle field (adaptive count for mobile vs desktop)
  const particleGeometry = useMemo(() => {
    const count = isMobile ? 64 : 130;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.85 + (i % 7) * 0.26;
      const theta = (i * 2.39996) % (Math.PI * 2);
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geom;
  }, [isMobile]);

  useEffect(() => {
    return () => {
      particleGeometry.dispose();
    };
  }, [particleGeometry]);

  useFrame((state, delta) => {
    if (!isTabVisibleRef.current) return;
    const clampedDelta = Math.min(delta, 0.05);

    if (!reducedMotion) {
      clockRef.current += clampedDelta;
      if (latticeRef.current) {
        latticeRef.current.rotation.y += clampedDelta * 0.22;
        latticeRef.current.rotation.x += clampedDelta * 0.1;
      }
      if (innerCoreRef.current) {
        const pulse = 1 + Math.sin(clockRef.current * 2.0) * 0.04;
        innerCoreRef.current.scale.setScalar(pulse);
      }
      if (ring1Ref.current) {
        ring1Ref.current.rotation.z += clampedDelta * 0.26;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.x -= clampedDelta * 0.2;
      }
      if (ring3Ref.current) {
        ring3Ref.current.rotation.y += clampedDelta * 0.16;
      }

      // Directly mutate satellite Group positions and beam BufferAttributes (0 React state updates)
      const t = clockRef.current;
      const out = scratchPos.current;
      for (let i = 0; i < NEXUS_CORE_SATELLITES.length; i++) {
        computeSatellitePositionToOut(NEXUS_CORE_SATELLITES[i], t, out);
        const grp = satGroupRefs.current[i];
        if (grp) {
          grp.position.set(out[0], out[1], out[2]);
        }
        const beam = beamResources[i];
        if (beam) {
          beam.attr.setXYZ(1, out[0], out[1], out[2]);
          beam.attr.needsUpdate = true;
        }
      }
    }

    if (rootRef.current) {
      const targetRotX =
        scrollRatioRef.current * 0.4 + state.pointer.y * 0.16;
      const targetRotY = state.pointer.x * 0.24;
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
  });

  return (
    <group ref={rootRef} position={[0, 0.22, 0]}>
      {/* Central Glowing Inner Sphere */}
      <mesh ref={innerCoreRef}>
        <sphereGeometry args={[0.68, 28, 28]} />
        <meshStandardMaterial
          color="#6FA8FF"
          emissive="#3B6EF6"
          emissiveIntensity={1.45}
          roughness={0.22}
          metalness={0.55}
        />
      </mesh>

      {/* Inner Dark Metallic Polyhedron */}
      <mesh>
        <icosahedronGeometry args={[0.96, 1]} />
        <meshStandardMaterial
          color="#0F172A"
          emissive="#182338"
          emissiveIntensity={0.45}
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={0.82}
        />
      </mesh>

      {/* Outer Metallic Wireframe Lattice Core */}
      <mesh ref={latticeRef}>
        <icosahedronGeometry args={[1.28, 2]} />
        <meshStandardMaterial
          color="#6FA8FF"
          emissive="#6FA8FF"
          emissiveIntensity={0.48}
          metalness={0.92}
          roughness={0.15}
          wireframe
        />
      </mesh>

      {/* Orbital Ring 1 — Electric Blue */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2.6, 0.25, 0]}>
        <torusGeometry args={[1.84, 0.015, 14, 80]} />
        <meshStandardMaterial
          color="#6FA8FF"
          emissive="#6FA8FF"
          emissiveIntensity={0.7}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Orbital Ring 2 — Violet */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3.1, -0.45, 0.3]}>
        <torusGeometry args={[2.16, 0.014, 14, 80]} />
        <meshStandardMaterial
          color="#AB83FF"
          emissive="#AB83FF"
          emissiveIntensity={0.68}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Orbital Ring 3 — Telemetry Cyan */}
      <mesh ref={ring3Ref} rotation={[0.42, Math.PI / 4, -0.5]}>
        <torusGeometry args={[2.48, 0.013, 14, 80]} />
        <meshStandardMaterial
          color="#25C8BD"
          emissive="#25C8BD"
          emissiveIntensity={0.65}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* 6 Flagship Orbiting Project Satellites & Pre-Allocated Energy Beams */}
      {NEXUS_CORE_SATELLITES.map((sat, idx) => {
        const isSelected = activeSat === sat.id;
        const beam = beamResources[idx];
        return (
          <group key={sat.id}>
            <primitive object={beam.lineObj} />
            <group
              ref={(el) => {
                satGroupRefs.current[idx] = el;
              }}
              position={beam.initialPos}
            >
              {isSelected && (
                <mesh>
                  <torusGeometry args={[0.25, 0.018, 14, 36]} />
                  <meshStandardMaterial
                    color="#25C8BD"
                    emissive="#25C8BD"
                    emissiveIntensity={1.85}
                  />
                </mesh>
              )}
              <mesh
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSat(sat.id);
                }}
                onPointerOver={() => {
                  setActiveSat(sat.id);
                  if (typeof document !== "undefined") {
                    document.body.style.cursor = "pointer";
                  }
                }}
                onPointerOut={() => {
                  if (typeof document !== "undefined") {
                    document.body.style.cursor = "auto";
                  }
                }}
              >
                <sphereGeometry args={[isSelected ? 0.15 : 0.11, 20, 20]} />
                <meshStandardMaterial
                  color={sat.color}
                  emissive={sat.color}
                  emissiveIntensity={isSelected ? 2.0 : 1.15}
                />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* Restrained Particle Field */}
      <points geometry={particleGeometry}>
        <pointsMaterial
          color="#6FA8FF"
          size={0.03}
          transparent
          opacity={0.5}
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
        className="h-60 w-60 sm:h-72 sm:w-72"
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
      <p className="mt-2 font-mono text-xs text-[#A8B4CA]">
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
  const scrollRatioRef = useRef<number>(0);
  const isTabVisibleRef = useRef<boolean>(true);
  const [webglAvailable, setWebglAvailable] = useState(true);
  const [inView, setInView] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
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

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
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
      scrollRatioRef.current = Math.min(window.scrollY / 700, 1);
    };
    const onVisibilityChange = () => {
      isTabVisibleRef.current = !document.hidden;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const selectedSpec =
    NEXUS_CORE_SATELLITES.find((s) => s.id === activeSat) ??
    NEXUS_CORE_SATELLITES[0];

  return (
    <div
      ref={containerRef}
      data-testid="nexus-core-scene"
      className="relative h-[420px] sm:h-[470px] lg:h-[520px] w-full rounded-3xl border border-[var(--border-subtle)] bg-[#070B14] shadow-2xl overflow-hidden"
      style={{ backgroundImage: "var(--hero-radial)" }}
      role="region"
      aria-label={
        locale === "ko"
          ? "인터랙티브 3D AI 코어 시각화 (대표 6개 위성 노드 탐색 가능)"
          : "Interactive 3D AI Core Visualization (6 Flagship Satellite Nodes)"
      }
    >
      {/* Top Telemetry Bar */}
      <div className="pointer-events-none absolute left-3.5 right-3.5 top-3.5 z-10 flex items-center justify-between gap-2 text-[11px] font-mono">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[#070B14]/85 px-3 py-1 text-[#6FA8FF] backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#25C8BD]" />
          <span>NEXUS CORE v3.2 · 6 FLAGSHIP SATELLITES</span>
        </div>
        <span className="hidden sm:inline-block rounded-full border border-white/15 bg-[#070B14]/85 px-2.5 py-1 text-[#DCE4F2]">
          {locale === "ko"
            ? "드래그 회전 · 위성 클릭 탐색"
            : "Drag to Rotate · Click Satellites"}
        </span>
      </div>

      {/* 3D Canvas or Fallback */}
      {!webglAvailable ? (
        <StaticCoreFallback locale={locale} />
      ) : (
        <WebGLErrorBoundary fallback={<StaticCoreFallback locale={locale} />}>
          {inView && (
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0.35, 6.2], fov: 43 }}
              frameloop={reducedMotion ? "demand" : "always"}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight
                position={[4, 6, 4]}
                intensity={1.35}
                color="#F5F7FB"
              />
              <pointLight
                position={[-3.5, 2.5, 3]}
                intensity={2.0}
                color="#6FA8FF"
              />
              <pointLight
                position={[3.5, -2.5, 2]}
                intensity={1.75}
                color="#AB83FF"
              />
              <pointLight
                position={[0, 3, -3]}
                intensity={1.35}
                color="#25C8BD"
              />

              <CoreAssembly
                reducedMotion={reducedMotion}
                isTabVisibleRef={isTabVisibleRef}
                scrollRatioRef={scrollRatioRef}
                activeSat={activeSat}
                setActiveSat={setActiveSat}
                isMobile={isMobile}
              />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.62}
                dampingFactor={0.08}
                enableDamping
              />
            </Canvas>
          )}
        </WebGLErrorBoundary>
      )}

      {/* Bottom Interactive Node Selector HUD */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-col gap-2.5 rounded-2xl border border-white/15 bg-[#0B1220]/95 p-3.5 backdrop-blur-md shadow-xl">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: selectedSpec.color }}
              />
              <span className="font-bold text-[#F5F7FB]">
                {selectedSpec.label}
              </span>
              <span className="rounded bg-[#25C8BD]/15 px-2 py-0.5 text-[11px] font-semibold text-[#25C8BD]">
                {selectedSpec.metric}
              </span>
            </div>
            <p className="text-xs text-[#DCE4F2] line-clamp-1">
              {selectedSpec.archSummary[locale]}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {selectedSpec.labSystemId && (
              <Link
                href={`/lab?system=${selectedSpec.labSystemId}`}
                className="inline-flex items-center gap-1 rounded-lg border border-[#AB83FF]/45 bg-[#AB83FF]/15 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#AB83FF] hover:bg-[#AB83FF]/25"
              >
                <Network className="h-3 w-3" />
                <span>3D Lab</span>
              </Link>
            )}
            <Link
              href={`/work/${selectedSpec.slug}`}
              className="inline-flex items-center gap-1 rounded-lg bg-[#6FA8FF] px-2.5 py-1 font-mono text-[11px] font-bold text-[#070B14] hover:bg-[#86b6ff]"
            >
              <span>{locale === "ko" ? "케이스 스터디" : "Case Study"}</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <div
          role="group"
          aria-label={
            locale === "ko"
              ? "대표 6개 프로젝트 위성 선택"
              : "Select Flagship Project Satellite"
          }
          className="flex flex-wrap gap-1.5 pt-1 border-t border-white/10"
        >
          {NEXUS_CORE_SATELLITES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.label}
              aria-pressed={activeSat === s.id}
              onClick={() => setActiveSat(s.id)}
              className={`rounded-md px-2 py-1 font-mono text-[11px] transition-colors cursor-pointer ${
                activeSat === s.id
                  ? "bg-[#6FA8FF] text-[#070B14] font-bold shadow-sm"
                  : "bg-white/5 text-[#A8B4CA] hover:bg-white/15 hover:text-white"
              }`}
            >
              0{idx + 1} · {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
