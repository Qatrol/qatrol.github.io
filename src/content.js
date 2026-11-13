/**
 * Контент сайта. Только данные — разметка живёт в render.js,
 * иконки в icons.js. Правки текста не должны требовать правок кода.
 */

export const directions = [
  {
    icon: "bot",
    title: "Telegram-боты",
    line: "Заявки, уведомления, админ-панель, оплата. Бот как полноценный интерфейс сервиса.",
    stack: "Python · aiogram",
  },
  {
    icon: "parser",
    title: "Парсеры и данные",
    line: "Собираю и структурирую данные из любых источников.",
    stack: "requests · Playwright · BeautifulSoup",
  },
  {
    icon: "server",
    title: "Серверы и инфраструктура",
    line: "Надёжные окружения, которые не падают ночью.",
    stack: "Docker · Nginx · Linux",
  },
  {
    icon: "automation",
    title: "Автоматизация и интеграции",
    line: "Связываю сервисы и убираю ручную рутину.",
    stack: "n8n · API",
  },
  {
    icon: "web",
    title: "Сайты и веб-приложения",
    line: "От лендинга до полноценного продукта с бэкендом.",
    stack: "WordPress · React · Next.js",
  },
  {
    icon: "mobile",
    title: "Мобильные приложения",
    line: "Одно приложение под iOS и Android.",
    stack: "Flutter · Dart",
  },
  {
    icon: "desktop",
    title: "Системный и десктоп-код",
    line: "Утилиты и сервисы на C++, Bash, Node.js.",
    stack: "C++ · Bash · Node.js",
  },
  {
    icon: "api",
    title: "API и бэкенд",
    line: "Сервисы, которые держат нагрузку и не теряют данные.",
    stack: "Node.js · Python · SQL",
  },
  {
    icon: "database",
    title: "Базы данных",
    line: "Схемы, запросы, миграции и бэкапы.",
    stack: "PostgreSQL · MySQL · Redis",
  },
  {
    icon: "landing",
    title: "Лендинги и вёрстка",
    line: "Пиксель в пиксель, быстро, с анимациями.",
    stack: "HTML · CSS · JS",
  },
  {
    icon: "ai",
    title: "ИИ-интеграции",
    line: "Подключаю модели к продукту и процессам.",
    stack: "API · LLM",
  },
  {
    icon: "plus",
    title: "Любое направление",
    line: "Не нашли нужное? Сделаю и это.",
    stack: "любой стек под задачу",
  },
];

export const projects = [
  {
    name: "Aurora Bot",
    solves: "Telegram-бот приёма заявок для сервисных компаний.",
    result: "Заявки падают в CRM, менеджеры получают уведомление за секунды.",
    stack: "Python · aiogram",
  },
  {
    name: "Market Scan",
    solves: "Парсер каталогов и цен конкурентов.",
    result: "Свежая таблица цен каждые полчаса, без рук.",
    stack: "Playwright · Google Sheets",
  },
  {
    name: "Deploy Kit",
    solves: "Развёртывание серверов под проекты.",
    result: "Окружение поднимается одной командой.",
    stack: "Docker · Nginx · Bash",
  },
  {
    name: "Flow",
    solves: "Автоматизация процессов и интеграций.",
    result: "Рутина уходит в сценарии n8n и API.",
    stack: "n8n · API",
  },
  {
    name: "Pathwright",
    solves: "Тренажёр по DevOps с ИИ-наставником: роадмап, задачи, квизы.",
    result: "Учёба по плану, прогресс и ответы хранятся локально.",
    stack: "Node.js · Express · DeepSeek",
    href: "https://github.com/Qatrol/pathwright",
  },
  {
    name: "Shelf",
    solves: "Файловый менеджер в браузере: свои папки с любого устройства.",
    result: "Доступ к файлам без облака и подписок, плюс заметки и чат.",
    stack: "Node.js · Express · WebSocket",
    href: "https://github.com/Qatrol/shelf",
  },
];

export const steps = [
  { title: "Задача", line: "Разбираем, что должно работать и для кого." },
  { title: "Договорённости", line: "Этапы, сроки, цена. Фиксируем до старта." },
  { title: "Разработка", line: "Делаю и показываю промежуточные версии." },
  { title: "Запуск и поддержка", line: "Выкатываю, слежу, правлю." },
];

export const stack = [
  "Python",
  "JavaScript",
  "TypeScript",
  "C++",
  "C#",
  "Dart",
  "PHP",
  "Bash",
  "SQL",
  "Linux",
  "Docker",
  "Kubernetes",
  "Nginx",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "MongoDB",
  "Git",
  "Node.js",
  "React",
  "Next.js",
  "Flutter",
  "WordPress",
  "n8n",
  "API",
  "и другие",
];

/** Текст для окна терминала. */
export const about = {
  who: "Qatrol. DevOps-инженер и разработчик: серверы, Docker, CI/CD, Nginx, автоматизация. Плюс боты, сайты, мобильные приложения и парсеры. Один человек на весь цикл.",
  contact: "Почта: sanyashurov@yandex.ru\nGitHub: https://github.com/Qatrol",
};
