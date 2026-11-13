import { directions, projects, steps, stack } from "./content.js";
import { icons } from "./icons.js";
import { create, createSvg, createText } from "./lib/dom.js";

/**
 * Карточка направления. Последняя карточка — широкая, на всю строку.
 * @param {{ icon: string, title: string, line: string, stack: string }} item
 * @param {boolean} wide
 * @returns {HTMLElement}
 */
function directionCard(item, wide) {
  const card = create("article", wide ? "card card--wide" : "card");

  const icon = create("span", "card__icon");
  // именно hasOwnProperty: icons["constructor"] вернул бы функцию Object и уронил рендер
  const own = Object.prototype.hasOwnProperty.call(icons, item.icon);
  const markup = own ? icons[item.icon] : icons.plus;
  icon.append(createSvg(markup));
  card.append(icon);

  card.append(createText("h3", item.title, "card__title"));
  card.append(createText("p", item.line, "card__line"));

  if (!wide) {
    const foot = create("div", "card__foot");
    foot.append(createText("span", item.stack, "card__stack"));
    card.append(foot);
  }

  return card;
}

/** @param {HTMLElement} root @param {typeof directions} items */
export function renderDirections(root, items = directions) {
  const fragment = document.createDocumentFragment();
  const lastIndex = items.length - 1;

  items.forEach((item, index) => {
    fragment.append(directionCard(item, index === lastIndex));
  });

  root.replaceChildren(fragment);
}

/** @param {HTMLElement} root @param {typeof projects} items */
export function renderProjects(root, items = projects) {
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const row = create("article", "project-row");

    const head = create("div");
    const title = create("h3", "project-row__name");
    if (item.href) {
      const link = createText("a", item.name);
      link.href = item.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      // ссылка открывается в новой вкладке — предупреждаем тех, кто не видит иконку
      link.append(createText("span", " (откроется в новой вкладке)", "visually-hidden"));
      title.append(link);
    } else {
      title.textContent = item.name;
    }
    head.append(title, createText("span", item.stack, "project-row__stack"));

    const solves = createText("p", item.solves, "project-row__text");
    solves.prepend(createText("span", "Решает"));

    const result = createText("p", item.result, "project-row__text");
    result.prepend(createText("span", "Результат"));

    row.append(head, solves, result);
    fragment.append(row);
  });

  root.replaceChildren(fragment);
}

/** @param {HTMLElement} root @param {typeof steps} items */
export function renderSteps(root, items = steps) {
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const step = create("li", "process-step");
    step.append(createText("h3", item.title, "process-step__title"));
    step.append(createText("p", item.line, "process-step__line"));
    fragment.append(step);
  });

  root.replaceChildren(fragment);
}

/**
 * Бегущая строка: содержимое дублируется, чтобы анимация шла без стыка.
 * @param {HTMLElement} track
 * @param {string[]} items
 */
export function renderStack(track, items = stack) {
  const fragment = document.createDocumentFragment();

  for (let copy = 0; copy < 2; copy += 1) {
    items.forEach((item) => fragment.append(createText("span", item)));
  }

  track.replaceChildren(fragment);
}

/** Заполнить все списки на странице. */
export function renderContent() {
  const workGrid = document.getElementById("work-grid");
  const projectList = document.getElementById("project-list");
  const processList = document.getElementById("process-list");
  const stackTrack = document.getElementById("stack-track");

  if (workGrid) renderDirections(workGrid);
  if (projectList) renderProjects(projectList);
  if (processList) renderSteps(processList);
  if (stackTrack) renderStack(stackTrack);
}
