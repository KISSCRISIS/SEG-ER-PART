import { SEGBadge } from "@/components/SEGBadge";

type SEGSectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SEGSectionHeading({ eyebrow, title, description, align = "left" }: SEGSectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex max-w-2xl flex-col ${alignment}`}>
      <SEGBadge>{eyebrow}</SEGBadge>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-300">{description}</p> : null}
    </div>
  );
}
