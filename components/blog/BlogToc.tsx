"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/blog-shared";

/** Desktop mundarija: o'qilayotgan bo'lim ajratib ko'rsatiladi (aria-current) */
export function BlogToc({ items, title }: { items: TocItem[]; title: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    // Ekranning yuqori uchdan biridan o'tgan oxirgi sarlavha — faol (kadrga bir marta hisoblanadi)
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.innerHeight * 0.3;
      let cur = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= y) cur = el.id;
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, [items]);

  return (
    <nav aria-label={title}>
      <p className="text-sm font-semibold tracking-wide text-ink-soft uppercase">{title}</p>
      <ol className="mt-3 space-y-0.5 border-l-2 border-line">
        {items.map((i) => {
          const on = i.id === active;
          return (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-0.5 block border-l-2 py-1.5 pr-2 pl-4 text-[15px] leading-snug transition ${
                  on ? "border-brand-deep font-medium text-ink" : "border-transparent text-ink-soft hover:border-ink/30 hover:text-ink"
                }`}
              >
                {i.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
