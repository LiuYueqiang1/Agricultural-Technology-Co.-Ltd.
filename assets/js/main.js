document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const year = document.querySelector("[data-year]");
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
  const menuLabels = isEnglish
    ? { open: "Open navigation menu", close: "Close navigation menu" }
    : { open: "打开导航菜单", close: "关闭导航菜单" };

  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const closeMenu = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", menuLabels.open);
    mobileNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(willOpen));
      menuToggle.setAttribute("aria-label", willOpen ? menuLabels.close : menuLabels.open);
      mobileNav.classList.toggle("is-open", willOpen);
      document.body.classList.toggle("menu-open", willOpen);
    });

    mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1080) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
});
