"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { OFFICE } from "./office";

// OpenFreeMap — ochiq, kalitsiz, reklamasiz vektor xarita (OpenStreetMap ma'lumotlari)
const STYLE = "https://tiles.openfreemap.org/styles/bright";

/** Faqat client'da, next/dynamic orqali yuklanadi (maplibre ~800KB — asosiy bundle'ga tushmaydi) */
export default function MapView() {
  const el = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!el.current) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const map = new maplibregl.Map({
      container: el.current,
      style: STYLE,
      center: [OFFICE.lng, OFFICE.lat],
      zoom: 15.6,
      minZoom: 10,
      maxZoom: 18.5,
      attributionControl: { compact: true },
      // Sahifa skroll'ini "o'g'irlamaslik" uchun: kompyuterda Ctrl + g'ildirak, telefonda ikki barmoq
      cooperativeGestures: true,
      locale: {
        "CooperativeGesturesHandler.WindowsHelpText": "Kattalashtirish uchun Ctrl + g‘ildirakdan foydalaning",
        "CooperativeGesturesHandler.MacHelpText": "Kattalashtirish uchun ⌘ + g‘ildirakdan foydalaning",
        "CooperativeGesturesHandler.MobileHelpText": "Xaritani ikki barmoq bilan suring",
        "NavigationControl.ZoomIn": "Kattalashtirish",
        "NavigationControl.ZoomOut": "Kichiklashtirish",
        "Map.Title": "Onlayn Hamshira joylashuvi xaritasi",
        "AttributionControl.ToggleAttribution": "Ma'lumot manbalari",
      },
      pitchWithRotate: false,
      dragRotate: false,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
    // Tepadagi manzil kartochkasi markerni yopmasligi uchun markaz biroz pastroqda
    map.setPadding({ top: 90, bottom: 0, left: 0, right: 0 });

    // Marker: logodagi hamshira belgisi + nuqta ostida pulsatsiya
    const node = document.createElement("div");
    node.className = "oh-pin";
    node.innerHTML = `<span class="oh-pin-pulse"></span><img src="/img/map-pin.svg" alt="" width="46" height="57" draggable="false" />`;
    new maplibregl.Marker({ element: node, anchor: "bottom" }).setLngLat([OFFICE.lng, OFFICE.lat]).addTo(map);

    map.once("load", () => {
      setReady(true);
      // Mualliflik yozuvi (OpenStreetMap litsenziyasi talabi) — yig'iq "i" tugmasi holida
      el.current?.querySelector(".maplibregl-ctrl-attrib")?.classList.remove("maplibregl-compact-show");
      if (!reduced) map.easeTo({ zoom: 16.4, duration: 1400 });
    });
    return () => map.remove();
  }, []);

  return (
    <div
      ref={el}
      data-lenis-prevent
      aria-label={`Xarita: ${OFFICE.name}, ${OFFICE.address}`}
      role="region"
      className={`absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}
