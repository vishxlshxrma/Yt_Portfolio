import React, { useEffect, useRef, useState } from "react";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import HeroSection from "components/HeroSection";
import VideoInfo from "components/VideoInfo";
import Footer from "components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { SkillsTab, ExperienceTab, EducationTab } from "components/tabs";
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
      company: "USC Viterbi",
      dateLabel: "Jun 2025 - Aug 2025",
      thumbnail: "/images/viterbi-k12.png",
      logo: "/images/usc.png",
      location: "Los Angeles, CA",
      metaLine: "Teaching • Cybersecurity • Python • Los Angeles, CA",
      summary:
        "Taught cybersecurity, Python, and game development to 50+ high school students through USC’s K-12 outreach, designing hands-on modules that improved completion rates by 25%.",
      description:
        "Delivered high-impact instruction in cybersecurity, Python, and game development through USC Viterbi's K-12 outreach, helping students build confidence with programming fundamentals through guided labs, hands-on projects, and structured classroom support.",
      details: [
        "Delivered 40+ hours of weekly instruction across cybersecurity, Python, and game development for 100+ high school students.",
        "Designed structured learning modules and project-based exercises that improved student task completion by 25%.",
        "Guided students during labs and office hours, helping debug code and reinforce core CS concepts."
      ],
      techStack: ["Python", "Cybersecurity", "Game Development", "Teaching", "Curriculum Design"],
      featured: "Most Recent",
    },
    {
      title: "Software Developer Intern",
      company: "Punjab National Bank",
      dateLabel: "Jun 2024 - Sep 2024",
      thumbnail: "/images/pnb.png",
      logo: "/images/pnb.png",
      location: "New Delhi, India",
      metaLine: "Web Development • APIs • Banking Systems • India",
      summary:
        "Developed and deployed banking workflow systems at Punjab National Bank using Java, JSP, MySQL, Node.js, and Express, reducing processing time by 40% and improving backend response times by 50%.",
      description:
        "Built and deployed a litigation management system and supporting banking workflow automations for Punjab National Bank, improving internal process speed, system responsiveness, and release efficiency across backend and deployment layers.",
      details: [
        "Developed and deployed a Litigation Management System using Java Servlets, JSP, and MySQL to streamline case tracking and document workflows.",
        "Built RESTful APIs with Node.js and Express to automate banking processes, reducing processing time by 40%.",
        "Optimized backend logic and database queries, improving response times by 50% under around 500 concurrent users and reducing errors by 25%.",
        "Deployed on Apache Tomcat and collaborated in Agile sprints, improving release efficiency by 15%."
      ],
      techStack: ["Java Servlets", "JSP", "MySQL", "Node.js", "Express", "Apache Tomcat", "REST APIs"],
    },
    {
      title: "Technical Intern",
      company: "Vartulz Technologies Pvt. Ltd.",
      dateLabel: "Feb 2024 - Apr 2024",
      thumbnail: "/images/vartulz.png",
      logo: "/images/vartulz.png",
      location: "India",
      metaLine: "Product UI • Analytics • Feature Delivery • India",
      summary:
        "During a 3-month internship, improved 3 core product areas across website functionality, analytics, and user-data capture to strengthen visibility and usability.",
      description:
        "Supported product improvements across the website experience by shipping new features, strengthening analytics visibility, and improving user-data capture flows for the team.",
      details: [
        "Delivered improvements across 3 key product areas: website functionality, analytics workflows, and user-data collection.",
        "Designed analytics workflows that improved productivity by 20% and gave the team better visibility into user behavior and feature performance.",
        "Integrated user data capture features that improved measurement coverage and supported more informed product decisions during the internship."
      ],
      techStack: ["JavaScript", "Web Development", "Analytics", "UX Design", "Feature Delivery"],
    },
    {
      title: "Operational Analyst Intern",
      company: "LMDMax",
      dateLabel: "Aug 2023 - Jan 2024",
      thumbnail: "/images/lmdmax.png",
      logo: "/images/lmdmax.png",
      location: "India",
      metaLine: "Operations • Data Analysis • Process Improvement",
      summary:
        "Across a 6-month internship, analyzed operational workflows and built an internal Power BI dashboard that improved work representation and reduced workload effort by 25%.",
      description:
        "Worked on operational analysis and process optimization initiatives, using data to surface workflow bottlenecks and building internal reporting tools to support better planning across day-to-day business operations.",
      details: [
        "Collected and analyzed operational data over a 6-month engagement to identify workflow bottlenecks and process inefficiencies.",
        "Developed a Power BI dashboard for internal staff to present work outlook and operational status more clearly, reducing workload effort by 25%.",
        "Helped teams make faster, better-informed decisions by surfacing improvement opportunities across day-to-day business operations."
      ],
      techStack: ["Power BI", "Data Analysis", "Process Improvement", "Operations", "Reporting", "Systems Thinking"],
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
                <ExperienceTab workExperience={workExperience} />
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
