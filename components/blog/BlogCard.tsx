import { ArrowUpRight, Clock3 } from "lucide-react";
import type { BlogEntry } from "@/lib/blog-shared";
import { fill } from "@/lib/i18n/format";
import type { Dict } from "@/lib/i18n/dictionaries/uz";
import { Cover } from "./Cover";

export type CardT = Pick<Dict["blog"], "minutes" | "read" | "topics">;

/** Butun karta bitta havola: ekran o'quvchi sarlavhani o'qiydi, qolgani qo'shimcha ma'lumot */
export function BlogCard({ e, t, priority }: { e: BlogEntry; t: CardT; priority?: boolean }) {
  return (
    <a
      href={e.href}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgb(16_41_58/0.35)] hover:ring-transparent focus-visible:ring-3 focus-visible:ring-brand-teal"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        <Cover
          img={e.cover}
          topic={e.topic}
          priority={priority}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, calc(100vw - 32px)"
          className="transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[13px] font-semibold text-ink shadow-sm backdrop-blur">
          {t.topics[e.topic]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="line-clamp-3 text-lg leading-snug font-semibold tracking-tight text-balance">{e.title}</h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink-soft">{e.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm">
          <span className="inline-flex items-center gap-1.5 text-ink-soft">
            <Clock3 className="size-4" aria-hidden /> {fill(t.minutes, { n: e.minutes })}
          </span>
          <span aria-hidden className="inline-flex items-center gap-1 font-semibold text-brand-deep">
            {t.read}
            <span className="grid size-8 place-items-center rounded-full bg-mint transition group-hover:rotate-45 group-hover:bg-brand-grad group-hover:text-white">
              <ArrowUpRight className="size-4" />
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}
