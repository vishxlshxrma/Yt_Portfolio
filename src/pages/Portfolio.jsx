import React, { useEffect, useRef, useState } from "react";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import HeroSection from "components/HeroSection";
import VideoInfo from "components/VideoInfo";
import Footer from "components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { HomeTab, SkillsTab, ExperienceTab, EducationTab } from "components/tabs";
import ProjectsTab from "components/tabs/ProjectsTab"; // <-- added

export default function Portfolio() {
  // DEFAULT TO EXPERIENCE (since Home is becoming Work Experience)
  const [activeTab, setActiveTab] = useState("experience");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const firstRender = useRef(true); // track initial mount
  const scrollFromSidebar = useRef(false); // scroll only when sidebar triggers the change

  // Smooth scroll on tab change, but:
  // - skip the very first render
  // - (home special-case removed since we no longer use 'home' as a tab)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return; // no scroll on initial load
    }

    requestAnimationFrame(() => {
      // only scroll when navigation came from the sidebar
      if (scrollFromSidebar.current) {
        const el = document.getElementById(activeTab);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        scrollFromSidebar.current = false; // reset
      }
    });
  }, [activeTab]);

  // Sidebar click handler: switch tab (scroll handled by the effect above)
  const handleGoto = (id) => {
    scrollFromSidebar.current = true; // flag that this change came from sidebar
    setActiveTab(id);
  };

  const workExperience = [
    {
      title: "Teaching Assistant",
      company: "Viterbi K-12, USC",
      duration: "6:2025–8:2025",
      views: "10K",
      thumbnail: "/images/viterbi-k12.png",
      description:
        "Teaching Cybersecurity, Python, and Game Development to high school students as part of USC’s outreach program. Design and deliver interactive, hands-on lessons to simplify complex CS concepts and encourage active learning. Help create a fun, inclusive environment that fosters curiosity and foundational tech skills.",
      tags: ["Teaching", "CyberSecurity"],
    },
    {
      title: "Software Developer Intern",
      company: "Punjab National Bank",
      duration: "6:2024-9:2024",
      views: "12K",
      thumbnail: "/images/pnb.png",
      description:
        "In my role as a Software Developer Intern at Punjab National Bank (PNB), a prestigious government-owned financial institution, I was actively engaged in the process of developing and enhancing digital banking solutions. I was responsible for collaborating with senior developers, developing the modern banking interfaces and developing and testing software applications.",
      tags: ["Web Development", "Design Systems"],
    },
    {
      title: "Software Developer Intern",
      company: "Vartulz Technologies Pvt. Ltd.",
      duration: "2:2024–4:2024",
      views: "8K",
      thumbnail: "/images/vartulz.png",
      description:
        "Software Developer Intern at Vartulz Technologies, where I enhanced the website by adding new functionalities, designed analytics frameworks, and integrated user data collection features.",
      tags: ["UX Design", "Data Analytics"],
    },
    {
      title: "Operational Analyst",
      company: "LMDMax",
      duration: "8:2023–1:2024",
      views: "6K",
      thumbnail: "/images/lmdmax.png",
      description:
        "In my previous role as an Operational Analyst intern, I was actively engaged in the process of optimizing operational efficiency and streamlining workflows. I was responsible for collecting and analyzing data, allowing me to identify areas for improvement and provide data-driven insights to support decision-making.",
      tags: ["Data Analytics", "Systems Design"],
    },
  ];

  // NEW: separate data source for the Projects tab (unlinks from workExperience)
  // moved to its own component (ProjectsTab) for clarity and reuse

  const subscriptions = [
    { name: "Web Development", avatar: "W", isLive: true },
    { name: "AI Automation", avatar: "A", isLive: true },
    { name: "Machine Learning", avatar: "M", isLive: false },
    { name: "Game Development", avatar: "G", isLive: true },
    { name: "App Development", avatar: "A", isLive: true },
    { name: "Data Science", avatar: "D", isLive: false },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        {/* Pass active tab + goto handler so the blue dot tracks the visible section */}
        <Sidebar
          open={sidebarOpen}
          subscriptions={subscriptions}
          activeId={activeTab}
          onGoto={handleGoto}
        />

        <main className="flex-1">
          <HeroSection />
          <VideoInfo />

          {/* Tabs area */}
          <div className="px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="bg-transparent border-b border-gray-800 rounded-none h-auto p-0 w-full justify-start">
                {/* Home -> Work Experience (id/value: 'experience') */}
                <TabsTrigger
                  value="experience"
                  className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#FF0000] data-[state=active]:text-white rounded-none px-6 py-3 text-gray-400"
                >
                  Work Experience
                </TabsTrigger>

                <TabsTrigger
                  value="skills"
                  className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#FF0000] data-[state=active]:text-white rounded-none px-6 py-3 text-gray-400"
                >
                  Skills
                </TabsTrigger>

                {/* Work Exp -> Projects (id/value: 'projects') */}
                <TabsTrigger
                  value="projects"
                  className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#FF0000] data-[state=active]:text-white rounded-none px-6 py-3 text-gray-400"
                >
                  Projects
                </TabsTrigger>

                <TabsTrigger
                  value="education"
                  className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#FF0000] data-[state=active]:text-white rounded-none px-6 py-3 text-gray-400"
                >
                  Education
                </TabsTrigger>
              </TabsList>

              {/* Targets for scrolling; scroll offset handled by sticky header */}
              {/* First tab now renders Experience content */}
              <TabsContent value="experience" id="experience" className="mt-6 scroll-mt-24">
                {/* tile/placard layout using HomeTab with experience data */}
                <HomeTab projects={workExperience} />
              </TabsContent>

              <TabsContent value="skills" id="skills" className="mt-6 scroll-mt-24">
                <SkillsTab />
              </TabsContent>

              {/* Projects tab uses the grid cards (previous HomeTab) */}
              <TabsContent value="projects" id="projects" className="mt-6 scroll-mt-24">
                <ProjectsTab />
              </TabsContent>

              <TabsContent value="education" id="education" className="mt-6 scroll-mt-24">
                <EducationTab />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
