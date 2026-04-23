import React from "react";
import { Play } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="p-6 pb-0">
      <div className="relative bg-black rounded-lg overflow-hidden mb-6" style={{ aspectRatio: "16/9" }}>
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop"
          alt="Career Journey"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-[#FF0000] rounded-full flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-red-600 transition-colors">
              <Play className="w-8 h-8 text-white fill-current ml-1" />
            </div>
            <h1 className="text-2xl font-bold mb-2">My Career Journey | Resume</h1>
            <p className="text-gray-300">I tend to look at creative solutions to complex problems.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
