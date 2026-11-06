"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  PROJECTS_DATA,
  ProjectCategory,
  ProjectStatus,
} from "@/data/portfolio-data";
import { useAppStore } from "@/store/useAppStore";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/utils";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const CATEGORIES: Array<"All" | ProjectCategory> = [
  "All",
  "Production",
  "Internal AI",
  "AI / RAG",
  "Data & Analytics",
  "Automation",
  "Experimental",
];

const STATUSES: Array<"All" | ProjectStatus> = [
  "All",
  "Live Production",
  "Internal Tool",
  "Prototype",
  "Research / Experimental",
  "Archived",
];

const POPULAR_TECH = [
  "All",
  "FastAPI",
  "Next.js",
  "React 19",
  "Three.js",
  "Cloudflare",
  "Claude",
  "OpenAI",
  "ChromaDB",
  "SQLite",
  "Supabase",
  "Pytest",
  "Vitest",
];

function WorkUrlParamSync({
  onTech,
  onCategory,
}: {
  onTech: (t: string) => void;
  onCategory: (c: ProjectCategory) => void;
}) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const techParam = searchParams.get("tech");
    const catParam = searchParams.get("category") as ProjectCategory | null;
    if (techParam) {
      onTech(techParam);
    }
    if (catParam && CATEGORIES.includes(catParam)) {
      onCategory(catParam);
    }
  }, [searchParams, onTech, onCategory]);
  return null;
}

