"use client";

import { create } from "zustand";

export type Locale = "ko" | "en";
export type ThemeMode = "dark" | "light";

interface AppState {
  locale: Locale;
  theme: ThemeMode;
  reducedMotion: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setReducedMotion: (reduced: boolean) => void;
  toggleReducedMotion: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  locale: "ko",
  theme: "dark",
  reducedMotion: false,
  setLocale: (locale) => {
    set({ locale });
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("lang", locale);
      window.localStorage.setItem("preferred-lang", locale);
    }
  },
  toggleLocale: () => {
    const next = get().locale === "ko" ? "en" : "ko";
    get().setLocale(next);
  },
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      window.localStorage.setItem("theme", theme);
    }
  },
  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },
  setReducedMotion: (reducedMotion) => {
    set({ reducedMotion });
    if (typeof window !== "undefined") {
      window.localStorage.setItem("reduced-motion", String(reducedMotion));
    }
  },
  toggleReducedMotion: () => {
    get().setReducedMotion(!get().reducedMotion);
  },
}));
