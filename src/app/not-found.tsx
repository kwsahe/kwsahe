"use client";

import React from "react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { ArrowLeft, Compass, Network } from "lucide-react";

export default function NotFound() {
  const { locale } = useAppStore();

  return (
    <div className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="surface-panel rounded-3xl p-8 sm:p-12 space-y-6 w-full">
        <span className="inline-block rounded-full border border-[#6FA8FF]/40 bg-[#6FA8FF]/15 px-3.5 py-1 font-mono text-xs font-bold text-[#6FA8FF]">
          HTTP 404 · ROUTE NOT FOUND
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          {locale === "ko"
            ? "요청하신 페이지를 찾을 수 없습니다."
            : "The requested page could not be found."}
        </h1>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          {locale === "ko"
            ? "이동하려는 주소가 변경되었거나 존재하지 않는 경로입니다. 아래 버튼을 통해 메인 홈, 전체 14개 프로젝트 아틀라스 또는 3D 아키텍처 랩으로 이동할 수 있습니다."
            : "The URL may have changed or does not exist. Use the links below to return to Home, the 14-Project Atlas, or the 3D Architecture Lab."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-blue)] px-5 py-2.5 text-xs font-bold text-[#070B14] hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{locale === "ko" ? "홈으로 돌아가기" : "Back to Home"}</span>
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-5 py-2.5 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-blue)]"
          >
            <Compass className="h-4 w-4 text-[var(--accent-blue)]" />
            <span>
              {locale === "ko" ? "전체 프로젝트 (14)" : "Projects Atlas (14)"}
            </span>
          </Link>
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 rounded-xl border border-[#AB83FF]/40 bg-[#AB83FF]/15 px-5 py-2.5 text-xs font-semibold text-[#AB83FF] hover:bg-[#AB83FF]/25"
          >
            <Network className="h-4 w-4" />
            <span>
              {locale === "ko" ? "3D 아키텍처 랩" : "3D Architecture Lab"}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
