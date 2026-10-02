@AGENTS.md

# ⚠️ SEO — BUZILMASIN (marketing uchun eng muhim qoida)

onlaynhamshira.uz Tilda'dan ko'chirilgan. Google'dagi o'rinlar, Instagram botlar, bosma QR kodlar va
reklama kampaniyalari Tilda'dagi **aynan o'sha URL va metadata**ga bog'langan. Har qanday o'zgarish
(dizayn, refaktor, yangi bo'lim, kutubxona yangilash) shu qoidalarga zid bo'lmasligi shart.

## Har o'zgarishdan keyin — majburiy tekshiruv

```bash
npm run build && npm start        # boshqa terminalda (yoki: npx next start -p 3311)
npm run seo:check                 # yoki: node scripts/seo-check.mjs http://localhost:3311
```

`✓ SEO OK: 86 URL ...` chiqmaguncha ish tugagan hisoblanmaydi, commit/push qilinmaydi.
Skript 86 URL'ning title, description, keywords, canonical, og:*, hreflang qiymatlarini, tracking
kodlarini, JSON-LD, H1, sitemap va robots'ni Tilda asli (`docs/seo-baseline/expected-head.json`)
bilan solishtiradi. Uni "o'tishi uchun" o'zgartirmang, expected-head.json'ni ham tahrirlamang.
Qiymatni o'zgartirish kerak bo'lsa (marketing qarori bilan), alohida va aniq aytilgan holda o'zgartiring.

## O'ZGARTIRILMAYDIGAN narsalar

1. **URL yo'llari** — `lib/seo/routes.ts` dagi 86 ta yo'l (bosh sahifa + 83 ichki sahifa + /ru, /en).
   Birortasini o'chirmang, nomini o'zgartirmang, slash qo'shmang/olib tashlamang.
   QR yo'llari `/qr` … `/qr8` bosma materiallarda — ayniqsa tegmang.
2. **Metadata** — sahifalarniki `content/legacy/*.json` → `meta`, bosh sahifaniki
   `lib/i18n/dictionaries/{uz,ru,en}.ts` → `meta` (Tilda qiymatlari, keywords ham Tilda kesgan holida).
   "Yaxshiroq" qilish uchun ham qo'lda o'zgartirmang.
3. **Tracking** (`lib/seo/site.ts`, `components/Analytics.tsx`) — GA4 `G-MP5XEFGJRB`,
   Google Ads `AW-17432829439` + `tel:` konversiyasi, Yandex Metrika `97597715`,
   Google Search Console tasdig'i. ID'larni o'zgartirmang, `<Analytics />`ni layout'dan olib tashlamang.
   Kutubxonalar (gtag.js, tag.js) birinchi harakatda yoki 6 s dan keyin yuklanadi, hodisalar esa darhol
   navbatga yoziladi. Ularni yana `<head>`/afterInteractive'da to'g'ridan-to'g'ri yuklamang: Lighthouse
   Performance 40'larga, Best Practices 77 ga tushadi (third-party cookies). QR sahifalari darhol yuklaydi.
4. **JSON-LD** — layout'dagi MedicalBusiness (har sahifada) va `content/legacy/*.json` → `jsonLd`.
5. **sitemap.xml / robots.txt** — sitemap 86 URL'dan kam bo'lmasin; robots'da `Disallow: /` yoki
   `noindex` hech qachon bo'lmasin.
6. **Redirectlar** (`next.config.ts`) — `/uz`→`/`, ichki yo'l→tashqi yo'l, buzuq Tilda havolalari
   (`/politic` va boshq.). `trailingSlash` sozlamasini o'zgartirmang.

## Arxitektura (nima qayerda)

- Bosh sahifa: `app/[lang]/page.tsx` (uz `/` — rewrite orqali `/uz`).
- Qolgan 83 sahifa: `app/[lang]/[...slug]/page.tsx` + `content/legacy/*.json`
  (Tilda HTML'dan avtomatik olingan: `<head>` metadata, JSON-LD, tozalangan matn/rasmlar).
  Matnni tahrirlash mumkin, lekin `meta`, `jsonLd`, `path` maydonlariga tegmang.
- `lib/seo/legacy.ts` — tashqi URL ↔ ichki yo'l. Ba'zi uz-prefikssiz URL'larda ru/en kontent bor
  (masalan `/home-detox` → ichkarida `/en/home-detox`) — bu ataylab, `<html lang>` to'g'ri bo'lishi uchun.
  `routes.ts` dagi URL uchun sahifa topilmasa build ataylab to'xtaydi.
- Kontent rasmlari `public/legacy/` da (Tilda CDN'ga bog'liq emas). og:image esa Tilda'dagi URL'da qolgan.
- Asl Tilda ma'lumotlari: `docs/seo-baseline/` (README-SEO-MIGRATION.md — to'liq nazorat ro'yxati).

## Yangi sahifa qo'shilsa

Mavjud URL'lar o'zgarmaydi. Yangi sahifaga o'zining title, description, canonical va H1'ini bering,
uni `lib/seo/routes.ts` ga qo'shing (sitemap'ga shundan tushadi) va `seo:check`dan o'tkazing.

## Ataylab qoldirilgan Tilda xatolari (marketing qarori kutilmoqda — o'zboshimchalik bilan tuzatmang)

`/home-detox`, `/postoperative-care-at-home`, `/posleoperatsionnyy-uhod-doma` — canonical va title
detoks maqolasiga ko'rsatadi (Tilda'da ham shunday). Tuzatish faqat marketing roziligi bilan.
