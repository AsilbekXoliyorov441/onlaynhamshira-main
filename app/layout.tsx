import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { DownloadProvider } from "@/components/DownloadModal";
import { BackToTop, SmoothScroll } from "@/components/Motion";

const onest = Onest({
  // Faqat lotin oldindan yuklanadi (saytda kirill matn yo'q); qolganlari unicode-range orqali kerak bo'lsa yuklanadi
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onlaynhamshira.uz"),
  title: "Onlayn Hamshira - tibbiy yordam chaqirish 24/7 | Tez, qulay, xavfsiz!",
  description:
    "Toshkent, Nukus, Farg‘ona, Samarqand va Marg‘ilonda uyga shifokor va hamshira chaqiring. 24/7 tibbiy yordam va hamshiralik xizmatlari.",
  keywords: [
    "hamshira uyga chaqirish", "uyda hamshira xizmatlari", "kapelnitsa uyda",
    "uyda ukol qilish", "uyda bemor parvarishi", "tez hamshira chaqirish",
  ],
  alternates: { canonical: "/", languages: { uz: "/", ru: "/ru", en: "/en" } },
  openGraph: {
    title: "Onlayn Hamshira - tibbiy yordam chaqirish 24/7",
    description: "Tibbiy yordam uyingizda - tez, qulay, xavfsiz!",
    url: "https://onlaynhamshira.uz",
    type: "website",
    images: ["https://static.tildacdn.net/tild3462-3165-4335-b732-383031326461/photo.jpg"],
  },
  formatDetection: { telephone: false },
};

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={onest.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: CV_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <DownloadProvider>{children}</DownloadProvider>
        <SmoothScroll />
        <BackToTop />
      </body>
    </html>
  );
}
