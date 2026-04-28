import React, { useState } from "react";
import {
  Eye,
  ThumbsUp,
  MessageCircle,
  Share,
  ExternalLink,
} from "lucide-react";
import { Button } from "components/ui/button";
import ChannelInfo from "components/ChannelInfo";

export default function VideoInfo() {
  const [likes, setLikes] = useState(126);
  const [showComments, setShowComments] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleResumeOpen = () => {
    const absoluteUrl = `${window.location.origin}/Vishal_Kumar_Resume.pdf`;
    const newTab = window.open(absoluteUrl, "_blank", "noopener,noreferrer");
    if (newTab) {
      newTab.blur();
      window.focus();
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2200);
    } catch (e) {
      console.error("Clipboard copy failed:", e);
    }
  };

  return (
    <div className="px-6 pb-4 relative">
      <h1 className="text-xl font-bold mb-3">My Journey | Resume 2025</h1>

      <div className="mb-4 flex items-center space-x-4 text-sm text-[var(--text-secondary)]">
        <div className="flex items-center space-x-1">
          <Eye className="w-4 h-4" />
          <span>10K views</span>
        </div>
      </div>

      {/* Buttons Row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {/* Like Counter */}
          <Button
            variant="ghost"
            onClick={() => setLikes(likes + 1)}
            className="flex items-center space-x-2 px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
          >
            <ThumbsUp className="w-5 h-5" />
            <span>{likes}</span>
          </Button>

          {/* Comments Button */}
          <Button
            variant="ghost"
            onClick={() => setShowComments(true)}
            className="flex items-center space-x-2 px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Comments</span>
          </Button>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
          >
            <Share className="w-5 h-5" />
            <span>Share</span>
          </Button>

          <Button
            variant="ghost"
            onClick={handleResumeOpen}
            className="flex items-center space-x-2 px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Resume</span>
          </Button>
        </div>
      </div>

      <ChannelInfo />

      {/* Comments Modal */}
      {showComments && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center
                     backdrop-blur-md bg-[var(--overlay-backdrop)] animate-fadeIn"
        >
          <div
            className="w-96 transform rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-[var(--text-primary)] shadow-2xl
                       animate-popupIn"
          >
            <h2 className="text-lg font-semibold mb-4">Comments</h2>
            <div className="flex h-40 items-center justify-center rounded-lg bg-[var(--surface-muted)] text-[var(--text-secondary)]">
              <p>No comments yet...</p>
            </div>
            <Button
              onClick={() => setShowComments(false)}
              className="mt-4 w-full bg-[var(--surface-hover)] text-[var(--text-primary)] hover:bg-[var(--surface-strong)]"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Share Toast (Top Right) */}
      {showCopied && (
        <div
          className="fixed right-5 top-5 z-[9999] animate-fadeSlide rounded-lg border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm text-[var(--text-primary)] shadow-lg"
        >
          📋 Portfolio link copied!
        </div>
      )}
    </div>
  );
}

/* Add these animations in your global.css or tailwind.css

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popupIn {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes fadeSlide {
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-popupIn {
  animation: popupIn 0.25s ease-out forwards;
}

.animate-fadeSlide {
  animation: fadeSlide 0.3s ease-out;
}
*/
