import React from "react";
import { Home, Zap, PlaySquare, History, List, Video, GraduationCap, Clock, ThumbsUpIcon } from "lucide-react";

export default function Sidebar({ open, subscriptions }) {
  return (
    <aside className={`${open ? "w-60" : "w-0"} transition-all duration-300 overflow-hidden bg-[#0f0f0f] border-r border-gray-800 min-h-screen`}>
      <div className="p-3">
        <div className="space-y-1 mb-6">
          <div className="flex items-center space-x-6 px-3 py-2 rounded-lg bg-[#272727] text-white">
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">Home</span>
          </div>
          <div className="flex items-center space-x-6 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
            <Zap className="w-5 h-5" />
            <span className="text-sm">Skills</span>
          </div>
          <div className="flex items-center space-x-6 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
            <PlaySquare className="w-5 h-5" />
            <span className="text-sm">Experience</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-2 px-3 py-2 text-white">
            <span className="text-sm font-medium">You</span>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="space-y-1">
            {[
              [History, "History"],
              [List, "Projects"],
              [Video, "Your work"],
              [GraduationCap, "Your education"],
              [Clock, "Watch Later"],
              [ThumbsUpIcon, "Liked projects"],
            ].map(([Icon, label]) => (
              <div key={label} className="flex items-center space-x-6 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 my-4" />

        <div>
          <div className="px-3 py-2">
            <h3 className="text-sm font-medium text-white">Core Skills</h3>
          </div>
          <div className="space-y-1">
            {subscriptions.map((s, i) => (
              <div key={i} className="flex items-center space-x-6 px-3 py-2 rounded-lg hover:bg-[#272727] cursor-pointer">
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
