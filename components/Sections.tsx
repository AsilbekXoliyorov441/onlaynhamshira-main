import Image from "next/image";
import Link from "next/link";
import ns from "./news/News.module.css";
import { NewsCarousel } from "./news/NewsCarousel";
import { NewsCard, type NewsPost } from "./news/NewsCard";
import { ArrowRight as NewsArrowRight } from "./news/icons";
import { ArrowRight, Globe, Mail } from "lucide-react";
import { BENEFITS, IMAGES, LINKS, NEWS, SAFETY } from "@/lib/data";
import { StoreButtons } from "./DownloadModal";
import { AppPhone } from "./AppPhone";
import { InstagramIcon, Logo, TelegramIcon, YoutubeIcon } from "./StoreIcons";
import { Icon, IconTile, type IconName } from "./Icon";

const d = (i: number) => ({ "--d": i }) as React.CSSProperties;

export function SectionHead({
  label, title, text, align = "center", id, wide,
}: { label: string; title: string; text?: string; align?: "center" | "left"; id?: string; wide?: boolean }) {
  const c = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    // wide: uzun sarlavha desktopda 2 qatorga sig'ishi uchun
    <div data-reveal className={`flex flex-col ${wide ? "max-w-[1000px]" : "max-w-[760px]"} ${c}`}>
      <p className="inline-flex items-center gap-2 rounded-full bg-mint px-3.5 py-1.5 text-sm font-semibold text-brand-deep">
        <span className="size-1.5 rounded-full bg-brand-deep" />
        {label}
      </p>
      <h2 id={id} className="mt-3 text-[32px] leading-[1.08] font-semibold tracking-[-0.025em] text-balance sm:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-pretty text-ink-soft">{text}</p>}
    </div>
  );
}

