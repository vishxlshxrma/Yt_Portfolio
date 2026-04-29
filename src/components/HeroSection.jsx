import React from "react";
import { Play } from "lucide-react";

export default function HeroSection() {
  const showPlayButton = false;

  return (
    <div className="px-3 pb-0 pt-3 sm:px-4 sm:pt-4 md:px-6 md:pt-6">
      <div
        className="relative mb-6 overflow-hidden rounded-lg bg-black"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          src="/images/HeroImage.jpg"
          alt="Career Journey"
          className="w-full h-full object-cover opacity-80"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="px-4 text-center sm:px-6">
            {showPlayButton && (
              <div className="mx-auto mb-3 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[var(--accent-red)] text-white transition-opacity hover:opacity-90 sm:mb-4 sm:h-20 sm:w-20">
                <Play className="ml-0.5 h-6 w-6 fill-current text-white sm:ml-1 sm:h-8 sm:w-8" />
              </div>
            )}

            <h1 className="mb-2 text-lg font-bold text-white sm:text-xl md:text-2xl">
              My Career Journey | Resume
            </h1>

            <p className="mx-auto max-w-2xl text-xs text-white/80 sm:text-sm md:text-base">
              I&apos;m a Computer Science graduate student at the University of
              Southern California who loves building products that actually
              solve real problems. I specialize in turning complex ideas into
              clean, scalable systems, blending engineering with creativity.
              I&apos;m always learning, shipping, and pushing myself to build
              better, faster, and smarter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
