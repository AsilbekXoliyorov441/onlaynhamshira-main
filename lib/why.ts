// "Nega biz?" — taqqoslash sahifalari (/onlayn-hamshira-vs-ananaviy, /onlayn-uhod-vs-tradicionnyj,
// /online-nursing-vs-traditional). Matnlar Tilda sahifalaridan (content/legacy/*.json) olingan.
// ⚠️ h1 — Tilda'dagi birinchi H1 bilan aynan bir xil (SEO). Metadata va JSON-LD o'sha JSON'da qoladi.
// Tilda'da sahifadagi ikkinchi H1 bu yerda bo'lim sarlavhasi (H2) bo'lib turadi.

import type { IconName } from "@/components/Icon";
import type { Locale } from "@/lib/i18n/config";

type Row = { feature: string; us: string; old: string; href?: string };
type Item = { title: string; text?: string };

export type WhyDict = {
  eyebrow: string;
  h1: string;
  lead: string;
  cta: string;
  toCompare: string;
  chipVerified: string;
  chipFast: string;
  compareTitle: string;
  compareCaption: string;
  cols: { feature: string; us: string; old: string };
  rows: Row[];
  benefitsLabel: string;
  benefitsTitle: string;
  benefits: Item[];
  forWhoTitle: string;
  forWho: string[];
  howTitle: string;
  steps: string[];
  stepWord: string;
  faqTitle?: string;
  faq?: { q: string; a: string; list?: string[]; after?: string }[];
  conclusionTitle: string;
  conclusion: string;
};

export const WHY_BENEFIT_ICONS: IconName[] = ["shield", "clock", "label", "download", "pin", "calendar"];
export const WHY_FORWHO_ICONS: IconName[] = ["heart", "bandage", "people", "calendar", "shield"];

const uz: WhyDict = {
  eyebrow: "Nega biz?",
  h1: "Onlayn hamshiralik vs an’anaviy hamshiralik Qaysi biri yaxshiroq O‘zbekistonda?",
  lead: "Tanishlar orqali izlash, noaniq narxlar va kafolatsiz xizmat o‘rniga — tekshirilgan mutaxassislar, aniq narxlar va bir necha daqiqada onlayn buyurtma.",
  cta: "Hamshira chaqirish",
  toCompare: "Taqqoslashni ko‘rish",
  chipVerified: "Tekshirilgan mutaxassislar",
  chipFast: "Bir necha daqiqada",
  compareTitle: "Nega OnlaynHamshira.uz an'anaviy usullardan yaxshiroq",
  compareCaption: "Taqqoslash",
  cols: { feature: "Xususiyat", us: "OnlaynHamshira.uz", old: "Eski / Offline usullar" },
  rows: [
    { feature: "Mutaxassis topish", us: "Tezkor online qidiruv", old: "Tanishlar orqali, guruhlarda izlash" },
    { feature: "Tekshiruv", us: "Shaxs va tajriba tasdiqlangan", old: "Hech qanday tekshiruv yo‘q" },
    { feature: "Fikrlar", us: "Haqiqiy mijoz sharhlari", old: "Mavjud emas" },
    { feature: "Xavfsizlik", us: "Platforma kafolati va yordam", old: "Hech qanday kafolat yo‘q" },
    { feature: "Mavjudlik", us: "24/7 bron qilish", old: "Faqat javob bersa" },
    { feature: "Tezlik", us: "Bir necha daqiqada", old: "Soatlar yoki kunlar" },
    { feature: "Filtrlar", us: "Hudud, narx, jins, xizmat turi", old: "Filtrlar yo‘q" },
    { feature: "Aloqa", us: "Platforma orqali xavfsiz yozish/qo‘ng‘iroq", old: "Tasodifiy raqamlar, DM" },
    { feature: "Mutaxassislar turi", us: "Hamshira, shifokor, massaj, parvarish, postpartum xizmat", old: "Juda cheklangan", href: "/blog/ayollar-bolalar-massaji-toshkentda" },
    { feature: "Narxlar", us: "Ochig‘i ko‘rsatiladi", old: "Noaniq, savdolashish" },
    { feature: "To‘lov", us: "Xavfsiz to‘lov tizimi", old: "Naqd, xavfli" },
    { feature: "Kafolat", us: "Muammo bo‘lsa yordam", old: "Hammasi o‘zingizda" },
    { feature: "Almashtirish", us: "Oson almashtirish", old: "Yana boshidan qidirish" },
    { feature: "Qulaylik", us: "Uyga kelish, qulay xizmat", old: "Borib kelish, qo‘ng‘iroqlar", href: "/blog/hamshira-uyga-chaqirish-toshkent" },
    { feature: "Ishonch", us: "Tekshirilgan mutaxassislar", old: "Tasodifiy odamlar" },
    { feature: "Tarix", us: "Buyurtmalar saqlanadi", old: "Yo‘q" },
    { feature: "Tajriba", us: "Zamonaviy onlayn", old: "Stress va noaniqlik" },
  ],
  benefitsLabel: "Afzalliklar",
  benefitsTitle: "Afzalliklar",
  benefits: [
    { title: "Tekshirilgan tibbiy mutaxassislar" },
    { title: "Bir necha daqiqada onlayn buyurtma" },
    { title: "Aniq narxlar" },
    { title: "Xizmatdan so‘ng elektron hisobot" },
    { title: "O‘zbekiston bo‘ylab xizmat" },
    { title: "Qulay grafik va qo‘llab-quvvatlash" },
  ],
  forWhoTitle: "Kimlar uchun mos",
  forWho: [
    "Uyda parvarishga muhtoj keksalar",
    "Operatsiyadan keyingi bemorlar",
    "Oilalar uchun ishonchli yordam",
    "Band insonlar uchun qulay yechim",
    "Hamshira yoki parvarish bo‘yicha xavfsiz xizmat izlaydiganlar",
  ],
  howTitle: "Qanday ishlaydi",
  steps: ["Xizmat va mutaxassisni tanlang", "Sana va vaqtni belgilang", "Mutaxassis keladi, so‘ng elektron hisobot olasiz"],
  stepWord: "Qadam",
  conclusionTitle: "Yakuniy fikr",
  conclusion:
    "OnlaynHamshira.uz O‘zbekistonda: Namangan, Nukus, Farg’ona, uyda professional parvarish topishning eng qulay, eng birinchi taqdim etilgan (2022) va ishonchli yo‘li.",
};

