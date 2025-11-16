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

      <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
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
            className="text-white hover:bg-[#272727] flex items-center space-x-2 px-4 py-2"
          >
            <ThumbsUp className="w-5 h-5" />
            <span>{likes}</span>
          </Button>

          {/* Comments Button */}
          <Button
            variant="ghost"
            onClick={() => setShowComments(true)}
            className="text-white hover:bg-[#272727] flex items-center space-x-2 px-4 py-2"
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
            className="text-white hover:bg-[#272727] flex items-center space-x-2 px-4 py-2"
          >
            <Share className="w-5 h-5" />
            <span>Share</span>
          </Button>

          <Button
            variant="ghost"
            onClick={handleResumeOpen}
            className="text-white hover:bg-[#272727] flex items-center space-x-2 px-4 py-2"
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
                     backdrop-blur-md bg-black/60 animate-fadeIn"
        >
          <div
            className="bg-[#1a1a1a] w-96 rounded-xl p-6 shadow-2xl transform
                       animate-popupIn border border-gray-700"
          >
            <h2 className="text-lg font-semibold mb-4">Comments</h2>
            <div className="h-40 bg-[#0f0f0f] rounded-lg flex items-center justify-center text-gray-500">
              <p>No comments yet...</p>
            </div>
            <Button
              onClick={() => setShowComments(false)}
              className="mt-4 bg-[#272727] hover:bg-[#333333] text-white w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Share Toast (Top Right) */}
      {showCopied && (
        <div
          className="fixed top-5 right-5 z-[9999] bg-[#1f1f1f] border border-gray-700
                     text-white text-sm px-6 py-3 rounded-lg shadow-lg animate-fadeSlide"
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
