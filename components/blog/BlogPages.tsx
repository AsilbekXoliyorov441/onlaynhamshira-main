import { preload } from "react-dom";
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarCheck, ChevronRight, Clock3, Phone, ShieldCheck, Siren, Stethoscope } from "lucide-react";
import { LINKS, STATS } from "@/lib/data";
import { blogEntries, formatDate, parseArticle, relatedEntries, type BlogImage } from "@/lib/blog";
import { fill } from "@/lib/i18n/format";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries/uz";
import { pageHref } from "@/lib/nav";
import { SITE_URL } from "@/lib/seo/site";
import type { LegacyPage } from "@/lib/seo/legacy";
import { IconTile } from "../Icon";
import { LegacyCta } from "../LegacyPage";
import { BlogCard } from "./BlogCard";
import { BlogIndex } from "./BlogIndex";
import { BlogShare } from "./BlogShare";
import { BlogToc } from "./BlogToc";
import { Cover } from "./Cover";
import { YouTubeFacade } from "./YouTubeFacade";
import { TOPIC_STYLE } from "./topics";

/** LCP rasmi <head>'da oldindan yuklanadi — HTML'ni oxirigacha o'qishni kutmaydi */
const preloadImage = (img: BlogImage | null, sizes: string) => {
  if (img) preload(img.src, { as: "image", fetchPriority: "high", imageSrcSet: img.srcSet, imageSizes: sizes });
};

const PRINCIPLE_ICONS = [Stethoscope, ShieldCheck, BadgeCheck];
/** 13500 → "13 500" (bosh sahifadagi hisoblagich bilan bir xil ko'rinish) */
const num = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");

const FEATURED_SIZES = "(min-width: 1024px) 720px, calc(100vw - 32px)";
const COVER_SIZES = "(min-width: 1248px) 1200px, calc(100vw - 32px)";

