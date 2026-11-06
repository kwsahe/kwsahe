"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { LAB_SYSTEMS } from "@/data/architecture-lab-data";
import { ArrowRight, ShieldCheck, Terminal } from "lucide-react";

const ArchitectureLabScene = dynamic(
  () =>
    import("@/components/three/ArchitectureLabScene").then(
      (mod) => mod.ArchitectureLabScene
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[520px] w-full items-center justify-center rounded-3xl border border-[var(--border-subtle)] bg-[#070B14] font-mono text-xs text-[#25C8BD]">
        LOADING OPS COMMAND 3D ARCHITECTURE TOPOLOGY...
      </div>
    ),
  }
);

function LabPageInner() {
  const { locale } = useAppStore();
  const searchParams = useSearchParams();
  const systemParam = searchParams.get("system") ?? undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-6">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-cyan)]">
          <Terminal className="h-3.5 w-3.5" />
          <span>OPS COMMAND · INTERACTIVE 3D / 2D SYSTEM ARCHITECTURE LAB</span>
        </span>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          {locale === "ko"
            ? "아키텍처 랩 (Architecture Lab)"
            : "3D Engineering Architecture Lab"}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-[var(--text-secondary)]">
          {locale === "ko"
            ? "실제 구현·검증된 6개 핵심 AI 및 데이터 시스템의 노드 구조(INPUT → API → ORCHESTRATOR → AI/RAG/DATA → VALIDATION → OUTPUT)를 3D WebGL 또는 2D SVG로 탐색하고, 데이터 패킷 시뮬레이션과 노드별 오류 처리·검증 방법을 확인하세요."
            : "Explore the verified node topologies of 6 production and internal AI systems in interactive 3D WebGL or 2D SVG mode, complete with packet simulation and node-level verification telemetry."}
        </p>
      </div>

      {/* Interactive 3D / 2D Architecture Lab Scene */}
      <ArchitectureLabScene initialSystemId={systemParam} />

      {/* Architecture Comparison Matrix */}
      <section
        aria-labelledby="matrix-heading"
        className="surface-panel rounded-3xl p-6 sm:p-8 space-y-5"
      >
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)]">
            VERIFIED ARCHITECTURE COMPARISON
          </span>
          <h2
            id="matrix-heading"
            className="mt-1 text-xl font-bold text-[var(--text-primary)] sm:text-2xl"
          >
            {locale === "ko"
              ? "지원 시스템 6종 아키텍처 및 검증 지표 비교"
              : "6 Supported Systems — Architecture & Verification Matrix"}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] font-mono text-[11px] uppercase text-[var(--text-muted)]">
                <th className="py-3 pr-4">
                  {locale === "ko" ? "시스템명" : "System"}
                </th>
                <th className="py-3 px-4">
                  {locale === "ko" ? "핵심 아키텍처" : "Core Architecture"}
                </th>
                <th className="py-3 px-4">
                  {locale === "ko" ? "검증 게이트 & 수치" : "Verification & Metrics"}
                </th>
                <th className="py-3 pl-4 text-right">
                  {locale === "ko" ? "상세 문서" : "Case Study"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {LAB_SYSTEMS.map((sys) => (
                <tr key={sys.id} className="hover:bg-[var(--bg-elevated)]/60">
                  <td className="py-3.5 pr-4 font-bold text-[var(--text-primary)]">
                    {sys.name}
                  </td>
                  <td className="py-3.5 px-4 text-[var(--text-secondary)]">
                    {sys.title[locale]}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1.5">
                      {sys.metrics.slice(0, 2).map((m) => (
                        <span
                          key={m}
                          className="inline-flex items-center gap-1 rounded bg-[#25C8BD]/15 px-2 py-0.5 font-mono text-[11px] text-[#25C8BD]"
                        >
                          <ShieldCheck className="h-3 w-3" />
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 pl-4 text-right">
                    <Link
                      href={`/work/${sys.id}`}
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[var(--accent-blue)] hover:underline"
                    >
                      <span>{locale === "ko" ? "케이스 스터디" : "Case Study"}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default function LabPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-12 font-mono text-xs text-[#25C8BD]">
          INITIALIZING ARCHITECTURE LAB...
        </div>
      }
    >
      <LabPageInner />
    </Suspense>
  );
}