const ru: WhyDict = {
  eyebrow: "Почему мы?",
  h1: "Онлайн ухаживание vs традиционный уход что лучше в Узбекистане?",
  lead: "Вместо поиска через знакомых, непонятных цен и отсутствия гарантий — проверенные специалисты, прозрачные цены и онлайн-заказ за несколько минут.",
  cta: "Вызвать медсестру",
  toCompare: "Смотреть сравнение",
  chipVerified: "Проверенные специалисты",
  chipFast: "Заказ за минуты",
  compareTitle: "Почему выбирают OnlaynHamshira.uz вместо традиционного поиска медицинского персонала",
  compareCaption: "Быстрое сравнение",
  cols: { feature: "Параметр", us: "OnlaynHamshira.uz", old: "Старые/офлайн способы" },
  rows: [
    { feature: "Поиск специалистов", us: "Мгновенный онлайн поиск", old: "Просьбы знакомым, поиск в чатах, удача" },
    { feature: "Верификация", us: "Проверенные профили и документы", old: "Нет проверки, высокий риск" },
    { feature: "Отзывы", us: "Настоящие отзывы клиентов", old: "Отсутствуют" },
    { feature: "Безопасность", us: "Поддержка платформы", old: "Нет гарантий" },
    { feature: "Доступность", us: "24/7 бронирование", old: "Зависит от ответа человека" },
    { feature: "Скорость", us: "Подбор и заказ за минуты", old: "Часы или дни" },
    { feature: "Фильтры", us: "Навыки, цена, район, пол", old: "Нет фильтров" },
    { feature: "Связь", us: "Безопасный контакт через платформу", old: "Личные звонки, сообщения" },
    { feature: "Специалисты", us: "Медсёстры, врачи, массаж, сиделки, послеродовые специалисты", old: "Обычно только один вариант", href: "/ru/blog/massazh-dlya-zhenshchin-i-detey-v-tashkente" },
    { feature: "Цены", us: "Чёткие и прозрачные", old: "Неясные, зависит от договорённости" },
    { feature: "Оплата", us: "Безопасные платежи", old: "Наличные, риск" },
    { feature: "Гарантии", us: "Поддержка при проблемах", old: "Решаете сами" },
    { feature: "Замена", us: "Лёгкий поиск альтернативы", old: "Нужно искать заново" },
    { feature: "Комфорт", us: "Услуги на дому", old: "Поездки и звонки", href: "/ru/blog/medsestra-na-dom-tashkent" },
    { feature: "Доверие", us: "Проверенный персонал", old: "Случайные люди" },
    { feature: "История заказов", us: "Сохраняется", old: "Нет записей" },
    { feature: "Опыт", us: "Современная онлайн-платформа", old: "Сложности и стресс" },
  ],
  benefitsLabel: "Преимущества",
  benefitsTitle: "Преимущества",
  benefits: [
    { title: "Проверенные медицинские сотрудники" },
    { title: "Онлайн-бронирование за несколько минут" },
    { title: "Прозрачные цены" },
    { title: "Электронные записи после визита" },
    { title: "Доступно по всему Узбекистану" },
    { title: "Гибкий график и поддержка" },
  ],
  forWhoTitle: "Для кого подходит",
  forWho: [
    "Пожилые пациенты",
    "Люди после операций",
    "Семьи, которым нужен надёжный уход",
    "Занятые люди, ценящие удобство",
    "Каждый, кто хочет безопасный и современный сервис",
  ],
  howTitle: "Как работает",
  steps: ["Выберите услугу и специалиста", "Укажите дату и время", "Специалист приезжает, вы получаете отчёт после услуги"],
  stepWord: "Шаг",
  conclusionTitle: "Заключение",
  conclusion: "OnlaynHamshira.uz современное, безопасное и удобное решение для поиска медперсонала на дому в Узбекистане.",
};

