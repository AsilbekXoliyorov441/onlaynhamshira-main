"use client";

/**
 * Kursor ortidan yuruvchi yorug'lik (.bento-glow) uchun bitta delegatsiyalangan listener.
 * ServiceBento server komponent bo'lib qoladi — faqat shu o'ram client.
 */
export function BentoPointer({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <ul
      className={className}
      onMouseMove={(e) => {
        const card = (e.target as HTMLElement).closest<HTMLElement>(".bento");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </ul>
  );
}
