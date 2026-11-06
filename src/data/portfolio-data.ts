export interface LocalizedText {
  ko: string;
  en: string;
}

export interface ProjectSlide {
  src: string;
  alt: string;
  caption: LocalizedText;
}

export type ProjectCategory =
  | "Production"
  | "Internal AI"
  | "AI / RAG"
  | "Data & Analytics"
  | "Automation"
  | "Experimental";

export type ProjectStatus =
  | "Live Production"
  | "Internal Tool"
  | "Prototype"
  | "Research / Experimental"
  | "Archived";

export interface ProjectLink {
  label: LocalizedText;
  href: string;
  type: "live" | "github" | "demo" | "docs";
}

export interface ProjectData {
  slug: string;
  name: string;
  title: LocalizedText;
  oneLiner: LocalizedText;
  status: ProjectStatus;
  statusBadge: LocalizedText;
  isPrivateRepo: boolean;
  featuredOrder?: number; // 1..6 for main featured priority
  categories: ProjectCategory[];
  role: LocalizedText;
  period: LocalizedText;
  techStack: string[];
  keyMetrics: LocalizedText[];
  slides: ProjectSlide[];
  labSystemId?: string;
  caseStudy: {
    overview: LocalizedText;
    problem: LocalizedText;
    roleDetails: LocalizedText[];
    architecture: LocalizedText;
    architectureFlow: string[];
    implementation: LocalizedText[];
    verification: LocalizedText[];
    challenges: LocalizedText[];
    limitations: LocalizedText[];
  };
  links: ProjectLink[];
}

export interface ExperienceItem {
  company: LocalizedText;
  role: LocalizedText;
  period: LocalizedText;
  isCurrent: boolean;
  bullets: LocalizedText[];
}

export interface EducationItem {
  institution: LocalizedText;
  program: LocalizedText;
  period: LocalizedText;
  bullets: LocalizedText[];
}

export interface CertificateItem {
  date: string;
  name: LocalizedText;
  issuer: LocalizedText;
  badge: string;
}

export interface SkillGroup {
  id: "backend" | "ai" | "frontend" | "infra";
  title: LocalizedText;
  summary: LocalizedText;
  skills: Array<{
    name: string;
    logo?: string;
    relatedProjects: string[];
  }>;
}

export const PROFILE_DATA = {
  name: { ko: "권상헌", en: "Sangheon Kwon" },
  primaryRole: "AI Service Backend Engineer",
  secondaryRole: "AI Engineer / Full-stack Developer",
  tagline: "From Architecture to Production",
  currentCompany: {
    ko: "주식회사 링크21 (2026.08 ~ 재직 중)",
    en: "Link21 Inc. (Aug 2026 ~ Present)",
  },
  birthDate: "2001. 02. 23",
  phone: "010-9280-9415",
  email: "kwhoney223@gmail.com",
  github: "https://github.com/kwsahe",
  portfolioUrl: "https://kwsahe.github.io/kwsahe/",
  resumePdf: "/assets/resume-kwon-sangheon.pdf",
  avatar: "/png/profile-photo.png",
  military: {
    ko: "육군 병장 만기전역 (2021.11 ~ 2023.05)",
    en: "Sergeant, ROK Army — Honorably Discharged (Nov 2021 ~ May 2023)",
  },
  heroSummary: {
    ko: "현재 링크21에 재직하며 실제 프로덕션 웹서비스와 AI 시스템을 기획·아키텍처 설계부터 구현·검증·배포·운영까지 End-to-End로 구축하는 AI 서비스 백엔드 엔지니어 / 풀스택 개발자입니다. AI 직원 19명이 협업하고 게시 게이트가 검증하는 사내 제작 시스템(JARVIS OFFICE), 공공입찰·지원사업 자동 검토 도구(BidPilot AI), 기업 AI 교육 플랫폼(LINK21 Premium)과 통합 허브(AI Hub), 서비스 내 AI 챗봇(링키), 3-CLI 코딩 오케스트레이션(tri-agent-control), 법령 이중 RAG 및 3D 하드웨어 시세 분석 시스템을 설계·구현했습니다.",
    en: "AI Service Backend Engineer & Full-stack Developer at Link21 building production web platforms and AI systems end-to-end from architecture to verification, deployment, and operations. Engineered a 19-agent content orchestration system with separated publish gates (JARVIS OFFICE), public procurement & grant review automation (BidPilot AI), LINK21 Premium & AI Hub live services, an in-service AI chatbot, a 3-CLI coding pipeline (tri-agent-control), dual ChromaDB legal RAG, and a 3D hardware market analytics platform.",
  },
  aboutNarrative: [
    {
      ko: "객관적인 데이터와 검증 가능한 AI 아키텍처로 전략을 세우고, 끝까지 동작하는 프로덕션 시스템으로 비즈니스 가치를 완성합니다.",
      en: "Formulating strategies with objective data and verifiable AI architectures, and delivering real business value through production-ready systems.",
    },
    {
      ko: "단순히 LLM API를 호출하는 데모에 머무르지 않고, 생성 점수와 분리된 게시 가능 판정(Publish Gate), 원문 쪽 번호 1:1 대조 검증(Citation & Audit Gate), 세션별 Git worktree 격리와 자동 회귀 테스트 등 실제 운영 환경에서 신뢰할 수 있는 엔지니어링 가드레일을 직접 설계하고 수치로 검증합니다.",
      en: "Rather than stopping at basic LLM API demos, I design and verify production guardrails—including publish gates separated from readiness scores, page-preserved citation auditing, per-session Git worktree isolation, and automated regression harnesses.",
    },
    {
      ko: "프로젝트 매니저(PM) 및 풀스택·AI 엔지니어 경험을 바탕으로, 기획·데이터 파이프라인·백엔드 API·프론트엔드 UI·인프라 배포까지 전 과정을 연결하며 조직의 실질적인 문제 해결에 기여합니다.",
      en: "Combining PM leadership with full-stack and AI backend engineering, I bridge requirements analysis, data pipelines, backend APIs, interactive UIs, and cloud deployment to solve concrete operational problems.",
    },
  ],
};

export const CORE_CAPABILITIES = [
  {
    id: "01",
    title: {
      ko: "멀티 에이전트 오케스트레이션 & 게시 게이트",
      en: "Multi-Agent Orchestration & Publish Gates",
    },
    summary: {
      ko: "AI 직원 19명 체인·단일·동시 실행과 맥락 요약 전달(JARVIS 279초), 3개 코딩 CLI 고정 역할 파이프라인(TriAgent), 완성도 점수와 분리된 게시 가능 판정(19건 중 18건 통과, 오탐 2건 재현 테스트 수정)",
      en: "19-agent chain/parallel orchestration with summarized context handoff (JARVIS 279s), fixed-role 3-CLI coding pipeline (TriAgent), and deterministic Publish Gates separated from readiness scores.",
    },
    metrics: ["19 AI Agents · 279s Chain", "873 Unit · 252 Int · 19 Render Tests", "384 TriAgent Regression Tests"],
  },
  {
    id: "02",
    title: {
      ko: "도메인 특화 이중 RAG & 규칙 엔진 감사",
      en: "Domain Dual-RAG & Rule-Engine Auditing",
    },
    summary: {
      ko: "중대재해처벌법·산안법 Text+Table 이중 ChromaDB 분리 검색 및 Claude Opus 5.5 전용 근거 주입(최대 1.8만 자, 종합 90.0점), 나라장터·기업마당 쪽 보존 파싱 및 자격 판정(188/191 일치)",
      en: "Dual Text+Table ChromaDB RAG with model-routed context injection (up to 18k chars, 90.0 score) and page-preserved procurement eligibility & RFP matrix auditing (188/191 match).",
    },
    metrics: ["78.8 → 90.0 Eval Score", "188/191 Eligibility Match", "2,659 Automated Tests (BidPilot)"],
  },
  {
    id: "03",
    title: {
      ko: "프로덕션 웹 플랫폼 & 실시간 AI 스트리밍",
      en: "Production Web Platforms & Real-Time AI",
    },
    summary: {
      ko: "기업 고객 대상 상용 플랫폼(link21premium.com), 디지털 명함·NFC 메탈카드·AI 교육 통합 허브(aihub.link21premium.com, Vitest 515개), 의도 라우팅 기반 SSE 스트리밍 AI 챗봇(링키) 0→1 구축·운영",
      en: "End-to-end engineering and live operations of link21premium.com, aihub.link21premium.com (515 Vitest tests, 9 DB migrations), and the 0→1 SSE streaming AI chatbot.",
    },
    metrics: ["3 Live Commercial Services", "515 Vitest · 9 DB Migrations", "SSE Token Streaming & Fallback"],
  },
  {
    id: "04",
    title: {
      ko: "데이터 파이프라인 · ML 적정가 예측 · 엣지 인프라",
      en: "Data Pipelines, ML Pricing & Edge Infra",
    },
    summary: {
      ko: "다나와 9개 카테고리 약 5.8만 건(57,690건) 일일 스냅샷 수집·이상치 필터·로그 가격 ML 적정가 예측(R² 0.78), Cloudflare Workers + D1 엣지 서버리스 및 FastAPI 백엔드 아키텍처",
      en: "Daily ETL of 57,690 hardware snapshots across 9 categories with bait-price filtering and log-price ML fair-value prediction (R² 0.78), backed by FastAPI and Cloudflare Workers + D1.",
    },
    metrics: ["57,690 Snapshots · 9 Categories", "R² 0.78 · 81.1% Interval Hit", "196 Pytest + 26 Vitest (Market Pulse)"],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: { ko: "주식회사 링크21 (Link21 Inc.)", en: "Link21 Inc." },
    role: { ko: "AI 엔지니어 · 풀스택 개발자", en: "AI Engineer · Full-stack Developer" },
    period: { ko: "2026.08 – 현재 (재직 중)", en: "Aug 2026 – Present (Current)" },
    isCurrent: true,
    bullets: [
      {
        ko: "LINK21 Premium 기업교육 웹플랫폼(link21premium.com) 0→1 제작·운영 전담 및 신규 페이지, 수강신청 파이프라인, 관리자 시스템(XLSX 내보내기) 지속 고도화",
        en: "Lead end-to-end development and live operations of LINK21 Premium (link21premium.com), building course discovery, enrollment pipelines, and admin XLSX reporting.",
      },
      {
        ko: "LINK21 AI Hub(aihub.link21premium.com, 정식 운영 중) 기획·인프라·검수·배포 전담 — 디지털 명함·NFC 메탈 명함 실시간 원근 각인 미리보기, OpenCV 제품 사진 개인정보 제거, AI 치트키 200, Google Sheets 연동 (Vitest 515개 · 마이그레이션 9개)",
        en: "Spearheaded planning, infrastructure, QA, and deployment of LINK21 AI Hub (aihub.link21premium.com, Live) featuring NFC metal card perspective laser preview, OpenCV privacy masking, and 515 Vitest tests.",
      },
      {
        ko: "서비스 내 AI 챗봇(링키) 0→1 초기 설계·구현·실제 운영 — 질문 의도 분류 라우터, SSE 실시간 토큰 스트리밍, Gemini/OpenAI 이중 프로바이더 Fallback 구축",
        en: "Designed, built, and operated the in-service AI chatbot from 0 to 1 with intent routing, SSE real-time token streaming, and Gemini/OpenAI failover.",
      },
      {
        ko: "LINK21 AI JARVIS OFFICE 단독 개발·Cloudflare 운영 배포 — AI 직원 19명(전략실 8·제작실 11) 단일·동시·체인 실행(279초), 점수와 분리된 게시 가능 판정(19건 중 18건 통과, 오탐 2건 수정), 대화형 '말로 부탁하기', 웹자보·카드뉴스 PNG 렌더링 (117 커밋 · 단위 873 · 통합 252 · 렌더 19개 테스트)",
        en: "Solo-engineered and deployed LINK21 AI JARVIS OFFICE on Cloudflare Workers + D1: 19 AI agents (279s full chain), separated Publish Gate (18/19 pass, 2 false positives fixed with regression tests), conversational Ask Jarvis, and PNG rendering (873 unit · 252 integration · 19 render tests).",
      },
      {
        ko: "LINK21 BidPilot AI(판 1.0.1) 단독 개발 — 나라장터·기업마당 공고 수집, 규칙 엔진 자격 판정(188/191 일치), 요구사항 정리표 추출(Precision 0.795, Recall 0.843), 제안서 초안 및 제출 전 누락 점검 (571 커밋 · 자동 시험 2,659개 · 검수→수정 36회)",
        en: "Solo-developed LINK21 BidPilot AI (v1.0.1) for public procurement & grant review: G2B/Bizinfo ingestion, rule-engine eligibility (188/191 match), RFP matrix extraction (P 0.795, R 0.843), proposal drafting, and pre-submission audit (571 commits · 2,659 automated tests).",
      },
    ],
  },
  {
    company: { ko: "데이타트렌드 (Data Trend)", en: "Data Trend" },
    role: { ko: "사원 · AI사업전략", en: "Associate · AI Business Strategy" },
    period: { ko: "2023.07 – 2023.09 (3개월)", en: "Jul 2023 – Sep 2023 (3 mos)" },
    isCurrent: false,
    bullets: [
      {
        ko: "정부지원 AI 바우처 사업수행계획서 작성 및 수요기업 발굴·관련 시장 자료 조사",
        en: "Authored government AI Voucher project execution plans and conducted demand-company market research.",
      },
      {
        ko: "AI 도입 희망 기업 대상 맞춤형 솔루션 제안 자료 작성 및 사업 현황 분석 보고서 작성",
        en: "Prepared tailored AI adoption proposals and compiled business status analysis reports.",
      },
    ],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: { ko: "서강대학교 (Sogang University)", en: "Sogang University" },
    program: {
      ko: "미디어공학과 학사 졸업 (학점 3.53 / 4.5)",
      en: "B.S. in Media Technology (GPA 3.53 / 4.5)",
    },
    period: { ko: "2020.03 – 2026.02", en: "Mar 2020 – Feb 2026" },
    bullets: [
      {
        ko: "미디어 기술, 데이터 처리, 소프트웨어 공학 및 알고리즘 관련 전공 과목 이수",
        en: "Completed core coursework in media engineering, data processing, algorithms, and software engineering.",
      },
    ],
  },
  {
    institution: { ko: "매력일자리 개발자 과정", en: "Attractive Jobs Developer Program" },
    program: {
      ko: "AI · RAG · Python 백엔드 및 데이터 파이프라인 심화 과정 수료",
      en: "Intensive Program in AI, RAG, Python Backend & Data Pipelines",
    },
    period: { ko: "2026.05 – 2026.06 · 수료", en: "May 2026 – Jun 2026 · Completed" },
    bullets: [
      {
        ko: "최신 AI 기술 트렌드, 법령·비전 도메인 데이터 처리, 이중 RAG 및 에이전트 파이프라인 구축",
        en: "Built domain-specific dual RAG systems, computer vision pipelines, and Python backend services.",
      },
    ],
  },
  {
    institution: {
      ko: "서울대학교 데이터사이언스 부트캠프",
      en: "Seoul National University Data Science Bootcamp",
    },
    program: {
      ko: "선형대수학 · 확률과 통계 · 머신러닝 기초 이론 및 실습 수료",
      en: "Linear Algebra, Probability & Statistics, and Machine Learning Foundations",
    },
    period: { ko: "2026.01 · 수료", en: "Jan 2026 · Completed" },
    bullets: [
      {
        ko: "데이터사이언스를 위한 수학적 기반 및 머신러닝 모델링 실습 완수",
        en: "Completed mathematical foundations for data science and hands-on machine learning modeling.",
      },
    ],
  },
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    date: "2026.08",
    name: { ko: "Azure AI Fundamentals (AI-901)", en: "Azure AI Fundamentals (AI-901)" },
    issuer: { ko: "Microsoft", en: "Microsoft" },
    badge: "AI-901",
  },
  {
    date: "2025.12",
    name: { ko: "빅데이터분석기사 (국가기술자격)", en: "Big Data Analytics Engineer (National License)" },
    issuer: { ko: "한국데이터산업진흥원 (KDATA)", en: "Korea Data Agency (KDATA)" },
    badge: "BigData",
  },
  {
    date: "2024.11",
    name: { ko: "AI-POT (AI 프롬프트활용능력) 2급", en: "AI-POT (AI Prompt Utilization) Grade II" },
    issuer: { ko: "한국생산성본부 (KPC)", en: "Korea Productivity Center (KPC)" },
    badge: "AI-POT",
  },
  {
    date: "2024.10",
    name: { ko: "네트워크관리사 2급", en: "Network Administrator Level 2" },
    issuer: { ko: "한국정보통신자격협회 (KAIT)", en: "KAIT" },
    badge: "Network",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "backend",
    title: { ko: "Backend & Data Engineering", en: "Backend & Data Engineering" },
    summary: {
      ko: "FastAPI·Cloudflare Workers·Next.js Route Handler 기반 고신뢰 API 서버, 분산 SQL(D1)·Supabase·SQLite(WAL) 스키마 설계 및 무인 수집·ETL 파이프라인을 구축합니다.",
      en: "Engineering resilient API backends with FastAPI, Cloudflare Workers, and Next.js, paired with Cloudflare D1, Supabase, SQLite (WAL), and automated ETL pipelines.",
    },
    skills: [
      { name: "Python", logo: "/png/logos/pytorch.svg", relatedProjects: ["link21-bidpilot-ai", "tri-agent-control", "k-safety-law-rag", "market-pulse", "construction-accident-vl-agent", "O2O-demand-forecasting-solution"] },
      { name: "FastAPI", relatedProjects: ["link21-bidpilot-ai", "k-safety-law-rag", "market-pulse", "construction-accident-vl-agent", "tri-agent-control"] },
      { name: "TypeScript", relatedProjects: ["link21-ai-jarvis-office", "link21-premium", "link21-ai-hub", "link21-ai-chatbot", "market-pulse", "business-card-auto"] },
      { name: "Cloudflare Workers & D1", relatedProjects: ["link21-ai-jarvis-office"] },
      { name: "Drizzle ORM & Zod", relatedProjects: ["link21-ai-jarvis-office", "link21-ai-hub"] },
      { name: "Supabase (PostgreSQL)", relatedProjects: ["link21-premium", "link21-ai-hub", "link21-ai-chatbot"] },
      { name: "SQLite (WAL)", relatedProjects: ["link21-bidpilot-ai", "k-safety-law-rag", "market-pulse", "O2O-demand-forecasting-solution"] },
      { name: "Flask", relatedProjects: ["O2O-demand-forecasting-solution"] },
    ],
  },
  {
    id: "ai",
    title: { ko: "AI / LLM · RAG · Multi-Agent", en: "AI / LLM · RAG · Multi-Agent" },
    summary: {
      ko: "다중 에이전트 체인 실행과 역할 분리, Text+Table 이중 벡터 검색, 출력 정합성 검증 게이트(Publish Gate / Citation Validator), 비전-언어 모델 파이프라인을 설계합니다.",
      en: "Designing multi-agent chain orchestration, dual Text+Table vector retrieval, deterministic output validation gates, and Vision-Language pipelines.",
    },
    skills: [
      { name: "OpenAI Responses / Chat API", logo: "/png/logos/chatgpt.svg", relatedProjects: ["link21-ai-jarvis-office", "link21-ai-chatbot"] },
      { name: "Claude Opus 5.5 / Claude Code CLI", logo: "/png/logos/claude.svg", relatedProjects: ["k-safety-law-rag", "link21-bidpilot-ai", "tri-agent-control"] },
      { name: "Gemini API", logo: "/png/logos/gemini.svg", relatedProjects: ["link21-ai-chatbot", "english-word-streamlit"] },
      { name: "ChromaDB & bge-m3", logo: "/png/logos/chromadb.svg", relatedProjects: ["k-safety-law-rag"] },
      { name: "LangGraph & LangChain", logo: "/png/logos/langgraph.svg", relatedProjects: ["market-pulse", "k-safety-law-rag"] },
      { name: "EXAONE-4.0 & Qwen2.5-14B / VL", logo: "/png/logos/exaone.svg", relatedProjects: ["k-safety-law-rag", "construction-accident-vl-agent"] },
      { name: "OpenCV", relatedProjects: ["link21-ai-hub", "construction-accident-vl-agent"] },
      { name: "Scikit-learn · XGBoost · Prophet · SHAP", logo: "/png/logos/scikitlearn.svg", relatedProjects: ["market-pulse", "O2O-demand-forecasting-solution", "ecommerce-data-analysis-practice"] },
    ],
  },
  {
    id: "frontend",
    title: { ko: "Frontend · 3D WebGL · Interactive UX", en: "Frontend · 3D WebGL · Interactive UX" },
    summary: {
      ko: "React 19·Next.js 16 App Router와 Three.js(@react-three/fiber)·HTML5 Canvas를 결합해 복잡한 엔지니어링 데이터와 3D 인터랙션을 직관적인 인터페이스로 구현합니다.",
      en: "Building responsive interfaces and interactive 3D visualizations with React 19, Next.js 16 App Router, Three.js (@react-three/fiber), and HTML5 Canvas.",
    },
    skills: [
      { name: "Next.js 16 / 15 / 14", relatedProjects: ["link21-premium", "link21-ai-hub", "link21-ai-chatbot", "link21-bidpilot-ai", "business-card-auto"] },
      { name: "React 19", relatedProjects: ["link21-ai-jarvis-office", "link21-premium", "link21-ai-hub", "link21-bidpilot-ai", "market-pulse"] },
      { name: "Three.js & React Three Fiber", relatedProjects: ["link21-bidpilot-ai", "market-pulse"] },
      { name: "Tailwind CSS v4", relatedProjects: ["link21-premium", "link21-ai-hub", "link21-ai-chatbot", "business-card-auto"] },
      { name: "Server-Sent Events (SSE)", relatedProjects: ["link21-ai-chatbot"] },
      { name: "HTML5 Canvas / PNG Rendering", relatedProjects: ["link21-ai-jarvis-office", "link21-ai-hub", "business-card-auto"] },
      { name: "Streamlit", relatedProjects: ["ecommerce-data-analysis-practice", "english-word-streamlit"] },
    ],
  },
  {
    id: "infra",
    title: { ko: "Infrastructure · QA · Operations", en: "Infrastructure · QA · Operations" },
    summary: {
      ko: "단위·통합·화면 렌더·E2E 자동화 테스트와 세션별 Git worktree 격리, CI/CD 무인 스케줄링을 통해 배포 전후의 시스템 신뢰성을 보장합니다.",
      en: "Ensuring production reliability through unit, integration, render, and E2E test suites, Git worktree isolation, and automated CI/CD workflows.",
    },
    skills: [
      { name: "Pytest (2,659+ / 384 / 196 / 41 tests)", relatedProjects: ["link21-bidpilot-ai", "tri-agent-control", "market-pulse", "k-safety-law-rag"] },
      { name: "Vitest & Playwright (873 / 515 / 26 tests)", relatedProjects: ["link21-ai-jarvis-office", "link21-ai-hub", "market-pulse"] },
      { name: "git worktree Isolation", relatedProjects: ["tri-agent-control"] },
      { name: "GitHub Actions CI/CD", relatedProjects: ["market-pulse", "tri-agent-control"] },
      { name: "Vercel & Cloudflare Edge Deploy", relatedProjects: ["link21-premium", "link21-ai-hub", "link21-ai-jarvis-office", "business-card-auto"] },
    ],
  },
];

