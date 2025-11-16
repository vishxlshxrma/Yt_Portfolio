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
      <footer className="bg-[#1a1a1a] border-t border-gray-800 py-6 mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center space-x-8 text-sm text-gray-400">
            <button
              onClick={() => openInBackground("/Vishal_Kumar_Resume.pdf")}
              className="hover:text-white transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-1" />
              My Resume
            </button>

            <button
              onClick={() =>
                openInBackground("https://www.linkedin.com/in/vishal-kumar-130a90249/")
              }
              className="hover:text-white transition-colors flex items-center"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              LinkedIn
            </button>

            <button
              onClick={() => setShowContact(true)}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>

          <div className="text-center text-xs text-gray-500 mt-4">
            © 2025 Vishal Kumar Portfolio • Inspired by a thought in my dream 😴
          </div>
        </div>
      </footer>

      {/* Reuse the same Contact Modal */}
      {showContact && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center
                     backdrop-blur-md bg-black/60 animate-fadeIn"
        >
          <div
            className="bg-[#1a1a1a] w-[420px] rounded-xl p-6 shadow-2xl
                       border border-gray-700 animate-popupIn"
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
                  className="w-full bg-[#222] text-white border-gray-700 hover:bg-[#333] transition-colors"
                >
                  {category}
                </Button>
              ))}
            </div>

            <Button
              onClick={() => setShowContact(false)}
              className="mt-6 bg-[#272727] hover:bg-[#333333] text-white w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
