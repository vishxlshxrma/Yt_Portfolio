import React, { useEffect, useRef, useState } from "react";
import { Menu, Play, Folder, Bell, Search, Linkedin, Moon, Sun } from "lucide-react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Avatar, AvatarFallback } from "components/ui/avatar";
import ContactModal from "components/ContactModal";

export default function Header({
  sidebarOpen,
  setSidebarOpen,
  theme,
  onToggleTheme,
  onSearchSubmit,
  searchQuery,
  setSearchQuery,
  searchSuggestions = [],
  contactRequestToken = 0,
}) {
  const [showContact, setShowContact] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

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

  useEffect(() => {
    if (!contactRequestToken) return;
    setShowContact(true);
  }, [contactRequestToken]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearchSubmit = (value = searchQuery) => {
    const trimmed = String(value ?? "").trim();
    if (!trimmed) return;
    onSearchSubmit?.(trimmed);
    setShowSuggestions(false);
  };

  const shouldShowSuggestions =
    showSuggestions && String(searchQuery ?? "").trim().length > 0 && searchSuggestions.length > 0;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)] transition-colors duration-300">
        <div className="flex flex-wrap items-center gap-y-2 px-3 py-2 sm:px-4">
          {/* Left: menu + logo */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-9 w-9 text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex min-w-0 items-center space-x-2">
              <div className="flex h-6 w-10 items-center justify-center rounded-lg bg-[var(--accent-red)]">
                <Play className="w-3 h-3 text-white fill-current" />
              </div>
              <span className="truncate text-base font-semibold text-[var(--text-primary)] sm:text-xl">
                Vishal Kumar
              </span>
            </div>
          </div>

          {/* Search row */}
          <div className="order-3 w-full md:order-none md:mx-4 md:flex-1 md:max-w-2xl lg:mx-8">
            <div className="relative" ref={searchRef}>
              <div className="flex items-center overflow-hidden rounded-full border border-[var(--border)]">
                <Input
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery?.(event.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSearchSubmit();
                    }
                    if (event.key === "Escape") {
                      setShowSuggestions(false);
                    }
                  }}
                  placeholder="Search projects, skills, experience..."
                  className="h-10 rounded-none border-0 bg-[var(--surface)] pl-4 pr-12
                             text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]
                             focus:outline-none focus:ring-0 focus-visible:ring-0"
                />
                <button
                  type="button"
                  onClick={() => handleSearchSubmit()}
                  className="flex h-10 w-12 items-center justify-center bg-[var(--surface-muted)] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {shouldShowSuggestions ? (
                <div className="absolute left-0 right-0 top-full z-[90] mt-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  {searchSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        setSearchQuery?.(suggestion);
                        handleSearchSubmit(suggestion);
                      }}
                      className="flex w-full items-center gap-3 border-b border-[var(--border)] px-4 py-3 text-left text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)] last:border-b-0"
                    >
                      <Search className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {/* Right: actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2 md:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openInBackground("/Vishal_Kumar_Resume.pdf")}
              className="h-9 px-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)] sm:px-3"
            >
              <Folder className="w-4 h-4" />
              <span className="hidden lg:inline">Resume</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                openInBackground("https://www.linkedin.com/in/vishal-kumar-130a90249/")
              }
              className="h-9 px-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)] sm:px-3"
            >
              <Linkedin className="w-4 h-4" />
              <span className="hidden lg:inline">LinkedIn</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowContact(true)}
              className="h-9 px-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)] sm:px-3"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden lg:inline">Contact Me</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              className="h-9 w-9 text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-[var(--accent-red)] text-white">VK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <ContactModal open={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}
