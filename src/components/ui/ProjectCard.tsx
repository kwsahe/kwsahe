"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProjectData, ProjectStatus } from "@/data/portfolio-data";
import { useAppStore } from "@/store/useAppStore";
import { ScreenshotCarousel } from "./ScreenshotCarousel";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ExternalLink,
  Lock,
  Network,
  CheckCircle2,
} from "lucide-react";

const STATUS_STYLE: Record<ProjectStatus, string> = {
  "Live Production":
    "bg-[#25C8BD]/15 text-[var(--accent-cyan)] border-[#25C8BD]/40",
  "Internal Tool":
    "bg-[#6FA8FF]/15 text-[var(--accent-blue)] border-[#6FA8FF]/40",
  Prototype:
    "bg-[#AB83FF]/15 text-[var(--accent-violet)] border-[#AB83FF]/40",
  "Research / Experimental":
    "bg-amber-500/15 text-amber-500 dark:text-amber-300 border-amber-500/40",
  Archived:
    "bg-slate-400/15 text-[var(--text-muted)] border-slate-400/35",
};

interface ProjectCardProps {
  project: ProjectData;
  priority?: boolean;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { locale, reducedMotion } = useAppStore();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (
      reducedMotion ||
      typeof window === "undefined" ||
      window.innerWidth < 1024
    ) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Number((-y * 3.5).toFixed(2)),
      ry: Number((x * 3.5).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const visibleTech = project.techStack.slice(0, 6);
  const extraTechCount = Math.max(project.techStack.length - 6, 0);

  return (
    <article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        tilt.rx !== 0 || tilt.ry !== 0
          ? {
              transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            }
          : undefined
      }
      className="surface-panel flex h-full flex-col justify-between rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:border-[var(--border-strong)]"
    >
      <div>
        {/* 1. Top Status & Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold",
              STATUS_STYLE[project.status]
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {project.status}
          </span>

          <div className="flex items-center gap-1.5">
            {project.labSystemId && (
              <Link
                href={`/lab?system=${project.labSystemId}`}
                className="inline-flex items-center gap-1 rounded-md border border-[var(--accent-violet)]/40 bg-[var(--accent-violet)]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent-violet)] hover:bg-[var(--accent-violet)]/20"
              >
                <Network className="h-3 w-3" aria-hidden="true" />
                <span>3D Lab</span>
              </Link>
            )}
            {project.isPrivateRepo && (
              <span className="inline-flex items-center gap-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-muted)]">
                <Lock className="h-3 w-3" aria-hidden="true" />
                <span>Private</span>
              </span>
            )}
          </div>
        </div>

        {/* 2. Project Name, Operational Badge & Problem/Solution Summary */}
        <div className="mt-3.5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
            <h3 className="text-xl font-extrabold tracking-tight text-[var(--text-primary)]">
              <Link
                href={`/work/${project.slug}`}
                className="hover:text-[var(--accent-blue)] focus:outline-none"
              >
                {project.name}
              </Link>
            </h3>
            <span className="font-mono text-xs font-medium text-[var(--accent-blue)]">
              {project.statusBadge[locale]}
            </span>
          </div>
          <p className="mt-2 line-clamp-3 min-h-[4.2rem] text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
            {project.oneLiner[locale]}
          </p>
        </div>

        {/* 3. Screenshot Carousel */}
        <div className="mt-4">
          <ScreenshotCarousel
            slides={project.slides}
            projectName={project.name}
          />
        </div>

        {/* 4. Verified Engineering Metrics */}
        <ul
          className="mt-4 space-y-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-3.5 text-xs"
          aria-label={
            locale === "ko" ? "핵심 검증 지표" : "Verified Engineering Metrics"
          }
        >
          {project.keyMetrics.map((m, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 font-mono font-medium text-[var(--text-primary)]"
            >
              <CheckCircle2
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-cyan)]"
                aria-hidden="true"
              />
              <span>{m[locale]}</span>
            </li>
          ))}
        </ul>

        {/* 5. Role */}
        <p className="mt-3.5 text-xs sm:text-[13px] text-[var(--text-muted)]">
          <strong className="font-semibold text-[var(--text-primary)]">
            {locale === "ko" ? "담당 역할:" : "Role:"}
          </strong>{" "}
          {project.role[locale]}
        </p>

        {/* 6. Prioritized Tech Stack Pills */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-0.5 font-mono text-xs text-[var(--text-secondary)]"
            >
              {tech}
            </span>
          ))}
          {extraTechCount > 0 && (
            <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--accent-blue)]">
              +{extraTechCount}
            </span>
          )}
        </div>
      </div>

      {/* 7. Bottom Action Bar */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-subtle)] pt-4">
        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#6FA8FF] px-4 py-2 text-xs font-bold text-[#070B14] transition-transform hover:scale-[1.02] hover:bg-[#86b6ff]"
        >
          <span>
            {locale === "ko" ? "케이스 스터디 상세 보기" : "Read Case Study"}
          </span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-blue)]"
            >
              <span>{link.label[locale]}</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
