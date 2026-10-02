import Script from "next/script";
import { TRACKING } from "@/lib/seo/site";

// Eski Tilda saytidagi marketing/analitika kodlarining aynan nusxasi:
//   • Google Analytics 4 (G-MP5XEFGJRB)
//   • Google Ads (AW-17432829439) + "tel:" bosishdagi konversiya hodisasi
//   • Yandex Metrika (97597715, webvisor)
// strategy="afterInteractive" — sahifa interaktiv bo'lgach yuklanadi, LCP'ga xalaqit bermaydi.

const gaInit = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${TRACKING.ga4}');
gtag('config', '${TRACKING.googleAds}');
document.addEventListener('click', function(event){
  var link = event.target.closest && event.target.closest('a[href^="tel:"]');
  if (!link) return;
  gtag('event', 'conversion', {
    'send_to': '${TRACKING.callConversionLabel}',
    'value': 1.0,
    'currency': 'USD'
  });
});`;

const ymInit = `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
ym(${TRACKING.yandexMetrika}, "init", {clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`;

export function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING.ga4}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {gaInit}
      </Script>
      <Script id="ym-init" strategy="afterInteractive">
        {ymInit}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://mc.yandex.ru/watch/${TRACKING.yandexMetrika}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </noscript>
    </>
  );
}
