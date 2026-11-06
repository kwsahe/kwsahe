import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "전체 프로젝트 아틀라스 (14종) | 권상헌 (Sangheon Kwon)",
  description:
    "상용 프로덕션 웹서비스, 사내 19명 AI 직원 시스템(JARVIS), 공공입찰 자동화 도구(BidPilot AI), 3-CLI 코딩 오케스트레이션(tri-agent-control), 법령 이중 RAG 및 데이터 분석 프로젝트 14종 아카이브.",
  alternates: {
    canonical: "https://kwsahe.github.io/kwsahe/work/",
  },
  openGraph: {
    title: "Projects Atlas (14 Systems) | 권상헌 (Sangheon Kwon)",
    description:
      "Explore 14 verified AI & Full-Stack engineering projects across AI Agents, RAG, Data/ML, and Production Web Services.",
    url: "https://kwsahe.github.io/kwsahe/work/",
    type: "website",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
