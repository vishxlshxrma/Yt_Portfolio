import React from "react";

export default function SkillsTab() {
  const skills = ["Full Stack", "Python", "Node.js", "C#", "Typescript", "MySQL", "Swift UI", "Git", "AWS", "Jira", "Docker", "XCode"];
  return (
    <section id="skills" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 scroll-mt-24">
      {skills.map((skill, i) => (
        <div key={i} className="bg-[#1a1a1a] rounded-lg p-6 hover:bg-[#222222] transition-colors">
          <h3 className="font-semibold mb-2">{skill}</h3>
          <p className="text-sm text-gray-400">Expert Level</p>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
            <div className="bg-[#FF0000] h-2 rounded-full" style={{ width: `${Math.min(95, 88 + i * 2)}%` }} />
          </div>
        </div>
      ))}
    </section>
  );
}