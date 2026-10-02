import { preload } from "react-dom";
import { ArrowDown, Building2, CalendarDays, ChevronRight, ExternalLink, Hash, Maximize2, QrCode } from "lucide-react";
import { CERTIFICATES, COMPANY_TIN } from "@/lib/data";
import type { Dict } from "@/lib/i18n/dictionaries/uz";
import { fill } from "@/lib/i18n/format";
import { Icon, IconTile, type IconName } from "../Icon";
import { CertificateViewer, type CertImage } from "./CertificateViewer";

const ICONS: IconName[] = ["id", "shield", "check"];
const TONES = ["bg-sky", "bg-lilac", "bg-mint"];
const d = (i: number) => ({ "--d": i }) as React.CSSProperties;

/** Rasmlar content/legacy/*certificates.json dagi HTML'dan olinadi (har til o'z nusxasini ko'rsatadi) */
function parseImages(html: string): CertImage[] {
  return [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => {
    const at = (n: string) => tag.match(new RegExp(`\\s${n}="([^"]*)"`))?.[1];
    return { src: at("src")!, srcSet: at("srcset"), width: Number(at("width")), height: Number(at("height")) };
  });
}

/** srcset'dagi eng kichik variant — kichik ko'rinishlar uchun */
const smallest = (img: CertImage) => img.srcSet?.split(",")[0].trim().split(" ")[0] ?? img.src;

/**
 * /certificates, /ru/certificates, /en/certificates. H1 matni Tilda'dagidek (content JSON'dan),
 * metadata esa [...slug]/page.tsx da — bu yerda faqat sahifa tanasi.
 */
