"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import type { Dict } from "@/lib/i18n/dictionaries/uz";
import { fill } from "@/lib/i18n/format";
import { setScrollLock } from "../Motion";

export type CertImage = { src: string; srcSet?: string; width: number; height: number };

type Doc = CertImage & { title: string; verify: string };

/**
 * Hujjatni to'liq o'lchamda ko'rsatish. Sahifadagi `a[data-cert="i"]` havolalari bosilganda ochiladi
 * (delegatsiya) — JS yuklanmagan bo'lsa havola rasmning o'zini ochadi.
 */
export function CertificateViewer({ docs, t, close: closeLabel }: { docs: Doc[]; t: Dict["certificates"]; close: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((dir: number) => setIndex((i) => (i === null ? i : (i + dir + docs.length) % docs.length)), [docs.length]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element).closest?.<HTMLElement>("[data-cert]");
      if (!a) return;
      e.preventDefault();
      opener.current = a;
      setIndex(Number(a.dataset.cert));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const open = index !== null;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    setScrollLock(true);
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      setScrollLock(false);
      opener.current?.focus();
    };
  }, [open, close, step]);

  if (index === null) return null;
  const doc = docs[index];

  return (
    <div
      className="fixed inset-0 z-[100] flex animate-[pop_.25s_ease-out_both] flex-col bg-ink/85 backdrop-blur-md"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={t.viewer.label}
      onClick={close}
    >
      <div className="flex items-center gap-3 px-4 pt-[calc(12px+env(safe-area-inset-top))] pb-3 text-white sm:px-6" onClick={(e) => e.stopPropagation()}>
        <p className="min-w-0 flex-1 truncate font-semibold" aria-live="polite">
          <span className="mr-2 text-white/60 tabular-nums">{fill(t.viewer.counter, { n: index + 1, total: docs.length })}</span>
          {doc.title}
        </p>
        <a
          href={doc.verify}
          target="_blank"
          rel="noopener nofollow"
          className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/20 sm:inline-flex"
        >
          <ExternalLink className="size-4" /> {t.verify}
        </a>
        <button ref={closeRef} onClick={close} aria-label={closeLabel} className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-[calc(16px+env(safe-area-inset-bottom))] sm:px-20">
        {/* key: hujjat almashganda kichik "pop" animatsiyasi qayta ishlaydi */}
        <img
          key={doc.src}
          src={doc.src}
          srcSet={doc.srcSet}
          sizes="(max-width: 640px) 100vw, 80vw"
          width={doc.width}
          height={doc.height}
          alt={doc.title}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full w-auto max-w-full animate-pop rounded-lg object-contain shadow-2xl"
        />
        {docs.length > 1 && (
          <>
            <button
              onClick={(e) => (e.stopPropagation(), step(-1))}
              aria-label={t.viewer.prev}
              className="absolute top-1/2 left-2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition hover:bg-white sm:left-5"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={(e) => (e.stopPropagation(), step(1))}
              aria-label={t.viewer.next}
              className="absolute top-1/2 right-2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition hover:bg-white sm:right-5"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
