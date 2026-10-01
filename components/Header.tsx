"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { LINKS, NAV } from "@/lib/data";
import { Logo, InstagramIcon, TelegramIcon, YoutubeIcon } from "./StoreIcons";
import { StoreButtons } from "./DownloadModal";
import { setScrollLock, useActiveSection } from "./Motion";

const SECTION_IDS = NAV.map((n) => n.href.slice(1));

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setScrollLock(menu);
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 ${
          scrolled ? "bg-white/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center gap-6 px-4 sm:px-6">
          <a href="#top" aria-label="Onlayn Hamshira — bosh sahifa" className="shrink-0">
            <Logo className="h-9 sm:h-10" />
          </a>

          <nav aria-label="Asosiy" className="ml-4 hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((n) => {
                const on = active === n.href.slice(1);
                return (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      aria-current={on ? "location" : undefined}
                      className={`relative rounded-full px-3.5 py-2 text-[15px] transition ${
                        on ? "bg-mint font-medium text-ink" : "text-ink-soft hover:bg-mist hover:text-ink"
                      }`}
                    >
                      {n.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={`tel:${LINKS.phone}`}
              className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-semibold transition hover:bg-mist md:inline-flex"
            >
              <Phone className="size-4 text-brand-deep" /> {LINKS.phoneLabel}
            </a>
            <a
              href={LINKS.webApp}
              className="hidden rounded-full bg-brand-grad text-white px-5 py-2.5 text-[15px] font-semibold shadow-[0_8px_20px_-10px_rgb(56_197_177/0.9)] transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 sm:inline-flex"
            >
              Hamshira chaqirish
            </a>
            <button
              onClick={() => setMenu(true)}
              aria-label="Menyuni ochish"
              aria-expanded={menu}
              className="grid size-11 place-items-center rounded-full border border-line bg-white transition hover:border-brand lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
        {/* Scroll progress */}
        <div
          aria-hidden
          className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r from-brand via-brand-teal to-brand-blue transition-opacity ${scrolled ? "opacity-100" : "opacity-0"}`}
          style={{ transform: "scaleX(var(--scroll-p, 0))" }}
        />
      </header>

      {/* Mobil menyu */}
      <div
        // Yopiq menyu invisible: ekrandan tashqaridagi rasmlari LCP nomzodi bo'lmaydi; visibility yopilish animatsiyasi tugagach o'chadi
        className={`fixed inset-0 z-[60] transition-[visibility] duration-300 lg:hidden ${menu ? "visible" : "pointer-events-none invisible"}`}
        aria-hidden={!menu}
        inert={!menu}
      >
        <div
          onClick={() => setMenu(false)}
          className={`absolute inset-0 bg-ink/30 backdrop-blur-sm transition-opacity ${menu ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute top-0 right-0 flex h-full w-[min(92vw,400px)] flex-col bg-white p-6 pt-[calc(env(safe-area-inset-top)+24px)] shadow-2xl transition-transform duration-300 ${
            menu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo className="h-9" />
            <button onClick={() => setMenu(false)} aria-label="Menyuni yopish" className="grid size-11 place-items-center rounded-full bg-mist">
              <X className="size-5" />
            </button>
          </div>
          <nav className="mt-8" aria-label="Mobil">
            <ul className="space-y-1">
              {[...NAV, { label: "Blog", href: LINKS.blog }, { label: "Hamkor va mutaxassis bo‘ling", href: LINKS.expert }].map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenu(false)}
                    tabIndex={menu ? 0 : -1}
                    className="block rounded-xl px-3 py-3 text-lg font-medium transition hover:bg-mist"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-3">
            <a href={LINKS.webApp} tabIndex={menu ? 0 : -1} className="flex justify-center rounded-2xl bg-brand-grad text-white py-4 font-semibold">
              Hamshirani onlayn chaqirish
            </a>
            <a href={`tel:${LINKS.phone}`} tabIndex={menu ? 0 : -1} className="flex items-center justify-center gap-2 rounded-2xl border border-line py-4 font-semibold">
              <Phone className="size-4" /> {LINKS.phoneLabel}
            </a>
            <StoreButtons className="justify-center" />
            <div className="flex justify-center gap-3 pt-2">
              {[
                { href: LINKS.telegram, Icon: TelegramIcon, l: "Telegram" },
                { href: LINKS.instagram, Icon: InstagramIcon, l: "Instagram" },
                { href: LINKS.youtube, Icon: YoutubeIcon, l: "YouTube" },
              ].map(({ href, Icon, l }) => (
                <a key={l} href={href} aria-label={l} tabIndex={menu ? 0 : -1} className="grid size-11 place-items-center rounded-full bg-mint text-brand-deep">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
