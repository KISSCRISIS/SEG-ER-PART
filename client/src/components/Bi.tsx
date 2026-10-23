import React from "react";
import { DICT } from "@/lib/seg-i18n";

export interface BiProps {
  t: string;
  className?: string;
  nowrap?: boolean;
}

export default function Bi({ t, className = "", nowrap = false }: BiProps) {
  const entry = DICT[t];
  if (!entry) {
    return <span className={className} dir="ltr">{t}</span>;
  }
  return (
    <span className={`seg-bi inline-flex flex-col leading-none ${nowrap ? "whitespace-nowrap" : ""} ${className}`}>
      <span className="seg-bi-en text-[inherit]" dir="ltr">{entry.en}</span>
      <span className="seg-bi-ar text-[inherit] font-semibold" dir="rtl">{entry.ar}</span>
    </span>
  );
}
