import type { Domain, DomainId } from "./skillsData";

type Props = {
  domains: Domain[];
  activeDomainId: DomainId | null;
  onSelect: (id: DomainId) => void;
};

export default function DomainPills({ domains, activeDomainId, onSelect }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
      {domains.map((domain) => {
        const isActive = activeDomainId === domain.id;
        return (
          <button
            key={domain.id}
            type="button"
            onClick={() => onSelect(domain.id)}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-300 ${
              isActive
                ? "border-white/20 bg-white/10 text-white shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20"
            }`}
            style={{
              boxShadow: isActive ? `0 0 20px ${domain.color}40` : undefined,
            }}
          >
            <span className="flex items-center gap-2">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: domain.color }}
              />
              {domain.shortName}
            </span>
          </button>
        );
      })}
    </div>
  );
}