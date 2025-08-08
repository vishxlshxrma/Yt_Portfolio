import React from "react";
import { Eye, ThumbsUp, MessageCircle, Share, Download, ExternalLink } from "lucide-react";
import { Button } from "components/ui/button";
import ChannelInfo from "components/ChannelInfo";

export default function VideoInfo() {
  return (
    <div className="px-6 pb-4">
      <h1 className="text-xl font-bold mb-3">My Career Journey | Resume 2024</h1>

      <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
        <div className="flex items-center space-x-1">
          <Eye className="w-4 h-4" />
          <span>10K views</span>
        </div>
        <span>•</span>
        <span>Updated 2 months ago</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:bg-[#272727] flex items-center space-x-2 px-4 py-2">
            <ThumbsUp className="w-5 h-5" />
            <span>95% Like Rate</span>
          </Button>
          <Button variant="ghost" className="text-white hover:bg-[#272727] flex items-center space-x-2 px-4 py-2">
            <MessageCircle className="w-5 h-5" />
            <span>Hire me!</span>
          </Button>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="text-white hover:bg-[#272727] flex items-center space-x-2 px-4 py-2">
            <Share className="w-5 h-5" />
            <span>Share</span>
          </Button>
          <Button variant="ghost" className="text-white hover:bg-[#272727] flex items-center space-x-2 px-4 py-2">
            <Download className="w-5 h-5" />
            <span>Download CV</span>
          </Button>
        </div>
      </div>

      <ChannelInfo />

      {/* Optional footer links row replicated from the original footer's first line */}
      <div className="hidden lg:flex flex-wrap gap-6 text-sm text-gray-400">
        <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
          <Download className="w-4 h-4" /> Download PDF
        </a>
        <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
          <ExternalLink className="w-4 h-4" /> LinkedIn
        </a>
      </div>
    </div>
  );
}
