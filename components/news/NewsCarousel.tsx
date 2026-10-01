"use client";

import s from "./News.module.css";
import { CarouselArrows } from "./CarouselArrows";
import { CarouselDots } from "./CarouselDots";
import { NewsCard, type NewsPost } from "./NewsCard";
import { useCarousel } from "./useCarousel";

/** Faqat ≥4 ta yangilik bo'lganda ishlatiladi (≤3 — server'dagi oddiy to'r) */
export function NewsCarousel({ posts }: { posts: NewsPost[] }) {
  const c = useCarousel(posts.length);
  return (
    <div className={s.carousel}>
      <div
        ref={c.trackRef}
        className={c.isDragging ? `${s.track} ${s.dragging}` : s.track}
        tabIndex={0}
        role="region"
        aria-label="Yangiliklar karuseli"
        {...c.handlers}
      >
        {posts.map((p) => (
          <NewsCard key={p.title} post={p} />
        ))}
      </div>

      <CarouselArrows atStart={c.atStart} atEnd={c.atEnd} onPrev={() => c.scrollByStep(-1)} onNext={() => c.scrollByStep(1)}>
        <CarouselDots pages={c.pages} active={c.activeIndex} onSelect={c.goTo} />
      </CarouselArrows>
    </div>
  );
}
