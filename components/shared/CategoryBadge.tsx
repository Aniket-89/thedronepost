import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/constants";

export function CategoryBadge({
  category,
  size = "sm",
}: {
  category: string;
  size?: "sm" | "md";
}) {
  const bgColor = CATEGORY_COLORS[category] || "bg-gray-500";
  const label = CATEGORY_LABELS[category] || category;

  return (
    <span
      className={`inline-block font-heading font-semibold uppercase tracking-wide text-white ${bgColor} ${
        size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"
      }`}
    >
      {label}
    </span>
  );
}
