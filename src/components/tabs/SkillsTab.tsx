import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import SkillSphereScene from "./SkillSphereScene";
import InfoPanel from "./InfoPanel";
import CategoryPills from "./CategoryPills";
import { categoryOrder, skillCategories, type CategoryId } from "./skillsData";

export default function SkillsTab() {
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  const activeCategory = useMemo(
    () => skillCategories.find((category) => category.id === activeCategoryId) ?? null,
    [activeCategoryId]
  );

  const previewCategory = activeCategory;

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
            <SkillSphereScene activeCategoryId={activeCategory?.id ?? null} />
          </div>

          <div ref={panelRef} className="space-y-6">
            <InfoPanel category={previewCategory} />
          </div>
        </div>

        <div ref={pillsRef} className="mt-10">
          <CategoryPills
            categories={categoryOrder.map((id) => skillCategories.find((item) => item.id === id)!).filter(Boolean)}
            activeCategoryId={activeCategoryId}
            onHover={() => {}}
            onSelect={(id) => setActiveCategoryId((current) => (current === id ? null : id))}
          />
        </div>
      </div>
    </section>
  );
}
