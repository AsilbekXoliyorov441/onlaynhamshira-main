"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TRACK_PAD_X = 48; // .track chap+o'ng padding (24 + 24)
const DRAG_THRESHOLD = 5;

type Metrics = { step: number; max: number };

/**
 * Native scroll + scroll-snap ustidagi kichik karusel mantig'i.
 * DOM o'lchamlari faqat effect/handler ichida o'qiladi (hydration mismatch yo'q).
 */
export function useCarousel(total: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [pages, setPages] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const metrics = useCallback((): Metrics | null => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return { step: card.offsetWidth + gap, max: el.scrollWidth - el.clientWidth };
  }, []);

  const sync = useCallback(() => {
    const el = trackRef.current;
    const m = metrics();
    if (!el || !m) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const visible = Math.max(1, Math.floor((el.clientWidth - TRACK_PAD_X + gap) / m.step));
    const p = Math.max(1, total - visible + 1);
    const start = el.scrollLeft < 4;
    const end = el.scrollLeft >= m.max - 4;
    setAtStart(start);
    setAtEnd(end);
    setPages(p);
    setActiveIndex(end ? p - 1 : Math.min(p - 1, Math.round(el.scrollLeft / m.step)));
    // Chekka xiralashuv niqobi (CSS [data-edge])
    el.dataset.edge = m.max <= 4 ? "none" : start ? "start" : end ? "end" : "middle";
  }, [metrics, total]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; sync(); });
    };
    sync();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sync]);

  const goTo = useCallback(
    (index: number) => {
      const m = metrics();
      if (m) trackRef.current?.scrollTo({ left: index * m.step, behavior: "smooth" });
    },
    [metrics],
  );
  const scrollByStep = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current;
      const m = metrics();
      if (!el || !m) return;
      el.scrollTo({ left: (Math.round(el.scrollLeft / m.step) + dir) * m.step, behavior: "smooth" });
    },
    [metrics],
  );

  // ---- Sichqoncha bilan sudrash (sensorli ekranda native skroll) ----
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const endDrag = useCallback(() => {
    const el = trackRef.current;
    const d = drag.current;
    drag.current = null;
    if (!el || !d?.moved) return;
    setIsDragging(false);
    const m = metrics();
    // Klass olib tashlangach (snap/smooth qaytgach) eng yaqin kartaga tekislash
    requestAnimationFrame(() => {
      if (m) el.scrollTo({ left: Math.round(el.scrollLeft / m.step) * m.step, behavior: "smooth" });
    });
  }, [metrics]);

  const handlers = {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      suppressClick.current = false;
      drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft, moved: false };
    },
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      if (!d) return;
      const dx = e.clientX - d.x;
      if (!d.moved) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        d.moved = true;
        suppressClick.current = true;
        setIsDragging(true);
      }
      e.currentTarget.scrollLeft = d.left - dx;
    },
    onPointerUp: endDrag,
    onPointerLeave: endDrag,
    onPointerCancel: endDrag,
    // Sudrashdan keyingi "click" kartadagi havolani ochmasin
    onClickCapture: (e: React.MouseEvent) => {
      if (suppressClick.current) {
        e.preventDefault();
        e.stopPropagation();
        suppressClick.current = false;
      }
    },
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.target !== e.currentTarget) return; // faqat trek o'zi fokusda bo'lganda
      e.preventDefault();
      goTo(Math.max(0, Math.min(pages - 1, activeIndex + (e.key === "ArrowRight" ? 1 : -1))));
    },
  };

  return { trackRef, atStart, atEnd, pages, activeIndex, isDragging, goTo, scrollByStep, handlers };
}
