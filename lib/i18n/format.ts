/** "{n} ta" + {n: 8} → "8 ta" */
export const fill = (tpl: string, vars: Record<string, string | number>) =>
  tpl.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));

/** 11400 → "11 400" (bo'linmaydigan probel) yoki "11,400". toLocaleString'siz — SSR bilan bir xil natija */
export const formatNum = (n: number, sep: string) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);

export type Money = { sep: string; currency: string };
export const formatPrice = (n: number, m: Money) => `${formatNum(n, m.sep)} ${m.currency}`;
