# PHASE 1 — SOURCE AUDIT (`docs/01_SOURCE_AUDIT.md`)

## 1. 저장소 기본 정보 (Repository Baseline)

- **원격 저장소**: `https://github.com/kwsahe/kwsahe`
- **기존 라이브 URL**: `https://kwsahe.github.io/kwsahe/`
- **분석 기준 브랜치 및 커밋**: `origin/main` (`1d21ad6` — `fix(jarvis): 게시 판정 오탐 수정을 반영해 스크린샷과 한계 문장을 고친다`)
- **개발 격리 환경**:
  - 원본 `main` 워크트리(`C:/Users/sangh/Desktop/Gram/Victus/Code/Portfolio`)는 수정하지 않고 보존
  - 별도 Git worktree(`C:/Users/sangh/orca/workspaces/Portfolio/soapfish`)에서 신규 브랜치 `feat/portfolio-3d-reborn` 생성 후 개발 진행
- **기존 파일 구성**:
  - `index.html` (3,651줄, 한국어 `.lang-ko` / 영어 `.lang-en` 이중 언어 마크업)
  - `styles.css` (다크/라이트 테마 CSS 변수 및 반응형 레이아웃)
  - `script.js` (언어 토글, 다크/라이트 테마 토글, 프로젝트 카테고리 필터, 스크린샷 캐러셀, K-Safety 노드 플로우 위젯)
  - `README.md` (프로필 요약, 기술 스택 배지, 주요 프로젝트 표)
  - `assets/resume-kwon-sangheon.pdf`, `assets/data-ai-portfolio-visual.png`
  - `png/` (프로필 사진 `png/profile-photo.png`, 기술 로고 `png/logos/*.svg`, 14개 프로젝트 스크린샷 총 200개 파일)
  - `.nojekyll`, `favicon.svg`

---

## 2. 프로필 · 경력 · 학력 · 자격증 검증 데이터

### 2.1 기본 프로필
- **이름**: 권상헌 (Sangheon Kwon)
- **핵심 직무**: AI Service Backend Engineer (보조 직무: AI Engineer / Full-stack Developer)
- **현재 소속**: 주식회사 링크21 (Link21, `2026.08 ~ 재직 중`)
- **생년월일**: `2001. 02. 23`
- **연락처 / 이메일**: `010-9280-9415` / `kwhoney223@gmail.com`
- **GitHub**: `https://github.com/kwsahe`
- **병역**: 육군 병장 만기전역 (`2021.11 ~ 2023.05`)
- **이력서 PDF**: `/assets/resume-kwon-sangheon.pdf`

### 2.2 경력 (Experience)
1. **링크21 (Link21)** (`2026.08 – 현재 · 재직 중`) — *AI 엔지니어 · 풀스택 개발자*
   - `LINK21 Premium` 기업교육 웹플랫폼 제작·운영 및 신규 페이지, UI/UX, 신청 기능, 관리자 시스템 개발·개선
   - `LINK21 AI Hub`(`aihub.link21premium.com`) 디지털 명함·NFC 메탈 명함·AI 교육 통합 허브 기획·인프라·검수·배포 전담 (정식 운영 중)
   - 서비스 내 AI 챗봇(`링키`) 0→1 초기 설계·구현·실제 운영·고도화 직접 수행
   - 나라장터·기업마당 공고 수집부터 자격 판정·요구사항 정리·제안서 초안·제출 전 점검까지 이어지는 `BidPilot AI` 개발 (판 1.0.1)
   - 과정 모집 홍보를 AI 직원 19명이 나눠 만들고 게시 전 사실·과장·분량을 검사하는 `LINK21 AI JARVIS OFFICE` 개발·Cloudflare 운영 배포
   - Next.js / React / TypeScript 및 FastAPI 기반 웹·AI 서비스 개발 및 사내 AI Agent·업무자동화 구축
