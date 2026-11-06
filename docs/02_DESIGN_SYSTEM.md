# PHASE 2 — DESIGN SYSTEM (`docs/02_DESIGN_SYSTEM.md`)

## 1. 통합 디자인 아키텍처: NEXUS CORE × SYSTEM ATLAS × OPS COMMAND

PORTFOLIO 3D REBORN v3.0은 AI 서비스 백엔드 엔지니어로서의 설계·구현·검증·운영 역량을 시각적으로 증명하기 위해 세 가지 디자인 언어를 단일 디자인 토큰 체계 아래 유기적으로 결합합니다.

| 디자인 영역 | 적용 페이지 / 섹션 | 핵심 시각 특징 |
|---|---|---|
| **NEXUS CORE** | `Home (/)` Hero, 3D AI Core, 섹션 헤더 도입부 | Deep Navy(`#070B14`), 금속성 격자 구면 코어, 내부 발광 구체, 다중 궤도 링, Electric Blue(`#6FA8FF`) & Violet(`#AB83FF`) 시네마틱 조명 |
| **SYSTEM ATLAS** | `Projects (/work)`, `Case Study (/work/[slug])`, `About (/about)`, `Contact (/contact)` | 높은 가독성의 타이포그래피, 정돈된 벤토/아틀라스 그리드, 명확한 상태 배지(`Live Production`, `Internal Tool`, `Prototype`, `Research / Experimental`, `Archived`), 문서형 아키텍처 명세 패널 |
| **OPS COMMAND** | `Architecture Lab (/lab)`, Home 아키텍처 프리뷰, Case Study 파이프라인 뷰 | 시스템 관제실 콘솔 UI, 3D/2D 노드 토폴로지, 실시간 데이터 패킷 시뮬레이션(재생·일시정지·초기화), 노드별 입출력·검증·오류 처리 텔레메트리 인스펙터 |

---

## 2. 컬러 토큰 (Color Tokens)

### 2.1 Dark Theme (기본값 · `data-theme="dark"`)
- `--bg-primary`: `#070B14` (Deep Navy Base)
- `--bg-surface`: `#121A2B` (Primary Panel Surface)
- `--bg-elevated`: `#182338` (Elevated Card / Inspector Surface)
- `--text-primary`: `#F5F7FB` (Crisp White)
- `--text-muted`: `#A5B0C6` (Muted Slate)
- `--accent-blue`: `#6FA8FF` (Electric Blue)
- `--accent-violet`: `#AB83FF` (Violet Glow)
- `--accent-cyan`: `#25C8BD` (Telemetry Cyan)
- `--border-subtle`: `rgba(111, 168, 255, 0.16)`

### 2.2 Light Theme (`data-theme="light"`)
- `--bg-primary`: `#F8FAFC`
- `--bg-surface`: `#FFFFFF`
- `--bg-elevated`: `#F1F5F9`
- `--text-primary`: `#182338`
- `--text-muted`: `#475569`
- `--accent-blue`: `#2563EB`
- `--accent-violet`: `#7C3AED`
- `--accent-cyan`: `#0D9488`
- `--border-subtle`: `rgba(24, 35, 56, 0.12)`

---

## 3. 타이포그래피 (Typography)

- **Sans-serif (본문 및 헤딩)**: `Pretendard Variable`, `Geist`, `-apple-system`, `BlinkMacSystemFont`, `system-ui`, `sans-serif`
- **Monospace (메트릭, 아키텍처 노드 ID, 코드·스키마, 검증 수치)**: `Geist Mono`, `JetBrains Mono`, `ui-monospace`, `monospace`
- **가독성 원칙**:
  - 과도한 네온 발광이나 반투명 텍스트 지양
  - WCAG 2.2 AA 명도 대비 충족
  - 본문 행간 `1.65 ~ 1.75`, 코드 및 메트릭 배지 고정폭 정렬(`tabular-nums`)

---

## 4. 인터랙션 및 모션 원칙

1. **절제된 엔지니어링 모션**: 사용자 스크롤을 가로채지 않으며(No scroll hijacking), GSAP ScrollTrigger를 통한 자연스러운 섹션 진입과 3D 카메라 전환만 수행합니다.
2. **모션 축소(`prefers-reduced-motion` 및 수동 토글)**: 모션 축소 활성화 시 3D 자동 회전 및 파티클/패킷 이동 애니메이션을 즉시 고정 상태로 전환합니다.
3. **WebGL Fallback 보장**: WebGL 컨텍스트 생성이 불가능하거나 저사양 모드일 경우 SVG 기반 정적/2D 아키텍처 다이어그램으로 자동 대체되어 정보 손실이 없습니다.
