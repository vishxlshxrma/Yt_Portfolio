import React, { useState } from "react";
import { Button } from "components/ui/button";
import { Avatar, AvatarFallback } from "components/ui/avatar";

export default function ChannelInfo() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg mb-6">
        {/* Left: Avatar + Info */}
        <div className="flex items-center space-x-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-[#FF0000] text-white font-bold">
              VK
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Vishal Kumar</h3>
            <p className="text-sm text-gray-400">
              2+ years experience • Available for hire
            </p>
          </div>
        </div>

        {/* Contact Button */}
        <Button
          onClick={() => setShowContact(true)}
          className="bg-[#FF0000] hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium"
        >
          Contact
        </Button>
      </div>

      {/* Contact Modal */}
      {showContact && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center
                     backdrop-blur-md bg-black/60 animate-fadeIn"
        >
          <div
            className="bg-[#1a1a1a] w-[420px] rounded-xl p-6 shadow-2xl
                       border border-gray-700 animate-popupIn"
          >
            <h2 className="text-lg font-semibold mb-4 text-center">
              How would you like to connect?
            </h2>

            <div className="space-y-3">
              {[
                "Employers / Recruiters",
                "Collaborators / Founders / Startups",
                "Freelance / Client Work Enquiries",
                "Networking / Students / Learners",
                "Casual Chat / AI Enthusiasts",
              ].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="w-full bg-[#222] text-white border-gray-700 hover:bg-[#333] transition-colors"
                >
                  {category}
                </Button>
              ))}
            </div>

            <Button
              onClick={() => setShowContact(false)}
              className="mt-6 bg-[#272727] hover:bg-[#333333] text-white w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

/*
Animations (if not already present in global.css):

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes popupIn {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}
.animate-fadeIn { animation: fadeIn 0.3s ease-out; }
.animate-popupIn { animation: popupIn 0.25s ease-out forwards; }
*/