2. **데이타트렌드 (Data Trend)** (`2023.07 – 2023.09 · 3개월`) — *사원 · AI사업전략*
   - AI 바우처 사업수행계획서 작성 및 관련 자료 조사
   - AI 도입 기업 대상 솔루션 제안 자료 작성
   - 사업 현황 분석 및 보고서 작성

### 2.3 교육 (Education)
1. **서강대학교 (Sogang University)** (`2020.03 – 2026.02`) — 미디어공학과 학사 (GPA `3.53 / 4.5`)
2. **매력일자리 개발자 과정** (`2026.05 – 2026.06 · 수료`) — 최신 AI 기술 트렌드, 데이터 처리, RAG, Python 백엔드 및 데이터 파이프라인 구축
3. **서울대학교 데이터사이언스 부트캠프** (`2026.01 · 수료`) — 데이터사이언스를 위한 선형대수학·확률과 통계, 머신러닝 기초 이론 및 실습

### 2.4 자격증 (Certificates)
1. **Azure AI Fundamentals (AI-901)** — Microsoft (`2026.08`)
2. **빅데이터분석기사 (Big Data Analytics Engineer)** — 한국데이터산업진흥원 (`2025.12`)
3. **AI-POT (AI 프롬프트활용능력) 2급** — 한국생산성본부 (`2024.11`)
4. **네트워크관리사 2급** — 한국정보통신자격협회 (`2024.10`)

---

## 3. 전체 프로젝트 전수 조사 (총 14개 프로젝트)

기존 저장소(`index.html` 및 `README.md`)를 전수 조사한 결과, 총 **14개 프로젝트**가 등록되어 있으며 각 프로젝트의 상태, 공개 범위, 검증 수치, 대표 스크린샷은 아래와 같습니다.

