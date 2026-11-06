import { LocalizedText, VERIFIED_PROJECT_METRICS } from "./portfolio-data";

export type LabLayerType =
  | "INPUT"
  | "API"
  | "ORCHESTRATOR"
  | "AI_DATA"
  | "VALIDATION"
  | "OUTPUT";

export interface LabNode {
  id: string;
  label: LocalizedText;
  layer: LabLayerType;
  position: [number, number, number]; // 3D coordinates (x, y, z)
  color: string;
  role: LocalizedText;
  inputSpec: LocalizedText;
  outputSpec: LocalizedText;
  tech: string[];
  steps: LocalizedText[];
  errorHandling: LocalizedText;
  verification: LocalizedText;
  samplePayload: string;
}

export interface LabEdge {
  from: string;
  to: string;
  label: LocalizedText;
  kind?: "primary" | "branch" | "feedback";
}

export interface LabSystem {
  id: string;
  name: string;
  title: LocalizedText;
  badge: LocalizedText;
  summary: LocalizedText;
  simulationNotice: LocalizedText;
  metrics: string[];
  nodes: LabNode[];
  edges: LabEdge[];
}

export const LAB_SYSTEMS: LabSystem[] = [
  {
    id: "link21-ai-jarvis-office",
    name: "LINK21 AI JARVIS OFFICE",
    title: {
      ko: "19명 AI 직원 체인 오케스트레이션 & 점수와 분리된 게시 가능 판정(Publish Gate)",
      en: "19-Agent Chain Orchestration & Separated Publish Gate Architecture",
    },
    badge: {
      ko: "Cloudflare Workers + D1 · 19 AI Agents · 873 Unit / 252 Int / 19 Render Tests",
      en: "Cloudflare Workers + D1 · 19 AI Agents · 873 Unit / 252 Int / 19 Render Tests",
    },
    summary: {
      ko: "전략실 8명 → 제작실 11명 체인 실행 시 직원마다 D1에 결과를 저장하고 요약된 맥락만 전달해 연결 끊김에도 이어서 실행(실측 279초)하며, 완성도 점수와 분리된 게시 가능 판정(Publish Gate)이 사실·과장·분량을 검사합니다.",
      en: "Checkpoints each of the 19 agents in Cloudflare D1 with summarized context handoffs (279s full chain) and enforces a deterministic Publish Gate separated from readiness scores.",
    },
    simulationNotice: {
      ko: "[시뮬레이션 안내] 실제 OpenAI API/사내 D1을 호출하지 않고, 실제 행사 19건 검증에서 수집된 아키텍처 상태 전이와 게시 판정(Publish Gate) 흐름을 재현합니다.",
      en: "[Simulation Mode] Replays verified state transitions and Publish Gate checks from the 19-event validation without calling live OpenAI/D1 endpoints.",
    },
    metrics: [...VERIFIED_PROJECT_METRICS["link21-ai-jarvis-office"].labMetrics],
    nodes: [
      {
        id: "jarvis-intake",
        label: { ko: "1. 말로 부탁하기 (Ask Jarvis)", en: "1. Ask Jarvis Intake" },
        layer: "INPUT",
        position: [-5.2, 1.2, 0.4],
        color: "#6FA8FF",
        role: {
          ko: "대화형 입력 도우미가 상대 날짜('담주 화욜' 등)를 달력 날짜로 계산해 채우고, 입력칸 반영 전·실행 전 2회 확인을 받습니다.",
          en: "Conversational intake that resolves relative Korean dates into calendar dates and confirms twice before execution.",
        },
        inputSpec: {
          ko: "자연어 요청 문장, 과정명, 일정, 수강료, 타깃 독자 정보",
          en: "Natural-language brief, course title, schedule, tuition, target audience",
        },
        outputSpec: {
          ko: "Zod 검증을 통과한 정규화 캠페인 브리프 JSON (workspace_id 포함)",
          en: "Zod-validated normalized campaign brief JSON with workspace_id",
        },
        tech: ["React 19", "TypeScript", "Zod", "Relative Date Resolver"],
        steps: [
          { ko: "사용자 대화에서 누락된 필수 항목(일시·대상·가격 출처) 역질문", en: "Prompts user for missing required fields (date, audience, price source)" },
          { ko: "상대 날짜 표현을 기준일 대비 ISO 날짜로 계산", en: "Computes ISO calendar dates from relative expressions" },
          { ko: "입력칸 채우기 전 1차 확인 → 실행 시작 전 2차 확인", en: "2-stage confirmation before form population and run start" },
        ],
        errorHandling: {
          ko: "모호한 날짜나 미확인 가격은 임의 추정하지 않고 비워둔 채 사용자 확인 플래그 표시",
          en: "Never guesses ambiguous dates or unverified prices; flags for explicit user confirmation.",
        },
        verification: {
          ko: "단위 테스트 및 화면 렌더 테스트 19개에서 날짜 계산·2단계 확인 흐름 검증",
          en: "Verified across unit tests and 19 UI render tests covering relative date resolution.",
        },
        samplePayload: `{\n  "workspace_id": "ws_link21_prod",\n  "course": "AI 실무 프롬프트 & 에이전트 과정",\n  "resolved_date": "2026-11-17",\n  "confirmed_by_user": true\n}`,
      },
      {
        id: "jarvis-workers-api",
        label: { ko: "2. Workers API & 멱등성 제어", en: "2. Workers API & Idempotency" },
        layer: "API",
        position: [-3.1, -0.8, 0.9],
        color: "#25C8BD",
        role: {
          ko: "Cloudflare Workers 엣지 API가 요청 스키마(Zod)와 멱등성 키(Idempotency Key)를 검사해 중복 실행을 차단하고 V1→V2 버전을 생성합니다.",
          en: "Cloudflare Workers edge layer enforcing Zod schemas, idempotency keys, and immutable V1→V2 version allocation.",
        },
        inputSpec: {
          ko: "캠페인 브리프 JSON + Idempotency-Key 헤더 + 실행 모드(단일/동시/체인)",
          en: "Campaign brief JSON + Idempotency-Key header + run mode (single/parallel/chain)",
        },
        outputSpec: {
          ko: "D1 실행 세션 레코드 및 버전 슬롯(V1, V2...)",
          en: "D1 run session record and immutable version slot (V1, V2...)",
        },
        tech: ["Cloudflare Workers", "Drizzle ORM", "Zod", "Idempotency Guard"],
        steps: [
          { ko: "모든 테이블 행에 workspace_id 직접 기입으로 테넌트 격리", en: "Stamps workspace_id directly on every table row" },
          { ko: "동일 멱등성 키 재요청 시 중복 LLM 호출 없이 기존 실행 상태 반환", en: "Deduplicates concurrent requests via idempotency key lookup" },
          { ko: "수정 요청 시 이전 버전을 보존하고 새 버전(V2) 생성", en: "Allocates new version (V2) on revision requests without overwriting V1" },
        ],
        errorHandling: {
          ko: "스키마 불일치 시 400 구조화 오류 반환, 중복 실행 시 409/기존 세션 연결",
          en: "Returns structured 400 errors on schema mismatch and attaches to existing run on duplicate keys.",
        },
        verification: {
          ko: "통합 테스트 252개에서 멀티테넌트 격리·멱등성·버전 누적 검증",
          en: "Validated across 252 integration tests for tenant isolation and idempotent retries.",
        },
        samplePayload: `{\n  "run_id": "run_01J9JARVIS",\n  "mode": "chain_19_agents",\n  "version": "V2",\n  "previous_version_preserved": "V1"\n}`,
      },
      {
        id: "jarvis-strategy-room",
        label: { ko: "3. 전략실 8명 체인 & D1 맥락 요약", en: "3. Strategy Room (8 Agents) & D1 Summary" },
        layer: "ORCHESTRATOR",
        position: [-0.9, 1.3, -0.5],
        color: "#AB83FF",
        role: {
          ko: "시장·타깃·핵심 소구점·일정 검증을 담당하는 전략실 AI 직원 8명이 순차 실행되며, 직원마다 결과를 D1에 저장한 뒤 요약된 체인 맥락만 다음 직원에게 전달합니다.",
          en: "8 Strategy agents analyze audience, positioning, and proof points, persisting each output to D1 and passing compact context summaries.",
        },
        inputSpec: {
          ko: "정규화 캠페인 브리프 + 직전 직원 요약 맥락",
          en: "Normalized brief + summarized upstream agent context",
        },
        outputSpec: {
          ko: "전략실 8종 분석 결과물 + 제작실 전달용 핵심 요약본(Context Summary)",
          en: "8 Strategy artifacts + distilled Context Summary for Production Room",
        },
        tech: ["OpenAI Responses API (store: false)", "Cloudflare D1", "Chain Checkpointer"],
        steps: [
          { ko: "직원 1~8 실행 완료 즉시 D1에 개별 산출물 커밋", en: "Commits each agent's output to D1 immediately upon completion" },
          { ko: "전체 원문 대신 핵심 결정사항만 추린 체인 맥락 요약본 생성", en: "Compresses full outputs into a structured chain summary" },
          { ko: "네트워크/연결 중단 시 마지막 완료된 직원 다음 순서부터 즉시 재개", en: "Resumes from the last committed agent checkpoint if disconnected" },
        ],
        errorHandling: {
          ko: "개별 직원 호출 실패 시 D1 체크포인트 유지 및 해당 직원 단계만 재시도",
          en: "Retains D1 checkpoints on upstream timeout and retries only the failed agent.",
        },
        verification: {
          ko: "운영 실측 19명 전체 체인 279초 완주 및 중단 후 이어서 실행 테스트 통과",
          en: "Measured 279s full 19-agent chain completion and verified checkpoint resume.",
        },
        samplePayload: `{\n  "completed_agents": 8,\n  "d1_checkpoint": "strategy_08_done",\n  "context_summary_chars": 1420,\n  "openai_store": false\n}`,
      },
      {
        id: "jarvis-production-room",
        label: { ko: "4. 제작실 11명 채널별 원고 생성", en: "4. Production Room (11 Agents)" },
        layer: "AI_DATA",
        position: [1.3, -1.0, 0.6],
        color: "#6FA8FF",
        role: {
          ko: "전략실 요약 맥락을 받아 블로그, 인스타그램 카드뉴스(5~12장), 숏폼 영상 대본(5초 구간별), 웹자보 포스터, 뉴스레터 등 9개 채널 원고를 제작실 11명이 작성합니다.",
          en: "11 Production agents craft manuscripts across 9 channels including blog posts, 5–12 slide card-news, 5s-segmented short-form scripts, and posters.",
        },
        inputSpec: {
          ko: "전략실 요약 맥락 + 채널별 포맷·분량 제약 규격",
          en: "Strategy context summary + channel-specific format and length constraints",
        },
        outputSpec: {
          ko: "채널별 구조화 원고 JSON + 완성도 점수(TOP 1 READINESS)",
          en: "Structured channel manuscripts JSON + TOP 1 READINESS score",
        },
        tech: ["OpenAI Responses API", "Structured Outputs", "Channel Schema"],
        steps: [
          { ko: "카드뉴스 슬라이드별 제목·본문(5~12장) 구조화 생성", en: "Generates structured 5–12 slide card-news copy" },
          { ko: "숏폼 영상 구간(5초 단위)별 화면 지시문과 발화 대사 분리 생성", en: "Separates visual directions and spoken lines per 5-second short-form slot" },
          { ko: "완성도 점수(TOP 1 READINESS) 산출 (게시 판정과는 엄격히 분리)", en: "Computes TOP 1 READINESS score (strictly decoupled from Publish Gate)" },
        ],
        errorHandling: {
          ko: "JSON 구조 위반 시 Zod 파서 단계에서 즉시 재요청 또는 형식 보정",
          en: "Validates output structure with Zod and triggers targeted repair on malformed JSON.",
        },
        verification: {
          ko: "873개 단위 테스트에서 채널별 스키마 및 분량 계산 로직 검증",
          en: "Tested across 873 unit tests covering channel schemas and syllable counters.",
        },
        samplePayload: `{\n  "readiness_score": 92,\n  "channels_generated": 9,\n  "card_news_slides": 8,\n  "shortform_5s_slots": 6\n}`,
      },
      {
        id: "jarvis-publish-gate",
        label: { ko: "5. 게시 가능 판정 (Publish Gate)", en: "5. Deterministic Publish Gate" },
        layer: "VALIDATION",
        position: [3.4, 1.1, -0.3],
        color: "#25C8BD",
        role: {
          ko: "완성도 점수가 높아도 과장·보장 문구, 출처·확인일(14일 이내) 없는 가격·일정, 카드뉴스 장 수(5~12장), 숏폼 5초 구간 대사 분량(목표 30음절) 위반 시 자동 보완 1회 후 게시를 차단합니다.",
          en: "Independently audits facts, hype phrases, 14-day price/date freshness, card counts (5–12), and 5s script syllable limits, running 1 auto-fix pass before blocking unsafe releases.",
        },
        inputSpec: {
          ko: "제작실 원고 전체 + 원본 브리프 사실 근거",
          en: "Generated manuscripts + ground-truth campaign facts",
        },
        outputSpec: {
          ko: "게시 가능 여부(PASS / BLOCKED) + 차단 사유 및 줄여야 할 문장 위치",
          en: "Publish verdict (PASS / BLOCKED) + exact offending line and remediation guide",
        },
        tech: ["Publish Gate Rule Engine", "Auto-Remediation (1-Pass)", "Syllable & Fact Auditor"],
        steps: [
          { ko: "과장·보장 표현('100% 취업 보장' 등) 탐지 시 '피해야 할 표현' 안내 목록과 실제 본문 약속을 구분해 검사", en: "Distinguishes 'expressions to avoid' guidelines from actual hype claims" },
          { ko: "숏폼 대사 음절 수 계산 시 영상 설명란(캡션) 문구는 제외하고 실제 발화 대사만 측정", en: "Counts spoken script syllables per 5s slot while excluding video caption text" },
          { ko: "위반 항목 발견 시 자동 보완 1회 실행 → 여전히 기준 초과 시 게시 차단 및 수정 위치 표시", en: "Runs 1 auto-fix pass; if a 5s slot still has 47 syllables (target 30), blocks and highlights the line" },
        ],
        errorHandling: {
          ko: "검수 중 발견한 오탐 2건('피해야 할 표현' 목록 오인, 영상 설명란 대사 합산)을 재현 테스트와 함께 수정·운영 반영 완료",
          en: "Fixed 2 real-world false positives with regression tests and deployed to production.",
        },
        verification: {
          ko: "실제 행사 19건 중 18건 게시 가능 판정, 1건(5초 구간 47음절 초과) 정확히 차단",
          en: "18 of 19 real events passed; 1 event accurately blocked for 47 syllables in a 5s slot.",
        },
        samplePayload: `{\n  "readiness_score": 92,\n  "publish_gate": "BLOCKED",\n  "auto_fix_attempted": 1,\n  "reason": "숏폼 05-10초 구간 47음절 (목표 30음절 이하) — 줄일 문장 하이라이트"\n}`,
      },
      {
        id: "jarvis-output-render",
        label: { ko: "6. 웹자보·카드뉴스 PNG & 9채널 패키지", en: "6. PNG Renderer & 9-Channel Package" },
        layer: "OUTPUT",
        position: [5.3, -0.7, 0.4],
        color: "#AB83FF",
        role: {
          ko: "검증을 통과한 원고에서 바로 웹자보 포스터 PNG와 카드뉴스 장별 PNG를 브라우저에서 렌더링하고, 9개 채널 배포 패키지로 내보냅니다.",
          en: "Renders web poster PNGs and slide-by-slide card-news PNGs directly in the browser and exports the 9-channel distribution bundle.",
        },
        inputSpec: {
          ko: "Publish Gate 통과 원고 및 시각 템플릿 설정",
          en: "Publish-Gate approved manuscript and visual template tokens",
        },
        outputSpec: {
          ko: "웹자보 포스터 PNG + 카드뉴스 장별 PNG + 9개 채널 원고 패키지",
          en: "Poster PNG + per-slide card-news PNGs + 9-channel copy bundle",
        },
        tech: ["Browser Canvas/DOM PNG Renderer", "9-Channel Packager"],
        steps: [
          { ko: "원고 제목·일정·핵심 혜택을 웹자보 포스터 레이아웃에 매핑해 고해상도 PNG 생성", en: "Maps headline, schedule, and benefits into high-DPI poster PNGs" },
          { ko: "카드뉴스 각 슬라이드를 장별 PNG 이미지로 일괄 변환", en: "Renders each card-news slide as an individual PNG" },
        ],
        errorHandling: {
          ko: "긴 제목 줄바꿈 깨짐 방지 레이아웃 가드 및 폰트 로드 완료 후 캡처 보장",
          en: "Awaits font readiness and enforces line-wrap guards before PNG rasterization.",
        },
        verification: {
          ko: "화면 렌더 테스트 19개 및 실제 과정 홍보 산출물 출력 검증",
          en: "Verified via 19 render tests and production promotional assets.",
        },
        samplePayload: `{\n  "poster_png": "ready (1080x1350)",\n  "card_news_pngs": "8 slides rendered",\n  "channels_exported": 9\n}`,
      },
    ],
    edges: [
      { from: "jarvis-intake", to: "jarvis-workers-api", kind: "primary", label: { ko: "2회 확인된 브리프", en: "Double-Confirmed Brief" } },
      { from: "jarvis-workers-api", to: "jarvis-strategy-room", kind: "primary", label: { ko: "멱등성 & V1/V2 세션", en: "Idempotent Session" } },
      { from: "jarvis-strategy-room", to: "jarvis-production-room", kind: "primary", label: { ko: "D1 체크포인트 & 요약 맥락", en: "D1 Checkpoint & Summary" } },
      { from: "jarvis-production-room", to: "jarvis-publish-gate", kind: "primary", label: { ko: "9채널 원고 + 완성도 점수", en: "Manuscripts + Readiness" } },
      { from: "jarvis-publish-gate", to: "jarvis-production-room", kind: "feedback", label: { ko: "위반 감지 시 자동 보완 1회", en: "1-Pass Auto-Remediation" } },
      { from: "jarvis-publish-gate", to: "jarvis-output-render", kind: "primary", label: { ko: "게시 가능 판정 통과분", en: "Publish Gate Approved" } },
    ],
  },
  {
    id: "link21-bidpilot-ai",
    name: "LINK21 BidPilot AI",
    title: {
      ko: "공공입찰 · 지원사업 수집 · 규칙 자격 판정 · 요구사항 추출 · 제출 전 감사 파이프라인",
      en: "Public Procurement Ingestion, Rule Eligibility, RFP Matrix & Pre-Submission Audit Pipeline",
    },
    badge: {
      ko: "FastAPI + Next.js 16 + Three.js · 571 Commits · 2,659 Automated Tests",
      en: "FastAPI + Next.js 16 + Three.js · 571 Commits · 2,659 Automated Tests",
    },
    summary: {
      ko: "나라장터·기업마당 공고를 수집해 쪽 번호를 보존한 채 파싱하고, 결정형 규칙 엔진으로 참가 자격(188/191 일치)을 판정한 뒤 요구사항 정리표(P 0.795 · R 0.843)와 제안서 초안·제출 전 누락 점검을 수행합니다.",
      en: "Collects G2B and Bizinfo notices, parses documents with 100% page preservation, runs rule-engine eligibility checks (188/191 match), extracts RFP matrices, and audits proposal drafts.",
    },
    simulationNotice: {
      ko: "[시뮬레이션 안내] 사내 로컬 시스템(v1.0.1)의 8단계 정거장 파이프라인과 2,659개 자동 시험에서 검증된 공고 판정·감사 데이터 흐름을 재현합니다.",
      en: "[Simulation Mode] Simulates the 8-station procurement pipeline validated across 2,659 automated tests and 36 audit cycles.",
    },
    metrics: [...VERIFIED_PROJECT_METRICS["link21-bidpilot-ai"].labMetrics],
    nodes: [
      {
        id: "bid-collector",
        label: { ko: "1. 나라장터 · 기업마당 수집기", en: "1. G2B & Bizinfo Collector" },
        layer: "INPUT",
        position: [-5.0, 1.0, 0.2],
        color: "#6FA8FF",
        role: {
          ko: "나라장터(G2B) OpenAPI와 기업마당 지원사업 공고를 매일 수집하고 마감일·예산·도메인 적합도로 검토 우선순위(Radar)를 산정합니다.",
          en: "Collects daily procurement notices from G2B OpenAPI and Bizinfo, ranking opportunities by fit and deadline urgency.",
        },
        inputSpec: { ko: "G2B OpenAPI / 기업마당 공고 피드 및 사내 중점 키워드", en: "G2B OpenAPI / Bizinfo feeds & company domain keywords" },
        outputSpec: { ko: "정규화 공고 메타데이터 + 첨부 RFP/공고문 원본 파일", en: "Normalized notice metadata + raw RFP attachments" },
        tech: ["Python", "G2B OpenAPI", "SQLite", "Priority Scorer"],
        steps: [
          { ko: "일일 신규·변경 공고 중복 제거 수집", en: "Deduplicated daily ingestion of new and amended notices" },
          { ko: "우선순위 큐 및 2D/3D 기회 레이더 좌표 산출", en: "Computes priority queue rank and 2D/3D Opportunity Radar coordinates" },
        ],
        errorHandling: { ko: "API 타임아웃 시 지수 백오프 재시도 및 이전 수집 스냅샷 보존", en: "Exponential backoff retry with snapshot preservation on API timeouts." },
        verification: { ko: "수집·정규화 단위 테스트 및 일일 배치 검증", en: "Verified via collector unit tests and daily ingestion checks." },
        samplePayload: `{\n  "notice_id": "G2B-2026-08941",\n  "source": "나라장터",\n  "priority_rank": "TOP_REVIEW",\n  "attachments": ["제안요청서.pdf"]\n}`,
      },
      {
        id: "bid-parser",
        label: { ko: "2. 쪽 보존 문서 파서", en: "2. Page-Preserving Parser" },
        layer: "API",
        position: [-2.6, -1.0, 0.7],
        color: "#25C8BD",
        role: {
          ko: "공고문·제안요청서(PDF/HWP/HTML)에서 표와 본문을 추출할 때 원본 쪽 번호 경계를 100% 보존해 모든 판정과 요구사항이 원문 쪽을 가리키도록 합니다.",
          en: "Extracts text and tables from RFP files while strictly preserving page boundary tokens for 100% citation accuracy.",
        },
        inputSpec: { ko: "공고문 및 제안요청서 원본 파일", en: "Raw notice and RFP document files" },
        outputSpec: { ko: "쪽 번호가 매핑된 단락·표 블록 트리", en: "Page-indexed paragraph and table block tree" },
        tech: ["Python Document Parser", "Page Boundary Tokenizer", "Table Extractor"],
        steps: [
          { ko: "쪽 경계 마커 삽입 후 문단·표 구조 분리", en: "Inserts page boundary markers before segmenting paragraphs and tables" },
          { ko: "요구사항 고유 번호(MAR-001 등)와 원문 쪽 번호 1:1 연결", en: "Links requirement IDs (e.g., MAR-001) to exact source page numbers" },
        ],
        errorHandling: { ko: "스캔 이미지 페이지 감지 시 누락 경고 표시", en: "Flags scanned image-only pages for OCR/manual check." },
        verification: { ko: "실공고 정답셋 대조 결과 요구사항 쪽 번호 일치율 100% 달성", en: "Achieved 100% page-number match against ground-truth RFP benchmarks." },
        samplePayload: `{\n  "pages_parsed": 64,\n  "tables_extracted": 19,\n  "page_citation_match": "100%"\n}`,
      },
      {
        id: "bid-eligibility",
        label: { ko: "3. 규칙 엔진 자격 판정기", en: "3. Rule-Engine Eligibility Gate" },
        layer: "ORCHESTRATOR",
        position: [-0.2, 1.1, -0.4],
        color: "#AB83FF",
        role: {
          ko: "업종코드·중소기업 확인서·지역 제한·실적 요건을 회사 프로필과 결정형 규칙 엔진으로 대조해 가능 / 확인필요 / 불가를 원문 근거와 함께 판정합니다.",
          en: "Evaluates company qualifications against notice rules deterministically, outputting Eligible / Needs Check / Ineligible with source quotes.",
        },
        inputSpec: { ko: "쪽 보존 파싱 결과 + 링크21 회사 자격 프로필", en: "Page-parsed notice + Link21 qualification profile" },
        outputSpec: { ko: "자격 판정 결과(가능/확인필요/불가) + 원문 쪽·문장 근거", en: "Eligibility verdict + exact page and sentence evidence" },
        tech: ["Deterministic Rule Engine", "Evidence Matcher"],
        steps: [
          { ko: "결격 사유·지역 제한·필수 인증 코드 규칙 매칭", en: "Matches regional limits, mandatory certifications, and industry codes" },
          { ko: "판정 근거 문장과 원문 쪽 번호를 카드 형태로 출력", en: "Emits evidence cards with exact page numbers and original quotes" },
        ],
        errorHandling: { ko: "근거가 모호한 조항은 임의로 '가능' 처리하지 않고 '확인필요'로 분류", en: "Classifies ambiguous clauses as 'Needs Check' rather than false-positive 'Eligible'." },
        verification: { ko: "지원사업 기준 답안 191건 중 188건(98.4%) 일치 검증", en: "Matched 188 out of 191 benchmark grant eligibility answers." },
        samplePayload: `{\n  "verdict": "ELIGIBLE",\n  "benchmark_accuracy": "188/191",\n  "evidence_page": 7,\n  "quote": "중소기업기본법 제2조에 따른 중소기업"\n}`,
      },
      {
        id: "bid-matrix",
        label: { ko: "4. 요구사항 정리표 & 초안 생성", en: "4. RFP Matrix & Proposal Drafter" },
        layer: "AI_DATA",
        position: [2.4, -0.9, 0.5],
        color: "#6FA8FF",
        role: {
          ko: "RFP에서 필수 요구사항 정리표를 추출(Precision 0.795, Recall 0.843)하고 Claude Code / Codex CLI를 연동해 사업계획서·제안서 초안(DOCX/PDF)을 작성합니다.",
          en: "Extracts the RFP requirements matrix (P 0.795, R 0.843) and orchestrates Claude/Codex CLIs to draft DOCX/PDF proposals.",
        },
        inputSpec: { ko: "파싱된 제안요청서(RFP) + 회사 수행 실적 에셋", en: "Parsed RFP + company track-record assets" },
        outputSpec: { ko: "요구사항 대조표(Matrix) + 제안서 초안 문서(DOCX/PDF)", en: "Requirements compliance matrix + DOCX/PDF proposal draft" },
        tech: ["Claude Code CLI", "Codex CLI", "DOCX/PDF Builder"],
        steps: [
          { ko: "요구사항 분류·고유번호·필수 산출물 추출해 정리표 생성", en: "Extracts requirement IDs, categories, and mandatory deliverables" },
          { ko: "각 요구사항을 제안서 목차 장·절에 매핑해 초안 생성", en: "Maps each requirement to proposal sections and generates DOCX/PDF drafts" },
        ],
        errorHandling: { ko: "원문에 없는 수행 실적을 생성하지 못하도록 회사 에셋 사실만 참조", en: "Restricts draft claims strictly to verified company portfolio facts." },
        verification: { ko: "실공고 정답셋 기준 Precision 0.795 · Recall 0.843 검증", en: "Verified Precision 0.795 and Recall 0.843 against real RFP answer sets." },
        samplePayload: `{\n  "extracted_requirements": 42,\n  "precision": 0.795,\n  "recall": 0.843,\n  "draft_format": ["DOCX", "PDF"]\n}`,
      },
      {
        id: "bid-auditor",
        label: { ko: "5. 제출 전 누락 점검 (Auditor)", en: "5. Pre-Submission Auditor" },
        layer: "VALIDATION",
        position: [5.0, 0.9, -0.2],
        color: "#25C8BD",
        role: {
          ko: "작성된 제안서 초안을 원본 공고 요구사항과 1:1 대조해 누락된 요구사항, 수치 불일치, 필수 첨부서류 미비 여부를 제출 전에 감사(Audit)합니다.",
          en: "Cross-audits the proposal draft against source RFP requirements to flag missing items, number mismatches, and omitted forms.",
        },
        inputSpec: { ko: "제안서 초안 + 원본 RFP 요구사항 매트릭스", en: "Proposal draft + source RFP requirements matrix" },
        outputSpec: { ko: "누락·불일치 감사 리포트 및 8단계 정거장 최종 승인 상태", en: "Omission/mismatch audit findings & 8-station readiness status" },
        tech: ["Pre-Submission Auditor", "Snapshot Diff Harness", "Pytest (2,659 tests)"],
        steps: [
          { ko: "요구사항별 제안서 반영 위치 및 근거 문단 유무 대조", en: "Verifies every RFP requirement is addressed in a specific draft section" },
          { ko: "예산·기간·인력 투입 수치 불일치 검출 및 원문 쪽 번호 하이라이트", en: "Flags budget, timeline, or staffing discrepancies with source page links" },
        ],
        errorHandling: { ko: "단 1건의 필수 요구사항이라도 누락되면 제출 준비 완료 승인 보류", en: "Holds final submission sign-off if any mandatory requirement is unaddressed." },
        verification: { ko: "검수→수정 36회 반복 및 자동 시험 2,659개 통과", en: "Hardened across 36 audit-to-fix cycles and 2,659 automated tests." },
        samplePayload: `{\n  "audit_cycles_completed": 36,\n  "automated_tests": 2659,\n  "omitted_mandatory_items": 0,\n  "station_8_decision": "READY_TO_SUBMIT"\n}`,
      },
    ],
    edges: [
      { from: "bid-collector", to: "bid-parser", kind: "primary", label: { ko: "원본 공고문 & RFP", en: "Raw Notice & RFP" } },
      { from: "bid-parser", to: "bid-eligibility", kind: "primary", label: { ko: "쪽 번호 보존 블록", en: "Page-Indexed Blocks" } },
      { from: "bid-eligibility", to: "bid-matrix", kind: "primary", label: { ko: "적격 공고 (188/191 검증)", en: "Qualified Notice" } },
      { from: "bid-matrix", to: "bid-auditor", kind: "primary", label: { ko: "요구사항 표 + 제안서 초안", en: "Matrix + Draft DOCX" } },
    ],
  },
  {
    id: "tri-agent-control",
    name: "tri-agent-control",
    title: {
      ko: "Claude Code(구현) · Antigravity(테스트) · Codex(검토) 고정 역할 코딩 파이프라인",
      en: "Fixed-Role 3-CLI Coding Pipeline (Claude Implement · Antigravity Test · Codex Review)",
    },
    badge: {
      ko: "Python + git worktree · 384 Regression Tests · 14-Task Eval Harness",
      en: "Python + git worktree · 384 Regression Tests · 14-Task Eval Harness",
    },
    summary: {
      ko: "계획 1회(Claude, 읽기 전용) → 사용자 승인 → [구현(Claude) → 테스트(Antigravity, 테스트 파일 한정) → 자동 검증(pytest·npm test·build) → 검토(Codex, 읽기 전용 PASS/CHANGES)] 사이클을 세션별 git worktree에서 반복합니다.",
      en: "Executes Plan 1x (Claude read-only) → Approval → [Implement (Claude) → Test (Antigravity test-files-only) → Auto-Verify → Review (Codex read-only)] inside isolated git worktrees.",
    },
    simulationNotice: {
      ko: "[시뮬레이션 안내] 회의실 예약 웹앱 6기능 실사용 검증(11개 사이클 커밋, 106개 테스트, 동시성 결함 등 5건 검출·해결)의 실제 사이클 흐름을 재현합니다.",
      en: "[Simulation Mode] Replays the verified 6-feature meeting room app field test (11 cycle commits, 106 tests, 5 defects caught by Codex review).",
    },
    metrics: [...VERIFIED_PROJECT_METRICS["tri-agent-control"].labMetrics],
    nodes: [
      {
        id: "tri-plan-worktree",
        label: { ko: "1. 계획 1회 & git worktree 격리", en: "1. Read-Only Plan & git worktree" },
        layer: "INPUT",
        position: [-5.1, 0.9, 0.3],
        color: "#6FA8FF",
        role: {
          ko: "Claude가 읽기 전용으로 작업 계획을 1회 세워 사용자 승인을 받고, Git 저장소일 때 세션별 git worktree를 생성해 기존 가상환경·node_modules를 연결합니다.",
          en: "Generates a 1-time read-only plan with Claude for user approval and provisions an isolated per-session git worktree.",
        },
        inputSpec: { ko: "사용자 기능 요구사항 + 대상 Git 저장소", en: "Feature specification + target Git repository" },
        outputSpec: { ko: "승인된 구현 계획 + 격리된 세션 worktree 경로", en: "Approved plan + isolated session worktree path" },
        tech: ["git worktree", "Claude Code CLI (Read-Only Plan)", "Venv/node_modules Linker"],
        steps: [
          { ko: "계획 단계에서는 파일 수정을 차단하고 읽기 전용으로 아키텍처 수립", en: "Enforces read-only mode during initial planning" },
          { ko: "세션 전용 git worktree 생성 후 .venv 및 node_modules 연결", en: "Creates dedicated git worktree and links existing .venv and node_modules" },
        ],
        errorHandling: { ko: "비-Git 일반 폴더일 경우 worktree 생성 없이 안전 모드로 동작", en: "Gracefully falls back to standard directory mode when outside a Git repo." },
        verification: { ko: "worktree 격리 및 비-Git 폴더 호환 회귀 테스트 통과", en: "Verified across worktree isolation and non-Git fallback tests." },
        samplePayload: `{\n  "session_id": "sess_booking_app",\n  "worktree": ".worktrees/sess_booking_app",\n  "plan_approved": true,\n  "brief_window": "last 6 lines (max 360 chars)"\n}`,
      },
      {
        id: "tri-implement",
        label: { ko: "2. 구현 단계 (Claude Code CLI)", en: "2. Implement Step (Claude Code)" },
        layer: "ORCHESTRATOR",
        position: [-2.6, -1.0, 0.6],
        color: "#AB83FF",
        role: {
          ko: "Claude Code CLI가 승인된 계획과 직전 사이클의 Codex 검토 지적사항(brief.md 최근 6줄·360자 절단)을 반영해 프로덕션 코드를 구현합니다.",
          en: "Claude Code CLI implements feature code or fixes defects flagged by the previous cycle's Codex review.",
        },
        inputSpec: { ko: "승인 계획 + brief.md(최근 6줄, 360자 절단) + 이전 검토 피드백", en: "Approved plan + brief.md (6 lines, 360 chars max) + review feedback" },
        outputSpec: { ko: "변경된 애플리케이션 소스 파일", en: "Modified application source files" },
        tech: ["Claude Code CLI", "Subprocess Stream Reader", "brief.md Context Injector"],
        steps: [
          { ko: "프롬프트 비대화를 막기 위해 최근 6줄(360자 절단) 요약만 brief.md로 주입", en: "Injects bounded 6-line (360-char) brief.md context to prevent prompt bloat" },
          { ko: "시간·토큰·diff 한도는 실행 중 강제 종료하지 않고 사이클 경계에서만 확인", en: "Checks time, token, and diff limits strictly at cycle boundaries" },
        ],
        errorHandling: { ko: "프로세스 실행 중 강제 킬로 인한 반쪽 파일 유실 원천 방지", en: "Never kills mid-write; evaluates budget thresholds at cycle boundaries." },
        verification: { ko: "회의실 예약 앱 6개 기능 연속 구현 완주", en: "Successfully implemented all 6 features of the meeting room booking app." },
        samplePayload: `{\n  "role": "IMPLEMENTER",\n  "cli": "claude",\n  "modified_files": ["backend/routers/bookings.py", "frontend/src/WeekView.tsx"]\n}`,
      },
      {
        id: "tri-test",
        label: { ko: "3. 테스트 단계 (Antigravity · 테스트 파일 한정)", en: "3. Test Step (Antigravity · Test Files Only)" },
        layer: "AI_DATA",
        position: [0.0, 1.1, -0.4],
        color: "#6FA8FF",
        role: {
          ko: "Antigravity CLI가 구현된 코드를 검증하는 테스트 코드를 작성하되, 프로덕션 소스는 건드리지 못하고 오직 테스트 파일만 수정하도록 권한이 제한됩니다.",
          en: "Antigravity CLI writes verification tests while strictly restricted to modifying test files only.",
        },
        inputSpec: { ko: "Claude가 구현한 코드 diff + 기능 명세", en: "Implementation diff + feature specification" },
        outputSpec: { ko: "신규·보강된 단위/통합 테스트 파일 (프로덕션 코드 변경 0건)", en: "New/updated unit and integration test files (0 prod code edits)" },
        tech: ["Antigravity CLI", "Test-File-Only Path Guard"],
        steps: [
          { ko: "구현 에이전트와 분리된 시각에서 엣지 케이스 테스트 작성", en: "Authors edge-case tests from an independent agent perspective" },
          { ko: "테스트 파일 외 경로 수정 시 즉시 차단·복원하는 파일 가드 작동", en: "Reverts any unauthorized edits outside designated test directories" },
        ],
        errorHandling: { ko: "비테스트 파일 수정 감지 시 자동 롤백 및 경고 기록", en: "Automatically rolls back non-test file mutations." },
        verification: { ko: "회의실 예약 앱 실사용 검증에서 총 106개 테스트 작성·통과", en: "Produced 106 passing tests in the meeting room app field validation." },
        samplePayload: `{\n  "role": "TESTER",\n  "cli": "antigravity",\n  "allowed_paths": ["tests/**", "**/*.test.ts"],\n  "total_tests_suite": 106\n}`,
      },
      {
        id: "tri-verify",
        label: { ko: "4. 자동 검증 (pytest · npm test · build)", en: "4. Auto Verification Runner" },
        layer: "VALIDATION",
        position: [2.5, -0.9, 0.5],
        color: "#25C8BD",
        role: {
          ko: "파이프라인이 pytest, npm test, 프론트엔드 빌드를 실제 실행해 통과 여부를 확인하고 실행 로그를 검토 단계로 전달합니다.",
          en: "Executes pytest, npm test, and production builds, feeding deterministic pass/fail logs to the reviewer.",
        },
        inputSpec: { ko: "구현 코드 + Antigravity 테스트 스위트", en: "Implementation code + Antigravity test suite" },
        outputSpec: { ko: "테스트·빌드 종료 코드 및 표준 출력 로그", en: "Test/build exit codes and captured stdout/stderr logs" },
        tech: ["Pytest", "Vitest / npm test", "Vite / Next Build Runner"],
        steps: [
          { ko: "백엔드 pytest 및 프론트엔드 테스트·빌드 순차 실행", en: "Runs backend pytest and frontend test/build commands sequentially" },
          { ko: "실패 시 에러 트레이스를 구조화해 다음 단계에 전달", en: "Formats failure tracebacks for downstream review and remediation" },
        ],
        errorHandling: { ko: "무한 대기 방지를 위한 테스트 타임아웃 및 프로세스 트리 정리", en: "Enforces command timeouts and clean process-tree termination." },
        verification: { ko: "384개 자체 회귀 테스트 및 14과제 숨김 테스트 하니스 검증", en: "Backed by 384 internal regression tests and a 14-task evaluation harness." },
        samplePayload: `{\n  "pytest": "PASSED",\n  "frontend_test": "PASSED",\n  "frontend_build": "PASSED"\n}`,
      },
      {
        id: "tri-review-commit",
        label: { ko: "5. 검토 (Codex 읽기 전용) & 선별 커밋", en: "5. Codex Read-Only Review & Commit" },
        layer: "OUTPUT",
        position: [5.0, 1.0, -0.2],
        color: "#AB83FF",
        role: {
          ko: "Codex CLI가 읽기 전용으로 코드와 테스트를 감사해 REVIEW: PASS 또는 REVIEW: CHANGES를 판정하고, 사이클마다 실제 변경 파일만 골라 커밋합니다.",
          en: "Codex CLI audits code and tests in read-only mode (REVIEW: PASS / CHANGES), committing only modified files per cycle.",
        },
        inputSpec: { ko: "git diff + 테스트 코드 + 자동 검증 실행 결과", en: "git diff + test suite + auto-verification logs" },
        outputSpec: { ko: "REVIEW: PASS / CHANGES 판정 + 사이클 선별 Git 커밋", en: "REVIEW: PASS / CHANGES verdict + selective cycle Git commit" },
        tech: ["Codex CLI (Read-Only)", "Selective Git Committer"],
        steps: [
          { ko: "테스트가 통과했더라도 동시성 경쟁 조건(Race Condition)이나 트랜잭션 누락을 정밀 감사", en: "Audits for race conditions and logic flaws even when unit tests pass" },
          { ko: "REVIEW: CHANGES 시 다음 사이클에서 Claude가 수정, REVIEW: PASS 시 완료", en: "Routes REVIEW: CHANGES findings back to Claude in the next cycle" },
        ],
        errorHandling: { ko: "실사용 검증에서 구현·테스트가 놓친 결함 5건(동시성 3건 포함) 검출 → 4건 다음 사이클, 1건 마무리 세션 해결", en: "Caught 5 missed defects (including 3 concurrency bugs) in field testing: 4 fixed in next cycles, 1 in wrap-up." },
        verification: { ko: "전체 커밋 12개 중 파이프라인 사이클 커밋 11개 자동 생성 검증", en: "Produced 11 automated cycle commits out of 12 total commits in the field test." },
        samplePayload: `{\n  "reviewer": "codex (read-only)",\n  "verdict": "REVIEW: PASS",\n  "defects_caught_total": 5,\n  "concurrency_bugs_caught": 3,\n  "cycle_commits": "11 / 12 total"\n}`,
      },
    ],
    edges: [
      { from: "tri-plan-worktree", to: "tri-implement", kind: "primary", label: { ko: "승인 계획 & worktree", en: "Approved Plan & Worktree" } },
      { from: "tri-implement", to: "tri-test", kind: "primary", label: { ko: "구현 코드 diff", en: "Implemented Code Diff" } },
      { from: "tri-test", to: "tri-verify", kind: "primary", label: { ko: "테스트 파일 한정 추가", en: "Test-Only Additions" } },
      { from: "tri-verify", to: "tri-review-commit", kind: "primary", label: { ko: "테스트·빌드 통과 로그", en: "Test & Build Logs" } },
      { from: "tri-review-commit", to: "tri-implement", kind: "feedback", label: { ko: "REVIEW: CHANGES (다음 사이클 수정)", en: "REVIEW: CHANGES Rework" } },
    ],
  },
  {
    id: "market-pulse",
    name: "Market Pulse",
    title: {
      ko: "다나와 9개 카테고리 일일 수집 · 오염 필터 · 로그 가격 ML 적정가 예측 · 3D 데스크",
      en: "9-Category Hardware ETL, Contamination Filter, Log-Price ML & 3D Desk Architecture",
    },
    badge: {
      ko: "FastAPI (17 APIs) + React 19 + Three.js · 57,690 Snapshots · R² 0.78",
      en: "FastAPI (17 APIs) + React 19 + Three.js · 57,690 Snapshots · R² 0.78",
    },
    summary: {
      ko: "다나와 9개 카테고리 약 5.8만 건 스냅샷(57,690건)을 매일 수집해 미끼가·비정상가를 제거하고, 제품명 스펙 추출 + 로그 가격 ML 모델로 적정가(R² 0.78, 80% 구간 적중 81.1%)를 산출합니다.",
      en: "Collects 57,690 snapshots across 9 hardware categories daily, filters bait/contaminated listings, predicts log-price ML fair values (R² 0.78), and visualizes via FastAPI and Three.js.",
    },
    simulationNotice: {
      ko: "[시뮬레이션 안내] 다나와 9개 카테고리 57,690건 스냅샷 수집부터 오염 필터링, 로그 가격 ML 추론, 3D 데스크 바인딩까지의 파이프라인을 시뮬레이션합니다.",
      en: "[Simulation Mode] Simulates the daily 57,690-snapshot ETL, bait-price filtering, log-price ML inference, and Three.js 3D desk binding.",
    },
    metrics: [...VERIFIED_PROJECT_METRICS["market-pulse"].labMetrics],
    nodes: [
      {
        id: "mp-scraper",
        label: { ko: "1. 9개 카테고리 일일 무인 수집", en: "1. 9-Category Daily Collector" },
        layer: "INPUT",
        position: [-5.0, 0.8, 0.2],
        color: "#6FA8FF",
        role: {
          ko: "CPU, GPU, RAM, SSD, 메인보드, 파워, 쿨러, 케이스, 모니터 9개 카테고리 시세를 매일 자동 수집해 누적 약 5.8만 건(57,690건) 스냅샷을 적재합니다.",
          en: "Automatically collects daily prices across 9 PC hardware categories, accumulating 57,690 historical snapshots.",
        },
        inputSpec: { ko: "다나와 9개 하드웨어 카테고리 상품 목록 및 일일 가격", en: "9 Danawa hardware category listings and daily prices" },
        outputSpec: { ko: "일자별 원시 스냅샷 레코드 (57,690건 누적)", en: "Timestamped raw product snapshot records (57,690 total)" },
        tech: ["Python Scraper", "GitHub Actions Cron", "SQLite"],
        steps: [
          { ko: "카테고리별 페이지 순회 및 상품 고유코드·가격·스펙 문자열 추출", en: "Crawls category pages extracting product codes, prices, and spec strings" },
          { ko: "일자별 시계열 스냅샷 테이블에 증분 적재", en: "Appends daily snapshots to SQLite time-series tables" },
        ],
        errorHandling: { ko: "일시적 응답 지연 시 카테고리 단위 재시도 및 수집 무결성 체크", en: "Category-level retry and row-count sanity checks on network hiccups." },
        verification: { ko: "수집 파서 단위 테스트 및 일일 자동 갱신 워크플로우 검증", en: "Verified via scraper unit tests and daily GitHub Actions runs." },
        samplePayload: `{\n  "categories": 9,\n  "total_snapshots": 57690,\n  "schedule": "daily_automated"\n}`,
      },
      {
        id: "mp-filter",
        label: { ko: "2. 미끼가 · 비정상가 · 오염 필터", en: "2. Bait & Contamination Filter" },
        layer: "ORCHESTRATOR",
        position: [-2.4, -1.0, 0.6],
        color: "#25C8BD",
        role: {
          ko: "품절 표시용 가짜 고가(9,999,990원 등), 본품 카테고리에 섞인 케이블·브래킷 액세서리, 중고·벌크 미끼 상품을 정제하고 Z-score·IQR 이상치를 분리합니다.",
          en: "Strips placeholder prices (9,999,990 KRW), accessory contamination, and bait listings while flagging Z-score/IQR anomalies.",
        },
        inputSpec: { ko: "원시 수집 스냅샷 레코드", en: "Raw scraped product snapshots" },
        outputSpec: { ko: "정제된 정품 시세 데이터셋 + 이상치(Anomaly) 리포트", en: "Clean genuine hardware dataset + statistical anomaly report" },
        tech: ["Rule Filter", "Z-Score & IQR Detector", "Pandas"],
        steps: [
          { ko: "9,999,990원 등 품절 자리표시 가격 및 극단값 제거", en: "Removes placeholder out-of-stock prices and extreme outliers" },
          { ko: "카테고리 오염 키워드(단품 브래킷, 연장 케이블 등) 필터링", en: "Filters accessory items contaminating core component categories" },
        ],
        errorHandling: { ko: "필터링된 이상치 상품은 삭제하지 않고 이상치 탐지 탭에서 별도 추적", en: "Preserves flagged outliers in a dedicated Anomaly Detection audit table." },
        verification: { ko: "196개 pytest 스위트 내 이상치·오염 제거 검증", en: "Tested within the 196-test pytest suite for contamination removal." },
        samplePayload: `{\n  "placeholder_prices_removed": true,\n  "accessory_contamination_filtered": true,\n  "anomaly_metrics": ["z_score", "iqr_bounds"]\n}`,
      },
      {
        id: "mp-ml",
        label: { ko: "3. 스펙 피처 추출 & 로그 가격 ML", en: "3. Spec Feature & Log-Price ML" },
        layer: "AI_DATA",
        position: [0.3, 1.0, -0.4],
        color: "#AB83FF",
        role: {
          ko: "제품명에서 세대·등급(i7/Ryzen 7, RTX 4070 Ti 등)·용량·소켓 피처를 추출하고 로그 가격(log1p)을 예측해 R² 0.78, 80% 예측 범위 적중률 81.1%를 달성합니다.",
          en: "Extracts generation, tier, capacity, and socket features from product names and trains on log-prices to achieve R² 0.78 and 81.1% interval hit rate.",
        },
        inputSpec: { ko: "정제된 9개 카테고리 상품명·스펙·가격 이력", en: "Cleaned 9-category product names, specs, and price history" },
        outputSpec: { ko: "상품별 ML 적정가, 80% 예측 범위(하한~상한), 적정가 점수", en: "Predicted fair price, 80% prediction interval, and fair-value score" },
        tech: ["Scikit-learn", "Log-Price Regression", "Regex Spec Parser"],
        steps: [
          { ko: "제품명 정규식 파서로 브랜드·세대·세부 등급·메모리 용량 수치화", en: "Parses product strings into structured generation, tier, and capacity features" },
          { ko: "로그 가격 변환 학습으로 CPU 예측 중앙 오차를 28.0% → 17.5%로 개선", en: "Log-price modeling reduced CPU median prediction error from 28.0% to 17.5%" },
        ],
        errorHandling: { ko: "신규 출시 부품 등 표본 부족 시 동일 등급 이웃 분포로 예측 범위 확대", en: "Widens prediction intervals gracefully for newly released low-sample SKUs." },
        verification: { ko: "전체 R² 0.78 · 80% 구간 적중률 81.1% · CPU 중앙 오차 17.5% 실측 검증", en: "Validated R² 0.78, 81.1% 80%-interval coverage, and 17.5% CPU median error." },
        samplePayload: `{\n  "r2_score": 0.78,\n  "interval_80_hit_rate": "81.1%",\n  "cpu_median_error": "17.5% (improved from 28.0%)"\n}`,
      },
      {
        id: "mp-api-ui",
        label: { ko: "4. FastAPI 17개 API & Three.js 3D 데스크", en: "4. FastAPI (17 APIs) & Three.js 3D Desk" },
        layer: "OUTPUT",
        position: [3.8, -0.6, 0.3],
        color: "#6FA8FF",
        role: {
          ko: "FastAPI 17개 엔드포인트와 일일 정적 스냅샷 내보내기를 통해 React 19 + Three.js 3D 하드웨어 데스크 및 5개 분석 뷰(개요·변동·예측·이상치·비교)를 구동합니다.",
          en: "Serves 17 FastAPI endpoints and daily static snapshots to a React 19 + Three.js 3D hardware desk and 5 analytical views.",
        },
        inputSpec: { ko: "SQLite 시세·예측·이상치 테이블 또는 일일 정적 스냅샷 JSON", en: "SQLite analytics tables or daily static snapshot JSON" },
        outputSpec: { ko: "인터랙티브 3D 데스크 씬 & 실시간 시세·적정가 대시보드", en: "Interactive 3D hardware desk scene & fair-price analytics dashboard" },
        tech: ["FastAPI (17 Endpoints)", "React 19", "Three.js (@react-three/fiber)", "Vitest (26 tests)"],
        steps: [
          { ko: "3D 데스크 위 부품(본체·모니터 등) 클릭 시 해당 카테고리 시세 패널 즉시 오픈", en: "Clicking 3D desk components opens corresponding category market panels" },
          { ko: "백엔드 오프라인 환경(GitHub Pages)에서도 매일 갱신되는 정적 스냅샷으로 100% 동작", en: "Seamlessly falls back to daily updated static snapshots on GitHub Pages" },
        ],
        errorHandling: { ko: "API 미응답 시 자동 정적 스냅샷 폴백 및 WebGL 미지원 시 2D 대시보드 유지", en: "Automatic static snapshot fallback and 2D dashboard continuity." },
        verification: { ko: "백엔드 pytest 196개 + 프론트엔드 vitest 26개(총 222개) 통과", en: "Verified with 196 pytest + 26 vitest tests (222 total)." },
        samplePayload: `{\n  "fastapi_endpoints": 17,\n  "backend_tests": 196,\n  "frontend_tests": 26,\n  "live_demo": "https://kwsahe.github.io/market-pulse/"\n}`,
      },
    ],
    edges: [
      { from: "mp-scraper", to: "mp-filter", kind: "primary", label: { ko: "57,690건 원시 스냅샷", en: "57,690 Raw Snapshots" } },
      { from: "mp-filter", to: "mp-ml", kind: "primary", label: { ko: "정제 시세 데이터셋", en: "Cleaned Hardware Prices" } },
      { from: "mp-filter", to: "mp-api-ui", kind: "branch", label: { ko: "이상치(Anomaly) 리포트 직행", en: "Anomaly Audit Feed" } },
      { from: "mp-ml", to: "mp-api-ui", kind: "primary", label: { ko: "적정가 · 80% 범위 · R² 0.78", en: "Fair Price & 80% Interval" } },
    ],
  },
  {
    id: "k-safety-law-rag",
    name: "k-safety-law-rag",
    title: {
      ko: "중대재해처벌법 · 산업안전보건법 Text+Table 이중 ChromaDB RAG & 출처 검증 파이프라인",
      en: "Construction Safety Law Dual Text+Table ChromaDB RAG & Citation Validation Pipeline",
    },
    badge: {
      ko: "Claude Opus 5.5 + Dual ChromaDB (bge-m3) · 78.8 → 90.0 Eval Score · 41 Tests",
      en: "Claude Opus 5.5 + Dual ChromaDB (bge-m3) · 78.8 → 90.0 Eval Score · 41 Tests",
    },
    summary: {
      ko: "사고 시나리오 사실관계를 구조화한 뒤 본문(500자)과 별표 표(행 단위) 이중 ChromaDB에서 검색된 근거 33~49건(최대 1.8만 자)을 Claude Opus 5.5 전용 경로로 주입하고 조문 머리 정규식으로 출처를 검증합니다.",
      en: "Structures accident scenarios, retrieves 33–49 statutory clauses (up to 18k chars) from dual Text+Table ChromaDB collections into Claude Opus 5.5, and validates citations via regex.",
    },
    simulationNotice: {
      ko: "[시뮬레이션 안내] 23명 사망 리튬전지 화재 시나리오 등에서 종합 점수 78.8점 → 90.0점(합격)을 달성한 6단계 법령 추론 및 출처 검증 흐름을 재현합니다.",
      en: "[Simulation Mode] Replays the 6-node legal RAG pipeline that raised benchmark accuracy from 78.8 to 90.0 on the 23-fatality lithium battery fire scenario.",
    },
    metrics: [...VERIFIED_PROJECT_METRICS["k-safety-law-rag"].labMetrics],
    nodes: [
      {
        id: "ks-scenario",
        label: { ko: "1. ScenarioProfile & 의도 분류", en: "1. ScenarioProfile & 7-Intent Router" },
        layer: "INPUT",
        position: [-4.8, 0.9, 0.2],
        color: "#6FA8FF",
        role: {
          ko: "입력된 사고 시나리오에서 사망자·부상자 수, 도급 구조, 작업 종류를 정형 JSON으로 파싱하고 7대 법률 의도(특별안전교육·방호장치·경영책임자 의무 등)로 분류합니다.",
          en: "Parses raw accident descriptions into structured JSON facts and classifies queries across 7 legal intent domains.",
        },
        inputSpec: { ko: "건설·산업현장 사고 시나리오 자연어 질의", en: "Natural-language construction/industrial accident scenario" },
        outputSpec: { ko: "구조화 사고 프로필 JSON + 질문 범위(scope) 및 법률 의도(intent)", en: "Structured incident JSON + question scope and legal intent" },
        tech: ["ScenarioProfileNode", "QuestionScopeNode", "IntentClassifierNode"],
        steps: [
          { ko: "사망자 수(1명 이상 중대재해 요건)·도급 단계·상시근로자 수 정형화", en: "Extracts fatalities, subcontracting tiers, and workforce thresholds" },
          { ko: "이전 대화 사고 사실이 현재 질문에 섞이지 않도록 세션 프로필 격리", en: "Isolates scenario state to prevent cross-turn hallucination" },
        ],
        errorHandling: { ko: "원문에 없는 사상자 수나 과실을 추측하지 않고 명시된 사실만 추출", en: "Extracts only explicitly stated facts without assuming unmentioned fault." },
        verification: { ko: "시나리오 파싱 및 의도 분류 회귀 테스트 검증", en: "Verified via scenario parsing and intent classification unit tests." },
        samplePayload: `{\n  "incident": "리튬전지 공장 화재 (사망 23명)",\n  "scope": "scenario_judgment",\n  "intent": ["serious_accident_punishment", "special_safety_education"]\n}`,
      },
      {
        id: "ks-dual-rag",
        label: { ko: "2. Text + Table 이중 ChromaDB 검색", en: "2. Dual Text + Table ChromaDB Retrieval" },
        layer: "AI_DATA",
        position: [-1.6, -1.0, 0.6],
        color: "#25C8BD",
        role: {
          ko: "pdfplumber로 분리 추출한 법령 본문(500자 청크)과 시행규칙 별표 표(행 단위)를 각각의 ChromaDB(bge-m3 임베딩)에서 독립 검색 후 가중 합산합니다.",
          en: "Retrieves independently from 500-char article text chunks and row-level appendix tables in dual bge-m3 ChromaDB collections.",
        },
        inputSpec: { ko: "구조화 사고 키워드 + 법률 의도 타깃 조항", en: "Structured incident keywords + target statutory intent" },
        outputSpec: { ko: "본문 조항 + 별표 표 행 결합 검색 근거 (33~49건)", en: "Combined statutory text & appendix table rows (33–49 clauses)" },
        tech: ["pdfplumber", "ChromaDB (Dual Collection)", "bge-m3 Embeddings"],
        steps: [
          { ko: "중대재해처벌법·산안법·근로기준법 본문 및 별표 5 특별교육 표 동시 검색", en: "Queries main statutory articles and Appendix 5 safety tables in parallel" },
          { ko: "사망 요건·별표 등 정형 영역은 결정형 Direct Route로 필수 조문 인용 보장", en: "Guarantees mandatory clause inclusion via deterministic Direct Route rules" },
        ],
        errorHandling: { ko: "표 구조 깨짐 없이 행 단위 메타데이터로 정확한 호·목 매칭", en: "Preserves row-level table metadata to prevent mangled appendix lookups." },
        verification: { ko: "별표 5 특별안전보건교육 및 양벌규정 검색 재현율 검증", en: "Validated recall on Appendix 5 safety training and dual-liability clauses." },
        samplePayload: `{\n  "text_chunks_retrieved": 28,\n  "table_rows_retrieved": 14,\n  "total_articles": 42,\n  "embedding_model": "BAAI/bge-m3"\n}`,
      },
      {
        id: "ks-claude-route",
        label: { ko: "3. 모델별 답변 경로 분리 (Claude Opus 5.5)", en: "3. Model-Routed Context (Claude Opus 5.5)" },
        layer: "ORCHESTRATOR",
        position: [1.7, 1.0, -0.4],
        color: "#AB83FF",
        role: {
          ko: "call_llm_blocking() 진입점에서 Colab 소형 모델 경로(2,200자 제한)와 분리해, rag/claude_chat.py 전용 파이프라인으로 검색 근거 33~49건(최대 1.8만 자) 전체를 주입합니다.",
          en: "Branches in call_llm_blocking() to rag/claude_chat.py, injecting all 33–49 retrieved clauses (up to 18k chars) into Claude Opus 5.5 without the legacy 2,200-char truncation.",
        },
        inputSpec: { ko: "검색 근거 33~49건(1.3만~1.8만 자) + 구조화 사고 프로필", en: "33–49 retrieved clauses (13k–18k chars) + structured incident profile" },
        outputSpec: { ko: "조문·항·호·벌칙 수위가 명시된 법률 검토 보고서", en: "Comprehensive legal opinion citing exact articles, paragraphs, and penalties" },
        tech: ["Claude Opus 5.5 (rag/claude_chat.py)", "EXAONE-4.0 / Qwen2.5-14B", "CacheGuardNode"],
        steps: [
          { ko: "기존 2,200자 절단으로 하위 조항·양벌규정이 잘리던 병목 제거", en: "Eliminates the 2,200-char bottleneck that previously clipped penalty clauses" },
          { ko: "동일 시나리오 재질의 시 해시 기반 CacheGuardNode로 응답 캐싱", en: "Caches identical scenario queries via hash-keyed CacheGuardNode" },
        ],
        errorHandling: { ko: "원격 API 상태 이상 시 관리자 품질 대시보드에 즉시 상태 코드 기록", en: "Logs provider health and fallback status in the admin quality dashboard." },
        verification: { ko: "종합 테스트셋 평균 78.8점(불합격) → 90.0점(합격) 향상 실측", en: "Improved full benchmark average from 78.8 (Fail) to 90.0 (Pass)." },
        samplePayload: `{\n  "route": "claude_rag (rag/claude_chat.py)",\n  "model": "claude-opus-5-5",\n  "injected_context_chars": 17840,\n  "eval_score": "90.0 (Sentencing 96, Report 95)"\n}`,
      },
      {
        id: "ks-citation-validator",
        label: { ko: "4. CitationValidator (조문 머리 정규식 검증)", en: "4. CitationValidator (Header Regex Gate)" },
        layer: "VALIDATION",
        position: [4.8, -0.7, 0.3],
        color: "#6FA8FF",
        role: {
          ko: "답변에 인용된 모든 조문·별표를 검색 컨텍스트의 실제 조문 머리(제N조() 정규식과 1:1 대조해 목차·타 조문 내 단순 언급으로 인한 오탐을 차단합니다.",
          en: "Cross-verifies every cited article against retrieved context using strict article-header regex (제N조() to block table-of-contents false positives.",
        },
        inputSpec: { ko: "LLM 생성 법률 답변 + 주입된 검색 근거 원문", en: "Generated legal response + injected source context" },
        outputSpec: { ko: "출처 검증 상태(PASS / WARN / FAIL) + 검증된 최종 답변", en: "Citation verification verdict (PASS / WARN / FAIL) + verified legal output" },
        tech: ["CitationValidatorNode", "Regex Article Header Matcher", "Pytest (41 tests)"],
        steps: [
          { ko: "답변에서 인용된 법령명·제N조·별표 번호 추출", en: "Extracts all cited statutes, article numbers, and appendix references" },
          { ko: "컨텍스트 내 실제 조문 제목(제N조(조문제목)) 존재 여부 정규식 대조", en: "Matches against actual article headers in the retrieved context" },
        ],
        errorHandling: { ko: "미검증 조항 인용 발견 시 WARN/FAIL 플래그 부착 및 관리자 대시보드 기록", en: "Flags unverified citations with WARN/FAIL in the admin telemetry console." },
        verification: { ko: "41개 단위·회귀 테스트 100% 통과", en: "100% pass rate across 41 unit and regression tests." },
        samplePayload: `{\n  "validation_status": "PASS",\n  "verified_citations": ["중대재해처벌법 제4조", "제6조", "산업안전보건법 제38조", "시행규칙 별표 5"],\n  "unverified_citations": [],\n  "regression_tests": "41 / 41 passed"\n}`,
      },
    ],
    edges: [
      { from: "ks-scenario", to: "ks-dual-rag", kind: "primary", label: { ko: "구조화 사실 & 7대 의도", en: "Structured Facts & Intent" } },
      { from: "ks-scenario", to: "ks-claude-route", kind: "branch", label: { ko: "정형 조문 Direct Route", en: "Deterministic Direct Route" } },
      { from: "ks-dual-rag", to: "ks-claude-route", kind: "primary", label: { ko: "33~49건 (최대 1.8만 자)", en: "33–49 Clauses (18k Chars)" } },
      { from: "ks-claude-route", to: "ks-citation-validator", kind: "primary", label: { ko: "법령 답변 초안", en: "Draft Legal Verdict" } },
    ],
  },
  {
    id: "link21-ai-chatbot",
    name: "LINK21 AI Chatbot (링키)",
    title: {
      ko: "질문 의도 분류 라우팅 · 실시간 개설 과정 주입 · 이중 프로바이더 SSE 스트리밍 아키텍처",
      en: "Intent Routing, Live Course Context Injection & Dual-Provider SSE Streaming Architecture",
    },
    badge: {
      ko: "Next.js + TypeScript + SSE + Supabase + OpenAI/Gemini · Live on link21premium.com",
      en: "Next.js + TypeScript + SSE + Supabase + OpenAI/Gemini · Live on link21premium.com",
    },
    summary: {
      ko: "LINK21 Premium 상용 플랫폼에 탑재된 0→1 자체 구축 AI 챗봇으로, 사용자 질문 의도를 먼저 분류해 Supabase 실시간 과정 데이터를 주입하고 SSE로 저지연 스트리밍합니다.",
      en: "0→1 production AI chatbot on LINK21 Premium that classifies visitor intent, injects live Supabase course schedules, and streams tokens via SSE with OpenAI/Gemini failover.",
    },
    simulationNotice: {
      ko: "[시뮬레이션 안내] link21premium.com 상용 위젯의 의도 분류 → 과정 컨텍스트 주입 → SSE 토큰 스트리밍 및 추천 과정 카드 렌더링 흐름을 재현합니다.",
      en: "[Simulation Mode] Simulates the intent classification, Supabase curriculum lookup, SSE token stream, and course card rendering pipeline.",
    },
    metrics: [...VERIFIED_PROJECT_METRICS["link21-ai-chatbot"].labMetrics],
    nodes: [
      {
        id: "chat-widget",
        label: { ko: "1. 플로팅 대화 위젯 & Rate Limit", en: "1. Floating Widget & Rate Limiter" },
        layer: "INPUT",
        position: [-4.6, 0.8, 0.2],
        color: "#6FA8FF",
        role: {
          ko: "사용자의 자연어 질문 또는 추천 질의(Suggestions) 클릭을 수집하고 세션 식별자 및 Rate Limit을 검사합니다.",
          en: "Captures user queries or suggestion clicks in the floating widget and enforces session rate limits.",
        },
        inputSpec: { ko: "사용자 질문 텍스트 + 세션 ID", en: "User query text + session ID" },
        outputSpec: { ko: "검증된 채팅 요청 페이로드", en: "Validated chat request payload" },
        tech: ["Next.js Client Widget", "Rate Limiter", "Session Guard"],
        steps: [
          { ko: "초기 진입 시 맞춤형 추천 질문 칩 노출", en: "Displays contextual starter suggestion chips" },
          { ko: "과도한 연속 호출 방지를 위한 IP/세션 단위 Rate Limit 확인", en: "Applies per-session rate limiting before LLM dispatch" },
        ],
        errorHandling: { ko: "요청 한도 초과 시 친절한 대기 안내 및 고객센터 바로가기 제공", en: "Shows friendly cooldown notice and direct support links when rate-limited." },
        verification: { ko: "상용 환경 데스크톱·모바일 브라우저 위젯 반응성 검증", en: "Verified across desktop and mobile browsers on link21premium.com." },
        samplePayload: `{\n  "session_id": "chat_98a1f",\n  "query": "비개발자도 들을 수 있는 생성형 AI 실무 과정 일정 알려줘",\n  "rate_limit": "OK"\n}`,
      },
      {
        id: "chat-intent",
        label: { ko: "2. 의도 라우터 & 과정 데이터 주입", en: "2. Intent Router & Supabase Context" },
        layer: "ORCHESTRATOR",
        position: [-1.4, -0.9, 0.5],
        color: "#25C8BD",
        role: {
          ko: "질문 의도(과정 추천 / 월별 일정 / 교육비 환급 규정 / 일반 문의)를 판별해 필요한 Supabase 실시간 개설 과정 및 규정 데이터만 프롬프트에 동적 주입합니다.",
          en: "Classifies query intent and dynamically injects matching live course schedules and subsidy rules from Supabase.",
        },
        inputSpec: { ko: "검증된 사용자 질의", en: "Validated user query" },
        outputSpec: { ko: "의도 태그 + 실시간 개설 과정·규정 근거가 결합된 시스템 프롬프트", en: "Intent tag + grounded system prompt with live course catalog records" },
        tech: ["Intent Router", "Supabase PostgreSQL", "Dynamic Prompt Builder"],
        steps: [
          { ko: "질문 키워드·문맥 기반 의도 분류", en: "Classifies intent into Course Recommendation, Schedule, Subsidy, or FAQ" },
          { ko: "현재 모집 중인 실제 과정 일정·상세 링크만 조회해 환각(Hallucination) 원천 차단", en: "Fetches only active courses to prevent hallucinated schedules" },
        ],
        errorHandling: { ko: "매칭되는 개설 과정이 없을 때 임의 과정을 지어내지 않고 맞춤 기업 출강 문의로 안내", en: "Guides users to custom corporate inquiry when no scheduled course matches." },
        verification: { ko: "의도별 프롬프트 라우팅 및 비개설 과정 환각 차단 테스트 완료", en: "Verified intent routing accuracy and zero hallucinated course links." },
        samplePayload: `{\n  "intent": "course_schedule_recommendation",\n  "matched_courses": 3,\n  "context_source": "supabase_live_catalog"\n}`,
      },
      {
        id: "chat-sse",
        label: { ko: "3. 이중 프로바이더 SSE 스트리밍 & 카드 렌더링", en: "3. Dual-Provider SSE & Course Card UI" },
        layer: "OUTPUT",
        position: [2.8, 0.7, -0.2],
        color: "#AB83FF",
        role: {
          ko: "OpenAI / Gemini 프로바이더 자동 Fallback으로 답변을 생성하고, Server-Sent Events(SSE)로 실시간 스트리밍하며 추천 과정 멘션을 클릭 가능한 카드로 렌더링합니다.",
          en: "Streams responses via SSE with automatic OpenAI/Gemini failover and renders mentioned courses as interactive enrollment cards.",
        },
        inputSpec: { ko: "동적 컨텍스트가 주입된 프롬프트", en: "Context-grounded prompt" },
        outputSpec: { ko: "SSE 토큰 스트림 + 클릭 가능한 과정 추천 카드 + Supabase 대화 로그", en: "SSE token stream + interactive course cards + Supabase session log" },
        tech: ["Server-Sent Events (SSE)", "OpenAI API", "Gemini API", "Markdown & Card Parser"],
        steps: [
          { ko: "1차 LLM 프로바이더 지연·오류 시 즉시 대체 프로바이더(Gemini ⇄ OpenAI)로 전환", en: "Automatically fails over between OpenAI and Gemini on upstream errors" },
          { ko: "스트리밍 완료 후 추천 과정 카드를 대화창 하단에 렌더링해 수강신청 페이지로 즉시 연결", en: "Renders interactive course cards linking directly to enrollment pages" },
        ],
        errorHandling: { ko: "스트림 중단 시 부분 응답 보존 및 재시도 버튼 제공", en: "Preserves partial responses and offers 1-click retry if network drops." },
        verification: { ko: "link21premium.com 상용 배포 및 실시간 스트리밍 운영 검증", en: "Verified in live production on link21premium.com." },
        samplePayload: `{\n  "stream_protocol": "text/event-stream (SSE)",\n  "provider_failover": "armed (OpenAI ⇄ Gemini)",\n  "rendered_course_cards": 2\n}`,
      },
    ],
    edges: [
      { from: "chat-widget", to: "chat-intent", kind: "primary", label: { ko: "검증 질의", en: "Validated Query" } },
      { from: "chat-intent", to: "chat-sse", kind: "primary", label: { ko: "실시간 과정 컨텍스트 프롬프트", en: "Grounded Course Prompt" } },
    ],
  },
];

export function getLabSystemById(id: string): LabSystem {
  return LAB_SYSTEMS.find((s) => s.id === id) ?? LAB_SYSTEMS[0];
}
