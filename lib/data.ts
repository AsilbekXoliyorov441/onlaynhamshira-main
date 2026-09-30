// Barcha matnlar onlaynhamshira.uz saytidan olingan (o'zgartirilmagan).
// Narxlar va xizmat tavsiflari — yangi qo'shimcha. ⚠️ NARXLAR TAXMINIY:
// ishga tushirishdan oldin app.onlaynhamshira.uz dagi haqiqiy narxlar bilan almashtiring.

export const LINKS = {
  webApp: "https://app.onlaynhamshira.uz/",
  download: "https://onlaynhamshira.uz/qr",
  playStore: "https://play.google.com/store/apps/details?id=uz.teamwork.onlinehamshiraclient",
  appStore: "https://apps.apple.com/uz/app/onlayn-hamshira/id6529538342",
  phone: "+998781139616",
  phoneLabel: "+998 78 113 96 16",
  telegram: "https://t.me/Onlayn_Hamshira_Admin",
  instagram: "https://www.instagram.com/onlayn_hamshira/",
  youtube: "https://www.youtube.com/@OnlaynHamshira",
  email: "info@onlaynhamshira.uz",
  privacy: "https://onlaynhamshira.uz/privacy-policy",
  certificates: "https://onlaynhamshira.uz/certificates",
  expert: "https://onlaynhamshira.uz/expert",
  blog: "https://onlaynhamshira.uz/blog",
  map: "https://yandex.ru/map-widget/v1/?um=constructor%3A4dbf6bc8bd0d6dc4551bef4bb775c4f9881e246ceb965907737eea25350d9e16&source=constructor",
};

export const IMAGES = {
  hero: "/img/misc/hero.webp",
  qrIphone: "/img/misc/qr-iphone.png",
  qrAndroid: "/img/misc/qr-android.png",
};