| # | Slug (`id`) | 프로젝트명 | 상태 분류 | 카테고리 | 공개 범위 / 외부 링크 | 주요 기술 스택 | 핵심 검증 수치 및 근거 |
|---|---|---|---|---|---|---|---|
| 1 | `link21-premium` | **LINK21 Premium** | `Live Production` | `Production` / `Web` | Private Repo · [실서비스](https://www.link21premium.com/) | Next.js 16, React 19, TypeScript, Supabase, Tailwind CSS, Vercel | 기업 고객 대상 상용 운영 중, 과정 탐색·월별 일정 필터링·수강신청·관리자 XLSX 내보내기 |
| 2 | `link21-ai-hub` | **LINK21 AI Hub** | `Live Production` | `Production` / `Web` | Private Repo · [실서비스](https://aihub.link21premium.com) | Next.js 16, React 19, TypeScript, Supabase, Zod, OpenCV, Tailwind CSS, Vercel | 정식 운영 중, 디지털 명함·NFC 메탈 명함 실시간 원근 각인 미리보기·OpenCV 개인정보 제거, AI 치트키 200(무료 20+리드 180), Google Sheets 동기화, **Vitest 515개 테스트 · DB 마이그레이션 9개** |
| 3 | `link21-ai-chatbot` | **LINK21 AI Chatbot (링키)** | `Live Production` | `Production` / `AI & RAG` | Private Repo · [실서비스 탑재](https://www.link21premium.com/) | Next.js, TypeScript, Gemini API, OpenAI API, SSE, Supabase, Tailwind CSS | 0→1 자체 구축 상용 챗봇, 질문 의도 라우팅(Intent Routing), SSE 실시간 토큰 스트리밍, Gemini/OpenAI Fallback 및 Rate Limiting |
| 4 | `link21-ai-jarvis-office` | **LINK21 AI JARVIS OFFICE** | `Internal Tool` | `Internal AI` / `AI & RAG` | Private Enterprise (사내 운영 도구) | React 19, TypeScript, vinext, Cloudflare Workers, Cloudflare D1, Drizzle ORM, OpenAI Responses API (`store: false`), Zod | AI 직원 **19명(전략실 8·제작실 11)** 단일·동시·체인 실행(실측 **279초**), 점수와 분리된 **게시 가능 판정(Publish Gate)**, 실제 행사 **19건 중 18건 게시 가능**(오탐 2건 재현 테스트와 함께 수정·운영 반영), 대화형 '말로 부탁하기', 웹자보·카드뉴스 PNG 렌더링 및 9개 채널 패키지, **117 커밋 · 단위 873 · 통합 252 · 화면 렌더 19개 테스트** |
| 5 | `link21-bidpilot-ai` | **LINK21 BidPilot AI** | `Internal Tool` | `Internal AI` / `AI & RAG` | Private Enterprise (`v1.0.1` 사내 업무 도구) | Python, FastAPI, Next.js 16, React 19, Three.js, Claude Code CLI, Codex CLI, G2B OpenAPI, SQLite | 나라장터·기업마당 공고 수집, 규칙 엔진 자격 판정(**지원사업 기준 답안 188/191 일치**), 요구사항 정리표 추출(**Precision 0.795, Recall 0.843, 쪽 번호 일치 100%**), 제안서 초안 및 제출 전 누락 점검(Audit), **571 커밋 · 자동 시험 2,659개 · 검수→수정 36회** |
| 6 | `tri-agent-control` | **tri-agent-control** | `Research / Experimental` | `Automation` / `AI & RAG` | Public Repo · [GitHub](https://github.com/kwsahe/tri-agent-control) | Python, Threading & Subprocess, git worktree, Claude Code CLI, Antigravity CLI, Codex CLI | 3개 코딩 CLI 역할 고정(`Claude 구현 → Antigravity 테스트 → 자동 검증 → Codex 검토`), Git 저장소 세션별 `git worktree` 격리, 회의실 예약 앱 6기능 실사용 검증(**전체 커밋 12개 중 파이프라인 사이클 커밋 11개 · 테스트 106개 · 결함 5건 검출[동시성 3건 포함]**), 평가 하니스 **14과제**, **회귀 테스트 384개** |
| 7 | `k-safety-law-rag` | **k-safety-law-rag** | `Prototype` | `AI / RAG` | Public Repo · [GitHub](https://github.com/kwsahe/k-safety-law-rag) | Python, Claude Opus 5.5, ChromaDB, bge-m3, EXAONE-4.0-32B, Qwen2.5-14B, FastAPI, SQLite, Pytest | 중대재해처벌법·산업안전보건법 **Text+Table 이중 ChromaDB RAG**, 모델별 답변 경로 분리(`rag/claude_chat.py` 검색 근거 **33~49건, 최대 1.8만 자** 주입), 리튬전지 화재 종합 테스트셋 **78.8점(불합격) → 90.0점(합격)** (처벌 수위 96점·보고서 95점), 출처 정규식 검증기 및 **41개 회귀 테스트 100% 통과** |
| 8 | `market-pulse` | **Market Pulse** | `Live Production` | `Data & Analytics` | Public Repo · [GitHub](https://github.com/kwsahe/market-pulse) · [Live Demo](https://kwsahe.github.io/market-pulse/) | React 19, TypeScript, Three.js, FastAPI, Python, SQLite, Scikit-learn, GitHub Actions | 다나와 **9개 카테고리 약 5.8만 건 스냅샷(57,690건)** 매일 자동 수집, 미끼가·비정상가·오염 수집 필터, 로그 가격 ML 적정가 예측(**R² 0.78, 80% 범위 적중률 81.1%, CPU 중앙 오차 28.0%→17.5% 개선**), FastAPI **17개 API**, Three.js 3D 데스크, **pytest 196개 + vitest 26개(총 222개 테스트)** |
| 9 | `business-card-auto` | **business-card-auto** | `Live Production` | `Production` / `Web` | Private Repo · [실서비스](https://business-card-auto.vercel.app) | Next.js 14 App Router, React 18, TypeScript, HTML5 Canvas, vCard 3.0 QR, Tailwind CSS, Vercel | 프라이버시 우선 무서버(Zero-Server) 브라우저 즉시 렌더링(60fps Canvas/SVG), vCard 3.0 동적 QR 생성, 모바일 인앱 브라우저 저장 호환 |
| 10 | `construction-accident-vl-agent` | **construction-accident-vl-agent** | `Research / Experimental` | `AI / RAG` / `Vision` | Public Repo · [GitHub](https://github.com/kwsahe/construction-accident-vl-agent) | Python, OpenCV, Qwen2.5-VL, Colab + ngrok, JSON Schema, Pydantic, FastAPI | 건설현장 CCTV 모션 탐지(`--auto-moment`) 기반 **Contact Sheet 프레임 결합**, 관찰 사실과 추론 분리 프롬프트 가드레일, SPilot **ERD 표준 규격 JSON payload** 자동 변환 |
| 11 | `O2O-demand-forecasting-solution` | **O2O-demand-forecasting-solution** | `Prototype` | `Data & Analytics` | Public Repo · [GitHub](https://github.com/kwsahe/O2O-demand-forecasting-solution) | Python, Flask, SQLite, SARIMA, Prophet, LightGBM, Naver Maps API, Ollama | 국토교통부 실거래가 등 **공공 API 5종** 연동, **102개 시군구** 7개 지표 정규화 가중합산 인테리어 수요점수 산출, SARIMA·Prophet·LightGBM 시계열 비교 및 네이버 지도 대시보드 |
| 12 | `ecommerce-data-analysis-practice` | **ecommerce-data-analysis-practice** | `Research / Experimental` | `Data & Analytics` | Public Repo · [GitHub](https://github.com/kwsahe/ecommerce-data-analysis-practice) | Python, Pandas, Scikit-learn, XGBoost, SHAP, Prophet, Streamlit | 이커머스 고객 행동 로그 기반 **RFM 세그멘테이션**, 이탈 예측 모델링(XGBoost) 및 **SHAP 설명 가능한 AI(XAI)** 기여도 시각화, Prophet 매출 시계열 예측 대시보드 |
| 13 | `english-word-streamlit` | **english-word-streamlit** | `Live Production` | `Automation` / `Web` | Public Repo · [GitHub](https://github.com/kwsahe/english-word-streamlit) · [실배포](https://honeyenglish.streamlit.app) | Python, Streamlit, Google Gemini API, Kivy, Pandas | Google Gemini API 연동 맞춤형 영단어장 및 **토익(TOEIC) 파트별 빈칸 추론 문제·해설 실시간 생성**, 오답 노트 자동화 |
| 14 | `Artesia` | **Artesia** | `Archived` | `Experimental` / `Game` | Public Repo · [GitHub](https://github.com/kwsahe/Artesia) | C#, Unity 2D | Unity 2D 로그라이크 턴제 던전 RPG, **팀장(PM) 및 시스템 기획·전투 밸런싱 총괄**, 명확한 스코프 관리로 정시 완성 |

---

## 4. 비공개(Private) 프로젝트 보안 및 공개 원칙 점검

1. **비공개 저장소 링크 미노출**:
   - `link21-premium`, `link21-ai-hub`, `link21-ai-chatbot`, `link21-bidpilot-ai`, `link21-ai-jarvis-office`, `business-card-auto`는 사내 또는 비공개 저장소이므로 GitHub 소스코드 URL을 노출하지 않고, 공개 허용된 실서비스 URL(`link21premium.com`, `aihub.link21premium.com`, `business-card-auto.vercel.app`)과 포트폴리오 내 검증된 스크린샷·아키텍처 설명만 제공합니다.
2. **민감 정보 보호**:
   - API 키, 사내 내부 엔드포인트, 고객 개인정보는 일절 포함하지 않으며 기존 `png/` 내 비식별화·검수 완료된 스크린샷만 사용합니다.
3. **정직한 엔지니어링 지표**:
   - 모든 테스트 수, 정확도, 커밋 수, 응답 시간은 기존 저장소(`1d21ad6`)에서 검증된 실제 수치만 표기합니다.
