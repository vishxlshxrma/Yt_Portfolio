import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import HeroSection from "components/HeroSection";
import VideoInfo from "components/VideoInfo";
import Footer from "components/Footer";
import SearchResults from "components/SearchResults";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { SkillsTab, ExperienceTab, EducationTab } from "components/tabs";
import ProjectsTab from "components/tabs/ProjectsTab";
import projectsData from "components/tabs/projects.data";
import workExperienceData from "components/tabs/experience.data";
import {
  domains,
  skills,
  subclusters,
  projects as skillsProjects,
} from "components/tabs/skillsData";
import useTheme from "hooks/useTheme";
import {
  buildSearchSuggestions,
  dedupeBy,
  getSearchMatchScore,
  matchesSearchQuery,
  normalizeSearchText,
} from "lib/searchUtils";

const skillProjectToPortfolioTitle = {
  "apple-iphone-website-clone": "Apple Website Clone",
  "artsy-android-app": "Artsy Platform – Android App",
  "artsy-website": "Artsy Platform – Web App",
  "chatbot-template": "Chatbot Template (NLP)",
  codebundle: "CodeBundle",
  "invoice-generator": "Invoice Generator Platform",
  "malaria-classification": "Malaria Detection using Deep Learning",
  "morph-runner": "Morph Runner",
  "music-store-analysis": "Music Store Analytics",
  "sales-analysis": "Sales Analysis Dashboard",
  sightranger: "SightRanger",
  "taxi-demand-prediction": "Taxi Demand Prediction",
  transizr: "Transizr",
};

const openInBackground = (path) => {
  const absoluteUrl = path.startsWith("http")
    ? path
    : `${window.location.origin}${path}`;
  const newTab = window.open(absoluteUrl, "_blank", "noopener,noreferrer");
  if (newTab) {
    newTab.blur();
    window.focus();
  }
};

const emptySearchResults = {
  projects: [],
  experience: [],
  skills: [],
  domains: [],
};

