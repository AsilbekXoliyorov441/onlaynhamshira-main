"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Timeline = {
  /** ms dan keyin bir marta (reduced motion'da darhol) */
  at: (ms: number, fn: () => void) => void;
  /** har ms da; clearInterval uchun id qaytaradi */
  every: (ms: number, fn: () => void) => ReturnType<typeof setInterval>;
};

/**
 * `runKey` o'zgarganda sahna skriptini qayta ishga tushiradi.
 * Barcha timeout/interval'lar yig'iladi va runKey o'zgarganda yoki unmount'da tozalanadi,
 * shuning uchun qadamlarni tez-tez bosganda eski animatsiyalar qolmaydi.
 * runKey === null — sahna ishlamaydi.
 */
export function useSceneTimeline(runKey: number | null, reduced: boolean, script: (t: Timeline) => void) {
  const scriptRef = useRef(script);
  scriptRef.current = script;

  useEffect(() => {
    if (runKey === null) return;
    const T: ReturnType<typeof setTimeout>[] = [];
    const I: ReturnType<typeof setInterval>[] = [];
    scriptRef.current({
      at: (ms, fn) => void T.push(setTimeout(fn, reduced ? 0 : ms)),
      every: (ms, fn) => {
        const id = setInterval(fn, ms);
        I.push(id);
        return id;
      },
    });
    return () => {
      T.forEach(clearTimeout);
      I.forEach(clearInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runKey]);
}

/**
 * Sahna holati. `runKey` yangilangan render'ning o'zida holat boshlang'ichga qaytadi
 * (React'ning "render paytida state'ni moslash" patterni) — namunadagidek avval reset,
 * keyin .active, shuning uchun oldingi oxirgi holat bir kadr ham ko'rinmaydi.
 */
export function useSceneState<S>(runKey: number | null, initial: S): [S, (u: S | ((p: S) => S)) => void] {
  const [st, setSt] = useState<{ run: number | null; s: S }>({ run: null, s: initial });
  const set = useCallback(
    (u: S | ((p: S) => S)) =>
      setSt((p) => ({ run: p.run, s: typeof u === "function" ? (u as (p: S) => S)(p.s) : u })),
    [],
  );
  if (runKey !== null && st.run !== runKey) {
    setSt({ run: runKey, s: initial });
    return [initial, set];
  }
  return [st.s, set];
}
