"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, MessageCircle, Phone, Plus } from "lucide-react";
import { FAQ, LINKS, REVIEWS, SPECIALISTS } from "@/lib/data";
import { SectionHead } from "./Sections";
import { TelegramIcon } from "./StoreIcons";
import { Icon } from "./Icon";

/* ───────── Mutaxassislar ───────── */
const GROUPS = ["Barchasi", "Hamshiralar", "Bolalar", "Shifokorlar"] as const;

export function Specialists() {
  const [group, setGroup] = useState<(typeof GROUPS)[number]>("Barchasi");
  // Mobilda dastlab 6 ta karta, qolgani "Yana ..." tugmasi bilan
  const MOBILE_LIMIT = 6;
  const [more, setMore] = useState(false);
  const tones = ["bg-sky", "bg-peach", "bg-lilac", "bg-mint"];
  const list = useMemo(
    () => (group === "Barchasi" ? SPECIALISTS : SPECIALISTS.filter((s) => s.group === group)),
    [group],
  );

  return (
    <section id="specialists" aria-labelledby="spec-h" className="bg-mist py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <SectionHead
          id="spec-h"
          label="Ommabop xizmatlar"
          title="Barcha zarur mutaxassislar yagona ilovada"
          text="Bizning platformamizda turli xil tibbiy yordam ko‘rsatish uchun malakali mutaxassislar ishlaydi."
        />
        <div role="tablist" aria-label="Mutaxassis turi" data-reveal className="no-scrollbar -mx-4 mt-8 flex justify-start gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:mt-10 sm:justify-center sm:px-0">
          {GROUPS.map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={g === group}
              onClick={() => { setGroup(g); setMore(false); }}
              className={`shrink-0 rounded-full px-5 py-2.5 text-[15px] font-medium transition ${
                g === group ? "bg-brand-grad text-white shadow-lg" : "bg-white hover:-translate-y-0.5 hover:bg-white/60"
              }`}
            >
              {g}
              <span className={`ml-2 rounded-full px-2 py-0.5 text-xs tabular-nums ${g === group ? "bg-white/15" : "bg-mist"}`}>
                {g === "Barchasi" ? SPECIALISTS.length : SPECIALISTS.filter((x) => x.group === g).length}
              </span>
            </button>
          ))}
        </div>
        <ul key={group} className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 lg:grid-cols-5">
          {list.map((s, i) => (
            <li
              key={s.title}
              className={`animate-pop ${!more && i >= MOBILE_LIMIT ? "max-sm:hidden" : ""}`}
              style={{ animationDelay: `${(i % MOBILE_LIMIT) * 40}ms` }}
            >
              <a
                href={LINKS.webApp}
                className={`${tones[i % 4]} lift group relative flex h-full flex-col rounded-[22px] p-4 sm:rounded-[24px] sm:p-5`}
              >
                <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/60 text-ink/50 transition group-hover:rotate-45 group-hover:bg-white group-hover:text-ink sm:top-4 sm:right-4 sm:size-9">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
                <Image src={s.img} alt="" width={96} height={96} className="icon3d size-16 object-contain sm:size-20" />
                <h3 className="mt-4 text-base leading-tight font-semibold sm:mt-6 sm:text-lg">{s.title}</h3>
                <p className="mt-1 text-[13px] text-ink-soft sm:text-sm">{s.note}</p>
              </a>
            </li>
          ))}
        </ul>
        {!more && list.length > MOBILE_LIMIT && (
          <button
            onClick={() => setMore(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-line bg-white py-3.5 font-semibold transition active:scale-[0.99] sm:hidden"
          >
            Yana {list.length - MOBILE_LIMIT} ta mutaxassis <Plus className="size-4" aria-hidden />
          </button>
        )}
      </div>
    </section>
  );
}

/* ───────── Fikrlar ───────── */
const N = REVIEWS.length;
const COPIES = 3; // [nusxa][asl][nusxa] — o'rtadagi to'plamda turamiz, chetga yetganda sezdirmay qaytamiz
const AUTOPLAY_MS = 4500;

const REVIEW_TONES = ["bg-sky", "bg-peach", "bg-lilac", "bg-mint"];

