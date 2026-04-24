import type { CategoryId, SkillCategory } from "./skillsData";

type Props = {
  categories: SkillCategory[];
  activeCategoryId: CategoryId | null;
  onHover: (id: CategoryId | null) => void;
  onSelect: (id: CategoryId) => void;
};

export default function CategoryPills({ categories, activeCategoryId, onHover, onSelect }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
      {categories.map((category) => {
        const isActive = activeCategoryId === category.id;
        return (
          <button
            key={category.id}
            type="button"
            // Removed hover handlers to disable hover-based preview
            onClick={() => onSelect(category.id)}
            className={`rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold transition duration-300 ${
              isActive
                ? "bg-white/10 text-white shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
}
