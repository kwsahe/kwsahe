# PHASE 5 — 3D INTERACTIONS & FALLBACK DESIGN (`docs/04_3D_INTERACTIONS.md`)

## 1. Hero 3D AI Core (`src/components/three/NexusCoreScene.tsx`)

- **기하 구조 (Geometry Composition)**:
  - **내부 발광 구체 (Inner Emissive Sphere)**: `sphereGeometry`에 Electric Blue 발광 재질을 적용하고 호흡 주기에 맞춘 미세 스케일 펄싱 구현
  - **내부 금속 다면체 (Inner Metallic Polyhedron)**: `icosahedronGeometry(0.98, 1)` 기반 Deep Navy 금속 코어
  - **외부 금속 격자 코어 (Outer Metallic Lattice)**: `icosahedronGeometry(1.28, 2)` 와이어프레임 격자 구조
  - **3중 궤도 링 (Triple Orbital Rings)**: Electric Blue(`#6FA8FF`), Violet(`#AB83FF`), Cyan(`#25C8BD`) 색상의 3축 `torusGeometry` 궤도 링
  - **6개 데이터 위성 노드 (Orbiting Satellite Nodes)**: `JARVIS OFFICE`, `LINK21 AI HUB`, `BidPilot AI`, `tri-agent-control`, `Market Pulse`, `k-safety-law-rag` 위성 노드가 중심 코어와 3D 에너지 라인(`Line`)으로 연결되며, 호버/클릭 시 실시간 검증 지표를 HUD에 표시
- **인터랙션 & 성능 최적화**:
  - 프레임 속도(`delta`) 기반 회전으로 주사율(60Hz/144Hz)과 무관하게 일정한 속도 유지
  - `OrbitControls` 드래그 회전 지원 (`enableZoom={false}`로 페이지 스크롤 가로채기 원천 방지)
  - 스크롤 위치(`window.scrollY`) 및 마우스 포인터에 반응하는 부드러운 카메라/그룹 각도 보간
  - `IntersectionObserver`로 뷰포트 밖으로 벗어나면 Canvas 마운트/렌더링을 중단해 GPU 자원 절약
  - `reducedMotion` 활성화 시 `frameloop="demand"`로 전환하여 자동 회전 즉시 정지
  - WebGL 미지원 환경 감지 또는 에러 발생 시 `WebGLErrorBoundary`를 통해 SVG 정적 코어 다이어그램으로 자동 대체

---

## 2. Architecture Lab 3D / 2D Explorer (`src/components/three/ArchitectureLabScene.tsx`)

- **6개 검증 시스템별 고유 노드 토폴로지**:
  1. `link21-ai-jarvis-office` (6 Nodes): Ask Jarvis → Workers API & 멱등성 → 전략실 8명 & D1 요약 → 제작실 11명 → Publish Gate → PNG & 9채널 패키지
  2. `link21-bidpilot-ai` (5 Nodes): G2B·기업마당 수집기 → 쪽 보존 파서 → 규칙 엔진 자격 판정(188/191) → 요구사항 표·초안 생성 → 제출 전 감사(Auditor)
  3. `tri-agent-control` (5 Nodes): 읽기 전용 계획 & git worktree → Claude 구현 → Antigravity 테스트(테스트 파일 한정) → 자동 검증(pytest/build) → Codex 읽기 전용 검토 & 선별 커밋
  4. `market-pulse` (4 Nodes): 9개 카테고리 일일 수집(57,690건) → 미끼가·오염 필터 → 스펙 추출 & 로그 가격 ML(R² 0.78) → FastAPI 17개 API & Three.js 3D 데스크
  5. `k-safety-law-rag` (4 Nodes): ScenarioProfile & 7대 의도 분류 → Text+Table 이중 ChromaDB 검색 → Claude Opus 5.5 전용 경로(최대 1.8만 자) → 조문 머리 정규식 출처 검증기
  6. `link21-ai-chatbot` (3 Nodes): 플로팅 위젯 & Rate Limit → 의도 라우터 & Supabase 실시간 과정 주입 → 이중 프로바이더 SSE 스트리밍 & 과정 카드 렌더링
- **데이터 흐름 패킷 시뮬레이션**:
  - `PacketTraveler` 구체가 현재 선택된 노드에서 다음 노드로 3D 간선을 따라 이동하며, 도착 시 자동으로 다음 단계 노드를 활성화하고 우측 텔레메트리 인스펙터 패널을 갱신합니다.
  - 재생(`Play`), 일시정지(`Pause`), 단계 이동(`Step`), 초기화(`Reset`), 카메라 노드 확대(`Cam: Node Focus`), 전체 화면(`Fullscreen`), **2D SVG / 3D WebGL 즉시 전환**을 모두 지원합니다.
