import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 & 경력 (About & Experience) | 권상헌 (Sangheon Kwon)",
  description:
    "링크21 AI 엔지니어 · 풀스택 개발자 권상헌의 엔지니어링 철학, 경력 타임라인, 프로젝트 연결 기술 스택, 학력 및 자격증(Azure AI-901, 빅데이터분석기사, AI-POT 2급, 네트워크관리사 2급).",
  alternates: {
    canonical: "https://kwsahe.github.io/kwsahe/about/",
  },
  openGraph: {
    title: "About & Experience | 권상헌 (Sangheon Kwon)",
    description:
      "AI Service Backend Engineer & Full-stack Developer at Link21 Inc. — Career timeline, verified tech stack, education, and certifications.",
    url: "https://kwsahe.github.io/kwsahe/about/",
    type: "profile",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
