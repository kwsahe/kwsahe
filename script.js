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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initLanguageToggle();
  });
} else {
  initScrollReveal();
  initLanguageToggle();
}
