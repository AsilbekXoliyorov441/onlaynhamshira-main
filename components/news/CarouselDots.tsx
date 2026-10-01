import s from "./News.module.css";

export function CarouselDots({
  pages, active, onSelect,
}: { pages: number; active: number; onSelect: (index: number) => void }) {
  if (pages < 2) return null;
  return (
    <div className={s.dots}>
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          type="button"
          className={s.dot}
          onClick={() => onSelect(i)}
          aria-label={`${i + 1}-sahifa`}
          aria-current={i === active ? "true" : undefined}
        >
          <span />
        </button>
      ))}
    </div>
  );
}
