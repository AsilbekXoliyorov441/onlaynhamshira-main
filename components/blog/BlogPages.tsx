import { preload } from "react-dom";
import { ArrowLeft, ArrowRight, ChevronRight, Clock3, Phone } from "lucide-react";
import { LINKS } from "@/lib/data";
import { blogEntries, parseArticle, relatedEntries, type BlogImage } from "@/lib/blog";
import { fill } from "@/lib/i18n/format";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { Dict } from "@/lib/i18n/dictionaries/uz";
import { pageHref } from "@/lib/nav";
import { SITE_URL } from "@/lib/seo/site";
import type { LegacyPage } from "@/lib/seo/legacy";
import { Icon, IconTile } from "../Icon";
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

const FEATURED_SIZES = "(min-width: 1024px) 720px, calc(100vw - 32px)";
const COVER_SIZES = "(min-width: 1248px) 1200px, calc(100vw - 32px)";

/* ───────── /blog ───────── */
export function BlogIndexPage({ pg, t }: { pg: LegacyPage; t: Dict }) {
  const b = t.blog;
  const entries = blogEntries(pg);
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

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-brand-deep ring-1 ring-white backdrop-blur">
                <span className="size-1.5 rounded-full bg-brand-deep" /> {b.label}
              </p>
              <h1 className="mt-5 text-[clamp(38px,9vw,72px)] leading-[1] font-bold tracking-[-0.035em]">{h1}</h1>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft sm:text-xl">{b.lead}</p>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/70 py-2 pr-4 pl-2.5 text-sm font-medium ring-1 ring-white backdrop-blur">
                <Icon name="check2" size={18} /> {fill(b.count, { n: entries.length })}
              </p>
            </div>
            {/* Bezak: mavzular plitkalari */}
            <div aria-hidden className="relative hidden h-[260px] lg:block">
              {(["nurse", "family", "pressure", "prevention"] as const).map((k, i) => (
                <div
                  key={k}
                  className={`absolute flex items-center gap-3 rounded-2xl bg-white/90 py-2.5 pr-5 pl-2.5 shadow-[0_18px_40px_-20px_rgb(16_41_58/0.45)] backdrop-blur ${
                    ["top-0 left-[8%] animate-float", "top-[28%] right-0 animate-float-slow", "bottom-[22%] left-0 animate-float-slow", "right-[12%] bottom-0 animate-float"][i]
                  }`}
                >
                  <IconTile name={TOPIC_STYLE[k].icon} size={44} className="rounded-xl!" />
                  <span className="font-semibold">{b.topics[k]}</span>
                </div>
              ))}
            </div>
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-ink-soft">
                <Clock3 className="size-4" aria-hidden /> {fill(b.minutes, { n: entry.minutes })}
              </span>
            </div>
            <h1 className="mt-5 max-w-[24ch] text-[clamp(28px,6.2vw,54px)] leading-[1.08] font-bold tracking-[-0.03em] text-balance">{title}</h1>
            {entry.excerpt && <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink-soft sm:text-xl">{entry.excerpt}</p>}
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

            <p className="mt-10 flex max-w-[740px] gap-3 rounded-2xl bg-mist p-4 text-sm leading-relaxed text-ink-soft">
              <Icon name="stethoscope" size={20} /> {b.disclaimer}
            </p>
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
