/**
 * Вертикальный слайдер для десктопа. На мобилке слайды — обычная колонка,
 * поэтому в этом режиме ни один обработчик не перехватывает жесты.
 *
 * Слушатели вешаются один раз и проверяют флаг deckActive: слайдер
 * включается и выключается на лету при переходе через брейкпоинт 900px,
 * в том числе если страницу открыли сразу в узком окне.
 */

const MOBILE_QUERY = "(max-width: 900px)";
const ANIMATION_MS = 800;
const WHEEL_LOCK_MS = 700;
const SCROLL_STEP = 160;
/** Переполнение меньше этого — не повод скроллить слайд вместо листания. */
const MIN_OVERFLOW = 48;

const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;

/**
 * Слайд выше экрана — тогда сначала прокручиваем его содержимое,
 * и только на границе переключаем слайд.
 * @param {HTMLElement} slide
 * @param {number} direction 1 вниз, -1 вверх
 */
function canScrollInside(slide, direction) {
  const overflow = slide.scrollHeight - slide.clientHeight;

  // Меньше MIN_OVERFLOW считаем, что контент влез: иначе колесо тратит
  // первый оборот на полсотни пикселей, которых никто не видит, и слайд
  // переключается только со второго раза.
  if (overflow <= MIN_OVERFLOW) return false;

  return direction > 0
    ? slide.scrollTop + slide.clientHeight < slide.scrollHeight - 1
    : slide.scrollTop > 0;
}

/**
 * Неактивные слайды выключены через inert: иначе Tab уводит фокус
 * в ссылку за пределами экрана, а скринридер читает разом всю страницу.
 * @param {HTMLElement[]} slides
 * @param {number} active
 */
function isolateSlides(slides, active) {
  slides.forEach((slide, i) => {
    if (i === active) slide.removeAttribute("inert");
    else slide.setAttribute("inert", "");
  });
}

/** Запустить появление элементов слайда заново. */
function revealSlide(slide) {
  if (!slide) return;

  const reveals = Array.from(slide.querySelectorAll("[data-reveal]"));
  const steps = Array.from(slide.querySelectorAll(".process-step"));

  reveals.concat(steps).forEach((node) => {
    node.classList.remove("is-in");
    node.style.transitionDelay = "";
  });

  // принудительный рефлоу, чтобы анимация стартовала с нуля
  void slide.offsetWidth;

  reveals.forEach((node) => node.classList.add("is-in"));
  steps.forEach((node, i) => {
    node.style.transitionDelay = `${0.1 + i * 0.16}s`;
    node.classList.add("is-in");
  });
}

/** Сообщить скринридеру, какой слайд открылся. */
function announceSlide(status, slide, index, total) {
  if (!status) return;
  const title = slide.querySelector("h1, h2");
  status.textContent = `Слайд ${index + 1} из ${total}: ${title ? title.textContent : ""}`;
}

/** Терминал поверх сайта — пока он открыт, слайды трогать нельзя. */
function isTerminalOpen() {
  const terminal = document.getElementById("terminal");
  return Boolean(terminal && !terminal.hidden);
}