/* ───────── /blog ───────── */
export function BlogIndexPage({ pg, t, lang }: { pg: LegacyPage; t: Dict; lang: Locale }) {
  const b = t.blog;
  const entries = blogEntries(pg);
  const lastUpdate = entries.reduce<string | undefined>((m, e) => (e.updated && (!m || e.updated > m) ? e.updated : m), undefined);
  // H1 matni Tilda'dagidek ("Yangiliklar" / "Новости" / "News")
  const h1 = pg.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, "").trim() ?? b.label;
  preloadImage(entries[0]?.cover ?? null, FEATURED_SIZES);

  return (
    <>
      <section className="px-3 sm:px-4">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-[linear-gradient(150deg,#ecfbef_0%,#e4f6f4_45%,#dcf1fb_100%)] px-6 py-12 sm:px-12 sm:py-16 lg:py-20">
          <div aria-hidden className="pointer-events-none absolute -top-32 -left-24 size-[420px] rounded-full bg-brand/25 blur-[100px]" />
          <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-32 size-[440px] rounded-full bg-brand-blue/25 blur-[110px]" />
          <div className="dots pointer-events-none absolute inset-0 opacity-70" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-brand-deep ring-1 ring-white backdrop-blur">
                <span className="size-1.5 rounded-full bg-brand-deep" /> {b.label}
              </p>
              <h1 className="mt-5 text-[clamp(38px,9vw,72px)] leading-[1] font-bold tracking-[-0.035em]">{h1}</h1>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft sm:text-xl">{b.lead}</p>

              {/* Raqamlar: bosh sahifadagi bilan bir xil manba (lib/data.ts → STATS) */}
              <dl className="mt-8 grid max-w-[560px] grid-cols-3 divide-x divide-ink/10 rounded-2xl bg-white/70 py-4 ring-1 ring-white backdrop-blur">
                {[
                  { v: `${num(STATS[0].value)}${STATS[0].suffix}`, l: t.stats.items[0] },
                  { v: `${num(STATS[2].value)}${STATS[2].suffix}`, l: t.stats.items[2] },
                  { v: String(entries.length), l: b.articles },
                ].map((s) => (
                  <div key={s.l} className="flex flex-col-reverse justify-end gap-1.5 px-3 sm:px-5">
                    <dt className="text-[12px] leading-snug text-ink-soft hyphens-auto [overflow-wrap:anywhere] sm:text-[13px]">{s.l}</dt>
                    <dd className="text-[clamp(20px,5vw,28px)] leading-none font-bold tracking-tight tabular-nums">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Tahririyat tamoyillari — maqolalar kim tomonidan va qanday tayyorlanadi */}
            <aside aria-labelledby="principles-h" className="rounded-[28px] bg-white p-6 shadow-[0_30px_60px_-34px_rgb(16_41_58/0.45)] ring-1 ring-white sm:p-7">
              <div className="flex items-center gap-3">
                <span aria-hidden className="grid size-11 place-items-center rounded-2xl bg-mint">
                  {/* eslint-disable-next-line @next/next/no-img-element -- kichik SVG logo */}
                  <img src="/img/map-pin.svg" alt="" width={34} height={42} className="h-6 w-auto" />
                </span>
                <div>
                  <h2 id="principles-h" className="text-lg leading-tight font-semibold tracking-tight">{b.principlesTitle}</h2>
                  <p className="text-[13px] text-ink-soft">{b.byline}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-3 sm:space-y-4">
                {b.principles.map((it, i) => {
                  const Ico = PRINCIPLE_ICONS[i];
                  return (
                    <li key={it.title} className="flex items-center gap-3 sm:items-start">
                      <span aria-hidden className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-mist text-brand-deep">
                        <Ico className="size-4.5" />
                      </span>
                      <div>
                        <p className="font-semibold">{it.title}</p>
                        <p className="mt-0.5 text-[14px] leading-relaxed text-ink-soft max-sm:hidden">{it.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-[13px]">
                {lastUpdate && (
                  <span className="inline-flex items-center gap-1.5 text-ink-soft">
                    <CalendarCheck className="size-4" aria-hidden />
                    <time dateTime={lastUpdate}>{fill(b.lastUpdate, { d: formatDate(lastUpdate, lang) })}</time>
                  </span>
                )}
                <a href={pageHref("certificates", lang)} className="inline-flex items-center gap-1 font-semibold text-brand-deep hover:underline">
                  {b.docsLink} <ArrowRight className="size-3.5" aria-hidden />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section aria-label={b.allPosts} className="mx-auto max-w-[1320px] px-4 pb-16 sm:px-6 sm:pb-24">
        <BlogIndex entries={entries} t={b} />
      </section>
      <div className="px-4 sm:px-6">
        <LegacyCta t={t.legacy} cta={t.common.callNurse} />
      </div>
    </>
  );
}

/* ───────── /blog/:id va maqolalar ───────── */
export function BlogPostPage({ pg, t, lang }: { pg: LegacyPage; t: Dict; lang: Locale }) {
  const b = t.blog;
  const { title, cover, body, toc, entry } = parseArticle(pg);
  const related = relatedEntries(pg);
  const blogHref = pageHref("blog", lang);
  const style = TOPIC_STYLE[entry.topic];
  preloadImage(cover, COVER_SIZES);

  return (
    <>
      <article>
        {/* Sarlavha, muqova va matn bir xil kenglikdagi konteynerda — chap chetlari bir chiziqda */}
        <header className="mx-auto max-w-[1248px] px-4 sm:px-6">
          <div className="pt-6 sm:pt-10">
            <nav aria-label={b.breadcrumb}>
              <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-soft">
                <li><a href={localePath(lang)} className="rounded px-1 py-1 hover:text-ink">{b.home}</a></li>
                <li aria-hidden><ChevronRight className="size-4" /></li>
                <li><a href={blogHref} className="rounded px-1 py-1 hover:text-ink">{b.label}</a></li>
                <li aria-hidden className="max-sm:hidden"><ChevronRight className="size-4" /></li>
                <li className="max-w-[40ch] truncate px-1 font-medium text-ink max-sm:hidden" aria-current="page">{title}</li>
              </ol>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm sm:mt-8">
              <a href={blogHref} className={`inline-flex items-center gap-2 rounded-full ${style.tone} py-1.5 pr-3.5 pl-1.5 font-semibold transition hover:brightness-95`}>
                <IconTile name={style.icon} size={26} className="rounded-full!" /> {b.topics[entry.topic]}
              </a>
            </div>
            <h1 className="mt-5 max-w-[24ch] text-[clamp(28px,6.2vw,54px)] leading-[1.08] font-bold tracking-[-0.03em] text-balance">{title}</h1>
            {entry.excerpt && <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink-soft sm:text-xl">{entry.excerpt}</p>}

            {/* Muallif (tahririyat), yangilangan sana, o'qish vaqti */}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5 text-sm">
              <span className="flex items-center gap-3">
                <span aria-hidden className="grid size-11 place-items-center rounded-full bg-mint ring-4 ring-mint/40">
                  {/* eslint-disable-next-line @next/next/no-img-element -- kichik SVG logo */}
                  <img src="/img/map-pin.svg" alt="" width={34} height={42} className="h-6 w-auto" />
                </span>
                <span>
                  <span className="flex items-center gap-1 font-semibold">
                    {b.byline} <BadgeCheck className="size-4 text-brand-deep" aria-hidden />
                  </span>
                  <span className="block text-[13px] text-ink-soft">{b.bylineNote}</span>
                </span>
              </span>
              <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-ink-soft">
                {entry.updated && (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarCheck className="size-4" aria-hidden />
                    <time dateTime={entry.updated}>{fill(b.updated, { d: formatDate(entry.updated, entry.lang) })}</time>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="size-4" aria-hidden /> {fill(b.minutes, { n: entry.minutes })}
                </span>
              </span>
            </div>
          </div>
        </header>

        {cover && (
          <div className="mx-auto mt-8 max-w-[1248px] px-4 sm:mt-10 sm:px-6">
            <div className="overflow-hidden rounded-[28px] bg-mist sm:rounded-[36px]">
              <Cover img={cover} topic={entry.topic} priority sizes={COVER_SIZES} className="max-h-[560px]" />
            </div>
          </div>
        )}

        <div className="mx-auto mt-10 grid max-w-[1248px] gap-10 px-4 sm:mt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div className="min-w-0">
            {toc.length > 1 && (
              <details className="group mb-8 rounded-[22px] bg-mist p-1 lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-[18px] px-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
                  {b.toc}
                  <ChevronRight className="size-5 transition-transform group-open:rotate-90" aria-hidden />
                </summary>
                <ol className="list-decimal space-y-1 px-4 pt-1 pb-4 pl-9 text-[15px] marker:font-semibold marker:text-brand-deep">
                  {toc.map((i) => (
                    <li key={i.id}><a href={`#${i.id}`} className="block py-1 text-ink-soft hover:text-ink">{i.text}</a></li>
                  ))}
                </ol>
              </details>
            )}

            <div className="legacy-prose blog-prose max-w-[740px]" dangerouslySetInnerHTML={{ __html: body }} />
            {body.includes("yt-facade") && <YouTubeFacade />}

            {/* Maqola haqida: kim tayyorlagan, ogohlantirish, rasmiy hujjatlar */}
            <aside aria-labelledby="about-h" className="mt-12 max-w-[740px] overflow-hidden rounded-[24px] ring-1 ring-line">
              <div className="flex gap-4 bg-mist/60 p-5 sm:p-6">
                <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white ring-1 ring-line">
                  {/* eslint-disable-next-line @next/next/no-img-element -- kichik SVG logo */}
                  <img src="/img/map-pin.svg" alt="" width={34} height={42} className="h-7 w-auto" />
                </span>
                <div className="min-w-0">
                  <h2 id="about-h" className="font-semibold">{b.aboutTitle}</h2>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{b.aboutText}</p>
                </div>
              </div>
              <ul className="divide-y divide-line text-[14px] leading-relaxed">
                <li className="flex gap-3 px-5 py-3.5 sm:px-6">
                  <Stethoscope className="mt-0.5 size-4.5 shrink-0 text-brand-deep" aria-hidden />
                  <span className="text-ink-soft">{b.disclaimer}</span>
                </li>
                <li className="flex gap-3 px-5 py-3.5 sm:px-6">
                  <Siren className="mt-0.5 size-4.5 shrink-0 text-[#c0392b]" aria-hidden />
                  <span className="font-medium text-[#a52a2a]">{t.booking.emergency}</span>
                </li>
                <li className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 sm:px-6">
                  <span className="flex gap-3">
                    <ShieldCheck className="mt-0.5 size-4.5 shrink-0 text-brand-deep" aria-hidden />
                    <span className="text-ink-soft">{t.certificates.company}</span>
                  </span>
                  <a href={pageHref("certificates", lang)} className="inline-flex items-center gap-1 font-semibold text-brand-deep hover:underline">
                    {b.docsLink} <ArrowRight className="size-3.5" aria-hidden />
                  </a>
                </li>
              </ul>
            </aside>
            <div className="mt-8 flex max-w-[740px] flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <a href={blogHref} className="inline-flex items-center gap-2 rounded-full px-1 py-2 font-semibold transition hover:text-brand-deep">
                <ArrowLeft className="size-5" aria-hidden /> {b.allPosts}
              </a>
              <BlogShare url={SITE_URL + pg.path} title={title} t={b} />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {toc.length > 1 && <BlogToc items={toc} title={b.toc} />}
              <div className="relative overflow-hidden rounded-[28px] bg-ink p-6 text-white">
                <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-brand/25 blur-3xl" />
                <IconTile name="nurse" size={52} className="relative" />
                <p className="relative mt-5 text-xl font-semibold tracking-tight">{b.sideTitle}</p>
                <p className="relative mt-2 text-[15px] leading-relaxed text-white/75">{b.sideText}</p>
                <a href={LINKS.webApp} className="relative mt-5 flex items-center justify-center gap-2 rounded-2xl bg-brand-grad py-3.5 font-semibold transition hover:brightness-105">
                  {t.common.callNurse} <ArrowRight className="size-4" aria-hidden />
                </a>
                <a href={`tel:${LINKS.phone}`} className="relative mt-2 flex items-center justify-center gap-2 rounded-2xl py-2.5 text-[15px] font-medium text-white/85 transition hover:text-white">
                  <Phone className="size-4" aria-hidden /> {LINKS.phoneLabel}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <div className="mt-16 px-0 sm:mt-20">
        <LegacyCta t={t.legacy} cta={t.common.callNurse} />
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-h" className="mx-auto mt-16 max-w-[1248px] px-4 sm:mt-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="related-h" className="text-[clamp(26px,5vw,40px)] leading-tight font-semibold tracking-[-0.025em]">{b.related}</h2>
            <a href={blogHref} className="group inline-flex items-center gap-2 rounded-full bg-mint px-5 py-3 font-semibold text-brand-deep transition hover:bg-brand-grad hover:text-white">
              {b.allPosts} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {related.map((e) => (
              <li key={e.href}><BlogCard e={e} t={b} /></li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
