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
};

export type TocItem = { id: string; text: string };
