/**
 * EasyHisab marketing site — scroll polish, reveals, nav state.
 * Respects prefers-reduced-motion (no transforms / no IO reveals).
 */
(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const docEl = document.documentElement;
  docEl.classList.toggle("motion-reduce", reducedMotion);
  docEl.classList.toggle("motion-safe", !reducedMotion);

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
      });
    });
  }

  const topbar = document.querySelector(".topbar");
  let scrollRaf = 0;
  function onScrollFrame() {
    if (topbar) {
      topbar.classList.toggle("is-scrolled", window.scrollY > 28);
    }
    updateActiveNav();
    updateHeroParallax();
  }

  function scheduleScroll() {
    if (scrollRaf) {
      return;
    }
    scrollRaf = window.requestAnimationFrame(() => {
      scrollRaf = 0;
      onScrollFrame();
    });
  }

  window.addEventListener("scroll", scheduleScroll, { passive: true });
  window.addEventListener("resize", scheduleScroll, { passive: true });
  onScrollFrame();

  const isHome = Boolean(document.getElementById("features"));

  /** In-page anchors mapped to section ids (home only). */
  const navSectionIds = ["features", "workflow", "reports", "get-app"];
  const sections = navSectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll('#primary-nav a[href^="#"]');
  const linkById = new Map();
  navLinks.forEach((a) => {
    const href = a.getAttribute("href");
    if (href && href.startsWith("#") && href.length > 1) {
      linkById.set(href.slice(1), a);
    }
  });

  function updateActiveNav() {
    if (!isHome || sections.length === 0) {
      return;
    }
    const offset = 110;
    let currentId = "";
    const y = window.scrollY + offset;
    for (const section of sections) {
      if (section.offsetTop <= y) {
        currentId = section.id;
      }
    }
    linkById.forEach((link, id) => {
      const on = id === currentId && currentId !== "";
      link.classList.toggle("is-active", on);
      if (on) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  const hero = document.querySelector(".hero");
  const heroScene = document.querySelector(".hero-scene");
  const wideEnough = window.matchMedia("(min-width: 981px)");
  if (typeof wideEnough.addEventListener === "function") {
    wideEnough.addEventListener("change", scheduleScroll);
  }

  function updateHeroParallax() {
    if (reducedMotion || !isHome || !hero || !heroScene || !wideEnough.matches) {
      if (heroScene) {
        heroScene.style.removeProperty("transform");
      }
      return;
    }
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      return;
    }
    const range = rect.height + window.innerHeight * 0.35;
    const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / range));
    const shift = (progress - 0.45) * 18;
    heroScene.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
  }

  if (reducedMotion) {
    return;
  }

  const revealSelectorGroups = isHome
    ? [
        ".hero-content",
        ".hero-scene",
        ".trust-ledger .ledger-grid",
        ".product-strip .strip-grid > div",
        "#features .section-head",
        "#features .feature-grid .feature-card",
        ".usp-section .section-head",
        ".usp-grid .usp-card",
        "#workflow .section-head",
        "#workflow .steps li",
        "#reports .reports-grid > div",
        ".security-section .section-head",
        ".security-list > div",
        ".final-cta .final-grid",
      ]
    : [".content-shell"];

  const revealNodes = [];
  revealSelectorGroups.forEach((sel) => {
    document.querySelectorAll(sel).forEach((node) => {
      revealNodes.push(node);
    });
  });

  if (revealNodes.length === 0) {
    return;
  }

  let revealIndex = 0;
  revealNodes.forEach((el) => {
    el.classList.add("reveal-on-scroll");
    el.style.setProperty("--reveal-delay", `${Math.min(revealIndex * 45, 380)}ms`);
    revealIndex += 1;
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-revealed");
        io.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: "0px 0px -5% 0px", threshold: 0.06 },
  );

  revealNodes.forEach((el) => io.observe(el));

  window.setTimeout(() => {
    document.querySelectorAll(".reveal-on-scroll:not(.is-revealed)").forEach((el) => {
      el.classList.add("is-revealed");
      io.unobserve(el);
    });
  }, 2800);
})();
