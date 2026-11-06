import type { Metadata } from "next";
import "./globals.css";
import { ClientBootstrap } from "@/components/layout/ClientBootstrap";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://kwsahe.github.io"),
  title: "권상헌 (Sangheon Kwon) | AI Service Backend Engineer — From Architecture to Production",
  description:
    "AI 시스템을 실제로 설계, 구현, 검증, 배포, 운영할 수 있는 AI 서비스 백엔드 엔지니어 · 풀스택 개발자 권상헌의 3D 엔지니어링 포트폴리오 (LINK21 AI JARVIS OFFICE, AI Hub, BidPilot AI, LINK21 Premium, tri-agent-control, Market Pulse, k-safety-law-rag).",
  openGraph: {
    title: "권상헌 | AI Service Backend Engineer — PORTFOLIO 3D REBORN",
    description:
      "From Architecture to Production — 19-Agent Orchestration (JARVIS), Procurement AI (BidPilot), 3-CLI Pipeline (tri-agent-control), Dual RAG, and Live Production Platforms.",
    type: "website",
    url: "https://kwsahe.github.io/kwsahe/",
    images: ["/kwsahe/assets/data-ai-portfolio-visual.png"],
  },
  icons: {
    icon: "/kwsahe/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "권상헌 (Sangheon Kwon)",
    jobTitle: "AI Service Backend Engineer / Full-stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "링크21 (Link21 Inc.)",
    },
    email: "mailto:kwhoney223@gmail.com",
    url: "https://kwsahe.github.io/kwsahe/",
    sameAs: ["https://github.com/kwsahe"],
  };

  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        <a href="#main" className="skip-link">
          본문으로 바로가기 / Skip to content
        </a>
        <ClientBootstrap />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
