import React from "react";
import { Eye } from "lucide-react";
import { Badge } from "components/ui/badge";

export default function EducationTab() {
  const education = [
    {
      title: "Master of Science in Computer Science",
      institution: "University of Southern California (USC)",
      duration: "2024 – 2026",
      thumbnail: "/images/usc.png", // ✅ add this image in /public/images/
      description:
        "Focusing on Advanced Algorithms, Web Technologies, and Game Development under the Viterbi School of Engineering.",
      tags: ["Algorithms", "Web Tech","AI"],
    },
    {
      title: "Bachelor of Technology in Computer Engineering",
      institution: "Guru Gobind Singh Indraprastha Universtiy (GGSIPU)",
      duration: "2020 – 2024",
      thumbnail: "/images/ggsipu.png", // ✅ add this image in /public/images/
      description:
        "Completed core coursework in Data Structures, AI, and Full-Stack Web Development. Graduated with distinction.",
      tags: ["AI", "Full-Stack"],
    },
  ];

  return (
    <section
      id="education"
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 scroll-mt-24"
    >
      {education.map((e, i) => (
        <div
          key={i}
          className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:bg-[#222222] transition-colors cursor-pointer"
        >
          <div className="relative">
            <img
              src={e.thumbnail}
              alt={e.title}
              className="w-full h-40 object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-xs px-2 py-1 rounded">
              {e.duration}
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold mb-2 line-clamp-2">{e.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{e.institution}</p>
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">
              {e.description}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center space-x-1">
              </div>
              <div className="flex space-x-1">
                {(e.tags ?? []).map((tag, t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="bg-[#333333] text-gray-300 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
