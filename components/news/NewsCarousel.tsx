"use client";

import s from "./News.module.css";
import { CarouselArrows } from "./CarouselArrows";
import { CarouselDots } from "./CarouselDots";
import { NewsCard, type NewsCardT, type NewsPost } from "./NewsCard";
import { useCarousel } from "./useCarousel";

/** Faqat ≥4 ta yangilik bo'lganda ishlatiladi (≤3 — server'dagi oddiy to'r) */
export function NewsCarousel({ posts, t }: { posts: NewsPost[]; t: NewsCardT & { carousel: string; prev: string; next: string; page: string } }) {
  const c = useCarousel(posts.length);
  return (
    <div className={s.carousel}>
      <div
        ref={c.trackRef}
        className={c.isDragging ? `${s.track} ${s.dragging}` : s.track}
        tabIndex={0}
        role="region"
        aria-label={t.carousel}
        {...c.handlers}
      >
        {posts.map((p) => (
          <NewsCard key={p.title} post={p} t={t} />
        ))}
      </div>

      <CarouselArrows prevLabel={t.prev} nextLabel={t.next} atStart={c.atStart} atEnd={c.atEnd} onPrev={() => c.scrollByStep(-1)} onNext={() => c.scrollByStep(1)}>
        <CarouselDots pageLabel={t.page} pages={c.pages} active={c.activeIndex} onSelect={c.goTo} />
      </CarouselArrows>
    </div>
  );
}
