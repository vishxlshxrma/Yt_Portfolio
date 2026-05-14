import React, { useEffect, useState } from "react";
import { Eye, ThumbsUp, Share, ExternalLink } from "lucide-react";
import { Button } from "components/ui/button";
import ChannelInfo from "components/ChannelInfo";
import {
  getPortfolioStats,
  incrementPortfolioLike,
  incrementPortfolioView,
} from "lib/api";

const DEFAULT_LIKES = 0;
const DEFAULT_VIEWS = 0;
const SESSION_VIEW_KEY = "portfolio-view-counted";
const LOCAL_LIKE_KEY = "portfolio-liked-v2";

const formatCount = (value) => {
  const count = Number(value ?? 0);
  if (!Number.isFinite(count)) return "0";
  if (count < 1000) return String(Math.round(count));
  if (count < 1000000) {
    const thousands = count / 1000;
    return `${Number.isInteger(thousands) ? thousands.toFixed(0) : thousands.toFixed(1)}K`;
  }
  const millions = count / 1000000;
  return `${Number.isInteger(millions) ? millions.toFixed(0) : millions.toFixed(1)}M`;
};

export default function VideoInfo() {
  const [likes, setLikes] = useState(DEFAULT_LIKES);
  const [views, setViews] = useState(DEFAULT_VIEWS);
  const [showCopied, setShowCopied] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const bootstrapStats = async () => {
      try {
        const likedFlag = window.localStorage.getItem(LOCAL_LIKE_KEY) === "true";
        if (isMounted) setHasLiked(likedFlag);
      } catch (error) {
        console.error("Failed to read like status:", error);
      }

      try {
        const stats = await getPortfolioStats();
        if (isMounted) {
          setLikes(Number(stats.likes ?? DEFAULT_LIKES));
          setViews(Number(stats.views ?? DEFAULT_VIEWS));
        }
      } catch (error) {
        console.error("Failed to fetch portfolio stats:", error);
      }

      try {
        const hasCountedView = window.sessionStorage.getItem(SESSION_VIEW_KEY) === "true";
        if (!hasCountedView) {
          const updatedStats = await incrementPortfolioView();
          if (isMounted) {
            setViews(Number(updatedStats.views ?? DEFAULT_VIEWS));
            setLikes(Number(updatedStats.likes ?? DEFAULT_LIKES));
          }
          window.sessionStorage.setItem(SESSION_VIEW_KEY, "true");
        }
      } catch (error) {
        console.error("Failed to increment portfolio view:", error);
      }
    };

    bootstrapStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleResumeOpen = () => {
    const absoluteUrl = `${window.location.origin}/Kumar_Vishal_Resume.pdf`;
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
    } catch (error) {
      console.error("Clipboard copy failed:", error);
    }
  };

  const handleLike = async () => {
    if (isLikeLoading || hasLiked) return;

    setIsLikeLoading(true);
    try {
      const updatedStats = await incrementPortfolioLike();
      setLikes(Number(updatedStats.likes ?? likes));
      setViews(Number(updatedStats.views ?? views));
      setHasLiked(true);
      window.localStorage.setItem(LOCAL_LIKE_KEY, "true");
    } catch (error) {
      console.error("Failed to increment portfolio like:", error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  return (
    <div className="relative px-3 pb-4 sm:px-4 md:px-6">
      <h1 className="mb-3 text-lg font-bold sm:text-xl">My Journey | Resume</h1>

      <div className="mb-4 flex items-center space-x-4 text-sm text-[var(--text-secondary)]">
        <div className="flex items-center space-x-1">
          <Eye className="h-4 w-4" />
          <span>{formatCount(views)} views</span>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            disabled={isLikeLoading}
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 hover:bg-[var(--surface-hover)] ${
              hasLiked
                ? "bg-[var(--surface-hover)] text-[var(--accent-red)]"
                : "text-[var(--text-primary)]"
            }`}
          >
            <ThumbsUp className={`h-5 w-5 ${hasLiked ? "fill-current" : ""}`} />
              <span className="text-sm sm:text-base">{likes}</span>
            </Button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            onClick={handleShare}
            className="flex items-center space-x-1 px-3 py-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)] sm:space-x-2 sm:px-4"
          >
            <Share className="h-5 w-5" />
            <span className="hidden sm:inline">Share</span>
          </Button>

          <Button
            variant="ghost"
            onClick={handleResumeOpen}
            className="flex items-center space-x-1 px-3 py-2 text-[var(--text-primary)] hover:bg-[var(--surface-hover)] sm:space-x-2 sm:px-4"
          >
            <ExternalLink className="h-5 w-5" />
            <span className="hidden sm:inline">Resume</span>
          </Button>
        </div>
      </div>

      <ChannelInfo />

      {showCopied && (
        <div className="fixed right-3 top-3 z-[9999] animate-fadeSlide rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs text-[var(--text-primary)] shadow-lg sm:right-5 sm:top-5 sm:px-6 sm:py-3 sm:text-sm">
          📋 Portfolio link copied!
        </div>
      )}
    </div>
  );
}
