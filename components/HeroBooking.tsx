"use client";

import { useState } from "react";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { LINKS, SERVICES, formatPrice } from "@/lib/data";
import { ServiceGlyph } from "./ServiceGlyph";
import { Icon } from "./Icon";

const QUICK = SERVICES.filter((s) => ["ukol", "kapelnitsa", "yara", "bosim", "massaj"].includes(s.id));
const SHORT: Record<string, string> = {
  ukol: "Ukol",
  kapelnitsa: "Kapelnitsa",
  yara: "Bog‘lam",
  bosim: "Bosim / qand",
  massaj: "Massaj",
};

/** Hero'dagi yagona interaktiv qism — xizmat tanlash kartasi (qolgan Hero server komponent) */
export function HeroBooking() {
  const [active, setActive] = useState(QUICK[1]);
  return (
    <>
          {/* Pastda: kenglik bo'yicha to'liq buyurtma kartasi */}
          <div className="relative flex flex-1">
            <div className="flex flex-1 flex-col rounded-[22px] bg-white p-5 shadow-[0_24px_60px_-20px_rgb(16_41_58/0.45)] sm:p-7">
              <p className="text-[15px] font-semibold sm:text-xl sm:tracking-tight">Qaysi xizmat kerak?</p>
              <div role="radiogroup" aria-label="Xizmat turi" className="mt-4 grid flex-1 auto-rows-fr gap-2">
                {QUICK.map((s) => {
                  const on = s.id === active.id;
                  return (
                    <button
                      key={s.id}
                      role="radio"
                      aria-checked={on}
                      onClick={() => setActive(s)}
                      className={`flex items-center gap-3 rounded-2xl border p-2.5 pr-4 text-left transition ${
                        on ? "border-transparent bg-mint/70 ring-2 ring-brand" : "border-line bg-white hover:border-ink/25 hover:bg-mist"
                      }`}
                    >
                      <span className={`grid size-10 shrink-0 place-items-center rounded-xl transition ${on ? "bg-brand-grad text-white" : "bg-mist"}`}>
                        <ServiceGlyph icon={s.icon} size={20} tone={on ? "current" : "brand"} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] leading-tight font-semibold">{SHORT[s.id]}</span>
                        <span className="block truncate text-[13px] text-ink-soft">{s.duration}</span>
                      </span>
                      <span className="shrink-0 text-right text-[13px] leading-tight text-ink-soft">
                        <span className="block text-[15px] font-semibold text-ink tabular-nums">{formatPrice(s.priceFrom)}</span>
                        dan
                      </span>
                    </button>
                  );
                })}
              </div>

              <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <Icon name="clock" size={18} />
                  <span><span className="sr-only">Yetib kelish: </span>30–90 daqiqada</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="wallet" size={18} />
                  <span>Xizmatdan so‘ng to‘lov</span>
                </li>
              </ul>

              <a
                href={LINKS.webApp}
                className="group mt-5 flex items-center justify-center gap-2 rounded-2xl bg-brand-grad text-white py-4 text-[17px] font-bold shadow-[0_12px_28px_-12px_rgb(56_197_177/0.9)] transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-[0.99]"
              >
                Hamshira chaqirish
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={`tel:${LINKS.phone}`}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl py-2.5 text-[15px] font-medium whitespace-nowrap text-ink-soft transition hover:text-ink"
              >
                <Phone className="size-4" /> <span className="max-sm:hidden">yoki qo‘ng‘iroq qiling:</span><span className="sm:hidden">yoki qo‘ng‘iroq:</span> {LINKS.phoneLabel}
              </a>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-center text-xs text-ink-soft">
                <ShieldCheck className="size-3.5 shrink-0" /> Hayot uchun xavfli holatlarda darhol 103 ga qo‘ng‘iroq qiling
              </p>
            </div>
          </div>
    </>
  );
}
