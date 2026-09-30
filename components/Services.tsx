"use client";

import { useState } from "react";
import { ArrowRight, Check, Clock3, Plus } from "lucide-react";
import { LINKS, SERVICES, formatPrice } from "@/lib/data";
import { SectionHead } from "./Sections";
import { ServiceGlyph } from "./ServiceGlyph";

export default function Services() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const active = SERVICES.find((s) => s.id === activeId)!;

  return (
    <section id="prices" aria-labelledby="svc-h" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <SectionHead
          id="svc-h"
          label="Narxlar"
          title="Kerakli xizmatni tanlang"
          text="Professional hamshiralar uyingizda keng ko‘lamli tibbiy muolajalarni amalga oshiradilar."
        />

        <div data-reveal className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-[1.35fr_1fr]">
          {/* Ro'yxat */}
          <ul className="divide-y divide-line overflow-hidden rounded-[24px] border border-line sm:rounded-[28px]">
            {SERVICES.map((s) => {
              const on = s.id === activeId;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setActiveId(s.id)}
                    aria-expanded={on}
                    aria-controls={`svc-${s.id}`}
                    className={`group flex w-full items-center gap-3 px-4 py-3.5 text-left transition sm:gap-4 sm:px-7 sm:py-4 ${on ? "bg-mint" : "hover:bg-mist"}`}
                  >
                    <span className={`grid size-11 shrink-0 place-items-center rounded-xl transition sm:size-14 sm:rounded-2xl ${on ? "bg-white shadow-sm" : "bg-mist group-hover:bg-white"}`}>
                      <ServiceGlyph icon={s.icon} size={22} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] leading-snug font-medium sm:text-[17px]">{s.title}</span>
                      {/* Mobilda narx sarlavha ostida (o'ng ustun faqat sm+) */}
                      <span className={`mt-0.5 text-[13px] text-ink-soft tabular-nums sm:hidden ${on ? "hidden" : "block"}`}>
                        <span className="font-semibold text-ink">{formatPrice(s.priceFrom)}</span>dan
                      </span>
                    </span>
                    <span className="hidden shrink-0 text-right sm:block">
                      <span className="block font-semibold tabular-nums">{formatPrice(s.priceFrom)}</span>
                      <span className="text-sm text-ink-soft">dan</span>
                    </span>
                    <Plus className={`size-5 shrink-0 text-ink-soft transition lg:hidden ${on ? "rotate-45" : ""}`} aria-hidden />
                  </button>
                  {/* Mobil: tafsilot ro'yxat ichida */}
                  <div id={`svc-${s.id}`} hidden={!on} className="animate-pop bg-mint px-5 pb-6 sm:px-7 lg:hidden">
                    <p className="leading-relaxed text-ink-soft">{s.description}</p>
                    <p className="mt-3 font-semibold tabular-nums">{formatPrice(s.priceFrom)}dan</p>
                    <a href={LINKS.webApp} className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-brand-grad text-white py-3.5 font-semibold">
                      Buyurtma berish <ArrowRight className="size-5" />
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Tafsilot paneli (desktop) */}
          <aside aria-live="polite" className="hidden lg:block">
            <div key={active.id} className="sticky top-28 animate-pop overflow-hidden rounded-[28px] bg-ink p-9 text-white">
              <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-brand/20 blur-3xl" />
              <span className="relative grid size-20 place-items-center rounded-3xl bg-white/10 ring-1 ring-white/15">
                <ServiceGlyph icon={active.icon} size={40} tone="current" className="animate-float text-brand" />
              </span>
              <h3 className="relative mt-7 text-[28px] leading-tight font-semibold tracking-tight text-balance">{active.title}</h3>
              <p className="mt-4 leading-relaxed text-white/75">{active.description}</p>
              <div className="mt-8 flex items-end justify-between border-t border-white/15 pt-6">
                <div>
                  <p className="text-sm text-white/60">Narxi</p>
                  <p className="mt-1 text-3xl font-bold tabular-nums">
                    {formatPrice(active.priceFrom)}<span className="text-lg font-medium text-white/60">dan</span>
                  </p>
                </div>
                <p className="flex items-center gap-1.5 text-sm text-white/70"><Clock3 className="size-4" /> {active.duration}</p>
              </div>
              <ul className="mt-6 space-y-2 text-[15px] text-white/80">
                {["Hamshira kerakli anjomlarni o‘zi olib keladi", "Xizmat yakunlanganidan so‘ng to‘lov", "Yashirin to‘lovlarsiz"].map((t) => (
                  <li key={t} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-brand" /> {t}</li>
                ))}
              </ul>
              <a href={LINKS.webApp} className="group mt-8 flex items-center justify-center gap-2 rounded-2xl bg-brand-grad text-white py-4 text-[17px] font-bold transition hover:brightness-105">
                Buyurtma berish <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </aside>
        </div>
        <p className="mt-6 max-w-[70ch] text-sm text-ink-soft">
          Buyurtma berish jarayonida taxminiy narx ko‘rinadi, hamshira manzilga kelgandan so‘ng yakuniy narx tasdiqlanadi.
        </p>
      </div>
    </section>
  );
}
