import React, { useEffect, useState } from "react";
import { Badge } from "components/ui/badge";
import { BookOpen, CheckCircle2, GraduationCap, MapPin, MoreVertical, X } from "lucide-react";

export default function EducationTab() {
  const [activeEducation, setActiveEducation] = useState(null);

  const education = [
    {
      title: "Master of Science in Computer Science",
      institution: "University of Southern California",
      dateLabel: "Jan 2025 - Dec 2026",
      location: "Los Angeles, CA",
      thumbnail: "/images/usc.png",
      logo: "/images/usc.png",
      metaLine: "Advanced Algorithms • Web Technologies • Game Development • USC Viterbi",
      summary:
        "Pursuing a master's degree in computer science at USC with a focus on advanced systems, modern web technologies, and interactive computing.",
      description:
        "Currently pursuing a Master of Science in Computer Science at the USC Viterbi School of Engineering, with coursework centered on advanced algorithms, web technologies, and game development to deepen both systems thinking and product-building skills.",
      details: [
        "Focused on advanced algorithms, modern web technologies, and interactive systems through graduate-level coursework.",
        "Strengthening depth across software engineering, system design, and product-oriented technical problem-solving.",
        "Building on prior industry and academic experience while expanding specialization in modern computing domains."
      ],
      coursework: ["Advanced Algorithms", "Web Technologies", "Game Development", "Software Engineering"],
      featured: "Current",
    },
    {
      title: "Bachelor of Technology in Computer Engineering",
      institution: "Guru Gobind Singh Indraprastha University",
      dateLabel: "2020 - 2024",
      location: "Delhi, India",
      thumbnail: "/images/ggsipu.png",
      logo: "/images/ggsipu.png",
      metaLine: "Data Structures • AI • Full-Stack Development • GGSIPU",
      summary:
        "Completed a computer engineering degree with strong foundations in data structures, AI, and full-stack development, graduating with distinction.",
      description:
        "Completed a Bachelor of Technology in Computer Engineering at GGSIPU, developing strong foundations in computer science, software development, and applied problem-solving through coursework spanning AI, data structures, and full-stack engineering.",
      details: [
        "Built a strong foundation in core computer science concepts, including data structures, algorithms, and software development.",
        "Studied AI and full-stack development alongside practical engineering coursework that supported project-based learning.",
        "Graduated with distinction while preparing for advanced academic work and software engineering roles."
      ],
      coursework: ["Data Structures", "Artificial Intelligence", "Full-Stack Development", "Computer Engineering"],
      featured: "Graduated",
    },
  ];

  useEffect(() => {
    if (!activeEducation) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveEducation(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeEducation]);

  return (
    <>
      <section
        id="education"
        className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 scroll-mt-24"
      >
        {education.map((item) => (
          <article
            key={`${item.institution}-${item.title}`}
            role="button"
            tabIndex={0}
            onClick={() => setActiveEducation(item)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveEducation(item);
              }
            }}
            className="group cursor-pointer outline-none"
            aria-label={`Open details for ${item.title}`}
          >
            <div className="relative overflow-hidden rounded-2xl bg-[var(--surface)]">
              <div className="flex aspect-video items-center justify-center bg-[var(--surface-muted)] p-6">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.015]"
                />
              </div>
              <div className="absolute bottom-3 right-3 rounded-md bg-[rgba(15,15,15,0.88)] px-2 py-1 text-xs font-medium tracking-wide text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                {item.dateLabel}
              </div>
              {item.featured ? (
                <div className="absolute left-3 top-3">
                  <Badge className="rounded-full border border-white/10 bg-[rgba(0,0,0,0.72)] px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                    {item.featured}
                  </Badge>
                </div>
              ) : null}
            </div>

            <div className="mt-3 flex items-start gap-3">
              <img
                src={item.logo ?? item.thumbnail}
                alt={`${item.institution} logo`}
                className="mt-0.5 h-10 w-10 flex-shrink-0 rounded-full border border-[var(--border)] bg-white object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="line-clamp-2 text-[1.08rem] font-semibold leading-6 text-[var(--text-primary)] transition-colors group-hover:opacity-90">
                    {item.title}
                  </h3>
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition group-hover:bg-[var(--surface-hover)] group-hover:text-[var(--text-primary)]">
                    <MoreVertical className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                  <span className="truncate">{item.institution}</span>
                  {item.verified ? (
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 fill-current text-[var(--text-secondary)]" />
                  ) : null}
                </div>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {item.metaLine}
                </p>

                <p className="mt-1 line-clamp-2 text-sm leading-5 text-[var(--text-secondary)]">
                  {item.summary}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {activeEducation ? (
        <div
          className="animate-experienceOverlayIn fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-md"
          onClick={() => setActiveEducation(null)}
        >
          <div
            className="animate-experiencePanelIn w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative">
              <div className="flex h-[240px] items-center justify-center bg-[var(--surface-muted)] p-8 sm:h-[320px]">
                <img
                  src={activeEducation.thumbnail}
                  alt={activeEducation.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

              <button
                type="button"
                onClick={() => setActiveEducation(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75"
                aria-label="Close education details"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-3">
                <Badge className="rounded-full bg-black/65 px-3 py-1 text-xs text-white">
                  {activeEducation.dateLabel}
                </Badge>
                {activeEducation.featured ? (
                  <Badge className="rounded-full bg-[var(--accent-red)] px-3 py-1 text-xs text-white">
                    {activeEducation.featured}
                  </Badge>
                ) : null}
                {activeEducation.location ? (
                  <Badge className="rounded-full bg-black/65 px-3 py-1 text-xs text-white">
                    <MapPin className="mr-1 h-3.5 w-3.5" />
                    {activeEducation.location}
                  </Badge>
                ) : null}
              </div>
            </div>

            <div className="animate-experienceContentIn max-h-[calc(88vh-200px)] sm:max-h-[calc(90vh-240px)] overflow-y-auto px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
              <div className="flex items-start gap-4">
                <img
                  src={activeEducation.logo ?? activeEducation.thumbnail}
                  alt={`${activeEducation.institution} logo`}
                  className="h-14 w-14 flex-shrink-0 rounded-full border border-[var(--border)] bg-white object-cover"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="truncate font-medium text-[var(--text-primary)]">
                      {activeEducation.institution}
                    </span>
                    {activeEducation.verified ? (
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 fill-current text-[var(--text-secondary)]" />
                    ) : null}
                  </div>

                  <h3 className="mt-1 text-2xl font-semibold leading-tight text-[var(--text-primary)] sm:text-[2rem]">
                    {activeEducation.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {activeEducation.metaLine}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-5">
                <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="inline-flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[var(--accent-red)]" />
                    Education
                  </span>
                  <span>{activeEducation.dateLabel}</span>
                  {activeEducation.location ? <span>{activeEducation.location}</span> : null}
                </div>

                <p className="mt-4 text-[15px] leading-7 text-[var(--text-primary)]">
                  {activeEducation.description ?? activeEducation.summary}
                </p>

                {activeEducation.details?.length ? (
                  <div className="mt-5">
                    <h4 className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                      Academic Highlights
                    </h4>
                    <ul className="mt-3 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
                      {activeEducation.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent-red)]" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {activeEducation.coursework?.length ? (
                  <div className="mt-5">
                    <h4 className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                      Core Coursework
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeEducation.coursework.map((item) => (
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

                <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-secondary)]">
                  <div className="inline-flex items-center gap-2 text-[var(--text-primary)]">
                    <BookOpen className="h-4 w-4 text-[var(--accent-red)]" />
                    Academic Focus
                  </div>
                  <p className="mt-2 leading-6">
                    {activeEducation.summary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
