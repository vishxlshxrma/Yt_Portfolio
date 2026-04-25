import React, { useEffect, useState } from "react";
import { Eye, FolderOpen, MoreVertical, X } from "lucide-react";
import { Badge } from "components/ui/badge";

// NOTE: keep the file/component, but accept `projects` and render under id="projects"
export default function HomeTab({ projects = [], openProjectRequest = null }) {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (!activeProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject]);

  useEffect(() => {
    if (!openProjectRequest?.title) return;
    const matchedProject = projects.find((project) => project.title === openProjectRequest.title);
    if (matchedProject) {
      setActiveProject(matchedProject);
    }
  }, [openProjectRequest, projects]);

  return (
    <>
      <section
        id="projects"
        className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 scroll-mt-24"
      >
        {projects.map((project) => (
          <article
            key={`${project.title}-${project.company}`}
            role="button"
            tabIndex={0}
            onClick={() => setActiveProject(project)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveProject(project);
              }
            }}
            className="group cursor-pointer outline-none"
            aria-label={`Open details for ${project.title}`}
          >
            <div className="relative overflow-hidden rounded-2xl bg-[#1f1f1f]">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="aspect-video w-full object-cover transition duration-300 group-hover:scale-[1.015] group-hover:brightness-105"
              />
              <div className="absolute bottom-3 right-3 rounded-md bg-[rgba(15,15,15,0.88)] px-2 py-1 text-xs font-medium tracking-wide text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                {project.duration}
              </div>
            </div>

            <div className="mt-3 flex items-start gap-3">
              <img
                src={project.thumbnail}
                alt={`${project.title} logo`}
                className="mt-0.5 h-10 w-10 flex-shrink-0 rounded-full border border-white/10 object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="line-clamp-2 text-[1.08rem] font-semibold leading-6 text-white transition-colors group-hover:text-[#f1f1f1]">
                    {project.title}
                  </h3>
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[#aaaaaa] transition group-hover:bg-white/8 group-hover:text-white">
                    <MoreVertical className="h-5 w-5" />
                  </div>
                </div>

                <p className="mt-1 text-sm text-[#aaaaaa]">{project.company}</p>

                <p className="mt-1 line-clamp-2 text-sm leading-5 text-[#8c8c8c]">
                  {project.description}
                </p>

                <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[#aaaaaa]">
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" />
                    <span>{project.views} impact</span>
                  </div>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {(project.tags ?? []).slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full border border-white/10 bg-[#2a2a2a] px-2.5 py-0.5 text-[11px] text-[#d7d7d7]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {activeProject ? (
        <div
          className="animate-experienceOverlayIn fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-md"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="animate-experiencePanelIn w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#181818] shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative">
              <img
                src={activeProject.thumbnail}
                alt={activeProject.title}
                className="h-[240px] w-full object-cover sm:h-[320px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/25 to-transparent" />

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75"
                aria-label="Close project details"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-black/65 px-3 py-1 text-xs text-white">
                  {activeProject.duration}
                </Badge>
                <Badge className="rounded-full bg-black/65 px-3 py-1 text-xs text-white">
                  <Eye className="mr-1 h-3.5 w-3.5" />
                  {activeProject.views} impact
                </Badge>
              </div>
            </div>

            <div className="animate-experienceContentIn max-h-[calc(90vh-240px)] overflow-y-auto px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              <div className="flex items-start gap-4">
                <img
                  src={activeProject.thumbnail}
                  alt={`${activeProject.title} logo`}
                  className="h-14 w-14 flex-shrink-0 rounded-full border border-white/10 object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-[#aaaaaa]">
                    <span className="truncate font-medium text-[#d6d6d6]">
                      {activeProject.company}
                    </span>
                  </div>

                  <h3 className="mt-1 text-2xl font-semibold leading-tight text-white sm:text-[2rem]">
                    {activeProject.title}
                  </h3>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/8 bg-[#202020] p-5">
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#b7b7b7]">
                  <span className="inline-flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-[#ff4e45]" />
                    Project
                  </span>
                  <span>{activeProject.duration}</span>
                  <span>{activeProject.views} impact</span>
                </div>

                <p className="mt-4 text-[15px] leading-7 text-[#e3e3e3]">
                  {activeProject.description}
                </p>

                {activeProject.tags?.length ? (
                  <div className="mt-5">
                    <h4 className="text-sm font-medium uppercase tracking-[0.18em] text-[#9d9d9d]">
                      Tech Stack
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeProject.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="rounded-full border border-white/10 bg-[#2a2a2a] px-3 py-1 text-xs font-medium text-[#ededed]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
