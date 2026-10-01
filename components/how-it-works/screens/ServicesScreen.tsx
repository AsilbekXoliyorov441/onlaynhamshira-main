"use client";

import { useRef } from "react";
import s from "../HowItWorks.module.css";
import { Back } from "../icons";
import { formatPrice } from "@/lib/i18n/format";
import { useSceneState, useSceneTimeline } from "../useSceneTimeline";
import { screenCls, type ScreenProps } from "./types";

type St = { on1: boolean; on2: boolean; sum: number; bump: number };
const INITIAL: St = { on1: false, on2: false, sum: 50000, bump: 0 };

const Stepper = () => <span className={s.stepper}><b>−</b>1<b>+</b></span>;

export function ServicesScreen(p: ScreenProps) {
  const t = p.t.svc;
  const fmt = (n: number) => formatPrice(n, p.money);
  const [v, set] = useSceneState(p.runKey, INITIAL);
  const add1 = useRef<HTMLButtonElement>(null);
  const add2 = useRef<HTMLButtonElement>(null);
  const ready = useRef<HTMLDivElement>(null);

  useSceneTimeline(p.runKey, p.reduced, ({ at }) => {
    at(1100, () => p.tap(add1.current));
    at(1300, () => set((x) => ({ ...x, on1: true, sum: 100000, bump: x.bump + 1 })));
    at(2500, () => p.tap(add2.current));
    at(2700, () => set((x) => ({ ...x, on2: true, sum: 150000, bump: x.bump + 1 })));
    at(4200, () => p.tap(ready.current));
  });

  return (
    <div className={screenCls(p, s.s2)} id="s2" role="tabpanel" aria-label={p.panel}>
      <div className={s.sb}><span>02:35</span><span className={s.ic}><span className={s.bat} /></span></div>
      <div className={s.hdr}><Back /><span>{t.profile}</span></div>
      <div className={s["sec-t"]}>{t.list}</div>
      <div className={`${s.card} ${s.call}`}>{t.callPrice}<br /><span className={s.gtext}>{fmt(50000)}</span></div>
      <div className={`${s.card} ${s["svc-wrap"]}`}>
        <h5>{t.choose}</h5>
        <div className={`${s.item} ${v.on1 ? s.on : ""}`}>
          <div className={s.r1}>{t.items[0]}<i className={s.info}>i</i></div>
          <div className={s.r2}><span className={`${s.price} ${s.gtext}`}>{fmt(50000)}</span><button ref={add1} className={s.add} tabIndex={-1}>{t.add}</button><Stepper /></div>
        </div>
        <div className={`${s.item} ${v.on2 ? s.on : ""}`}>
          <div className={s.r1}>{t.items[1]}<i className={s.info}>i</i></div>
          <div className={s.r2}><span className={`${s.price} ${s.gtext}`}>{fmt(50000)}</span><button ref={add2} className={s.add} tabIndex={-1}>{t.add}</button><Stepper /></div>
        </div>
        <div className={s.item}>
          <div className={s.r1}>{t.items[2]}<i className={s.info}>i</i></div>
          <div className={s.r2}><span className={`${s.price} ${s.gtext}`}>{fmt(50000)}</span><button className={s.add} tabIndex={-1}>{t.add}</button></div>
        </div>
        <div className={s.item}>
          <div className={s.r1}>{t.items[3]}<i className={s.info}>i</i></div>
          <div className={s.r2}><span className={`${s.price} ${s.gtext}`}>{fmt(120000)}</span><button className={s.add} tabIndex={-1}>{t.add}</button></div>
        </div>
      </div>
      <div className={s.total}>
        <div className={s.row}>
          <span>{t.total}</span>
          {/* key o'zgarsa span qayta yaratiladi → bump animatsiyasi boshidan */}
          <span key={v.bump} className={v.bump ? `${s.sum} ${s.bump}` : s.sum}>{fmt(v.sum)}</span>
        </div>
        <div ref={ready} className={s.gbtn}>{t.ready}</div>
      </div>
    </div>
  );
}
