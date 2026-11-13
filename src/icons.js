/**
 * Иконки — доверенные литералы, которые собираются в SVG-элементы один раз
 * при рендере. Контент из этих строк никогда не приходит извне, поэтому
 * вставлять их можно без экранирования.
 */

const svg = (paths) =>
  `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;

export const icons = {
  bot: svg(
    '<rect x="4" y="7" width="16" height="12" rx="3"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M12 7V4"/><path d="M8 19v2M16 19v2"/>'
  ),
  parser: svg('<path d="M8 4 3 12l5 8"/><path d="M16 4l5 8-5 8"/><path d="M13 6l-2 12"/>'),
  server: svg(
    '<rect x="4" y="4" width="16" height="7" rx="2"/><rect x="4" y="13" width="16" height="7" rx="2"/><path d="M8 7.5h.01M8 16.5h.01"/>'
  ),
  automation: svg(
    '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M8 6h8M7 8l4 8M17 8l-4 8"/>'
  ),
  web: svg(
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><circle cx="6" cy="6.5" r=".5"/><circle cx="8.5" cy="6.5" r=".5"/>'
  ),
  mobile: svg('<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>'),
  desktop: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M12 15h5"/>'),
  api: svg(
    '<path d="M8 4c-2 0-3 1-3 3v3c0 1-1 2-2 2 1 0 2 1 2 2v3c0 2 1 3 3 3"/><path d="M16 4c2 0 3 1 3 3v3c0 1 1 2 2 2-1 0-2 1-2 2v3c0 2-1 3-3 3"/>'
  ),
  database: svg(
    '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>'
  ),
  landing: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M9 9h12"/>'),
  ai: svg(
    '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/>'
  ),
  plus: svg('<path d="M12 4v16M4 12h16"/>'),
};
