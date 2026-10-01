import s from "./News.module.css";
import { fill } from "@/lib/i18n/format";

export function CarouselDots({
  pages, active, onSelect, pageLabel,
}: { pageLabel: string; pages: number; active: number; onSelect: (index: number) => void }) {
  if (pages < 2) return null;
  return (
    <div className={s.dots}>
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          type="button"
          className={s.dot}
          onClick={() => onSelect(i)}
          aria-label={fill(pageLabel, { n: i + 1 })}
          aria-current={i === active ? "true" : undefined}
        >
          <span />
        </button>
      ))}
    </div>
  );
}
