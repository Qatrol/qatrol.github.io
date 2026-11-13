import { about, projects, stack } from "./content.js";
import { create } from "./lib/dom.js";

const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

/**
 * Фейковый терминал: навигация по сайту с клавиатуры и ответы на команды.
 * Данных наружу не отправляет и ничего не исполняет — это витрина.
 */
export function initTerminal() {
  const overlay = document.getElementById("terminal");
  const input = document.getElementById("term-input");
  const log = document.getElementById("term-log");
  const form = document.getElementById("term-form");
  const closeButton = document.getElementById("term-close");

  if (!overlay || !input || !log || !form) return;

  const openers = [
    document.getElementById("term-btn"),
    document.getElementById("term-btn-2"),
  ].filter(Boolean);

  const history = [];
  let historyIndex = 0;
  let isOpen = false;
  let lastFocused = null;

  function print(text, className = "") {
    const line = create("div", className ? `t-line ${className}` : "t-line");
    line.textContent = text;
    log.append(line);
    log.scrollTop = log.scrollHeight;
  }

  function printList(items) {
    items.forEach((item) => print(`- ${item}`));
  }

  const commands = {
    help() {
      print("Команды: help, about, skills, projects, contact, ls, clear, exit", "t-muted");
    },
    about() {
      print(about.who);
    },
    skills() {
      print(stack.join(" · "));
    },
    projects() {
      printList(projects.map((project) => project.name));
    },
    contact() {
      print(about.contact);
    },
    ls() {
      print("about  projects  skills  contact  help  clear", "t-muted");
    },
    sudo() {
      print("не положено. тут только читают.", "t-muted");
    },
    clear() {
      log.replaceChildren();
    },
    exit: close,
    close,
    quit: close,
  };

  function focusables() {
    return Array.from(overlay.querySelectorAll(FOCUSABLE)).filter(
      (element) => element.offsetParent !== null
    );
  }

  /** Пока диалог открыт, фон выключен из Tab-обхода и из дерева скринридера. */
  function setBackgroundInert(inert) {
    document.querySelectorAll("header, main, .dots, .skip-link").forEach((element) => {
      if (inert) element.setAttribute("inert", "");
      else element.removeAttribute("inert");
    });
  }

  function open(event) {
    if (isOpen) return;
    isOpen = true;
    lastFocused =
      event?.currentTarget instanceof HTMLElement
        ? event.currentTarget
        : document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

    overlay.hidden = false;
    document.body.classList.add("is-locked");
    setBackgroundInert(true);
    log.replaceChildren();
    input.value = "";
    historyIndex = history.length;
    print("Терминал Qatrol. Введи help.", "t-muted");

    window.setTimeout(() => input.focus(), 30);
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;

    overlay.hidden = true;
    document.body.classList.remove("is-locked");
    setBackgroundInert(false);
    lastFocused?.focus();
    lastFocused = null;
  }

  openers.forEach((button) => button.addEventListener("click", open));
  closeButton?.addEventListener("click", close);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen) {
      if (event.key === "`") {
        const target = event.target;
        if (target instanceof HTMLElement && target.closest("input, textarea, [contenteditable]")) return;
        event.preventDefault();
        open(event);
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== "Tab") return;

    // фокус-ловушка: за пределы диалога Tab не выпускает
    const items = focusables();
    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history[historyIndex];
      input.setSelectionRange(input.value.length, input.value.length);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!history.length) return;
      historyIndex = Math.min(history.length, historyIndex + 1);
      input.value = history[historyIndex] ?? "";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const raw = input.value.trim();
    if (!raw) return;

    print(`$ ${raw}`, "t-cmd");

    history.push(raw);
    historyIndex = history.length;

    const [command, ...args] = raw.toLowerCase().split(/\s+/);
    // hasOwnProperty, а не commands[command]: иначе «__proto__» и «valueOf»
    // выдёргивают свойства Object.prototype и роняют обработчик
    const known = Object.prototype.hasOwnProperty.call(commands, command);
    const handler = known ? commands[command] : null;

    if (handler) {
      handler(args);
    } else {
      print(`команда не найдена: ${command}. help`, "t-muted");
    }

    input.value = "";
  });
}
