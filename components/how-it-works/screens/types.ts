import s from "../HowItWorks.module.css";
import type { Dict } from "@/lib/i18n/dictionaries/uz";
import type { Money } from "@/lib/i18n/format";

export type ScreensT = Dict["how"]["screens"];

export type ScreenProps = {
  /** hozir ko'rinayotgan ekran */
  active: boolean;
  /** oldingi ekran (chapga chiqib ketadi) */
  leave: boolean;
  /** har go() da yangilanadi; null — sahna hali boshlanmagan */
  runKey: number | null;
  reduced: boolean;
  tap: (el: HTMLElement | null) => void;
  /** Ekran matnlari (o'zgarmas obyekt — memo buzilmaydi) */
  t: ScreensT;
  /** tabpanel nomi */
  panel: string;
  money: Money;
};

export const screenCls = (p: Pick<ScreenProps, "active" | "leave">, extra: string) =>
  [s.screen, p.active && s.active, p.leave && s.leave, extra].filter(Boolean).join(" ");