export const PROJECTS_DATA: ProjectData[] = [
  {
    slug: "link21-ai-jarvis-office",
    name: "LINK21 AI JARVIS OFFICE",
    title: {
      ko: "LINK21 AI JARVIS OFFICE — 19명 AI 직원 홍보 콘텐츠 제작 & 게시 게이트",
      en: "LINK21 AI JARVIS OFFICE — 19-Agent Content Production & Publish Gate",
    },
    oneLiner: {
      ko: "과정 모집 홍보를 AI 직원 19명(전략실 8·제작실 11)이 나눠 만들고, 완성도 점수와 분리된 게시 가능 판정(Publish Gate)으로 사실·과장·분량을 검증하는 사내 콘텐츠 제작 시스템",
      en: "Internal content production system where 19 AI agents collaborate on course marketing and a dedicated Publish Gate verifies facts, hype, and length before release.",
    },
    status: "Internal Tool",
    statusBadge: {
      ko: "사내 운영 중 · Cloudflare Workers + D1",
      en: "Internal Production · Cloudflare Workers + D1",
    },
    isPrivateRepo: true,
    featuredOrder: 1,
    categories: ["Internal AI", "AI / RAG", "Automation"],
    role: {
      ko: "단독 설계 · 구현 · 검증 · Cloudflare 운영 배포 (117 커밋)",
      en: "Solo Architecture, Implementation, Verification & Cloudflare Deployment (117 Commits)",
    },
    period: { ko: "2026 · 링크21 사내 시스템", en: "2026 · Link21 Internal System" },
    techStack: [
      "React 19",
      "TypeScript",
      "vinext",
      "Cloudflare Workers",
      "Cloudflare D1",
      "Drizzle ORM",
      "OpenAI Responses API",
      "Zod",
      "Publish Gate",
      "PNG Rendering",
    ],
    keyMetrics: [
      { ko: "AI 직원 19명(전략 8·제작 11) 체인 실측 279초", en: "19 AI Agents (8 Strategy · 11 Creative) 279s Chain" },
      { ko: "실제 행사 19건 중 18건 게시 가능 · 오탐 2건 수정", en: "18/19 Real Events Pass Publish Gate · 2 False Positives Fixed" },
      { ko: "단위 873 · 통합 252 · 화면 렌더 19개 테스트", en: "873 Unit · 252 Integration · 19 UI Render Tests" },
    ],
    slides: [
      {
        src: "/png/jarvis/jarvis-01-workspace.png",
        alt: "LINK21 AI JARVIS OFFICE 작업 공간 화면",
        caption: {
          ko: "작업 공간 — 직원 19명 명부 · 세부 작업 설정 · 결과 점수와 게시 가능 여부",
          en: "Workspace — 19-agent roster, task configuration, readiness score, and publish gate verdict",
        },
      },
      {
        src: "/png/jarvis/jarvis-02-ask-jarvis.png",
        alt: "말로 부탁하기 대화형 입력 도우미 화면",
        caption: {
          ko: "말로 부탁하기 — 대화로 되물으며 입력칸을 대신 채우고, 넣기 전에 확인을 받음",
          en: "Ask Jarvis — Conversational intake that resolves relative dates and confirms twice before execution",
        },
      },
      {
        src: "/png/jarvis/jarvis-03-publish-gate.png",
        alt: "게시 가능 판정(Publish Gate) 차단 및 근거 표시 화면",
        caption: {
          ko: "게시 판정 — 자동 보완 1회 뒤에도 5초 구간에 47음절(목표 30음절)이 남아 게시 차단, 줄일 문장을 짚어 줌",
          en: "Publish Gate — Blocks release when 47 syllables remain in a 5s slot (target 30) after 1 auto-fix pass, pinpointing the exact line",
        },
      },
      {
        src: "/png/jarvis/jarvis-04-outputs.png",
        alt: "웹자보 포스터 및 카드뉴스 장별 PNG 결과물 화면",
        caption: {
          ko: "결과물 — 원고에서 바로 만든 웹자보 포스터와 카드뉴스 장별 PNG",
          en: "Visual Outputs — Web poster PNG and slide-by-slide card-news PNGs rendered directly from manuscript",
        },
      },
    ],
    labSystemId: "link21-ai-jarvis-office",
    caseStudy: {
      overview: {
        ko: "링크21의 교육과정·행사 모집 홍보물(블로그, 인스타그램 카드뉴스, 숏폼 대본, 웹자보 포스터, 이메일 등 9개 채널 패키지)을 전략실 8명·제작실 11명 총 19명의 AI 직원이 분담해 제작하고, 게시 전 사실·과장·분량을 엄격히 검사하는 사내 콘텐츠 제작 시스템입니다.",
        en: "An internal multi-agent content production platform at Link21 where 19 specialized AI agents (8 Strategy Room, 11 Production Room) generate 9-channel promotional packages, guarded by a deterministic Publish Gate.",
      },
      problem: {
        ko: "단일 프롬프트로 홍보 원고를 생성하면 ① 앞 단계의 타깃·소구점 맥락이 뒷 단계 채널 원고에서 유실되고, ② 생성 모델이 스스로 매긴 완성도 점수가 높아도 과장·보장 문구나 출처 없는 일정·가격, 숏폼 5초 구간 초과 대사가 섞여 바로 게시할 수 없는 문제가 있었습니다.",
        en: "Single-prompt generation suffered from context drift across channels and unreliable self-scored quality: high readiness scores still contained exaggerated claims, unverified dates/prices, or over-length short-form scripts.",
      },
      roleDetails: [
        {
          ko: "19명 AI 직원 역할 정의, 단일·동시·체인 실행 오케스트레이터 및 요약 맥락 전달 구조 단독 설계·구현",
          en: "Solo-architected the 19-agent roster, single/parallel/chain execution engine, and summarized context handoff.",
        },
        {
          ko: "완성도 점수(TOP 1 READINESS)와 분리된 게시 가능 판정(Publish Gate) 규칙 및 자동 보완 1회 루프 구현",
          en: "Built the Publish Gate separated from TOP 1 READINESS score, with 1-pass auto-remediation and exact block reasons.",
        },
        {
          ko: "대화형 입력 도우미('말로 부탁하기'), 브라우저 기반 웹자보·카드뉴스 PNG 렌더러, Cloudflare Workers + D1 배포 완결",
          en: "Implemented Ask Jarvis conversational intake, browser-side poster/card-news PNG rendering, and Cloudflare Workers + D1 deployment.",
        },
      ],
      architecture: {
        ko: "React 19 + TypeScript + vinext 프론트엔드와 Cloudflare Workers 서버리스 런타임, Cloudflare D1(SQLite 기반 분산 DB, Drizzle ORM)으로 구성됩니다. 모든 테이블 행이 workspace_id를 직접 보유해 멀티테넌트 격리를 보장하며, OpenAI Responses API는 store: false로 호출합니다.",
        en: "Built on React 19, TypeScript, vinext, Cloudflare Workers, and Cloudflare D1 (Drizzle ORM). Every table row carries workspace_id directly, and OpenAI Responses API calls enforce store: false.",
      },
      architectureFlow: [
        "Ask Jarvis / Intake Form",
        "Cloudflare Workers API (Idempotency & Zod)",
        "Strategy Room (8 AI Agents) + D1 Context Summary",
        "Production Room (11 AI Agents) · V1→V2 Versioning",
        "Publish Gate (Fact · Hype · Card Count · Syllable Check + 1x Auto-Fix)",
        "PNG Renderer & 9-Channel Package Output",
      ],
      implementation: [
        {
          ko: "직원별 결과 D1 즉시 저장 및 요약 맥락(Context Summary) 전달로 19명 전체 체인 실행 시 연결이 끊겨도 중단 지점부터 재개 가능(실측 279초)",
          en: "Persists each agent output to D1 immediately and passes summarized context so 19-agent chains (279s measured) can resume cleanly if interrupted.",
        },
        {
          ko: "수정 요청 시 기존 결과를 덮어쓰지 않고 V1 → V2 새 버전으로 누적해 이전 원고와 비교·복원 지원",
          en: "Preserves immutable V1 → V2 version history on revision requests instead of overwriting prior manuscripts.",
        },
        {
          ko: "'말로 부탁하기(Ask Jarvis)'에서 상대 날짜('담주 화욜' 등)를 실제 달력 날짜로 계산해 채우고, 입력칸 반영 전·실행 전 2단계 사용자 확인 수행",
          en: "Resolves Korean relative dates in Ask Jarvis into calendar dates and enforces two-step confirmation before form fill and chain start.",
        },
      ],
      verification: [
        {
          ko: "단위 테스트 873개 · 통합 테스트 252개 · 화면 렌더 테스트 19개 통과 (총 117 커밋)",
          en: "Passed 873 unit tests, 252 integration tests, and 19 UI render tests across 117 commits.",
        },
        {
          ko: "링크21 실제 행사·과정 19건 검증 결과 18건 게시 가능 판정, 1건은 자동 보완 후에도 숏폼 5초 구간 대사 분량(47음절 vs 목표 30음절) 초과를 정확히 짚어 게시 차단",
          en: "Validated across 19 real Link21 events: 18 passed Publish Gate, 1 accurately blocked for exceeding 5-second short-form syllable limits (47 vs 30 target).",
        },
        {
          ko: "검수 중 발견한 게시 판정 오탐 2건('피해야 할 표현' 목록을 약속 문구로 읽음, 영상 설명란 문구를 대사 분량으로 합산)을 재현 테스트와 함께 수정 후 운영 반영",
          en: "Identified and fixed 2 publish-gate false positives ('expressions to avoid' parsed as promises, video description counted as spoken script) with regression tests in production.",
        },
      ],
      challenges: [
        {
          ko: "19명 체인 실행 중 서버리스 타임아웃 및 문맥 비대화 문제 → 직원마다 D1에 체크포인트를 기록하고 핵심 결정사항만 요약해 다음 직원에게 전달하는 구조로 해결",
          en: "Solved serverless timeout and token bloat across 19 sequential agents by checkpointing each step in D1 and passing structured context summaries.",
        },
      ],
      limitations: [
        {
          ko: "사내 홍보 제작 전용 시스템이므로 외부 소셜 채널 자동 발행 API 연동 대신 검토 완료된 9개 채널 패키지와 PNG 다운로드 방식으로 운영 중",
          en: "Operates as an internal production studio exporting verified 9-channel packages and PNGs rather than direct third-party social auto-posting.",
        },
      ],
    },
    links: [],
  },
  {
    slug: "link21-ai-hub",
    name: "LINK21 AI Hub",
    title: {
      ko: "LINK21 AI Hub — 디지털 명함 · NFC 메탈카드 · AI 교육 통합 비즈니스 허브",
      en: "LINK21 AI Hub — Digital Business Card, NFC Metal Card & AI Education Hub",
    },
    oneLiner: {
      ko: "디지털 명함 제작부터 실물 금속 원근 레이저 각인 미리보기, OpenCV 제품 사진 개인정보 제거, AI 치트키 200 리드 수집, 관리자 주문 처리까지 한곳에서 운영하는 상용 허브",
      en: "Live commercial hub integrating digital business cards, perspective-matched NFC metal engraving previews, OpenCV privacy masking, AI Cheat-Key 200 lead capture, and order administration.",
    },
    status: "Live Production",
    statusBadge: {
      ko: "Live · 정식 운영 중 (aihub.link21premium.com)",
      en: "Live Production (aihub.link21premium.com)",
    },
    isPrivateRepo: true,
    featuredOrder: 2,
    categories: ["Production", "AI / RAG", "Automation"],
    role: {
      ko: "기획 · 인프라 · 구현 · 검수 · 배포 전담 (Vitest 515개 · 마이그레이션 9개)",
      en: "End-to-End Planning, Infrastructure, Implementation, QA & Deployment (515 Vitest · 9 Migrations)",
    },
    period: { ko: "2026 · 링크21 상용 서비스", en: "2026 · Link21 Commercial Service" },
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "Zod",
      "Tailwind CSS",
      "OpenCV (Privacy Masking)",
      "Google Apps Script",
      "Vitest (515 tests)",
      "Vercel",
    ],
    keyMetrics: [
      { ko: "Live 정식 운영 중 (aihub.link21premium.com)", en: "Live Commercial Service (aihub.link21premium.com)" },
      { ko: "Vitest 자동화 테스트 515개 · DB 마이그레이션 9개", en: "515 Vitest Automated Tests · 9 DB Migrations" },
      { ko: "AI 치트키 200 (무료 20 + 리드 신청 시 180 해금)", en: "AI Cheat-Key 200 (20 Free + 180 Server-Gated Lead Unlock)" },
    ],
    slides: [
      {
        src: "/png/link21-ai-hub-1.png",
        alt: "LINK21 AI Hub 메인 화면",
        caption: {
          ko: "메인 — 디지털 명함 및 NFC 메탈카드 통합 진입 허브",
          en: "Main Hub — Unified entry for digital business cards, NFC metal cards, and AI education",
        },
      },
      {
        src: "/png/link21-ai-hub-2.png",
        alt: "NFC 메탈카드 각인 미리보기 화면",
        caption: {
          ko: "각인 미리보기 — 실물 금속 사진 원근 및 표면 질감 맞춤 레이저 각인 렌더링",
          en: "Engraving Preview — Real-time perspective-warped laser engraving preview over metal textures",
        },
      },
      {
        src: "/png/link21-ai-hub-3.png",
        alt: "AI 치트키 200 리드 해금 화면",
        caption: {
          ko: "AI 치트키 200 — 무료 20개 공개 및 리드 신청 시 180개 서버 격리 해금",
          en: "AI Cheat-Key 200 — 20 free prompts + 180 server-isolated prompts unlocked upon lead submission",
        },
      },
      {
        src: "/png/link21-ai-hub-4.png",
        alt: "관리자 신청 및 주문 관리 대시보드 화면",
        caption: {
          ko: "관리자 신청 목록 — 주문 및 치트키 신청 데이터 실시간 관리 대시보드",
          en: "Admin Console — Real-time order and lead synchronization dashboard with Google Sheets retry",
        },
      },
    ],
    caseStudy: {
      overview: {
        ko: "링크21의 디지털 명함 제작, NFC 메탈 명함 주문, AI 치트키 200 리드 수집, AI 교육 신청을 단일 도메인(aihub.link21premium.com)에서 제공하는 통합 비즈니스 허브입니다.",
        en: "A unified commercial business hub at aihub.link21premium.com connecting digital business card creation, NFC metal card ordering, AI Cheat-Key 200 lead generation, and admin order fulfillment.",
      },
      problem: {
        ko: "개별 랜딩 페이지로 흩어져 있던 명함 제작·실물 메탈카드 주문·교육 리드 수집을 하나의 허브로 통합하면서, 실물 제품 사진의 개인정보 비식별화와 잠금 콘텐츠(180개)의 클라이언트 노출 차단이 필요했습니다.",
        en: "Needed to unify fragmented card builders and lead funnels into one platform while masking personal info on real metal product photos and preventing client-side leakage of 180 gated prompts.",
      },
      roleDetails: [
        {
          ko: "서비스 기획, Supabase DB 스키마(마이그레이션 9개), Vercel·DNS·Google Cloud·Apps Script 인프라 통합 전담",
          en: "Owned product architecture, 9 Supabase DB migrations, and Vercel/DNS/Google Cloud/Apps Script infrastructure.",
        },
        {
          ko: "실물 금속 카드 원근·질감 맞춤 실시간 각인 미리보기 및 OpenCV 기반 제품 사진 개인정보 제거 파이프라인 구축",
          en: "Built real-time perspective laser engraving preview and OpenCV privacy-masking pipeline for product photos.",
        },
        {
          ko: "Vitest 기반 515개 자동화 테스트 작성 및 검수·정식 배포 완결",
          en: "Authored 515 Vitest automated tests and led QA to full production launch.",
        },
      ],
      architecture: {
        ko: "Next.js 16 App Router + React 19 + TypeScript 기반 웹 애플리케이션과 Supabase(PostgreSQL + RLS), Google Apps Script 실시간 시트 적재 웹훅으로 구성됩니다.",
        en: "Next.js 16 App Router + React 19 + TypeScript integrated with Supabase PostgreSQL (9 migrations) and resilient Google Sheets webhook sync.",
      },
      architectureFlow: [
        "Client UI (Card Builder & Metal Engraving Canvas)",
        "Next.js 16 Route Handlers + Zod Validation",
        "Supabase PostgreSQL (9 Migrations) + Server-Gated Content",
        "Google Apps Script Sync (Retry & Delete Sync)",
        "Admin Fulfillment Console",
      ],
      implementation: [
        {
          ko: "무료 20개 치트키와 잠금 180개 치트키를 서버 API 레벨에서 분리해 리드 신청 완료 시에만 180개 데이터를 반환하도록 구현",
          en: "Isolated the 180 locked prompts on the server so they are never bundled to the client prior to verified lead submission.",
        },
        {
          ko: "Supabase 적재 후 Google Sheets 동기화 실패 시 관리자 화면에서 미전송 건 재전송 및 삭제 동기화를 수행하는 복원력 확보",
          en: "Added failed-webhook retry and deletion synchronization between Supabase and Google Sheets in the admin portal.",
        },
      ],
      verification: [
        {
          ko: "Vitest 자동화 테스트 515개 통과 및 Supabase 마이그레이션 9개 정합성 검증 완료",
          en: "Verified with 515 passing Vitest tests and 9 sequential Supabase schema migrations.",
        },
      ],
      challenges: [
        {
          ko: "실물 NFC 메탈카드 촬영본에 포함된 실제 고객 명함 개인정보를 OpenCV 영역 검출 및 자연스러운 텍스처 인페인팅으로 제거해 상용 쇼케이스에 안전하게 적용",
          en: "Used OpenCV region detection and texture inpainting to strip personal data from real NFC metal card photographs.",
        },
      ],
      limitations: [
        {
          ko: "실물 메탈카드 결제는 기업·기관 단가 협의 및 계좌 안내 프로세스와 연동되어 주문 접수 후 관리자 확인 방식으로 운영",
          en: "Metal card checkout follows B2B invoice/transfer confirmation managed through the admin fulfillment workflow.",
        },
      ],
    },
    links: [
      {
        label: { ko: "실서비스 보기 (aihub.link21premium.com)", en: "Visit Live Service (aihub.link21premium.com)" },
        href: "https://aihub.link21premium.com",
        type: "live",
      },
    ],
  },
  {
    slug: "link21-bidpilot-ai",
    name: "LINK21 BidPilot AI",
    title: {
      ko: "LINK21 BidPilot AI — 공공입찰 · 지원사업 공고 수집 · 자격 판정 · 제안서 감사 도구",
      en: "LINK21 BidPilot AI — Public Procurement & Grant Review, Eligibility & Proposal Auditor",
    },
    oneLiner: {
      ko: "나라장터·기업마당 공고 수집부터 규칙 엔진 자격 판정, 쪽 보존 요구사항 추출, 제안서 초안 생성 및 제출 전 누락 점검(Audit)까지 이어지는 사내 업무 도구",
      en: "Internal procurement intelligence system automating G2B/Bizinfo ingestion, rule-engine eligibility, page-preserved RFP matrix extraction, proposal drafting, and pre-submission auditing.",
    },
    status: "Internal Tool",
    statusBadge: {
      ko: "사내 업무 도구 · Local v1.0.1 (571 커밋)",
      en: "Internal Tool · Local v1.0.1 (571 Commits)",
    },
    isPrivateRepo: true,
    featuredOrder: 3,
    categories: ["Internal AI", "AI / RAG", "Automation"],
    role: {
      ko: "단독 설계 · 구현 · 검증 (571 커밋 · 자동 시험 2,659개 · 검수→수정 36회)",
      en: "Solo Architecture, Implementation & Verification (571 Commits · 2,659 Tests · 36 Audit Cycles)",
    },
    period: { ko: "2026 · 링크21 사내 시스템 (v1.0.1)", en: "2026 · Link21 Internal System (v1.0.1)" },
    techStack: [
      "Python",
      "FastAPI",
      "Next.js 16",
      "React 19",
      "Three.js",
      "Claude Code CLI",
      "Codex CLI",
      "G2B OpenAPI",
      "SQLite",
      "Pytest (2,659 tests)",
    ],
    keyMetrics: [
      { ko: "지원사업 자격 판정 기준 답안 188/191 일치", en: "188/191 Eligibility Verdict Match on Benchmark Set" },
      { ko: "요구사항 추출 Precision 0.795 · Recall 0.843 · 쪽 일치 100%", en: "RFP Extraction P 0.795 · R 0.843 · 100% Page Match" },
      { ko: "571 커밋 · 자동 시험 2,659개 · 검수→수정 36회", en: "571 Commits · 2,659 Automated Tests · 36 QA Cycles" },
    ],
    slides: [
      {
        src: "/png/bidpilot/bidpilot-01-dashboard-overview.png",
        alt: "BidPilot AI 8단계 정거장 지도 대시보드 화면",
        caption: {
          ko: "대시보드 — 공고 1건을 8단계(공고 → 결정) 정거장 지도로 파악하는 통합 뷰",
          en: "Dashboard — 8-station pipeline map tracking an opportunity from notice ingestion to bid decision",
        },
      },
      {
        src: "/png/bidpilot/bidpilot-03-auditor-finding.png",
        alt: "BidPilot AI 제출 전 점검(Auditor) 화면",
        caption: {
          ko: "제출 전 점검 — 누락 요구사항 및 수치 불일치를 원문 쪽과 대조 분석",
          en: "Pre-Submission Auditor — Cross-checks draft sections against source RFP page numbers to flag omissions",
        },
      },
      {
        src: "/png/bidpilot/bidpilot-04-radar.png",
        alt: "BidPilot AI 2D/3D 기회 레이더 화면",
        caption: {
          ko: "기회 레이더 — 마감 기한과 검토 우선순위로 공고를 배치한 2D/3D 레이더",
          en: "Opportunity Radar — 2D/3D spatial radar plotting notices by deadline urgency and fit score",
        },
      },
      {
        src: "/png/bidpilot/bidpilot-06-support-eligibility.png",
        alt: "BidPilot AI 규칙 엔진 자격 판정 화면",
        caption: {
          ko: "지원사업 판정 — 규칙 엔진 기반 참가·신청 자격 판정(가능/확인필요/불가)",
          en: "Eligibility Engine — Rule-based qualification verdict (Eligible / Needs Check / Ineligible) with page citations",
        },
      },
    ],
    labSystemId: "link21-bidpilot-ai",
    caseStudy: {
      overview: {
        ko: "나라장터(G2B) 공공입찰과 기업마당 지원사업 공고를 매일 수집해 회사 프로필과 대조하고, 참가 자격 판정 → 요구사항 정리표(RFP Matrix) 추출 → 사업계획서·제안서 초안 작성 → 제출 전 누락 점검(Auditor)까지 수행하는 사내 전용 AI 업무 시스템입니다.",
        en: "An internal procurement and grant automation suite that ingests G2B and Bizinfo notices daily, evaluates company eligibility via a deterministic rule engine, extracts page-linked RFP matrices, drafts proposals, and audits submissions.",
      },
      problem: {
        ko: "수십 페이지 분량의 공고문·제안요청서(RFP/HWP/PDF)에서 결격 사유나 필수 제출 서류를 사람이 일일이 찾다 보면 마감 직전 누락이 발생하거나, LLM 요약 시 원문 쪽 번호가 유실되어 근거를 다시 찾아야 하는 문제가 있었습니다.",
        en: "Manual screening of 50+ page RFP documents risked missing disqualifying clauses, while naive LLM summarization lost original page numbers needed for compliance verification.",
      },
      roleDetails: [
        {
          ko: "나라장터 OpenAPI·기업마당 수집기, 쪽 보존 문서 파서, 규칙 엔진 기반 자격 판정기 단독 설계·구현",
          en: "Solo-engineered G2B/Bizinfo collectors, page-preserving document parsers, and the deterministic eligibility rule engine.",
        },
        {
          ko: "요구사항 정리표 추출기, 제안서 초안 생성기(DOCX/PDF) 및 제출 전 누락 점검(Audit) 엔진 구현",
          en: "Implemented RFP requirements matrix extraction, DOCX/PDF proposal drafting, and pre-submission compliance auditing.",
        },
        {
          ko: "8단계 정거장 지도 UI 및 Three.js 3D 기회 레이더 프론트엔드 개발, 36회 검수→수정 반복",
          en: "Built the 8-station map UI and Three.js 3D opportunity radar, completing 36 full QA-to-fix iterations.",
        },
      ],
      architecture: {
        ko: "Python FastAPI 백엔드 + SQLite 로컬 저장소와 Next.js 16 + React 19 + Three.js 프론트엔드로 구성되며, 로컬 구독형 CLI(Claude Code CLI · Codex CLI)를 서브프로세스로 호출해 API 종량제 비용 없이 문서를 생성·검증합니다.",
        en: "FastAPI + SQLite backend paired with a Next.js 16 + React 19 + Three.js frontend, orchestrating local Claude Code CLI and Codex CLI subprocesses.",
      },
      architectureFlow: [
        "G2B & Bizinfo Daily Collector",
        "Page-Preserving Parser (PDF / HWP / HTML)",
        "Rule Engine Eligibility Gate (188/191 Match)",
        "RFP Requirements Matrix Extractor (P 0.795 · R 0.843)",
        "Proposal Draft Generator (Claude/Codex CLI → DOCX/PDF)",
        "Pre-Submission Auditor & 8-Station Dashboard",
      ],
      implementation: [
        {
          ko: "자격 판정에 LLM 추측 대신 결정형 규칙 엔진을 우선 적용해 원문 쪽 번호·문장과 함께 '가능 / 확인필요 / 불가'를 판정(지원사업 기준 답안 188/191 일치)",
          en: "Prioritized a deterministic rule engine over LLM guessing for eligibility verdicts, attaching exact source page citations (188/191 benchmark match).",
        },
        {
          ko: "동일 저장본에 대해 수정 전·후 판정 변화를 대조하는 리그레션 하니스로 36회 검수→수정 사이클 수행",
          en: "Built a before/after snapshot comparison harness across 36 audit cycles and 2,659 automated tests.",
        },
      ],
      verification: [
        {
          ko: "자동 시험 2,659개 통과, 지원사업 기준 답안 188/191 일치, 실공고 정답셋 기준 요구사항 추출 Precision 0.795 · Recall 0.843 · 쪽 번호 일치율 100%",
          en: "2,659 automated tests passing; 188/191 eligibility accuracy; RFP requirement extraction Precision 0.795, Recall 0.843, and 100% page number match.",
        },
      ],
      challenges: [
        {
          ko: "표와 다단 편집이 섞인 공고문에서 쪽 번호가 밀리는 문제를 쪽 단위 경계 토큰 보존 파싱으로 해결하여 근거 쪽 번호 일치율 100% 달성",
          en: "Preserved page boundary tokens during multi-column PDF/HWP parsing to guarantee 100% source page citation accuracy.",
        },
      ],
      limitations: [
        {
          ko: "사내 입찰 기밀 보호를 위해 외부 클라우드 배포 대신 사내 로컬 환경(v1.0.1)에서 구동되도록 설계됨",
          en: "Designed to run strictly on-premise (Local v1.0.1) to protect internal bidding strategy and company credentials.",
        },
      ],
    },
    links: [],
  },
  {
    slug: "link21-premium",
    name: "LINK21 Premium",
    title: {
      ko: "LINK21 Premium — 실제 고객용 기업 AI 교육 프로덕션 웹서비스",
      en: "LINK21 Premium — Commercial Enterprise AI Education Platform",
    },
    oneLiner: {
      ko: "실제 기업 고객이 사용하는 LINK21 공식 기업 AI 교육 플랫폼(link21premium.com)의 기획·UI/UX·수강신청 파이프라인·관리자 시스템을 End-to-End로 제작·운영",
      en: "End-to-end development and live operations of LINK21's commercial corporate AI training platform (link21premium.com), including course catalogs, enrollment funnels, and admin XLSX reporting.",
    },
    status: "Live Production",
    statusBadge: {
      ko: "Live · 상용 서비스 운영 중 (link21premium.com)",
      en: "Live Production (link21premium.com)",
    },
    isPrivateRepo: true,
    featuredOrder: 4,
    categories: ["Production"],
    role: {
      ko: "웹서비스 0→1 단독 개발 및 라이브 운영 전담",
      en: "0→1 Full-stack Lead Developer & Service Operations",
    },
    period: { ko: "2026.08 – 현재 · 상용 운영 중", en: "Aug 2026 – Present · Live Operations" },
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "Tailwind CSS v4",
      "Vercel",
    ],
    keyMetrics: [
      { ko: "실제 기업 고객 대상 상용 프로덕션 운영 중", en: "Live Commercial Platform Serving Corporate Clients" },
      { ko: "과정 탐색 · 월별 일정 필터 · 수강신청 · 환급 안내 통합", en: "Unified Course Catalog, Monthly Calendar & Enrollment Funnel" },
      { ko: "관리자 실시간 신청자 조회 및 XLSX 일괄 내보내기", en: "Real-Time Admin Applicant Portal & XLSX Export" },
    ],
    slides: [
      {
        src: "/png/link21premium/link21-premium-home.png",
        alt: "LINK21 Premium 메인 홈 화면",
        caption: {
          ko: "메인 홈 — 서비스 소개 및 수강 신청 안내",
          en: "Home — Course catalog and corporate enrollment overview",
        },
      },
      {
        src: "/png/link21premium/link21-premium-schedule.png",
        alt: "LINK21 Premium 월별 교육 일정 화면",
        caption: {
          ko: "월별 교육 일정 — 개설 과정 캘린더 및 동적 필터링",
          en: "Schedule — Monthly course schedule and dynamic filtering",
        },
      },
      {
        src: "/png/link21premium/link21-premium-admin.png",
        alt: "LINK21 Premium 관리자 시스템 화면",
        caption: {
          ko: "서비스 운영 관리자 시스템 — 신청자 실시간 조회 및 XLSX 내보내기",
          en: "Operations Admin — Real-time applicant dashboard & XLSX export",
        },
      },
    ],
    caseStudy: {
      overview: {
        ko: "기업 및 기관 고객이 AI 실무 교육과정을 탐색하고 월별 개설 일정을 확인해 수강신청까지 완료하는 LINK21 공식 프로덕션 웹 플랫폼입니다.",
        en: "The official commercial web platform for LINK21 where enterprise clients explore AI curricula, filter monthly schedules, and complete course enrollment.",
      },
      problem: {
        ko: "기존 수기 안내 방식에서 벗어나 기업 교육 담당자가 커리큘럼·환급 과정 여부·월별 일정을 즉시 비교하고 신청할 수 있는 고신뢰 웹 플랫폼과 실시간 운영 백오피스가 필요했습니다.",
        en: "Required a fast, trustworthy commercial web platform and back-office admin portal so corporate HR managers could compare curricula, schedules, and subsidy options online.",
      },
      roleDetails: [
        {
          ko: "요구사항 정의부터 UI/UX 설계, Next.js 16 + Supabase 풀스택 구현, Vercel 배포 및 상용 운영까지 전 과정 전담",
          en: "Handled end-to-end delivery from UI/UX design and Next.js 16 + Supabase implementation to Vercel deployment and live maintenance.",
        },
      ],
      architecture: {
        ko: "Next.js 16 App Router, React 19, TypeScript, Supabase(PostgreSQL + Auth + RLS), Tailwind CSS v4, Vercel 글로벌 배포 아키텍처로 구성됩니다.",
        en: "Built with Next.js 16 App Router, React 19, TypeScript, Supabase (PostgreSQL + Auth + RLS), Tailwind CSS v4, and Vercel.",
      },
      architectureFlow: [
        "Corporate Client Browser (Desktop / Mobile)",
        "Next.js 16 App Router (Catalog & Schedule Filter)",
        "Enrollment API & Input Validation",
        "Supabase PostgreSQL (RLS Protected)",
        "Admin Dashboard & XLSX Reporting Export",
      ],
      implementation: [
        {
          ko: "월별 교육 일정 동적 필터링, 교육비 환급 안내, 수강신청 퍼널 및 관리자 실시간 신청 현황·XLSX 내보내기 파이프라인 구현",
          en: "Implemented dynamic monthly schedule filtering, subsidy guides, enrollment funnels, and real-time admin XLSX export.",
        },
      ],
      verification: [
        {
          ko: "실제 기업 교육 수강신청 트래픽 무중단 운영 및 데스크톱·모바일 반응형 전환 흐름 검증 완료",
          en: "Operating continuously in production for real corporate training applicants across desktop and mobile devices.",
        },
      ],
      challenges: [
        {
          ko: "운영팀이 비개발자 환경에서도 즉시 신청자 명단을 엑셀로 내려받고 상태를 변경할 수 있도록 원클릭 XLSX 내보내기와 상태 관리 워크플로우 구현",
          en: "Built one-click XLSX export and status workflows so non-technical operations staff can process enrollments immediately.",
        },
      ],
      limitations: [
        {
          ko: "기업 교육 특성상 단체 맞춤 견적 및 B2B 정산 비중이 높아 온라인 신청 접수 후 담당자 해피콜 연동 방식으로 운영 중",
          en: "Tailored for B2B corporate training workflows where online applications trigger dedicated enterprise billing follow-up.",
        },
      ],
    },
    links: [
      {
        label: { ko: "실서비스 보기 (link21premium.com)", en: "Visit Live Service (link21premium.com)" },
        href: "https://www.link21premium.com/",
        type: "live",
      },
    ],
  },
  {
    slug: "tri-agent-control",
    name: "tri-agent-control",
    title: {
      ko: "tri-agent-control — 3개 코딩 CLI 고정 역할 오케스트레이션 파이프라인",
      en: "tri-agent-control — Fixed-Role 3-CLI Coding Orchestration Pipeline",
    },
    oneLiner: {
      ko: "Claude Code(구현) · Antigravity(테스트) · Codex(검토) 3개 코딩 CLI에 역할을 고정해 순차 사이클로 검증·커밋하고, 세션별 git worktree로 격리하는 코딩 파이프라인",
      en: "Coding orchestration pipeline assigning fixed roles to Claude Code (implement), Antigravity (test), and Codex (review) in isolated git worktrees.",
    },
    status: "Research / Experimental",
    statusBadge: {
      ko: "Open Source · 회귀 테스트 384개",
      en: "Open Source · 384 Regression Tests",
    },
    isPrivateRepo: false,
    featuredOrder: 5,
    categories: ["Automation", "AI / RAG", "Experimental"],
    role: {
      ko: "단독 설계 · 구현 · 실사용 검증 및 평가 하니스 구축",
      en: "Solo Architecture, Implementation, Field Validation & Evaluation Harness",
    },
    period: { ko: "2026 · 오픈소스 엔지니어링 도구", en: "2026 · Open-Source Engineering Tool" },
    techStack: [
      "Python",
      "Threading & Subprocess",
      "git worktree",
      "Claude Code CLI",
      "Antigravity CLI",
      "Codex CLI",
      "Pytest (384 tests)",
    ],
    keyMetrics: [
      { ko: "회의실 예약 앱 6기능 실사용: 사이클 커밋 11개(전체 12개) · 테스트 106개", en: "Field Test (6 Features): 11 Cycle Commits (12 Total) · 106 Tests" },
      { ko: "검토 단계가 구현·테스트가 놓친 결함 5건 검출 (동시성 3건 포함)", en: "Codex Review Caught 5 Missed Bugs (Including 3 Concurrency Bugs)" },
      { ko: "자체 회귀 테스트 384개 · 숨김 테스트 평가 하니스 14과제", en: "384 Regression Tests · 14-Task Hidden-Test Eval Harness" },
    ],
    slides: [
      {
        src: "/png/triagent/triagent-01-pipeline.png",
        alt: "tri-agent-control 파이프라인 실행 화면",
        caption: {
          ko: "파이프라인 — 구현(Claude) → 테스트(Antigravity) → 검토(Codex)를 사이클마다 반복하며 커밋",
          en: "Pipeline — Repeats Implement (Claude) → Test (Antigravity) → Verify → Review (Codex) per cycle",
        },
      },
      {
        src: "/png/triagent/triagent-02-review.png",
        alt: "Codex 동시성 결함 검출 및 다음 사이클 수정 화면",
        caption: {
          ko: "검토 → 수정 — Codex가 동시성 결함을 지적하고, 다음 사이클에서 Claude가 고침",
          en: "Review → Fix — Codex flags a race condition and Claude resolves it in the next cycle",
        },
      },
      {
        src: "/png/triagent/triagent-03-result-week.png",
        alt: "파이프라인으로 구현한 회의실 예약 앱 주간 달력 화면",
        caption: {
          ko: "결과물 — 파이프라인으로 만든 회의실 예약 앱(FastAPI + React)의 주간 달력",
          en: "Deliverable — Weekly calendar of the FastAPI + React meeting room booking app built by the pipeline",
        },
      },
      {
        src: "/png/triagent/triagent-04-result-conflict.png",
        alt: "회의실 예약 시간 겹침 방지 검증 화면",
        caption: {
          ko: "결과물 — 같은 회의실 시간 겹침을 막고 겹치는 예약을 알려 줌",
          en: "Deliverable — Conflict detection preventing overlapping bookings for the same room",
        },
      },
    ],
    labSystemId: "tri-agent-control",
    caseStudy: {
      overview: {
        ko: "구현과 테스트, 코드 검토를 한 에이전트가 동시에 수행할 때 발생하는 자기 합리화(Self-grading bias)를 막기 위해, Claude Code(구현) · Antigravity(테스트 작성) · Codex(읽기 전용 검토) 3개 CLI에 역할을 고정한 자동화 코딩 파이프라인입니다.",
        en: "Eliminates single-agent self-grading bias by locking three coding CLIs into strict roles: Claude Code (implementation), Antigravity (test authoring), and Codex (read-only code review).",
      },
      problem: {
        ko: "하나의 코딩 에이전트에게 구현과 테스트를 모두 맡기면 자신이 짠 코드의 엣지 케이스나 동시성 경쟁 조건(Race Condition)을 통과시키는 테스트만 작성하는 한계가 있었습니다.",
        en: "When a single coding agent writes both implementation and tests, it tends to write happy-path tests that miss race conditions and edge cases in its own code.",
      },
      roleDetails: [
        {
          ko: "고정 역할 순차 사이클 엔진, 역할별 파일 변경 권한 제한(테스트 단계는 테스트 파일만, 계획·검토는 읽기 전용), 별도 토론 모드 단독 설계·구현",
          en: "Designed the fixed-role sequential cycle runner, file-mutation guards per role, and a separate multi-agent debate mode.",
        },
        {
          ko: "Git 저장소일 때 세션별 git worktree 격리 및 사이클별 변경 파일 선별 커밋, 14과제 숨김 테스트 평가 하니스 구축",
          en: "Built per-session git worktree isolation, cycle-boundary resource guards, and a 14-task evaluation harness.",
        },
      ],
      architecture: {
        ko: "계획 1회(Claude, 읽기 전용) → 사용자 승인 → [구현(Claude) → 테스트(Antigravity, 테스트 파일 한정) → 자동 검증(pytest·npm test·build) → 검토(Codex, 읽기 전용 REVIEW: PASS / REVIEW: CHANGES)] 사이클을 반복하며, 최근 6줄(360자 절단) 요약을 brief.md로 주입합니다.",
        en: "Runs Plan Once (Claude, read-only) → User Approval → [Implement (Claude) → Test (Antigravity, test files only) → Auto-Verify (pytest/npm test/build) → Review (Codex, read-only PASS/CHANGES)] with a 6-line (360-char) brief.md context window.",
      },
      architectureFlow: [
        "Plan 1x (Claude Read-Only) & User Approval",
        "Session git worktree Isolation (Venv / node_modules Linked)",
        "Implement Step (Claude Code CLI)",
        "Test Step (Antigravity CLI · Test Files Only)",
        "Auto Verification (pytest · npm test · build)",
        "Review Step (Codex CLI Read-Only · PASS / CHANGES) & Selective Commit",
      ],
      implementation: [
        {
          ko: "시간·토큰·diff 한도는 실행 도중 강제 종료하지 않고 사이클 경계에서만 확인해 작업 유실 방지",
          en: "Checks time, token, and diff budgets strictly at cycle boundaries rather than killing active subprocesses mid-write.",
        },
        {
          ko: "작업 폴더가 Git 저장소일 때 세션마다 별도 git worktree를 생성하고 기존 가상환경·node_modules를 연결하며, 사이클마다 실제로 바뀐 파일만 골라 브랜치에 커밋",
          en: "Creates isolated git worktrees per session when in a Git repo, links existing venv/node_modules, and commits only modified files per cycle.",
        },
      ],
      verification: [
        {
          ko: "실사용 검증: 회의실 예약 웹앱(FastAPI+SQLite, React+Vite) 6개 기능을 파이프라인으로 구현 — 전체 커밋 12개 중 파이프라인 사이클 커밋 11개, 테스트 106개 통과",
          en: "Field-tested by building a 6-feature meeting room booking app (FastAPI+SQLite, React+Vite): 11 pipeline cycle commits (out of 12 total) and 106 passing tests.",
        },
        {
          ko: "Codex 검토 단계가 구현·테스트 단계가 놓친 결함 5건(동시성 경쟁 조건 3건 포함) 검출 → 4건은 다음 사이클에서 즉시 해결, 마지막 사이클에 남은 1건은 마무리 세션에서 해결",
          en: "Codex review caught 5 defects missed by implementation and test stages (including 3 concurrency bugs): 4 resolved in subsequent cycles, 1 in the wrap-up session.",
        },
        {
          ko: "자체 회귀 테스트 384개 통과 및 14과제 숨김 테스트 평가 하니스 구축",
          en: "Verified with 384 internal regression tests and a 14-task hidden-test evaluation harness.",
        },
      ],
      challenges: [
        {
          ko: "Windows 환경에서 여러 CLI 서브프로세스의 표준 입출력 인코딩과 프로세스 트리 종료가 충돌하는 문제를 스레드 기반 스트림 리더와 작업 경계 정리기로 해결",
          en: "Resolved Windows subprocess encoding and process-tree cleanup issues using threaded stream readers and cycle-boundary teardown.",
        },
      ],
      limitations: [
        {
          ko: "3개 CLI를 순차 실행하므로 단일 에이전트 대비 사이클당 실행 시간이 더 소요되며, 대규모 리팩터링보다 기능 단위 구현·검증에 최적화됨",
          en: "Sequential 3-CLI verification trades raw speed for higher defect detection, making it best suited for feature-level implementation and verification.",
        },
      ],
    },
    links: [
      {
        label: { ko: "GitHub 저장소", en: "GitHub Repository" },
        href: "https://github.com/kwsahe/tri-agent-control",
        type: "github",
      },
    ],
  },
  {
    slug: "market-pulse",
    name: "Market Pulse",
    title: {
      ko: "Market Pulse — 다나와 9개 카테고리 일일 시세 수집 · 이상치 필터 · 로그 가격 ML 적정가 예측",
      en: "Market Pulse — Daily Hardware Price ETL, Anomaly Filtering & Log-Price ML Fair-Value Platform",
    },
    oneLiner: {
      ko: "다나와 9개 카테고리 약 5.8만 건 스냅샷(57,690건)을 매일 자동 수집해 미끼가·오염 데이터를 걸러내고, 로그 가격 ML 적정가 예측(R² 0.78)과 Three.js 3D 데스크로 시각화하는 플랫폼",
      en: "Hardware analytics platform collecting 57,690 snapshots across 9 Danawa categories daily, filtering bait prices, predicting log-price ML fair values (R² 0.78), and visualizing via a Three.js 3D desk.",
    },
    status: "Live Production",
    statusBadge: {
      ko: "Live 데모 (매일 자동 갱신) · 222개 테스트",
      en: "Live Demo (Updated Daily) · 222 Tests",
    },
    isPrivateRepo: false,
    featuredOrder: 6,
    categories: ["Data & Analytics", "Production", "AI / RAG"],
    role: {
      ko: "데이터 수집 파이프라인 · ML 적정가 모델 · FastAPI 17개 API · React 19 + Three.js 프론트엔드 단독 개발",
      en: "Solo Developer — Daily ETL Pipeline, ML Fair-Price Model, 17 FastAPI Endpoints & React 19 + Three.js UI",
    },
    period: { ko: "2026 · 오픈소스 & 매일 자동 갱신 데모", en: "2026 · Open Source & Daily Updated Live Demo" },
    techStack: [
      "React 19",
      "TypeScript",
      "Three.js (@react-three/fiber)",
      "FastAPI (17 APIs)",
      "Python",
      "SQLite",
      "Scikit-learn",
      "GitHub Actions",
      "Pytest (196) + Vitest (26)",
    ],
    keyMetrics: [
      { ko: "9개 카테고리 약 5.8만 건 스냅샷(57,690건) 매일 자동 수집", en: "57,690 Snapshots Across 9 Categories Collected Daily" },
      { ko: "로그 가격 ML 예측 R² 0.78 · 80% 범위 적중률 81.1%", en: "Log-Price ML R² 0.78 · 81.1% Hit Rate on 80% Interval" },
      { ko: "FastAPI 17개 API · pytest 196개 + vitest 26개 통과", en: "17 FastAPI Endpoints · 196 Pytest + 26 Vitest Passing" },
    ],
    slides: [
      {
        src: "/png/screenshots_market-palse/v3_01_desk_3d.png",
        alt: "Market Pulse Three.js 3D 데스크 화면",
        caption: {
          ko: "3D 데스크 — 부품을 클릭하면 해당 카테고리 시세 패널이 열리는 Three.js 화면",
          en: "3D Desk — Interactive Three.js hardware setup opening category market panels on click",
        },
      },
      {
        src: "/png/screenshots_market-palse/v3_02_overview.png",
        alt: "Market Pulse 9개 카테고리 시장 개요 화면",
        caption: {
          ko: "시장 개요 — 9개 카테고리 요약 지표와 중앙값·가격 인상/인하 상품 표",
          en: "Market Overview — 9-category summary KPIs, medians, and price risers/fallers",
        },
      },
      {
        src: "/png/screenshots_market-palse/v3_03_price_changes.png",
        alt: "Market Pulse 가격 변동 리포트 화면",
        caption: {
          ko: "가격 변동 리포트 — 직전 수집일 대비 급등·급락 상품 추적 및 변동 분석",
          en: "Price Changes — Tracks sharp daily price drops and spikes against previous snapshots",
        },
      },
      {
        src: "/png/screenshots_market-palse/v3_04_prediction.png",
        alt: "Market Pulse ML 적정가 예측 화면",
        caption: {
          ko: "가격 예측 — 부품 스펙 기반 ML 적정가와 80% 예측 범위, 적정가 점수",
          en: "Fair-Price Prediction — Spec-driven ML fair price, 80% prediction interval, and value score",
        },
      },
      {
        src: "/png/screenshots_market-palse/v3_05_anomalies.png",
        alt: "Market Pulse 이상치 탐지 화면",
        caption: {
          ko: "이상치 탐지 — 카테고리별 통계와 Z-score·IQR 기준으로 크게 벗어난 가격 표시",
          en: "Anomaly Detection — Highlights statistical outliers using category Z-score and IQR bounds",
        },
      },
    ],
    labSystemId: "market-pulse",
    caseStudy: {
      overview: {
        ko: "다나와 PC 하드웨어 9개 카테고리(CPU, GPU, RAM, SSD, 메인보드, 파워, 쿨러, 케이스, 모니터) 시세를 매일 자동으로 수집·정제하고, 스펙 기반 머신러닝 적정가 예측과 Z-score/IQR 이상치 탐지 결과를 Three.js 3D 데스크 및 대시보드로 제공하는 시스템입니다.",
        en: "An end-to-end hardware market intelligence platform that collects daily prices across 9 PC component categories, filters anomalies, predicts fair prices with machine learning, and serves interactive 3D/2D analytics.",
      },
      problem: {
        ko: "오픈마켓·가격비교 사이트에는 '9,999,990원 품절 표기', '케이블·브래킷 액세서리 혼입', '중고·벌크 미끼가'가 섞여 있어 단순 평균이나 기본 회귀 모델로는 적정가를 신뢰할 수 없었습니다.",
        en: "Raw price listings contain placeholder prices (9,999,990 KRW), accessory contamination, and bait listings that severely distort naive averages and linear regressions.",
      },
      roleDetails: [
        {
          ko: "다나와 9개 카테고리 무인 수집기 및 미끼가·비정상가·오염 수집 필터 설계·구현",
          en: "Built the automated 9-category scraper and multi-stage bait/anomaly/contamination filtering pipeline.",
        },
        {
          ko: "로그 가격 변환 및 제품명 세대·등급·용량 피처 추출 기반 ML 적정가 예측 모델 개선",
          en: "Improved the ML fair-price model using log-price targets and regex-extracted generation/tier/capacity features.",
        },
        {
          ko: "FastAPI 17개 REST 엔드포인트, React 19 + Three.js 3D 데스크 시각화 및 일일 정적 스냅샷 자동 배포 구축",
          en: "Engineered 17 FastAPI endpoints, the React 19 + Three.js 3D desk scene, and daily GitHub Pages snapshot publishing.",
        },
      ],
      architecture: {
        ko: "Python 수집·정제·ML 파이프라인 + SQLite + FastAPI(17개 API) 백엔드와 React 19 + TypeScript + Three.js(@react-three/fiber) 프론트엔드로 구성되며, 백엔드 미연결 시에도 매일 갱신되는 정적 스냅샷으로 전체 기능을 탐색할 수 있습니다.",
        en: "Python ETL/ML + SQLite + FastAPI (17 endpoints) backend paired with a React 19 + Three.js frontend supporting seamless fallback to daily updated static snapshots.",
      },
      architectureFlow: [
        "Daily Danawa Scraper (9 Categories · 57,690 Snapshots)",
        "Contamination & Bait-Price Filter (Placeholder · Accessory Removal)",
        "Feature Extractor (Generation · Tier · Capacity) & Log-Price ML",
        "Anomaly Detector (Category Z-Score & IQR)",
        "FastAPI 17 Endpoints & Daily Static Snapshot Exporter",
        "React 19 + Three.js 3D Hardware Desk & Analytics UI",
      ],
      implementation: [
        {
          ko: "제품명에서 세대·등급·소켓·용량 피처를 정밀 추출하고 로그 가격(log1p)을 예측하도록 개선해 전체 R² 0.78, 80% 예측 구간 적중률 81.1% 달성 (CPU 중앙 오차 28.0% → 17.5%로 단축)",
          en: "Extracted generation, tier, socket, and capacity features from product names and trained on log-transformed prices, achieving R² 0.78, 81.1% interval coverage, and reducing CPU median error from 28.0% to 17.5%.",
        },
      ],
      verification: [
        {
          ko: "백엔드 pytest 196개 + 프론트엔드 vitest 26개(총 222개 자동화 테스트) 통과 및 GitHub Actions 기반 일일 데모 갱신 운영",
          en: "Verified by 196 pytest backend tests and 26 vitest frontend tests (222 total), with automated daily snapshot updates.",
        },
      ],
      challenges: [
        {
          ko: "고가 그래픽카드·CPU와 저가 쿨러·케이스 간 가격 스케일 차이로 인한 잔차 왜곡을 로그 가격 학습과 카테고리별 분위수 구간 추론으로 해결",
          en: "Resolved heteroscedastic price variance across hardware tiers via log-target transformation and quantile interval estimation.",
        },
      ],
      limitations: [
        {
          ko: "정적 호스팅(GitHub Pages) 데모 환경에서는 실시간 DB 쓰기 대신 매일 자동 갱신되는 최신 스냅샷 JSON을 기반으로 동작",
          en: "The public GitHub Pages demo serves daily auto-updated snapshot JSONs when the local FastAPI server is offline.",
        },
      ],
    },
    links: [
      {
        label: { ko: "Live 데모 열기 (매일 갱신)", en: "Open Live Demo (Updated Daily)" },
        href: "https://kwsahe.github.io/market-pulse/",
        type: "demo",
      },
      {
        label: { ko: "GitHub 저장소", en: "GitHub Repository" },
        href: "https://github.com/kwsahe/market-pulse",
        type: "github",
      },
    ],
  },
  {
    slug: "k-safety-law-rag",
    name: "k-safety-law-rag",
    title: {
      ko: "k-safety-law-rag — 건설현장 중대재해처벌법 · 산업안전보건법 이중 RAG 시스템",
      en: "k-safety-law-rag — Construction Safety Law Dual Text+Table RAG System",
    },
    oneLiner: {
      ko: "법령 본문(Text)과 별표 표(Table)를 분리 색인한 이중 ChromaDB RAG와 Claude Opus 5.5 전용 근거 주입 경로로 종합 평가 90.0점(합격)을 달성한 법률 AI 시스템",
      en: "Legal AI system combining dual Text+Table ChromaDB retrieval with a dedicated Claude Opus 5.5 context pipeline, raising benchmark accuracy from 78.8 to 90.0.",
    },
    status: "Prototype",
    statusBadge: {
      ko: "Open Source · 종합 평가 90.0점 · 41개 테스트",
      en: "Open Source · 90.0 Eval Score · 41 Tests",
    },
    isPrivateRepo: false,
    categories: ["AI / RAG"],
    role: {
      ko: "이중 RAG 설계 · 모델별 답변 경로 분리 · 출처 검증기 · 평가 파이프라인 구축",
      en: "Dual-RAG Architect, Model Router, Citation Validator & Benchmark Evaluation Lead",
    },
    period: { ko: "2026 · 법령 도메인 AI 프로젝트", en: "2026 · Legal Domain AI Project" },
    techStack: [
      "Python",
      "Claude Opus 5.5",
      "ChromaDB",
      "bge-m3",
      "EXAONE-4.0-32B",
      "Qwen2.5-14B",
      "FastAPI",
      "SQLite",
      "Pytest (41 tests)",
    ],
    keyMetrics: [
      { ko: "리튬전지 화재 종합 테스트셋 78.8점(불합격) → 90.0점(합격, 기준 80점)", en: "Benchmark Score Improved from 78.8 (Fail) → 90.0 (Pass, Threshold 80)" },
      { ko: "검색 근거 33~49건(최대 1.8만 자) 무손실 주입 · 처벌 수위 96점 · 보고서 95점", en: "33–49 Retrieved Articles (Up to 18k Chars) · Sentencing 96 · Report 95" },
      { ko: "출처 정규식 검증기 & 41개 단위·회귀 테스트 100% 통과", en: "Regex Citation Validator & 41/41 Regression Tests Passing" },
    ],
    slides: [
      {
        src: "/png/k_safety_law_rag_chatbot.png",
        alt: "k-safety-law-rag 상담 챗봇 화면",
        caption: {
          ko: "상담 챗봇 — 건설현장 사고 시나리오 입력 및 위반 법령·책임 주체 실시간 상담 UI",
          en: "Consultation UI — Construction accident scenario analysis and statutory violation breakdown",
        },
      },
      {
        src: "/png/k-safety-law-rag-claude/02-claude-scenario-answer.png",
        alt: "Claude Opus 5.5 법령 답변 화면",
        caption: {
          ko: "Claude 법령 답변 — Claude Opus 5.5가 검색 근거 전체로 23명 사망 사고의 중대재해처벌법·산안법 적용을 판단",
          en: "Claude Legal Verdict — Full-context analysis of a 23-fatality accident under the Serious Accidents Punishment Act",
        },
      },
      {
        src: "/png/k-safety-law-rag-claude/01-claude-scenario-analysis.png",
        alt: "Claude 시나리오 사실관계 구조화 화면",
        caption: {
          ko: "Claude 시나리오 분석 — 사고 원문을 사고 유형·사상자·도급 구조·미조치 사항으로 구조화",
          en: "Scenario Structuring — Parses raw incident text into casualties, subcontracting structure, and safety failures",
        },
      },
      {
        src: "/png/k-safety-law-rag-claude/03-claude-admin-cli.png",
        alt: "관리자 CLI 실행 경로 및 출처 검증 화면",
        caption: {
          ko: "관리자 CLI — 실행 경로 claude_rag, 모델명 claude-opus-5-5, 출처 검증 결과를 기록",
          en: "Admin CLI — Logs execution route (claude_rag), model (claude-opus-5-5), and citation verification status",
        },
      },
      {
        src: "/png/k-safety-law-rag-claude/04-claude-quality-dashboard.png",
        alt: "품질 관리 대시보드 화면",
        caption: {
          ko: "품질 관리 — Claude API 연결 상태와 출처 검증 현황",
          en: "Quality Dashboard — Monitors Claude API connectivity and citation validation metrics",
        },
      },
      {
        src: "/png/pptx_final/image1.png",
        alt: "Text RAG + Table RAG 이중 ChromaDB 아키텍처 다이어그램",
        caption: {
          ko: "시스템 아키텍처 — Text RAG + Table RAG 이중 ChromaDB 분리 검색 파이프라인",
          en: "System Architecture — Dual Text + Table ChromaDB retrieval and verification pipeline",
        },
      },
    ],
    labSystemId: "k-safety-law-rag",
    caseStudy: {
      overview: {
        ko: "건설현장 사망·중대재해 시나리오를 입력받아 중대재해처벌법·산업안전보건법·근로기준법 위반 조항, 양벌규정, 처벌 수위를 판별하는 도메인 특화 법령 RAG 시스템입니다.",
        en: "A domain-specific legal RAG system that analyzes construction accident scenarios to determine violated articles, subcontracting liability, and statutory penalties.",
      },
      problem: {
        ko: "법령 PDF를 단순 텍스트 청크로만 분할하면 '시행규칙 별표 5(특별안전보건교육 대상 작업별 교육내용)' 같은 표 구조가 깨져 검색이 실패하고, 소형 모델용 2,200자 절단 프롬프트가 고성능 모델의 근거까지 잘라버리는 문제가 있었습니다.",
        en: "Standard text chunking mangled statutory appendix tables (e.g., Appendix 5 safety training requirements), while a legacy 2,200-char context cap starved high-capacity LLMs of retrieved articles.",
      },
      roleDetails: [
        {
          ko: "pdfplumber 기반 본문(500자 청크) + 별표 표(행 단위) 분리 추출 및 이중 ChromaDB(bge-m3) 색인 구축",
          en: "Built dual ChromaDB indexing with bge-m3 embeddings separating 500-char article chunks from row-level appendix tables.",
        },
        {
          ko: "call_llm_blocking() 진입점 모델 분기 및 rag/claude_chat.py 전용 파이프라인(검색 근거 33~49건, 최대 1.8만 자 주입) 신규 구축",
          en: "Engineered model-specific routing in call_llm_blocking() and created rag/claude_chat.py injecting 33–49 retrieved clauses (up to 18k chars).",
        },
        {
          ko: "조문 머리(제N조() 정규식 대조 기반 출처 검증기(CitationValidatorNode) 및 41개 회귀 테스트 구축",
          en: "Implemented regex-anchored CitationValidatorNode to eliminate table-of-contents false positives and passed 41 regression tests.",
        },
      ],
      architecture: {
        ko: "6단계 노드 파이프라인(ScenarioProfile → QuestionScope → IntentClassifier → RetrievalPlan → CacheGuard → CitationValidator)과 Text+Table 이중 ChromaDB, Claude Opus 5.5 / Colab(Qwen2.5-14B·EXAONE) 이원화 추론 경로로 구성됩니다.",
        en: "6-node legal reasoning pipeline backed by dual Text+Table ChromaDB collections and dual inference routes (Claude Opus 5.5 API vs. remote Colab Qwen2.5-14B/EXAONE).",
      },
      architectureFlow: [
        "ScenarioProfileNode (Incident JSON Structuring)",
        "QuestionScope & 7-Class Legal Intent Classifier",
        "Dual ChromaDB Retrieval (Text 500c + Table Row · bge-m3)",
        "Model Router (Claude Opus 5.5 Full 18k Context vs Local Route)",
        "CitationValidatorNode (Article Header Regex Gate)",
        "Verified Legal Opinion & Quality Telemetry Dashboard",
      ],
      implementation: [
        {
          ko: "기존 로컬 모델용 2,200자 절단 경로와 분리해 Claude Opus 5.5에는 검색된 법령 33~49건(1.3만~1.8만 자)을 무손실 주입하도록 파이프라인 개편",
          en: "Bypassed the legacy 2,200-char local model truncation to feed all 33–49 retrieved statutory articles (13k–18k chars) into Claude Opus 5.5.",
        },
      ],
      verification: [
        {
          ko: "화성 리튬전지 공장 화재(23명 사망) 등 종합 테스트셋 웹 실측 평균 78.8점(불합격) → 90.0점(합격, 기준 80점) 달성 (처벌 수위 96점 · 종합 보고서 95점), 41개 테스트 100% 통과",
          en: "Raised comprehensive web benchmark score from 78.8 (Fail) to 90.0 (Pass, 80 threshold)—scoring 96 on sentencing and 95 on final reports—with 41/41 tests passing.",
        },
      ],
      challenges: [
        {
          ko: "법령 본문 중간에 등장하는 인용 문구('제38조에 따라...')가 조문 제목으로 오인되어 오탐을 일으키는 문제를 조문 머리 정규식(제N조() 매칭으로 해결",
          en: "Eliminated false-positive citation warnings caused by in-body cross-references by matching strict article-header regex patterns.",
        },
      ],
      limitations: [
        {
          ko: "법률 자문 보조 도구로서 최신 법령 개정분은 주기적인 PDF 재색인 파이프라인 실행을 통해 반영",
          en: "Serves as a legal research assistant where statutory amendments are updated via scheduled PDF re-indexing runs.",
        },
      ],
    },
    links: [
      {
        label: { ko: "GitHub 저장소", en: "GitHub Repository" },
        href: "https://github.com/kwsahe/k-safety-law-rag",
        type: "github",
      },
    ],
  },
  {
    slug: "link21-ai-chatbot",
    name: "LINK21 AI Chatbot (링키)",
    title: {
      ko: "LINK21 AI Chatbot (링키) — 상용 교육 플랫폼 0→1 의도 라우팅 & SSE 스트리밍 챗봇",
      en: "LINK21 AI Chatbot (Linky) — 0→1 Intent-Routed SSE Streaming Production Chatbot",
    },
    oneLiner: {
      ko: "LINK21 Premium 공식 플랫폼에 탑재되어 실시간 과정 추천·환급 안내·수강 상담을 수행하는 0→1 자체 구축 AI 챗봇",
      en: "Production AI chatbot built from 0 to 1 and embedded in LINK21 Premium for real-time course recommendation, subsidy Q&A, and SSE token streaming.",
    },
    status: "Live Production",
    statusBadge: {
      ko: "Live · 0→1 자체 구축 · link21premium.com 탑재",
      en: "Live Production · 0→1 Built on link21premium.com",
    },
    isPrivateRepo: true,
    categories: ["Production", "AI / RAG"],
    role: {
      ko: "대화 위젯 UI · 의도 분류 라우터 · SSE 스트리밍 백엔드 0→1 단독 설계·구현·운영",
      en: "0→1 Solo Architect & Developer — Widget UI, Intent Router & SSE Streaming Backend",
    },
    period: { ko: "2026.08 – 현재 · 상용 운영 중", en: "Aug 2026 – Present · Live Operations" },
    techStack: [
      "Next.js",
      "TypeScript",
      "OpenAI API",
      "Gemini API",
      "Server-Sent Events (SSE)",
      "Supabase",
      "Tailwind CSS",
    ],
    keyMetrics: [
      { ko: "기존 챗봇 유지보수가 아닌 0→1 전체 아키텍처 신규 구축", en: "Built 0→1 From Scratch (Widget UI + Intent Router + SSE Engine)" },
      { ko: "질문 의도 분류(Intent Routing) 및 실시간 과정 데이터 동적 주입", en: "Dynamic Course Context Injection via Pre-Query Intent Routing" },
      { ko: "Gemini / OpenAI 프로바이더 자동 Fallback 및 Rate Limiting", en: "Dual-Provider (Gemini/OpenAI) Automatic Failover & Rate Limiting" },
    ],
    slides: [
      {
        src: "/png/link21premium/link21-chatbot.png",
        alt: "LINK21 AI 챗봇 링키 대화 인터페이스 화면",
        caption: {
          ko: "대화 인터페이스 — 의도 분류 기반 추천 카드 멘션 및 SSE 실시간 스트리밍 대화 위젯",
          en: "Chat Interface — Intent-routed course card mentions and real-time SSE streaming widget",
        },
      },
      {
        src: "/png/link21premium/link21-premium-home.png",
        alt: "LINK21 Premium 메인 홈 우측 하단 챗봇 탑재 화면",
        caption: {
          ko: "상용 서비스 연동 — LINK21 Premium 공식 플랫폼 우측 하단 플로팅 상담 위젯 배포",
          en: "Live Integration — Embedded floating assistant on the commercial LINK21 Premium platform",
        },
      },
    ],
    labSystemId: "link21-ai-chatbot",
    caseStudy: {
      overview: {
        ko: "LINK21 Premium 방문 고객이 원하는 직무·일정·환급 여부에 맞춰 최적의 교육과정을 즉시 추천받고 수강신청으로 연결되도록 0에서 1까지 직접 설계·구현한 상용 AI 챗봇입니다.",
        en: "A commercial AI assistant embedded in LINK21 Premium that classifies visitor intent, injects live curriculum schedules, and streams responses with interactive course cards.",
      },
      problem: {
        ko: "방대한 과정 카탈로그에서 기업 교육 담당자가 자신에게 맞는 과정과 고용보험 환급 절차를 빠르게 찾기 어려웠고, 일반 LLM 호출 시 개설되지 않은 과정을 환각으로 안내할 위험이 있었습니다.",
        en: "Visitors struggled to match their needs against dozens of courses, and ungrounded LLM calls risked hallucinating non-existent course dates or policies.",
      },
      roleDetails: [
        {
          ko: "플로팅 대화 위젯 UI, 추천 질의(Suggestions), 과정 추천 카드 멘션 렌더링 직접 구현",
          en: "Built the floating chat widget UI, dynamic suggestion chips, and interactive course card mentions.",
        },
        {
          ko: "질문 의도 분류 라우터, Supabase 실시간 개설 과정 주입, SSE 스트리밍 및 Gemini/OpenAI Fallback 백엔드 구축",
          en: "Engineered the intent router, live Supabase course context injection, SSE streaming, and Gemini/OpenAI failover.",
        },
      ],
      architecture: {
        ko: "Next.js Route Handler 기반 SSE 스트리밍 서버와 질문 의도 분류기(과정 추천 / 일정 문의 / 환급 규정 / 일반 상담), Supabase 세션·로그 저장소, 이중 LLM 프로바이더(OpenAI / Gemini)로 구성됩니다.",
        en: "Next.js SSE streaming route handlers coupled with an intent classifier, Supabase curriculum/session store, and dual OpenAI/Gemini provider failover.",
      },
      architectureFlow: [
        "Floating Chat Widget (Session & Rate-Limit Guard)",
        "Intent Classifier (Course / Schedule / Subsidy / FAQ)",
        "Dynamic Context Builder (Supabase Live Course Catalog)",
        "LLM Stream Router (Primary OpenAI ⇄ Fallback Gemini)",
        "SSE Token Stream & Interactive Course Card Renderer",
      ],
      implementation: [
        {
          ko: "Server-Sent Events(SSE) 실시간 토큰 스트리밍으로 체감 응답 지연을 최소화하고 답변 내 과정 코드를 파싱해 클릭 가능한 과정 카드로 변환",
          en: "Minimized perceived latency with SSE token streaming and parsed course identifiers into clickable enrollment cards.",
        },
      ],
      verification: [
        {
          ko: "link21premium.com 실서비스 배포 후 실제 기업 고객 상담 세션 무중단 운영 및 프로바이더 Fallback 검증",
          en: "Continuously serving live customer inquiries on link21premium.com with verified provider failover.",
        },
      ],
      challenges: [
        {
          ko: "단일 LLM API 장애나 쿼터 한도 도달 시 상담이 중단되지 않도록 스트림 시작 전 헬스 체크 및 자동 프로바이더 전환(Fallback) 로직 적용",
          en: "Prevented chat downtime during upstream API rate limits by implementing automatic pre-stream failover between OpenAI and Gemini.",
        },
      ],
      limitations: [
        {
          ko: "개인정보 보호를 위해 채팅창 내 직접 결제 대신 과정 신청 페이지 딥링크 및 상담 접수 폼 연동 방식으로 설계",
          en: "Hands off final enrollment to verified application forms via deep-linked course cards to protect user privacy.",
        },
      ],
    },
    links: [
      {
        label: { ko: "실서비스에서 챗봇 확인 (link21premium.com)", en: "Try Live Chatbot (link21premium.com)" },
        href: "https://www.link21premium.com/",
        type: "live",
      },
    ],
  },
  {
    slug: "business-card-auto",
    name: "business-card-auto",
    title: {
      ko: "business-card-auto — 프라이버시 우선 무서버(Zero-Server) vCard 3.0 QR 디지털 명함 웹앱",
      en: "business-card-auto — Privacy-First Zero-Server vCard 3.0 QR Business Card Studio",
    },
    oneLiner: {
      ko: "개인정보를 서버로 전혀 전송하지 않고 브라우저 메모리(Canvas/SVG)에서 60fps로 명함과 vCard 3.0 동적 QR을 즉시 생성·저장하는 상용 웹서비스",
      en: "Zero-server web app rendering print-ready business cards and vCard 3.0 QR codes at 60fps entirely in browser memory without transmitting personal data.",
    },
    status: "Live Production",
    statusBadge: {
      ko: "Live 상용 배포 (business-card-auto.vercel.app)",
      en: "Live Production (business-card-auto.vercel.app)",
    },
    isPrivateRepo: true,
    categories: ["Production", "Automation"],
    role: {
      ko: "기획 · 무서버 Canvas/SVG 렌더링 엔진 · vCard 3.0 QR 인코더 · 배포 단독 개발",
      en: "Solo Developer — Zero-Server Canvas/SVG Engine, vCard 3.0 QR Encoder & Vercel Deployment",
    },
    period: { ko: "2026 · 상용 배포 서비스", en: "2026 · Live Commercial Web App" },
    techStack: [
      "Next.js 14 App Router",
      "React 18",
      "TypeScript",
      "HTML5 Canvas / SVG",
      "vCard 3.0 QR",
      "Tailwind CSS",
      "Vercel",
    ],
    keyMetrics: [
      { ko: "서버 전송 0건(Zero-Server) 프라이버시 우선 아키텍처", en: "Zero-Server Privacy Architecture (0 Network Payload for PII)" },
      { ko: "60fps 실시간 Canvas/SVG 렌더링 및 vCard 3.0 QR 매핑", en: "60fps Real-Time Canvas/SVG Rendering & vCard 3.0 QR Encoding" },
      { ko: "카카오톡·인스타그램 등 모바일 인앱 브라우저 저장 완벽 대응", en: "Full Compatibility with Mobile In-App Browsers (Kakao/Instagram)" },
    ],
    slides: [
      {
        src: "/png/screenshots_business-card-auto/01_poster.png",
        alt: "business-card-auto 행사 포스터 및 QR 명함 화면",
        caption: {
          ko: "행사 포스터 — 카메라 스캔 즉시 주소록에 매핑되는 vCard 3.0 QR 명함 포스터 및 인쇄 뷰",
          en: "Event Poster — Print-ready vCard 3.0 QR business card poster mapping directly to phone contacts",
        },
      },
      {
        src: "/png/screenshots_business-card-auto/02_template_teal.png",
        alt: "business-card-auto Teal Corporate 템플릿 화면",
        caption: {
          ko: "Teal Corporate 템플릿 — 모던 기업용 명함 실시간 Canvas 렌더링 및 동적 QR 인코딩",
          en: "Teal Corporate Template — Real-time Canvas rendering and dynamic QR encoding",
        },
      },
      {
        src: "/png/screenshots_business-card-auto/03_template_korean.png",
        alt: "business-card-auto Blue Korean 템플릿 화면",
        caption: {
          ko: "Blue Korean 템플릿 — 제로-서버 브라우저 메모리 기반 고해상도 국문 명함 레이아웃",
          en: "Blue Korean Template — High-DPI Korean typography layout rendered in browser memory",
        },
      },
    ],
    caseStudy: {
      overview: {
        ko: "박람회·네트워킹 현장에서 이름·연락처·이메일 등 민감한 개인정보를 외부 서버에 남기지 않고, 스마트폰 카메라 스캔 한 번으로 연락처 앱에 자동 등록되는 vCard 3.0 QR 명함을 즉시 제작하는 웹서비스입니다.",
        en: "A privacy-first web application that generates downloadable business cards with embedded vCard 3.0 QR codes entirely client-side.",
      },
      problem: {
        ko: "기존 무료 명함 제작 사이트들은 회원가입과 서버 DB 저장을 강제해 개인정보 유출 우려가 크고, 모바일 카카오톡 인앱 브라우저에서 이미지 다운로드가 차단되는 문제가 있었습니다.",
        en: "Conventional card generators require server-side PII storage and often fail to trigger image downloads inside mobile in-app browsers.",
      },
      roleDetails: [
        {
          ko: "Next.js 14 App Router 기반 무서버 클라이언트 렌더링 아키텍처 및 다국어 vCard 3.0 UTF-8 인코더 단독 구현",
          en: "Built the zero-server client rendering pipeline and UTF-8 vCard 3.0 QR encoder.",
        },
      ],
      architecture: {
        ko: "모든 입력 상태와 이미지 합성이 브라우저 메모리(HTML5 Canvas & SVG Blob) 내부에서만 처리되며 외부 API 호출 없이 고해상도 PNG를 생성합니다.",
        en: "100% client-side execution using HTML5 Canvas, SVG serialization, and Blob URLs with zero backend PII transmission.",
      },
      architectureFlow: [
        "User Input (Name · Role · Phone · Email)",
        "UTF-8 vCard 3.0 Payload Formatter",
        "Dynamic QR Matrix Generator (Error Correction Level M/Q)",
        "60fps HTML5 Canvas / SVG Compositor",
        "In-App Browser Compatible PNG Export",
      ],
      implementation: [
        {
          ko: "한글 이름·직함이 iOS/Android 기본 카메라 스캔 시 깨지지 않도록 vCard 3.0 UTF-8 바이트 정규화 및 오류 복원 레벨 최적화",
          en: "Normalized UTF-8 byte sequences in vCard 3.0 payloads so Korean characters scan cleanly on both iOS and Android native cameras.",
        },
      ],
      verification: [
        {
          ko: "Vercel 상용 배포(business-card-auto.vercel.app) 및 iOS/Android 기본 카메라·인앱 브라우저 실기기 테스트 완료",
          en: "Deployed on Vercel and verified across iOS/Android native cameras and KakaoTalk/Instagram in-app browsers.",
        },
      ],
      challenges: [
        {
          ko: "모바일 인앱 브라우저에서 a[download] 속성이 무시되는 현상을 User-Agent 감지 및 길게 눌러 저장 모달 Fallback으로 해결",
          en: "Solved mobile WebView download restrictions via User-Agent detection and long-press image modal fallbacks.",
        },
      ],
      limitations: [
        {
          ko: "완전 무서버 구조이므로 기기 간 명함 시안 클라우드 동기화 대신 로컬 즉시 생성·저장에 집중",
          en: "By design, omits cloud account storage to guarantee strict zero-server privacy.",
        },
      ],
    },
    links: [
      {
        label: { ko: "실서비스 배포 바로가기 (business-card-auto.vercel.app)", en: "Open Live App (business-card-auto.vercel.app)" },
        href: "https://business-card-auto.vercel.app",
        type: "live",
      },
    ],
  },
  {
    slug: "construction-accident-vl-agent",
    name: "construction-accident-vl-agent",
    title: {
      ko: "construction-accident-vl-agent — 건설현장 CCTV 모션 Contact Sheet 기반 Vision-Language 사고 분석 에이전트",
      en: "construction-accident-vl-agent — CCTV Motion Contact-Sheet Vision-Language Accident Agent",
    },
    oneLiner: {
      ko: "건설현장 CCTV 영상에서 모션 급증 시점(--auto-moment) 전후 프레임을 Contact Sheet로 합성해 Qwen2.5-VL 추론 비용을 줄이고, SPilot ERD 표준 JSON으로 변환하는 비전 에이전트",
      en: "Vision-Language agent that synthesizes CCTV motion frames into a single Contact Sheet for Qwen2.5-VL analysis and exports standardized SPilot ERD JSON payloads.",
    },
    status: "Research / Experimental",
    statusBadge: {
      ko: "Open Source · Qwen2.5-VL & OpenCV",
      en: "Open Source · Qwen2.5-VL & OpenCV",
    },
    isPrivateRepo: false,
    categories: ["AI / RAG", "Experimental"],
    role: {
      ko: "OpenCV 모션 탐지 · Contact Sheet 합성기 · 프롬프트 가드레일 · ERD JSON 변환기 단독 개발",
      en: "Solo Developer — OpenCV Motion Detector, Contact Sheet Compositor, Prompt Guardrails & ERD Adapter",
    },
    period: { ko: "2026 · 비전-언어 AI 프로젝트", en: "2026 · Vision-Language AI Project" },
    techStack: [
      "Python",
      "OpenCV",
      "Qwen2.5-VL",
      "Colab + ngrok",
      "JSON Schema",
      "Pydantic",
      "FastAPI",
    ],
    keyMetrics: [
      { ko: "전체 영상 대신 Contact Sheet 1장 주입으로 VL 토큰 비용·지연 대폭 절감", en: "Single Contact-Sheet Injection Dramatically Cuts VL Token Cost & Latency" },
      { ko: "--auto-moment 기반 사고 발생 핵심 프레임 자동 포착", en: "--auto-moment Optical/Diff Peak Detection Captures Exact Accident Moment" },
      { ko: "관찰 사실과 추론 분리 가드레일 및 SPilot ERD JSON 자동 변환", en: "Fact-vs-Inference Prompt Guardrail & SPilot ERD JSON Export" },
    ],
    slides: [
      {
        src: "/png/construction_accident_vl_agent_preview.png",
        alt: "construction-accident-vl-agent 분석 파이프라인 화면",
        caption: {
          ko: "분석 파이프라인 — CCTV MP4 영상 프레임 추출, Contact Sheet 합성 및 Qwen2.5-VL 추론",
          en: "Analysis Pipeline — CCTV frame extraction, Contact Sheet synthesis, and Qwen2.5-VL reasoning",
        },
      },
      {
        src: "/png/accident_report_html_dashboard/safety_dashboard_capture.png",
        alt: "현장 안전 모니터링 대시보드 화면",
        caption: {
          ko: "현장 안전 모니터링 — 건설현장 CCTV 영상 분석 현황 및 위험 발생 모니터링 대시보드",
          en: "Safety Dashboard — Construction site CCTV monitoring and hazard alert overview",
        },
      },
      {
        src: "/png/accident_report_html_dashboard/accident_report_capture.png",
        alt: "사고 분석 보고서 화면",
        caption: {
          ko: "사고 분석 보고서 — Qwen2.5-VL 기반 사고 유형(추락/낙상 등) 자동 분류 및 경위 상세 리포트",
          en: "Accident Report — Automated classification (fall_from_height, slip, fire) and structured incident timeline",
        },
      },
    ],
    caseStudy: {
      overview: {
        ko: "건설현장 CCTV 영상을 프레임 단위로 분석해 사고 발생 시점, 사고 유형(추락·낙상·화재·협착 등), 부상자 수, 객관적 사고 원인을 판별하고 상위 안전관리 시스템(SPilot) ERD 규격 JSON으로 출력하는 비전-언어 에이전트입니다.",
        en: "Analyzes construction CCTV footage via OpenCV motion sampling and Qwen2.5-VL to classify accidents and emit standardized SPilot ERD JSON records.",
      },
      problem: {
        ko: "수 분 길이의 CCTV 영상을 그대로 멀티모달 LLM에 입력하면 비전 토큰 비용과 추론 시간이 기하급수적으로 증가하고, 영상만으로 알 수 없는 법적 과실을 모델이 임의로 단정하는 문제가 있었습니다.",
        en: "Feeding raw multi-minute CCTV video to a VLM explodes token cost and latency, while unconstrained prompts hallucinate unseen legal fault.",
      },
      roleDetails: [
        {
          ko: "OpenCV 프레임 차분 기반 --auto-moment 사고 시점 탐지기 및 시계열 격자 Contact Sheet 합성기 개발",
          en: "Developed the OpenCV --auto-moment peak detector and chronological grid Contact Sheet generator.",
        },
        {
          ko: "물리적 관찰 사실만 근거로 서술하도록 제한하는 프롬프트 가드레일 및 Pydantic JSON Schema 검증기 구현",
          en: "Built fact-grounding prompt guardrails and Pydantic schema validators exporting to SPilot ERD format.",
        },
      ],
      architecture: {
        ko: "OpenCV 전처리 파이프라인(모션 피크 탐지 → 전후 핵심 프레임 추출 → 타임스탬프 각인 Contact Sheet 합성)과 Colab 원격 Qwen2.5-VL 추론 서버, Pydantic ERD 변환기로 구성됩니다.",
        en: "OpenCV motion peak detector + timestamped Contact Sheet compositor feeding a remote Qwen2.5-VL server and Pydantic ERD serializer.",
      },
      architectureFlow: [
        "CCTV MP4 Input Stream",
        "OpenCV Motion Peak Detector (--auto-moment)",
        "Timestamped Grid Contact Sheet Compositor",
        "Qwen2.5-VL Inference (Fact-Only Prompt Guardrail)",
        "Pydantic Schema Validator & SPilot ERD JSON Output",
      ],
      implementation: [
        {
          ko: "각 격자 타일에 프레임 번호와 초 단위 타임스탬프를 시각적으로 각인해 VL 모델이 시간 순서(추락 전 → 추락 중 → 추락 후)를 단일 이미지에서 정확히 추론하도록 구현",
          en: "Burned frame indices and timestamps into each grid tile so Qwen2.5-VL accurately tracks temporal progression within a single composite image.",
        },
      ],
      verification: [
        {
          ko: "추락(fall_from_height)·전도·낙하물 사고 샘플 영상에서 사고 시점 포착 및 JSON 스키마 정합성 검증 완료",
          en: "Validated accurate temporal localization and strict JSON schema compliance across fall, slip, and falling-object CCTV clips.",
        },
      ],
      challenges: [
        {
          ko: "카메라 흔들림이나 조명 변화를 사고 모션으로 오탐하는 문제를 ROI 가중치와 연속 프레임 이동 평균 필터로 개선",
          en: "Reduced camera-shake false triggers using ROI weighting and moving-average frame-difference smoothing.",
        },
      ],
      limitations: [
        {
          ko: "극심한 역광이나 사각지대 가림 영상에서는 신뢰도 점수를 낮추고 '사람 확인 필요(human_review_required)' 플래그를 반환하도록 설계",
          en: "Flags occluded or severe-glare footage with human_review_required rather than forcing low-confidence classifications.",
        },
      ],
    },
    links: [
      {
        label: { ko: "GitHub 저장소", en: "GitHub Repository" },
        href: "https://github.com/kwsahe/construction-accident-vl-agent",
        type: "github",
      },
    ],
  },
  {
    slug: "O2O-demand-forecasting-solution",
    name: "O2O-demand-forecasting-solution",
    title: {
      ko: "O2O-demand-forecasting-solution — 공공 API 5종 기반 102개 시군구 인테리어 수요예측 솔루션",
      en: "O2O-demand-forecasting-solution — 102-District Interior Demand Forecasting via 5 Public APIs",
    },
    oneLiner: {
      ko: "국토교통부 아파트 실거래가 등 공공 API 5종을 결합해 102개 시군구의 인테리어 수요점수(7개 지표 가중합산)와 SARIMA·Prophet·LightGBM 거래량 예측을 제공하는 플랫폼",
      en: "Combines 5 government open APIs across 102 districts to compute 7-indicator interior demand scores and compare SARIMA, Prophet, and LightGBM volume forecasts.",
    },
    status: "Prototype",
    statusBadge: {
      ko: "Open Source · 공공 API 5종 · 102개 시군구",
      en: "Open Source · 5 Public APIs · 102 Districts",
    },
    isPrivateRepo: false,
    categories: ["Data & Analytics"],
    role: {
      ko: "공공 API 5종 ETL 파이프라인 · 7개 지표 수요점수 산출식 · 시계열 모델 비교 · Flask 대시보드 개발",
      en: "Lead Data & Backend Engineer — 5-API ETL Pipeline, 7-Factor Demand Scoring & Flask Map Dashboard",
    },
    period: { ko: "2026 · 데이터 엔지니어링 & 수요예측 프로젝트", en: "2026 · Data Engineering & Forecasting Project" },
    techStack: [
      "Python",
      "Flask",
      "SQLite",
      "SARIMA",
      "Prophet",
      "LightGBM",
      "Naver Maps API",
      "Ollama",
    ],
    keyMetrics: [
      { ko: "국토교통부 실거래가 등 공공 데이터 API 5종 통합 파이프라인", en: "Unified ETL Pipeline Across 5 Government Open APIs" },
      { ko: "전국 102개 시군구 · 7개 지표 정규화 가중합산 수요 등급(S+~D) 산출", en: "102 Districts Scored via 7 Normalized Weighted Indicators (Grades S+ to D)" },
      { ko: "SARIMA · Prophet · LightGBM 3종 시계열 예측 모델 비교 검증", en: "Comparative Time-Series Forecasting with SARIMA, Prophet & LightGBM" },
    ],
    slides: [
      {
        src: "/png/screenshots_O2O-demand-forecasting-solution_v2/01_overview.png",
        alt: "O2O 인테리어 수요예측 대시보드 개요 화면",
        caption: {
          ko: "대시보드 개요 — 전국 102개 시군구 수요점수 산출 및 KPI 지표 요약",
          en: "Dashboard Overview — 102-district interior demand scores and national KPI summary",
        },
      },
      {
        src: "/png/screenshots_O2O-demand-forecasting-solution_v2/10_map_grade_mode.png",
        alt: "네이버 지도 기반 시군구별 인테리어 수요 등급 화면",
        caption: {
          ko: "수요 등급 지도 — 네이버 지도 기반 시군구별 인테리어 수요 등급(S+/S0/A+ 등) 시각화",
          en: "Demand Grade Map — Naver Maps visualization of district demand tiers (S+, S0, A+)",
        },
      },
      {
        src: "/png/screenshots_O2O-demand-forecasting-solution_v2/11_map_market_mode.png",
        alt: "지역별 예상 시공비 및 시장 규모 추정 지도 화면",
        caption: {
          ko: "시장 규모 지도 — 지역별 예상 시공비 및 인테리어 시장 규모 추정 지도",
          en: "Market Volume Map — Regional remodeling budget and market size estimation",
        },
      },
    ],
    caseStudy: {
      overview: {
        ko: "인테리어·리모델링 O2O 플랫폼 입점 업체가 어느 시군구에 마케팅 예산을 집중해야 하는지 의사결정을 돕기 위해, 아파트 매매 거래량·준공 연한(노후도)·인구 이동 등 공공 API 5종 데이터를 결합해 지역별 수요점수와 향후 거래량을 예측하는 웹 솔루션입니다.",
        en: "A B2B location-intelligence web platform helping interior O2O contractors target high-demand districts by fusing housing transactions, building age, and migration APIs.",
      },
      problem: {
        ko: "인테리어 시공 수요는 단순 인구수가 아니라 '노후 아파트 비율'과 '최근 매매 손바뀜(이사) 거래량'의 영향을 크게 받지만, 데이터가 여러 기관 API에 흩어져 있어 직관적인 비교가 불가능했습니다.",
        en: "Remodeling demand depends heavily on aging housing stock and recent transaction turnover, yet these signals were siloed across five incompatible government APIs.",
      },
      roleDetails: [
        {
          ko: "공공 API 5종 수집·정규화 ETL 및 SQLite 데이터 마트 설계, 7개 지표 가중합산 점수 모델 구현",
          en: "Built the 5-API ETL pipeline, SQLite data mart, and 7-indicator weighted scoring model.",
        },
        {
          ko: "SARIMA, Prophet, LightGBM 3종 시계열 모델 성능 비교 및 Flask + 네이버 지도 인터랙티브 대시보드 구현",
          en: "Benchmarked SARIMA, Prophet, and LightGBM forecasts and built the Flask + Naver Maps dashboard.",
        },
      ],
      architecture: {
        ko: "공공 API 5종 수집기 → SQLite 정규화 마트 → 7대 지표 스코어링 & 3종 시계열 예측 엔진 → Flask REST API → 네이버 지도 기반 지리정보 대시보드 및 Ollama 지역 리포트 생성기로 구성됩니다.",
        en: "5 Public API Collectors → SQLite Data Mart → 7-Indicator Scoring & 3-Model Time-Series Engine → Flask REST API → Naver Maps GIS Dashboard.",
      },
      architectureFlow: [
        "5 Public APIs (MOLIT Transactions · Building Age · Demographics)",
        "SQLite Data Mart & District Code Normalizer (102 Districts)",
        "7-Indicator Weighted Demand Scoring Engine (S+ to D)",
        "Time-Series Forecaster (SARIMA · Prophet · LightGBM)",
        "Flask API & Naver Maps Interactive GIS Dashboard",
      ],
      implementation: [
        {
          ko: "행정동·법정동 코드 불일치 문제를 시군구 표준 코드 매핑 테이블로 통합해 102개 시군구 단위로 무결성 있게 집계",
          en: "Resolved administrative vs. statutory district code mismatches via a canonical 102-district mapping table.",
        },
      ],
      verification: [
        {
          ko: "102개 시군구 전체 데이터 적재 검증 및 시계열 예측 오차(MAE/RMSE) 비교를 통한 최적 모델 선택 파이프라인 완성",
          en: "Verified full 102-district coverage and evaluated MAE/RMSE across SARIMA, Prophet, and LightGBM.",
        },
      ],
      challenges: [
        {
          ko: "공공 API 호출 제한(Rate Limit) 및 XML/JSON 포맷 혼재 문제를 배치 캐싱과 재시도 큐로 해결",
          en: "Handled heterogeneous XML/JSON government API responses and rate limits with local SQLite batch caching.",
        },
      ],
      limitations: [
        {
          ko: "국토부 실거래가 신고 기한(30일) 특성상 당월 최신 거래분은 일부 지연 반영될 수 있음을 UI에 명시",
          en: "Displays statutory 30-day transaction reporting lag notices on current-month figures.",
        },
      ],
    },
    links: [
      {
        label: { ko: "GitHub 저장소", en: "GitHub Repository" },
        href: "https://github.com/kwsahe/O2O-demand-forecasting-solution",
        type: "github",
      },
    ],
  },
  {
    slug: "ecommerce-data-analysis-practice",
    name: "ecommerce-data-analysis-practice",
    title: {
      ko: "ecommerce-data-analysis-practice — RFM 고객 세분화 · SHAP 설명 가능한 AI(XAI) · Prophet 시계열 대시보드",
      en: "ecommerce-data-analysis-practice — RFM Segmentation, SHAP XAI & Prophet Forecasting Dashboard",
    },
    oneLiner: {
      ko: "고객 행동 및 부동산·커머스 시계열 데이터를 바탕으로 RFM 세그멘테이션, XGBoost 예측 및 SHAP 변수 기여도 해석(XAI), Prophet 장기 추세 전망을 통합한 분석 프로젝트",
      en: "Data science project combining RFM customer segmentation, XGBoost modeling with SHAP explainability (XAI), and Prophet time-series forecasting in Streamlit.",
    },
    status: "Research / Experimental",
    statusBadge: {
      ko: "Open Source · XGBoost · SHAP · Prophet",
      en: "Open Source · XGBoost · SHAP · Prophet",
    },
    isPrivateRepo: false,
    categories: ["Data & Analytics", "Experimental"],
    role: {
      ko: "데이터 전처리 · RFM/XGBoost/SHAP/Prophet 모델링 · Streamlit 대시보드 단독 구현",
      en: "Solo Data Scientist & Developer — Preprocessing, RFM/XGBoost/SHAP/Prophet Modeling & Streamlit UI",
    },
    period: { ko: "2026 · 데이터 분석 & ML 프로젝트", en: "2026 · Data Analytics & ML Project" },
    techStack: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "XGBoost",
      "SHAP (XAI)",
      "Prophet",
      "Streamlit",
    ],
    keyMetrics: [
      { ko: "RFM 고객 세분화 및 이탈 위험군 타깃 전략 도출", en: "RFM Segmentation & Churn-Risk Targeting Strategy" },
      { ko: "SHAP Summary/Waterfall Plot 기반 모델 의사결정 근거 시각화", en: "SHAP Summary & Waterfall Plots for Explainable AI (XAI)" },
      { ko: "Prophet 계절성 분해 및 서울 25개 자치구 매매·전세 추세 예측", en: "Prophet Seasonality Decomposition & 25-District Trend Forecasts" },
    ],
    slides: [
      {
        src: "/png/screenshots_ecommerce-data-analysis-practice/01_dashboard_full.png",
        alt: "Streamlit 시계열 예측 및 데이터 분석 대시보드 전체 화면",
        caption: {
          ko: "대시보드 전체 — 서울 아파트 가격 시계열 예측 및 데이터 분석 Streamlit 대시보드",
          en: "Full Dashboard — Streamlit analytics & time-series forecasting dashboard",
        },
      },
      {
        src: "/png/screenshots_ecommerce-data-analysis-practice/02_hero_kpi.png",
        alt: "서울 25개 구별 핵심 KPI 요약 화면",
        caption: {
          ko: "핵심 KPI — 서울 25개 구별 아파트 매매/전세 가격 변동률 요약 지표",
          en: "Core KPIs — District-level sale and jeonse price change metrics across 25 Seoul districts",
        },
      },
      {
        src: "/png/screenshots_ecommerce-data-analysis-practice/03_sale_2026_zoom.png",
        alt: "Prophet 기반 2026년 매매가격 예측 화면",
        caption: {
          ko: "매매가격 예측 — Prophet 시계열 모델 기반 2026년 서울 아파트 매매가격 전망",
          en: "Sale Price Forecast — Prophet 2026 trajectory and confidence intervals",
        },
      },
      {
        src: "/png/screenshots_ecommerce-data-analysis-practice/04_jeonse_2026_zoom.png",
        alt: "Prophet 기반 2026년 전세가격 예측 화면",
        caption: {
          ko: "전세가격 예측 — 주간 아파트 가격 동향 데이터를 바탕으로 한 2026년 전세 추이 예측",
          en: "Jeonse Forecast — Weekly index time-series projection with upper/lower bounds",
        },
      },
      {
        src: "/png/screenshots_ecommerce-data-analysis-practice/05_other_region.png",
        alt: "주요 자치구별 매매·전세 시계열 비교 화면",
        caption: {
          ko: "지역별 비교 — 서울 주요 자치구별 매매/전세 시계열 변동 추세 비교 분석",
          en: "Regional Comparison — Cross-district trend comparison across major Seoul districts",
        },
      },
    ],
    caseStudy: {
      overview: {
        ko: "블랙박스 머신러닝 모델의 예측 결과만 제시하는 한계를 넘어, RFM 고객 세분화·SHAP 기반 피처 기여도 해석(XAI)·Prophet 시계열 예측을 결합해 의사결정자가 납득할 수 있는 근거를 시각화한 데이터 분석 대시보드입니다.",
        en: "An explainable data analytics suite uniting RFM segmentation, XGBoost + SHAP feature attribution, and Prophet time-series forecasting inside an interactive Streamlit dashboard.",
      },
      problem: {
        ko: "예측 정확도가 높은 부스팅 모델도 '왜 특정 고객이나 지역의 점수가 높게 나왔는지' 설명하지 못하면 실무 마케팅·전략 부서에서 채택하기 어려운 문제가 있었습니다.",
        en: "High-accuracy gradient boosting models often fail to gain business adoption when stakeholders cannot see which variables drove a specific prediction.",
      },
      roleDetails: [
        {
          ko: "결측치·이상치 전처리, RFM 스코어링, XGBoost + SHAP 해석 파이프라인 및 Prophet 시계열 대시보드 전 과정 구현",
          en: "Implemented data cleaning, RFM scoring, XGBoost + SHAP attribution charts, and Prophet forecasting views.",
        },
      ],
      architecture: {
        ko: "Pandas 전처리 파이프라인 → Scikit-learn/XGBoost + SHAP Explainer & Meta Prophet 시계열 엔진 → Streamlit 인터랙티브 대시보드로 구성됩니다.",
        en: "Pandas ETL → Scikit-learn/XGBoost + TreeSHAP Explainer & Meta Prophet → Interactive Streamlit visualization layer.",
      },
      architectureFlow: [
        "Raw Behavioral & Time-Series Datasets",
        "Pandas Outlier Cleaning & RFM Feature Engineering",
        "XGBoost Model + TreeSHAP Explainability (XAI)",
        "Meta Prophet Trend & Seasonality Forecaster",
        "Streamlit Interactive KPI & Comparison Dashboard",
      ],
      implementation: [
        {
          ko: "자치구·세그먼트 선택 시 실시간으로 Prophet 신뢰구간(Upper/Lower Bound)과 SHAP 기여도를 재계산·렌더링하도록 캐싱 최적화",
          en: "Optimized Streamlit data caching so switching districts or segments renders Prophet confidence bands and SHAP plots instantaneously.",
        },
      ],
      verification: [
        {
          ko: "시계열 학습/검증 분할 백테스팅 및 서울 25개 자치구 주간 지수 데이터 시각화 정합성 검증 완료",
          en: "Validated via chronological train/test backtesting and cross-district KPI verification across all 25 Seoul districts.",
        },
      ],
      challenges: [
        {
          ko: "SHAP 연산 시 전체 데이터셋에서 발생하는 지연을 대표 표본 추출과 st.cache_data 적용으로 단축",
          en: "Accelerated interactive TreeSHAP rendering using stratified background sampling and Streamlit state caching.",
        },
      ],
      limitations: [
        {
          ko: "거시경제 금리 급변 등 외부 충격 변수는 단변량 Prophet 기본 모형에서 즉각 반영되지 않으므로 신뢰구간 폭과 함께 해석하도록 안내",
          en: "Presents forecast confidence intervals alongside point estimates to account for exogenous macroeconomic shocks.",
        },
      ],
    },
    links: [
      {
        label: { ko: "GitHub 저장소", en: "GitHub Repository" },
        href: "https://github.com/kwsahe/ecommerce-data-analysis-practice",
        type: "github",
      },
    ],
  },
  {
    slug: "english-word-streamlit",
    name: "english-word-streamlit",
    title: {
      ko: "english-word-streamlit — Google Gemini API 연동 AI 영단어 학습 & 토익 빈칸 문제 생성기",
      en: "english-word-streamlit — Gemini-Powered TOEIC Vocabulary & Context Quiz Generator",
    },
    oneLiner: {
      ko: "Google Gemini API를 연동해 학습자의 단어장에서 토익(TOEIC) 파트별 실전 빈칸 추론 문제와 문맥 해설을 실시간 생성하고 학습 통계를 관리하는 배포형 웹·앱 서비스",
      en: "Live AI learning app powered by Google Gemini API that generates contextual TOEIC fill-in-the-blank quizzes, grammar explanations, and progress analytics.",
    },
    status: "Live Production",
    statusBadge: {
      ko: "Live 배포 (honeyenglish.streamlit.app)",
      en: "Live Production (honeyenglish.streamlit.app)",
    },
    isPrivateRepo: false,
    categories: ["Automation", "AI / RAG", "Production"],
    role: {
      ko: "Gemini 프롬프트 파이프라인 · Streamlit 웹앱 · Kivy 모바일 패키징 단독 개발",
      en: "Solo Developer — Gemini Prompt Pipeline, Streamlit Web App & Kivy Android Packaging",
    },
    period: { ko: "2025 – 2026 · 실배포 학습 서비스", en: "2025 – 2026 · Live Educational App" },
    techStack: [
      "Python",
      "Streamlit",
      "Google Gemini API",
      "Kivy",
      "Pandas",
    ],
    keyMetrics: [
      { ko: "honeyenglish.streamlit.app 클라우드 실서비스 배포 운영", en: "Live Cloud Deployment at honeyenglish.streamlit.app" },
      { ko: "Gemini API 기반 실시간 토익 빈칸 문제·오답 보기·해설 생성", en: "Real-Time Gemini TOEIC Quiz, Distractor & Explanation Generation" },
      { ko: "북마크 단어장 · 오답 노트 · 일자별 정답률 통계 대시보드", en: "Bookmark Vocabulary, Error Note & Daily Accuracy Analytics" },
    ],
    slides: [
      {
        src: "/png/pptx_final/english_word_flow.png",
        alt: "english-word-streamlit 아키텍처 흐름 화면",
        caption: {
          ko: "아키텍처 흐름 — Gemini API 연동 및 Streamlit / Android APK 전체 파이프라인",
          en: "Architecture Flow — Gemini API integration across Streamlit Cloud and Android APK",
        },
      },
      {
        src: "/png/pptx_final/image26.png",
        alt: "Google Gemini 실시간 토익 빈칸 문제 출제 화면",
        caption: {
          ko: "메인 학습 — Google Gemini 실시간 토익 빈칸 문제 출제 및 문맥 해설",
          en: "Quiz Engine — Real-time Gemini TOEIC fill-in-the-blank question and contextual commentary",
        },
      },
      {
        src: "/png/pptx_final/image30.png",
        alt: "북마크 단어장 관리 화면",
        caption: {
          ko: "단어장 관리 — 북마크 단어 관리 및 localStorage 진도 저장",
          en: "Vocabulary Manager — Bookmark word lists and persistent progress tracking",
        },
      },
      {
        src: "/png/pptx_final/image31.png",
        alt: "학습 통계 대시보드 화면",
        caption: {
          ko: "학습 통계 — 퀴즈 정답률 분석 및 일자별 학습 진도 대시보드",
          en: "Learning Analytics — Quiz accuracy breakdown and daily study streak dashboard",
        },
      },
    ],
    caseStudy: {
      overview: {
        ko: "정적인 단어 암기장에서 벗어나, 사용자가 북마크하거나 자주 틀리는 단어를 기반으로 Google Gemini API가 매번 새로운 비즈니스 예문과 4지선다 토익 빈칸 문제를 생성해 주는 AI 어학 학습 서비스입니다.",
        en: "An AI language-learning web application that transforms static word lists into dynamic, context-rich TOEIC Part 5 practice questions using Google Gemini.",
      },
      problem: {
        ko: "기출 문제집은 한 번 풀고 나면 답을 외우게 되어 반복 학습 효과가 떨어지고, 학습자 수준에 맞춘 매력적인 오답 보기(품사·어휘 함정)를 수작업으로 만들기 어려웠습니다.",
        en: "Static workbooks lose effectiveness once memorized, and manually crafting plausible Part 5 grammar/vocabulary distractors is time-consuming.",
      },
      roleDetails: [
        {
          ko: "Gemini 구조화 출력 프롬프트 설계, Streamlit 학습·퀴즈·통계 UI 개발 및 Streamlit Cloud 배포 전담",
          en: "Designed structured Gemini quiz prompts, built the Streamlit UI/analytics views, and deployed to Streamlit Cloud.",
        },
      ],
      architecture: {
        ko: "단어 데이터베이스(CSV/Pandas) + Google Gemini API 문제 생성 엔진 + 클라이언트 진도 저장소(localStorage 연동) + Streamlit 웹 인터페이스 및 Kivy 모바일 래퍼로 구성됩니다.",
        en: "Pandas vocabulary store + Google Gemini structured quiz generator + persistent client storage + Streamlit Cloud deployment.",
      },
      architectureFlow: [
        "Vocabulary Corpus & User Bookmark Filter",
        "Google Gemini Prompt Builder (Target Word + Part-of-Speech Trap)",
        "Structured Quiz Parser (Question · 4 Options · Answer · Commentary)",
        "Interactive Quiz Session & Mistake Tracker",
        "Accuracy & Daily Streak Analytics Dashboard",
      ],
      implementation: [
        {
          ko: "Gemini 응답이 항상 일정한 문제·보기·정답·해설 구조로 파싱되도록 출력 포맷 가드와 파싱 실패 시 재시도 로직 구현",
          en: "Enforced strict output formatting with automatic retry parsing so generated quizzes always render clean 4-choice options and explanations.",
        },
      ],
      verification: [
        {
          ko: "Streamlit Cloud(honeyenglish.streamlit.app) 실배포 및 데스크톱·모바일 웹 학습 루프 검증 완료",
          en: "Deployed live at honeyenglish.streamlit.app and verified across desktop and mobile browsers.",
        },
      ],
      challenges: [
        {
          ko: "무료 클라우드 호스팅 환경에서 세션 재시작 시 학습 기록이 초기화되는 문제를 브라우저 스토리지 동기화로 보완",
          en: "Mitigated stateless cloud session resets by synchronizing study progress and bookmarks with browser storage.",
        },
      ],
      limitations: [
        {
          ko: "실시간 LLM 호출 특성상 첫 문제 생성 시 1~2초의 응답 대기 시간이 발생하며 프리페칭으로 체감 지연을 완화",
          en: "Initial live question generation takes 1–2 seconds; mitigated with clear loading states and question caching.",
        },
      ],
    },
    links: [
      {
        label: { ko: "실배포 바로가기 (honeyenglish.streamlit.app)", en: "Open Live App (honeyenglish.streamlit.app)" },
        href: "https://honeyenglish.streamlit.app",
        type: "live",
      },
      {
        label: { ko: "GitHub 저장소", en: "GitHub Repository" },
        href: "https://github.com/kwsahe/english-word-streamlit",
        type: "github",
      },
    ],
  },
  {
    slug: "Artesia",
    name: "Artesia",
    title: {
      ko: "Artesia — Unity 2D 로그라이크 턴제 던전 RPG (팀장 · 기획 및 시스템 아키텍처 총괄)",
      en: "Artesia — Unity 2D Roguelike Turn-Based Dungeon RPG (Team Lead & System Architect)",
    },
    oneLiner: {
      ko: "Unity 2D와 C# 기반으로 상태 이상·속성 상성·절차적 던전 탐험 루프를 구현하고 팀장(PM)으로서 스코프 관리와 전투 데이터 테이블 설계를 총괄한 프로젝트",
      en: "Unity 2D & C# roguelike turn-based RPG where I served as Team Lead (PM) and System Designer, architecting combat state machines and data-driven balance tables.",
    },
    status: "Archived",
    statusBadge: {
      ko: "Archived · Unity 2D & C# · 팀장(PM)",
      en: "Archived · Unity 2D & C# · Team Lead (PM)",
    },
    isPrivateRepo: false,
    categories: ["Experimental"],
    role: {
      ko: "팀장(PM) · 전투/던전 시스템 기획 총괄 · 데이터베이스 ERD 및 밸런스 설계",
      en: "Team Lead (PM), Combat/Dungeon System Architect & ERD/Balance Designer",
    },
    period: { ko: "학부 팀 프로젝트 · 정시 완성", en: "University Team Project · Delivered on Schedule" },
    techStack: [
      "C#",
      "Unity 2D",
      "ERD & Data-Driven Design",
      "Turn-Based State Machine",
      "Project Management",
    ],
    keyMetrics: [
      { ko: "팀장(PM)으로서 기능 우선순위 정의 및 일정 내 100% 완주", en: "Led Team as PM to 100% On-Time Delivery via Strict Scope Control" },
      { ko: "거점 → 던전 노드 → 턴제 전투 → 파밍 로그라이크 코어 루프 구축", en: "Complete Hub → Dungeon Node → Turn-Based Combat → Loot Core Loop" },
      { ko: "캐릭터·몬스터·스킬·아이템 관계형 ERD 및 데이터 테이블 설계", en: "Relational ERD & Data-Driven Balance Tables for Skills, Monsters & Relics" },
    ],
    slides: [
      {
        src: "/png/Artesia_preview.png",
        alt: "Artesia 인게임 전투 및 탐색 화면",
        caption: {
          ko: "인게임 플레이 — Unity2D 기반 로그라이크 턴제 던전 RPG 전투 및 탐색 화면",
          en: "In-Game Combat — Unity 2D roguelike turn-based dungeon exploration and battle screen",
        },
      },
      {
        src: "/png/pptx_final/Artesia_user_gameplay_flow.png",
        alt: "Artesia 유저 플레이 루프 흐름도",
        caption: {
          ko: "유저 플레이 루프 — 시작 → 거점 → 던전 입장 → 턴제 전투 → 파밍 유저 여정 흐름도",
          en: "Core Gameplay Loop — Hub preparation → dungeon node traversal → turn-based battle → loot progression",
        },
      },
      {
        src: "/png/pptx_final/Artesia_flow.png",
        alt: "Artesia 턴제 전투 및 이벤트 분기 아키텍처",
        caption: {
          ko: "시스템 아키텍처 — 턴제 전투 로직, 이벤트 선택 및 결과 분기 처리 시스템 구조",
          en: "System Architecture — Turn-based combat state machine and branching event resolution",
        },
      },
      {
        src: "/png/pptx_final/Artesia_character.png",
        alt: "Artesia 캐릭터 스탯 및 ERD 설계 화면",
        caption: {
          ko: "캐릭터 & 던전 — 데이터베이스 ERD 설계 및 캐릭터 스탯·던전 레벨 디자인",
          en: "ERD & Balance — Relational schema and character stat/dungeon progression design",
        },
      },
    ],
    caseStudy: {
      overview: {
        ko: "매 탐험마다 달라지는 던전 경로와 턴제 전략 전투를 결합한 Unity 2D 로그라이크 RPG 프로젝트로, 팀장(PM)을 맡아 시스템 아키텍처·ERD 설계·일정 관리를 총괄했습니다.",
        en: "A Unity 2D turn-based roguelike dungeon RPG where I led the team as PM, designing the combat state machine, relational entity schemas, and project milestones.",
      },
      problem: {
        ko: "다수의 캐릭터 스킬·상태 이상·던전 이벤트를 하드코딩하면 밸런스 수정 때마다 코드 재빌드가 필요하고 팀원 간 병합 충돌이 빈번하게 발생했습니다.",
        en: "Hardcoding skills, status effects, and dungeon events caused frequent merge conflicts and required code rebuilds for every balance tweak.",
      },
      roleDetails: [
        {
          ko: "팀장(PM)으로서 마일스톤 관리, 핵심 플레이 루프 확정 및 데이터 기반(Data-Driven) 전투/이벤트 테이블 설계",
          en: "Directed milestone scope as PM and designed data-driven combat, skill, and event schemas.",
        },
      ],
      architecture: {
        ko: "Unity 2D C# 상태 머신(전투 페이즈 관리)과 정규화된 캐릭터·스킬·몬스터·아이템 데이터 테이블(ERD)을 분리한 데이터 주도형 구조입니다.",
        en: "Decoupled Unity 2D C# turn-state machine driven by normalized character, skill, monster, and item data tables.",
      },
      architectureFlow: [
        "Town Hub (Party & Equipment Loadout)",
        "Procedural Dungeon Node Map (Battle · Event · Boss)",
        "Turn-Based Combat State Machine (Speed · Buff/Debuff · Skill)",
        "Data-Driven ERD Tables (Stats · Multipliers · Drop Rates)",
        "Reward Settlement & Meta Progression",
      ],
      implementation: [
        {
          ko: "기능 욕심을 줄이고 '거점 정비 → 던전 노드 이동 → 턴제 전투 → 보상 획득' 코어 루프의 완성도에 집중해 정해진 기한 내 버그 없는 플레이어블 빌드 완성",
          en: "Prioritized a rock-solid core gameplay loop over feature bloat, delivering a complete playable build on schedule.",
        },
      ],
      verification: [
        {
          ko: "전투 공식 시뮬레이션 시트 검증 및 학부 최종 시연 플레이 테스트 완수",
          en: "Validated combat damage curves via spreadsheet simulations and completed live demo playtesting.",
        },
      ],
      challenges: [
        {
          ko: "기획·아트·프로그래밍 직군 간 용어 차이를 명확한 상태 전이도와 ERD 문서로 통일해 커뮤니케이션 비용 절감",
          en: "Bridged communication across design, art, and engineering roles using explicit state diagrams and ERD specs.",
        },
      ],
      limitations: [
        {
          ko: "학부 프로젝트 종료 후 아카이브(Archived) 상태로 보존 중이며, 이때 체득한 스코프 통제와 데이터 스키마 설계 원칙을 이후 AI 엔지니어링 프로젝트에 적용",
          en: "Archived following course completion; the data-driven schema and scope discipline directly informed subsequent AI engineering systems.",
        },
      ],
    },
    links: [
      {
        label: { ko: "GitHub 저장소", en: "GitHub Repository" },
        href: "https://github.com/kwsahe/Artesia",
        type: "github",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): ProjectData[] {
  return PROJECTS_DATA.filter((p) => typeof p.featuredOrder === "number").sort(
    (a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99)
  );
}

/**
 * Single Source of Truth for verified quantitative project metrics
 * shared across Portfolio Cards, Case Studies, Nexus Core 3D Satellites,
 * and Architecture Lab telemetry.
 */
export const VERIFIED_PROJECT_METRICS = {
  "link21-ai-jarvis-office": {
    shortMetric: "19 Agents · Publish Gate",
    totalTests: 1144, // 873 unit + 252 integration + 19 UI render
    unitTests: 873,
    integrationTests: 252,
    renderTests: 19,
    chainDurationSec: 279,
    eventValidation: "18/19 Events Pass · 2 False Positives Fixed",
    labMetrics: [
      "19 AI Agents (8 Strategy + 11 Creative)",
      "279s Full Chain Execution",
      "18/19 Events Pass · 2 False Positives Fixed",
      "873 Unit · 252 Int · 19 Render Tests",
    ],
  },
  "link21-ai-hub": {
    shortMetric: "Live · 515 Vitest · 9 Migrations",
    vitestCount: 515,
    migrationsCount: 9,
  },
  "link21-bidpilot-ai": {
    shortMetric: "188/191 · 2,659 Tests",
    automatedTests: 2659,
    qaCycles: 36,
    commitsCount: 571,
    eligibilityAccuracy: "188/191",
    rfpPrecision: 0.795,
    rfpRecall: 0.843,
    labMetrics: [
      "188/191 Eligibility Match",
      "RFP Matrix P 0.795 · R 0.843 · 100% Page Match",
      "2,659 Automated Tests · 36 QA Cycles",
      "571 Commits · Local v1.0.1",
    ],
  },
  "tri-agent-control": {
    shortMetric: "3-CLI · 384 Tests",
    regressionTests: 384,
    evalTasks: 14,
    fieldAppTests: 106,
    cycleCommits: "11 / 12",
    defectsCaught: 5,
    concurrencyDefects: 3,
    labMetrics: [
      "11 Cycle Commits (12 Total) · 106 App Tests",
      "5 Missed Defects Caught by Codex (3 Concurrency)",
      "384 Internal Regression Tests",
      "14-Task Hidden-Test Eval Harness",
    ],
  },
  "market-pulse": {
    shortMetric: "57,690 Rows · R² 0.78",
    snapshotsCount: 57690,
    categoriesCount: 9,
    r2Score: 0.78,
    interval80HitRate: "81.1%",
    cpuMedianErrorBefore: "28.0%",
    cpuMedianErrorAfter: "17.5%",
    fastapiEndpoints: 17,
    backendTests: 196,
    frontendTests: 26,
    totalTests: 222,
    labMetrics: [
      "57,690 Snapshots · 9 Categories",
      "Log-Price ML R² 0.78 · 81.1% Interval Hit",
      "CPU Median Error 28.0% → 17.5%",
      "17 FastAPI Endpoints · 222 Tests (196+26)",
    ],
  },
  "k-safety-law-rag": {
    shortMetric: "Dual RAG · 90.0 Eval · 41 Tests",
    evalScoreBefore: 78.8,
    evalScoreAfter: 90.0,
    sentencingScore: 96,
    reportScore: 95,
    injectedClausesRange: "33–49",
    maxInjectedChars: 18000,
    regressionTests: 41,
    labMetrics: [
      "78.8 (Fail) → 90.0 (Pass) Benchmark Score",
      "Sentencing 96 · Final Report 95",
      "33–49 Clauses (Up to 18k Chars) Injected",
      "41/41 Unit & Regression Tests Passing",
    ],
  },
  "link21-ai-chatbot": {
    shortMetric: "0→1 SSE · Dual-LLM Failover",
    labMetrics: [
      "0→1 Custom Built (Widget + Router + SSE)",
      "Real-Time Supabase Curriculum Injection",
      "Dual-Provider (OpenAI ⇄ Gemini) Failover",
      "Live Production on link21premium.com",
    ],
  },
} as const;

export interface NexusSatelliteSpec {
  id: string;
  slug: string;
  label: string;
  metric: string;
  orbitRadius: number;
  speed: number;
  phase: number;
  tiltX: number;
  tiltZ: number;
  color: string;
}

export const NEXUS_CORE_SATELLITES: NexusSatelliteSpec[] = [
  {
    id: "jarvis",
    slug: "link21-ai-jarvis-office",
    label: "JARVIS OFFICE",
    metric: VERIFIED_PROJECT_METRICS["link21-ai-jarvis-office"].shortMetric,
    orbitRadius: 2.35,
    speed: 0.38,
    phase: 0,
    tiltX: 0.35,
    tiltZ: 0.15,
    color: "#6FA8FF",
  },
  {
    id: "aihub",
    slug: "link21-ai-hub",
    label: "LINK21 AI HUB",
    metric: VERIFIED_PROJECT_METRICS["link21-ai-hub"].shortMetric,
    orbitRadius: 2.55,
    speed: -0.31,
    phase: 1.1,
    tiltX: -0.42,
    tiltZ: 0.28,
    color: "#25C8BD",
  },
  {
    id: "bidpilot",
    slug: "link21-bidpilot-ai",
    label: "BidPilot AI",
    metric: VERIFIED_PROJECT_METRICS["link21-bidpilot-ai"].shortMetric,
    orbitRadius: 2.2,
    speed: 0.29,
    phase: 2.2,
    tiltX: 0.22,
    tiltZ: -0.45,
    color: "#AB83FF",
  },
  {
    id: "triagent",
    slug: "tri-agent-control",
    label: "tri-agent-control",
    metric: VERIFIED_PROJECT_METRICS["tri-agent-control"].shortMetric,
    orbitRadius: 2.65,
    speed: -0.26,
    phase: 3.3,
    tiltX: 0.52,
    tiltZ: 0.12,
    color: "#6FA8FF",
  },
  {
    id: "marketpulse",
    slug: "market-pulse",
    label: "Market Pulse",
    metric: VERIFIED_PROJECT_METRICS["market-pulse"].shortMetric,
    orbitRadius: 2.4,
    speed: 0.34,
    phase: 4.4,
    tiltX: -0.28,
    tiltZ: -0.32,
    color: "#25C8BD",
  },
  {
    id: "ksafety",
    slug: "k-safety-law-rag",
    label: "k-safety-law-rag",
    metric: VERIFIED_PROJECT_METRICS["k-safety-law-rag"].shortMetric,
    orbitRadius: 2.5,
    speed: -0.24,
    phase: 5.3,
    tiltX: -0.18,
    tiltZ: 0.48,
    color: "#AB83FF",
  },
];

