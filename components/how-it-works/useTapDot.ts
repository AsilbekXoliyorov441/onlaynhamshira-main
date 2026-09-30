"use client";

import { useCallback, useRef, useState } from "react";

export type TapDot = { x: number; y: number; n: number } | null;

/**
 * tap(el): nuqtani element markaziga qo'yadi va animatsiyani qayta boshlaydi,
 * elementga 220ms `pressed` klassini beradi. Telefon mobilda transform: scale()
 * qilinganligi uchun koordinatalar masshtabga bo'linadi.
 */
export function useTapDot(pressedClass: string, reduced: boolean) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [dot, setDot] = useState<TapDot>(null);

  const tap = useCallback(
    (el: HTMLElement | null) => {
      const box = boxRef.current;
      if (reduced || !box || !el) return;
      const b = box.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const s = b.width / box.offsetWidth;
      // `n` o'zgarsa key ham o'zgaradi → span qayta yaratiladi → .go animatsiyasi boshidan
      setDot((d) => ({ x: (r.left - b.left + r.width / 2) / s, y: (r.top - b.top + r.height / 2) / s, n: (d?.n ?? 0) + 1 }));
      el.classList.add(pressedClass);
      setTimeout(() => el.classList.remove(pressedClass), 220);
    },
    [pressedClass, reduced],
  );

  return { boxRef, dot, tap };
}
