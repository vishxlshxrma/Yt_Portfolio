import React from "react";
import { Eye } from "lucide-react";
import { Badge } from "components/ui/badge";

export default function HomeTab({ workExperience }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workExperience.map((exp, i) => (
        <div key={i} className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:bg-[#222222] transition-colors cursor-pointer">
          <div className="relative">
            <img src={exp.thumbnail} alt={exp.title} className="w-full h-40 object-cover" />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-xs px-2 py-1 rounded">
              {exp.duration}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2 line-clamp-2">{exp.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{exp.company}</p>
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{exp.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{exp.views} impact</span>
              </div>
              <div className="flex space-x-1">
                {exp.tags.slice(0, 2).map((tag, t) => (
                  <Badge key={t} variant="secondary" className="bg-[#333333] text-gray-300 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
