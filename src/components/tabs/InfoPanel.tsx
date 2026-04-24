import type { SkillCategory } from "./skillsData";

type Props = {
  category: SkillCategory | null;
};

export default function InfoPanel({ category }: Props) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#090b11]/95 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl text-white">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
          {category ? "Category Spotlight" : "Explore my Technical Skills"}
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {category ? category.title : "Select a category in the skill sphere to see details here."}
          </h2>
          <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">
            {category
              ? category.description
              : "Interact with the 3D skill cosmos on the left, hover or tap a pill to reveal category insights and technologies."}
          </p>
        </div>
      </div>

      {category ? (
        <div className="mt-8 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm uppercase tracking-[0.25em] text-gray-400">Core technologies</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {category.skills.map((skill) => (
                <div key={skill.id} className="rounded-3xl bg-[#0f1320]/80 p-4">
                  <p className="text-sm font-semibold text-white">{skill.name}</p>
                  <p className="mt-2 text-xs leading-5 text-gray-400">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-sm uppercase tracking-[0.25em] text-gray-400">Applied in</h3>
              <div className="mt-4 space-y-3">
                {category.usedIn.map((project) => (
                  <div key={project} className="rounded-2xl bg-[#10151f]/95 p-4 text-sm text-gray-200">
                    {project}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-sm uppercase tracking-[0.25em] text-gray-400">Why it matters</h3>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                This category lights up the core, showing the stack that powers modern AI systems, scalable services, and polished end-user experiences.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
