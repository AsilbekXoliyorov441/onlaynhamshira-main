export type Step = { title: string; desc: string; dur: string; panel: string };

// Matnlar namunadan aynan ko'chirilgan (‘ ’ “ ” – belgilari bilan)
export const STEPS: Step[] = [
  { title: "Ilovani yuklab oling", desc: "“Onlayn Hamshira” ilovasini App Store yoki Google Play’dan bepul o‘rnating.", dur: "6s", panel: "Ilovani yuklab olish" },
  { title: "Ro‘yxatdan o‘ting", desc: "Telefon raqamingizni kiriting va SMS yoki Telegram orqali kelgan kodni tasdiqlang.", dur: "8s", panel: "Ro‘yxatdan o‘tish" },
  { title: "Xizmatni tanlang", desc: "Kerakli muolajalarni qo‘shing – umumiy narx shu zahoti hisoblanib turadi.", dur: "7s", panel: "Xizmatni tanlash" },
  { title: "Buyurtma bering", desc: "“Tayyor”ni bosing – ilova sizga eng yaqin mutaxassisni topadi va holatini ko‘rsatib boradi.", dur: "7.5s", panel: "Buyurtma berish" },
];

/** 150000 → "150 000 so‘m" (toLocaleString'siz — SSR bilan bir xil natija) */
export const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so‘m";
