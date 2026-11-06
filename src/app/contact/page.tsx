"use client";

import React from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { PROFILE_DATA, PROJECTS_DATA } from "@/data/portfolio-data";
import { assetPath } from "@/lib/utils";
import {
  Mail,
  GitBranch as Github,
  Download,
  ExternalLink,
  ArrowRight,
  MapPin,
  Briefcase,
  Cpu,
} from "lucide-react";

export default function ContactPage() {
  const { locale } = useAppStore();

  const liveProjects = PROJECTS_DATA.filter((p) => p.links.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="surface-panel rounded-3xl p-8 sm:p-12 space-y-6">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)]">
          DIRECT CONTACT & VERIFIED CHANNELS
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl">
          {locale === "ko"
            ? "데이터와 AI가 실제 프로덕션에서 작동하는 지점을 만듭니다."
            : "Building where AI architecture meets production reliability."}
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-[var(--text-secondary)]">
          {locale === "ko"
            ? "AI 서비스 백엔드 엔지니어 · AI 엔지니어 · 풀스택 개발자 포지션 제안, 기술 인터뷰, 프로젝트 협업 문의는 아래 이메일·GitHub·이력서 채널로 연락해 주세요."
            : "For AI Service Backend Engineer, AI Engineer, or Full-stack Developer opportunities and technical discussions, reach out directly via Email, GitHub, or Resume PDF."}
        </p>

        {/* Primary Contact Cards */}
        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={`mailto:${PROFILE_DATA.email}`}
            className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 transition-all hover:border-[var(--accent-blue)]"
          >
            <Mail className="h-5 w-5 text-[var(--accent-blue)]" />
            <div className="mt-4">
              <div className="font-mono text-xs text-[var(--text-muted)]">
                EMAIL
              </div>
              <div className="mt-1 font-mono text-sm font-bold text-[var(--text-primary)] break-all">
                {PROFILE_DATA.email}
              </div>
            </div>
          </a>

          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 transition-all hover:border-[var(--accent-blue)]"
          >
            <Github className="h-5 w-5 text-[var(--accent-violet)]" />
            <div className="mt-4">
              <div className="font-mono text-xs text-[var(--text-muted)]">
                GITHUB
              </div>
              <div className="mt-1 font-mono text-sm font-bold text-[var(--text-primary)]">
                github.com/kwsahe ↗
              </div>
            </div>
          </a>

          <Link
            href="/lab"
            className="flex flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 transition-all hover:border-[var(--accent-cyan)]"
          >
            <Cpu className="h-5 w-5 text-[var(--accent-cyan)]" />
            <div className="mt-4">
              <div className="font-mono text-xs text-[var(--text-muted)]">
                ARCHITECTURE LAB
              </div>
              <div className="mt-1 font-mono text-sm font-bold text-[var(--text-primary)]">
                {locale === "ko"
                  ? "6대 AI 시스템 그래프 탐색 →"
                  : "Explore 6 AI System Graphs →"}
              </div>
            </div>
          </Link>

          <a
            href={assetPath(PROFILE_DATA.resumePdf)}
            download={
              locale === "ko"
                ? "resume-kwon-sangheon.pdf"
                : "Resume_Kwon_Sangheon.pdf"
            }
            className="flex flex-col justify-between rounded-2xl bg-[#6FA8FF] p-5 text-[#070B14] transition-transform hover:scale-[1.02]"
          >
            <Download className="h-5 w-5" />
            <div className="mt-4">
              <div className="font-mono text-xs font-bold opacity-80">
                RESUME PDF
              </div>
              <div className="mt-1 text-sm font-extrabold">
                {locale === "ko"
                  ? "이력서 PDF 다운로드"
                  : "Download Resume PDF"}
              </div>
            </div>
          </a>
        </div>

        {/* Work Preferences */}
        <div className="grid grid-cols-1 gap-3 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-3 text-xs">
          <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
            <Briefcase className="h-4 w-4 text-[var(--accent-blue)]" />
            <span>
              <strong className="text-[var(--text-primary)]">
                {locale === "ko" ? "지원 직무:" : "Target Roles:"}
              </strong>{" "}
              AI Service Backend · AI Engineer · Full-stack
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
            <MapPin className="h-4 w-4 text-[var(--accent-cyan)]" />
            <span>
              <strong className="text-[var(--text-primary)]">
                {locale === "ko" ? "희망 근무지:" : "Location:"}
              </strong>{" "}
              {locale === "ko" ? "서울 · 경기 전지역" : "Seoul & Gyeonggi, Korea"}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
            <span className="h-2 w-2 rounded-full bg-[#25C8BD]" />
            <span>
              <strong className="text-[var(--text-primary)]">
                {locale === "ko" ? "현재 상태:" : "Current Status:"}
              </strong>{" "}
              {PROFILE_DATA.currentCompany[locale]}
            </span>
          </div>
        </div>
      </div>

      {/* Verified Live Services & Repositories Directory */}
      <section aria-labelledby="verified-links-heading" className="space-y-5">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-cyan)]">
            VERIFIED PRODUCTION & OPEN-SOURCE LINKS
          </span>
          <h2
            id="verified-links-heading"
            className="mt-1 text-2xl font-extrabold text-[var(--text-primary)]"
          >
            {locale === "ko"
              ? "주요 프로젝트 실서비스 및 GitHub 저장소 바로가기"
              : "Verified Live Deployments & GitHub Repositories"}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {liveProjects.map((project) => (
            <div
              key={project.slug}
              className="surface-panel flex flex-col justify-between rounded-2xl p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {project.name}
                  </h3>
                  <span className="font-mono text-[11px] text-[var(--accent-cyan)]">
                    {project.status}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-[var(--text-secondary)]">
                  {project.oneLiner[locale]}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-subtle)] pt-3">
                <div className="flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-[var(--bg-elevated)] px-2.5 py-1.5 font-mono text-xs font-semibold text-[var(--accent-blue)] hover:underline"
                    >
                      <span>{link.label[locale]}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <span>Case Study</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