const en: WhyDict = {
  eyebrow: "Why us?",
  h1: "Online Nursing vs Traditional Nursing in Uzbekistan What’s Better?",
  lead: "Instead of asking around, unclear prices and no guarantees — verified professionals, transparent costs and online booking in minutes.",
  cta: "Call a nurse",
  toCompare: "See the comparison",
  chipVerified: "Verified specialists",
  chipFast: "Booked in minutes",
  compareTitle: "Why Choose OnlaynHamshira.uz vs Traditional Nursing Services",
  compareCaption: "Quick comparison",
  cols: { feature: "Feature / Benefit", us: "OnlaynHamshira.uz", old: "Old / Offline / Random Search" },
  rows: [
    { feature: "Finding specialists", us: "Instant online search", old: "Ask friends, scroll channels, hope for luck" },
    { feature: "Verification", us: "Verified specialists, profiles, IDs", old: "No verification risky" },
    { feature: "Reviews & ratings", us: "Transparent client reviews", old: "Zero feedback" },
    { feature: "Safety", us: "Platform protection & support", old: "No guarantee, no support" },
    { feature: "Availability", us: "24/7 booking", old: "Only when someone answers your call" },
    { feature: "Speed", us: "Match & book in minutes", old: "Hours or days of searching" },
    { feature: "Profiles & filters", us: "Filter by skills, location, price, gender", old: "No filters just guesswork" },
    { feature: "Communication", us: "Secure in-app contact", old: "Random DMs / calls" },
    { feature: "Specialist variety", us: "Nurses, doctors, massage, caregivers, postpartum specialists, etc.", old: "Usually only one type (if lucky)", href: "/en/blog/massage-in-tashkent-women-baby" },
    { feature: "Pricing", us: "Clear rates", old: "Confusing, “depends”, negotiations" },
    { feature: "Payment safety", us: "Secure payments", old: "Cash only / risky transfers" },
    { feature: "Platform guarantee", us: "Support if something goes wrong", old: "You’re on your own" },
    { feature: "Replacement service", us: "Easy to find another pro", old: "Start search again from zero" },
    { feature: "Convenience", us: "Home service + comfort", old: "Leave home / long calls / paperwork", href: "/en/blog/nurse-at-home-tashkent-services-prices" },
    { feature: "Trust", us: "Verified medical workers", old: "“My cousin knows a lady…”" },
    { feature: "Record keeping", us: "Booking history saved", old: "No tracking" },
    { feature: "User experience", us: "Browsing like ordering Uber for healthcare", old: "Chaos & stress" },
  ],
  benefitsLabel: "Benefits",
  benefitsTitle: "What makes OnlaynHamshira.uz stand out",
  benefits: [
    { title: "Verified professionals", text: "Every nurse on OnlaynHamshira.uz is fully credentialed and profiled. You see their experience, specialties, and ratings before booking." },
    { title: "Seamless Online Booking", text: "Go online, pick your service type, nurse, date & time in minutes no long calls. This speed gives you peace of mind fast." },
    { title: "Transparent Pricing", text: "We believe you should know the price upfront. You choose the service, see cost, and confirm. No surprise bills later." },
    { title: "Digital Records & Reports", text: "After the visit, you receive a digital report. All notes are stored securely and accessible anytime." },
    { title: "Wide Coverage Across Uzbekistan", text: "In Tashkent areas OnlaynHamshira.uz can handle it." },
    { title: "Flexible Scheduling & Follow-up", text: "Need to shift time, extend service, or ask questions later? We’ve got your back with online support and follow-ups." },
  ],
  forWhoTitle: "Who is this great for?",
  forWho: [
    "Elderly or immobile patients needing home-nursing support",
    "Post-surgery patients requiring short-term care at home",
    "Families wanting flexible, reliable nursing support",
    "Busy professionals who want booking and tracking done online",
    "Anyone in Uzbekistan who values modern, digital service vs old-school agency calls",
  ],
  howTitle: "How it works (3 easy steps)",
  steps: ["Choose your service and nurse.", "Select date & time, fill in the details.", "Nurse arrives, you get service and the digital report afterwards."],
  stepWord: "Step",
  faqTitle: "Frequently Asked Questions",
  faq: [
    {
      q: "What services can I book on Onlaynhamshira.uz?",
      a: "You can book verified specialists for:",
      list: [
        "Home nursing", "Doctor home visits", "Post-surgery care", "Elderly and long-term care", "Postpartum and newborn care",
        "Licensed massage therapy", "Rehabilitation and physiotherapy", "Babysitters with medical knowledge",
        "Special care for patients with disabilities or chronic conditions",
      ],
      after: "Our platform connects you with reliable healthcare and personal care professionals across Uzbekistan.",
    },
    { q: "Are the specialists verified?", a: "Yes. All specialists undergo an identity and profile verification process before joining the platform. Where applicable, certification and work experience information is reviewed. Client ratings and reviews add an additional layer of transparency." },
    { q: "How fast can I find a specialist?", a: "Most users find and book a suitable specialist within minutes. You can filter by location, service type, availability, and price to speed up the process." },
    { q: "Is the service available outside Tashkent?", a: "Yes. Onlaynhamshira.uz provides coverage across Uzbekistan, including major cities and regional centers. Availability continues to expand as more specialists join the platform." },
    { q: "Do specialists provide services at home?", a: "Yes. All services are offered at your home or preferred location. Simply select your area, time, and the type of specialist needed." },
    { q: "How do payments work?", a: "Payments are processed securely through the platform. This protects both clients and specialists and eliminates risks linked to cash transactions or private transfers." },
    { q: "Can I book long-term care?", a: "Yes. Options include short-term visits, long-term care, night shifts, daily support, and extended recovery services. You can discuss schedules directly with the specialist." },
    { q: "How are prices set?", a: "Each specialist sets their own pricing. You can view and compare prices transparently before booking. There are no hidden charges imposed by the platform." },
    { q: "Can I read reviews and ratings?", a: "Yes. Every specialist profile includes reviews and ratings from previous clients. This helps you make confident, informed decisions." },
    { q: "What if a specialist does not arrive or cancels?", a: "If a specialist fails to arrive or cancels unexpectedly, you can contact support and request assistance. We will help you find a replacement as quickly as possible." },
    { q: "Can I change specialists if I am not satisfied?", a: "Yes. You are free to book another specialist at any time. Your comfort and confidence are a priority." },
    { q: "Are there extra fees for using the platform?", a: "No. You only pay for the services provided by the specialist. Onlaynhamshira.uz does not add hidden fees." },
    { q: "Can family members book on behalf of a patient?", a: "Yes. Many clients book services for relatives such as parents, children, and elderly family members." },
    { q: "Is the service safe and legitimate?", a: "Yes. Onlaynhamshira.uz is a legally operating platform that verifies specialists, secures payments, and protects user data. The platform offers a safer and more reliable alternative to informal search methods." },
    { q: "What if I need help or have questions before booking?", a: "Our support team is available to assist you with inquiries, help you navigate the platform, and provide guidance before or after booking." },
  ],
  conclusionTitle: "Closing statement",
  conclusion:
    "Finding reliable healthcare or personal care support should be simple and secure. Onlaynhamshira.uz provides a structured, transparent, and safe way to book qualified specialists without the uncertainty of informal search channels. If you’re tired of the hassle, uncertainty and wait times of traditional nursing services OnlaynHamshira.uz is the upgrade. Fast online booking, verified professionals, transparent costs, country-wide coverage, and a digital experience built for you.",
};

export const WHY: Record<Locale, WhyDict> = { uz, ru, en };
