import React from "react";
import {
  Home,
  Zap,
  PlaySquare,
  History,
  List,
  Video,
  GraduationCap,
} from "lucide-react";

export default function Sidebar({ open, subscriptions = [], activeId, onGoto }) {
  // Main section
  const items = [
    { id: "experience", label: "Work Experience", Icon: Home },
    { id: "skills", label: "Skills", Icon: Zap },
    { id: "projects", label: "Projects", Icon: PlaySquare },
    { id: "education", label: "Education", Icon: GraduationCap },
  ];

  // "You" section — each maps to an existing top section
  const youItems = [
    { id: "experience", label: "History", Icon: History }, // takes to Work Experience
    { id: "projects", label: "Projects", Icon: List }, // takes to Projects
    { id: "projects", label: "Your work", Icon: Video }, // also Projects
    { id: "education", label: "Your education", Icon: GraduationCap }, // takes to Education
  ];

  return (
    <aside
      className={`${open ? "w-60" : "w-0"} transition-all duration-300 overflow-hidden bg-[#0f0f0f] border-r border-gray-800 min-h-screen`}
    >
      <div className="p-3">
        {/* Top nav items */}
        <div className="space-y-1 mb-6">
          {items.map(({ id, label, Icon }) => {
            const active = activeId === id;
            return (
              <button
                key={id}
                onClick={() => onGoto?.(id)}
                className={`flex items-center space-x-6 px-3 py-2 rounded-lg w-full text-left ${
                  active ? "bg-[#272727] text-white" : "hover:bg-[#272727]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
                {active && <span className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />}
              </button>
            );
          })}
        </div>

        {/* You Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 px-3 py-2 text-white">
            <span className="text-sm font-medium">You</span>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="space-y-1">
            {youItems.map(({ id, label, Icon }) => (
              <button
                key={label}
                onClick={() => onGoto?.(id)}
                className="flex items-center space-x-6 px-3 py-2 rounded-lg hover:bg-[#272727] w-full text-left"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 my-4" />

        {/* Core Skills */}
        <div>
          <div className="px-3 py-2">
            <h3 className="text-sm font-medium text-white">Core Skills</h3>
          </div>
          <div className="space-y-1">
            {subscriptions.map((s, i) => (
              <div
                key={i}
                className="flex items-center space-x-6 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer"
              >
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {s.avatar}
                </div>
                <span className="text-sm flex-1">{s.name}</span>
                {s.isLive && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-0.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
