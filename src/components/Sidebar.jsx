import React from "react";
import {
  Home,
  Zap,
  PlaySquare,
  History,
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
    { id: "projects", label: "Past Works", Icon: Video }, // also Projects
    { id: "education", label: "My Education", Icon: GraduationCap }, // takes to Education
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-[70] w-72 max-w-[85vw] transform overflow-y-auto border-r border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] shadow-xl transition-transform duration-300 lg:sticky lg:top-[56px] lg:z-30 lg:h-[calc(100vh-56px)] lg:w-60 lg:max-w-none lg:translate-x-0 lg:shadow-none ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
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
                  active
                    ? "bg-[var(--surface-hover)] text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
                {active && <span className="ml-auto h-2 w-2 rounded-full bg-[var(--accent-red)]" />}
              </button>
            );
          })}
        </div>

        {/* You Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 px-3 py-2 text-[var(--text-primary)]">
            <span className="text-sm font-medium">A little about me</span>
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
                className="flex w-full items-center space-x-6 rounded-lg px-3 py-2 text-left text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="my-4 border-t border-[var(--border)]" />

        {/* Core Skills */}
        <div>
          <div className="px-3 py-2">
            <h3 className="text-sm font-medium text-[var(--text-primary)]">Core Skills</h3>
          </div>
          <div className="space-y-1">
            {subscriptions.map((s, i) => (
              <div
                key={i}
                className="flex cursor-pointer items-center space-x-6 rounded-lg px-3 py-2 text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-strong)] text-xs font-bold text-[var(--text-primary)]">
                  {s.avatar}
                </div>
                <span className="text-sm flex-1">{s.name}</span>
                {s.isLive && (
                  <div className="flex items-center">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent-red)]" />
                    <div className="ml-0.5 h-2 w-2 animate-pulse rounded-full bg-[var(--accent-red)]" />
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
