import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Onest } from "next/font/google";
import "lenis/dist/lenis.css";
import "../globals.css";
import { DownloadProvider } from "@/components/DownloadModal";
import { BackToTop, SmoothScroll } from "@/components/Motion";
import { LOCALES, OG_LOCALE, hasLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

const onest = Onest({
  // Faqat lotin oldindan yuklanadi; kirill (ru) unicode-range orqali faqat kerak bo'lganda yuklanadi
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

// Har bir til build vaqtida statik HTML sifatida tayyorlanadi; boshqa segmentlar — 404
export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = await getDictionary(lang);
  return {
    metadataBase: new URL("https://onlaynhamshira.uz"),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: localePath(lang),
      languages: { ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l)])), "x-default": "/" },
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: localePath(lang),
      locale: OG_LOCALE[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      type: "website",
      images: ["https://static.tildacdn.net/tild3462-3165-4335-b732-383031326461/photo.jpg"],
    },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#38C5B1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Onlayn Hamshira",
  url: "https://onlaynhamshira.uz",
  telephone: "+998781139616",
  email: "info@onlaynhamshira.uz",
  openingHours: "Mo-Su 00:00-24:00",
  availableLanguage: ["uz", "ru", "en"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shahrisabz ko‘chasi 25, U-Enter",
    addressLocality: "Toshkent",
    addressCountry: "UZ",
  },
  areaServed: ["Toshkent", "Samarqand", "Farg‘ona", "Namangan", "Nukus", "Marg‘ilon"],
};

// html.js — reveal animatsiyalari uchun. html.cv-off — anchorga o'tishda content-visibility o'chadi
// (globals.css), aks holda chizilmagan bo'limlar sabab skroll noto'g'ri joyga tushadi
const CV_SCRIPT = `(function(h){h.classList.add('js');if(location.hash)h.classList.add('cv-off');
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href*="#"]');if(a&&a.hash)h.classList.add('cv-off')},true)})(document.documentElement)`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  return (
    <html lang={lang} className={onest.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: CV_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <DownloadProvider t={{ ...t.download, close: t.common.close, onlineApp: t.common.onlineApp }}>{children}</DownloadProvider>
        <SmoothScroll />
        <BackToTop label={t.common.backToTop} />
      </body>
    </html>
  );
}
