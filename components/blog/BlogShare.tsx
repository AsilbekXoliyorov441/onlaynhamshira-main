"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { TelegramIcon } from "../StoreIcons";

/** Telegram'da ulashish (oddiy havola, JS'siz ishlaydi) + havolani nusxalash */
export function BlogShare({ url, title, t }: { url: string; title: string; t: { share: string; shareTelegram: string; copy: string; copied: string } }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  const btn = "grid size-11 place-items-center rounded-full bg-mist text-ink transition hover:bg-brand-grad hover:text-white";
  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-ink-soft">{t.share}</span>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener"
        aria-label={t.shareTelegram}
        className={btn}
      >
        <TelegramIcon />
      </a>
      <button type="button" onClick={copy} aria-label={t.copy} className={btn}>
        {copied ? <Check className="size-5" aria-hidden /> : <Link2 className="size-5" aria-hidden />}
      </button>
      <span role="status" className={`text-sm font-medium text-brand-deep transition ${copied ? "opacity-100" : "opacity-0"}`}>
        {copied ? t.copied : ""}
      </span>
    </div>
  );
}
