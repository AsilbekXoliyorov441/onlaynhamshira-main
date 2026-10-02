import { preload } from "react-dom";
import { ArrowDown, ArrowRight, Check, Phone, Plus, X } from "lucide-react";
import { LINKS } from "@/lib/data";
import { WHY_BENEFIT_ICONS, WHY_FORWHO_ICONS, type WhyDict } from "@/lib/why";
import { Icon, IconTile } from "./Icon";

/** Tilda'dagi asosiy rasm (alt matni bilan) — sahifa HTML'idan */
function heroImage(html: string) {
  const tag = html.match(/<img[^>]*>/)?.[0];
  if (!tag) return null;
  const at = (n: string) => tag.match(new RegExp(`\\s${n}="([^"]*)"`))?.[1];
  const src = at("src");
  return src ? { src, srcSet: at("srcset"), alt: at("alt") ?? "", w: Number(at("width")) || undefined, h: Number(at("height")) || undefined } : null;
}

const SIZES = "(min-width: 1024px) 600px, calc(100vw - 32px)";

export function WhyPage({ t, html, callLabel }: { t: WhyDict; html: string; callLabel: string }) {
  const img = heroImage(html);
  if (img) preload(img.src, { as: "image", fetchPriority: "high", imageSrcSet: img.srcSet, imageSizes: SIZES });

  return (
    <>
      {/* ───── Hero ───── */}
      <section className="px-3 pt-[calc(80px+env(safe-area-inset-top))] sm:px-4">
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-8 overflow-hidden rounded-[36px] bg-[linear-gradient(150deg,#ecfbef_0%,#e4f6f4_45%,#dcf1fb_100%)] px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:py-20">
          <div aria-hidden className="pointer-events-none absolute -top-32 -left-24 size-[420px] rounded-full bg-brand/25 blur-[100px]" />
          <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-32 size-[440px] rounded-full bg-brand-blue/25 blur-[110px]" />
          <div className="dots pointer-events-none absolute inset-0 opacity-70" />

          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-brand-deep ring-1 ring-white backdrop-blur">
              <span className="size-1.5 rounded-full bg-brand-deep" /> {t.eyebrow}
            </p>
            <h1 className="mt-5 text-[clamp(30px,7.4vw,56px)] leading-[1.06] font-bold tracking-[-0.03em] text-balance">{t.h1}</h1>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">{t.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={LINKS.webApp} className="group inline-flex items-center gap-2 rounded-full bg-brand-grad px-7 py-4 font-semibold text-white shadow-[0_12px_28px_-12px_rgb(56_197_177/0.9)] transition hover:-translate-y-0.5 hover:brightness-105">
                {t.cta} <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </a>
              <a href="#compare" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 font-semibold ring-1 ring-line transition hover:ring-ink/25">
                {t.toCompare} <ArrowDown className="size-4" aria-hidden />
              </a>
            </div>
          </div>

          {img && (
            <div className="relative">
              <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_-30px_rgb(16_41_58/0.5)] ring-4 ring-white">
                {/* eslint-disable-next-line @next/next/no-img-element -- legacy rasm oldindan optimallashtirilgan (webp + srcset) */}
                <img src={img.src} srcSet={img.srcSet} sizes={SIZES} width={img.w} height={img.h} alt={img.alt} fetchPriority="high" decoding="async" className="h-auto w-full" />
              </div>
              <div aria-hidden className="absolute -bottom-5 left-4 flex animate-float items-center gap-2.5 rounded-2xl bg-white py-2 pr-4 pl-2 shadow-xl sm:-left-6">
                <Icon name="check" size={36} tone="tile" className="ring-0!" />
                <span className="text-sm font-semibold">{t.chipVerified}</span>
              </div>
              <div aria-hidden className="absolute -top-5 right-4 hidden animate-float-slow items-center gap-2.5 rounded-2xl bg-white py-2 pr-4 pl-2 shadow-xl sm:flex sm:-right-4">
                <Icon name="clock" size={36} tone="tile" className="ring-0!" />
                <span className="text-sm font-semibold">{t.chipFast}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ───── Taqqoslash ───── */}
      <section id="compare" aria-labelledby="cmp-h" className="scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-mint px-3.5 py-1.5 text-sm font-semibold text-brand-deep">
              <span className="size-1.5 rounded-full bg-brand-deep" /> {t.compareCaption}
            </p>
            <h2 id="cmp-h" className="mt-3 text-[clamp(26px,6vw,44px)] leading-[1.1] font-semibold tracking-[-0.025em] text-balance">{t.compareTitle}</h2>
          </div>

          {/* Desktop: jadval — OnlaynHamshira ustuni ajratilgan */}
          <div className="mt-10 hidden overflow-hidden rounded-[28px] ring-1 ring-line md:block sm:mt-14">
            <table className="w-full border-collapse text-left text-[15px]">
              <caption className="sr-only">{t.compareCaption}</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[26%] bg-mist px-6 py-5 font-semibold text-ink-soft">{t.cols.feature}</th>
                  <th scope="col" className="w-[37%] bg-brand-grad px-6 py-5 text-lg font-bold text-white">{t.cols.us}</th>
                  <th scope="col" className="bg-mist px-6 py-5 font-semibold text-ink-soft">{t.cols.old}</th>
                </tr>
              </thead>
              <tbody>
                {t.rows.map((r, i) => (
                  <tr key={r.feature} className="border-t border-line">
                    <th scope="row" className={`px-6 py-4 font-semibold ${i % 2 ? "bg-mist/50" : "bg-white"}`}>{r.feature}</th>
                    <td className={`px-6 py-4 ${i % 2 ? "bg-mint/50" : "bg-mint/30"}`}>
                      <span className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-deep text-white"><Check className="size-3.5" strokeWidth={3} aria-hidden /></span>
                        {r.href ? <a href={r.href} className="font-medium underline decoration-brand-deep/30 decoration-2 underline-offset-3 hover:decoration-current">{r.us}</a> : <span className="font-medium">{r.us}</span>}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-ink-soft ${i % 2 ? "bg-mist/50" : "bg-white"}`}>
                      <span className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#ffe1e1] text-alert"><X className="size-3.5" strokeWidth={3} aria-hidden /></span>
                        {r.old}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobil: har bir xususiyat — alohida karta */}
          <ul className="mt-10 grid gap-3 md:hidden">
            {t.rows.map((r) => (
              <li key={r.feature} className="rounded-[22px] bg-white p-4 ring-1 ring-line">
                <p className="font-semibold">{r.feature}</p>
                <p className="mt-3 flex items-start gap-2.5 rounded-2xl bg-mint/60 p-3 text-[15px]">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-deep text-white"><Check className="size-3.5" strokeWidth={3} aria-hidden /></span>
                  <span>
                    <span className="sr-only">{t.cols.us}: </span>
                    {r.href ? <a href={r.href} className="font-medium underline decoration-brand-deep/30 decoration-2 underline-offset-3">{r.us}</a> : <span className="font-medium">{r.us}</span>}
                  </span>
                </p>
                <p className="mt-2 flex items-start gap-2.5 px-3 text-[15px] text-ink-soft">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#ffe1e1] text-alert"><X className="size-3.5" strokeWidth={3} aria-hidden /></span>
                  <span><span className="sr-only">{t.cols.old}: </span>{r.old}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── Afzalliklar ───── */}
      <section aria-labelledby="ben-h" className="bg-mist py-16 sm:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          <div className="max-w-[760px]">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-deep">
              <span className="size-1.5 rounded-full bg-brand-deep" /> {t.benefitsLabel}
            </p>
            <h2 id="ben-h" className="mt-3 text-[clamp(26px,6vw,44px)] leading-[1.1] font-semibold tracking-[-0.025em] text-balance">{t.benefitsTitle}</h2>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.benefits.map((b, i) => (
              <li key={b.title} className="lift flex gap-4 rounded-[24px] bg-white p-5 sm:block sm:rounded-[28px] sm:p-7">
                <IconTile name={WHY_BENEFIT_ICONS[i % WHY_BENEFIT_ICONS.length]} size={56} className="max-sm:size-12! max-sm:rounded-2xl" />
                <div>
                  <h3 className="text-lg leading-snug font-semibold tracking-tight sm:mt-5 sm:text-xl">{b.title}</h3>
                  {b.text && <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft sm:mt-2">{b.text}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───── Kimlar uchun + Qanday ishlaydi ───── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-6 px-4 sm:px-6 lg:grid-cols-2">
          <div className="rounded-[32px] bg-peach p-6 sm:p-10">
            <h2 className="text-[clamp(24px,5vw,34px)] leading-tight font-semibold tracking-[-0.02em]">{t.forWhoTitle}</h2>
            <ul className="mt-6 space-y-3">
              {t.forWho.map((w, i) => (
                <li key={w} className="flex items-center gap-3 rounded-2xl bg-white/80 p-3 pr-4 text-[15px] font-medium sm:text-base">
                  <IconTile name={WHY_FORWHO_ICONS[i % WHY_FORWHO_ICONS.length]} size={40} className="rounded-xl!" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-[32px] bg-ink p-6 text-white sm:p-10">
            <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-brand/20 blur-3xl" />
            <h2 className="relative text-[clamp(24px,5vw,34px)] leading-tight font-semibold tracking-[-0.02em]">{t.howTitle}</h2>
            <ol className="relative mt-6 space-y-3">
              {t.steps.map((s, i) => (
                <li key={s} className="flex gap-4 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-grad text-lg font-bold">{i + 1}</span>
                  <span>
                    <span className="block text-xs font-semibold tracking-wide text-white/60 uppercase">{t.stepWord} {i + 1}</span>
                    <span className="mt-0.5 block font-medium">{s}</span>
                  </span>
                </li>
              ))}
            </ol>
            <a href={LINKS.webApp} className="group relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ink transition hover:bg-brand-grad hover:text-white">
              {t.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* ───── FAQ (faqat Tilda sahifasida bo'lgan tilda) ───── */}
      {t.faq && (
        <section aria-labelledby="wfaq-h" className="bg-mist py-16 sm:py-24">
          <div className="mx-auto max-w-[900px] px-4 sm:px-6">
            <h2 id="wfaq-h" className="text-center text-[clamp(26px,6vw,44px)] leading-[1.1] font-semibold tracking-[-0.025em]">{t.faqTitle}</h2>
            <div className="mt-10 space-y-2">
              {t.faq.map((f, i) => (
                <details key={f.q} open={i === 0} className="group rounded-[22px] bg-white/70 open:bg-white open:shadow-[0_16px_40px_-24px_rgb(16_41_58/0.35)]">
                  <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 text-base leading-snug font-medium sm:px-7 sm:py-5 sm:text-lg [&::-webkit-details-marker]:hidden">
                    <span className="flex-1">{f.q}</span>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mist transition duration-300 group-open:rotate-45 group-open:bg-brand-grad group-open:text-white">
                      <Plus className="size-5" aria-hidden />
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-[15px] leading-relaxed text-ink-soft sm:px-7 sm:pb-6 sm:text-base">
                    <p>{f.a}</p>
                    {f.list && (
                      <ul className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                        {f.list.map((l) => (
                          <li key={l} className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-brand-deep" aria-hidden /> {l}</li>
                        ))}
                      </ul>
                    )}
                    {f.after && <p className="mt-3">{f.after}</p>}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── Xulosa ───── */}
      <section aria-labelledby="concl-h" className="px-3 pt-16 sm:px-4 sm:pt-24">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#12803e_0%,#0b7571_50%,#0d619b_100%)] px-6 py-12 text-white sm:px-14 sm:py-16">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle,rgb(255_255_255/0.14)_1.2px,transparent_1.6px)] bg-[length:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_80%_50%,#000_10%,transparent_70%)]" />
          <div className="relative max-w-[820px]">
            <h2 id="concl-h" className="text-[clamp(26px,6vw,44px)] leading-[1.1] font-bold tracking-[-0.025em]">{t.conclusionTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/90">{t.conclusion}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={LINKS.webApp} className="rounded-full bg-white px-7 py-4 font-semibold text-ink transition hover:-translate-y-0.5">{t.cta}</a>
              <a href={`tel:${LINKS.phone}`} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-4 font-semibold ring-1 ring-white/30 transition hover:bg-white/25" aria-label={`${callLabel}: ${LINKS.phoneLabel}`}>
                <Phone className="size-4" aria-hidden /> {LINKS.phoneLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
