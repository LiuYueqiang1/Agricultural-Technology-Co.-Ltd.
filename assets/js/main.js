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

  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const viewport = gallery.querySelector("[data-gallery-viewport]");
    const items = Array.from(gallery.querySelectorAll("[data-gallery-item]"));
    const previousButton = gallery.querySelector("[data-gallery-prev]");
    const nextButton = gallery.querySelector("[data-gallery-next]");
    const currentLabel = gallery.querySelector("[data-gallery-current]");
    const totalLabel = gallery.querySelector("[data-gallery-total]");
    const lightbox = gallery.querySelector("[data-gallery-lightbox]");
    const lightboxImage = gallery.querySelector("[data-lightbox-image]");
    const lightboxCategory = gallery.querySelector("[data-lightbox-category]");
    const lightboxTitle = gallery.querySelector("[data-lightbox-title]");
    const lightboxCurrent = gallery.querySelector("[data-lightbox-current]");
    const lightboxTotal = gallery.querySelector("[data-lightbox-total]");
    const lightboxStage = gallery.querySelector("[data-lightbox-stage]");
    const track = gallery.querySelector(".gallery__track");

    if (!viewport || !items.length) return;

    const formatIndex = (index) => String(index + 1).padStart(2, "0");
    const autoPlayDelay = 4600;
    const interactionResumeDelay = 1400;
    let activeIndex = 0;
    let lightboxIndex = 0;
    let scrollFrame = 0;
    let scrollAnimationFrame = 0;
    let autoPlayTimer = 0;
    let wheelResumeTimer = 0;
    let dragState = null;
    let isLooping = false;
    let suppressClick = false;
    let lastFocused = null;
    let lightboxSwipeStart = null;
    const pauseReasons = new Set();
    let leadingLoopItem = null;
    let trailingLoopItem = null;

    if (track && items.length > 1) {
      const makeLoopItem = (source) => {
        const clone = source.cloneNode(true);
        clone.removeAttribute("data-gallery-item");
        clone.setAttribute("aria-hidden", "true");
        clone.setAttribute("tabindex", "-1");
        clone.inert = true;
        return clone;
      };

      leadingLoopItem = makeLoopItem(items[items.length - 1]);
      trailingLoopItem = makeLoopItem(items[0]);
      track.prepend(leadingLoopItem);
      track.append(trailingLoopItem);
    }

    const scrollTargets = items.map((item, index) => ({ index, item, isClone: false }));
    if (leadingLoopItem) scrollTargets.unshift({ index: items.length - 1, item: leadingLoopItem, isClone: true });
    if (trailingLoopItem) scrollTargets.push({ index: 0, item: trailingLoopItem, isClone: true });

    if (totalLabel) totalLabel.textContent = String(items.length).padStart(2, "0");
    if (lightboxTotal) lightboxTotal.textContent = String(items.length).padStart(2, "0");

    const updateControls = (index) => {
      activeIndex = Math.max(0, Math.min(index, items.length - 1));
      if (currentLabel) currentLabel.textContent = formatIndex(activeIndex);
      gallery.style.setProperty("--gallery-progress", `${((activeIndex + 1) / items.length) * 100}%`);
      if (previousButton) previousButton.disabled = activeIndex === 0;
      if (nextButton) nextButton.disabled = activeIndex === items.length - 1;
    };

    const closestItemTarget = (scrollLeft = viewport.scrollLeft) => {
      const viewportCenter = scrollLeft + viewport.clientWidth / 2;
      let closest = scrollTargets[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      scrollTargets.forEach((target) => {
        const itemCenter = target.item.offsetLeft + target.item.offsetWidth / 2;
        const distance = Math.abs(itemCenter - viewportCenter);
        if (distance < closestDistance) {
          closest = target;
          closestDistance = distance;
        }
      });

      return closest;
    };

    const closestItemIndex = (scrollLeft = viewport.scrollLeft) => closestItemTarget(scrollLeft).index;

    const cancelScrollAnimation = () => {
      if (scrollAnimationFrame) cancelAnimationFrame(scrollAnimationFrame);
      scrollAnimationFrame = 0;
      viewport.classList.remove("is-animating");
    };

    const scrollToItem = (index, smooth = true, onComplete = null, visualItem = null, durationOverride = null) => {
      const nextIndex = Math.max(0, Math.min(index, items.length - 1));
      const item = visualItem || items[nextIndex];
      const left = item.offsetLeft - (viewport.clientWidth - item.offsetWidth) / 2;
      cancelScrollAnimation();

      if (smooth && !reduceMotion) {
        const start = viewport.scrollLeft;
        const distance = left - start;
        const duration = durationOverride ?? Math.min(1050, Math.max(720, Math.abs(distance) * 0.9));
        const startedAt = performance.now();
        viewport.classList.add("is-animating");

        const animate = (now) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          viewport.scrollLeft = start + distance * eased;

          if (progress < 1) scrollAnimationFrame = requestAnimationFrame(animate);
          else {
            scrollAnimationFrame = 0;
            viewport.classList.remove("is-animating");
            viewport.scrollLeft = left;
            onComplete?.();
          }
        };

        scrollAnimationFrame = requestAnimationFrame(animate);
      } else {
        viewport.scrollLeft = left;
        onComplete?.();
      }
      updateControls(nextIndex);
    };

    const settleToTarget = (target, duration, onComplete) => {
      if (target.isClone) isLooping = true;
      scrollToItem(target.index, true, () => {
        if (target.isClone) scrollToItem(target.index, false);
        isLooping = false;
        updateControls(target.index);
        onComplete?.();
      }, target.item, duration);
    };

    const clearAutoPlay = () => {
      if (autoPlayTimer) window.clearTimeout(autoPlayTimer);
      autoPlayTimer = 0;
    };

    const scheduleAutoPlay = (delay = autoPlayDelay) => {
      clearAutoPlay();
      if (reduceMotion || pauseReasons.size || document.hidden) return;
      autoPlayTimer = window.setTimeout(() => {
        const isLastItem = activeIndex === items.length - 1;
        if (isLastItem && trailingLoopItem) {
          settleToTarget({ index: 0, item: trailingLoopItem, isClone: true }, null, scheduleAutoPlay);
        } else {
          scrollToItem(isLastItem ? 0 : activeIndex + 1, !isLastItem, scheduleAutoPlay);
        }
      }, delay);
    };

    const pauseAutoPlay = (reason) => {
      pauseReasons.add(reason);
      clearAutoPlay();
    };

    const resumeAutoPlay = (reason, delay = interactionResumeDelay) => {
      pauseReasons.delete(reason);
      scheduleAutoPlay(delay);
    };

    const useManualNavigation = (index) => {
      isLooping = false;
      scrollToItem(index, true, () => scheduleAutoPlay(interactionResumeDelay));
    };

    viewport.addEventListener("scroll", () => {
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        if (!isLooping) updateControls(closestItemIndex());
      });
    }, { passive: true });

    previousButton?.addEventListener("click", () => useManualNavigation(activeIndex - 1));
    nextButton?.addEventListener("click", () => useManualNavigation(activeIndex + 1));

    viewport.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        useManualNavigation(activeIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        useManualNavigation(activeIndex + 1);
      }
    });

    gallery.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") pauseAutoPlay("hover");
    });
    gallery.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse") resumeAutoPlay("hover");
    });
    gallery.addEventListener("focusin", (event) => {
      if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) pauseAutoPlay("focus");
    });
    gallery.addEventListener("focusout", (event) => {
      if (!gallery.contains(event.relatedTarget)) resumeAutoPlay("focus");
    });

    viewport.addEventListener("pointerdown", (event) => {
      pauseAutoPlay("pointer");
      cancelScrollAnimation();
      isLooping = false;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragState = {
        pointerId: event.pointerId,
        startX: event.clientX,
        lastX: event.clientX,
        lastTime: performance.now(),
        velocity: 0,
        moved: false
      };
      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add("is-dragging");
    });

    viewport.addEventListener("pointermove", (event) => {
      if (!dragState || dragState.pointerId !== event.pointerId) return;
      const now = performance.now();
      const deltaX = event.clientX - dragState.lastX;
      const elapsed = Math.max(now - dragState.lastTime, 1);
      const instantVelocity = deltaX / elapsed;
      dragState.velocity = dragState.velocity * 0.7 + instantVelocity * 0.3;
      dragState.lastX = event.clientX;
      dragState.lastTime = now;
      if (Math.abs(event.clientX - dragState.startX) > 6) dragState.moved = true;
      if (dragState.moved) {
        viewport.scrollLeft -= deltaX;
        event.preventDefault();
      }
    });

    const finishDrag = (event) => {
      let resumeAfterSnap = false;
      if (dragState && dragState.pointerId === event.pointerId) {
        if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
        if (dragState.moved) {
          suppressClick = true;
          window.setTimeout(() => { suppressClick = false; }, 0);
          const releaseAge = performance.now() - dragState.lastTime;
          const releaseVelocity = releaseAge < 90 ? dragState.velocity : 0;
          const projectedScrollLeft = viewport.scrollLeft - releaseVelocity * 420;
          const speedRatio = Math.min(Math.abs(releaseVelocity) / 2, 1);
          const settleDuration = Math.round(950 + 2650 * (1 - Math.pow(speedRatio, 1.8)));
          const target = closestItemTarget(projectedScrollLeft);
          resumeAfterSnap = true;
          settleToTarget(target, settleDuration, () => resumeAutoPlay("pointer"));
        }
        viewport.classList.remove("is-dragging");
        dragState = null;
      }
      if (!resumeAfterSnap) resumeAutoPlay("pointer");
    };

    viewport.addEventListener("pointerup", finishDrag);
    viewport.addEventListener("pointercancel", finishDrag);
    viewport.addEventListener("wheel", () => {
      cancelScrollAnimation();
      isLooping = false;
      pauseAutoPlay("wheel");
      window.clearTimeout(wheelResumeTimer);
      wheelResumeTimer = window.setTimeout(() => resumeAutoPlay("wheel"), interactionResumeDelay);
    }, { passive: true });

    const updateLightbox = (index) => {
      lightboxIndex = (index + items.length) % items.length;
      const item = items[lightboxIndex];
      const image = item.querySelector("img");
      const category = item.querySelector(".gallery-card__meta small");
      const title = item.querySelector(".gallery-card__meta strong");

      if (lightboxImage && image) {
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt;
      }
      if (lightboxCategory && category) lightboxCategory.textContent = category.textContent;
      if (lightboxTitle && title) lightboxTitle.textContent = title.textContent;
      if (lightboxCurrent) lightboxCurrent.textContent = formatIndex(lightboxIndex);
    };

    const closeLightbox = () => {
      if (!lightbox) return;
      if (typeof lightbox.close === "function" && lightbox.open) lightbox.close();
      else lightbox.removeAttribute("open");
      document.body.classList.remove("gallery-open");
      if (lastFocused instanceof HTMLElement) lastFocused.focus();
      resumeAutoPlay("lightbox");
    };

    const openLightbox = (index) => {
      if (!lightbox) return;
      pauseAutoPlay("lightbox");
      lastFocused = document.activeElement;
      updateLightbox(index);
      document.body.classList.add("gallery-open");
      if (typeof lightbox.showModal === "function") lightbox.showModal();
      else lightbox.setAttribute("open", "");
    };

    items.forEach((item, index) => {
      item.addEventListener("click", () => {
        if (!suppressClick) openLightbox(index);
      });
    });

    gallery.querySelector("[data-gallery-close]")?.addEventListener("click", closeLightbox);
    gallery.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => updateLightbox(lightboxIndex - 1));
    gallery.querySelector("[data-lightbox-next]")?.addEventListener("click", () => updateLightbox(lightboxIndex + 1));

    lightbox?.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    lightbox?.addEventListener("close", () => {
      document.body.classList.remove("gallery-open");
      resumeAutoPlay("lightbox");
    });
    lightbox?.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        updateLightbox(lightboxIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        updateLightbox(lightboxIndex + 1);
      }
    });

    lightboxStage?.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse") return;
      lightboxSwipeStart = { pointerId: event.pointerId, x: event.clientX };
    });
    lightboxStage?.addEventListener("pointerup", (event) => {
      if (!lightboxSwipeStart || lightboxSwipeStart.pointerId !== event.pointerId) return;
      const distance = event.clientX - lightboxSwipeStart.x;
      if (Math.abs(distance) > 45) updateLightbox(distance > 0 ? lightboxIndex - 1 : lightboxIndex + 1);
      lightboxSwipeStart = null;
    });

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(() => {
        isLooping = false;
        scrollToItem(activeIndex, false);
        scheduleAutoPlay(autoPlayDelay);
      });
      resizeObserver.observe(viewport);
    }

    if ("IntersectionObserver" in window) {
      pauseAutoPlay("offscreen");
      const galleryObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) resumeAutoPlay("offscreen", autoPlayDelay);
        else pauseAutoPlay("offscreen");
      }, { threshold: [0, 0.3] });
      galleryObserver.observe(gallery);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) pauseAutoPlay("hidden");
      else resumeAutoPlay("hidden", autoPlayDelay);
    });

    scrollToItem(0, false);
    if (gallery.matches(":hover")) pauseAutoPlay("hover");
    scheduleAutoPlay();
  });
});
