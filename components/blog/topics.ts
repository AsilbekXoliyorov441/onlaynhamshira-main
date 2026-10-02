import type { BlogTopic } from "@/lib/blog-shared";
import type { IconName } from "../Icon";

/** Mavzu ko'rinishi: kartochka foni (rasmsiz maqolalar uchun) va ikonka — sayt palitrasidan */
export const TOPIC_STYLE: Record<BlogTopic, { icon: IconName; tone: string; grad: string }> = {
  nurse: { icon: "nurse", tone: "bg-sky", grad: "from-[#5ab8f0] to-[#2f7fd6]" },
  care: { icon: "bed", tone: "bg-lilac", grad: "from-[#a98cf5] to-[#6a4fd8]" },
  family: { icon: "massage", tone: "bg-peach", grad: "from-[#ffb36b] to-[#f0785a]" },
  pressure: { icon: "heart", tone: "bg-[#ffe3ea]", grad: "from-[#ff6b8a] to-[#c2336a]" },
  prevention: { icon: "shield", tone: "bg-mint", grad: "from-[#3fe0a0] to-[#1aa6d9]" },
  news: { icon: "phone", tone: "bg-mist", grad: "from-[#38c5b1] to-[#0d619b]" },
};
