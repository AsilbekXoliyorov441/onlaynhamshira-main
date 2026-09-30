"use client";

import { useEffect, useRef, useState } from "react";

// Kadr o'lchami (fon olib tashlangan, kesilgan)
const W = 386;
const H = 612;
const VIDEO = "/img/app/phone-v3.mp4"; // 265KB, 20s, H.264
const POSTER = "/img/app/phone-poster-v3.webp"; // 20KB

/*
 * "Stacked alpha" video: bitta H.264 MP4 ichida tepada rang, pastda shaffoflik niqobi.
 * WebGL shader ularni birlashtirib shaffof tasvir chizadi. H.264 va WebGL hamma brauzerda
 * (Safari/iPhone ham) ishlaydi — VP9 alpha'dan farqli o'laroq, bitta fayl yetadi.
 */
const VERT = `attribute vec2 p;varying vec2 uv;void main(){uv=vec2((p.x+1.)*.5,(1.-p.y)*.5);gl_Position=vec4(p,0.,1.);}`;
const FRAG = `precision mediump float;uniform sampler2D t;varying vec2 uv;void main(){vec3 c=texture2D(t,vec2(uv.x,uv.y*.5)).rgb;float a=texture2D(t,vec2(uv.x,.5+uv.y*.5)).r;gl_FragColor=vec4(c*a,a);}`;

function setupGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) return null;
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return gl;
}

/**
 * Ilova animatsiyasi (20 soniya):
 *  1) SSR/boshlang'ich — statik poster
 *  2) bo'lim ekranga yaqinlashganda — video yuklanadi va WebGL canvas'ga chiziladi
 *  WebGL bo'lmasa yoki prefers-reduced-motion'da poster qoladi.
 */
export function AppPhone({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false); // video elementini qo'shish
  const [ready, setReady] = useState(false); // birinchi kadr chizildi → poster yashirinadi

  // Ekranga yaqinlashganda yuklash
  useEffect(() => {
    const el = wrap.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setLoad(true);
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Har bir video kadrini WebGL orqali chizish
  useEffect(() => {
    const v = video.current, c = canvas.current;
    if (!load || !v || !c) return;
    const gl = setupGL(c);
    if (!gl) return; // poster qoladi
    let raf = 0, vfc = 0, stop = false;
    const draw = () => {
      if (v.readyState < 2) return;
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, v);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      setReady(true);
    };
    // requestVideoFrameCallback — faqat yangi kadr kelganda chizadi (15 kadr/s), bo'lmasa rAF
    const hasVfc = "requestVideoFrameCallback" in v;
    const loop = () => {
      if (stop) return;
      draw();
      if (hasVfc) vfc = v.requestVideoFrameCallback(loop);
      else raf = requestAnimationFrame(loop);
    };
    loop();
    v.play().catch(() => {});
    return () => {
      stop = true;
      cancelAnimationFrame(raf);
      if (hasVfc) v.cancelVideoFrameCallback(vfc);
    };
  }, [load]);

  return (
    <div ref={wrap} className={`relative ${className}`} style={{ aspectRatio: `${W} / ${H}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- 20KB poster, video tayyor bo'lguncha */}
      <img
        src={POSTER}
        alt="Onlayn Hamshira ilovasi: bosh sahifa, AI chat, buyurtma va hamshira tanlash"
        width={W}
        height={H}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 size-full transition-opacity duration-300 ${ready ? "opacity-0" : ""}`}
      />
      <canvas ref={canvas} width={W} height={H} aria-hidden className="absolute inset-0 size-full" />
      {load && (
        // Ko'rinmas manba: kadrlar canvas'ga chiziladi. display:none emas — iOS unda kadr bermaydi
        <video
          ref={video}
          src={VIDEO}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden
          className="pointer-events-none absolute size-px opacity-0"
        />
      )}
    </div>
  );
}
