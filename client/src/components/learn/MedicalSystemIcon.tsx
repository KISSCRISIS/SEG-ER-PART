import {
  Activity,
  Ambulance,
  Baby,
  Bandage,
  Bone,
  Brain,
  Bug,
  Droplets,
  Dna,
  Eye,
  FlaskConical,
  HeartPulse,
  LayoutGrid,
  Ribbon,
  Stethoscope,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { MedicalSystemIconKey } from "@/data/medical-systems";

const ICONS: Record<MedicalSystemIconKey, LucideIcon> = {
  heart: HeartPulse,
  respiratory: Wind,
  neurology: Brain,
  trauma: Ambulance,
  toxicology: FlaskConical,
  infectious: Bug,
  gastrointestinal: Stethoscope,
  renal: Droplets,
  endocrinology: Dna,
  pediatrics: Baby,
  obgyn: Ribbon,
  ent: Eye,
  dermatology: Bandage,
  musculoskeletal: Bone,
  "critical-care": Activity,
  general: LayoutGrid,
};

export default function MedicalSystemIcon({
  name,
  className,
}: {
  name: MedicalSystemIconKey;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Stethoscope;
  return <Icon className={className} aria-hidden="true" />;
}
