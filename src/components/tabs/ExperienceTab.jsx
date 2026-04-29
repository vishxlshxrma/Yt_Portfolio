import React, { useEffect, useState } from "react";
import { Badge } from "components/ui/badge";
import { BriefcaseBusiness, CheckCircle2, MapPin, MoreVertical, X } from "lucide-react";

export default function ExperienceTab({ workExperience = [] }) {
  const [activeExperience, setActiveExperience] = useState(null);

  useEffect(() => {
    if (!activeExperience) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveExperience(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeExperience]);

  return (
    <>
      <section
        id="experience"
        className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 scroll-mt-24"
      >
        {workExperience.map((exp) => (
          <article
            key={`${exp.company}-${exp.title}`}
            role="button"
            tabIndex={0}
            onClick={() => setActiveExperience(exp)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveExperience(exp);
              }
            }}
            className="group cursor-pointer outline-none"
            aria-label={`Open details for ${exp.title}`}
          >
            <div className="relative overflow-hidden rounded-2xl bg-[var(--surface)]">
              <img
                src={exp.thumbnail}
                alt={exp.title}
                className="aspect-video w-full object-cover transition duration-300 group-hover:scale-[1.015] group-hover:brightness-105"
              />
              <div className="absolute bottom-3 right-3 rounded-md bg-[rgba(15,15,15,0.88)] px-2 py-1 text-xs font-medium tracking-wide text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                {exp.dateLabel}
              </div>
              {exp.featured ? (
                <div className="absolute left-3 top-3">
                  <Badge className="rounded-full border border-white/15 bg-[rgba(0,0,0,0.72)] px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                    {exp.featured}
                  </Badge>
                </div>
              ) : null}
            </div>

            <div className="mt-3 flex items-start gap-3">
              <img
                src={exp.logo ?? exp.thumbnail}
                alt={`${exp.company} logo`}
                className="mt-0.5 h-10 w-10 flex-shrink-0 rounded-full border border-[var(--border)] object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="line-clamp-2 text-[1.08rem] font-semibold leading-6 text-[var(--text-primary)] transition-colors group-hover:opacity-90">
                    {exp.title}
                  </h3>
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition group-hover:bg-[var(--surface-hover)] group-hover:text-[var(--text-primary)]">
                    <MoreVertical className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                  <span className="truncate">{exp.company}</span>
                  {exp.verified ? (
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 fill-current text-[var(--text-secondary)]" />
                  ) : null}
                </div>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {exp.metaLine}
                </p>

                <p className="mt-1 line-clamp-2 text-sm leading-5 text-[var(--text-secondary)]">
                  {exp.summary}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {activeExperience ? (
        <div
          className="animate-experienceOverlayIn fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-md"
          onClick={() => setActiveExperience(null)}
        >
          <div
            className="animate-experiencePanelIn w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative">
              <img
                src={activeExperience.thumbnail}
                alt={activeExperience.title}
                className="h-[240px] w-full object-cover sm:h-[320px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <button
                type="button"
                onClick={() => setActiveExperience(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75"
                aria-label="Close experience details"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-black/65 px-3 py-1 text-xs text-white">
                  {activeExperience.dateLabel}
                </Badge>
                {activeExperience.featured ? (
                  <Badge className="rounded-full bg-[var(--accent-red)] px-3 py-1 text-xs text-white">
                    {activeExperience.featured}
                  </Badge>
                ) : null}
                {activeExperience.location ? (
                  <Badge className="rounded-full bg-black/65 px-3 py-1 text-xs text-white">
                    <MapPin className="mr-1 h-3.5 w-3.5" />
                    {activeExperience.location}
                  </Badge>
                ) : null}
              </div>
            </div>

            <div className="animate-experienceContentIn max-h-[calc(88vh-200px)] sm:max-h-[calc(90vh-240px)] overflow-y-auto px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              <div className="flex items-start gap-4">
                <img
                  src={activeExperience.logo ?? activeExperience.thumbnail}
                  alt={`${activeExperience.company} logo`}
                  className="h-14 w-14 flex-shrink-0 rounded-full border border-[var(--border)] object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="truncate font-medium text-[var(--text-primary)]">
                      {activeExperience.company}
                    </span>
                    {activeExperience.verified ? (
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 fill-current text-[var(--text-secondary)]" />
                    ) : null}
                  </div>

                  <h3 className="mt-1 text-2xl font-semibold leading-tight text-[var(--text-primary)] sm:text-[2rem]">
                    {activeExperience.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {activeExperience.metaLine}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-5">
                <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="inline-flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4 text-[var(--accent-red)]" />
                    Work Experience
                  </span>
                  <span>{activeExperience.dateLabel}</span>
                  {activeExperience.location ? <span>{activeExperience.location}</span> : null}
                </div>

                <p className="mt-4 text-[15px] leading-7 text-[var(--text-primary)]">
                  {activeExperience.description ?? activeExperience.summary}
                </p>

                {activeExperience.details?.length ? (
                  <div className="mt-5">
                    <h4 className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                      Key Highlights
                    </h4>
                    <ul className="mt-3 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
                      {activeExperience.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent-red)]" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {activeExperience.techStack?.length ? (
                  <div className="mt-5">
                    <h4 className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                      Tech Stack
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeExperience.techStack.map((item) => (
                        <Badge
                          key={item}
                          className="rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-1 text-xs font-medium text-[var(--text-primary)]"
                        >
                          {item}
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
