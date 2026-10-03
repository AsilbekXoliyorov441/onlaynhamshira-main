"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { OFFICE } from "./office";
import { fill } from "@/lib/i18n/format";
import type { Dict } from "@/lib/i18n/dictionaries/uz";

// Yandex Maps JS API 2.1. Standart boshqaruvlar, "Yandex Kartalarda ochish" bloki va POI bosilishi o'chirilgan;
// zoom tugmalari o'zimizniki. Pastki burchakdagi Yandex logotipi va "Shartlar" havolasi litsenziya talabi — qoldirilgan.
// Kalit (NEXT_PUBLIC_YANDEX_MAPS_KEY) bo'lsa — vektor xarita: do'kon/kafe/bekat belgilari butunlay yashiriladi.
// Kalitsiz — rastr xarita, globals.css'dagi filtr bilan xiralashtiriladi (belgilarni olib tashlab bo'lmaydi).
const API_KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_KEY;

const VECTOR_CUSTOMIZATION = [
  { tags: { any: ["poi", "transit"] }, stylers: { visibility: "off" } },
  { tags: { any: ["landcover", "vegetation", "park"] }, stylers: { saturation: -0.4 } },
];

/* eslint-disable @typescript-eslint/no-explicit-any -- ymaps rasmiy tiplarga ega emas */
type YMaps = any;
let loader: Promise<YMaps> | null = null;

function loadYmaps(lang: string): Promise<YMaps> {
  const w = window as any;
  if (w.ymaps?.Map) return Promise.resolve(w.ymaps);
  loader ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://api-maps.yandex.ru/2.1/?lang=${lang}${API_KEY ? `&apikey=${API_KEY}` : ""}`;
    s.async = true;
    s.onload = () => w.ymaps.ready(() => resolve(w.ymaps));
    s.onerror = () => {
      loader = null;
      reject(new Error("ymaps"));
    };
    document.head.appendChild(s);
  });
  return loader;
}

/** Faqat client'da, next/dynamic orqali yuklanadi */
export default function MapView({ t, address }: { t: Dict["map"]; address: string }) {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<YMaps>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let map: YMaps = null;
    let cancelled = false;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = matchMedia("(pointer: coarse)").matches;

    loadYmaps(t.apiLang)
      .then((ymaps) => {
        if (cancelled || !el.current) return;
        map = new ymaps.Map(
          el.current,
          { center: [OFFICE.lat, OFFICE.lng], zoom: reduced ? 16 : 15, controls: [] },
          {
            suppressMapOpenBlock: true,
            suppressObsoleteBrowserNotifier: true,
            yandexMapDisablePoiInteractivity: true,
            minZoom: 10,
            maxZoom: 19,
            ...(API_KEY && { vector: true, layerVectorCustomization: VECTOR_CUSTOMIZATION }),
          },
        );
        // Sahifa skroll'ini "o'g'irlamaslik": g'ildirak bilan zoom yo'q, telefonda bir barmoq sahifani suradi
        map.behaviors.disable(["scrollZoom", "dblClickZoom", ...(touch ? ["drag"] : [])]);

        // Marker: logodagi hamshira belgisi + nuqta ostida pulsatsiya (globals.css → .oh-pin)
        const Layout = ymaps.templateLayoutFactory.createClass(
          '<div class="oh-pin"><span class="oh-pin-pulse"></span><img src="/img/map-pin.svg" alt="" width="46" height="57" draggable="false" /></div>',
        );
        map.geoObjects.add(
          new ymaps.Placemark(
            [OFFICE.lat, OFFICE.lng],
            { hintContent: OFFICE.name },
            {
              iconLayout: Layout,
              iconShape: { type: "Rectangle", coordinates: [[-23, -57], [23, 0]] },
              hasBalloon: false,
            },
          ),
        );

        mapRef.current = map;
        setReady(true);
        if (!reduced) setTimeout(() => map?.setCenter([OFFICE.lat, OFFICE.lng], 16, { duration: 900 }), 250);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      map?.destroy();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- matnlar sahifa umri davomida o'zgarmaydi
  }, []);

  const zoom = (d: number) => {
    const m = mapRef.current;
    if (m) m.setZoom(m.getZoom() + d, { checkZoomRange: true, duration: 250 });
  };

  return (
    <>
      <div
        ref={el}
        aria-label={fill(t.regionLabel, { name: OFFICE.name, address })}
        role="region"
        className={`oh-ymap ${API_KEY ? "" : "oh-ymap-raster "}absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
      />
      {ready && (
        <div className="absolute right-3 bottom-10 flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_24px_-14px_rgb(16_41_58/0.5)] ring-1 ring-line sm:right-4">
          <button type="button" onClick={() => zoom(1)} aria-label={t.zoomIn} className="grid size-10 place-items-center text-ink transition hover:bg-mist">
            <Plus className="size-4.5" aria-hidden />
          </button>
          <span className="h-px bg-line" />
          <button type="button" onClick={() => zoom(-1)} aria-label={t.zoomOut} className="grid size-10 place-items-center text-ink transition hover:bg-mist">
            <Minus className="size-4.5" aria-hidden />
          </button>
        </div>
      )}
    </>
  );
}
