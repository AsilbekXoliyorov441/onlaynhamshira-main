import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { preload } from "react-dom";
import Header from "@/components/Header";
import { Contact, Footer } from "@/components/Sections";
import { MobileCTA } from "@/components/Interactive";
import { LegacyCta, QrRedirect } from "@/components/LegacyPage";
import { OG_LOCALE, hasLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { findLegacyPage, legacyPages, slugOf } from "@/lib/seo/legacy";
import { NAV_KEY_BY_GROUP } from "@/lib/nav";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/site";

// Eski Tilda sahifalari: har biri build vaqtida statik HTML. Ro'yxatda yo'q yo'l — 404
export const dynamicParams = false;
export const generateStaticParams = () => legacyPages().map((pg) => ({ lang: pg.contentLang, slug: slugOf(pg) }));

/** Tilda'dagi QR kodlar: Android → Google Play, iOS → App Store, qolganlar → bosh sahifa */
const QR_TARGETS: Record<string, { android: string; ios: string }> = {
  client: {
    android: "https://play.google.com/store/apps/details?id=uz.teamwork.onlinehamshiraclient&hl=ru&gl=US",
    ios: "https://apps.apple.com/uz/app/onlayn-hamshira/id6529538342",
  },
  // /qr2 — mutaxassislar (hamshiralar) ilovasi
  specialist: {
    android: "https://play.google.com/store/apps/details?id=uz.teamwork.onlinehamshiramutaxassis",
    ios: "https://apps.apple.com/uz/app/onlayn-hamshira-mutaxassis/id6590618718",
  },
};

// Tilda'dagi <meta name="robots"> qiymati ("index, follow") → Next.js formati
const parseRobots = (v: string | null): Metadata["robots"] => {
  if (!v) return undefined;
  const parts = v.split(",").map((s) => s.trim().toLowerCase());
  return { index: !parts.includes("noindex"), follow: !parts.includes("nofollow") };
};

const firstImage = (html: string) => {
  const m = html.match(/<img[^>]*\ssrc="(\/legacy\/[^"]+)"/);
  return m ? m[1] : null;
};

export async function generateMetadata({ params }: PageProps<"/[lang]/[...slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const pg = findLegacyPage(lang, slug);
  if (!pg || !hasLocale(lang)) return {};
  const { meta } = pg;
  const title = meta.title ?? meta.og.title ?? "Onlayn Hamshira";
  // ⚠️ Barcha qiymatlar Tilda <head>'idan aynan olingan (docs/seo-baseline) — o'zgartirmang.
  // Layout'dagi bosh sahifa qiymatlari meros bo'lib qolmasligi uchun yo'q maydonlar null qilinadi.
  return {
    title: { absolute: title },
    description: meta.description,
    keywords: meta.keywords,
    robots: parseRobots(meta.robots),
    alternates: {
      canonical: meta.canonical ?? pg.path,
      languages: Object.keys(meta.hreflang).length ? meta.hreflang : undefined,
    },
    openGraph: {
      url: meta.og.url ?? pg.path,
      title: meta.og.title ?? title,
      description: meta.og.description ?? meta.description ?? undefined,
      type: "website",
      locale: OG_LOCALE[pg.contentLang],
      siteName: "Onlayn Hamshira",
      // Tilda'da og:image yo'q 12 sahifaga — sahifa rasmi yoki saytning standart rasmi
      images: [meta.og.image ?? firstImage(pg.html) ?? DEFAULT_OG_IMAGE],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LegacyRoute({ params }: PageProps<"/[lang]/[...slug]">) {
  const { lang, slug } = await params;
  const pg = findLegacyPage(lang, slug);
  if (!pg || !hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const home = localePath(lang);

  // Birinchi rasm odatda LCP: <head>'da oldindan yuklash — HTML'ni oxirigacha o'qishni kutmaydi
  const lcp = pg.group !== "qr" && pg.html.match(/<img fetchpriority="high"[^>]*>/)?.[0];
  if (lcp) {
    const at = (n: string) => lcp.match(new RegExp(`\\s${n}="([^"]*)"`))?.[1];
    const src = at("src");
    if (src) preload(src, { as: "image", fetchPriority: "high", imageSrcSet: at("srcset"), imageSizes: at("sizes") });
  }

  const jsonLd = pg.jsonLd.length ? (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(pg.jsonLd.length === 1 ? pg.jsonLd[0] : pg.jsonLd).replace(/</g, "\\u003c") }}
    />
  ) : null;

  if (pg.group === "qr") {
    const target = pg.path === "/qr2" ? QR_TARGETS.specialist : QR_TARGETS.client;
    return (
      <>
        {jsonLd}
        <QrRedirect code={pg.path.slice(1)} target={target} home={home} t={t.legacy} />
      </>
    );
  }

  return (
    <>
      {jsonLd}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white">
        {t.common.skipToContent}
      </a>
      <Header lang={lang} t={t.header} common={t.common} home={home} current={NAV_KEY_BY_GROUP[pg.group]} />
      <main id="main" className="px-4 pt-[calc(72px+env(safe-area-inset-top))] sm:px-6">
        <article className="legacy-prose mx-auto max-w-[860px] py-10 sm:py-14" dangerouslySetInnerHTML={{ __html: pg.html }} />
        {pg.group !== "legal" && <LegacyCta t={t.legacy} cta={t.common.callNurse} />}
      </main>
      {pg.group === "contacts" && (
        <div className="mt-10">
          <Contact t={t.contact} map={t.map} />
        </div>
      )}
      <div className="h-10" />
      <Footer t={t.footer} common={t.common} lang={lang} home={home} />
      <MobileCTA t={t.mobileCta} cta={t.common.callNurse} />
    </>
  );
}
