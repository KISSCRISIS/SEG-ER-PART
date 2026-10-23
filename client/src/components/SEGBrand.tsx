import { segAssets } from "@/lib/seg-assets";

type SEGBrandProps = {
  compact?: boolean;
  inverse?: boolean;
};

export function SEGBrand({ compact = false, inverse = false }: SEGBrandProps) {
  return (
    <div className="flex items-center gap-2.5" aria-label="SEG — Smart Emergency Guide">
      <span className={`grid shrink-0 place-items-center overflow-hidden rounded-xl border border-cyan-200/40 bg-[#020a16] shadow-[0_0_20px_rgba(0,212,255,0.18)] ${compact ? "h-16 w-11" : "h-20 w-14"}`} aria-hidden="true"><img src={segAssets.suppliedLogo} alt="" width="853" height="1280" className="h-full w-full object-contain" /></span>
      <div className="min-w-0">
        <p className={`font-bold leading-none tracking-[0.06em] ${compact ? "text-base" : "text-xl"} ${inverse ? "text-white" : "text-slate-950"}`}>SEG</p>
        <p className={`mt-1 text-[8px] font-semibold tracking-[0.14em] ${inverse ? "text-cyan-100/80" : "text-slate-500"}`}>SMART EMERGENCY GUIDE</p>
      </div>
    </div>
  );
}
