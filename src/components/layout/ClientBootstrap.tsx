"use client";

import { useEffect } from "react";
import { useAppStore, Locale, ThemeMode } from "@/store/useAppStore";

export function ClientBootstrap() {
  const setLocale = useAppStore((s) => s.setLocale);
  const setTheme = useAppStore((s) => s.setTheme);
  const setReducedMotion = useAppStore((s) => s.setReducedMotion);

  useEffect(() => {
    const savedLang = window.localStorage.getItem("preferred-lang") as Locale | null;
    if (savedLang === "ko" || savedLang === "en") {
      setLocale(savedLang);
    } else {
      document.documentElement.setAttribute("lang", "ko");
    }

    const savedTheme = window.localStorage.getItem("theme") as ThemeMode | null;
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    } else {
      setTheme("dark");
    }

    const savedMotion = window.localStorage.getItem("reduced-motion");
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (savedMotion !== null) {
      setReducedMotion(savedMotion === "true");
    } else if (mediaQuery.matches) {
      setReducedMotion(true);
    }
  }, [setLocale, setTheme, setReducedMotion]);

  return null;
}
