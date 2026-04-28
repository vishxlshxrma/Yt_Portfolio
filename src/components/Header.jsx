import React, { useState } from "react";
import { Menu, Play, Folder, Bell, Search, Linkedin, Moon, Sun } from "lucide-react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Avatar, AvatarFallback } from "components/ui/avatar";

export default function Header({ sidebarOpen, setSidebarOpen, theme, onToggleTheme }) {
  const [showContact, setShowContact] = useState(false);

  const openInBackground = (path) => {
    const absoluteUrl = path.startsWith("http")
      ? path
      : `${window.location.origin}${path}`;
    const newTab = window.open(absoluteUrl, "_blank", "noopener,noreferrer");
    if (newTab) {
      newTab.blur();
      window.focus();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)] transition-colors duration-300">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left: menu + logo */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-2">
              <div className="flex h-6 w-10 items-center justify-center rounded-lg bg-[var(--accent-red)]">
                <Play className="w-3 h-3 text-white fill-current" />
              </div>
              <span className="text-xl font-semibold text-[var(--text-primary)]">Vishal Kumar</span>
            </div>
          </div>

          {/* Middle: search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="flex items-center overflow-hidden rounded-full border border-[var(--border)]">
                <Input
                  placeholder="Search my skills... (e.g., Python, Project Management)"
                  className="h-10 rounded-none border-0 bg-[var(--surface)] pl-4 pr-12
                             text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]
                             focus:outline-none focus:ring-0 focus-visible:ring-0"
                />
                <button
                  type="button"
                  className="flex h-10 w-12 items-center justify-center bg-[var(--surface-muted)] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center space-x-4">
            {/* Resume */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openInBackground("/Vishal_Kumar_Resume.pdf")}
              className="flex items-center gap-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            >
              <Folder className="w-4 h-4" />
              <span className="hidden sm:inline">Resume</span>
            </Button>

            {/* LinkedIn */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                openInBackground("https://www.linkedin.com/in/vishal-kumar-130a90249/")
              }
              className="flex items-center gap-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            >
              <Linkedin className="w-4 h-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </Button>

            {/* Contact */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowContact(true)}
              className="flex items-center gap-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Contact Me</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              className="text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-[var(--accent-red)] text-white">VK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Contact Modal */}
      {showContact && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center
                     backdrop-blur-md bg-[var(--overlay-backdrop)] animate-fadeIn"
        >
          <div
            className="w-[420px] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-[var(--text-primary)] shadow-2xl
                       animate-popupIn"
          >
            <h2 className="mb-4 text-center text-lg font-semibold">
              How would you like to connect?
            </h2>

            <div className="space-y-3">
              {[
                "Employers / Recruiters",
                "Collaborators / Founders / Startups",
                "Freelance / Client Work Enquiries",
                "Networking / Students / Learners",
                "Casual Chat / AI Enthusiasts",
              ].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="w-full border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  {category}
                </Button>
              ))}
            </div>

            <Button
              onClick={() => setShowContact(false)}
              className="mt-6 w-full bg-[var(--surface-hover)] text-[var(--text-primary)] hover:bg-[var(--surface-strong)]"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
