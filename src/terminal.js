import { projects, stack } from "./data.js";

const ABOUT =
  "Qatrol. Разработчик: боты, сайты и веб-приложения, мобильные приложения, парсеры, серверы, автоматизация, смарт-контракты. Один человек на весь цикл.";
const CONTACT =
  "Почта: sanyashurov@yandex.ru\nGitHub: https://github.com/Qatrol";

export function initTerminal() {
  const overlay = document.getElementById("terminal");
  const input = document.getElementById("term-input");
  const log = document.getElementById("term-log");
  const form = document.getElementById("term-form");
  const closeBtn = document.getElementById("term-close");
  const openers = [document.getElementById("term-btn"), document.getElementById("term-btn-2")].filter(Boolean);
  if (!overlay || !input || !log || !form) return;

  const line = (text, cls = "") => {
    const div = document.createElement("div");
    div.className = "t-line " + cls;
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  };

  const commands = {
    help: () => line("Команды: help, about, skills, projects, contact, clear", "t-muted"),
    about: () => line(ABOUT),
    skills: () => line(stack.join(" · ")),
    projects: () => projects.forEach((p) => line(`- ${p.name}`)),
    contact: () => line(CONTACT),
    clear: () => {
      log.innerHTML = "";
    },
  };

  let opened = false;

  function open() {
    if (opened) return;
    opened = true;
    overlay.hidden = false;
    document.body.classList.add("is-locked");
    log.innerHTML = "";
    line("Терминал Qatrol. Введи help.", "t-muted");
    setTimeout(() => input.focus(), 30);
  }

  function closeTerm() {
    opened = false;
    overlay.hidden = true;
    document.body.classList.remove("is-locked");
  }

  openers.forEach((b) => b.addEventListener("click", open));
  closeBtn?.addEventListener("click", closeTerm);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeTerm();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "`" && !opened) {
      e.preventDefault();
      open();
    } else if (e.key === "Escape" && opened) {
      closeTerm();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = input.value.trim();
    const cmd = raw.toLowerCase();
    if (!cmd) return;
    line("$ " + raw, "t-cmd");
    const fn = commands[cmd];
    if (fn) fn();
    else line(`команда не найдена: ${cmd}. help`, "t-muted");
    input.value = "";
  });
}
