"use client";

import React, { useState } from "react";
import { ProjectSlide } from "@/data/portfolio-data";
import { useAppStore } from "@/store/useAppStore";
import { assetPath, cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScreenshotCarouselProps {
  slides: ProjectSlide[];
  projectName: string;
  aspectClass?: string;
}

export function ScreenshotCarousel({
  slides,
  projectName,
  aspectClass = "aspect-[16/10]",
}: ScreenshotCarouselProps) {
  const locale = useAppStore((s) => s.locale);
  const [index, setIndex] = useState(0);

  if (!slides || slides.length === 0) return null;

  const current = slides[index] ?? slides[0];
  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + 1) % slides.length);
  };

  return (
    <div
      className="group/carousel relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[#070B14]"
      aria-label={`${projectName} ${locale === "ko" ? "스크린샷 갤러리" : "Screenshot gallery"}`}
    >
      <div className={cn("relative w-full overflow-hidden bg-[#070B14]", aspectClass)}>
        <img
          src={assetPath(current.src)}
          alt={current.alt}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover/carousel:scale-[1.015]"
        />

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label={locale === "ko" ? "이전 스크린샷" : "Previous screenshot"}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#070B14]/80 text-[#F5F7FB] border border-white/15 backdrop-blur-sm transition-opacity hover:bg-[#6FA8FF] hover:text-[#070B14] cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={locale === "ko" ? "다음 스크린샷" : "Next screenshot"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#070B14]/80 text-[#F5F7FB] border border-white/15 backdrop-blur-sm transition-opacity hover:bg-[#6FA8FF] hover:text-[#070B14] cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <span className="absolute right-2.5 top-2.5 rounded-md bg-[#070B14]/85 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#F5F7FB] border border-white/10">
              {index + 1} / {slides.length}
            </span>
          </>
        )}
      </div>

      {/* Caption & Slide Dots */}
      <div className="flex flex-col gap-2 border-t border-white/10 bg-[#0D1424] px-3.5 py-2.5 text-xs text-[#D4DCEB]">
        <p className="line-clamp-2 min-h-[2.25rem] leading-snug">
          {current.caption[locale]}
        </p>
        {slides.length > 1 && (
          <div className="flex items-center gap-1.5" role="tablist">
            {slides.map((s, idx) => (
              <button
                key={s.src + idx}
                type="button"
                role="tab"
                aria-selected={idx === index}
                aria-label={`${locale === "ko" ? "슬라이드" : "Slide"} ${idx + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIndex(idx);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all cursor-pointer",
                  idx === index
                    ? "w-6 bg-[#6FA8FF]"
                    : "w-2 bg-white/25 hover:bg-white/50"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
