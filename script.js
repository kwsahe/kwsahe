const menuButton = document.querySelector("[data-menu-button]");
const siteNav = document.querySelector("[data-site-nav]");
const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const projectCarousel = document.querySelector("[data-project-carousel]");

window.updateProjectControls = () => {};

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    }
  });
}

if (header) {
  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
}

if (projectCarousel) {
  const projectTrack = projectCarousel.querySelector("[data-project-track]");
  const prevButton = projectCarousel.querySelector("[data-project-prev]");
  const nextButton = projectCarousel.querySelector("[data-project-next]");
  const counter = projectCarousel.querySelector("[data-project-counter]");
  const cards = projectTrack ? Array.from(projectTrack.querySelectorAll(".project-card")) : [];

  const getCurrentIndex = () => {
    if (!projectTrack || cards.length === 0) {
      return 0;
    }

    const trackLeft = projectTrack.getBoundingClientRect().left;
    return cards.reduce((closestIndex, card, index) => {
      const cardDistance = Math.abs(card.getBoundingClientRect().left - trackLeft);
      const closestDistance = Math.abs(cards[closestIndex].getBoundingClientRect().left - trackLeft);
      return cardDistance < closestDistance ? index : closestIndex;
    }, 0);
  };

  const updateProjectControls = () => {
    const currentIndex = getCurrentIndex();

    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${cards.length}`;
    }

    if (prevButton) {
      prevButton.disabled = cards.length <= 1;
    }

    if (nextButton) {
      nextButton.disabled = cards.length <= 1;
    }

    // 활성화된 카드의 실제 높이에 맞춰 트랙 높이 동적 설정
    if (projectTrack && cards[currentIndex]) {
      const activeCard = cards[currentIndex];
      projectTrack.style.height = `${activeCard.offsetHeight}px`;
    }
  };

  const showProject = (index) => {
    const nextIndex = (index + cards.length) % cards.length;
    cards[nextIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  if (projectTrack && cards.length > 0) {
    prevButton?.addEventListener("click", () => showProject(getCurrentIndex() - 1));
    nextButton?.addEventListener("click", () => showProject(getCurrentIndex() + 1));

    projectTrack.addEventListener("scroll", () => {
      window.requestAnimationFrame(updateProjectControls);
    }, { passive: true });

    projectTrack.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showProject(getCurrentIndex() - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showProject(getCurrentIndex() + 1);
      }
    });

    window.addEventListener("resize", updateProjectControls);

    // 카드 내부 이미지가 비동기로 로딩되면 높이를 실시간 재계산
    const carouselImages = projectTrack.querySelectorAll("img");
    carouselImages.forEach((img) => {
      if (img.complete) {
        updateProjectControls();
      } else {
        img.addEventListener("load", updateProjectControls);
      }
    });

    updateProjectControls();
    window.updateProjectControls = updateProjectControls;
  }
}

// Scroll Reveal (스크롤 감지 애니메이션)
const initScrollReveal = () => {
  const revealTargets = document.querySelectorAll(".section, .contact-section");

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
  });

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px", // 뷰포트 하단보다 80px 여유를 두어 진입 시 부드럽게 활성화
    threshold: 0.08,
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);

        // 애니메이션 완료 후(1초 뒤) reveal 클래스들을 제거하여
        // 브라우저 GPU 레이어를 정리하고 서브픽셀 렌더링(1px 테두리 깨짐 방지) 복원
        setTimeout(() => {
          entry.target.classList.remove("reveal", "is-visible");
        }, 1000);
      }
    });
  }, observerOptions);

  revealTargets.forEach((target) => {
    revealObserver.observe(target);
  });
};

// 언어 토글 기능 초기화
const initLanguageToggle = () => {
  const koBtn = document.querySelector('.lang-btn[data-lang="ko"]');
  const enBtn = document.querySelector('.lang-btn[data-lang="en"]');
  const resumeLinks = document.querySelectorAll('.resume-download');

  const setLanguage = (lang, saveToStorage = true) => {
    document.documentElement.setAttribute('lang', lang);
    
    // 버튼 active 상태 변경
    if (lang === 'ko') {
      koBtn?.classList.add('active');
      enBtn?.classList.remove('active');
      
      // title 및 meta description 변경
      document.title = "권상헌 | 데이터 엔지니어 & AI 개발자";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "RAG 시스템·VL Agent·데이터 파이프라인을 end-to-end로 직접 설계하고 배포까지 연결한 데이터 엔지니어 / AI 개발자 권상헌의 포트폴리오입니다.");
      }
      
      // 이력서 파일명 권장 다운로드 속성
      resumeLinks.forEach((link) => {
        link.setAttribute('download', 'resume-kwon-sangheon.pdf');
      });
    } else {
      koBtn?.classList.remove('active');
      enBtn?.classList.add('active');
      
      document.title = "Sangheon Kwon | Data Engineer & AI Developer";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "Portfolio of Sangheon Kwon, a Data Engineer and AI Developer who designs and deploys RAG systems, VL Agents, and data pipelines end-to-end.");
      }
      
      resumeLinks.forEach((link) => {
        link.setAttribute('download', 'Resume_Kwon_Sangheon.pdf');
      });
    }

    if (saveToStorage) {
      localStorage.setItem('preferred-lang', lang);
    }

    // 프로젝트 카드의 실제 높이가 변경되므로 높이 재계산 호출
    if (typeof window.updateProjectControls === 'function') {
      window.updateProjectControls();
    }
  };

  // 초기 언어 설정 로드 (로컬 스토리지 확인, 없으면 기본값 ko)
  const savedLang = localStorage.getItem('preferred-lang') || 'ko';
  setLanguage(savedLang, false);

  koBtn?.addEventListener('click', () => setLanguage('ko'));
  enBtn?.addEventListener('click', () => setLanguage('en'));
};

// --- Dark/Light Theme Toggle (Default: Light Mode) ---
const initThemeToggle = () => {
  const themeToggleBtn = document.querySelector("[data-theme-toggle]");
  const savedTheme = localStorage.getItem("theme") || "light";

  document.documentElement.setAttribute("data-theme", savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
    });
  }
};

// --- Project Tag Filter Bar ---
const initProjectFilter = () => {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll(".project-card");
  const detailCards = document.querySelectorAll(".project-detail-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });

      detailCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });

      if (typeof window.updateProjectControls === "function") {
        window.updateProjectControls();
      }
    });
  });
};

// --- Interactive Node Flow Widget ---
const initInteractiveFlowWidget = () => {
  const flowNodes = {
    scenario: {
      title: "1. ScenarioProfileNode (원문 인과 사실 구조화)",
      desc: "입력 사고 시나리오에서 회사명, 사고 유형, 사망자/부상자 수, 작업종류, 도급 구조를 정형 JSON으로 파싱하고 원문과 재검증하여 환각 및 과거 사고 대화 혼선을 원천 차단합니다.",
      code: `{\n  "incident_type": "철제 자재 낙하 사망",\n  "fatalities": 1,\n  "injured_6months": 0,\n  "employment": "도급 구조",\n  "company": "A건설 (상시근로자 50인 이상)"\n}`
    },
    scope: {
      title: "2. QuestionScopeNode (질문 범위 분리)",
      desc: "질문이 특정 시나리오 사고 판단을 묻는지('위 사고에서...'), 단순 법조문 설명 질의인지를 1차적으로 판별하여 라우팅 경로를 지정합니다.",
      code: `{\n  "scope": "scenario_judgment", // or "general_law"\n  "confidence": 0.98\n}`
    },
    intent: {
      title: "3. IntentClassifierNode (7대 법률 의도 분류)",
      desc: "질문 내용이 특별안전교육, 방호장치, 보호구, 경영책임자 의무, 도급 책임 등 7개 세부 법률 영역 중 어디에 해당하는지 정밀 분류합니다.",
      code: `{\n  "intent": "special_safety_education",\n  "target_clause": "시행규칙 별표 5 제23호"\n}`
    },
    plan: {
      title: "4. RetrievalPlanNode (결정형 규칙 vs RAG+LLM 분기)",
      desc: "사망 요건, 별표 5 특별교육 등 정답이 정형화된 영역은 Direct Route 규칙으로 100% 인용을 보장하고, 고난도 자연어 질의는 Text+Table Vector DB와 EXAONE-4.0-32B LLM 경로로 전송합니다.",
      code: `{\n  "route": "rag_llm",\n  "text_k": 2,\n  "table_k": 3,\n  "model": "LGAI-EXAONE/EXAONE-4.0-32B"\n}`
    },
    cache: {
      title: "5. CacheGuardNode (캐싱 & 중복 질의 통제)",
      desc: "동일 또는 유사 시나리오 질의에 대해 중복 연산을 방지하고 해시 기반 캐시 키를 활용해 LLM 호출 비용 및 서빙 레이턴시를 40% 이상 우회합니다.",
      code: `{\n  "cache_hit": false,\n  "cache_key": "scenario_d41d8cd98f00b204e9800998ecf8427e"\n}`
    },
    validator: {
      title: "6. CitationValidatorNode (출처 검증기)",
      desc: "LLM이 생성한 최종 답변 내 조항, 별표, 법령명을 실제 검색 근거(Context)와 1:1 대조 검증하여 미검증 조항 인용 시 WARN/FAIL을 부착하고 관리자 대시보드로 피드백합니다.",
      code: `{\n  "validation_status": "PASS",\n  "matched_articles": ["중대재해처벌법 제2조", "제3조", "시행규칙 별표 5 제23호"],\n  "unverified_citations": []\n}`
    }
  };

  const flowWidgets = document.querySelectorAll("[data-flow-widget]");
  flowWidgets.forEach((widget) => {
    const btns = widget.querySelectorAll("[data-node]");
    const contentBox = widget.querySelector("[data-flow-content]");

    const renderNode = (nodeKey) => {
      const data = flowNodes[nodeKey];
      if (!data || !contentBox) return;

      contentBox.innerHTML = `
        <h5>${data.title}</h5>
        <p>${data.desc}</p>
        <pre><code>${data.code}</code></pre>
      `;
    };

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        const nodeKey = btn.getAttribute("data-node");
        renderNode(nodeKey);
      });
    });

    renderNode("scenario");
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initLanguageToggle();
    initThemeToggle();
    initProjectFilter();
    initInteractiveFlowWidget();
  });
} else {
  initScrollReveal();
  initLanguageToggle();
  initThemeToggle();
  initProjectFilter();
  initInteractiveFlowWidget();
}