const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-[1320px] px-4 sm:px-6 ${className}`}>{children}</div>
);

/* ───────── Afzalliklar ───────── */
const BENEFIT_ICONS: Record<(typeof BENEFITS)[number]["icon"], IconName> = {
  clock: "clock", shield: "shield", wallet: "wallet", tag: "label", phone: "phone", calendar: "calendar",
};

export function Benefits() {
  return (
    <section aria-labelledby="ben-h" className="bg-mist py-16 sm:py-24 lg:py-32">
      <Wrap className="grid gap-10 sm:gap-14 lg:grid-cols-[0.9fr_1.3fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            id="ben-h"
            align="left"
            label="Afzalliklar"
            title="Nima uchun Onlayn Hamshirani tanlashadi?"
            text="Qulay, xavfsiz va professional xizmat - sizning salomatligingiz uchun!"
          />
          <a href={LINKS.webApp} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand-grad text-white px-7 py-4 font-semibold transition hover:-translate-y-0.5 hover:brightness-105">
            Hamshira chaqirish <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {BENEFITS.map((b, i) => (
            <li key={b.title} data-reveal style={d(i % 2)} className="lift flex gap-4 rounded-[24px] bg-white p-5 sm:block sm:rounded-[28px] sm:p-7">
              <IconTile name={BENEFIT_ICONS[b.icon]} size={64} className="max-sm:size-12! max-sm:rounded-2xl" />
              <div>
                <h3 className="text-lg leading-snug font-semibold tracking-tight sm:mt-6 sm:text-2xl">{b.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft sm:mt-2 sm:text-base">{b.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

/* ───────── Ilova banneri ───────── */
export function AppBand() {
  return (
    // lg: telefonning ~1/6 qismi bo'limdan tepaga chiqib turadi, shuning uchun ustida joy qoldiramiz
    <section aria-labelledby="app-h" className="px-3 sm:px-4 lg:pt-[130px]">
      <div
        data-reveal="scale"
        className="relative mx-auto max-w-[1400px] rounded-[36px] bg-[linear-gradient(135deg,#12803e_0%,#0b7571_50%,#0d619b_100%)] text-white"
      >
        {/* Yorug'lik va to'r naqshi — faqat kartochka ichida */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[36px]">
          <div className="absolute -top-40 -left-32 size-[520px] rounded-full bg-white/[0.07] blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgb(255_255_255/0.14)_1.2px,transparent_1.6px)] bg-[length:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_80%_50%,#000_10%,transparent_70%)]" />
        </div>

        <div className="relative grid gap-10 px-6 pt-14 pb-10 sm:px-14 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:pt-16 lg:pb-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-semibold ring-1 ring-white/25 backdrop-blur">
              <span className="size-1.5 rounded-full bg-white" /> Mobil ilova
            </p>
            <h2 id="app-h" className="mt-4 max-w-[16ch] text-[34px] leading-[1.05] font-bold tracking-[-0.03em] text-balance sm:text-[52px]">
              Onlayn Hamshira ilovasini yuklab oling
            </h2>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-white/95">
              Uyga hamshira chaqirish, tibbiy maslahat yoki massajni bir necha soniyada rasmiylashtiring — barcha jarayonlar siz uchun soddalashtirilgan.
            </p>

            <div className="mt-9 flex flex-col items-start gap-6">
              <StoreButtons className="shrink-0 flex-nowrap max-[360px]:flex-wrap" />
              <div className="hidden items-center gap-3 lg:flex">
                <div className="flex gap-2 rounded-2xl bg-white p-2 shadow-[0_12px_30px_-14px_rgb(0_0_0/0.45)]">
                  {[IMAGES.qrAndroid, IMAGES.qrIphone].map((q) => (
                    <Image key={q} src={q} alt="" width={88} height={88} unoptimized className="size-[88px] rounded-lg" />
                  ))}
                </div>
                <p className="max-w-[16ch] text-sm leading-snug text-white/90">Kamerani QR kodga qarating</p>
              </div>
            </div>
          </div>

          {/* Telefon: lg'da balandligining 1/6 qismi (≈110px) kartochkadan tepaga chiqadi */}
          <div className="relative mx-auto flex w-full max-w-[500px] justify-center lg:-mt-[175px] lg:self-start">
            <div aria-hidden className="absolute bottom-[10%] left-1/2 size-[360px] -translate-x-1/2 rounded-full bg-white/25 blur-[70px]" />
            {/* drop-shadow har video kadrida qayta hisoblanadi — mobilda o'chiq (GPU yuklamasi) */}
            <AppPhone className="relative w-[78%] max-w-[420px] transition duration-700 hover:-translate-y-1 hover:-rotate-2 sm:drop-shadow-[0_40px_50px_rgb(0_0_0/0.35)] lg:w-[420px]" />
            <div aria-hidden className="absolute top-[38%] -left-2 hidden animate-float items-center gap-2.5 rounded-2xl bg-white py-2 pr-4 pl-2 text-ink shadow-xl sm:flex">
              <Icon name="chat" size={36} tone="tile" className="ring-0!" />
              <span className="text-sm leading-tight"><strong className="block">AI chat</strong><span className="text-ink-soft">24/7 javob beradi</span></span>
            </div>
            <div aria-hidden className="absolute right-0 bottom-[18%] hidden animate-float-slow items-center gap-2.5 rounded-2xl bg-white py-2 pr-4 pl-2 text-ink shadow-xl sm:flex">
              <Icon name="check" size={36} tone="tile" className="ring-0!" />
              <span className="text-sm leading-tight"><strong className="block">Hamshira yo‘lda</strong><span className="text-ink-soft">30–90 daqiqada</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Xavfsizlik ───────── */
const SAFETY_ICONS: IconName[] = ["shield", "handshake", "chat", "headphone"];
export function Safety() {
  const tones = ["bg-peach", "bg-sky", "bg-lilac", "bg-mint"];
  return (
    <section aria-labelledby="safe-h" className="py-16 sm:py-24 lg:py-32">
      <Wrap>
        <SectionHead
          id="safe-h"
          label="Xavfsizlik"
          title="Sizning xavfsizligingiz – bizning eng muhim vazifamiz"
          text="Siz har bir chaqiruvga ishonch hosil qilishingiz uchun mutaxassislarni puxta tanlab olamiz."
        />
        <ul className="mt-10 grid gap-3 sm:mt-14 md:grid-cols-2">
          {SAFETY.map((s, i) => (
            <li key={s.title} data-reveal style={d(i % 2)} className={`${tones[i]} lift flex gap-4 rounded-[24px] p-5 sm:gap-6 sm:rounded-[28px] sm:p-9`}>
              <IconTile name={SAFETY_ICONS[i]} size={76} className="max-sm:size-12! max-sm:rounded-2xl" />
              <div>
                <h3 className="text-lg leading-snug font-semibold tracking-tight sm:text-2xl sm:leading-tight">{s.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft sm:mt-3 sm:text-base">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center">
          <a href={LINKS.certificates} className="group inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 font-semibold text-brand-deep transition hover:-translate-y-0.5 hover:bg-brand-grad hover:text-white">
            <Icon name="check2" size={20} tone="current" /> Sertifikatlarni ko‘rish
          </a>
        </p>
      </Wrap>
    </section>
  );
}

/* ───────── Yangiliklar ───────── */
// Shundan ko'p yangilik bo'lsa karusel, aks holda oddiy to'r (JS'siz)
const NEWS_CAROUSEL_FROM = 4;

export function News() {
  // Mavjud ma'lumot manbai (lib/data NEWS) karta maydonlariga moslanadi; alohida post sahifasi yo'q —
  // avvalgidek barcha kartalar blogga olib boradi. Kategoriya maydoni yo'q → UI'da ko'rsatilmaydi.
  const posts: NewsPost[] = NEWS.map((n) => ({ title: n.title, excerpt: n.text, image: n.img, href: LINKS.blog }));
  if (!posts.length) return null;

  return (
    <section aria-labelledby="news-h" className={ns.section}>
      <div className={ns.container}>
        <SectionHead
          id="news-h"
          label="Yangiliklar"
          title="Biz siz uchun takomillashmoqdamiz — yangiliklarni kuzatib boring!"
          text="Yangiliklar, aksiyalar va salomatlik bo‘yicha foydali maslahatlardan xabardor bo‘lib turing."
        />

        {posts.length >= NEWS_CAROUSEL_FROM ? (
          <NewsCarousel posts={posts} />
        ) : (
          <div className={ns.grid} style={{ "--n": posts.length } as React.CSSProperties}>
            {posts.map((p) => <NewsCard key={p.title} post={p} />)}
          </div>
        )}

        <Link href={LINKS.blog} className={ns.allLink}>
          Barcha maqolalar
          <span className={ns.allLinkIcon}><NewsArrowRight /></span>
        </Link>
      </div>
    </section>
  );
}

/* ───────── Aloqa ───────── */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className="px-3 pb-3 sm:px-4">
      <div className="mx-auto grid max-w-[1400px] gap-3 lg:grid-cols-2">
        <div data-reveal="scale" className="relative order-2 min-h-[280px] overflow-hidden rounded-[28px] bg-mist sm:min-h-[420px] sm:rounded-[32px] lg:order-none">
          <iframe
            src={LINKS.map}
            title="Onlayn Hamshira manzili xaritada"
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
        <div data-reveal="scale" style={d(1)} className="relative overflow-hidden rounded-[28px] bg-mint p-6 sm:rounded-[32px] sm:p-12">
          <div aria-hidden className="pointer-events-none absolute top-8 right-8 hidden animate-float sm:block"><Icon name="telephone" size={76} tone="tile" className="rotate-6" /></div>
          <h2 id="contact-h" className="sr-only">Aloqa</h2>
          <p className="text-[15px] font-medium text-brand-deep">Telefon:</p>
          <a href={`tel:${LINKS.phone}`} className="mt-2 block text-[28px] font-bold tracking-tight whitespace-nowrap tabular-nums hover:underline min-[400px]:text-[32px] sm:text-5xl">
            +998-78-113-96-16
          </a>
          <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8">
            <div>
              <p className="flex items-center gap-2 font-semibold"><Icon name="pin" size={20} /> Manzil:</p>
              <p className="mt-2 text-ink-soft">Toshkent shahri, Shahrisabz ko‘chasi 25, U-Enter</p>
            </div>
            <div>
              <p className="flex items-center gap-2 font-semibold"><Icon name="clock" size={20} /> Ish vaqti:</p>
              <p className="mt-2 text-ink-soft">Dushanba-Yakshanba: 24/7</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <a href={LINKS.telegram} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-grad px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-105">
              <TelegramIcon /> Telegramda yozish
            </a>
            <a href={`mailto:${LINKS.email}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:bg-white/70">
              <Mail className="size-5" /> {LINKS.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Footer ───────── */
export function Footer() {
  const links = [
    { l: "Bosh sahifa", h: "#top" },
    { l: "Xizmat haqida", h: "#about" },
    { l: "Xizmatlar", h: "#services" },
    { l: "Fikr-mulohazalar", h: "#reviews" },
    { l: "FAQ", h: "#faq" },
    { l: "Blog", h: LINKS.blog },
    { l: "Hamkor va mutaxassis bo‘ling", h: LINKS.expert },
    { l: "Sertifikatlar", h: LINKS.certificates },
  ];
  const socials = [
    { href: LINKS.telegram, Icon: TelegramIcon, l: "Telegram" },
    { href: LINKS.instagram, Icon: InstagramIcon, l: "Instagram" },
    { href: LINKS.youtube, Icon: YoutubeIcon, l: "YouTube" },
  ];
  return (
    <footer className="px-3 pb-24 sm:px-4 lg:pb-4">
      <div className="mx-auto max-w-[1400px] rounded-[32px] bg-ink px-6 py-12 text-white sm:px-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1.6fr_1fr]">
          <div>
            <div className="inline-block rounded-2xl bg-white px-4 py-3"><Logo className="h-9" /></div>
            <p className="mt-6 max-w-[32ch] text-white/70">Tibbiy xizmatlar uyingizda - tez, qulay, xavfsiz!</p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ href, Icon, l }) => (
                <a key={l} href={href} aria-label={l} className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-brand-grad hover:text-white">
                  <Icon />
                </a>
              ))}
              <a href={`mailto:${LINKS.email}`} aria-label="Email" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-brand-grad hover:text-white">
                <Mail className="size-5" />
              </a>
            </div>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {links.map((x) => (
                <li key={x.l}><a href={x.h} className="text-white/80 transition hover:text-brand">{x.l}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <div className="flex gap-3">
              {[IMAGES.qrAndroid, IMAGES.qrIphone].map((q, i) => (
                <figure key={q} className="text-center text-xs text-white/60">
                  <Image src={q} alt={i ? "iPhone QR kod" : "Android QR kod"} width={100} height={100} unoptimized className="size-[100px] rounded-xl bg-white p-1.5" />
                  <figcaption className="mt-1.5">{i ? "iPhone" : "Android"}</figcaption>
                </figure>
              ))}
            </div>
            <a href={LINKS.webApp} className="mt-5 flex items-center justify-center gap-2 rounded-full border border-white/30 py-3 font-semibold transition hover:border-brand hover:text-brand">
              <Globe className="size-4" /> Onlayn ilova
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>©Barcha huquqlar himoyalangan {new Date().getFullYear()}.</p>
          <a href={LINKS.privacy} className="hover:text-white">Ommaviy oferta va maxfiylik siyosati</a>
        </div>
      </div>
    </footer>
  );
}