function ReviewCard({ r, i, hidden, className = "" }: { r: (typeof REVIEWS)[number]; i: number; hidden?: boolean; className?: string }) {
  return (
    <li aria-hidden={hidden || undefined} className={`${REVIEW_TONES[i % 4]} lift relative flex flex-col rounded-[28px] p-7 ${className}`}>
      <span aria-hidden className="absolute top-3 right-6 font-serif text-[88px] leading-none text-ink/10">”</span>
      <div className="flex gap-0.5" role="img" aria-label="5 yulduz">
        {Array.from({ length: 5 }).map((_, k) => (
          <Icon key={k} name="star" size={20} />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 text-lg leading-relaxed">{r.text}</blockquote>
      <div className="mt-7 flex items-center gap-3">
        <Image src={r.img} alt="" width={52} height={52} className="size-13 rounded-full object-cover ring-4 ring-white/70" draggable={false} />
        <div>
          <p className="font-semibold">{r.name}</p>
          <p className="text-sm text-ink-soft">{r.city}</p>
        </div>
      </div>
    </li>
  );
}

const REVIEWS_HEAD = (
  <SectionHead
    id="rev-h"
    wide
    label="Mijozlar fikrlari"
    title="Minglab mamnun mijozlar allaqachon Onlayn Hamshirani tanlab bo‘lishdi!"
    text="Navbatsiz va kutishsiz professional tibbiy xizmat - minglab foydalanuvchilar bizga ishonch bildirmoqda."
  />
);
// Shundan ko'p fikr bo'lsa cheksiz karusel, aks holda oddiy to'r
const REVIEWS_CAROUSEL_FROM = 4;

export function Reviews() {
  if (REVIEWS.length < REVIEWS_CAROUSEL_FROM) {
    return (
      <section id="reviews" aria-labelledby="rev-h" className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
          {REVIEWS_HEAD}
          <ul className="mt-10 grid justify-center gap-3 sm:mt-12 md:grid-cols-[repeat(auto-fit,minmax(0,420px))]">
            {REVIEWS.map((r, i) => <ReviewCard key={r.name} r={r} i={i} />)}
          </ul>
        </div>
      </section>
    );
  }
  return <ReviewsCarousel />;
}

function ReviewsCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0); // 0..N-1 (nuqtalar uchun)
  // Avtoaylanish faol nuqtadagi progress animatsiyasiga bog'langan: u tugaganda keyingi karta.
  // Shu holatlarda to'xtaydi (animation-play-state: paused):
  const [hover, setHover] = useState(false); // sichqoncha kartalar yoki boshqaruv ustida
  const [touching, setTouching] = useState(false); // telefonda surilmoqda
  const [visible, setVisible] = useState(false); // bo'lim ekranda
  const [reduced, setReduced] = useState(false); // prefers-reduced-motion → avtoaylanish yo'q
  const paused = hover || touching || !visible;
  // Dastlab faqat asl to'plam render bo'ladi (birinchi yuklashda hydration 3 baravar yengil);
  // chetdagi nusxalar bo'lim ekranga yaqinlashganda qo'shiladi
  const [full, setFull] = useState(false);
  const fullRef = useRef(false);

  const step = () => (track.current?.querySelector("li")?.clientWidth ?? 360) + 12;
  // Joriy kartaga tekislangan holda ±1 (ketma-ket bosishlar animatsiya o'rtasida ham to'g'ri hisoblanadi)
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const st = step();
    el.scrollTo({ left: (Math.round(el.scrollLeft / st) + dir) * st, behavior: "smooth" });
  };
  const goTo = (i: number) => track.current?.scrollTo({ left: (N + i) * step(), behavior: "smooth" });

  /** Animatsiyasiz siljitish (cheksiz aylanish uchun "teleport") */
  const jump = (el: HTMLElement, left: number) => {
    el.style.scrollSnapType = "none";
    el.style.scrollBehavior = "auto";
    el.scrollLeft = left;
    requestAnimationFrame(() => { el.style.scrollSnapType = ""; el.style.scrollBehavior = ""; });
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
    const near = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      near.disconnect();
      setFull(true);
    }, { rootMargin: "800px 0px" });
    near.observe(el);

    let settle = 0;
    const onScroll = () => {
      const st = step();
      const raw = Math.round(el.scrollLeft / st);
      setIndex(((raw % N) + N) % N);
      // Skroll to'xtagach: o'rtadagi to'plamdan chiqib ketgan bo'lsak, N kartaga orqaga/oldinga sakraymiz
      clearTimeout(settle);
      settle = window.setTimeout(() => {
        if (drag.current || !fullRef.current) return;
        const i = Math.round(el.scrollLeft / st);
        if (i < N || i >= 2 * N) jump(el, el.scrollLeft + (i < N ? N : -N) * st);
      }, 140);
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);

    // Oyna o'lchami o'zgarsa, joriy kartaga qayta tekislash
    const onResize = () => { if (fullRef.current) jump(el, (N + Math.round(el.scrollLeft / step()) % N) * step()); };
    window.addEventListener("resize", onResize);
    return () => {
      near.disconnect();
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(settle);
      io.disconnect();
    };
  }, []);

  // Nusxalar qo'shilgach — o'rtadagi to'plamga, joriy kartaga (chizishdan oldin, sakrash ko'rinmasin)
  useLayoutEffect(() => {
    const el = track.current;
    if (!full || !el) return;
    fullRef.current = true;
    jump(el, (N + index) * step());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- faqat nusxalar qo'shilgan paytdagi indeks kerak
  }, [full]);

  // Desktop'da sichqoncha bilan sudrab aylantirish
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = track.current;
    if (!drag.current || !el) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4 && !drag.current.moved) {
      drag.current.moved = true;
      el.setPointerCapture(e.pointerId);
      el.style.scrollSnapType = "none";
      el.style.scrollBehavior = "auto";
    }
    if (drag.current.moved) el.scrollLeft = drag.current.left - dx;
  };
  const onPointerUp = () => {
    const el = track.current;
    if (!el || !drag.current) return;
    const moved = drag.current.moved;
    drag.current = null;
    if (!moved) return;
    el.style.scrollBehavior = "";
    const i = Math.round(el.scrollLeft / step());
    el.scrollTo({ left: i * step(), behavior: "smooth" });
    setTimeout(() => { el.style.scrollSnapType = ""; }, 400);
  };
  // Faqat haqiqiy sichqoncha: sensorli ekranda tegish "hover" bo'lib qotib qolmasin
  const hoverProps = {
    onPointerEnter: (e: React.PointerEvent) => { if (e.pointerType === "mouse") setHover(true); },
    onPointerLeave: (e: React.PointerEvent) => { if (e.pointerType === "mouse") setHover(false); },
  };

  const items = full
    ? Array.from({ length: COPIES }, (_, c) => REVIEWS.map((r, i) => ({ r, i, c }))).flat()
    : REVIEWS.map((r, i) => ({ r, i, c: 1 }));
  const arrowCls = "grid size-10 shrink-0 place-items-center rounded-full transition active:scale-95 sm:size-11";

  return (
    <section id="reviews" aria-labelledby="rev-h" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">{REVIEWS_HEAD}</div>
      <ul
        ref={track}
        {...hoverProps}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={() => setTouching(true)}
        onTouchEnd={() => setTouching(false)}
        onTouchCancel={() => setTouching(false)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
          e.preventDefault();
          scroll(e.key === "ArrowRight" ? 1 : -1);
        }}
        aria-roledescription="karusel"
        aria-label="Mijozlar fikrlari"
        className="no-scrollbar mt-10 flex cursor-grab snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 py-2 outline-none select-none focus-visible:ring-3 focus-visible:ring-brand-teal/60 active:cursor-grabbing sm:mt-12 sm:scroll-px-[max(24px,calc((100vw-1320px)/2+24px))] sm:px-[max(24px,calc((100vw-1320px)/2+24px))]"
      >
        {items.map(({ r, i, c }) => (
          // Nusxalar ekran o'quvchidan yashirin — fikrlar bir marta o'qiladi
          <ReviewCard key={`${c}-${r.name}`} r={r} i={i} hidden={c !== 1} className="w-[86vw] max-w-[420px] shrink-0 snap-start" />
        ))}
      </ul>

      {/* Kartalar ostida: bitta pill ichida ← nuqtalar → */}
      <div className="mt-6 flex justify-center px-4 sm:mt-8">
        <div {...hoverProps} className="flex items-center gap-1 rounded-full bg-white p-1.5 shadow-[0_14px_34px_-18px_rgb(16_41_58/0.45)] ring-1 ring-line sm:gap-2">
          <button onClick={() => scroll(-1)} aria-label="Oldingi fikr" className={`${arrowCls} bg-mist text-ink hover:bg-line`}>
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center px-1" role="group" aria-label="Fikrlar sahifalari">
            {REVIEWS.map((r, i) => {
              const on = i === index;
              return (
                <button key={r.name} onClick={() => goTo(i)} aria-label={`${i + 1}-fikr`} aria-current={on} className="group grid h-10 min-w-6 place-items-center">
                  <span className={`relative block h-2 overflow-hidden rounded-full transition-all duration-300 ${on ? "w-8 bg-line sm:w-10" : "w-2 bg-line group-hover:bg-ink/30"}`}>
                    {on && (
                      // key: karta almashganda progress noldan boshlanadi; tugaganda — keyingi karta
                      <span
                        key={index}
                        className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-brand to-brand-blue"
                        style={reduced ? undefined : {
                          animation: `dot-progress ${AUTOPLAY_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                        onAnimationEnd={() => scroll(1)}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <button onClick={() => scroll(1)} aria-label="Keyingi fikr" className={`${arrowCls} bg-brand-grad text-white shadow-[0_10px_22px_-12px_rgb(56_197_177/0.9)] hover:brightness-105`}>
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ───────── FAQ ───────── */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-h" className="bg-mist py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-8 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[0.8fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            id="faq-h"
            align="left"
            label="Ko‘p beriladigan savollar"
            title="Savollaringizga javoblar"
            text="Xizmatni tushunishingiz oson bo‘lishi uchun eng ommabop savollarni to‘pladik."
          />
          <div data-reveal className="relative mt-6 overflow-hidden rounded-[24px] bg-white p-5 sm:mt-8 sm:p-6">
            <div aria-hidden className="absolute top-4 right-4 animate-float"><Icon name="chat" size={52} tone="tile" /></div>
            <p className="pr-16 font-semibold">Javob topmadingizmi?</p>
            <p className="mt-1 pr-16 text-ink-soft">Operatorlar 24/7 yordam beradi.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={LINKS.telegram} className="inline-flex items-center gap-2 rounded-full bg-brand-grad px-5 py-3 text-[15px] font-semibold text-white transition hover:brightness-105">
                <TelegramIcon className="size-4" /> Telegram
              </a>
              <a href={`tel:${LINKS.phone}`} className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[15px] font-semibold">
                <Phone className="size-4" /> Qo‘ng‘iroq
              </a>
            </div>
          </div>
        </div>
        <ul className="space-y-2">
          {FAQ.map((f, i) => {
            const on = open === i;
            return (
              // data-reveal o'zgarmas className'li <li>da: holat klasslari ichki div'da,
              // aks holda React className'ni qayta yozib, "is-in"ni o'chirib yuboradi
              <li key={f.q} data-reveal style={{ "--d": Math.min(i, 4) } as React.CSSProperties}>
                <div className={`rounded-[22px] transition-[background-color,box-shadow] ${on ? "bg-white shadow-[0_16px_40px_-24px_rgb(16_41_58/0.35)]" : "bg-white/60 hover:bg-white"}`}>
                  <h3>
                    <button
                      onClick={() => setOpen(on ? null : i)}
                      aria-expanded={on}
                      aria-controls={`faq-${i}`}
                      id={`faq-q-${i}`}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left text-base leading-snug font-medium sm:gap-4 sm:px-7 sm:py-5 sm:text-lg"
                    >
                      <span className="flex-1">{f.q}</span>
                      <span className={`grid size-9 shrink-0 place-items-center rounded-full transition duration-300 sm:size-10 ${on ? "rotate-45 bg-brand-grad text-white" : "bg-mist"}`}>
                        <Plus className="size-5" aria-hidden />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[68ch] px-5 pb-5 text-[15px] leading-relaxed text-ink-soft sm:px-7 sm:pb-6 sm:text-base">{f.a}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ───────── Mobil pastki CTA ───────── */
export function MobileCTA() {
  // Hero'dagi tugmalarni yopmasligi uchun biroz pastga tushilgach paydo bo'ladi
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+12px)] transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-[130%]"
      }`}
    >
      <div className="flex gap-2 rounded-[22px] bg-white/90 p-2 shadow-[0_12px_40px_-12px_rgb(16_41_58/0.4)] ring-1 ring-line backdrop-blur-xl">
        <a href={`tel:${LINKS.phone}`} aria-label="Qo‘ng‘iroq qilish" className="grid size-14 shrink-0 place-items-center rounded-2xl bg-mist">
          <Phone className="size-5" />
        </a>
        <a href={LINKS.telegram} aria-label="Telegramda yozish" className="grid size-14 shrink-0 place-items-center rounded-2xl bg-mist">
          <MessageCircle className="size-5" />
        </a>
        <a href={LINKS.webApp} className="flex min-w-0 flex-1 items-center justify-center rounded-2xl bg-brand-grad px-2 text-center text-[clamp(15px,4.8vw,17px)] leading-tight font-bold text-white">
          Hamshira chaqirish
        </a>
      </div>
    </div>
  );
}
