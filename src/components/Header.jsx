import React from "react";
import { Menu, Play, Folder, Bell, Search } from "lucide-react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Avatar, AvatarFallback } from "components/ui/avatar";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="bg-[#0f0f0f] border-b border-gray-800 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 h-14">
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
            <div className="w-8 h-8 bg-[#FF0000] rounded-sm flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-current" />
            </div>
            <span className="text-xl font-semibold">YouTube</span>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Input
              placeholder="Search my skills... (e.g., Python, Project Management)"
              className="bg-[#121212] border-gray-600 rounded-l-full rounded-r-none h-10 pl-4 pr-12 text-white placeholder:text-gray-400"
            />
            <Button className="absolute right-0 top-0 h-10 px-6 bg-[#222222] hover:bg-[#333333] rounded-l-none rounded-r-full border-l border-gray-600">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#222222] flex items-center gap-2">
            <Folder className="w-4 h-4" />
            <span className="hidden sm:inline">Portfolio</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#222222] flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Contact Me</span>
          </Button>
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-blue-500 text-white">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
