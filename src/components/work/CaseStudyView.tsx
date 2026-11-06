"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProjectData, PROJECTS_DATA } from "@/data/portfolio-data";
import { useAppStore } from "@/store/useAppStore";
import { assetPath, cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Lock,
  Network,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  ShieldCheck,
  Wrench,
  BookOpen,
} from "lucide-react";

export function CaseStudyView({ project }: { project: ProjectData }) {
  const { locale } = useAppStore();
  const [activeSlide, setActiveSlide] = useState(0);

  const currentIdx = PROJECTS_DATA.findIndex((p) => p.slug === project.slug);
  const prevProject =
    PROJECTS_DATA[(currentIdx - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length];
  const nextProject =
    PROJECTS_DATA[(currentIdx + 1) % PROJECTS_DATA.length];

  const slide = project.slides[activeSlide] ?? project.slides[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* Top Breadcrumb & Back Link */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-blue)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>
            {locale === "ko"
              ? "전체 프로젝트 아틀라스로 돌아가기"
              : "Back to Projects Atlas"}
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#25C8BD]/40 bg-[#25C8BD]/15 px-3 py-1 font-mono text-xs font-bold text-[#25C8BD]">
            {project.status}
          </span>
          {project.isPrivateRepo && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1 font-mono text-xs text-[var(--text-muted)]">
              <Lock className="h-3 w-3" />
              <span>Private Repository</span>
            </span>
          )}
          {project.labSystemId && (
            <Link
              href={`/lab?system=${project.labSystemId}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#AB83FF] px-3.5 py-1 font-mono text-xs font-bold text-[#070B14] hover:opacity-90"
            >
              <Network className="h-3.5 w-3.5" />
              <span>
                {locale === "ko"
                  ? "3D 아키텍처 랩에서 열기"
                  : "Explore in 3D Architecture Lab"}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Case Study Hero Header */}
      <header className="surface-panel rounded-3xl p-6 sm:p-10 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--accent-blue)]">
          <span>CASE STUDY · {project.slug.toUpperCase()}</span>
          <span>{project.period[locale]}</span>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl leading-tight">
          {project.title[locale]}
        </h1>

        <p className="text-base leading-relaxed text-[var(--text-secondary)]">
          {project.oneLiner[locale]}
        </p>

        {/* Key Metrics Banner */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2">
          {project.keyMetrics.map((m, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-3.5"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-cyan)]" />
              <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                {m[locale]}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack & External Links */}
        <div className="flex flex-col justify-between gap-4 border-t border-[var(--border-subtle)] pt-5 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-xs text-[var(--accent-blue)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--accent-blue)] px-4 py-2 text-xs font-bold text-[#070B14] hover:opacity-90"
              >
                <span>{link.label[locale]}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Interactive Screenshot Gallery */}
      {project.slides.length > 0 && (
        <section
          aria-label={locale === "ko" ? "실제 화면 스크린샷" : "Interface Screenshots"}
          className="surface-panel rounded-3xl p-5 sm:p-8 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-cyan)]">
              {locale === "ko"
                ? `실제 구동 화면 및 산출물 (${activeSlide + 1} / ${project.slides.length})`
                : `Verified Interface & Deliverable Captures (${activeSlide + 1} / ${project.slides.length})`}
            </h2>
            <span className="text-xs text-[var(--text-muted)]">
              {slide.caption[locale]}
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#070B14]">
            <img
              src={assetPath(slide.src)}
              alt={slide.alt}
              className="max-h-[540px] w-full object-contain mx-auto"
            />
          </div>

          {project.slides.length > 1 && (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {project.slides.map((s, idx) => (
                <button
                  key={s.src + idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={cn(
                    "group overflow-hidden rounded-xl border p-2 text-left transition-all cursor-pointer",
                    idx === activeSlide
                      ? "border-[var(--accent-blue)] bg-[#6FA8FF]/10 ring-1 ring-[var(--accent-blue)]"
                      : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] opacity-75 hover:opacity-100"
                  )}
                >
                  <div className="aspect-[16/9] overflow-hidden rounded-lg bg-[#070B14]">
                    <img
                      src={assetPath(s.src)}
                      alt={s.alt}
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <p className="mt-1.5 line-clamp-1 font-mono text-[11px] text-[var(--text-primary)]">
                    {idx + 1}. {s.caption[locale]}
                  </p>
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Case Study Sections Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Overview, Problem, Role */}
        <div className="lg:col-span-6 space-y-6">
          <section className="surface-panel rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[var(--accent-blue)]">
              <BookOpen className="h-4 w-4" />
              <h3>01. Overview — {locale === "ko" ? "프로젝트 개요 및 목적" : "Project Overview"}</h3>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {project.caseStudy.overview[locale]}
            </p>
          </section>

          <section className="surface-panel rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-400">
              <AlertCircle className="h-4 w-4" />
              <h3>02. Problem — {locale === "ko" ? "해결하고자 했던 핵심 문제" : "Core Problem"}</h3>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {project.caseStudy.problem[locale]}
            </p>
          </section>

          <section className="surface-panel rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[var(--accent-violet)]">
              <Layers className="h-4 w-4" />
              <h3>03. Role — {locale === "ko" ? "직접 담당한 범위" : "Scope & Responsibilities"}</h3>
            </div>
            <p className="font-mono text-xs font-semibold text-[var(--text-primary)]">
              {project.role[locale]}
            </p>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              {project.caseStudy.roleDetails.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-violet)]" />
                  <span>{r[locale]}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Architecture, Implementation, Verification */}
        <div className="lg:col-span-6 space-y-6">
          <section className="surface-panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[var(--accent-cyan)]">
                <Cpu className="h-4 w-4" />
                <h3>04. Architecture — {locale === "ko" ? "시스템 아키텍처" : "System Architecture"}</h3>
              </div>
              {project.labSystemId && (
                <Link
                  href={`/lab?system=${project.labSystemId}`}
                  className="font-mono text-xs font-bold text-[var(--accent-blue)] hover:underline"
                >
                  {locale === "ko" ? "3D 노드 뷰 →" : "3D Node View →"}
                </Link>
              )}
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {project.caseStudy.architecture[locale]}
            </p>

            {/* Pipeline Flow Steps */}
            <div className="space-y-2 pt-1">
              {project.caseStudy.architectureFlow.map((node, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3.5 py-2 font-mono text-xs text-[var(--text-primary)]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#6FA8FF]/20 text-[10px] font-bold text-[var(--accent-blue)]">
                    {idx + 1}
                  </span>
                  <span>{node}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="surface-panel rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[var(--accent-blue)]">
              <Wrench className="h-4 w-4" />
              <h3>05. Implementation — {locale === "ko" ? "핵심 기능 및 구현" : "Implementation Details"}</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
              {project.caseStudy.implementation.map((imp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-blue)]" />
                  <span>{imp[locale]}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="surface-panel rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#25C8BD]">
              <ShieldCheck className="h-4 w-4" />
              <h3>06. Verification — {locale === "ko" ? "테스트 및 실제 검증 결과" : "Verification & Testing"}</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
              {project.caseStudy.verification.map((ver, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#25C8BD]" />
                  <span>{ver[locale]}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Challenges, Limitations & Links */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <section className="surface-panel rounded-2xl p-6 space-y-2.5">
          <h3 className="font-mono text-xs font-bold uppercase text-[var(--accent-blue)]">
            07. Challenges — {locale === "ko" ? "문제 해결 사례" : "Engineering Challenges"}
          </h3>
          {project.caseStudy.challenges.map((c, i) => (
            <p key={i} className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {c[locale]}
            </p>
          ))}
        </section>

        <section className="surface-panel rounded-2xl p-6 space-y-2.5">
          <h3 className="font-mono text-xs font-bold uppercase text-amber-400">
            08. Limitations — {locale === "ko" ? "현재 한계 및 운영 방식" : "Current Scope & Limitations"}
          </h3>
          {project.caseStudy.limitations.map((l, i) => (
            <p key={i} className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {l[locale]}
            </p>
          ))}
        </section>

        <section className="surface-panel rounded-2xl p-6 space-y-3">
          <h3 className="font-mono text-xs font-bold uppercase text-[var(--accent-cyan)]">
            09. Links & Access — {locale === "ko" ? "저장소 및 서비스 링크" : "Links & Access"}
          </h3>
          {project.links.length > 0 ? (
            <div className="flex flex-col gap-2">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3.5 py-2.5 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-blue)]"
                >
                  <span>{link.label[locale]}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-[var(--accent-blue)]" />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              {locale === "ko"
                ? "이 프로젝트는 링크21 사내 전용 비공개 시스템으로, 보안 정책에 따라 사내 소스코드 대신 검증 완료된 인터페이스 캡처와 아키텍처 명세를 공개합니다."
                : "This is a private internal enterprise system at Link21. Verified UI captures and architectural specifications are provided in compliance with security policies."}
            </p>
          )}
        </section>
      </div>

      {/* Bottom Prev / Next Case Study Navigation */}
      <nav
        aria-label={locale === "ko" ? "이전/다음 프로젝트 이동" : "Previous and next project navigation"}
        className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2"
      >
        <Link
          href={`/work/${prevProject.slug}`}
          className="surface-panel flex items-center justify-between rounded-2xl p-5 hover:border-[var(--accent-blue)]"
        >
          <div>
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              ← {locale === "ko" ? "이전 프로젝트" : "Previous Project"}
            </span>
            <div className="mt-1 text-base font-bold text-[var(--text-primary)]">
              {prevProject.name}
            </div>
          </div>
          <ArrowLeft className="h-4 w-4 text-[var(--accent-blue)]" />
        </Link>

        <Link
          href={`/work/${nextProject.slug}`}
          className="surface-panel flex items-center justify-between rounded-2xl p-5 text-right hover:border-[var(--accent-blue)]"
        >
          <ArrowRight className="h-4 w-4 text-[var(--accent-blue)]" />
          <div>
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              {locale === "ko" ? "다음 프로젝트" : "Next Project"} →
            </span>
            <div className="mt-1 text-base font-bold text-[var(--text-primary)]">
              {nextProject.name}
            </div>
          </div>
        </Link>
      </nav>
    </div>
  );
}
