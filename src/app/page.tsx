"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppStore } from "@/store/useAppStore";
import {
  PROFILE_DATA,
  CORE_CAPABILITIES,
  EXPERIENCE_DATA,
  getFeaturedProjects,
  PROJECTS_DATA,
} from "@/data/portfolio-data";
import { LAB_SYSTEMS } from "@/data/architecture-lab-data";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { assetPath } from "@/lib/utils";
import {
  ArrowRight,
  Download,
  Network,
  ShieldCheck,
  Terminal,
  Briefcase,
  Mail,
  GitBranch as Github,
  CheckCircle2,
} from "lucide-react";

const NexusCoreScene = dynamic(
  () =>
    import("@/components/three/NexusCoreScene").then(
      (mod) => mod.NexusCoreScene
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] sm:h-[470px] lg:h-[520px] w-full items-center justify-center rounded-3xl border border-[var(--border-subtle)] bg-[#070B14] font-mono text-xs text-[#6FA8FF]">
        INITIALIZING NEXUS 3D WEBGL CORE...
      </div>
    ),
  }
);

export default function HomePage() {
  const { locale, reducedMotion } = useAppStore();
  const sectionsRef = useRef<HTMLDivElement>(null);

  const featured = getFeaturedProjects();
  const primaryFour = featured.slice(0, 4);
  const secondaryFeatured = featured.slice(4, 6);

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>(".gsap-reveal");
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, sectionsRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={sectionsRef} className="space-y-24 pb-16">
      {/* ════════════ HERO SECTION (NEXUS CORE) ════════════ */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden border-b border-[var(--border-subtle)] pt-8 pb-16 lg:pt-14 lg:pb-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Copy: 3-Second Comprehension Hierarchy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--accent-blue)]/40 bg-[var(--accent-blue)]/10 px-3.5 py-1.5 font-mono text-xs font-bold text-[var(--accent-blue)]">
                <span className="h-2 w-2 rounded-full bg-[#25C8BD]" />
                <span>{PROFILE_DATA.primaryRole.toUpperCase()}</span>
                <span className="text-[var(--text-muted)]">·</span>
                <span className="text-[var(--accent-cyan)]">
                  {locale === "ko" ? "링크21 재직 중" : "At Link21 Inc."}
                </span>
              </div>

              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  SANGHEON KWON · {PROFILE_DATA.secondaryRole}
                </p>
                <h1
                  id="hero-heading"
                  className="mt-2 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[3.5rem] leading-[1.12]"
                >
                  {PROFILE_DATA.name[locale]}
                  <span className="mt-2 block bg-gradient-to-r from-[#6FA8FF] via-[#AB83FF] to-[#25C8BD] bg-clip-text text-transparent text-2xl sm:text-4xl">
                    &ldquo;{PROFILE_DATA.tagline}&rdquo;
                  </span>
                </h1>
              </div>

              {/* Concise 2-3 Line Core Value Proposition + Scannable System Pills */}
              <div className="space-y-3">
                <p className="text-base sm:text-[17px] leading-[1.72] text-[var(--text-secondary)]">
                  {locale === "ko"
                    ? "링크21에서 실제 상용 웹서비스와 사내 AI 시스템을 아키텍처 설계부터 구현·검증 게이트·배포·운영까지 End-to-End로 구축하는 AI 서비스 백엔드 엔지니어입니다."
                    : "AI Service Backend Engineer & Full-Stack Developer at Link21 building production web platforms and multi-agent AI systems end-to-end from architecture to verification and live operations."}
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--text-muted)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-cyan)]" />
                    <span>
                      <strong className="text-[var(--text-primary)]">
                        {locale === "ko" ? "멀티 에이전트 & 검증 게이트:" : "Multi-Agent & Validation Gates:"}
                      </strong>{" "}
                      {locale === "ko"
                        ? "19명 AI 직원 체인·게시 판정(JARVIS), 공고 규칙 판정·감사(BidPilot), 3-CLI 코딩 오케스트레이션(tri-agent-control)"
                        : "19-agent chain & Publish Gate (JARVIS), RFP rule engine & auditor (BidPilot), 3-CLI coding pipeline (tri-agent-control)"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-blue)]" />
                    <span>
                      <strong className="text-[var(--text-primary)]">
                        {locale === "ko" ? "상용 서비스 & 도메인 RAG/ML:" : "Live Services & Domain RAG/ML:"}
                      </strong>{" "}
                      {locale === "ko"
                        ? "LINK21 AI Hub · LINK21 Premium · AI 챗봇(링키) 상용 운영, 중대재해 법령 이중 RAG, 다나와 5.8만 건 ML 시세 예측"
                        : "LINK21 AI Hub, LINK21 Premium & AI Chatbot in live production, Dual ChromaDB Legal RAG, and 57.6k-row ML price analytics"}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Key Proof Pills */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 pt-1">
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-3 shadow-sm">
                  <div className="font-mono text-lg sm:text-xl font-extrabold text-[var(--accent-blue)]">
                    19 Agents
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--text-muted)]">
                    {locale === "ko"
                      ? "JARVIS 체인 · Publish Gate"
                      : "JARVIS Chain · Publish Gate"}
                  </div>
                </div>
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-3 shadow-sm">
                  <div className="font-mono text-lg sm:text-xl font-extrabold text-[var(--accent-cyan)]">
                    4,700+ Tests
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--text-muted)]">
                    {locale === "ko"
                      ? "자동 검증 · 회귀 테스트"
                      : "Automated QA & Regression"}
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-3 shadow-sm">
                  <div className="font-mono text-lg sm:text-xl font-extrabold text-[var(--accent-violet)]">
                    14 Projects
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--text-muted)]">
                    {locale === "ko"
                      ? "상용 · 사내 AI · RAG · 데이터"
                      : "Production · AI · RAG · Data"}
                  </div>
                </div>
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#6FA8FF] px-5 py-3 text-sm font-bold text-[#070B14] shadow-lg transition-transform hover:scale-[1.02] hover:bg-[#86b6ff]"
                >
                  <span>
                    {locale === "ko"
                      ? "전체 프로젝트 탐색 (14)"
                      : "Explore Projects (14)"}
                  </span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/lab"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#AB83FF]/50 bg-[#AB83FF]/15 px-5 py-3 text-sm font-bold text-[var(--text-primary)] transition-colors hover:bg-[#AB83FF]/25"
                >
                  <Network
                    className="h-4 w-4 text-[var(--accent-violet)]"
                    aria-hidden="true"
                  />
                  <span>
                    {locale === "ko" ? "3D 아키텍처 랩" : "3D Architecture Lab"}
                  </span>
                </Link>

                <a
                  href={assetPath(PROFILE_DATA.resumePdf)}
                  download={
                    locale === "ko"
                      ? "resume-kwon-sangheon.pdf"
                      : "Resume_Kwon_Sangheon.pdf"
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent-blue)]"
                >
                  <Download
                    className="h-4 w-4 text-[var(--accent-blue)]"
                    aria-hidden="true"
                  />
                  <span>{locale === "ko" ? "이력서 PDF" : "View Resume"}</span>
                </a>
              </div>
            </div>

            {/* Right: Real WebGL 3D Core */}
            <div className="lg:col-span-6">
              <NexusCoreScene />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ TOP 4 PRIORITY FLAGSHIP SYSTEMS ════════════ */}
      <section
        aria-labelledby="flagship-heading"
        className="gsap-reveal mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)]">
              SYSTEM ATLAS · MAIN FLAGSHIP ENGINEERING SYSTEMS (TOP 4)
            </span>
            <h2
              id="flagship-heading"
              className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl"
            >
              {locale === "ko"
                ? "대표 엔지니어링 시스템 (Top 4 Flagship)"
                : "Primary Flagship Systems (Top 4)"}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-[var(--text-muted)]">
              {locale === "ko"
                ? "19명 AI 직원 체인(JARVIS), 공공입찰 자동 검토(BidPilot), 상용 통합 허브(AI Hub), 3-CLI 코딩 파이프라인(tri-agent-control)입니다."
                : "Flagship multi-agent orchestration, procurement auditing, commercial AI hub, and 3-CLI coding pipeline."}
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--accent-blue)] hover:underline"
          >
            <span>
              {locale === "ko"
                ? `전체 ${PROJECTS_DATA.length}개 프로젝트 비교하기`
                : `Compare All ${PROJECTS_DATA.length} Projects`}
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {primaryFour.map((project) => (
            <ProjectCard key={project.slug} project={project} priority />
          ))}
        </div>
      </section>

      {/* ════════════ SECONDARY FEATURED SYSTEMS (MARKET PULSE & LINK21 PREMIUM) ════════════ */}
      <section
        aria-labelledby="featured-work-heading"
        className="gsap-reveal mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-violet)]">
              SECONDARY FEATURED · DATA ML & COMMERCIAL WEB PLATFORM
            </span>
            <h2
              id="featured-work-heading"
              className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl"
            >
              {locale === "ko"
                ? "3D 시세 예측 ML 플랫폼 & 기업 교육 상용 웹서비스"
                : "3D Hardware Price ML & Commercial Enterprise Platform"}
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {locale === "ko"
                ? "다나와 57,690건 일일 수집 기반 적정가 예측(Market Pulse)과 실제 기업 고객용 교육 플랫폼(LINK21 Premium)입니다."
                : "Daily 57,690-snapshot hardware ML analytics (Market Pulse) and live enterprise training platform (LINK21 Premium)."}
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2.5 text-xs font-bold text-[var(--text-primary)] hover:border-[var(--accent-blue)]"
          >
            <span>
              {locale === "ko"
                ? "나머지 8개 프로젝트 더 보기 →"
                : "View 8 More Projects →"}
            </span>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {secondaryFeatured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* ════════════ ARCHITECTURE LAB PREVIEW (OPS COMMAND) ════════════ */}
      <section
        aria-labelledby="arch-preview-heading"
        className="gsap-reveal mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="surface-panel overflow-hidden rounded-3xl p-6 sm:p-10 ops-grid-bg">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-cyan)]">
                <Terminal className="h-3.5 w-3.5" />
                <span>OPS COMMAND · INTERACTIVE 3D / 2D ARCHITECTURE LAB</span>
              </span>
              <h2
                id="arch-preview-heading"
                className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl"
              >
                {locale === "ko"
                  ? "아키텍처 랩 (Architecture Lab) — 시스템 내부 데이터 흐름 탐색"
                  : "Architecture Lab — Explore Verified System Data Flows"}
              </h2>
              <p className="mt-2 max-w-3xl text-sm sm:text-base text-[var(--text-secondary)]">
                {locale === "ko"
                  ? "INPUT → API → ORCHESTRATOR → AI/RAG/DATA → VALIDATION → OUTPUT에 이르는 실제 시스템 노드 구조와 정상 경로·보완/분기 경로를 3D WebGL과 2D SVG로 직접 시뮬레이션할 수 있습니다."
                  : "Simulate real node topologies and normal vs. branch/remediation paths across 6 verified systems in 3D WebGL or 2D SVG mode."}
              </p>
            </div>

            <Link
              href="/lab"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#25C8BD] px-5 py-3 text-sm font-bold text-[#070B14] shadow-lg transition-transform hover:scale-[1.02]"
            >
              <Network className="h-4 w-4" />
              <span>
                {locale === "ko"
                  ? "아키텍처 랩 전체 열기"
                  : "Launch Architecture Lab"}
              </span>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LAB_SYSTEMS.map((sys) => (
              <Link
                key={sys.id}
                href={`/lab?system=${sys.id}`}
                className="group flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 p-5 transition-all hover:border-[#25C8BD]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono text-xs">
                    <span className="font-bold text-[var(--accent-blue)]">
                      {sys.name}
                    </span>
                    <span className="rounded bg-[#25C8BD]/15 px-2 py-0.5 text-[11px] font-semibold text-[var(--accent-cyan)]">
                      {sys.nodes.length} Nodes · {sys.edges.length} Edges
                    </span>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-[var(--text-secondary)]">
                    {sys.summary[locale]}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 font-mono text-xs text-[var(--accent-cyan)]">
                  <span>{sys.metrics[0]}</span>
                  <span className="group-hover:translate-x-1 transition-transform font-bold">
                    3D / 2D →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CORE ENGINEERING CAPABILITIES ════════════ */}
      <section
        aria-labelledby="capabilities-heading"
        className="gsap-reveal mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)]">
            ENGINEERING PILLARS · VERIFIED BY METRICS
          </span>
          <h2
            id="capabilities-heading"
            className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl"
          >
            {locale === "ko"
              ? "4대 핵심 엔지니어링 역량"
              : "Core Engineering Capabilities"}
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {CORE_CAPABILITIES.map((cap) => (
            <article
              key={cap.id}
              className="surface-panel rounded-2xl p-6 transition-colors hover:border-[var(--border-strong)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-blue)]/15 font-mono text-sm font-bold text-[var(--accent-blue)] border border-[var(--accent-blue)]/30">
                  {cap.id}
                </span>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {cap.title[locale]}
                </h3>
              </div>
              <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
                {cap.summary[locale]}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cap.metrics.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-xs text-[var(--accent-cyan)]"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {m}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ════════════ EXPERIENCE PREVIEW & CONTACT CTA ════════════ */}
      <section
        aria-labelledby="exp-preview-heading"
        className="gsap-reveal mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Experience Summary */}
          <div className="lg:col-span-7 surface-panel rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[var(--accent-blue)]" />
                <h2
                  id="exp-preview-heading"
                  className="text-xl font-bold text-[var(--text-primary)]"
                >
                  {locale === "ko" ? "실무 경력 요약" : "Experience Snapshot"}
                </h2>
              </div>
              <Link
                href="/about"
                className="font-mono text-xs font-bold text-[var(--accent-blue)] hover:underline"
              >
                {locale === "ko"
                  ? "전체 이력 & 기술 스택 →"
                  : "Full Bio & Tech Stack →"}
              </Link>
            </div>

            <div className="mt-5 space-y-5">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 sm:p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      {exp.company[locale]}
                    </h3>
                    <span className="font-mono text-xs font-semibold text-[var(--accent-cyan)]">
                      {exp.period[locale]}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs font-semibold text-[var(--accent-blue)]">
                    {exp.role[locale]}
                  </p>
                  <ul className="mt-3 space-y-2 text-xs sm:text-[13px] text-[var(--text-secondary)]">
                    {exp.bullets.slice(0, 3).map((b, i) => (
                      <li key={i} className="leading-relaxed">
                        • {b[locale]}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="lg:col-span-5 surface-panel flex flex-col justify-between rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-elevated)]">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-violet)]">
                READY FOR PRODUCTION IMPACT
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-primary)] leading-snug">
                {locale === "ko"
                  ? "아키텍처 설계부터 프로덕션 배포·검증까지 함께할 준비가 되어 있습니다."
                  : "Ready to engineer reliable AI systems from architecture to production."}
              </h2>
              <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
                {locale === "ko"
                  ? "채용 제안, 기술 면접, 프로젝트 협업 문의는 이메일이나 GitHub, 연락처 페이지로 편하게 연락해 주세요."
                  : "Reach out via email, GitHub, or the Contact page for engineering roles and technical discussions."}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6FA8FF] px-5 py-3 text-sm font-bold text-[#070B14] hover:bg-[#86b6ff]"
              >
                <Mail className="h-4 w-4" />
                <span>{PROFILE_DATA.email}</span>
              </a>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2.5 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-blue)]"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-2.5 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-blue)]"
                >
                  <span>
                    {locale === "ko" ? "연락처 페이지 →" : "Contact Page →"}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