export const NAV = [
  { label: "Ilova haqida", href: "#about" },
  { label: "Xizmatlar", href: "#services" },
  { label: "Mutaxassislar", href: "#specialists" },
  { label: "Fikr-mulohazalar", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export type ServiceIcon =
  | "syringe" | "droplet" | "bandage" | "gauge" | "bed" | "stethoscope" | "flask" | "hand";

export type Service = {
  id: string;
  title: string;
  description: string;
  priceFrom: number; // so'm, TAXMINIY
  duration: string;
  icon: ServiceIcon;
};

// "Ommabop xizmatlar" — nomlar saytdagidek
export const SERVICES: Service[] = [
  {
    id: "ukol",
    title: "Tomir ichiga va yonboshga ukol qilish",
    description: "Shifokor tavsiyasi bo‘yicha dori vositalarini steril sharoitda, bir martalik anjomlar bilan yuborish.",
    priceFrom: 50000,
    duration: "15–20 daqiqa",
    icon: "syringe",
  },
  {
    id: "kapelnitsa",
    title: "Sistema (kapelnitsa) qo‘yish",
    description: "Hamshira sistema qo‘yadi va muolaja tugaguncha bemor holatini kuzatib turadi.",
    priceFrom: 150000,
    duration: "40–90 daqiqa",
    icon: "droplet",
  },
  {
    id: "yara",
    title: "Yaralarni bog‘lash va davolash",
    description: "Yarani tozalash, antiseptik ishlov berish va bog‘lamni almashtirish, operatsiyadan keyingi choklar parvarishi.",
    priceFrom: 80000,
    duration: "20–30 daqiqa",
    icon: "bandage",
  },
  {
    id: "bosim",
    title: "Arterial qon bosimi va qondagi qand miqdorini o‘lchash",
    description: "Bosim, puls, harorat va glyukoza ko‘rsatkichlarini o‘lchab, natijalarni izohlab berish.",
    priceFrom: 40000,
    duration: "10–15 daqiqa",
    icon: "gauge",
  },
  {
    id: "parvarish",
    title: "Yotib qolgan bemorlarni parvarish qilishda yordam berish",
    description: "Gigiyena, yotoq yaralarining oldini olish, ovqatlantirish va kundalik parvarishda yordam.",
    priceFrom: 200000,
    duration: "2 soatdan",
    icon: "bed",
  },
  {
    id: "korik",
    title: "Uyda tibbiy ko‘rikdan o‘tkazish",
    description: "Umumiy holatni baholash, asosiy ko‘rsatkichlarni tekshirish va keyingi qadamlar bo‘yicha tavsiyalar.",
    priceFrom: 150000,
    duration: "30–40 daqiqa",
    icon: "stethoscope",
  },
  {
    id: "tahlil",
    title: "Uyda tahlil namunalarini olish",
    description: "Qon va boshqa namunalarni uyingizda olish, laboratoriyaga yetkazishda yordam.",
    priceFrom: 70000,
    duration: "15–20 daqiqa",
    icon: "flask",
  },
  {
    id: "massaj",
    title: "Massaj va tiklanish",
    description: "Kattalar, ayollar va bolalar uchun davolovchi hamda tiklovchi massaj kurslari.",
    priceFrom: 120000,
    duration: "30–60 daqiqa",
    icon: "hand",
  },
];

// app.onlaynhamshira.uz dagi mutaxassisliklar (rasmlar ilovadan)
const spec = (id: string) =>
  `/img/specialists/${id}.webp`;

export const SPECIALISTS = [
  { title: "Umumiy hamshira", note: "Ukol, sistema, bog‘lamlar", img: spec("78b8f24c-c269-44cb-96a9-62da661bea34"), group: "Hamshiralar" },
  { title: "Oliy toifali hamshira", note: "Murakkab muolajalar", img: spec("6cc3c26f-e05e-4802-a48f-96c9d62a3ecd"), group: "Hamshiralar" },
  { title: "Kichkintoylar uchun muolajalar", note: "Chaqaloq va bolalar", img: spec("6779f6a5-475e-4946-8890-e2cce0f91693"), group: "Bolalar" },
  { title: "Bolalar massaji", note: "Bolalar massajchisi", img: spec("a4390bad-4536-4189-ad63-7d43f42e2883"), group: "Bolalar" },
  { title: "Pediatr", note: "Bolalar shifokori uyda", img: spec("95dd3123-2f6a-4e5f-aeb0-079e6ec6b892"), group: "Bolalar" },
  { title: "Enaga", note: "Bola parvarishi", img: spec("b4c50205-d842-4c9d-b8e5-02186e548a04"), group: "Bolalar" },
  { title: "Ayollar uchun massaj", note: "Tiklovchi massaj", img: spec("2f1bdf41-f53c-47b8-8f6d-c93b427e27b5"), group: "Shifokorlar" },
  { title: "Terapevt", note: "Umumiy ko‘rik", img: spec("b113e253-1138-4194-981a-a96581bb245b"), group: "Shifokorlar" },
  { title: "LOR", note: "Quloq, burun, tomoq", img: spec("c743f7af-85bf-4d28-a0b1-dc36ba0706ca"), group: "Shifokorlar" },
  { title: "Nevropatolog", note: "Asab tizimi", img: spec("b3aca9f1-60a8-4c98-a05b-0a661ec1573c"), group: "Shifokorlar" },
  { title: "Kardiolog", note: "Yurak va qon tomirlar", img: spec("47ab6828-b5ed-4de6-ae96-67f07041c64e"), group: "Shifokorlar" },
  { title: "Travmatolog", note: "Suyak va bo‘g‘imlar", img: spec("b241b18d-a54d-4dd5-9d95-e51a38444125"), group: "Shifokorlar" },
  { title: "Psixolog", note: "Ruhiy qo‘llab-quvvatlash", img: spec("43ee2429-8e6b-4f99-b722-75aa21c25b93"), group: "Shifokorlar" },
  { title: "EKG", note: "Uyda kardiogramma", img: spec("349ede49-2f31-4af9-8a42-369bdbaf6029"), group: "Shifokorlar" },
];

export const BENEFITS = [
  { title: "24/7 ishlaydi", text: "Hamshirani dam olish va bayram kunlaridan qat’i nazar, kechayu kunduz istalgan vaqtda chaqirishingiz mumkin.", icon: "clock" },
  { title: "Ishonchli mutaxassislar", text: "Faqatgina tajribali, sinab ko‘rilgan va malakasi tasdiqlangan hamshiralar.", icon: "shield" },
  { title: "Fakt bo‘yicha to‘lov", text: "Xizmat yakunlanganidan so‘ng to‘lov qiling - hech qanday oldindan to‘lov talab qilinmaydi.", icon: "wallet" },
  { title: "Adolatli narxlar", text: "Yashirin to‘lovlar va kutilmagan qo‘shimcha to‘lovlarsiz belgilangan qat’iy narx.", icon: "tag" },
  { title: "Qulay ilova", text: "Ilova orqali buyurtmani bir necha daqiqada, qo‘ng‘iroqlarsiz va kutishlarsiz rasmiylashtiring.", icon: "phone" },
  { title: "Qulay rejalashtirish", text: "O‘zingizga qulay sana va vaqtda tibbiy xizmatni oldindan band qilib qo‘ying.", icon: "calendar" },
] as const;

export const STATS = [
  { value: 270, suffix: "+", label: "Malakali hamshiralar" },
  { value: 11400, suffix: "+", label: "Bajarilgan buyurtmalar" },
  { value: 13500, suffix: "+", label: "Bizga ishonch bildirgan mijozlar" },
  { value: 6, suffix: "+", label: "O‘zbekiston bo‘ylab shaharlar" },
];

export const SAFETY = [
  { title: "Tajribali hamshiralar bilan uy sharoitida tibbiy xizmat", text: "Faqat 3-5 yil ish tajribasiga ega sertifikatlangan mutaxassislar." },
  { title: "Hamshiralar bilan rasmiy hamkorlik", text: "Barcha mutaxassislar shartnoma asosida ishlaydi." },
  { title: "Tibbiy xizmat sifati ustidan doimiy nazorat", text: "Biz mijozlarning fikr-mulohazalarini to‘plab, xizmat ko‘rsatish sifatini muntazam nazorat qilib boramiz." },
  { title: "24/7 qo‘llab-quvvatlash xizmati va hamshiradan yordam", text: "Foydalanuvchilar va hamshiralarga istalgan vaqtda yordam beramiz." },
];

// Rasmlar o'z serverimizda (public/img) — tashqi CDN'ga bog'liqlik va sovuq so'rov kechikishi yo'q
const img = (path: string) => `/img/${path}`;

export const REVIEWS = [
  { name: "Nuriddin Abdumalikov", city: "Toshkent sh.", text: "Ilovani ishlatish juda oson! Hamshira o‘z vaqtida yetib keldi va juda muloyim edi. Juda qulay, tavsiya qilaman!", img: img("avatars/01.webp") },
  { name: "Nilufar Qodirova", city: "Samarqand sh.", text: "Muolaja uchun navbat kutish shart emasligi juda yaxshi. Onlayn Hamshira orqali uyga chaqirdik, hammasi aniq va tartibli bo‘ldi.", img: img("avatars/03.webp") },
  { name: "Xolmirzayev Bobur", city: "Toshkent sh.", text: "Ilova orqali hamshira chaqirish juda oson ekan. Buyurtma berdim, mutaxassis belgilangan vaqtda yetib keldi. Xizmatdan mamnun qoldim.", img: img("avatars/04.webp") },
  { name: "Gulnoza Ergasheva", city: "Farg‘ona sh.", text: "Dadamning qon bosimini nazorat qilish uchun mutaxassis chaqirdik. Juda e’tiborli va mas’uliyatli hamshira keldi. Rahmat.", img: img("avatars/02.webp") },
  { name: "Muhammadrizo", city: "Toshkent sh.", text: "Ishdan keyin poliklinikaga borishga vaqt topolmayotgandim. Onlayn Hamshira orqali uyga mutaxassis chaqirdim. Juda qulay xizmat.", img: img("avatars/06.webp") },
  { name: "Malika Abdullayeva", city: "Toshkent sh.", text: "Bolamga muolaja kerak bo‘ldi. Hamshira vaqtida keldi, ishini ehtiyotkorlik bilan bajardi. Ilovadan foydalanish ham juda tushunarli.", img: img("avatars/10.webp") },
  { name: "Bekzod Ismoilov", city: "Toshkent sh.", text: "Avval bunday xizmatdan foydalanmagan edim. Ilova juda qulay chiqdi, hamshira ham vaqtida yetib keldi. Ishonchli servis ekan.", img: img("avatars/08.webp") },
];

export const NEWS = [
  { title: "Onlayn Hamshirada Travmatolog xizmatlari!", text: "Suyak va bo‘g‘im muammolari bilan qiynalayapsizmi? Endi malakali travmatolog qabuliga yozilish uchun uzoq kutish shart emas!", img: img("news/travmatolog.webp") },
  { title: "Ramazon muborak bo‘lsin!", text: "Ramazon – qalb pokligi, saxovat va rahmat oyi! Ushbu muborak kunlarda duolar qabul, yuraklar tinch, xonadonlaringiz fayzli bo‘lsin!", img: img("news/ramazon.webp") },
  { title: "Ro‘za tutishning quyidagi foydalarini bilarmidingiz?", text: "Ro‘za – nafaqat ibodat, balki inson sog‘lig‘i va ruhiyati uchun ham ulkan ne’mat.", img: img("news/roza.webp") },
];

export const FAQ = [
  { q: "Onlayn Hamshira qanday xizmatlarni beradi?", a: "Xizmatlarimiz uyga kelib ukol qilish, sistema qo‘yish, yarani tozalash va bog‘lash, bosim, puls, temperatura kabi ko‘rsatkichlarni tekshirish, operatsiyadan keyingi parvarish, keksa yoki yotib davolanadigan bemorlarga qarash kabi kundalik hamshiralik ishlarini o‘z ichiga oladi. Hamshira kelganda, bemorning holatini ko‘rib, kerak bo‘lsa qo‘shimcha yordam ham ko‘rsatadi." },
  { q: "Xizmatning narxi qanday hisoblanadi?", a: "Narx xizmat turiga, manzilga va bemorning holatiga qarab belgilanadi. Masalan, oddiy ukol narxi bilan sistemani qo‘yish narxi bir xil bo‘lmaydi. Buyurtma berish jarayonida taxminiy narx ko‘rinadi, hamshira manzilga kelgandan so‘ng yakuniy narx tasdiqlanadi. Hech qanday yashirin to‘lovlar bo‘lmaydi." },
  { q: "Hamshiralar malakasi qanday tekshiriladi?", a: "Bizning hamshiralar rasmiy tibbiyot ta’limiga ega, sertifikatlangan va amaliy tajribasi bor. Har bir hamshiraning hujjatlari tekshiriladi va xizmatga qabul qilishdan oldin suhbatdan o‘tkaziladi. Maqsad bemorga xavfsiz va to‘g‘ri yordam ko‘rsatish." },
  { q: "Qaysi holatlarda Onlayn Hamshira yordam bera olmaydi?", a: "Juda og‘ir, hayot uchun xavfli holatlarda biz yordam bera olmaymiz. Masalan, hushdan ketish, kuchli qon ketishi, infarkt alomatlari yoki og‘ir nafas yetishmovchiligi bo‘lsa, darhol 103 ga qo‘ng‘iroq qilish kerak. Bizning xizmat kundalik va o‘rta darajadagi muammo uchun mo‘ljallangan." },
  { q: "Xizmat qaysi hududlarda ishlaydi?", a: "Xizmat shaharning asosiy tumanlarida va qo‘shimcha ko‘rsatilgan (Namangan, Nukus, Farg‘ona, Toshkent, Samarqand) hududlarda mavjud. Buyurtma berayotganingizda manzilingizni kiritsangiz, tizim avtomatik ravishda xizmat mavjud yoki yo‘qligini ko‘rsatadi." },
  { q: "Hamshira kelishidan oldin nima qilishim kerak?", a: "Faqat bemor yotadigan yoki o‘tiradigan joyni tayyorlab qo‘ysangiz bo‘ladi. Agar dori, tibbiy yozuvlar yoki shifokor tavsiyalari bo‘lsa, qo‘l ostida turing. Hamshira o‘zi kerakli tibbiy anjomlarni olib keladi." },
  { q: "Shaxsiy ma’lumotlarim qanday saqlanadi?", a: "Barcha shaxsiy va tibbiy ma’lumotlaringiz maxfiy saqlanadi. Ular uchinchi shaxslarga berilmaydi va faqat xizmatni to‘g‘ri bajarish uchun ishlatiladi." },
  { q: "Xizmat sifati yaxshi bo‘lmasa, nima bo‘ladi?", a: "Agar xizmat siz kutgandek bo‘lmasa, qo‘llab-quvvatlashga murojaat qilsangiz, vaziyat tekshiriladi. Kerak bo‘lsa, pul qaytariladi yoki hamshira yana bepul yuboriladi. Maqsad bemorning rozi bo‘lishi." },
  { q: "Hamshira odatda qancha vaqtda yetib keladi?", a: "Odatda 30–90 daqiqa ichida etib keladi. Yaqin manzillar tezroq, uzoq tumanlar biroz sekinroq bo‘lishi mumkin. Buyurtma tasdiqlangandan keyin taxminiy kelish vaqti ko‘rsatiladi." },
  { q: "Savollarim bo‘lsa, qayerga yozsam bo‘ladi?", a: "Call-center, Telegram bot yoki rasmiy qo‘llab-quvvatlash orqali savollarni berishingiz mumkin. Operatorlar 24/7 yordam beradi." },
];

export const formatPrice = (n: number) =>
  n.toLocaleString("ru-RU").replace(/\u00a0/g, " ") + " so‘m";