export default function Portfolio() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("experience");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projectToOpen, setProjectToOpen] = useState(null);
  const [projectTransition, setProjectTransition] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedSearchQuery, setSubmittedSearchQuery] = useState("");
  const [contactRequestToken, setContactRequestToken] = useState(0);
  const [skillsSearchFocus, setSkillsSearchFocus] = useState(null);
  const firstRender = useRef(true);
  const scrollFromSidebar = useRef(false);

  const skillsById = useMemo(
    () => new Map(skills.map((skill) => [skill.id, skill])),
    []
  );
  const domainsById = useMemo(
    () => new Map(domains.map((domain) => [domain.id, domain])),
    []
  );
  const skillsProjectsById = useMemo(
    () => new Map(skillsProjects.map((project) => [project.id, project])),
    []
  );
  const skillsProjectsByName = useMemo(
    () =>
      new Map(
        skillsProjects.map((project) => [normalizeSearchText(project.name), project])
      ),
    []
  );
  const subclustersByDomainId = useMemo(() => {
    const map = new Map();
    subclusters.forEach((cluster) => {
      const list = map.get(cluster.domainId) ?? [];
      list.push(cluster);
      map.set(cluster.domainId, list);
    });
    return map;
  }, []);

  const enrichedProjects = useMemo(() => {
    return projectsData.map((project) => {
      const titleKey = normalizeSearchText(project.title);
      const directMappedProjectId = Object.entries(skillProjectToPortfolioTitle).find(
        ([, title]) => normalizeSearchText(title) === titleKey
      )?.[0];

      let skillProject = directMappedProjectId
        ? skillsProjectsById.get(directMappedProjectId)
        : skillsProjectsByName.get(titleKey);

      if (!skillProject && titleKey.includes("chatbot template")) {
        skillProject = skillsProjectsByName.get("chatbot template");
      }

      const skillIds = skillProject?.skillIds ?? [];
      const domainIdsFromSkills = skillIds.flatMap(
        (skillId) => skillsById.get(skillId)?.domainIds ?? []
      );
      const domainIds = dedupeBy(
        [...(skillProject?.domainIds ?? []), ...domainIdsFromSkills],
        (id) => id
      );

      return {
        ...project,
        skillIds,
        domainIds,
      };
    });
  }, [skillsById, skillsProjectsById, skillsProjectsByName]);

  const enrichedExperience = useMemo(
    () =>
      workExperienceData.map((experience) => ({
        ...experience,
        skillIds: experience.skillIds ?? [],
        domainIds: experience.domainIds ?? [],
      })),
    []
  );

  const searchSuggestions = useMemo(
    () => buildSearchSuggestions(searchQuery, { skills, domains }),
    [searchQuery]
  );

  const searchResults = useMemo(() => {
    if (!submittedSearchQuery.trim()) return emptySearchResults;

    const query = submittedSearchQuery;
    const scoreAndFilter = (items, searchFields) =>
      items
        .map((item) => {
          const values = searchFields(item);
          const score = getSearchMatchScore(values, query);
          const matches = score > 0 || matchesSearchQuery(values, query);
          return { item, score, matches };
        })
        .filter((entry) => entry.matches)
        .sort((a, b) => b.score - a.score)
        .map((entry) => entry.item);

    const matchedProjects = scoreAndFilter(enrichedProjects, (project) => {
      const skillNames = (project.skillIds ?? []).map((skillId) => skillsById.get(skillId)?.name);
      const domainNames = (project.domainIds ?? []).map((domainId) => domainsById.get(domainId)?.name);
      return [
        project.title,
        project.company,
        project.description,
        project.tags,
        project.skillIds,
        project.domainIds,
        skillNames,
        domainNames,
      ];
    });

    const matchedExperience = scoreAndFilter(enrichedExperience, (experience) => {
      const skillNames = (experience.skillIds ?? []).map((skillId) => skillsById.get(skillId)?.name);
      const domainNames = (experience.domainIds ?? []).map((domainId) => domainsById.get(domainId)?.name);
      return [
        experience.title,
        experience.company,
        experience.summary,
        experience.description,
        experience.details,
        experience.techStack,
        experience.dateLabel,
        experience.location,
        experience.metaLine,
        experience.skillIds,
        experience.domainIds,
        skillNames,
        domainNames,
      ];
    });

    const directSkillMatches = scoreAndFilter(skills, (skill) => [
      skill.name,
      skill.description,
      skill.type,
      skill.importance,
      skill.domainIds,
      skill.domainIds.map((domainId) => domainsById.get(domainId)?.name),
      skill.domainIds.map((domainId) => domainsById.get(domainId)?.shortName),
    ]);

    const relatedSkillIds = new Set([
      ...directSkillMatches.map((skill) => skill.id),
      ...matchedProjects.flatMap((project) => project.skillIds ?? []),
      ...matchedExperience.flatMap((experience) => experience.skillIds ?? []),
    ]);

    const relatedSkills = dedupeBy(
      Array.from(relatedSkillIds)
        .map((skillId) => skillsById.get(skillId))
        .filter(Boolean),
      (skill) => skill.id
    );

    const directDomainMatches = scoreAndFilter(domains, (domain) => {
      const domainSubclusters = subclustersByDomainId.get(domain.id) ?? [];
      return [
        domain.name,
        domain.shortName,
        domain.description,
        domain.whyItMatters,
        domainSubclusters.map((cluster) => cluster.name),
        domainSubclusters.map((cluster) => cluster.description),
      ];
    });

    const relatedDomainIds = new Set([
      ...directDomainMatches.map((domain) => domain.id),
      ...relatedSkills.flatMap((skill) => skill.domainIds ?? []),
      ...matchedProjects.flatMap((project) => project.domainIds ?? []),
      ...matchedExperience.flatMap((experience) => experience.domainIds ?? []),
    ]);

    const relatedDomains = dedupeBy(
      Array.from(relatedDomainIds)
        .map((domainId) => domainsById.get(domainId))
        .filter(Boolean),
      (domain) => domain.id
    );

    return {
      projects: matchedProjects.slice(0, 9),
      experience: matchedExperience.slice(0, 9),
      skills: relatedSkills.slice(0, 8),
      domains: relatedDomains.slice(0, 6),
    };
  }, [
    submittedSearchQuery,
    enrichedProjects,
    enrichedExperience,
    skillsById,
    domainsById,
    subclustersByDomainId,
  ]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    requestAnimationFrame(() => {
      if (scrollFromSidebar.current) {
        const el = document.getElementById(activeTab);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        scrollFromSidebar.current = false;
      }
    });
  }, [activeTab]);

  const routeToProjectByTitle = (projectTitle) => {
    if (!projectTitle) return;
    setProjectTransition(projectTitle);

    window.setTimeout(() => {
      scrollFromSidebar.current = true;
      setActiveTab("projects");
    }, 240);

    window.setTimeout(() => {
      setProjectToOpen({
        title: projectTitle,
        token: Date.now(),
      });
    }, 620);

    window.setTimeout(() => {
      setProjectTransition(null);
    }, 760);
  };

  const handleGoto = (id) => {
    scrollFromSidebar.current = true;
    setProjectToOpen(null);
    setProjectTransition(null);
    setActiveTab(id);
  };

  const handleOpenProjectFromSkills = (projectId) => {
    const projectTitle = skillProjectToPortfolioTitle[projectId];
    if (!projectTitle) return;
    routeToProjectByTitle(projectTitle);
  };

  const handleViewInSkillCosmos = ({ skillId, domainId }) => {
    setSkillsSearchFocus({
      skillId,
      domainId,
      token: Date.now(),
    });

    if (activeTab === "skills") {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    scrollFromSidebar.current = true;
    setActiveTab("skills");
  };

  const handleSearchSubmit = (rawQuery) => {
    const query = String(rawQuery ?? "").trim();
    if (!query) return;

    const normalized = normalizeSearchText(query);

    if (normalized === "resume" || normalized === "cv") {
      openInBackground("/Vishal_Kumar_Resume.pdf");
      return;
    }
    if (normalized === "linkedin") {
      openInBackground("https://www.linkedin.com/in/vishal-kumar-130a90249/");
      return;
    }
    if (normalized === "projects") {
      handleGoto("projects");
      return;
    }
    if (normalized === "skills") {
      handleGoto("skills");
      return;
    }
    if (normalized === "experience") {
      handleGoto("experience");
      return;
    }
    if (normalized === "education") {
      handleGoto("education");
      return;
    }
    if (normalized.includes("contact") || normalized.includes("hire me")) {
      setContactRequestToken(Date.now());
      return;
    }

    setSubmittedSearchQuery(query);

    if (activeTab === "search") {
      requestAnimationFrame(() => {
        document.getElementById("search")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    scrollFromSidebar.current = true;
    setActiveTab("search");
  };

  const subscriptions = [
    { name: "Web Development", avatar: "W", isLive: true },
    { name: "AI Automation", avatar: "A", isLive: true },
    { name: "Machine Learning", avatar: "M", isLive: false },
    { name: "Game Development", avatar: "G", isLive: true },
    { name: "App Development", avatar: "A", isLive: true },
    { name: "Data Science", avatar: "D", isLive: false },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-300">
      {projectTransition ? (
        <div className="pointer-events-none fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--overlay-backdrop)] backdrop-blur-md transition-all duration-500">
          <div className="animate-experiencePanelIn rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] px-6 py-5 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--text-secondary)]">
              Opening Project
            </p>
            <p className="mt-3 text-lg font-semibold text-[var(--text-primary)]">
              {projectTransition}
            </p>
            <div className="mt-4 h-1.5 w-48 overflow-hidden rounded-full bg-[var(--surface-muted)]">
              <div className="h-full w-full origin-left animate-[projectRouteLoad_0.7s_ease-in-out_forwards] rounded-full bg-[var(--accent-red)]" />
            </div>
          </div>
        </div>
      ) : null}

      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSearchSubmit={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchSuggestions={searchSuggestions}
        contactRequestToken={contactRequestToken}
      />
      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          subscriptions={subscriptions}
          activeId={activeTab}
          onGoto={handleGoto}
        />

        <main className="flex-1">
          <HeroSection />
          <VideoInfo />

          <div className="px-6">
            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                scrollFromSidebar.current = true;
                setActiveTab(value);
              }}
              className="mb-6"
            >
              <TabsList className="h-auto w-full justify-start rounded-none border-b border-[var(--border)] bg-transparent p-0">
                <TabsTrigger
                  value="experience"
                  className="rounded-none border-b-2 border-transparent bg-transparent px-6 py-3 text-[var(--text-secondary)] data-[state=active]:border-[var(--accent-red)] data-[state=active]:text-[var(--text-primary)]"
                >
                  Work Experience
                </TabsTrigger>

                <TabsTrigger
                  value="skills"
                  className="rounded-none border-b-2 border-transparent bg-transparent px-6 py-3 text-[var(--text-secondary)] data-[state=active]:border-[var(--accent-red)] data-[state=active]:text-[var(--text-primary)]"
                >
                  Skills
                </TabsTrigger>

                <TabsTrigger
                  value="projects"
                  className="rounded-none border-b-2 border-transparent bg-transparent px-6 py-3 text-[var(--text-secondary)] data-[state=active]:border-[var(--accent-red)] data-[state=active]:text-[var(--text-primary)]"
                >
                  Projects
                </TabsTrigger>

                <TabsTrigger
                  value="education"
                  className="rounded-none border-b-2 border-transparent bg-transparent px-6 py-3 text-[var(--text-secondary)] data-[state=active]:border-[var(--accent-red)] data-[state=active]:text-[var(--text-primary)]"
                >
                  Education
                </TabsTrigger>

                {submittedSearchQuery ? (
                  <TabsTrigger
                    value="search"
                    className="rounded-none border-b-2 border-transparent bg-transparent px-6 py-3 text-[var(--text-secondary)] data-[state=active]:border-[var(--accent-red)] data-[state=active]:text-[var(--text-primary)]"
                  >
                    Search Results
                  </TabsTrigger>
                ) : null}
              </TabsList>

              <TabsContent value="experience" id="experience" className="mt-6 scroll-mt-24">
                <ExperienceTab workExperience={enrichedExperience} />
              </TabsContent>

              <TabsContent value="skills" id="skills" className="mt-6 scroll-mt-24">
                <SkillsTab
                  onOpenProject={handleOpenProjectFromSkills}
                  theme={theme}
                  searchFocus={skillsSearchFocus}
                />
              </TabsContent>

              <TabsContent value="projects" id="projects" className="mt-6 scroll-mt-24">
                <ProjectsTab openProjectRequest={projectToOpen} />
              </TabsContent>

              <TabsContent value="education" id="education" className="mt-6 scroll-mt-24">
                <EducationTab />
              </TabsContent>

              <TabsContent value="search" id="search" className="mt-6 scroll-mt-24">
                <SearchResults
                  query={submittedSearchQuery}
                  results={searchResults}
                  onOpenProject={routeToProjectByTitle}
                  onOpenExperience={() => handleGoto("experience")}
                  onViewSkillCosmos={handleViewInSkillCosmos}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
