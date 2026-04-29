import React from "react";
import { Play } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="p-6 pb-0">
      <div
        className="relative mb-6 overflow-hidden rounded-lg bg-black"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          src="/images/HeroImage.jpeg"
          alt="Career Journey"
          className="w-full h-full object-cover opacity-80"
        />

        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-[var(--accent-red)] text-white transition-opacity hover:opacity-90">
              <Play className="w-8 h-8 text-white fill-current ml-1" />
            </div>

            <h1 className="mb-2 text-2xl font-bold text-white">
              My Career Journey | Resume
            </h1>

            <p className="text-white/80">
              I tend to look at creative solutions to complex problems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
