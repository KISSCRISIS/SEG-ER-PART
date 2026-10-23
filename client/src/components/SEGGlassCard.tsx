import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type SEGGlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  interactive?: boolean;
};

export function SEGGlassCard({ children, className, interactive = false, ...props }: SEGGlassCardProps) {
  return (
    <div className={cn("seg-glass rounded-2xl", interactive && "seg-glass-interactive", className)} {...props}>
      {children}
    </div>
  );
}
