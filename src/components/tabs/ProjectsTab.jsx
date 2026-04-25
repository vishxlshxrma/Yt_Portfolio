import React from "react";
import { HomeTab } from "components/tabs"; // you already use HomeTab for grid cards
import projects from "./projects.data";

export default function ProjectsTab({ openProjectRequest = null }) {
  return (
    <section id="projects" className="mt-6 scroll-mt-24">
      <HomeTab projects={projects} openProjectRequest={openProjectRequest} />
    </section>
  );
}
