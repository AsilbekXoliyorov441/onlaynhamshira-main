import Image from "next/image";
import { ArrowRight, BadgeCheck, Clock, Star, Wallet } from "lucide-react";
import { IMAGES, LINKS, REVIEW_IMAGES, SERVICES, type ServiceId } from "@/lib/data";
import { formatNum } from "@/lib/i18n/format";
import type { Dict } from "@/lib/i18n/dictionaries/uz";
import { StoreButtons } from "./DownloadModal";
import { HeroBooking } from "./HeroBooking";

const PERK_ICONS = [BadgeCheck, Clock, Wallet];
// Buyurtma kartasidagi tezkor tanlov — client komponentga faqat shu 5 tasining qisqa matni boradi
const QUICK: ServiceId[] = ["ukol", "kapelnitsa", "yara", "bosim", "massaj"];

export default function Hero({ t }: { t: Dict }) {
  const h = t.hero;
  const clients = `${formatNum(13500, t.common.money.sep)}+`;
  return (
    <section id="top" className="relative px-3 pt-[88px] sm:px-4">
      <div className="relative mx-auto grid max-w-[1400px] gap-3 lg:grid-cols-[1.05fr_1fr]">
        {/* Chap: sarlavha */}
        <div className="hero-in relative flex flex-col overflow-hidden rounded-[32px] bg-[linear-gradient(150deg,#ecfbef_0%,#e4f6f4_45%,#dcf1fb_100%)] px-6 pt-10 pb-8 sm:px-12 sm:pt-14 sm:pb-10">
          {/* Logo ranglaridagi yumshoq nur dog'lari */}
          <div aria-hidden className="pointer-events-none absolute -top-32 -left-24 size-[420px] rounded-full bg-brand/25 blur-[100px]" />
          <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-32 size-[440px] rounded-full bg-brand-blue/25 blur-[110px]" />
          <div className="dots pointer-events-none absolute inset-0 opacity-70" />

          <div className="relative flex flex-1 flex-col">
            <a
              href={LINKS.webApp}
              className="group inline-flex w-fit items-center gap-2.5 rounded-full bg-white/80 py-1.5 pr-2 pl-3 text-sm font-medium shadow-[0_6px_20px_-12px_rgb(16_41_58/0.5)] ring-1 ring-white backdrop-blur transition hover:bg-white"
            >
              <span className="relative grid size-2.5 place-items-center">
                <span className="absolute size-2.5 animate-pulse-ring rounded-full bg-brand" />
                <span className="size-2.5 rounded-full bg-brand-deep" />
              </span>
              {t.common.callNurseOnline}
              <span className="grid size-6 place-items-center rounded-full bg-brand-grad text-white transition group-hover:translate-x-0.5">
                <ArrowRight className="size-3.5" />
              </span>
            </a>

            <h1 className="mt-7 max-w-[13ch] text-[clamp(32px,11vw,40px)] leading-[1.02] font-bold tracking-[-0.035em] text-balance sm:text-[60px] xl:text-[70px]">
              {h.titleBefore}<span className="text-brand-grad">{h.titleAccent}</span>{h.titleAfter}
            </h1>
            <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-ink-soft sm:text-[19px]">
              {h.lead}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {h.perks.map((text, i) => {
                const Glyph = PERK_ICONS[i];
                return (
                <li key={text} className="inline-flex items-center gap-2 rounded-full bg-white/70 py-2 pr-3.5 pl-2.5 text-sm font-medium ring-1 ring-white backdrop-blur">
                  <Glyph className="size-4 text-brand-deep" aria-hidden /> {text}
                </li>
                );
              })}
            </ul>

            <StoreButtons className="mt-7 sm:mt-8 sm:mb-8" />

            {/* Ijtimoiy isbot */}
            <div className="mt-auto hidden flex-wrap items-center gap-x-6 gap-y-4 border-t border-ink/10 pt-6 sm:flex">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {REVIEW_IMAGES.slice(0, 4).map((src) => (
                    <Image key={src} src={src} alt="" width={44} height={44} className="size-10 rounded-full border-2 border-white object-cover transition hover:z-10 hover:-translate-y-1" />
                  ))}
                </div>
                <p className="text-sm leading-snug">
                  <span className="flex items-center gap-0.5 text-[#f5b301]" role="img" aria-label={t.common.fiveStars}>
                    {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="size-3.5 fill-current" aria-hidden />)}
                  </span>
                  <strong className="font-bold">{clients}</strong> <span className="text-ink-soft">{h.happyClients}</span>
                </p>
              </div>
              <span aria-hidden className="hidden h-9 w-px bg-ink/10 sm:block" />
              <p className="text-sm leading-snug">
                <strong className="block text-xl font-bold tracking-tight">270+</strong>
                <span className="text-ink-soft">{h.qualifiedNurses}</span>
              </p>
              <span aria-hidden className="hidden h-9 w-px bg-ink/10 sm:block" />
              <p className="text-sm leading-snug">
                <strong className="block text-xl font-bold tracking-tight">24/7</strong>
                <span className="text-ink-soft">{h.noDaysOff}</span>
              </p>
            </div>
          </div>
        </div>

        {/* O'ng: foto + buyurtma kartasi */}
        <div style={{ "--d": 1 } as React.CSSProperties} className="hero-in relative flex flex-col gap-3 overflow-hidden rounded-[32px] bg-mist p-3">
          <Image
            src={IMAGES.hero}
            alt={h.imageAlt}
            fill
            loading="eager"
            fetchPriority="high"
            quality={60}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[60%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-transparent" />

          {/* Tepada: ishonch ko'rsatkichlari */}
          <div className="relative flex flex-wrap items-stretch gap-3">
            <div className="flex min-w-[260px] flex-1 items-center gap-3.5 rounded-[20px] bg-white/90 py-3.5 pr-5 pl-3.5 shadow-lg backdrop-blur">
              <div className="flex shrink-0 -space-x-3">
                {REVIEW_IMAGES.slice(0, 3).map((src) => (
                  <Image key={src} src={src} alt="" width={44} height={44} className="size-11 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <p className="min-w-0 text-[15px] leading-tight">
                <strong className="block text-lg font-bold tracking-tight sm:text-xl">{h.clients}</strong>
                <span className="text-ink-soft">{h.clientsSub}</span>
              </p>
            </div>
            <div className="flex min-w-[260px] flex-1 items-center gap-3.5 rounded-[20px] bg-white/90 py-3.5 pr-5 pl-3.5 shadow-lg backdrop-blur">
              <span className="grid size-11 place-items-center rounded-2xl bg-brand-grad text-white"><Clock className="size-[22px]" aria-hidden /></span>
              <p className="text-[15px] leading-tight">
                <strong className="block text-xl font-bold tracking-tight">{h.allDay}</strong>
                <span className="text-ink-soft">{h.allDaySub}</span>
              </p>
            </div>
          </div>

          <HeroBooking
            t={t.booking}
            common={t.common}
            items={SERVICES.filter((s) => QUICK.includes(s.id)).map((s) => ({ ...s, short: t.services.items[s.id].short, duration: t.services.items[s.id].duration }))}
          />
        </div>
      </div>
    </section>
  );
}
