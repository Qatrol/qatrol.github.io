/** Мелкие помощники для сборки DOM без innerHTML. */

/**
 * Создать элемент.
 * @param {string} tag
 * @param {string} [className]
 * @returns {HTMLElement}
 */
export function create(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

/**
 * Элемент с текстом внутри. textContent, а не innerHTML: данные из контента
 * не должны уметь разметку.
 * @param {string} tag
 * @param {string} value
 * @param {string} [className]
 * @returns {HTMLElement}
 */
export function createText(tag, value, className) {
  const node = create(tag, className);
  node.textContent = value ?? "";
  return node;
}

/**
 * @param {string} markup
 * @param {string} [className]
 * @returns {HTMLElement}
 */
export function createSvg(markup, className) {
  const template = document.createElement("template");
  template.innerHTML = markup.trim();
  const node = template.content.firstElementChild;
  if (!node) return create("span", className);
  if (className) node.classList.add(className);
  return node;
}
