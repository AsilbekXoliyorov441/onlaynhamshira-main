"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const list = useMemo(
    () => (group === "Barchasi" ? SPECIALISTS : SPECIALISTS.filter((s) => s.group === group)),
    [group],
  );
  const tones = ["bg-sky", "bg-peach", "bg-lilac", "bg-mint"];

  return (
    <section id="specialists" aria-labelledby="spec-h" className="bg-mist py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <SectionHead
          id="spec-h"
          label="Ommabop xizmatlar"
          title="Barcha zarur mutaxassislar yagona ilovada"
          text="Bizning platformamizda turli xil tibbiy yordam ko‘rsatish uchun malakali mutaxassislar ishlaydi."
        />
        <div role="tablist" aria-label="Mutaxassis turi" data-reveal className="no-scrollbar -mx-4 mt-8 flex justify-start gap-2 overflow-x-auto px-4 sm:mx-0 sm:mt-10 sm:justify-center sm:px-0">
          {GROUPS.map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={g === group}
              onClick={() => { setGroup(g); setMore(false); }}
              className={`shrink-0 rounded-full px-5 py-2.5 text-[15px] font-medium transition ${
                g === group ? "bg-ink text-white shadow-lg" : "bg-white hover:-translate-y-0.5 hover:bg-white/60"
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
export function Reviews() {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const step = () => (track.current?.querySelector("li")?.clientWidth ?? 360) + 12;
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  const goTo = (i: number) => track.current?.scrollTo({ left: i * step(), behavior: "smooth" });

  // Faol karta indeksini kuzatish
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / step()));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

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
  const tones = ["bg-sky", "bg-peach", "bg-lilac", "bg-mint"];

  return (
    <section id="reviews" aria-labelledby="rev-h" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHead
            id="rev-h"
            align="left"
            label="Mijozlar fikrlari"
            title="Minglab mamnun mijozlar allaqachon Onlayn Hamshirani tanlab bo‘lishdi!"
            text="Navbatsiz va kutishsiz professional tibbiy xizmat - minglab foydalanuvchilar bizga ishonch bildirmoqda."
          />
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} disabled={index === 0} aria-label="Oldingi fikr" className="grid size-14 place-items-center rounded-full bg-mint transition hover:bg-brand hover:text-white active:scale-95 disabled:opacity-40 disabled:hover:bg-mint">
              <ChevronLeft className="size-6" />
            </button>
            <button onClick={() => scroll(1)} disabled={index >= REVIEWS.length - 1} aria-label="Keyingi fikr" className="grid size-14 place-items-center rounded-full bg-mint transition hover:bg-brand hover:text-white active:scale-95 disabled:opacity-40 disabled:hover:bg-mint">
              <ChevronRight className="size-6" />
            </button>
          </div>
        </div>
      </div>
      <ul
        ref={track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        data-reveal
        className="no-scrollbar mt-12 flex cursor-grab snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 select-none active:cursor-grabbing sm:scroll-px-[max(24px,calc((100vw-1320px)/2+24px))] sm:px-[max(24px,calc((100vw-1320px)/2+24px))]"
      >
        {REVIEWS.map((r, i) => (
          <li key={r.name} className={`${tones[i % 4]} lift relative flex w-[86vw] max-w-[420px] shrink-0 snap-start flex-col rounded-[28px] p-7`}>
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
        ))}
      </ul>
      <div className="mt-8 flex justify-center gap-2" aria-label="Fikrlar sahifalari">
        {REVIEWS.map((r, i) => (
          <button
            key={r.name}
            onClick={() => goTo(i)}
            aria-label={`${i + 1}-fikr`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-brand-deep" : "w-2.5 bg-line hover:bg-ink/30"}`}
          />
        ))}
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
            <p className="font-semibold">Javob topmadingizmi?</p>
            <p className="mt-1 text-ink-soft">Operatorlar 24/7 yordam beradi.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={LINKS.telegram} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-white">
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
              <li key={f.q} data-reveal style={{ "--d": Math.min(i, 4) } as React.CSSProperties} className={`rounded-[22px] transition-[background-color,box-shadow] ${on ? "bg-white shadow-[0_16px_40px_-24px_rgb(16_41_58/0.35)]" : "bg-white/60 hover:bg-white"}`}>
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
        <a href={LINKS.webApp} className="flex flex-1 items-center justify-center rounded-2xl bg-brand-grad text-white text-[17px] font-bold">
          Hamshira chaqirish
        </a>
      </div>
    </div>
  );
}