export default function WorkPage() {
  const { locale } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | ProjectCategory
  >("All");
  const [selectedStatus, setSelectedStatus] = useState<"All" | ProjectStatus>(
    "All"
  );
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "status" | "name">(
    "featured"
  );
  const [mobileAdvancedOpen, setMobileAdvancedOpen] = useState<boolean>(false);

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedStatus !== "All" ? 1 : 0) +
    (selectedTech !== "All" ? 1 : 0) +
    (searchQuery.trim().length > 0 ? 1 : 0);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = PROJECTS_DATA.filter((project) => {
      if (
        selectedCategory !== "All" &&
        !project.categories.includes(selectedCategory)
      ) {
        return false;
      }

      if (selectedStatus !== "All" && project.status !== selectedStatus) {
        return false;
      }

      if (selectedTech !== "All") {
        const needle = selectedTech.toLowerCase();
        const matchesTech = project.techStack.some((t) =>
          t.toLowerCase().includes(needle)
        );
        if (!matchesTech) return false;
      }

      if (q) {
        const hay = [
          project.name,
          project.slug,
          project.title.ko,
          project.title.en,
          project.oneLiner.ko,
          project.oneLiner.en,
          project.role.ko,
          project.role.en,
          ...project.techStack,
          ...project.keyMetrics.map((m) => `${m.ko} ${m.en}`),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });

    const statusOrder: Record<ProjectStatus, number> = {
      "Live Production": 1,
      "Internal Tool": 2,
      Prototype: 3,
      "Research / Experimental": 4,
      Archived: 5,
    };

    return [...list].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "status") {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      const fa = a.featuredOrder ?? 99;
      const fb = b.featuredOrder ?? 99;
      return fa - fb;
    });
  }, [selectedCategory, selectedStatus, selectedTech, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSelectedTech("All");
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      <Suspense fallback={null}>
        <WorkUrlParamSync
          onTech={setSelectedTech}
          onCategory={setSelectedCategory}
        />
      </Suspense>

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[var(--border-subtle)] pb-6 lg:flex-row lg:items-end">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)]">
            SYSTEM ATLAS · COMPLETE ENGINEERING ARCHIVE (14 PROJECTS)
          </span>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {locale === "ko"
              ? "전체 프로젝트 아틀라스"
              : "Engineering Projects Atlas"}
          </h1>
          <p className="mt-2 max-w-3xl text-sm sm:text-base text-[var(--text-secondary)]">
            {locale === "ko"
              ? "상용 프로덕션 웹서비스, 사내 19명 AI 직원 시스템, 공공입찰 자동화 도구, 3-CLI 코딩 오케스트레이션, 법령 이중 RAG 및 데이터 분석 프로젝트 14종을 카테고리·운영 상태·기술 스택별로 비교해 보세요."
              : "Filter and compare all 14 verified projects across Live Production, Internal AI Tools, RAG/Multi-Agent systems, and Data/ML pipelines."}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start lg:self-auto rounded-full border border-[var(--accent-cyan)]/35 bg-[var(--accent-cyan)]/10 px-3.5 py-1.5 font-mono text-xs font-bold text-[var(--accent-cyan)]">
          <span>
            {locale === "ko"
              ? `표시 중: ${filteredProjects.length} / 전체 ${PROJECTS_DATA.length}개`
              : `Showing ${filteredProjects.length} of ${PROJECTS_DATA.length} projects`}
          </span>
        </div>
      </div>

      {/* Filter & Search Control Panel */}
      <section
        aria-label={
          locale === "ko"
            ? "프로젝트 검색 및 필터"
            : "Project search and filters"
        }
        className="surface-panel rounded-2xl p-4 sm:p-6 space-y-4"
      >
        {/* Search + Sort Row */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="relative md:col-span-8">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                locale === "ko"
                  ? "프로젝트 이름, 기술 스택(FastAPI, Cloudflare, RAG...), 검증 지표 검색..."
                  : "Search by project name, tech stack (FastAPI, Cloudflare, RAG...), or metrics..."
              }
              aria-label={
                locale === "ko" ? "프로젝트 검색어 입력" : "Search projects"
              }
              className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] pl-10 pr-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-blue)] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 md:col-span-4">
            <SlidersHorizontal
              className="h-4 w-4 shrink-0 text-[var(--text-muted)]"
              aria-hidden="true"
            />
            <label htmlFor="project-sort" className="sr-only">
              {locale === "ko" ? "정렬 기준" : "Sort by"}
            </label>
            <select
              id="project-sort"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "featured" | "status" | "name")
              }
              className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2.5 text-xs font-mono font-semibold text-[var(--text-primary)]"
            >
              <option value="featured">
                {locale === "ko"
                  ? "정렬: 대표 우선순위"
                  : "Sort: Featured Priority"}
              </option>
              <option value="status">
                {locale === "ko"
                  ? "정렬: 실서비스/운영 상태순"
                  : "Sort: Operational Status"}
              </option>
              <option value="name">
                {locale === "ko" ? "정렬: 이름순 (A-Z)" : "Sort: Name (A-Z)"}
              </option>
            </select>

            <button
              type="button"
              data-testid="reset-filters-btn"
              onClick={resetFilters}
              aria-label={locale === "ko" ? "필터 초기화" : "Reset filters"}
              title={locale === "ko" ? "필터 초기화" : "Reset filters"}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2.5 text-xs font-mono font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {locale === "ko" ? "초기화" : "Reset"}
              </span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs (Always Visible) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              {locale === "ko" ? "카테고리 (Category)" : "Category"}
            </span>
            <button
              type="button"
              onClick={() => setMobileAdvancedOpen((o) => !o)}
              aria-expanded={mobileAdvancedOpen}
              className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[var(--accent-blue)] md:hidden cursor-pointer"
            >
              <span>
                {locale === "ko"
                  ? `상세 필터 (${selectedStatus !== "All" || selectedTech !== "All" ? "적용 중" : "운영 상태 · 기술 스택"})`
                  : "More Filters (Status & Tech)"}
              </span>
              {mobileAdvancedOpen ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={cn(
                  "rounded-lg border px-3 py-1.5 font-mono text-xs transition-all cursor-pointer",
                  selectedCategory === cat
                    ? "border-[var(--accent-blue)] bg-[#6FA8FF] text-[#070B14] font-bold shadow-sm"
                    : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Status & Tech Filter Row (Always visible on md+, collapsible on mobile) */}
        <div
          className={cn(
            "grid-cols-1 gap-4 pt-1 lg:grid-cols-2",
            mobileAdvancedOpen ? "grid" : "hidden md:grid"
          )}
        >
          <div className="space-y-1.5">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              {locale === "ko"
                ? "실제 운영 상태 (Operational Status)"
                : "Operational Status"}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  aria-pressed={selectedStatus === st}
                  className={cn(
                    "rounded-lg border px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer",
                    selectedStatus === st
                      ? "border-[var(--accent-cyan)] bg-[#25C8BD]/20 text-[var(--accent-cyan)] font-bold"
                      : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              {locale === "ko" ? "주요 기술 스택 (Tech Stack)" : "Tech Stack"}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_TECH.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setSelectedTech(tech)}
                  aria-pressed={selectedTech === tech}
                  className={cn(
                    "rounded-lg border px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer",
                    selectedTech === tech
                      ? "border-[var(--accent-violet)] bg-[#AB83FF]/20 text-[var(--accent-violet)] font-bold"
                      : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filter Summary Bar */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-subtle)] pt-3 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[var(--text-muted)]">
                {locale === "ko" ? "활성 필터:" : "Active filters:"}
              </span>
              {selectedCategory !== "All" && (
                <span className="rounded-md bg-[var(--accent-blue)]/15 px-2 py-0.5 font-bold text-[var(--accent-blue)]">
                  Category: {selectedCategory}
                </span>
              )}
              {selectedStatus !== "All" && (
                <span className="rounded-md bg-[var(--accent-cyan)]/15 px-2 py-0.5 font-bold text-[var(--accent-cyan)]">
                  Status: {selectedStatus}
                </span>
              )}
              {selectedTech !== "All" && (
                <span className="rounded-md bg-[var(--accent-violet)]/15 px-2 py-0.5 font-bold text-[var(--accent-violet)]">
                  Tech: {selectedTech}
                </span>
              )}
              {searchQuery.trim() && (
                <span className="rounded-md bg-[var(--bg-elevated)] px-2 py-0.5 font-bold text-[var(--text-primary)]">
                  &ldquo;{searchQuery.trim()}&rdquo;
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="font-bold text-[var(--accent-blue)] hover:underline cursor-pointer"
            >
              {locale === "ko" ? "모두 해제" : "Clear all"}
            </button>
          </div>
        )}
      </section>

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div className="surface-panel rounded-2xl p-12 text-center space-y-3">
          <p className="text-base font-bold text-[var(--text-primary)]">
            {locale === "ko"
              ? "선택한 조건과 일치하는 프로젝트가 없습니다."
              : "No projects match the selected filters."}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#6FA8FF] px-4 py-2.5 text-xs font-bold text-[#070B14] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>
              {locale === "ko" ? "전체 프로젝트 보기" : "Reset All Filters"}
            </span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
