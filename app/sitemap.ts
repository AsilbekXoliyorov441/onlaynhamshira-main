import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";
import { liveRoutes } from "@/lib/seo/routes";

// Sitemap FAQAT tayyor (status: "live") sahifalarni chiqaradi — 404 beradigan
// URL hech qachon sitemap'ga qo'shilmaydi. Yangi sahifa qurilgach, uni
// lib/seo/routes.ts da "live" ga o'tkazing, shunda u avtomatik paydo bo'ladi.

const abs = (p: string) => (p === "/" ? SITE_URL : `${SITE_URL}${p}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = liveRoutes();

  // Bosh sahifa klasteri (uz/ru/en): asl Tilda sitemap'idagi kabi har biri alohida <loc>,
  // o'zaro hreflang alternatlari bilan
  const homeLanguages = { uz: abs("/"), ru: abs("/ru"), en: abs("/en"), "x-default": abs("/") };
  const entries: MetadataRoute.Sitemap = routes
    .filter((r) => r.group === "home")
    .map((r) => ({
      url: abs(r.path),
      lastModified: r.lastmod,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: homeLanguages },
    }));

  // Qolgan tayyor sahifalar (bosh sahifa klasteridan tashqari)
  for (const r of routes) {
    if (r.group === "home") continue;
    entries.push({
      url: abs(r.path),
      lastModified: r.lastmod,
      changeFrequency: r.group === "blogPost" || r.group === "article" ? "monthly" : "weekly",
      priority: r.group.startsWith("blog") ? 0.7 : 0.6,
    });
  }

  return entries;
}