export function CertificatesPage({
  html, t, home, homeLabel, closeLabel,
}: { html: string; t: Dict["certificates"]; home: string; homeLabel: string; closeLabel: string }) {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "";
  const images = parseImages(html);
  const docs = CERTIFICATES.slice(0, images.length).map((c, i) => ({ ...c, ...t.items[i], image: images[i] }));

  // Birinchi ekrandagi hujjatlar to'plami — LCP
  const lcp = docs[0]?.image;
  if (lcp) preload(smallest(lcp), { as: "image", fetchPriority: "high" });

  const firstYear = CERTIFICATES[0].date.slice(-4);
  // Ko'rinishda chiroyli turishi uchun: ikki tik hujjat orqada, yotiq hujjat oldinda
  const stack = [
    "left-[2%] top-[4%] w-[46%] -rotate-[7deg] z-10",
    "right-[2%] top-0 w-[46%] rotate-[6deg] z-20",
    "left-1/2 bottom-[2%] w-[72%] -translate-x-1/2 -rotate-[2deg] z-30",
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative mx-auto mt-4 max-w-[1200px] overflow-hidden rounded-[32px] bg-mist px-5 py-8 sm:mt-6 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-24 size-[420px] rounded-full bg-sky opacity-70 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 size-[380px] rounded-full bg-mint opacity-80 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <nav aria-label="Breadcrumb" className="hero-in text-sm text-ink-soft">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li><a href={home} className="transition hover:text-ink">{homeLabel}</a></li>
                <li aria-hidden><ChevronRight className="size-3.5" /></li>
                <li aria-current="page" className="font-medium text-ink">{h1}</li>
              </ol>
            </nav>

            <p className="hero-in mt-6 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-deep shadow-sm" style={d(1)}>
              <Icon name="shield" size={16} tone="current" /> {t.label}
            </p>
            <h1 className="hero-in mt-4 text-[clamp(34px,10vw,44px)] leading-[1.04] font-semibold tracking-[-0.03em] sm:text-6xl" style={d(1)}>
              {h1}
            </h1>
            <p className="hero-in mt-5 max-w-[56ch] text-lg leading-relaxed text-pretty text-ink-soft" style={d(2)}>{t.lead}</p>

            <dl className="hero-in mt-8 grid grid-cols-2 gap-2 sm:grid-cols-[1fr_1fr_1.4fr] sm:gap-3" style={d(3)}>
              {[
                { v: firstYear, l: t.facts.since },
                { v: String(docs.length), l: t.facts.docs },
                { v: COMPANY_TIN, l: t.facts.tin, wide: true },
              ].map((f) => (
                // column-reverse: qiymat tepada, justify-end — qiymatlar bir chiziqda turadi
                <div key={f.l} className={`flex flex-col-reverse justify-end rounded-2xl ${"wide" in f ? "max-sm:col-span-2" : ""} bg-white/80 p-3 ring-1 ring-line backdrop-blur sm:p-4`}>
                  <dt className="mt-1 text-xs leading-snug text-ink-soft sm:text-sm">{f.l}</dt>
                  <dd className="text-lg font-semibold tracking-tight whitespace-nowrap tabular-nums sm:text-2xl">{f.v}</dd>
                </div>
              ))}
            </dl>

            <a
              href="#docs"
              className="hero-in mt-8 inline-flex items-center gap-2 rounded-full bg-brand-grad px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-105"
              style={d(4)}
            >
              {t.browse} <ArrowDown className="size-4" />
            </a>
          </div>

          {/* Hujjatlar to'plami — bosilsa kattalashadi */}
          <div className="hero-in relative mx-auto aspect-[10/9] w-full max-w-[520px]" style={d(2)}>
            {docs.map((doc, i) => (
              <a
                key={doc.number}
                href={doc.image.src}
                data-cert={i}
                aria-label={fill(t.openDoc, { t: doc.title })}
                className={`group absolute block rounded-xl bg-white p-1.5 shadow-[0_24px_50px_-20px_rgb(16_41_58/0.45)] ring-1 ring-ink/5 transition duration-300 hover:z-40 hover:scale-[1.04] sm:p-2 ${stack[i]}`}
              >
                <img
                  src={smallest(doc.image)}
                  width={doc.image.width}
                  height={doc.image.height}
                  alt=""
                  decoding="async"
                  {...(i === 0 ? { fetchPriority: "high" as const } : {})}
                  className="h-auto w-full rounded-lg"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hujjatlar ro'yxati ── */}
      <section id="docs" aria-labelledby="docs-h" className="mx-auto max-w-[1200px] scroll-mt-24 py-14 sm:py-20">
        <div data-reveal className="mx-auto max-w-[680px] text-center">
          <h2 id="docs-h" className="text-[clamp(26px,8vw,32px)] leading-[1.1] font-semibold tracking-[-0.025em] text-balance sm:text-5xl">
            {t.listTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-ink-soft">{t.listText}</p>
        </div>

        <ol className="mt-10 grid gap-5 sm:mt-14 sm:gap-6">
          {docs.map((doc, i) => {
            const landscape = doc.image.width > doc.image.height;
            return (
              <li key={doc.number} data-reveal className={`grid overflow-hidden rounded-[28px] bg-white ring-1 ring-line ${i % 2 ? "lg:grid-cols-[1fr_minmax(0,460px)]" : "lg:grid-cols-[minmax(0,460px)_1fr]"}`}>
                {/* Rasm */}
                <div className={`${TONES[i]} relative grid place-items-center p-6 sm:p-10 ${i % 2 ? "lg:order-last" : ""}`}>
                  <a
                    href={doc.image.src}
                    data-cert={i}
                    aria-label={fill(t.openDoc, { t: doc.title })}
                    className={`group relative block rounded-xl bg-white p-2 shadow-[0_24px_50px_-24px_rgb(16_41_58/0.5)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_60px_-24px_rgb(16_41_58/0.55)] ${landscape ? "w-full" : "w-[72%] max-w-[300px]"}`}
                  >
                    <img
                      src={doc.image.src}
                      srcSet={doc.image.srcSet}
                      sizes={landscape ? "(max-width: 1024px) calc(100vw - 96px), 380px" : "(max-width: 1024px) 60vw, 290px"}
                      width={doc.image.width}
                      height={doc.image.height}
                      alt={doc.title}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full rounded-lg"
                    />
                    <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold text-white opacity-90 backdrop-blur transition group-hover:bg-ink group-hover:opacity-100">
                      <Maximize2 className="size-3.5" /> {t.open}
                    </span>
                  </a>
                </div>

                {/* Ma'lumot */}
                <div className="flex flex-col p-6 sm:p-10">
                  <div className="flex items-center gap-3">
                    <IconTile name={ICONS[i]} size={48} className="rounded-2xl!" />
                    <div>
                      <p className="text-sm font-semibold tracking-wide text-brand-deep uppercase">{doc.kind}</p>
                      <p className="text-sm text-ink-soft tabular-nums">0{i + 1} / 0{docs.length}</p>
                    </div>
                  </div>
                  <h3 className="mt-5 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-[28px]">{doc.title}</h3>
                  <p className="mt-3 leading-relaxed text-pretty text-ink-soft sm:text-lg">{doc.text}</p>

                  <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line sm:grid-cols-2">
                    <Fact icon={<Building2 className="size-4" />} label={t.fields.issuer} value={doc.issuer} className="sm:col-span-2" />
                    <Fact icon={<CalendarDays className="size-4" />} label={t.fields.date} value={doc.date} />
                    <Fact icon={<Hash className="size-4" />} label={t.fields.number} value={doc.number} />
                  </dl>

                  <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-8">
                    <a
                      href={doc.verify}
                      target="_blank"
                      rel="noopener nofollow"
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-ink/90"
                    >
                      <ExternalLink className="size-4" /> {t.verify}
                    </a>
                    <a
                      href={doc.image.src}
                      data-cert={i}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold ring-1 ring-line transition hover:ring-brand"
                    >
                      <Maximize2 className="size-4 text-brand-deep" /> {t.open}
                    </a>
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-soft">
                    <QrCode className="size-4 shrink-0" /> {t.verifyNote}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── Qanday tekshirish ── */}
      <section aria-labelledby="how-h" data-reveal className="relative mx-auto mb-12 max-w-[1200px] overflow-hidden rounded-[32px] bg-ink px-6 py-10 text-white sm:px-12 sm:py-14">
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-20 size-72 rounded-full bg-brand-teal opacity-25 blur-3xl" />
        <h2 id="how-h" className="relative max-w-[22ch] text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">{t.howTitle}</h2>
        <ol className="relative mt-8 grid gap-4 md:grid-cols-3">
          {t.how.map((s, i) => (
            <li key={s} className="rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 sm:p-6">
              <span className="grid size-10 place-items-center rounded-full bg-brand-grad font-semibold tabular-nums">{i + 1}</span>
              <p className="mt-4 leading-relaxed text-white/85">{s}</p>
            </li>
          ))}
        </ol>
        <p className="relative mt-6 text-sm text-white/60">{t.company} · {t.facts.tin}: {COMPANY_TIN}</p>
      </section>

      <CertificateViewer
        docs={docs.map((doc) => ({ ...doc.image, title: doc.title, verify: doc.verify }))}
        t={t}
        close={closeLabel}
      />
    </>
  );
}

function Fact({ icon, label, value, className = "" }: { icon: React.ReactNode; label: string; value: string; className?: string }) {
  return (
    // <dl> ichida dt/dd guruhni o'rovchi div'ning bevosita bolalari bo'lishi kerak (a11y) — ikonka dt ichida
    <div className={`relative min-w-0 bg-mist p-4 pl-15 ${className}`}>
      <dt className="text-sm text-ink-soft">
        <span aria-hidden className="absolute top-4 left-4 grid size-8 place-items-center rounded-full bg-white text-brand-deep ring-1 ring-line">{icon}</span>
        {label}
      </dt>
      <dd className="mt-0.5 font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
