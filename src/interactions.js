/** Эффекты и наблюдатели, не связанные со слайдером. */

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * Кнопки, которые тянутся к курсору. На тач-устройствах и при включённом
 * reduced motion эффект не подключается вообще.
 * @param {boolean} reducedMotion
 */
export function initMagnetic(reducedMotion) {
  if (reducedMotion) return;
  if (!window.matchMedia(FINE_POINTER).matches) return;

  const STRENGTH = 0.28;

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      element.style.transform = `translate(${dx * STRENGTH}px, ${dy * STRENGTH}px)`;
    });

    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });
}

/** Тень шапки после прокрутки. */
export function initHeader() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  const update = () => topbar.classList.toggle("is-scrolled", window.scrollY > 20);
  window.addEventListener("scroll", update, { passive: true });
  update();
}

/**
 * Счётчик в первом экране: досчитывает до data-count, когда его видно.
 *
 * Наблюдаем за слайдом, а не за самим числом: если число оказалось ниже
 * сгиба (невысокое окно, слайд скроллится), IntersectionObserver его не
 * увидит и счётчик навсегда останется нулём.
 */
export function initCounters(reducedMotion) {
  const groups = new Map();

  document.querySelectorAll("[data-count]").forEach((element) => {
    const container = element.closest(".slide") ?? element;
    const bucket = groups.get(container) ?? [];
    bucket.push(element);
    groups.set(container, bucket);
  });

  if (!groups.size) return;

  const setFinal = (element) => {
    element.textContent = element.dataset.count ?? "";
  };

  if (reducedMotion) {
    groups.forEach((elements) => elements.forEach(setFinal));
    return;
  }

  const animate = (element) => {
    const end = Number(element.dataset.count) || 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = String(Math.round(end * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        (groups.get(entry.target) ?? []).forEach(animate);
      });
    },
    { threshold: 0.1 }
  );

  groups.forEach((_, container) => observer.observe(container));
}
