# onlaynhamshira.uz — SEO / Marketing migratsiya nazorat ro'yxati

Tilda saytidan Next.js'ga o'tishda **o'zgarmasligi shart** bo'lgan hamma narsa.
Barchasi saytning ochiq sahifalaridan yig'ildi (login kerak bo'lmadi).
Sana: 2026-10-02. Jami tekshirilgan URL: 94 (86 jonli + 4 texnik + 4 ta 404).

## Fayllar
| Fayl | Mazmuni |
|---|---|
| `seo-metadata.json` | 86 jonli sahifa, URL yo'li bo'yicha — Next.js `generateMetadata` uchun tayyor |
| `seo-baseline.csv` | Marketing uchun jadval (Excel) |
| `seo-baseline-full.json` | Hamma xom ma'lumot (404 lar ham) |
| `sitemap-original.xml` | Asl sitemap |
| `robots-original.txt` | Asl robots.txt |

---

## 1. URL yo'llari — HAMMASI xuddi shunday saqlanishi SHART
Instagram botlar va tashqi havolalar shu manzillarga ulangan. **Bitta ham o'zgarmasligi kerak.**

- URL tuzilishi bir xil EMAS: ba'zi maqolalar `/blog/...` ichida, ba'zilari ildizda
  (masalan `/uyda-qon-bosimini-olchash-va-nazorat-qilish`, `/home-detox`, `/kapelnitsa-nima-qachon-kerak`).
  Har birini aynan o'z yo'lida qoldiring.
- Til versiyalari: `/` (uz), `/ru`, `/en` prefikslari bilan.
- QR sahifalari `/qr`, `/qr2` … `/qr8` — bosma materiallarga (vizitka, flayer, stiker, dorhenger, vobler, o'rgimchak) ulangan. **Albatta saqlansin.**
- To'liq ro'yxat `seo-metadata.json` kalitlarida.

### trailing slash
- `http://` va `www.` → `https://onlaynhamshira.uz/` ga **301** redirect qiladi (saqlansin).
- URL `/` bilan ham, `/` siz ham 200 qaytaradi. Next.js `trailingSlash` sozlamasi buni buzmasligi kerak — ikkala holat ham ishlashi shart.

---

## 2. Har bir sahifada saqlanadigan metadata teglari
`seo-metadata.json` da har bir URL uchun to'liq bor:
- `<title>`
- `<meta name="description">` — 1 tadan tashqari hammasida bor
- `<meta name="keywords">` — 33 sahifada bor (bor joyida saqlansin)
- `<link rel="canonical">` — hammasida bor (pastdagi xatolarga e'tibor bering)
- Open Graph: `og:url`, `og:title`, `og:description`, `og:type`, `og:image` (74 sahifada)
- `<meta itemprop="image">` — 24 sahifada
- `hreflang` bog'lanishlari: `uz`, `ru`, `en`, `x-default`
- `<html lang>` — faqat 18 sahifada bor; qolgan 76 tada yo'q (quyida)

**Yo'q, lekin qo'shilsa foydali (hozir Tilda'da yo'q):** Twitter Card teglari va `og:site_name` hech bir sahifada yo'q. Bular yo'qligi SEO'ni buzmaydi, lekin Next.js'da qo'shish ijtimoiy tarmoq ulashuvini yaxshilaydi.

---

## 3. Marketing / kuzatuv kodlari — HAMMA sahifada bo'lishi SHART
Bular 94 sahifaning hammasida bir xil:

| Nima | Qiymat | Eslatma |
|---|---|---|
| Google Analytics (GA4) | `G-MP5XEFGJRB` | Har sahifada |
| Yandex Metrika | `97597715` | Har sahifada |
| Google Site Verification | `EVBVxL3PtTQMVXOX-ZGZtYCH8kGH0vyVIby_P5xXbWU` | `<meta>` teg, Search Console egalik tasdig'i — O'CHIRILMASIN |
| Facebook Pixel | — | Topilmadi (ochiq kodda yo'q) |
| Google Tag Manager | — | Topilmadi |

> GA va Yandex o'sha ID'lar bilan ko'chirilsa, tarixiy statistika uzilmaydi.
> Google Site Verification meta tegi o'chsa — Search Console egalik tasdiqi yo'qoladi.

---

## 4. Strukturali ma'lumot (JSON-LD Schema) — saqlansin
Google natijalarida boy ko'rinish (rich results) shu teglarga bog'liq:
- `MedicalBusiness` — **hamma** sahifada
- `Article` / `BlogPosting` — 25 ta maqolada
- `FAQPage` — 11 ta sahifada (Google'da "savol-javob" ko'rinishi)

To'liq JSON-LD har sahifa uchun `seo-metadata.json` → `jsonLd` maydonida.

---

## 5. robots.txt va sitemap.xml — ko'chiring
- `robots-original.txt`: `/tilda/*` va 3 texnik sahifa yopilgan. Next.js'da texnik Tilda yo'llari endi bo'lmaydi, lekin **Sitemap qatori saqlansin**.
- `sitemap-original.xml`: 86 URL. Next.js o'z sitemap'ini yaratganda **shu 86 URL kamaymasligi** kerak.

---

## 6. ⚠️ Tilda'dagi mavjud XATOLAR — ko'chirishdan oldin qaror qiling
Bular hozir saytda buzuq. "O'zgartirmaslik" talabiga qarshi — marketing bilan kelishib oling:

**a) Noto'g'ri canonical (boshqa sahifaga ko'rsatadi):**
- `/home-detox` → canonical `/blog/uy-sharoitida-detoks`
- `/postoperative-care-at-home` → canonical `/blog/uy-sharoitida-detoks`
- `/posleoperatsionnyy-uhod-doma` → ikkita canonical bor (`/detoks-v-domashnih-usloviyah` va `/ru/blog/uhod-posle-operatsii-doma`)

**b) Nusxa ko'chirilgan title (detoks maqolasidan):**
- `/postoperative-care-at-home` va `/home-detox` — title detoks haqida
- `/posleoperatsionnyy-uhod-doma` — title detoks haqida

**c) 404 beradigan ichki havolalar** (saytning o'zidagi linklar buzuq):
- `/politic`, `/ru/politic`, `/en/politic` → to'g'risi `/hamshirapolitic`, `/ru/politichamshira`, `/nurse-politic`
- `/chaqaloq-parvarishi-yangi-onalar-uchun` → to'g'risi `/blog/chaqaloq-parvarishi-yangi-onalar-uchun`

> Next.js'da bularni to'g'ri sahifaga **301 redirect** qilsangiz, SEO'ga foyda (hozir yo'qolgan "link juice" tiklanadi), eski URL'lar ham ishlayveradi.

**d) `<html lang>` yo'q** — 76 sahifada. Next.js'da til bo'yicha (`uz`/`ru`/`en`) to'g'ri qo'yish tavsiya etiladi.

**e) og:image yo'q** — 12 sahifada (ro'yxat `seo-baseline-full.json` da). Ijtimoiy ulashuvda rasm chiqmaydi.

