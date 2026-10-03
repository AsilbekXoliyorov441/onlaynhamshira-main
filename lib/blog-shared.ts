// Blog turlari va konstantalari — client komponentlar ham import qiladi (node:fs'siz)

import type { Locale } from "@/lib/i18n/config";

export type BlogTopic = "nurse" | "pressure" | "family" | "prevention" | "care" | "news";
export const BLOG_TOPICS: BlogTopic[] = ["nurse", "care", "family", "pressure", "prevention", "news"];

export type BlogImage = { src: string; srcSet?: string; width?: number; height?: number };

export type BlogEntry = {
  href: string;
  lang: Locale;
  title: string;
  excerpt: string;
  cover: BlogImage | null;
  topic: BlogTopic;
  minutes: number;
  /** Oxirgi yangilanish (sitemap'dagi lastmod, ISO) */
  updated?: string;
};

export type TocItem = { id: string; text: string };

// Oy nomlari qo'lda: brauzerlarda o'zbek tili uchun Intl ma'lumoti yo'q ("2026 M08 23"), server va client bir xil chiqarishi shart
const MONTHS: Record<Locale, string[]> = {
  uz: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"],
  ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

/** "22-avgust, 2026" / "22 августа 2026" / "22 August 2026" — Toshkent vaqti (UTC+5) bo'yicha */
export function formatDate(iso: string, lang: Locale) {
  const d = new Date(new Date(iso).getTime() + 5 * 3600_000);
  const [day, month, year] = [d.getUTCDate(), MONTHS[lang][d.getUTCMonth()], d.getUTCFullYear()];
  return lang === "uz" ? `${day}-${month}, ${year}` : `${day} ${month} ${year}`;
}
