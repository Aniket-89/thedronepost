import { DIFFICULTY_COLORS } from "@/lib/constants";

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = DIFFICULTY_COLORS[difficulty.toLowerCase()] || "bg-gray-500 text-white";

  return (
    <span
      className={`inline-block font-heading text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 ${colors}`}
    >
      {difficulty}
    </span>
  );
}
