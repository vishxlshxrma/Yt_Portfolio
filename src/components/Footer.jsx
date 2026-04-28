import React, { useState } from "react";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "components/ui/button";

export default function Footer() {
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
      <footer className="mt-8 border-t border-[var(--border)] bg-[var(--surface)] py-6 text-[var(--text-primary)] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center space-x-8 text-sm text-[var(--text-secondary)]">
            <button
              onClick={() => openInBackground("/Vishal_Kumar_Resume.pdf")}
              className="flex items-center transition-colors hover:text-[var(--text-primary)]"
            >
              <Download className="w-4 h-4 mr-1" />
              My Resume
            </button>

            <button
              onClick={() =>
                openInBackground("https://www.linkedin.com/in/vishal-kumar-130a90249/")
              }
              className="flex items-center transition-colors hover:text-[var(--text-primary)]"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              LinkedIn
            </button>

            <button
              onClick={() => setShowContact(true)}
              className="transition-colors hover:text-[var(--text-primary)]"
            >
              Contact
            </button>
          </div>

          <div className="mt-4 text-center text-xs text-[var(--text-secondary)]">
            © 2025 Vishal Kumar Portfolio • Inspired by a thought in my dream 😴
          </div>
        </div>
      </footer>

      {/* Reuse the same Contact Modal */}
      {showContact && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center
                     backdrop-blur-md bg-[var(--overlay-backdrop)] animate-fadeIn"
        >
          <div
            className="w-[420px] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-[var(--text-primary)] shadow-2xl
                       animate-popupIn"
          >
            <h2 className="text-lg font-semibold mb-4 text-center">
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
