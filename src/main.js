/*
 * Стили подключаются по порядку: токены → база → каркас → секции →
 * компоненты → движение → адаптив. Через @import внутри CSS не делаем:
 * Vite в dev-режиме резолвит такие пути от корня проекта и падает.
 */
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/sections.css";
import "./styles/components.css";
import "./styles/motion.css";
import "./styles/responsive.css";

import { initCounters, initHeader, initMagnetic } from "./interactions.js";
import { initSlides } from "./slides.js";
import { initTerminal } from "./terminal.js";
import { renderContent } from "./render.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Прелоадер снимается после load, но не дольше 1.4 с. */
function initPreloader(onDone) {
  const preloader = document.getElementById("preloader");
  const startedAt = performance.now();
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    preloader?.classList.add("is-done");
    onDone();
  };

  const hide = () => {
    const MIN_VISIBLE_MS = 600;
    const elapsed = performance.now() - startedAt;
    window.setTimeout(finish, Math.max(0, MIN_VISIBLE_MS - elapsed));
  };

  if (document.readyState === "complete") {
    hide();
  } else {
    window.addEventListener("load", hide, { once: true });
  }

  // страховка: если load не придёт (битая картинка, зависший шрифт)
  window.setTimeout(finish, 1400);
}

function initYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

function boot() {
  renderContent();
  initYear();

  initMagnetic(reducedMotion);
  initHeader();
  initTerminal();

  // счётчик и слайдер стартуют после прелоадера, иначе анимация
  // пройдёт за непрозрачной заставкой и её никто не увидит
  initPreloader(() => {
    initSlides();
    initCounters(reducedMotion);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
