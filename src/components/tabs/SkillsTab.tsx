import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import SkillSphereScene from "./SkillSphereScene";
import InfoPanel from "./InfoPanel";
import DomainPills from "./DomainPills";
import { 
  domains, 
  skills, 
  projects,
  getDomain,
  getSkillsForDomain,
  getSubclustersForDomain,
  type DomainId
} from "./skillsData";

export type ViewMode = "overview" | "domain" | "skill";

type Props = {
  onOpenProject?: (projectId: string) => void;
};

export default function SkillsTab({ onOpenProject }: Props) {
  const [activeDomainId, setActiveDomainId] = useState<DomainId | null>(null);
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  // Determine view mode based on state priority
  const viewMode: ViewMode = activeSkillId ? "skill" : activeDomainId ? "domain" : "overview";

  // Get active domain
  const activeDomain = useMemo(
    () => activeDomainId ? getDomain(activeDomainId) ?? null : null,
    [activeDomainId]
  );

  // Get active skill
  const activeSkill = useMemo(
    () => activeSkillId ? skills.find(s => s.id === activeSkillId) ?? null : null,
    [activeSkillId]
  );

  // Get skills for active domain
  const domainSkills = useMemo(
    () => activeDomainId ? getSkillsForDomain(activeDomainId) : [],
    [activeDomainId]
  );

  // Get subclusters for active domain
  const domainSubclusters = useMemo(
    () => activeDomainId ? getSubclustersForDomain(activeDomainId) : [],
    [activeDomainId]
  );

  // Get projects for active domain
  const domainProjects = useMemo(
    () => activeDomainId ? projects.filter((project) => project.domainIds?.includes(activeDomainId)) : [],
    [activeDomainId]
  );

  // Handle domain selection
  const handleDomainSelect = (domainId: DomainId) => {
    setActiveDomainId(current => current === domainId ? null : domainId);
    setActiveSkillId(null); // Clear skill when domain changes
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        duration: 0.9,
        autoAlpha: 0,
        y: 40,
        ease: "power3.out",
      });

      gsap.from(panelRef.current?.children, {
        duration: 0.85,
        y: 30,
        autoAlpha: 0,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.16,
      });

      gsap.from(pillsRef.current?.children, {
        duration: 0.7,
        y: 20,
        autoAlpha: 0,
        ease: "power3.out",
        stagger: 0.06,
        delay: 0.28,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-10 lg:py-16">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(38,147,255,0.14),_transparent_35%)] pointer-events-none" />
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] items-start">
          <div className="relative min-h-[560px] rounded-[2.5rem] border border-white/10 bg-[#070a12]/80 p-4 shadow-[0_50px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <SkillSphereScene 
              activeDomainId={activeDomainId}
              activeSkillId={activeSkillId}
            />
          </div>

          <div ref={panelRef} className="min-w-0 space-y-6">
            <InfoPanel 
              viewMode={viewMode}
              domain={activeDomain}
              skill={activeSkill}
              domainSkills={domainSkills}
              domainSubclusters={domainSubclusters}
              domainProjects={domainProjects}
              domains={domains}
              onOpenProject={onOpenProject}
            />
          </div>
        </div>

        <div ref={pillsRef} className="mt-10">
          <DomainPills
            domains={domains}
            activeDomainId={activeDomainId}
            onSelect={handleDomainSelect}
          />
        </div>
      </div>
    </section>
  );
}
