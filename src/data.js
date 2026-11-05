const icon = (paths) =>
  `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

export const directions = [
  {
    title: "Telegram-боты",
    line: "Заявки, уведомления, админ-панель, оплата. Бот как полноценный интерфейс сервиса.",
    stack: "Python · aiogram",
    icon: icon('<rect x="4" y="7" width="16" height="12" rx="3"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M12 7V4"/><path d="M8 19v2M16 19v2"/>'),
  },
  {
    title: "Парсеры и данные",
    line: "Собираю и структурирую данные из любых источников.",
    stack: "requests · Playwright · BeautifulSoup",
    icon: icon('<path d="M8 4 3 12l5 8"/><path d="M16 4l5 8-5 8"/><path d="M13 6l-2 12"/>'),
  },
  {
    title: "Серверы и инфраструктура",
    line: "Надёжные окружения, которые не падают ночью.",
    stack: "Docker · Nginx · Linux",
    icon: icon('<rect x="4" y="4" width="16" height="7" rx="2"/><rect x="4" y="13" width="16" height="7" rx="2"/><path d="M8 7.5h.01M8 16.5h.01"/>'),
  },
  {
    title: "Автоматизация и интеграции",
    line: "Связываю сервисы и убираю ручную рутину.",
    stack: "n8n · API",
    icon: icon('<circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M8 6h8M7 8l4 8M17 8l-4 8"/>'),
  },
  {
    title: "Сайты и веб-приложения",
    line: "От лендинга до полноценного продукта с бэкендом.",
    stack: "WordPress · React · Next.js",
    icon: icon('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><circle cx="6" cy="6.5" r=".5"/><circle cx="8.5" cy="6.5" r=".5"/>'),
  },
  {
    title: "Мобильные приложения",
    line: "Одно приложение под iOS и Android.",
    stack: "Flutter · Dart",
    icon: icon('<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>'),
  },
  {
    title: "Смарт-контракты",
    line: "Логика и токены на Solidity.",
    stack: "Solidity",
    icon: icon('<path d="M12 3l7 4v10l-7 4-7-4V7z"/><path d="M12 8v8"/>'),
  },
  {
    title: "Системный и десктоп-код",
    line: "Утилиты и сервисы на C++, Bash, Node.js.",
    stack: "C++ · Bash · Node.js",
    icon: icon('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M12 15h5"/>'),
  },
  {
    title: "API и бэкенд",
    line: "Сервисы, которые держат нагрузку и не теряют данные.",
    stack: "Node.js · Python · SQL",
    icon: icon('<path d="M8 4c-2 0-3 1-3 3v3c0 1-1 2-2 2 1 0 2 1 2 2v3c0 2 1 3 3 3"/><path d="M16 4c2 0 3 1 3 3v3c0 1 1 2 2 2-1 0-2 1-2 2v3c0 2-1 3-3 3"/>'),
  },
  {
    title: "Базы данных",
    line: "Схемы, запросы, миграции и бэкапы.",
    stack: "PostgreSQL · MySQL · Redis",
    icon: icon('<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>'),
  },
  {
    title: "Лендинги и вёрстка",
    line: "Пиксель в пиксель, быстро, с анимациями.",
    stack: "HTML · CSS · JS",
    icon: icon('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M9 9h12"/>'),
  },
  {
    title: "ИИ-интеграции",
    line: "Подключаю модели к продукту и процессам.",
    stack: "API · LLM",
    icon: icon('<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/>'),
  },
  {
    title: "Любое направление",
    line: "Не нашли нужное? Сделаю и это.",
    stack: "любой стек под задачу",
    icon: icon('<path d="M12 4v16M4 12h16"/>'),
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
    name: "Ledger",
    solves: "Смарт-контракт токена на Solidity.",
    result: "Эмиссия и переводы on-chain.",
    stack: "Solidity",
  },
  {
    name: "DevOps AI Tutor",
    solves: "Тренажёр по DevOps с ИИ-наставником: роадмап, задачи, квизы.",
    result: "Учёба по плану, прогресс и ответы хранятся локально.",
    stack: "Node.js · Express · DeepSeek",
    href: "https://github.com/Qatrol/devops",
  },
  {
    name: "File Online Manager",
    solves: "Файловый менеджер в браузере: свои папки с любого устройства.",
    result: "Доступ к файлам без облака и подписок, плюс заметки и чат.",
    stack: "Node.js · Express · WebSocket",
    href: "https://github.com/Qatrol/fileonlinemanager",
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
  "Go",
  "Rust",
  "C++",
  "C#",
  "Dart",
  "PHP",
  "Solidity",
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