---

## 7. Men ola olmagan narsa (faqat Tilda panelida ko'rinadi)
Bular ochiq saytda ko'rinmaydi — ularni **o'zingiz Tilda panelidan** olib bering:

1. **Qo'lda yozilgan 301 redirect'lar** — Tilda panel → Site Settings → **More → Redirects (301)**.
   Agar u yerda redirect'lar bo'lsa, ularning HAMMASINI Next.js `next.config` ichiga ko'chirish shart.
2. **Forma integratsiyalari** — formalar qayerga yuboriladi (Telegram bot, email, CRM, AmoCRM...).
   Panel → forma bloki → Content/Receivers. Lead'lar uzilmasligi uchun shu ulanishlar Next.js'da qayta sozlanishi kerak.
3. **404 sahifa sozlamasi** va **domen/DNS** sozlamalari.

> Panelidan bu uch bo'limning skrinshotini yoki matnini bersangiz, men ularni ham Next.js formatiga o'tkazib beraman.

---

## Yakuniy nazorat (deploy oldidan)
- [ ] 86 URL ham aynan o'sha yo'lda ochiladi
- [ ] Har sahifada title/description/canonical/OG asl holida
- [ ] hreflang (uz/ru/en/x-default) bor
- [ ] GA `G-MP5XEFGJRB` + Yandex `97597715` + google-site-verification bor
- [ ] JSON-LD (MedicalBusiness/Article/FAQ) bor
- [ ] sitemap.xml 86 URL, robots.txt Sitemap qatori bor
- [ ] `http`/`www` → `https` 301 ishlaydi
- [ ] Tilda paneldagi qo'lda redirect'lar ko'chirildi
- [ ] Forma integratsiyalari qayta ulandi
