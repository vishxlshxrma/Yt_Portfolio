import React from "react";
import { Menu, Play, Folder, Bell, Search } from "lucide-react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Avatar, AvatarFallback } from "components/ui/avatar";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="bg-[#0f0f0f] border-b border-gray-800 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left: menu + logo */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-[#222222]"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center space-x-2">
            <div className="w-10 h-6 bg-[#FF0000] rounded-lg flex items-center justify-center">
              <Play className="w-3 h-3 text-white fill-current" />
            </div>
            <span className="text-xl font-semibold">Vishal Kumar</span>
          </div>
        </div>

        {/* Middle: search */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            {/* Unified rounded container: prevents any square outline */}
            <div className="flex items-center rounded-full border border-gray-700 overflow-hidden">
              <Input
                placeholder="Search my skills... (e.g., Python, Project Management)"
                className="bg-[#121212] border-0 rounded-none h-10 pl-4 pr-12
                           text-white placeholder:text-gray-400
                           focus:outline-none focus:ring-0 focus-visible:ring-0"
              />
              <button
                type="button"
                className="h-10 w-12 bg-[#222222] hover:bg-[#333333]
                           flex items-center justify-center
                           outline-none focus:outline-none focus-visible:outline-none"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-[#222222] flex items-center gap-2"
          >
            <Folder className="w-4 h-4" />
            <span className="hidden sm:inline">Resume</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-[#222222] flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Contact Me</span>
          </Button>

          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-red-500 text-white">VK</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
