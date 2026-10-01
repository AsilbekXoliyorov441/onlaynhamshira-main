"use client";

import { useRef } from "react";
import s from "../HowItWorks.module.css";
import { Back, Tick } from "../icons";
import { useSceneState, useSceneTimeline } from "../useSceneTimeline";
import { screenCls, type ScreenProps } from "./types";

const NUM = "12 345 67 89";
const CODE = "881536".split("");

type St = { codeView: boolean; focus: boolean; typed: string; otp: string[]; cd: number; loading: boolean };
const INITIAL: St = { codeView: false, focus: false, typed: "", otp: ["", "", "", "", "", ""], cd: 59, loading: false };

export function RegisterScreen(p: ScreenProps) {
  const t = p.t.reg;
  const [v, set] = useSceneState(p.runKey, INITIAL);
  const code = useRef<HTMLDivElement>(null);
  const verify = useRef<HTMLDivElement>(null);

  useSceneTimeline(p.runKey, p.reduced, ({ at, every }) => {
    let k = 0;
    at(400, () => {
      set((x) => ({ ...x, focus: true }));
      const id = every(95, () => {
        k++;
        set((x) => ({ ...x, typed: NUM.slice(0, k) }));
        if (k >= NUM.length) clearInterval(id);
      });
    });
    at(2100, () => p.tap(code.current));
    at(2400, () => {
      set((x) => ({ ...x, codeView: true }));
      every(1000, () => set((x) => ({ ...x, cd: x.cd - 1 })));
    });
    CODE.forEach((d, i) =>
      at(3100 + i * 220, () => set((x) => ({ ...x, otp: x.otp.map((o, j) => (j === i ? d : o)) }))),
    );
    at(4700, () => {
      p.tap(verify.current);
      set((x) => ({ ...x, loading: true }));
    });
  });

  return (
    <div
      className={screenCls(p, `${s.s1} ${v.codeView ? s["code-view"] : ""}`)}
      id="s1"
      role="tabpanel"
      aria-label={p.panel}
      style={{ background: "#000" }}
    >
      <div className={s.sb} style={{ color: "#fff" }}><span>02:34</span><span className={s.ic}><span className={s.bat} /></span></div>
      <div className={s["sheet-top"]} />
      <div className={s.sheet}>
        <div className={s.hdr}><Back /><span>{t.header}</span></div>
        <div className={s.subs}>
          <div className={`${s.subp} ${s.a}`}>
            <div className={s.card}>
              <div className={s["otp-t"]}>{t.enterPhone}</div>
              <div className={s.lbl}>{t.phoneLabel}</div>
              <div className={`${s.inp} ${v.focus ? s.focus : ""}`}>
                <span className={s.cc}>+998</span><span>{v.typed}</span><span className={s.caret} />
              </div>
              <div className={s.agree}>
                <span className={s.chkb}><Tick width={11} height={11} style={{ color: "#fff" }} /></span>
                <span>{t.agree}<span className={s.gtext}>{t.agreeLink}</span></span>
              </div>
            </div>
            <div className={s.btns}>
              <div ref={code} className={s.gbtn}>{t.getCode}</div>
              <div className={s.obtn}>
                <span className={s.tg}><svg width="11" height="11" viewBox="0 0 24 24"><path d="M21 4 3 11l6 2 2 6 3-4 5 4z" fill="#fff" /></svg></span>
                {t.getCodeTg}
              </div>
            </div>
          </div>
          <div className={`${s.subp} ${s.b}`}>
            <div className={s.card}>
              <div className={s["otp-t"]}>{t.smsPrompt}</div>
              <div className={s["otp-n"]}><span className={s.gtext}>+998 12 345 67 89</span></div>
              <div className={s.otp}>
                {v.otp.map((d, i) => <span key={i} className={d ? s.on : undefined}>{d}</span>)}
              </div>
              <div className={s.resend}>{t.resend} <span>{v.cd}</span> {t.seconds}</div>
            </div>
            <div className={s.btns}>
              <div ref={verify} className={`${s.gbtn} ${v.loading ? s.loading : ""}`}>
                <span className={s.t}>{t.verify}</span><span className={s.spin} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
