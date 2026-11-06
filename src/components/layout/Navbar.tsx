"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { assetPath, cn } from "@/lib/utils";
import {
  Cpu,
  Sun,
  Moon,
  Menu,
  X,
  Download,
  Sparkles,
  PauseCircle,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: { ko: "홈", en: "Home" } },
  { href: "/work", label: { ko: "프로젝트", en: "Projects" } },
  { href: "/lab", label: { ko: "아키텍처 랩", en: "Architecture Lab" } },
  { href: "/about", label: { ko: "소개 & 경력", en: "About" } },
  { href: "/contact", label: { ko: "연락처", en: "Contact" } },
];

export function Navbar() {
  const pathname = usePathname();
  const {
    locale,
    setLocale,
    theme,
    toggleTheme,
    reducedMotion,
    toggleReducedMotion,
  } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    const cleanPath = pathname.replace(/^\/kwsahe/, "") || "/";
    if (href === "/") return cleanPath === "/";
    return cleanPath === href || cleanPath.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "backdrop-blur-md bg-[var(--bg-glass)] border-b border-[var(--border-subtle)] shadow-lg"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-lg focus:outline-none"
          aria-label={locale === "ko" ? "권상헌 포트폴리오 홈" : "Sangheon Kwon Portfolio Home"}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6FA8FF] via-[#AB83FF] to-[#25C8BD] text-sm font-bold text-[#070B14] shadow-md transition-transform group-hover:scale-105">
            SH
          </span>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-[var(--text-primary)]">
              {locale === "ko" ? "권상헌" : "Sangheon Kwon"}
            </span>
            <span className="font-mono text-[11px] font-medium tracking-wider text-[var(--accent-blue)]">
              AI SERVICE BACKEND
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label={locale === "ko" ? "주요 내비게이션" : "Primary Navigation"}
          className="hidden md:flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 px-2 py-1"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-[#6FA8FF]/18 text-[var(--accent-blue)] font-semibold border border-[#6FA8FF]/40"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                {item.label[locale]}
              </Link>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div
            role="group"
            aria-label={locale === "ko" ? "언어 선택" : "Language selector"}
            className="flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-0.5 text-xs font-mono"
          >
            <button
              type="button"
              onClick={() => setLocale("ko")}
              aria-pressed={locale === "ko"}
              className={cn(
                "rounded-md px-2 py-1 font-semibold transition-colors cursor-pointer",
                locale === "ko"
                  ? "bg-[var(--accent-blue)] text-[#070B14]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              )}
            >
              KO
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
              className={cn(
                "rounded-md px-2 py-1 font-semibold transition-colors cursor-pointer",
                locale === "en"
                  ? "bg-[var(--accent-blue)] text-[#070B14]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              )}
            >
              EN
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <button
            type="button"
            onClick={toggleReducedMotion}
            aria-pressed={reducedMotion}
            title={
              locale === "ko"
                ? reducedMotion
                  ? "3D 모션 축소 켜짐 (클릭 시 해제)"
                  : "3D 모션 축소 모드 전환"
                : reducedMotion
                  ? "Reduced motion enabled"
                  : "Toggle reduced motion"
            }
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2.5 py-1.5 text-xs font-mono transition-colors cursor-pointer",
              reducedMotion
                ? "text-[var(--accent-cyan)] border-[var(--accent-cyan)]/50"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            )}
          >
            {reducedMotion ? (
              <PauseCircle className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>{reducedMotion ? (locale === "ko" ? "모션축소" : "Low-Motion") : "3D"}</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              locale === "ko"
                ? theme === "dark"
                  ? "라이트 모드로 전환"
                  : "다크 모드로 전환"
                : theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:border-[var(--accent-blue)] cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-[#6FA8FF]" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
            )}
          </button>

          {/* Resume Download (Desktop) */}
          <a
            href={assetPath("/assets/resume-kwon-sangheon.pdf")}
            download={locale === "ko" ? "resume-kwon-sangheon.pdf" : "Resume_Kwon_Sangheon.pdf"}
            className="hidden lg:inline-flex items-center gap-1.5 rounded-lg bg-[#6FA8FF] px-3.5 py-2 text-xs font-bold text-[#070B14] transition-transform hover:scale-[1.02] hover:bg-[#82b4ff]"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{locale === "ko" ? "이력서 PDF" : "Resume PDF"}</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={locale === "ko" ? "메뉴 열기/닫기" : "Toggle navigation menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] md:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label={locale === "ko" ? "모바일 메뉴" : "Mobile Navigation"}
          className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-[#6FA8FF]/15 text-[var(--accent-blue)] font-semibold"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
                  )}
                >
                  {item.label[locale]}
                </Link>
              );
            })}
            <div className="mt-2 flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={toggleReducedMotion}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-mono text-[var(--text-primary)]"
              >
                <Cpu className="h-3.5 w-3.5 text-[var(--accent-cyan)]" />
                <span>
                  {reducedMotion
                    ? locale === "ko"
                      ? "모션 축소: 켜짐"
                      : "Reduced Motion: ON"
                    : locale === "ko"
                      ? "3D 모션: 기본"
                      : "3D Motion: ON"}
                </span>
              </button>
              <a
                href={assetPath("/assets/resume-kwon-sangheon.pdf")}
                download="resume-kwon-sangheon.pdf"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#6FA8FF] px-3.5 py-2 text-xs font-bold text-[#070B14]"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{locale === "ko" ? "이력서 PDF 다운로드" : "Download Resume PDF"}</span>
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
