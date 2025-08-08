import React from "react";
import { Badge } from "components/ui/badge";

export default function ExperienceTab({ workExperience }) {
  return (
    <div className="space-y-6">
      {workExperience.map((exp, i) => (
        <div key={i} className="flex space-x-4 p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#222222] transition-colors">
          <img src={exp.thumbnail} alt={exp.title} className="w-32 h-20 object-cover rounded flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{exp.title}</h3>
            <p className="text-sm text-gray-400 mb-2">
              {exp.company} • {exp.duration}
            </p>
            <p className="text-sm text-gray-300 mb-3">{exp.description}</p>
            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag, t) => (
                <Badge key={t} variant="secondary" className="bg-[#333333] text-gray-300 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
