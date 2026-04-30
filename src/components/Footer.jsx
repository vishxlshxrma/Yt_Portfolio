import React, { useState } from "react";
import { Download, ExternalLink } from "lucide-react";
import ContactModal from "components/ContactModal";

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
        <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-[var(--text-secondary)]">
            <button
              onClick={() => openInBackground("/Vishal_Kumar_Resume.pdf")}
              className="inline-flex min-h-10 items-center transition-colors hover:text-[var(--text-primary)]"
            >
              <Download className="w-4 h-4 mr-1" />
              My Resume
            </button>

            <button
              onClick={() =>
                openInBackground("https://www.linkedin.com/in/vishal-kumar-130a90249/")
              }
              className="inline-flex min-h-10 items-center transition-colors hover:text-[var(--text-primary)]"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              LinkedIn
            </button>

            <button
              onClick={() => setShowContact(true)}
              className="inline-flex min-h-10 items-center transition-colors hover:text-[var(--text-primary)]"
            >
              Contact
            </button>
          </div>

          <div className="mt-4 text-center text-xs text-[var(--text-secondary)]">
            © Vishal Kumar Portfolio • Inspired by a thought in my dream 😴
          </div>
        </div>
      </footer>

      <ContactModal open={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}
