import s from "./News.module.css";
import { ChevronLeft, ChevronRight } from "./icons";

/** Kartalar ostidagi qator: ← [children — nuqtalar] → */
export function CarouselArrows({
  atStart, atEnd, onPrev, onNext, prevLabel, nextLabel, children,
}: { prevLabel: string; nextLabel: string; atStart: boolean; atEnd: boolean; onPrev: () => void; onNext: () => void; children?: React.ReactNode }) {
  return (
    <div className={s.bottom}>
      <button type="button" className={s.arrow} onClick={onPrev} disabled={atStart} aria-label={prevLabel}>
        <ChevronLeft />
      </button>
      {children}
      <button type="button" className={`${s.arrow} ${s.arrowNext}`} onClick={onNext} disabled={atEnd} aria-label={nextLabel}>
        <ChevronRight />
      </button>
    </div>
  );
}
