import React from "react";
import { Badge } from "components/ui/badge";
import { Search, BriefcaseBusiness, FolderOpen, Orbit } from "lucide-react";

export default function SearchResults({
  query,
  results,
  onOpenProject,
  onOpenExperience,
  onViewSkillCosmos,
}) {
  const projects = results?.projects ?? [];
  const experiences = results?.experience ?? [];
  const skills = results?.skills ?? [];
  const domains = results?.domains ?? [];
  const hasResults = projects.length || experiences.length || skills.length || domains.length;

  return (
    <section id="search" className="space-y-10 scroll-mt-24">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">Search</p>
        <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">
          Search: {query}
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Matching projects, work experience, and skill cosmos links.
        </p>
      </div>

      {!hasResults ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-[var(--text-secondary)]">
          No matching projects, experience, or skills found for "{query}". Try Python, React, FastAPI,
          AI, Android, or Data Analysis.
        </div>
      ) : null}

      {projects.length ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Projects using {query}</h3>
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={`${project.title}-${project.company}`}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <img src={project.thumbnail} alt={project.title} className="aspect-video w-full object-cover" />
                <div className="p-4">
                  <h4 className="line-clamp-2 text-base font-semibold text-[var(--text-primary)]">
                    {project.title}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{project.company}</p>
                  <p className="mt-2 line-clamp-3 text-sm text-[var(--text-secondary)]">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(project.tags ?? []).slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-0.5 text-[11px] text-[var(--text-primary)]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenProject?.(project.title)}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)]"
                  >
                    <FolderOpen className="h-3.5 w-3.5 text-[var(--accent-red)]" />
                    Open in Projects
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {experiences.length ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Experience using {query}</h3>
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
            {experiences.map((exp) => (
              <article
                key={`${exp.company}-${exp.title}`}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              >
                <img src={exp.thumbnail} alt={exp.title} className="aspect-video w-full object-cover" />
                <div className="p-4">
                  <h4 className="line-clamp-2 text-base font-semibold text-[var(--text-primary)]">
                    {exp.title}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{exp.company}</p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">{exp.dateLabel}</p>
                  <p className="mt-2 line-clamp-3 text-sm text-[var(--text-secondary)]">{exp.summary}</p>
                  <button
                    type="button"
                    onClick={() => onOpenExperience?.()}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)]"
                  >
                    <BriefcaseBusiness className="h-3.5 w-3.5 text-[var(--accent-red)]" />
                    View in Experience
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {skills.length ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Related Skills</h3>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {skills.map((skill) => (
              <article
                key={skill.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-base font-semibold text-[var(--text-primary)]">{skill.name}</h4>
                    <p className="mt-1 text-xs capitalize text-[var(--text-secondary)]">
                      {skill.type} • {skill.importance}
                    </p>
                  </div>
                  <Search className="h-4 w-4 text-[var(--text-secondary)]" />
                </div>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">{skill.description}</p>
                <button
                  type="button"
                  onClick={() => onViewSkillCosmos?.({ skillId: skill.id, domainId: skill.domainIds?.[0] })}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  <Orbit className="h-3.5 w-3.5 text-[var(--accent-red)]" />
                  View in Skill Cosmos
                </button>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {domains.length ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Related Skill Domains</h3>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {domains.map((domain) => (
              <article
                key={domain.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <h4 className="text-base font-semibold text-[var(--text-primary)]">{domain.name}</h4>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">{domain.shortName}</p>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">{domain.description}</p>
                <button
                  type="button"
                  onClick={() => onViewSkillCosmos?.({ domainId: domain.id })}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  <Orbit className="h-3.5 w-3.5 text-[var(--accent-red)]" />
                  View in Skill Cosmos
                </button>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
