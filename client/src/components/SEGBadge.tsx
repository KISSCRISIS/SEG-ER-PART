import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type SEGBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export function SEGBadge({ children, className, ...props }: SEGBadgeProps) {
  return <span className={cn("seg-kicker", className)} {...props}>{children}</span>;
}