export function initSlides() {
  const track = document.getElementById("slides");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dots = Array.from(document.querySelectorAll(".dots button"));
  if (!track || !slides.length) return;

  const status = document.getElementById("slide-status");

  let index = 0;
  let animating = false;
  let lastWheel = 0;
  let deckActive = false;

  const vh = () => slides[0].getBoundingClientRect().height || window.innerHeight;

  function setDots() {
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle("is-active", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function setTrack() {
    track.style.transition = "none";
    track.style.transform = `translateY(${-index * vh()}px)`;
    void track.offsetHeight;
    track.style.transition = "";
  }

  function animateTrack(fromIndex, toIndex) {
    track.style.transition = "none";
    track.style.transform = `translateY(${-fromIndex * vh()}px)`;
    void track.offsetHeight;
    track.style.transition = "";
    track.style.transform = `translateY(${-toIndex * vh()}px)`;
  }

  function goTo(next) {
    if (!deckActive) return;
    if (animating || next === index || next < 0 || next >= slides.length) return;

    animating = true;
    const previous = index;
    index = next;

    isolateSlides(slides, index);
    setDots();
    animateTrack(previous, index);
    slides[index].scrollTop = 0;
    revealSlide(slides[index]);
    announceSlide(status, slides[index], index, slides.length);

    window.setTimeout(() => {
      animating = false;
    }, ANIMATION_MS);
  }

  function enableDeck() {
    if (deckActive) return;
    deckActive = true;

    document.documentElement.classList.add("is-deck");
    setDots();
    isolateSlides(slides, index);
    revealSlide(slides[index]);
    setTrack();
  }

  function disableDeck() {
    if (!deckActive) return;
    deckActive = false;

    document.documentElement.classList.remove("is-deck");
    track.style.transition = "none";
    track.style.transform = "";
    track.style.transition = "";

    // на мобилке слайды идут обычным потоком — inert и сдвиг тут всё спрячут
    slides.forEach((slide) => {
      slide.removeAttribute("inert");
      slide.scrollTop = 0;
    });
  }

  function syncMode() {
    if (isMobile()) disableDeck();
    else enableDeck();
  }

  window.addEventListener(
    "wheel",
    (event) => {
      if (!deckActive) return;
      // ctrl+wheel — это зум страницы, пинч на трекпаде; не отбираем
      if (event.ctrlKey) return;
      if (isTerminalOpen()) return;

      const slide = slides[index];

      // содержимое слайда длиннее экрана — отдаём прокрутку браузеру
      if (canScrollInside(slide, event.deltaY)) return;

      event.preventDefault();
      if (animating) return;

      const now = Date.now();
      if (now - lastWheel < WHEEL_LOCK_MS) return;
      if (Math.abs(event.deltaY) < 6) return;
      lastWheel = now;
      goTo(index + (event.deltaY > 0 ? 1 : -1));
    },
    { passive: false }
  );

  window.addEventListener("keydown", (event) => {
    if (!deckActive) return;
    if (isTerminalOpen()) return;
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;

    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    // не мешаем вводу: в терминале стрелки листают историю команд
    if (target.closest("input, textarea, select, [contenteditable], [role='dialog']")) return;

    // пробел на кнопке или ссылке — это активация, а не «следующий слайд»
    if (event.key === " " && target.closest("button, a, summary, [role='button']")) return;

    if (["ArrowDown", "PageDown", " "].includes(event.key)) {
      if (canScrollInside(slides[index], 1)) {
        event.preventDefault();
        slides[index].scrollBy({ top: SCROLL_STEP, behavior: "smooth" });
        return;
      }
      event.preventDefault();
      goTo(index + 1);
    } else if (["ArrowUp", "PageUp"].includes(event.key)) {
      if (canScrollInside(slides[index], -1)) {
        event.preventDefault();
        slides[index].scrollBy({ top: -SCROLL_STEP, behavior: "smooth" });
        return;
      }
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(slides.length - 1);
    }
  });

  let touchStartY = 0;
  window.addEventListener(
    "touchstart",
    (event) => {
      if (!deckActive) return;
      touchStartY = event.touches[0].clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchend",
    (event) => {
      if (!deckActive) return;

      const delta = touchStartY - event.changedTouches[0].clientY;
      if (Math.abs(delta) <= 50) return;

      const direction = delta > 0 ? 1 : -1;
      // как и с колесом: сначала доскроллить слайд, потом листать
      if (canScrollInside(slides[index], direction)) return;
      goTo(index + direction);
    },
    { passive: true }
  );

  document.querySelectorAll("[data-goto]").forEach((element) => {
    element.addEventListener("click", (event) => {
      // на мобилке пусть работает обычный переход по якорю
      if (!deckActive) return;
      event.preventDefault();
      const target = Number(element.dataset.goto);
      if (!Number.isNaN(target)) goTo(target);
    });
  });

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      syncMode();
      if (deckActive) setTrack();
    }, 150);
  });

  syncMode();
}
