import "./styles.css";
import { directions, projects, steps, stack } from "./data.js";
import { initMagnetic, initHeader } from "./interactions.js";
import { initSlides } from "./slides.js";
import { initTerminal } from "./terminal.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderWork() {
  const grid = document.getElementById("work-grid");
  if (!grid) return;
  const last = directions.length - 1;
  grid.innerHTML = directions
    .map((d, i) => {
      const wide = i === last;
      return `
      <article class="card${wide ? " card--wide" : ""}">
        <span class="card__icon">${d.icon}</span>
        <h3 class="card__title">${d.title}</h3>
        <p class="card__line">${d.line}</p>
        ${wide ? "" : `<div class="card__foot"><span class="card__stack">${d.stack}</span></div>`}
      </article>`;
    })
    .join("");
}

function renderProjects() {
  const list = document.getElementById("project-list");
  if (!list) return;
  list.innerHTML = projects
    .map(
      (p) => `
      <article class="project-row">
        <div>
          <h3 class="project-row__name">${
            p.href
              ? `<a href="${p.href}" target="_blank" rel="noopener noreferrer">${p.name}</a>`
              : p.name
          }</h3>
          <span class="project-row__stack">${p.stack}</span>
        </div>
        <p class="project-row__text"><span>Решает</span>${p.solves}</p>
        <p class="project-row__text"><span>Результат</span>${p.result}</p>
      </article>`
    )
    .join("");
}

function renderSteps() {
  const list = document.getElementById("process-list");
  if (!list) return;
  list.innerHTML = steps
    .map(
      (s) => `
      <li class="process-step">
        <h3 class="process-step__title">${s.title}</h3>
        <p class="process-step__line">${s.line}</p>
      </li>`
    )
    .join("");
}

function renderStack() {
  const track = document.getElementById("stack-track");
  if (!track) return;
  const items = stack.map((s) => `<span>${s}</span>`).join("");
  track.innerHTML = items + items;
}

function initCounters() {
  const els = document.querySelectorAll("[data-count]");
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        io.unobserve(el);
        const end = Number(el.dataset.count) || 0;
        const dur = 1200;
        const t0 = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = String(Math.round(end * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.3 }
  );
  els.forEach((el) => io.observe(el));
}

function initPreloader(onDone) {
  const pre = document.getElementById("preloader");
  const start = performance.now();
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    pre?.classList.add("is-done");
    onDone?.();
  };

  const hide = () => {
    const wait = Math.max(0, 600 - (performance.now() - start));
    setTimeout(finish, wait);
  };

  if (document.readyState === "complete") hide();
  else window.addEventListener("load", hide, { once: true });
  setTimeout(finish, 1400);
}

function boot() {
  renderWork();
  renderProjects();
  renderSteps();
  renderStack();

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  initMagnetic(false);
  initHeader();
  initTerminal();
  initCounters();

  initPreloader(() => initSlides());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
