import type { Locale } from "./config";

// Lug'atlar faqat serverda yuklanadi; client komponentlarga faqat kerakli qismi prop sifatida beriladi
const dictionaries = {
  uz: () => import("./dictionaries/uz").then((m) => m.default),
  ru: () => import("./dictionaries/ru").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

export const getDictionary = (l: Locale) => dictionaries[l]();
