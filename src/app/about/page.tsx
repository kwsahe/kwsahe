"use client";

import React from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import {
  PROFILE_DATA,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  CERTIFICATES_DATA,
  SKILL_GROUPS,
  getProjectBySlug,
} from "@/data/portfolio-data";
import { assetPath } from "@/lib/utils";
import {
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Download,
  Mail,
  GitBranch as Github,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const DEV_PROCESS_STEPS = [
  {
    step: "01",
    title: {
      ko: "문제 정의 & 도메인 규칙 분리",
      en: "Problem Definition & Deterministic Rule Separation",
    },
    desc: {
      ko: "LLM에게 모든 판단을 맡기지 않고, 자격 요건·분량 제한·조문 번호처럼 결정형 규칙으로 판정해야 할 영역과 생성·요약 영역을 먼저 분리합니다.",
      en: "Separates deterministic compliance rules (eligibility, syllable caps, statutory headers) from generative LLM tasks before writing prompts.",
    },
  },
  {
    step: "02",
    title: {
      ko: "격리된 실행 & 체크포인트 아키텍처",
      en: "Isolated Execution & Checkpoint Architecture",
    },
    desc: {
      ko: "D1 단계별 결과 저장 및 요약 맥락 전달(JARVIS), 세션별 git worktree 격리(TriAgent), 원문 쪽 번호 보존 파싱(BidPilot)으로 중단과 오염에 강한 파이프라인을 구축합니다.",
      en: "Designs resilient pipelines with D1 checkpointing (JARVIS), per-session git worktrees (TriAgent), and page-preserving document parsers (BidPilot).",
    },
  },
  {
    step: "03",
    title: {
      ko: "점수와 분리된 검증 게이트 & 회귀 테스트",
      en: "Independent Validation Gates & Regression Suites",
    },
    desc: {
      ko: "게시 가능 판정(Publish Gate), 출처 검증기(CitationValidator), 자동 시험 스위트(BidPilot 2,659개, JARVIS 1,144개, AI Hub 515개, TriAgent 384개)로 실제 품질을 증명합니다.",
      en: "Verifies outputs via independent Publish Gates, regex Citation Validators, and thousands of automated regression tests.",
    },
  },
  {
    step: "04",
    title: {
      ko: "프로덕션 배포 & 지속적 오탐 개선",
      en: "Production Deployment & Continuous False-Positive Tuning",
    },
    desc: {
      ko: "Cloudflare Workers·Vercel·GitHub Actions에 배포한 뒤 실제 행사·공고·시세 데이터에서 발견된 오탐을 재현 테스트와 함께 수정해 운영에 반영합니다.",
      en: "Deploys to Cloudflare Workers, Vercel, and GitHub Actions, turning real-world edge cases into permanent regression tests.",
    },
  },
];

export default function AboutPage() {
  const { locale } = useAppStore();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-16">
      {/* ════════════ PROFILE & CORE BIO ════════════ */}
      <section
        aria-labelledby="about-heading"
        className="grid grid-cols-1 gap-8 lg:grid-cols-12"
      >
        {/* Left Profile Card */}
        <aside className="lg:col-span-4 surface-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <img
                src={assetPath(PROFILE_DATA.avatar)}
                alt={
                  locale === "ko"
                    ? "권상헌 프로필 사진"
                    : "Sangheon Kwon Profile Photo"
                }
                className="h-24 w-24 rounded-2xl object-cover border-2 border-[var(--accent-blue)] shadow-lg"
              />
              <div>
                <span className="rounded-md bg-[#25C8BD]/15 px-2 py-0.5 font-mono text-[11px] font-bold text-[#25C8BD]">
                  {locale === "ko" ? "링크21 재직 중" : "At Link21 Inc."}
                </span>
                <h1
                  id="about-heading"
                  className="mt-1 text-2xl font-extrabold text-[var(--text-primary)]"
                >
                  {PROFILE_DATA.name[locale]}
                </h1>
                <p className="font-mono text-xs font-semibold text-[var(--accent-blue)]">
                  {PROFILE_DATA.primaryRole}
                </p>
              </div>
            </div>

            <dl className="space-y-3 border-t border-[var(--border-subtle)] pt-4 text-xs">
              <div className="flex justify-between gap-2">
                <dt className="text-[var(--text-muted)]">
                  {locale === "ko" ? "현재 소속" : "Affiliation"}
                </dt>
                <dd className="font-semibold text-[var(--text-primary)] text-right">
                  {PROFILE_DATA.currentCompany[locale]}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[var(--text-muted)]">
                  {locale === "ko" ? "생년월일" : "Birth Date"}
                </dt>
                <dd className="font-mono text-[var(--text-primary)]">
                  {PROFILE_DATA.birthDate}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[var(--text-muted)]">
                  {locale === "ko" ? "병역" : "Military"}
                </dt>
                <dd className="text-[var(--text-primary)] text-right">
                  {PROFILE_DATA.military[locale]}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[var(--text-muted)]">
                  {locale === "ko" ? "이메일" : "Email"}
                </dt>
                <dd className="font-mono text-[var(--accent-blue)]">
                  <a href={`mailto:${PROFILE_DATA.email}`}>
                    {PROFILE_DATA.email}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[var(--text-muted)]">GitHub</dt>
                <dd className="font-mono text-[var(--accent-blue)]">
                  <a
                    href={PROFILE_DATA.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/kwsahe ↗
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 flex flex-col gap-2.5 pt-4 border-t border-[var(--border-subtle)]">
            <a
              href={assetPath(PROFILE_DATA.resumePdf)}
              download="resume-kwon-sangheon.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6FA8FF] px-4 py-2.5 text-xs font-bold text-[#070B14] hover:bg-[#84b5ff]"
            >
              <Download className="h-4 w-4" />
              <span>
                {locale === "ko" ? "이력서 PDF 다운로드" : "Download Resume PDF"}
              </span>
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-blue)]"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Email</span>
              </a>
              <a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-blue)]"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Right Narrative & Engineering Domains */}
        <div className="lg:col-span-8 surface-panel rounded-3xl p-6 sm:p-10 space-y-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)]">
              ABOUT · AI SERVICE BACKEND & FULL-STACK ENGINEER
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl">
              {PROFILE_DATA.aboutNarrative[0][locale]}
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
            <p>{PROFILE_DATA.aboutNarrative[1][locale]}</p>
            <p>{PROFILE_DATA.aboutNarrative[2][locale]}</p>
          </div>

          {/* 3 Engineering Focus Cards */}
          <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
              <div className="font-mono text-xs font-bold text-[var(--accent-blue)]">
                AI SYSTEM ARCHITECTURE
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                {locale === "ko"
                  ? "19명 AI 에이전트 체인(JARVIS), 3-CLI 역할 분리(TriAgent), 이중 ChromaDB 법령 RAG(K-Safety), 의도 라우팅 챗봇(링키)"
                  : "19-agent chain (JARVIS), 3-CLI role isolation (TriAgent), dual ChromaDB legal RAG (K-Safety), and intent-routed chatbot."}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
              <div className="font-mono text-xs font-bold text-[var(--accent-cyan)]">
                BACKEND & DATA PIPELINES
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                {locale === "ko"
                  ? "FastAPI 17개 API, Cloudflare Workers + D1 분산 SQL, 다나와 5.8만 건 수집·로그 가격 ML 예측(R² 0.78), 공공 API 5종 ETL"
                  : "FastAPI backends, Cloudflare Workers + D1, 57.6k-row daily hardware ETL + log-price ML (R² 0.78), and 5-API public data pipelines."}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
              <div className="font-mono text-xs font-bold text-[var(--accent-violet)]">
                FULL-STACK & PRODUCTION QA
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                {locale === "ko"
                  ? "Next.js 16 + React 19 + Three.js 상용 서비스 구축·운영 및 4,700개 이상의 단위·통합·렌더·회귀 테스트 검증"
                  : "Next.js 16 + React 19 + Three.js production web platforms backed by 4,700+ automated unit, integration, and render tests."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ EXPERIENCE TIMELINE ════════════ */}
      <section aria-labelledby="experience-heading" className="space-y-6">
        <div className="flex items-center gap-2.5">
          <Briefcase className="h-5 w-5 text-[var(--accent-blue)]" />
          <h2
            id="experience-heading"
            className="text-2xl font-extrabold text-[var(--text-primary)]"
          >
            {locale === "ko" ? "경력 타임라인 (Experience)" : "Professional Experience"}
          </h2>
        </div>

        <div className="space-y-6">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <article
              key={idx}
              className="surface-panel rounded-3xl p-6 sm:p-8 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      {exp.company[locale]}
                    </h3>
                    {exp.isCurrent && (
                      <span className="rounded-full bg-[#25C8BD]/15 px-2.5 py-0.5 font-mono text-xs font-bold text-[#25C8BD]">
                        {locale === "ko" ? "재직 중" : "Current"}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-xs font-semibold text-[var(--accent-blue)]">
                    {exp.role[locale]}
                  </p>
                </div>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {exp.period[locale]}
                </span>
              </div>

              <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--accent-cyan)]" />
                    <span className="leading-relaxed">{b[locale]}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ════════════ TECH STACK CONNECTED TO PROJECTS ════════════ */}
      <section aria-labelledby="skills-heading" className="space-y-6">
        <div>
          <div className="flex items-center gap-2.5">
            <Code2 className="h-5 w-5 text-[var(--accent-violet)]" />
            <h2
              id="skills-heading"
              className="text-2xl font-extrabold text-[var(--text-primary)]"
            >
              {locale === "ko"
                ? "기술 스택 & 실제 적용 프로젝트 매핑"
                : "Tech Stack Mapped to Verified Projects"}
            </h2>
          </div>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {locale === "ko"
              ? "단순 기술 나열이 아닌, 각 기술을 실제로 사용해 구현·검증한 프로젝트 케이스 스터디로 바로 이동할 수 있습니다."
              : "Every technology below links directly to the actual project case studies where it was engineered and verified."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <article
              key={group.id}
              className="surface-panel rounded-3xl p-6 space-y-4"
            >
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {group.title[locale]}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {group.summary[locale]}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-3.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--accent-blue)]">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--text-muted)]">
                        {skill.relatedProjects.length}{" "}
                        {locale === "ko" ? "개 프로젝트" : "projects"}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {skill.relatedProjects.map((slug) => {
                        const proj = getProjectBySlug(slug);
                        return (
                          <Link
                            key={slug}
                            href={`/work/${slug}`}
                            className="inline-flex items-center gap-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
                          >
                            <span>{proj ? proj.name : slug}</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ════════════ EDUCATION & CERTIFICATES ════════════ */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Education */}
        <section
          aria-labelledby="edu-heading"
          className="lg:col-span-7 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <GraduationCap className="h-5 w-5 text-[var(--accent-blue)]" />
            <h2
              id="edu-heading"
              className="text-xl font-extrabold text-[var(--text-primary)]"
            >
              {locale === "ko" ? "학력 및 교육 (Education)" : "Education & Training"}
            </h2>
          </div>

          <div className="space-y-4">
            {EDUCATION_DATA.map((edu, idx) => (
              <article
                key={idx}
                className="surface-panel rounded-2xl p-5 space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {edu.institution[locale]}
                  </h3>
                  <span className="font-mono text-xs text-[var(--accent-cyan)]">
                    {edu.period[locale]}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[var(--accent-blue)]">
                  {edu.program[locale]}
                </p>
                <ul className="space-y-1 text-xs text-[var(--text-secondary)]">
                  {edu.bullets.map((b, i) => (
                    <li key={i}>• {b[locale]}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section
          aria-labelledby="cert-heading"
          className="lg:col-span-5 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <Award className="h-5 w-5 text-[var(--accent-cyan)]" />
            <h2
              id="cert-heading"
              className="text-xl font-extrabold text-[var(--text-primary)]"
            >
              {locale === "ko" ? "자격증 (Certifications)" : "Certifications"}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {CERTIFICATES_DATA.map((cert) => (
              <article
                key={cert.date + cert.badge}
                className="surface-panel flex items-center justify-between rounded-2xl p-4"
              >
                <div>
                  <span className="font-mono text-xs text-[var(--accent-cyan)]">
                    {cert.date}
                  </span>
                  <h3 className="mt-0.5 text-sm font-bold text-[var(--text-primary)]">
                    {cert.name[locale]}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {cert.issuer[locale]}
                  </p>
                </div>
                <span className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-xs font-bold text-[var(--accent-blue)]">
                  {cert.badge}
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* ════════════ ENGINEERING PROCESS ════════════ */}
      <section aria-labelledby="process-heading" className="space-y-5">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-cyan)]">
            HOW I ENGINEER AI SYSTEMS
          </span>
          <h2
            id="process-heading"
            className="mt-1 text-2xl font-extrabold text-[var(--text-primary)]"
          >
            {locale === "ko"
              ? "설계부터 운영까지의 4단계 개발 프로세스"
              : "4-Stage Engineering Process"}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEV_PROCESS_STEPS.map((p) => (
            <div
              key={p.step}
              className="surface-panel rounded-2xl p-5 space-y-2.5"
            >
              <span className="inline-block rounded-md bg-[#6FA8FF]/15 px-2.5 py-1 font-mono text-xs font-bold text-[var(--accent-blue)]">
                STEP {p.step}
              </span>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {p.title[locale]}
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                {p.desc[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
