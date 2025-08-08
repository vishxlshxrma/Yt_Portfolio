import React from "react";
import { Download, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-gray-800 py-6 mt-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-center space-x-8 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">References</a>
          <a href="#" className="hover:text-white transition-colors flex items-center">
            <Download className="w-4 h-4 mr-1" />
            Download PDF
          </a>
          <a href="#" className="hover:text-white transition-colors flex items-center">
            <ExternalLink className="w-4 h-4 mr-1" />
            LinkedIn
          </a>
          <a href="#" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="text-center text-xs text-gray-500 mt-4">
          © 2024 Alex Rivera Portfolio • Inspired by great design
        </div>
      </div>
    </footer>
  );
}
