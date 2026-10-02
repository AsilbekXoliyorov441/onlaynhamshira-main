import { ChevronRight, Clock3, FileText, ListOrdered } from "lucide-react";
import { LINKS } from "@/lib/data";
import { localePath, type Locale } from "@/lib/i18n/config";
import { fill } from "@/lib/i18n/format";
import type { Dict } from "@/lib/i18n/dictionaries/uz";
import { parseLegal } from "@/lib/legal";
import { legacyPages, type LegacyPage } from "@/lib/seo/legacy";
import { BlogToc } from "../blog/BlogToc";
import { IconTile } from "../Icon";
import { TelegramIcon } from "../StoreIcons";
import { PrintButton } from "./PrintButton";

/** Oferta / maxfiylik siyosati — o'qish uchun qulay hujjat ko'rinishi (matn Tilda'dagidek) */
export function LegalPage({ pg, t, lang }: { pg: LegacyPage; t: Dict; lang: Locale }) {
  const l = t.legalPage;
  const { title, body, toc, minutes } = parseLegal(pg);
  const others = legacyPages()
    .filter((p) => p.group === "legal" && p.contentLang === pg.contentLang && p.path !== pg.path)
    .map((p) => ({ href: p.path, title: parseLegal(p).title }));

  return (
    <>
      <header className="px-3 pt-[calc(80px+env(safe-area-inset-top))] sm:px-4">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-[linear-gradient(150deg,#ecfbef_0%,#e4f6f4_45%,#dcf1fb_100%)] px-6 py-10 sm:px-12 sm:py-14">
          <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-32 size-[440px] rounded-full bg-brand-blue/25 blur-[110px]" />
          <div className="dots pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative mx-auto max-w-[1200px]">
            <nav aria-label={t.blog.breadcrumb}>
              <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-soft">
                <li><a href={localePath(lang)} className="rounded px-1 py-1 hover:text-ink">{t.blog.home}</a></li>
                <li aria-hidden><ChevronRight className="size-4" /></li>
                <li className="px-1 font-medium text-ink" aria-current="page">{l.eyebrow}</li>
              </ol>
            </nav>
            <div className="mt-6 flex items-start gap-5">
              <IconTile name="id" size={64} className="hidden sm:grid" />
              <div className="min-w-0">
                <h1 className="text-[clamp(26px,5.6vw,46px)] leading-[1.1] font-bold tracking-[-0.03em] text-balance [overflow-wrap:anywhere]">{title}</h1>
                <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 font-medium ring-1 ring-white">
                    <FileText className="size-4 text-brand-deep" aria-hidden /> {l.eyebrow}
                  </span>
                  {toc.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 font-medium ring-1 ring-white">
                      <ListOrdered className="size-4 text-brand-deep" aria-hidden /> {fill(l.sections, { n: toc.length })}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 font-medium ring-1 ring-white">
                    <Clock3 className="size-4 text-brand-deep" aria-hidden /> {fill(t.blog.minutes, { n: minutes })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-10 grid max-w-[1248px] gap-10 px-4 sm:mt-14 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden lg:block print:hidden">
          <div className="sticky top-28 max-h-[calc(100dvh-8rem)] space-y-6 overflow-y-auto pr-2 pb-4" data-lenis-prevent>
            {toc.length > 1 && <BlogToc items={toc} title={l.toc} />}
          </div>
        </aside>

        <div className="min-w-0">
          {toc.length > 1 && (
            <details className="group mb-8 rounded-[22px] bg-mist p-1 lg:hidden print:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-[18px] px-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
                {l.toc}
                <ChevronRight className="size-5 transition-transform group-open:rotate-90" aria-hidden />
              </summary>
              <ol className="space-y-0.5 px-2 pb-3 text-[15px]">
                {toc.map((i) => (
                  <li key={i.id}><a href={`#${i.id}`} className="block rounded-lg px-2 py-1.5 text-ink-soft hover:bg-white hover:text-ink">{i.text}</a></li>
                ))}
              </ol>
            </details>
          )}

          <div className="mb-6 flex justify-end print:hidden">
            <PrintButton label={l.print} />
          </div>

          <article className="legacy-prose legal-prose max-w-[820px]" dangerouslySetInnerHTML={{ __html: body }} />

          <div className="mt-12 grid max-w-[820px] gap-3 sm:grid-cols-[1.3fr_1fr] print:hidden">
            <div className="relative overflow-hidden rounded-[28px] bg-ink p-6 text-white sm:p-8">
              <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-brand/25 blur-3xl" />
              <p className="relative text-xl font-semibold tracking-tight">{l.helpTitle}</p>
              <p className="relative mt-2 text-[15px] leading-relaxed text-white/75">{l.helpText}</p>
              <div className="relative mt-5 flex flex-wrap gap-2">
                <a href={LINKS.telegram} className="inline-flex items-center gap-2 rounded-full bg-brand-grad px-5 py-3 font-semibold transition hover:brightness-105">
                  <TelegramIcon className="size-4" /> Telegram
                </a>
                <a href={`mailto:${LINKS.email}`} className="inline-flex items-center rounded-full bg-white/10 px-5 py-3 font-semibold ring-1 ring-white/20 transition hover:bg-white/20">
                  {LINKS.email}
                </a>
              </div>
            </div>
            {others.length > 0 && (
              <nav aria-label={l.otherDocs} className="rounded-[28px] bg-mist p-6 sm:p-8">
                <p className="font-semibold">{l.otherDocs}</p>
                <ul className="mt-3 space-y-2">
                  {others.map((o) => (
                    <li key={o.href}>
                      <a href={o.href} className="group flex items-start gap-2 rounded-xl bg-white p-3 text-[15px] leading-snug font-medium ring-1 ring-line transition hover:ring-ink/20">
                        <FileText className="mt-0.5 size-4 shrink-0 text-brand-deep" aria-hidden />
                        <span className="min-w-0 [overflow-wrap:anywhere]">{o.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
