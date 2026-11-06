"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Compass,
} from "lucide-react";

const CASE_STUDY_SECTIONS = [
  { id: "sec-overview", num: "01", label: { ko: "개요", en: "Overview" } },
  { id: "sec-problem", num: "02", label: { ko: "핵심 문제", en: "Problem" } },
  { id: "sec-role", num: "03", label: { ko: "담당 역할", en: "My Role" } },
  { id: "sec-arch", num: "04", label: { ko: "아키텍처", en: "Architecture" } },
  { id: "sec-impl", num: "05", label: { ko: "핵심 구현", en: "Implementation" } },
  { id: "sec-verify", num: "06", label: { ko: "검증 결과", en: "Verification" } },
  { id: "sec-challenges", num: "07", label: { ko: "문제 해결", en: "Challenges" } },
  { id: "sec-limits", num: "08", label: { ko: "한계 및 운영", en: "Limitations" } },
  { id: "sec-links", num: "09", label: { ko: "관련 링크", en: "Links" } },
];

export function CaseStudyView({ project }: { project: ProjectData }) {
  const { locale } = useAppStore();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalBtnRef = useRef<HTMLButtonElement>(null);
  const closeModalBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isModalOpen) return;
    closeModalBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsModalOpen(false);
        openModalBtnRef.current?.focus();
      } else if (e.key === "ArrowLeft" && project.slides.length > 1) {
        e.preventDefault();
        setActiveSlide(
          (i) => (i - 1 + project.slides.length) % project.slides.length
        );
      } else if (e.key === "ArrowRight" && project.slides.length > 1) {
        e.preventDefault();
        setActiveSlide((i) => (i + 1) % project.slides.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, project.slides.length]);

  const closeModal = () => {
    setIsModalOpen(false);
    openModalBtnRef.current?.focus();
  };

  const currentIdx = PROJECTS_DATA.findIndex((p) => p.slug === project.slug);
  const prevProject =
    PROJECTS_DATA[
      (currentIdx - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length
    ];
  const nextProject =
    PROJECTS_DATA[(currentIdx + 1) % PROJECTS_DATA.length];

  const slide = project.slides[activeSlide] ?? project.slides[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* Top Breadcrumb & Back Link */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs font-bold text-[var(--text-primary)] hover:border-[var(--accent-blue)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>
            {locale === "ko"
              ? "전체 프로젝트 아틀라스로 돌아가기"
              : "Back to Projects Atlas"}
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#25C8BD]/40 bg-[#25C8BD]/15 px-3 py-1 font-mono text-xs font-bold text-[var(--accent-cyan)]">
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
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs font-bold text-[var(--accent-blue)]">
          <span>CASE STUDY · {project.slug.toUpperCase()}</span>
          <span className="text-[var(--accent-cyan)]">
            {project.period[locale]}
          </span>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl leading-[1.2]">
          {project.title[locale]}
        </h1>

        <p className="text-base sm:text-[17px] leading-[1.72] text-[var(--text-secondary)]">
          {project.oneLiner[locale]}
        </p>

        {/* Key Verified KPIs Banner */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2">
          {project.keyMetrics.map((m, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-cyan)]" />
              <span className="font-mono text-xs sm:text-[13px] font-bold text-[var(--text-primary)]">
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
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-xs font-medium text-[var(--accent-blue)]"
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
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#6FA8FF] px-4 py-2 text-xs font-bold text-[#070B14] hover:bg-[#86b6ff]"
              >
                <span>{link.label[locale]}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Scannable 01-09 Section Index Bar */}
      <nav
        aria-label={locale === "ko" ? "케이스 스터디 섹션 목차" : "Case study section index"}
        className="surface-panel flex items-center gap-1.5 overflow-x-auto rounded-2xl p-2.5 text-xs font-mono"
      >
        <span className="inline-flex items-center gap-1 px-2.5 py-1 font-bold text-[var(--accent-cyan)] shrink-0">
          <Compass className="h-3.5 w-3.5" />
          <span>INDEX</span>
        </span>
        {CASE_STUDY_SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="whitespace-nowrap rounded-lg border border-transparent bg-[var(--bg-elevated)] px-2.5 py-1 text-[var(--text-secondary)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] transition-colors"
          >
            <strong className="text-[var(--accent-blue)]">{s.num}.</strong>{" "}
            {s.label[locale]}
          </a>
        ))}
      </nav>

      {/* Interactive Screenshot Gallery */}
      {project.slides.length > 0 && (
        <section
          aria-label={
            locale === "ko" ? "실제 화면 스크린샷" : "Interface Screenshots"
          }
          className="surface-panel rounded-3xl p-5 sm:p-8 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-cyan)]">
              {locale === "ko"
                ? `실제 구동 화면 및 산출물 (${activeSlide + 1} / ${project.slides.length})`
                : `Verified Interface & Deliverable Captures (${activeSlide + 1} / ${project.slides.length})`}
            </h2>
            <span className="text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
              {slide.caption[locale]}
            </span>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[#070B14]">
            <button
              ref={openModalBtnRef}
              type="button"
              data-testid="open-lightbox-btn"
              onClick={() => setIsModalOpen(true)}
              aria-label={
                locale === "ko"
                  ? "스크린샷 크게 보기 (모달 열기)"
                  : "Enlarge screenshot in modal"
              }
              className="group relative block w-full cursor-zoom-in focus:outline-none"
            >
              <img
                src={assetPath(slide.src)}
                alt={slide.alt}
                className="max-h-[540px] w-full object-contain mx-auto"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#070B14]/90 px-3 py-1.5 font-mono text-xs font-semibold text-[#F5F7FB] backdrop-blur-sm transition-colors group-hover:border-[#6FA8FF] group-hover:text-[#6FA8FF]">
                <Maximize2 className="h-3.5 w-3.5" />
                <span>{locale === "ko" ? "확대 보기" : "Zoom Image"}</span>
              </span>
            </button>
          </div>

          {/* Accessible Lightbox Modal */}
          {isModalOpen && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${project.name} ${locale === "ko" ? "스크린샷 확대 모달" : "Screenshot Lightbox"}`}
              data-testid="case-study-lightbox"
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#070B14]/95 p-4 backdrop-blur-md"
              onClick={closeModal}
            >
              <div
                className="relative flex max-h-[92vh] max-w-6xl w-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0B1220] p-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div className="font-mono text-xs text-[#DCE4F2]">
                    <span className="font-bold text-[#6FA8FF]">
                      [{activeSlide + 1}/{project.slides.length}]
                    </span>{" "}
                    {slide.caption[locale]}
                  </div>
                  <button
                    ref={closeModalBtnRef}
                    type="button"
                    data-testid="close-lightbox-btn"
                    onClick={closeModal}
                    aria-label={
                      locale === "ko"
                        ? "확대 모달 닫기 (Esc)"
                        : "Close modal (Esc)"
                    }
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-[#F5F7FB] hover:bg-[#6FA8FF] hover:text-[#070B14] cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="relative flex-1 overflow-auto flex items-center justify-center bg-[#070B14] rounded-xl p-2">
                  <img
                    src={assetPath(slide.src)}
                    alt={slide.alt}
                    className="max-h-[75vh] w-auto max-w-full object-contain"
                  />
                  {project.slides.length > 1 && (
                    <>
                      <button
                        type="button"
                        data-testid="lightbox-prev-btn"
                        onClick={() =>
                          setActiveSlide(
                            (i) =>
                              (i - 1 + project.slides.length) %
                              project.slides.length
                          )
                        }
                        aria-label={
                          locale === "ko" ? "이전 이미지" : "Previous image"
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#070B14]/85 text-white hover:bg-[#6FA8FF] hover:text-[#070B14] cursor-pointer"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        data-testid="lightbox-next-btn"
                        onClick={() =>
                          setActiveSlide((i) => (i + 1) % project.slides.length)
                        }
                        aria-label={
                          locale === "ko" ? "다음 이미지" : "Next image"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#070B14]/85 text-white hover:bg-[#6FA8FF] hover:text-[#070B14] cursor-pointer"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

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
                      ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/10 ring-1 ring-[var(--accent-blue)]"
                      : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] opacity-80 hover:opacity-100"
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
                  <p className="mt-1.5 line-clamp-1 font-mono text-xs text-[var(--text-primary)]">
                    {idx + 1}. {s.caption[locale]}
                  </p>
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Case Study Sections Grid (01 ~ 06) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: 01 Overview, 02 Problem, 03 My Role */}
        <div className="lg:col-span-6 space-y-6">
          <section
            id="sec-overview"
            className="surface-panel rounded-2xl p-6 sm:p-7 space-y-3"
          >
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[var(--accent-blue)]">
              <BookOpen className="h-4 w-4" />
              <h3>
                01. Overview —{" "}
                {locale === "ko" ? "프로젝트 개요 및 목적" : "Project Overview"}
              </h3>
            </div>
            <p className="text-[15px] leading-[1.75] text-[var(--text-secondary)]">
              {project.caseStudy.overview[locale]}
            </p>
          </section>

          <section
            id="sec-problem"
            className="surface-panel rounded-2xl p-6 sm:p-7 space-y-3"
          >
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-500 dark:text-amber-400">
              <AlertCircle className="h-4 w-4" />
              <h3>
                02. Problem —{" "}
                {locale === "ko"
                  ? "해결하고자 했던 핵심 문제"
                  : "Core Problem"}
              </h3>
            </div>
            <p className="text-[15px] leading-[1.75] text-[var(--text-secondary)]">
              {project.caseStudy.problem[locale]}
            </p>
          </section>

          <section
            id="sec-role"
            className="surface-panel rounded-2xl p-6 sm:p-7 space-y-3.5"
          >
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[var(--accent-violet)]">
              <Layers className="h-4 w-4" />
              <h3>
                03. My Role —{" "}
                {locale === "ko" ? "직접 담당한 범위" : "Scope & Responsibilities"}
              </h3>
            </div>
            <p className="rounded-lg bg-[var(--bg-elevated)] px-3 py-2 font-mono text-xs font-bold text-[var(--text-primary)] border border-[var(--border-subtle)]">
              {project.role[locale]}
            </p>
            <ul className="space-y-2.5 text-[15px] leading-[1.7] text-[var(--text-secondary)]">
              {project.caseStudy.roleDetails.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-violet)]" />
                  <span>{r[locale]}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: 04 Architecture, 05 Implementation, 06 Verification */}
        <div className="lg:col-span-6 space-y-6">
          <section
            id="sec-arch"
            className="surface-panel rounded-2xl p-6 sm:p-7 space-y-4"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[var(--accent-cyan)]">
                <Cpu className="h-4 w-4" />
                <h3>
                  04. Architecture —{" "}
                  {locale === "ko" ? "시스템 아키텍처" : "System Architecture"}
                </h3>
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
            <p className="text-[15px] leading-[1.75] text-[var(--text-secondary)]">
              {project.caseStudy.architecture[locale]}
            </p>

            {/* Connected Visual Pipeline Diagram */}
            <div
              className="space-y-2 pt-2"
              aria-label={
                locale === "ko" ? "아키텍처 단계 흐름도" : "Architecture pipeline flow"
              }
            >
              {project.caseStudy.architectureFlow.map((node, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3.5 py-2.5 font-mono text-xs font-medium text-[var(--text-primary)]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--accent-blue)]/20 text-xs font-extrabold text-[var(--accent-blue)]">
                    0{idx + 1}
                  </span>
                  <span className="flex-1">{node}</span>
                  {idx < project.caseStudy.architectureFlow.length - 1 && (
                    <span className="text-[var(--accent-cyan)] font-bold">
                      ↓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section
            id="sec-impl"
            className="surface-panel rounded-2xl p-6 sm:p-7 space-y-3.5"
          >
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[var(--accent-blue)]">
              <Wrench className="h-4 w-4" />
              <h3>
                05. Implementation —{" "}
                {locale === "ko" ? "핵심 기능 및 구현" : "Implementation Details"}
              </h3>
            </div>
            <ul className="space-y-2.5 text-[15px] leading-[1.7] text-[var(--text-secondary)]">
              {project.caseStudy.implementation.map((imp, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-blue)]" />
                  <span>{imp[locale]}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="sec-verify"
            className="surface-panel rounded-2xl p-6 sm:p-7 space-y-3.5"
          >
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[var(--accent-cyan)]">
              <ShieldCheck className="h-4 w-4" />
              <h3>
                06. Verification —{" "}
                {locale === "ko"
                  ? "테스트 및 실제 검증 결과"
                  : "Verification & Testing"}
              </h3>
            </div>
            <ul className="space-y-2.5 text-[15px] leading-[1.7] text-[var(--text-secondary)]">
              {project.caseStudy.verification.map((ver, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-cyan)]" />
                  <span>{ver[locale]}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* 07 Challenges & 08 Limitations (Spacious 2-Column Layout for Readability) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section
          id="sec-challenges"
          className="surface-panel rounded-2xl p-6 sm:p-7 space-y-3"
        >
          <h3 className="font-mono text-xs font-bold uppercase text-[var(--accent-blue)]">
            07. Challenges —{" "}
            {locale === "ko" ? "실제 문제 해결 사례" : "Engineering Challenges"}
          </h3>
          <div className="space-y-3">
            {project.caseStudy.challenges.map((c, i) => (
              <p
                key={i}
                className="text-[15px] leading-[1.75] text-[var(--text-secondary)]"
              >
                {c[locale]}
              </p>
            ))}
          </div>
        </section>

        <section
          id="sec-limits"
          className="surface-panel rounded-2xl p-6 sm:p-7 space-y-3"
        >
          <h3 className="font-mono text-xs font-bold uppercase text-amber-500 dark:text-amber-400">
            08. Limitations —{" "}
            {locale === "ko"
              ? "현재 한계 및 운영 방식"
              : "Current Scope & Limitations"}
          </h3>
          <div className="space-y-3">
            {project.caseStudy.limitations.map((l, i) => (
              <p
                key={i}
                className="text-[15px] leading-[1.75] text-[var(--text-secondary)]"
              >
                {l[locale]}
              </p>
            ))}
          </div>
        </section>
      </div>

      {/* 09 Links & Access */}
      <section
        id="sec-links"
        className="surface-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div className="space-y-1">
          <h3 className="font-mono text-xs font-bold uppercase text-[var(--accent-cyan)]">
            09. Links & Access —{" "}
            {locale === "ko" ? "저장소 및 실서비스 링크" : "Links & Access"}
          </h3>
          {project.links.length === 0 && (
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {locale === "ko"
                ? "이 프로젝트는 링크21 사내 전용 비공개 시스템으로, 보안 정책에 따라 사내 소스코드 대신 검증 완료된 인터페이스 캡처와 아키텍처 명세를 공개합니다."
                : "This is a private internal enterprise system at Link21. Verified UI captures and architectural specifications are provided in compliance with security policies."}
            </p>
          )}
        </div>

        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-2.5">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5 text-xs font-bold text-[var(--text-primary)] hover:border-[var(--accent-blue)]"
              >
                <span>{link.label[locale]}</span>
                <ExternalLink className="h-3.5 w-3.5 text-[var(--accent-blue)]" />
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Prev / Next Case Study Navigation */}
      <nav
        aria-label={
          locale === "ko"
            ? "이전/다음 프로젝트 이동"
            : "Previous and next project navigation"
        }
        className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2"
      >
        <Link
          href={`/work/${prevProject.slug}`}
          className="surface-panel flex items-center justify-between rounded-2xl p-5 hover:border-[var(--accent-blue)]"
        >
          <div>
            <span className="font-mono text-xs text-[var(--text-muted)]">
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
            <span className="font-mono text-xs text-[var(--text-muted)]">
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
