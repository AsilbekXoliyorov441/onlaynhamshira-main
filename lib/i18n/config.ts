export const LOCALES = ["uz", "ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "uz";

export const hasLocale = (l: string): l is Locale => (LOCALES as readonly string[]).includes(l);

/** Standart til (uz) prefikssiz: "/" — qolganlari "/ru", "/en" */
export const localePath = (l: Locale) => (l === DEFAULT_LOCALE ? "/" : `/${l}`);

/** Til almashtirgichdagi nomlar — har biri o'z tilida yoziladi */
export const LOCALE_NAMES: Record<Locale, string> = { uz: "O‘zbekcha", ru: "Русский", en: "English" };

export const OG_LOCALE: Record<Locale, string> = { uz: "uz_UZ", ru: "ru_RU", en: "en_US" };
