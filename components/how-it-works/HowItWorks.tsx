"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LINKS } from "@/lib/data";
import s from "./HowItWorks.module.css";
import { SpriteDefs, Tick } from "./icons";
import { PhoneFrame } from "./PhoneFrame";
import { STEPS } from "./steps";
import { useTapDot } from "./useTapDot";
import { PlayStoreScreen } from "./screens/PlayStoreScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { ServicesScreen } from "./screens/ServicesScreen";
import { SearchScreen } from "./screens/SearchScreen";

const TINTS = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)"];
// memo: tap nuqtasi / hover o'zgarganda ota qayta render bo'ladi, ekranlar esa faqat o'z props'lari o'zgarganda
const SCREENS = [PlayStoreScreen, RegisterScreen, ServicesScreen, SearchScreen].map((C) => memo(C));

type Nav = { active: number; prev: number | null; runId: number };

export default function HowItWorks() {
  // runId 0 — namunadagi boshlang'ich HTML holati (1-qadam faol, sahna hali boshlanmagan)
  const [nav, setNav] = useState<Nav>({ active: 0, prev: null, runId: 0 });
  // Endi faqat prefers-reduced-motion uchun (pauza tugmasi olib tashlangan)
  const [userPaused, setUserPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [inView, setInView] = useState(false);
  // Sensorli qurilmalarda (mobil) skroll paytida ham to'xtamaydi
  const [touch, setTouch] = useState(false);
  const [seen, setSeen] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { boxRef, dot, tap } = useTapDot(s.pressed, reduced);

  // animationend'da eng so'nggi qiymatlar kerak
  const live = useRef({ userPaused, hover, active: nav.active });
  live.current = { userPaused, hover, active: nav.active };

  const go = useCallback((n: number) => {
    const next = ((n % 4) + 4) % 4;
    setNav((p) => ({ active: next, prev: p.active, runId: p.runId + 1 }));
    return next;
  }, []);

  // prefers-reduced-motion: avtomatik o'tish o'chiq, kechikishlar 0
  useEffect(() => {
    setTouch(matchMedia("(hover: none)").matches);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setUserPaused(true);
    }
  }, []);

  // Birinchi marta ko'ringanda go(0); ko'rinmay qolganda pauza
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let first = true;
    const io = new IntersectionObserver(
      ([en]) => {
        setInView(en.isIntersecting);
        if (en.isIntersecting && first) {
          first = false;
          setSeen(true);
          go(0);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [go]);

  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = go(live.current.active + d);
    stepRefs.current[n]?.focus();
  };

  const { active, prev, runId } = nav;
  const paused = userPaused || hover || (!inView && !touch);

  return (
    <section id="about" ref={rootRef} className={paused ? `${s.how} ${s.paused}` : s.how} aria-labelledby="how-title">
      <SpriteDefs />
      <div className={s.head}>
        <span className={s.pill}>Yo‘riqnoma</span>
        <h2 id="how-title">Uyda tibbiy yordamni qanday olish mumkin?</h2>
        <p className={s.sub}>Atigi 4 qadam – va hamshira uyingizda bo‘ladi!</p>
      </div>

      <div className={s.stage}>
        <ol className={s.steps} role="tablist" aria-label="Qadamlar">
          {STEPS.map((st, i) => {
            const on = i === active;
            return (
              <li key={st.title} role="presentation">
                <button
                  ref={(el) => { stepRefs.current[i] = el; }}
                  className={[s.step, on && s.active, i < active && s.past].filter(Boolean).join(" ")}
                  data-i={i}
                  style={{ "--dur": st.dur } as React.CSSProperties}
                  role="tab"
                  aria-selected={on}
                  aria-controls={`s${i}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => go(i)}
                  onKeyDown={onKey}
                >
                  <span className={s.num}><span>{i + 1}</span><Tick className={s.done} width={18} height={18} /></span>
                  <h3>{st.title}</h3>
                  <span className={s.desc}><div><p>{st.desc}</p></div></span>
                  <span className={s.bar}>
                    {/* key={runId} — har go() da animatsiya boshidan (namunadagi reflow o'rniga) */}
                    <i
                      key={on ? runId : "idle"}
                      onAnimationEnd={() => {
                        const l = live.current;
                        if (on && !l.userPaused && !l.hover) go(l.active + 1);
                      }}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className={s["device-wrap"]}>
          <div className={s.blob} style={runId ? ({ "--blob": TINTS[active] } as React.CSSProperties) : undefined} />
          <div>
            {/* Faqat telefon ustida hover bo'lganda to'xtaydi */}
            <PhoneFrame boxRef={boxRef} dot={dot} onSwipe={(d) => go(active + d)} onHover={setHover}>
              {SCREENS.map((Screen, i) => (
                <Screen
                  key={i}
                  active={i === active}
                  leave={i === prev && i !== active}
                  runKey={seen && i === active ? runId : null}
                  reduced={reduced}
                  tap={tap}
                />
              ))}
            </PhoneFrame>
          </div>
        </div>
        <p className={s.mdesc} aria-live="polite">{runId ? STEPS[active].desc : ""}</p>
      </div>

      <div className={s.cta}>
        <Link href={LINKS.webApp}>Hozir buyurtma berish</Link>
        <span>Ilovasiz ham ishlaydi, brauzerda.</span>
      </div>
    </section>
  );
}
