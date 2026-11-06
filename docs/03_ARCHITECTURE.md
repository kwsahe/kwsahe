# PHASE 3 & 4 — SYSTEM ARCHITECTURE (`docs/03_ARCHITECTURE.md`)

## 1. 기술 스택 및 버전 명세

| 계층 | 채택 기술 | 버전 | 역할 |
|---|---|---|---|
| **Application Framework** | Next.js (App Router, `output: "export"`) | `16.4.5` | 정적 사이트 생성(SSG), `/kwsahe` basePath 라우팅 |
| **UI Library** | React / React DOM | `19.3.1` | 컴포넌트 렌더링 및 클라이언트 상태 전환 |
| **Language** | TypeScript | `5.8.x` | 엄격한 데이터·컴포넌트 타입 안전성 보장 |
| **3D / WebGL** | Three.js + `@react-three/fiber` + `@react-three/drei` | `0.187.0` / `9.8.2` / `10.7.9` | Hero 3D AI Core 및 Architecture Lab 3D 노드 토폴로지 |
| **Animation** | GSAP + ScrollTrigger | `3.15.1` | 스크롤 기반 섹션 진입 및 카메라 반응 |
| **Styling** | Tailwind CSS v4 + CSS Variables | `4.3.4` | 다크(`#070B14` 기본) / 라이트(`#F8FAFC`) 테마 토큰 시스템 |
| **State Management** | Zustand | `5.0.16` | 한국어/영어(`ko`/`en`), 다크/라이트 테마, 3D 모션 축소 전역 상태 |
| **Testing** | Vitest + Playwright | `5.1.0` / `1.65.0` | 데이터·에셋 무결성 단위 테스트 및 실제 브라우저 E2E 검증 |

---

## 2. 라우트 구조 (6개 핵심 페이지 + 14개 정적 Case Study)

Next.js `basePath: "/kwsahe"`, `trailingSlash: true`, `output: "export"` 설정을 통해 GitHub Pages(`https://kwsahe.github.io/kwsahe/`) 하위 경로와 로컬 개발 서버에서 동일하게 작동합니다.

1. **`/` (`src/app/page.tsx`) — HOME (NEXUS CORE)**
   - Hero + 실시간 WebGL 3D AI Core (`NexusCoreScene`)
   - Top 4 Flagship 프로젝트 + Featured Engineering Work (2종)
   - Architecture Lab 6종 프리뷰 + 4대 핵심 역량 + 경력 요약 및 Contact CTA
2. **`/work` (`src/app/work/page.tsx`) — PROJECTS ATLAS (SYSTEM ATLAS)**
   - 14개 전체 프로젝트 검색, 카테고리 필터(7종), 운영 상태 필터(5종), 기술 스택 필터, 정렬 기능
3. **`/work/[slug]` (`src/app/work/[slug]/page.tsx`) — PROJECT CASE STUDY**
   - `generateStaticParams()`로 14개 프로젝트 개별 상세 페이지 정적 생성
   - `Overview`, `Problem`, `Role`, `Architecture`, `Implementation`, `Verification`, `Challenges`, `Limitations`, `Links` 9개 필수 섹션 및 스크린샷 갤러리 제공
4. **`/lab` (`src/app/lab/page.tsx`) — ARCHITECTURE LAB (OPS COMMAND)**
   - 6개 핵심 시스템(`JARVIS`, `BidPilot`, `tri-agent-control`, `Market Pulse`, `k-safety-law-rag`, `AI Chatbot`)의 3D WebGL / 2D SVG 노드 그래프 및 데이터 흐름 패킷 시뮬레이터
5. **`/about` (`src/app/about/page.tsx`) — ABOUT & TECH MATRIX**
   - 프로필, 경력 타임라인, 학력·교육, 자격증 4종, 실제 프로젝트와 양방향 연결된 기술 스택 그룹(Backend / AI / Frontend / Infrastructure)
6. **`/contact` (`src/app/contact/page.tsx`) — CONTACT & VERIFIED LINKS**
   - 이메일, GitHub, 연락처, 이력서 PDF 다운로드 및 실서비스/저장소 바로가기 디렉터리
