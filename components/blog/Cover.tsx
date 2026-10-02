import type { BlogImage, BlogTopic } from "@/lib/blog-shared";
import { Icon } from "../Icon";
import { TOPIC_STYLE } from "./topics";

/**
 * Maqola rasmi (Tilda'dan olingan tayyor srcset bilan) yoki rasm bo'lmasa — mavzu rangidagi bezakli fon.
 * Rasm bezak hisoblanadi (alt=""): sarlavha yonida turadi va ma'lumot qo'shmaydi.
 */
export function Cover({
  img, topic, sizes, priority = false, className = "",
}: { img: BlogImage | null; topic: BlogTopic; sizes: string; priority?: boolean; className?: string }) {
  if (img) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- legacy rasmlar oldindan optimallashtirilgan (webp + srcset)
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes={sizes}
        width={img.width}
        height={img.height}
        alt=""
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        draggable={false}
        className={`size-full object-cover ${className}`}
      />
    );
  }
  const s = TOPIC_STYLE[topic];
  return (
    <div aria-hidden className={`relative grid size-full place-items-center overflow-hidden bg-gradient-to-br ${s.grad} ${className}`}>
      <span className="absolute inset-0 bg-[radial-gradient(circle,rgb(255_255_255/0.18)_1.2px,transparent_1.6px)] bg-[length:16px_16px]" />
      <span className="absolute -top-10 -left-10 size-40 rounded-full bg-white/20 blur-2xl" />
      <span className="relative grid size-20 place-items-center rounded-[28%] bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-md">
        <Icon name={s.icon} size={40} tone="current" />
      </span>
    </div>
  );
}
