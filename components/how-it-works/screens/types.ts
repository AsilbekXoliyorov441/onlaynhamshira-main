import s from "../HowItWorks.module.css";

export type ScreenProps = {
  /** hozir ko'rinayotgan ekran */
  active: boolean;
  /** oldingi ekran (chapga chiqib ketadi) */
  leave: boolean;
  /** har go() da yangilanadi; null — sahna hali boshlanmagan */
  runKey: number | null;
  reduced: boolean;
  tap: (el: HTMLElement | null) => void;
};

export const screenCls = (p: Pick<ScreenProps, "active" | "leave">, extra: string) =>
  [s.screen, p.active && s.active, p.leave && s.leave, extra].filter(Boolean).join(" ");
