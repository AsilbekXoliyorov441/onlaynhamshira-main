"use client";

import { useEffect } from "react";

/** .yt-facade havolasi bosilganda — o'sha joyga youtube-nocookie iframe'i (avtomatik ijro bilan) qo'yiladi */
export function YouTubeFacade() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.<HTMLAnchorElement>("a.yt-facade[data-yt]");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      const f = document.createElement("iframe");
      f.src = `https://www.youtube-nocookie.com/embed/${a.dataset.yt}?autoplay=1&rel=0`;
      f.title = a.textContent?.trim() || "YouTube";
      f.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      f.allowFullscreen = true;
      f.className = "yt-frame";
      a.replaceWith(f);
      f.focus();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
