import { useRef, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from "react";
import { projects as allProjects, type Domain, type Skill, type Subcluster, type Project } from "./skillsData";
import { ViewMode } from "./SkillsTab";

type Props = {
  viewMode: ViewMode;
  domain: Domain | null;
  skill: Skill | null;
  domainSkills: Skill[];
  domainSubclusters: Subcluster[];
  domainProjects: Project[];
  domains: Domain[];
  onOpenProject?: (projectId: string) => void;
};

const overviewShowcaseItems = [
  "AI Systems",
  "Backend & Distributed Systems",
  "Full-Stack Applications",
  "Real-Time Systems",
  "Data Workflows",
  "Automation & Tooling",
];

export default function InfoPanel({ 
  viewMode, 
  domain, 
  skill, 
  domainSkills, 
  domainSubclusters, 
  domainProjects,
  domains,
  onOpenProject
}: Props) {
  const coreTechScrollRef = useRef<HTMLDivElement | null>(null);
  const appliedProjectsScrollRef = useRef<HTMLDivElement | null>(null);
  const relatedProjectsScrollRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

  const handleCoreTechPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const container = coreTechScrollRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    dragMovedRef.current = false;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = container.scrollLeft;
    container.setPointerCapture(event.pointerId);
  };

  const handleCoreTechPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const container = coreTechScrollRef.current;
    if (!container) return;
    const deltaX = event.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 6) {
      dragMovedRef.current = true;
    }
    container.scrollLeft = dragStartScrollLeftRef.current - deltaX;
  };

  const handleCoreTechPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const container = coreTechScrollRef.current;
    if (!container) return;
    isDraggingRef.current = false;
    if (container.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }
  };

  const handleCoreTechWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const container = coreTechScrollRef.current;
    if (!container) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    container.scrollLeft += event.deltaY;
    event.preventDefault();
  };

  const createSliderHandlers = (ref: { current: HTMLDivElement | null }) => ({
    onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => {
      const container = ref.current;
      if (!container) return;
      isDraggingRef.current = true;
      dragMovedRef.current = false;
      dragStartXRef.current = event.clientX;
      dragStartScrollLeftRef.current = container.scrollLeft;
      container.setPointerCapture(event.pointerId);
    },
    onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      const container = ref.current;
      if (!container) return;
      const deltaX = event.clientX - dragStartXRef.current;
      if (Math.abs(deltaX) > 6) {
        dragMovedRef.current = true;
      }
      container.scrollLeft = dragStartScrollLeftRef.current - deltaX;
    },
    onPointerEnd: (event: ReactPointerEvent<HTMLDivElement>) => {
      const container = ref.current;
      if (!container) return;
      isDraggingRef.current = false;
      if (container.hasPointerCapture(event.pointerId)) {
        container.releasePointerCapture(event.pointerId);
      }
    },
    onWheel: (event: ReactWheelEvent<HTMLDivElement>) => {
      const container = ref.current;
      if (!container) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      container.scrollLeft += event.deltaY;
      event.preventDefault();
    },
  });

  const appliedProjectsSlider = createSliderHandlers(appliedProjectsScrollRef);
  const relatedProjectsSlider = createSliderHandlers(relatedProjectsScrollRef);

  const handleProjectCardClick = (projectId: string) => {
    if (dragMovedRef.current) return;
    onOpenProject?.(projectId);
  };

  const skillProjects = skill
    ? allProjects
        .filter((project) => project.domainIds?.length && project.skillIds.some((skillId) => skill.id === skillId))
        .slice(0, 8)
    : [];

  // Overview Panel
  if (viewMode === "overview") {
    return (
      <div className="min-w-0 max-w-full rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.4)] backdrop-blur-xl text-[var(--text-primary)] sm:p-6 lg:rounded-[2rem] lg:p-8 lg:shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 rounded-full bg-[var(--surface-muted)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-red)]">
            Skill Cosmos
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Interactive map of my Technincal Skills
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              A multi-layer map of the technologies, systems, and domains I work across.
              Click on a domain in the sphere or pills below to explore.
            </p>
          </div>
        </div>

        {/* Core Stack */}
        <div className="mt-8">
          <h3 className="text-sm uppercase tracking-[0.25em] text-[var(--text-secondary)]">What I build</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {overviewShowcaseItems.map((item) => (
              <span 
                key={item}
                className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Domain Summary */}
        <div className="mt-8">
          <h3 className="text-sm uppercase tracking-[0.25em] text-[var(--text-secondary)]">Domains</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {domains.map((d) => (
              <div 
                key={d.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
                style={{ borderLeft: `3px solid ${d.color}` }}
              >
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: d.color }}
                  />
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{d.name}</p>
                </div>
                <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{d.shortName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Domain Panel
  if (viewMode === "domain" && domain) {
    return (
      <div className="min-w-0 max-w-full rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.4)] backdrop-blur-xl text-[var(--text-primary)] sm:p-6 lg:rounded-[2rem] lg:p-8 lg:shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="space-y-4">
          <div 
            className="inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ 
              backgroundColor: `${domain.color}15`,
              color: domain.color 
            }}
          >
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: domain.color }}
            />
            {domain.shortName}
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {domain.name}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              {domain.description}
            </p>
          </div>
        </div>

        {/* Subclusters */}
        <div className="mt-8">
          <h3 className="text-sm uppercase tracking-[0.25em] text-[var(--text-secondary)]">What this covers</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {domainSubclusters.map((sub) => (
              <span 
                key={sub.id}
                className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)]"
              >
                {sub.name}
              </span>
            ))}
          </div>
        </div>

        {/* Core Technologies */}
        <div className="mt-8">
          <h3 className="text-sm uppercase tracking-[0.25em] text-[var(--text-secondary)]">Core technologies</h3>
          <div
            ref={coreTechScrollRef}
            className="mt-4 -mx-2 w-full max-w-full overflow-x-auto px-2 pb-2 select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            onPointerDown={handleCoreTechPointerDown}
            onPointerMove={handleCoreTechPointerMove}
            onPointerUp={handleCoreTechPointerEnd}
            onPointerCancel={handleCoreTechPointerEnd}
            onPointerLeave={handleCoreTechPointerEnd}
            onWheel={handleCoreTechWheel}
            style={{ touchAction: "pan-x" }}
          >
            <div className="flex w-max snap-x snap-mandatory gap-3">
              {domainSkills.map((s) => (
              <div 
                key={s.id} 
                className="min-w-[210px] snap-start rounded-3xl bg-[var(--surface-muted)] p-4 sm:min-w-[260px] lg:min-w-[290px]"
                style={{ borderLeft: `3px solid ${domain.color}` }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{s.name}</p>
                  <span className="text-xs text-[var(--text-secondary)] capitalize">{s.type}</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{s.description}</p>
              </div>
              ))}
            </div>
          </div>
        </div>

        {/* Applied In */}
        {domainProjects.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm uppercase tracking-[0.25em] text-[var(--text-secondary)]">Applied in</h3>
            <div
              ref={appliedProjectsScrollRef}
              className="mt-4 -mx-2 w-full max-w-full overflow-x-auto px-2 pb-2 select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              onPointerDown={appliedProjectsSlider.onPointerDown}
              onPointerMove={appliedProjectsSlider.onPointerMove}
              onPointerUp={appliedProjectsSlider.onPointerEnd}
              onPointerCancel={appliedProjectsSlider.onPointerEnd}
              onPointerLeave={appliedProjectsSlider.onPointerEnd}
              onWheel={appliedProjectsSlider.onWheel}
              style={{ touchAction: "pan-x" }}
            >
              <div className="flex w-max snap-x snap-mandatory gap-3">
              {domainProjects.map((project) => (
                <button
                  type="button"
                  key={project.id}
                  onClick={() => handleProjectCardClick(project.id)}
                  className="w-[190px] min-w-[190px] max-w-[190px] snap-start rounded-3xl bg-[var(--surface-muted)] p-4 text-left transition hover:bg-[var(--surface-hover)] sm:w-[220px] sm:min-w-[220px] sm:max-w-[220px] lg:w-[240px] lg:min-w-[240px] lg:max-w-[240px]"
                  style={{ borderLeft: `3px solid ${domain.color}` }}
                >
                  <p className="line-clamp-2 text-sm font-semibold text-[var(--text-primary)]">{project.name}</p>
                  <p className="mt-1 line-clamp-3 text-xs leading-5 text-[var(--text-secondary)]">{project.description}</p>
                </button>
              ))}
              </div>
            </div>
          </div>
        )}

        {/* Why It Matters */}
        <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-5">
          <h3 className="text-sm uppercase tracking-[0.25em] text-[var(--text-secondary)]">Why it matters</h3>
          <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
            {domain.whyItMatters}
          </p>
        </div>
      </div>
    );
  }

  // Skill Panel
  if (viewMode === "skill" && skill) {
    const skillDomains = domains.filter(d => skill.domainIds.includes(d.id));
    
    return (
      <div className="min-w-0 max-w-full rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.4)] backdrop-blur-xl text-[var(--text-primary)] sm:p-6 lg:rounded-[2rem] lg:p-8 lg:shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 rounded-full bg-[var(--surface-muted)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-red)]">
            Skill Detail
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                {skill.name}
              </h2>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-2 py-1 text-xs text-[var(--text-secondary)] capitalize">
                {skill.type}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              {skill.description}
            </p>
          </div>
        </div>

        {/* Importance */}
        <div className="mt-8">
          <h3 className="text-sm uppercase tracking-[0.25em] text-[var(--text-secondary)]">Proficiency</h3>
          <div className="mt-3">
            <span 
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize"
              style={{
                backgroundColor: skill.importance === "core" ? "#34ff8820" :
                                 skill.importance === "strong" ? "#34d6ff20" :
                                 "var(--surface-hover)",
                color: skill.importance === "core" ? "#34ff88" :
                       skill.importance === "strong" ? "#34d6ff" :
                       "var(--text-secondary)",
                border: `1px solid ${
                  skill.importance === "core" ? "#34ff8840" :
                  skill.importance === "strong" ? "#34d6ff40" :
                  "var(--border)"
                }`
              }}
            >
              {skill.importance}
            </span>
          </div>
        </div>

        {/* Connected Domains */}
        <div className="mt-8">
          <h3 className="text-sm uppercase tracking-[0.25em] text-[var(--text-secondary)]">Connected Domains</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {skillDomains.map((d) => (
              <span 
                key={d.id}
                className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)]"
                style={{ borderLeft: `3px solid ${d.color}` }}
              >
                {d.name}
              </span>
            ))}
          </div>
        </div>

        {/* Related Projects */}
        {skillProjects.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm uppercase tracking-[0.25em] text-[var(--text-secondary)]">Applied in Projects</h3>
            <div
              ref={relatedProjectsScrollRef}
              className="mt-4 -mx-2 w-full max-w-full overflow-x-auto px-2 pb-2 select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              onPointerDown={relatedProjectsSlider.onPointerDown}
              onPointerMove={relatedProjectsSlider.onPointerMove}
              onPointerUp={relatedProjectsSlider.onPointerEnd}
              onPointerCancel={relatedProjectsSlider.onPointerEnd}
              onPointerLeave={relatedProjectsSlider.onPointerEnd}
              onWheel={relatedProjectsSlider.onWheel}
              style={{ touchAction: "pan-x" }}
            >
              <div className="flex w-max snap-x snap-mandatory gap-3">
              {skillProjects.map((project) => (
                <button
                  type="button"
                  key={project.id}
                  onClick={() => handleProjectCardClick(project.id)}
                  className="w-[190px] min-w-[190px] max-w-[190px] snap-start rounded-3xl bg-[var(--surface-muted)] p-4 text-left transition hover:bg-[var(--surface-hover)] sm:w-[220px] sm:min-w-[220px] sm:max-w-[220px] lg:w-[240px] lg:min-w-[240px] lg:max-w-[240px]"
                >
                  <p className="line-clamp-2 text-sm font-semibold text-[var(--text-primary)]">{project.name}</p>
                  <p className="mt-1 line-clamp-3 text-xs leading-5 text-[var(--text-secondary)]">{project.description}</p>
                </button>
              ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
