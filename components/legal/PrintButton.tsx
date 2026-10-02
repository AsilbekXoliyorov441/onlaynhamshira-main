"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold ring-1 ring-line transition hover:ring-ink/25 print:hidden"
    >
      <Printer className="size-4" aria-hidden /> {label}
    </button>
  );
}
