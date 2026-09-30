"use client";

import { useRef } from "react";
import s from "./HowItWorks.module.css";
import type { TapDot } from "./useTapDot";

export function PhoneFrame({
  boxRef, dot, onSwipe, onHover, children,
}: {
  boxRef: React.RefObject<HTMLDivElement | null>;
  dot: TapDot;
  onSwipe: (dir: 1 | -1) => void;
  onHover: (on: boolean) => void;
  children: React.ReactNode;
}) {
  const sx = useRef<number | null>(null);
  return (
    <div
      className={s.phone}
      aria-hidden
      // Faqat haqiqiy sichqoncha: sensorli ekranda tegish "hover" bo'lib qotib qolmasin
      onPointerEnter={(e) => { if (e.pointerType === "mouse") onHover(true); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") onHover(false); }}
      onTouchStart={(e) => { sx.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (sx.current === null) return;
        const dx = e.changedTouches[0].clientX - sx.current;
        if (Math.abs(dx) > 40) onSwipe(dx < 0 ? 1 : -1);
        sx.current = null;
      }}
    >
      <div className={s.box} ref={boxRef}>
        <span
          key={dot?.n ?? 0}
          className={dot ? `${s.tapdot} ${s.go}` : s.tapdot}
          style={dot ? { left: `${dot.x}px`, top: `${dot.y}px` } : undefined}
        />
        {children}
      </div>
    </div>
  );
}
