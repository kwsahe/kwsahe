# PHASE 5 — PROJECT CONTENT MAPPING (`05_PROJECT_CONTENT.md`)

## 1. Content Integrity & Source Parity Policy

All 14 projects in `src/data/portfolio-data.ts` are mapped 1:1 from `origin/main` (`1d21ad6`) and the verified screenshot repository (`public/png/` and `public/assets/`).

- **Bilingual Parity**: Every project includes complete Korean (`ko`) and English (`en`) content for title, subtitle, summary, problem statement, my role, architecture overview, implementation details, verification metrics, key challenges, limitations, and screenshot captions.
- **No Unverified Claims**: Zero fabricated metrics, fake user counts, or unverified test scores were introduced. Internal/Private projects explicitly display their public exposure policies and reasons.

---

## 2. Complete 14-Project Case Study Inventory

| # | Slug | Name | Category | Status | Featured | Screenshots | Lab Scene |
|---|---|---|---|---|---|---|---|
| 1 | `link21-ai-jarvis-office` | LINK21 AI JARVIS OFFICE | AI Agent | Production | Flagship (Rank 1) | 7 slides (`png/jarvis/01..07.png`) | Yes (`link21-ai-jarvis-office`) |
| 2 | `link21-bidpilot-ai` | BidPilot AI | AI Agent | Internal | Flagship (Rank 2) | 7 slides (`png/bidpilot-ai/01..07.png`) | Yes (`link21-bidpilot-ai`) |
| 3 | `tri-agent-control` | tri-agent-control | AI Agent | Active | Flagship (Rank 3) | 3 slides (`png/tri-agent-control/01..03.png`) | Yes (`tri-agent-control`) |
| 4 | `market-pulse` | Market Pulse | Data / ML | Production | Flagship (Rank 4) | 7 slides (`png/market-pulse/01..07.png`) | Yes (`market-pulse`) |
| 5 | `k-safety-law-rag` | K-Safety Law Agent (중대재해 AI 법률 자문) | RAG / LLM | Verified | Secondary (Rank 5) | 5 slides (`png/k-safety/01..05.png`) | Yes (`k-safety-law-rag`) |
| 6 | `link21-ai-hub` | LINK21 AI HUB (디지털 명함 · NFC 플랫폼) | Enterprise Web | Production | Secondary (Rank 6) | 5 slides (`png/ai-hub/01..05.png`) | — |
| 7 | `link21-ai-chatbot` | LINK21 AI 챗봇 (링키 · Linky) | RAG / LLM | Production | Secondary (Rank 7) | 4 slides (`png/ai-chatbot/01..04.png`) | Yes (`link21-ai-chatbot`) |
| 8 | `link21-premium` | LINK21 기업 홈페이지 리뉴얼 | Enterprise Web | Production | Secondary (Rank 8) | 4 slides (`png/link21-homepage/01..04.png`) | — |
| 9 | `business-card-auto` | Business Card Auto (AI 명함 자동 시안 생성기) | Automation | Active | Archive (Rank 9) | 5 slides (`png/business-card/01..05.png`) | — |
| 10 | `construction-accident-vl-agent` | 건설 재해 예방 멀티모달 AI 에이전트 | Data / ML | Research | Archive (Rank 10) | 1 slide (`assets/projects/construction-vl.svg`) | — |
| 11 | `O2O-demand-forecasting-solution` | O2O 방문자 수요 예측 · 다이나믹 프라이싱 | Data / ML | Verified | Archive (Rank 11) | 3 slides (`png/o2o/01..03.png`) | — |
| 12 | `ecommerce-data-analysis-practice` | E-Commerce 고객 이탈 예측 · 장바구니 분석 | Data / ML | Verified | Archive (Rank 12) | 1 slide (`assets/projects/ecommerce-analysis.svg`) | — |
| 13 | `english-word-streamlit` | AI 영어 단어 학습 웹앱 | Automation | Active | Archive (Rank 13) | 1 slide (`assets/projects/english-streamlit.svg`) | — |
| 14 | `Artesia` | Artesia (유니티 2D 액션 플랫포머 게임) | Game | Archive | Archive (Rank 14) | 2 slides (`png/artesia/01..02.png`) | — |

---

## 3. Case Study 9-Section Template Structure

Each `/work/[slug]` route statically renders 9 structured engineering sections via `src/components/work/CaseStudyView.tsx`:

1. **Overview & Key Metrics**: Role, period, status badge, public exposure policy, and verified KPI cards.
2. **Visual Evidence Gallery**: Interactive screenshot carousel with lightbox zoom (`ScreenshotCarousel.tsx`).
3. **01. Problem Definition**: Concrete operational or engineering bottleneck addressed.
4. **02. My Role & Ownership**: Specific architectural and implementation scope owned by Sangheon Kwon.
5. **03. System Architecture**: Layer-by-layer breakdown (` Layer ` → ` Tech Stack ` → ` Responsibility `) plus direct deep-link into `/lab?system=[slug]` when an interactive 3D/2D topology exists.
6. **04. Key Implementation**: Concrete engineering features and code-level mechanisms implemented.
7. **05. Verification & Metrics**: Automated tests, CI suites, regression evaluations, and benchmark outcomes.
8. **06. Technical Challenges & Solutions**: Real bugs, false positives, latency bottlenecks, or multi-agent conflicts encountered and resolved.
9. **07. Limitations & Security Policy**: Explicit scope boundaries, internal data protections, and future engineering roadmap.
