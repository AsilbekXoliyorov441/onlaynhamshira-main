import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

// Barcha sahifalar indekslanadi; sitemap manzili ko'rsatiladi.
// Eski Tilda'dagi /tilda/* va texnik sahifa taqiqlari Next.js'da keraksiz (ular endi yo'q).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
