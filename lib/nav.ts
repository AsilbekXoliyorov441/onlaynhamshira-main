// Sayt navigatsiyasi — yagona manba (header, mobil menyu, footer).
// Har bir til o'z sahifasiga olib boradi: /ru dagi "Блог" → /ru/blog (o'zbekcha /blog emas).
// ⚠️ Yo'llar Tilda'dagi URL'lar (lib/seo/routes.ts) — yangi yo'l o'ylab topmang.

import { localePath, type Locale } from "@/lib/i18n/config";

/** Alohida sahifalar — har tilda mavjud manzili */
export const PAGES = {
  blog: { uz: "/blog", ru: "/ru/blog", en: "/en/blog" },
  partner: { uz: "/expert", ru: "/ru/expert", en: "/en/expert" },
  certificates: { uz: "/certificates", ru: "/ru/certificates", en: "/en/certificates" },
  why: { uz: "/onlayn-hamshira-vs-ananaviy", ru: "/onlayn-uhod-vs-tradicionnyj", en: "/online-nursing-vs-traditional" },
  // /contacts faqat o'zbekcha bor — ru/en uchun bosh sahifadagi aloqa bo'limi
  contacts: { uz: "/contacts", ru: "/ru#contact", en: "/en#contact" },
  privacy: { uz: "/privacy-policy", ru: "/ru/privacy-policy", en: "/en/privacy-policy" },
} satisfies Record<string, Record<Locale, string>>;

export type PageKey = keyof typeof PAGES;
export type SectionKey = "about" | "services" | "specialists" | "reviews" | "faq";
export type NavKey = SectionKey | PageKey;

export const pageHref = (key: PageKey, lang: Locale) => PAGES[key][lang];

/** Bosh sahifa bo'limi: bosh sahifaning o'zida "#faq", boshqa sahifalarda "/ru#faq" */
export const sectionHref = (id: SectionKey, lang: Locale, onHome: boolean) =>
  onHome ? `#${id}` : `${localePath(lang)}#${id}`;

/** Ichki sahifa guruhi (lib/seo/routes.ts) → header'da qaysi punkt faol */
export const NAV_KEY_BY_GROUP: Partial<Record<string, NavKey>> = {
  blogIndex: "blog",
  blogPost: "blog",
  article: "blog",
  expert: "partner",
  certificates: "certificates",
  contacts: "contacts",
  compare: "why",
};

/**
 * Header tuzilishi: boshqa sahifaga olib boradigan havolalar ochiq turadi,
 * bosh sahifa bo'limlariga skroll qiladiganlari — "Yana" ochiladigan ro'yxatida
 */
export const NAV_PRIMARY: NavKey[] = ["blog", "partner", "why", "certificates", "contacts"];
export const NAV_MORE: NavKey[] = ["services", "about", "specialists", "reviews", "faq"];

const SECTION_KEYS: SectionKey[] = ["about", "services", "specialists", "reviews", "faq"];
export const isSection = (k: NavKey): k is SectionKey => (SECTION_KEYS as string[]).includes(k);

export const navHref = (k: NavKey, lang: Locale, onHome: boolean) =>
  isSection(k) ? sectionHref(k, lang, onHome) : pageHref(k, lang);
