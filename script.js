const menuButton = document.querySelector("[data-menu-button]");
const siteNav = document.querySelector("[data-site-nav]");
const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const projectCarousel = document.querySelector("[data-project-carousel]");

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
      prevButton.disabled = currentIndex === 0;
    }

    if (nextButton) {
      nextButton.disabled = currentIndex === cards.length - 1;
    }
  };

  const showProject = (index) => {
    const nextIndex = Math.max(0, Math.min(index, cards.length - 1));
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
    updateProjectControls();
  }
}
