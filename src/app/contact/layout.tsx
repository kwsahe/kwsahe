import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "연락처 & 이력서 (Contact & Resume) | 권상헌 (Sangheon Kwon)",
  description:
    "권상헌 AI 서비스 백엔드 엔지니어 · 풀스택 개발자 직접 연락처, 이력서 PDF 다운로드 및 상용 서비스·GitHub 저장소 링크.",
  alternates: {
    canonical: "https://kwsahe.github.io/kwsahe/contact/",
  },
  openGraph: {
    title: "Contact & Resume | 권상헌 (Sangheon Kwon)",
    description:
      "Direct contact channels, Resume PDF download, and verified live service links.",
    url: "https://kwsahe.github.io/kwsahe/contact/",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
