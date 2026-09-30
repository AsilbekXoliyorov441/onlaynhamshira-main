import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF — WebP'dan ~20–30% kichik; qo'llamaydigan brauzerlarga WebP
    formats: ["image/avif", "image/webp"],
    // Optimallashtirilgan rasm nusxalari 30 kun keshda
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Fotosuratlar (yangiliklar, hero) q60 — farq sezilmaydi, hajm ~30% kam
    qualities: [60, 75],
  },
  // public/ dagi statik fayllar standart holatda max-age=0 bilan beriladi — har tashrifda qayta tekshiriladi.
  // 30 kun keshlaymiz. Faylni almashtirganda NOMINI o'zgartiring (masalan google-play-black.png kabi),
  // aks holda eski nusxa keshda qoladi.
  async headers() {
    const cache = [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }];
    return [
      { source: "/img/:path*", headers: cache },
      { source: "/services/:path*", headers: cache },
      { source: "/badges/:path*", headers: cache },
      { source: "/logo-v2.svg", headers: cache },
    ];
  },
};

export default nextConfig;
