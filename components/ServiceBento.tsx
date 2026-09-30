import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LINKS } from "@/lib/data";
import { Icon, type IconName } from "./Icon";
import { BentoPointer } from "./BentoPointer";

// Ilovadagi mutaxassislik rasmlari, /public/services ichida lokal nusxa
const img = (name: string) => `/services/${name}.webp`;

type Card = {
  title: string;
  grad: string;
  tall?: boolean;
  image?: string;
  // Shisha plitkalardagi ikonkalar kompozitsiyasi: [nom, o'lcham, pozitsiya klasslari]
  icons?: [IconName, number, string][];
};

// Barcha kartalar haqiqiy xizmat / mutaxassisliklarga mos keladi
const CARDS: Card[] = [
  {
    title: "Kichik tibbiy muolajalar",
    grad: "from-[#3fe0a0] via-[#2cc4b8] to-[#1aa6d9]",
    tall: true,
    icons: [
      ["syringe", 110, "right-[4%] bottom-[46%] rotate-6"],
      ["bandage", 100, "bottom-[26%] left-[4%] -rotate-12"],
      ["thermometer", 92, "right-[14%] bottom-[4%] rotate-[30deg]"],
    ],
  },
  { title: "Uyga hamshira chaqirish", grad: "from-[#5ab8f0] to-[#2f7fd6]", image: img("nurse") },
  { title: "Bolalar uchun muolajalar", grad: "from-[#ff8fb8] via-[#d77be8] to-[#9a6cf0]", tall: true, image: img("kids") },
  { title: "LOR xizmatlari", grad: "from-[#2fae7a] to-[#15594a]", tall: true, image: img("lor") },
  { title: "Massaj", grad: "from-[#ffb36b] to-[#f0785a]", image: img("massage") },
  { title: "Kardiolog", grad: "from-[#ff6b8a] to-[#c2336a]", image: img("cardio") },
  {
    title: "Analizlar",
    grad: "from-[#8a6cf0] via-[#6a4fd8] to-[#3d2d91]",
    tall: true,
    icons: [
      ["dna", 72, "top-[26%] left-[8%] -rotate-12"],
      ["testtube", 104, "right-[6%] bottom-[40%] rotate-12"],
      ["microscope", 136, "bottom-[5%] left-[6%]"],
    ],
  },
  { title: "Terapevt", grad: "from-[#4fd1e6] to-[#1f8fb3]", image: img("therapist") },
  { title: "Travmatolog", grad: "from-[#7aa2ff] to-[#3c5bd6]", image: img("trauma") },
  { title: "Psixolog", grad: "from-[#f7c65a] to-[#e08a2e]", image: img("psych") },
  { title: "EKG uyda", grad: "from-[#38d6c2] to-[#138a8a]", image: img("ekg") },
  { title: "Nevropatolog", grad: "from-[#c08cf5] to-[#7a4fd1]", image: img("neuro") },
];

export default function ServiceBento() {
  return (
    <section id="services" aria-labelledby="bento-h" className="px-3 pt-3 sm:px-4">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-[#0f2230] px-4 py-14 sm:px-10 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/4 size-[520px] rounded-full bg-sky-deep/20 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 size-[420px] rounded-full bg-[#8a6cf0]/20 blur-[120px]" />

        <div data-reveal className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-brand">
              <span className="size-1.5 rounded-full bg-brand-grad" /> Xizmatlar
            </p>
            <h2 id="bento-h" className="mt-3 max-w-[18ch] text-[32px] leading-[1.08] font-semibold tracking-[-0.025em] text-balance text-white sm:text-5xl">
              Sizga kerakli tibbiy yordam — bir joyda
            </h2>
          </div>
          <a
            href={LINKS.webApp}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-grad text-white px-6 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:brightness-105"
          >
            Hamshira chaqirish
            <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" />
          </a>
        </div>

        <BentoPointer className="relative mt-10 grid grid-flow-dense auto-rows-[168px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <li
              key={c.title}
              data-reveal
              style={{ "--d": i % 4 } as React.CSSProperties}
              // Mobilda barcha kartalar bir xil o'lchamda; baland kartalar faqat sm+
              className={c.tall ? "sm:row-span-2" : ""}
            >
              <a
                href={LINKS.webApp}
                className={`bento group relative flex h-full flex-col overflow-hidden rounded-[26px] bg-gradient-to-br ${c.grad} p-4 text-white ring-1 ring-white/10 sm:p-5`}
              >
                {/* Yaltiroq qatlam + kursor yorug'ligi */}
                <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,rgb(255_255_255/0.28),transparent_55%)]" />
                <span aria-hidden className="bento-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <h3 className="relative z-10 max-w-[14ch] sm:pr-10 text-[17px] leading-tight font-semibold drop-shadow-sm sm:text-xl">
                  {c.title}
                </h3>

                {c.image && (
                  <Image
                    src={c.image}
                    alt=""
                    width={300}
                    height={340}
                    // mobilda ~100px, desktop'dagi baland kartada ~240px
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 200px, 110px"
                    className={`bento-img pointer-events-none absolute right-0 bottom-0 object-contain object-bottom drop-shadow-[0_18px_24px_rgb(0_0_0/0.28)] ${
                      c.tall ? "right-2 bottom-2 h-[64%] w-auto max-w-[58%] sm:h-[68%] sm:max-w-[90%]" : "right-2 bottom-2 h-[64%] w-auto max-w-[58%]"
                    }`}
                  />
                )}
                {c.icons?.map(([name, size, pos]) => (
                  <span
                    key={name}
                    aria-hidden
                    className={`bento-img pointer-events-none absolute grid place-items-center rounded-[28%] bg-white/15 text-white shadow-[0_18px_30px_-12px_rgb(0_0_0/0.35)] ring-1 ring-white/35 backdrop-blur-md max-sm:hidden ${pos}`}
                    style={{ width: size, height: size }}
                  >
                    <Icon name={name} size={Math.round(size * 0.5)} tone="current" />
                  </span>
                ))}

                {/* Mobil: kichik kartaga sig'adigan ixcham plitkalar qatori */}
                {c.icons && (
                  <span aria-hidden className="bento-img pointer-events-none absolute right-3 bottom-3 flex gap-1.5 sm:hidden">
                    {c.icons.map(([name]) => (
                      <span key={name} className="grid size-10 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-white/35 backdrop-blur-md">
                        <Icon name={name} size={20} tone="current" />
                      </span>
                    ))}
                  </span>
                )}

                <span className="absolute top-3 right-3 z-10 hidden size-9 place-items-center rounded-full bg-white/20 backdrop-blur-md transition group-hover:bg-white group-hover:text-ink sm:top-4 sm:right-4 sm:grid">
                  <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                </span>
              </a>
            </li>
          ))}
        </BentoPointer>
      </div>
    </section>
  );
}
