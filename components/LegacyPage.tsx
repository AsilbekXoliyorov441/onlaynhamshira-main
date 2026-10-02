import { Phone } from "lucide-react";
import { LINKS } from "@/lib/data";
import type { Dict } from "@/lib/i18n/dictionaries/uz";
import { Logo } from "./StoreIcons";

/** Maqola oxiridagi konversiya bloki: onlayn chaqirish + telefon (tel: bosilishi Google Ads konversiyasi) */
export function LegacyCta({ t, cta }: { t: Dict["legacy"]; cta: string }) {
  return (
    <aside className="mx-auto mb-4 max-w-[860px] rounded-[28px] bg-mint p-6 sm:p-10">
      <p className="text-2xl font-bold tracking-tight sm:text-3xl">{t.ctaTitle}</p>
      <p className="mt-2 text-ink-soft">{t.ctaText}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={LINKS.webApp} className="rounded-full bg-brand-grad px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-105">
          {cta}
        </a>
        <a href={`tel:${LINKS.phone}`} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold ring-1 ring-line transition hover:ring-brand">
          <Phone className="size-4 text-brand-deep" /> {LINKS.phoneLabel}
        </a>
      </div>
    </aside>
  );
}

/**
 * Bosma materiallardagi QR kodlar (/qr … /qr8): Tilda'dagi kabi qurilmaga qarab do'konga yo'naltiradi.
 * Tilda'da yo'naltirish darhol bo'lardi va analitika ko'pincha yuklanib ulgurmasdi. Bu yerda GA "qr_scan"
 * hodisasi yuborilguncha (ko'pi bilan 1.5s) kutiladi — skanlar statistikada ko'rinadi.
 */
export function QrRedirect({
  code,
  target,
  home,
  t,
}: {
  code: string;
  target: { android: string; ios: string };
  home: string;
  t: Dict["legacy"];
}) {
  const script = `(function(){
var ua=navigator.userAgent.toLowerCase();
var url=ua.indexOf('android')>-1?${JSON.stringify(target.android)}:(/iphone|ipad|ipod/.test(ua)?${JSON.stringify(target.ios)}:${JSON.stringify(home)});
var done=false;function go(){if(done)return;done=true;location.replace(url);}
setTimeout(go,1500);
(function wait(n){if(typeof window.gtag==='function'){window.gtag('event','qr_scan',{qr_code:${JSON.stringify(code)},event_callback:go,event_timeout:1200});}else if(n<14){setTimeout(function(){wait(n+1)},100);}})(0);
})();`;
  return (
    <main className="grid min-h-dvh place-items-center bg-mist px-4">
      <div className="w-full max-w-sm rounded-[28px] bg-white p-8 text-center shadow-sm">
        <Logo className="mx-auto h-10" />
        <p className="mt-6 font-semibold">{t.qrRedirect}</p>
        <p className="mt-2 text-sm text-ink-soft">{t.qrManual}</p>
        <div className="mt-5 grid gap-2">
          <a href={target.android} className="rounded-full bg-ink px-5 py-3 font-semibold text-white">Google Play</a>
          <a href={target.ios} className="rounded-full bg-ink px-5 py-3 font-semibold text-white">App Store</a>
          <a href={home} className="rounded-full px-5 py-3 font-semibold ring-1 ring-line">onlaynhamshira.uz</a>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </main>
  );
}
