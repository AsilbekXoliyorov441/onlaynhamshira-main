"use client";

import { useEffect, useState } from "react";
import type Lenis from "lenis";
import { ArrowUp } from "lucide-react";

let lenis: Lenis | null = null;

/** Modal / menyu ochilganda sahifa scrollini to'xtatish */
export function setScrollLock(locked: boolean) {
  document.body.style.overflow = locked ? "hidden" : "";
  if (locked) lenis?.stop();
  else lenis?.start();
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Lenis smooth scroll + scroll paytida paydo bo'lish animatsiyalari */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Sensorli qurilmada tabiiy skroll yaxshiroq — Lenis va uning doimiy rAF sikli kerak emas
    const touch = window.matchMedia("(hover: none)").matches;

    // Lenis faqat desktopda kerak — mobil bundle'ga tushmasligi uchun dinamik import
    let cancelled = false;
    if (!reduced && !touch) import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        anchors: { offset: -88 },
        // Gorizontal karusel va modal ichidagi scroll o'z holicha qoladi
        prevent: (node) => node.closest?.("[data-lenis-prevent]") != null,
      });
    });

    // [data-reveal] elementlari ko'rinish maydoniga kirganda animatsiya bilan chiqadi
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const scan = () =>
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    scan();
    // Filtrlashdan keyin yangi paydo bo'lgan kartalar uchun ham.
    // Sahifada DOM tez-tez o'zgaradi (animatsiyali sahnalar) — faqat element qo'shilganda
    // va kadrga bir marta skanerlaymiz.
    let pending = 0;
    const mo = new MutationObserver((list) => {
      if (pending || !list.some((m) => [...m.addedNodes].some((n) => n.nodeType === 1))) return;
      pending = requestAnimationFrame(() => { pending = 0; scan(); });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const untrack = trackScrollProgress();

    return () => {
      cancelled = true;
      untrack();
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(pending);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}

/**
 * Sahifa bo'ylab scroll progress (0..1) → :root dagi --scroll-p CSS o'zgaruvchisi.
 * React state emas: progress chizig'i/halqasi CSS orqali yangilanadi, komponentlar
 * har skroll kadrida qayta render bo'lmaydi. Bir marta (SmoothScroll ichida) ulanadi.
 */
function trackScrollProgress() {
  let raf = 0;
  const update = () => {
    raf = 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty("--scroll-p", String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  // Birinchi o'lchov keyingi kadrda — hydration paytida majburiy layout (forced reflow) bo'lmasin
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}

/** Qaysi bo'lim hozir ekranda ekanini aniqlaydi (header navigatsiyasi uchun) */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");
  useEffect(() => {
    const els = key.split(",").map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
  return active;
}

/** Faqat chegaradan o'tganda qayta render bo'ladi (har skroll kadrida emas) */
function useScrolledPast(ratio: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPast(max > 0 && window.scrollY / max > ratio);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, [ratio]);
  return past;
}

export function BackToTop() {
  const show = useScrolledPast(0.15);
  const R = 22;
  const C = 2 * Math.PI * R;
  return (
    <button
      onClick={scrollToTop}
      aria-label="Sahifa boshiga qaytish"
      tabIndex={show ? 0 : -1}
      className={`fixed right-5 bottom-6 z-40 hidden size-14 place-items-center rounded-full bg-white shadow-[0_12px_32px_-12px_rgb(16_41_58/0.45)] ring-1 ring-line transition duration-300 hover:-translate-y-1 lg:grid ${
        show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r={R} fill="none" stroke="var(--color-mint)" strokeWidth="3" />
        <circle
          cx="24" cy="24" r={R} fill="none" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray={C} style={{ strokeDashoffset: `calc(${C}px * (1 - var(--scroll-p, 0)))` }}
        />
      </svg>
      <ArrowUp className="relative size-5" />
    </button>
  );
}
