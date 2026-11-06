"use client";

import React from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { PROFILE_DATA } from "@/data/portfolio-data";
import { assetPath } from "@/lib/utils";
import { GitBranch as Github, Mail, FileText, ArrowUpRight } from "lucide-react";

export function Footer() {
  const locale = useAppStore((s) => s.locale);

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 py-12 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6FA8FF] to-[#AB83FF] text-xs font-bold text-[#070B14]">
                SH
              </span>
              <span className="text-base font-bold text-[var(--text-primary)]">
                {PROFILE_DATA.name[locale]}
              </span>
            </div>
            <p className="mt-2 font-mono text-xs text-[var(--accent-blue)]">
              {PROFILE_DATA.primaryRole} · {PROFILE_DATA.tagline}
            </p>
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              {PROFILE_DATA.currentCompany[locale]}
            </p>
          </div>

          {/* Quick Routes */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              {locale === "ko" ? "사이트 맵 (System Atlas)" : "Navigation"}
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-[var(--text-muted)]">
              <li>
                <Link href="/" className="hover:text-[var(--accent-blue)]">
                  {locale === "ko" ? "홈 (Nexus Core)" : "Home (Nexus Core)"}
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[var(--accent-blue)]">
                  {locale === "ko" ? "전체 프로젝트 (14)" : "All Projects (14)"}
                </Link>
              </li>
              <li>
                <Link href="/lab" className="hover:text-[var(--accent-blue)]">
                  {locale === "ko" ? "아키텍처 랩 (3D/2D)" : "Architecture Lab"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--accent-blue)]">
                  {locale === "ko" ? "소개 & 경력" : "About & Experience"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--accent-blue)]">
                  {locale === "ko" ? "연락처 & 이력서" : "Contact & Resume"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Links */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              {locale === "ko" ? "검증된 외부 링크" : "Verified Channels"}
            </h3>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-blue)]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{PROFILE_DATA.email}</span>
              </a>
              <a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-blue)]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>github.com/kwsahe</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={assetPath(PROFILE_DATA.resumePdf)}
                download="resume-kwon-sangheon.pdf"
                className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-blue)]"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>
                  {locale === "ko" ? "이력서 PDF 다운로드" : "Download Resume PDF"}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row">
          <p>
            © {new Date().getFullYear()} {PROFILE_DATA.name[locale]}.{" "}
            {locale === "ko"
              ? "NEXUS CORE × SYSTEM ATLAS × OPS COMMAND 아키텍처로 구현되었습니다."
              : "Engineered with NEXUS CORE × SYSTEM ATLAS × OPS COMMAND."}
          </p>
          <a
            href="#main"
            className="font-mono text-xs text-[var(--accent-blue)] hover:underline"
          >
            {locale === "ko" ? "맨 위로 ↑" : "Back to Top ↑"}
          </a>
        </div>
      </div>
    </footer>
  );
}
