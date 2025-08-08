import React from "react";
import { Button } from "components/ui/button";
import { Avatar, AvatarFallback } from "components/ui/avatar";

export default function ChannelInfo() {
  return (
    <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg mb-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-[#FF0000] text-white font-bold">AR</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">Alex Rivera</h3>
          <p className="text-sm text-gray-400">5+ years experience • Available for hire</p>
        </div>
      </div>
      <Button className="bg-[#FF0000] hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium">
        Contact
      </Button>
    </div>
  );
}
