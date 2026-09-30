"use client";

import { useEffect, useRef, useState } from "react";

const W = 520;
const H = 827;

/** WebKit (Safari va iOS'dagi barcha brauzerlar) VP9 videoning shaffofligini ko'rsatmaydi */
function isWebKit() {
  const ua = navigator.userAgent;
  const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const safari = /Safari/.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS/.test(ua);
  return ios || safari;
}

/**
 * Ilova animatsiyasi:
 *  1) SSR/boshlang'ich — statik poster (33KB)
 *  2) bo'lim ekranga yaqinlashganda: shaffof VP9 WebM (240KB), Safari'da animatsiyali WebP (1MB)
 *  prefers-reduced-motion'da poster qoladi.
 */
export function AppPhone({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"poster" | "video" | "webp">("poster");

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setMode(isWebKit() ? "webp" : "video");
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const alt = "Onlayn Hamshira ilovasi: xizmatlar, hamshira tanlash va AI chat";
  return (
    <div ref={ref} className={className} style={{ aspectRatio: `${W} / ${H}` }}>
      {mode === "video" ? (
        <video
          src="/img/app/phone-v2.webm"
          poster="/img/app/phone-poster-v2.webp"
          width={W}
          height={H}
          autoPlay
          muted
          loop
          playsInline
          aria-label={alt}
          className="block size-full"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- animatsiyali WebP/poster: next/image optimallashtirishi animatsiyani buzadi
        <img
          src={mode === "webp" ? "/img/app/phone-v2.webp" : "/img/app/phone-poster-v2.webp"}
          alt={alt}
          width={W}
          height={H}
          loading="lazy"
          decoding="async"
          className="block size-full"
        />
      )}
    </div>
  );
}
