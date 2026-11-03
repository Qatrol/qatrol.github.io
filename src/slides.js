export function initSlides() {
  const track = document.getElementById("slides");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dots = Array.from(document.querySelectorAll(".dots button"));
  if (!track || !slides.length) return;

  if (window.matchMedia("(max-width: 900px)").matches) return;

  let index = 0;
  let animating = false;

  const vh = () => slides[0].getBoundingClientRect().height || window.innerHeight;

  function setDots() {
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  }

  function reveal(slide) {
    if (!slide) return;
    const els = Array.from(slide.querySelectorAll("[data-reveal]"));
    const stepEls = Array.from(slide.querySelectorAll(".process-step"));

    els.forEach((el) => {
      el.style.transition = "none";
      el.style.opacity = "0";
      el.style.transform = "translateY(26px)";
    });
    stepEls.forEach((el) => {
      el.style.transition = "none";
      el.style.opacity = "0";
      el.style.transform = "translateX(-26px)";
    });

    // рефлоу, чтобы переходы стартовали с нуля
    void slide.offsetWidth;

    els.forEach((el) => {
      el.style.transition = "opacity 0.64s ease, transform 0.64s cubic-bezier(0.2, 0.8, 0.2, 1)";
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    stepEls.forEach((el, i) => {
      el.style.transition = "opacity 0.6s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)";
      el.style.transitionDelay = `${0.1 + i * 0.16}s`;
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }

  function setTrack() {
    track.style.transition = "none";
    track.style.transform = `translateY(${-index * vh()}px)`;
    void track.offsetHeight;
    track.style.transition = "";
  }

  function animateTrack(fromIndex, toIndex) {
    const fromY = -fromIndex * vh();
    const toY = -toIndex * vh();
    // ставим финальную позицию и запускаем CSS-transition
    track.style.transition = "none";
    track.style.transform = `translateY(${fromY}px)`;
    void track.offsetHeight;
    track.style.transition = "";
    track.style.transform = `translateY(${toY}px)`;
  }

  function goTo(i) {
    if (animating || i === index || i < 0 || i >= slides.length) return;
    animating = true;
    const prev = index;
    index = i;
    setDots();
    animateTrack(prev, index);
    reveal(slides[index]);

    window.setTimeout(() => {
      animating = false;
    }, 800);
  }

  setDots();
  reveal(slides[0]);

  let lock = 0;
  window.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      if (animating) return;
      const now = Date.now();
      if (now - lock < 700) return;
      if (Math.abs(e.deltaY) < 6) return;
      lock = now;
      goTo(index + (e.deltaY > 0 ? 1 : -1));
    },
    { passive: false }
  );

  window.addEventListener("keydown", (e) => {
    if (["ArrowDown", "PageDown", " "].includes(e.key)) {
      e.preventDefault();
      goTo(index + 1);
    } else if (["ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      goTo(index - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(slides.length - 1);
    }
  });

  let touchY = 0;
  window.addEventListener("touchstart", (e) => { touchY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener(
    "touchend",
    (e) => {
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) goTo(index + (dy > 0 ? 1 : -1));
    },
    { passive: true }
  );

  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const i = Number(el.dataset.goto);
      if (!Number.isNaN(i)) goTo(i);
    });
  });

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        track.style.transform = "";
        return;
      }
      setTrack();
    }, 150);
  });
}
