import React, { useState } from "react";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import HeroSection from "components/HeroSection";
import VideoInfo from "components/VideoInfo";
import Footer from "components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { HomeTab, SkillsTab, ExperienceTab, EducationTab } from "components/tabs";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const workExperience = [
    {
      title: "Senior Product Designer @ Meta",
      company: "Meta",
      duration: "2:2022–Present",
      views: "15K",
      thumbnail:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
      description:
        "Leading design for Instagram Shopping, increasing conversion by 45% • Shipped 3 major product features to 2B+ users • Led cross-functional team of 12 engineers and PMs",
      tags: ["UI/UX", "Product Strategy", "Team Leadership"],
    },
    {
      title: "Lead Designer @ Spotify",
      company: "Spotify",
      duration: "1:2020–2:2022",
      views: "12K",
      thumbnail:
        "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300&h=200&fit=crop",
      description:
        "Redesigned playlist creation flow, boosting user engagement by 30% • Established design system used by 50+ designers • Mentored 4 junior designers to senior level",
      tags: ["Design Systems", "Mobile Design", "Mentorship"],
    },
    {
      title: "Product Designer @ Airbnb",
      company: "Airbnb",
      duration: "2:2018–1:2020",
      views: "8K",
      thumbnail:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
      description:
        "Designed host onboarding experience, reducing time-to-first-booking by 25% • Created responsive booking flow for 10M+ properties • Collaborated with international teams across 5 countries",
      tags: ["UX Research", "International Design", "Growth"],
    },
    {
      title: "UI Designer @ Uber",
      company: "Uber",
      duration: "1:2016–2:2018",
      views: "6K",
      thumbnail:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
      description:
        "Designed driver app interface used by 5M+ drivers globally • Improved app rating from 3.2 to 4.6 stars • Reduced support tickets by 40% through better UX",
      tags: ["Mobile Apps", "Driver Experience", "Global Scale"],
    },
  ];

  const subscriptions = [
    { name: "Figma", avatar: "F", isLive: true },
    { name: "Adobe Creative", avatar: "A", isLive: true },
    { name: "Product Hunt", avatar: "P", isLive: false },
    { name: "Design Systems", avatar: "D", isLive: true },
    { name: "UX Research", avatar: "U", isLive: false },
    { name: "Leadership", avatar: "L", isLive: true },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        <Sidebar open={sidebarOpen} subscriptions={subscriptions} />
        <main className="flex-1">
          <HeroSection />
          <VideoInfo />
          <div className="px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="bg-transparent border-b border-gray-800 rounded-none h-auto p-0 w-full justify-start">
                <TabsTrigger value="home" className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#FF0000] data-[state=active]:text-white rounded-none px-6 py-3 text-gray-400">Home</TabsTrigger>
                <TabsTrigger value="skills" className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#FF0000] data-[state=active]:text-white rounded-none px-6 py-3 text-gray-400">Skills</TabsTrigger>
                <TabsTrigger value="experience" className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#FF0000] data-[state=active]:text-white rounded-none px-6 py-3 text-gray-400">Work Exp</TabsTrigger>
                <TabsTrigger value="education" className="bg-transparent border-b-2 border-transparent data-[state=active]:border-[#FF0000] data-[state=active]:text-white rounded-none px-6 py-3 text-gray-400">Education</TabsTrigger>
              </TabsList>

              <TabsContent value="home" className="mt-6">
                <HomeTab workExperience={workExperience} />
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <SkillsTab />
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <ExperienceTab workExperience={workExperience} />
              </TabsContent>

              <TabsContent value="education" className="mt-6">
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
