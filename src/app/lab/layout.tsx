import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D 아키텍처 랩 (Architecture Lab) | 권상헌 (Sangheon Kwon)",
  description:
    "실제 구현·검증된 6개 핵심 AI 및 데이터 시스템(JARVIS OFFICE, BidPilot AI, tri-agent-control, Market Pulse, k-safety-law-rag, 링키 AI 챗봇)의 3D WebGL / 2D SVG 노드 시뮬레이터.",
  alternates: {
    canonical: "https://kwsahe.github.io/kwsahe/lab/",
  },
  openGraph: {
    title: "3D/2D Architecture Lab | 권상헌 (Sangheon Kwon)",
    description:
      "Interactive 3D WebGL & 2D SVG system topology simulator for 6 verified AI architectures.",
    url: "https://kwsahe.github.io/kwsahe/lab/",
    type: "website",
  },
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
