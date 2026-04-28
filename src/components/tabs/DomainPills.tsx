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
                ? "border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-primary)]"
                : "border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
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
