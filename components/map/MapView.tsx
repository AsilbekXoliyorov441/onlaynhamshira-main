"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { OFFICE } from "./office";
import { fill } from "@/lib/i18n/format";
import type { Dict } from "@/lib/i18n/dictionaries/uz";

// OpenFreeMap — ochiq, kalitsiz, reklamasiz vektor xarita (OpenStreetMap ma'lumotlari)
const STYLE = "https://tiles.openfreemap.org/styles/bright";

/** Faqat client'da, next/dynamic orqali yuklanadi (maplibre ~800KB — asosiy bundle'ga tushmaydi) */
export default function MapView({ t, address }: { t: Dict["map"]; address: string }) {
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
      locale: t.controls,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- matnlar sahifa umri davomida o'zgarmaydi
  }, []);

  return (
    <div
      ref={el}
      data-lenis-prevent
      aria-label={fill(t.regionLabel, { name: OFFICE.name, address })}
      role="region"
      className={`absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}
