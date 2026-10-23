import type { MedicalSystemCardData } from "@/data/medical-systems";
import MedicalSystemCard, {
  type MedicalSystemCardProgress,
} from "./MedicalSystemCard";

export type { MedicalSystemCardProgress };

/**
 * Responsive grid of system-first navigation cards. Purely presentational:
 * counts come from the caller (index + progress store).
 */
export default function MedicalSystemCards({
  systems,
  progress,
}: {
  systems: MedicalSystemCardData[];
  progress?: Record<string, MedicalSystemCardProgress>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {systems.map(system => (
        <MedicalSystemCard
          key={system.id}
          system={system}
          progress={progress?.[system.id]}
        />
      ))}
    </div>
  );
}
