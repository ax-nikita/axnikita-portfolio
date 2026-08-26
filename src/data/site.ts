export type PageKey = "about" | "web" | "gamedev";

export const navigation = [
  { key: "about", href: "/", ru: "Обо мне", en: "About" },
  { key: "web", href: "/web/", ru: "WEB", en: "WEB" },
  { key: "gamedev", href: "/gamedev/", ru: "GameDev", en: "GameDev" },
] as const;

export const footerCopy = {
  about: {
    eyebrow: { ru: "Контакты / работа", en: "Contact / work" },
    title: { ru: "Проект или вакансия?", en: "Project or role?" },
    accent: { ru: "Обсудим.", en: "Let's talk." },
    text: {
      ru: "Опишите задачу, текущий стек или роль — отвечу по существу.",
      en: "Send the task, current stack or role details — I'll reply with the relevant specifics.",
    },
  },
  web: {
    eyebrow: { ru: "Контакты / WEB", en: "Contact / WEB" },
    title: { ru: "Нужен WEB-разработчик?", en: "Need a WEB developer?" },
    accent: { ru: "Обсудим.", en: "Let's talk." },
    text: {
      ru: "PHP, JavaScript, WordPress, production, legacy и интеграции.",
      en: "PHP, JavaScript, WordPress, production, legacy and integrations.",
    },
  },
  gamedev: {
    eyebrow: { ru: "GameDev / systems / tooling", en: "GameDev / systems / tooling" },
    title: { ru: "Нужен systems-разработчик?", en: "Need a systems developer?" },
    accent: { ru: "Обсудим задачу.", en: "Let's talk." },
    text: {
      ru: "Game systems, balance, modding и инструменты для большого объёма контента.",
      en: "Game systems, balance, modding and tooling for large amounts of content.",
    },
  },
} as const;
