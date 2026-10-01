import s from "./News.module.css";
import { ChevronLeft, ChevronRight } from "./icons";

/** Kartalar ostidagi qator: ← [children — nuqtalar] → */
export function CarouselArrows({
  atStart, atEnd, onPrev, onNext, children,
}: { atStart: boolean; atEnd: boolean; onPrev: () => void; onNext: () => void; children?: React.ReactNode }) {
  return (
    <div className={s.bottom}>
      <button type="button" className={s.arrow} onClick={onPrev} disabled={atStart} aria-label="Oldingi">
        <ChevronLeft />
      </button>
      {children}
      <button type="button" className={`${s.arrow} ${s.arrowNext}`} onClick={onNext} disabled={atEnd} aria-label="Keyingi">
        <ChevronRight />
      </button>
    </div>
  );
}
