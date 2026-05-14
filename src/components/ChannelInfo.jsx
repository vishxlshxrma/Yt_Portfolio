import React, { useState } from "react";
import { Button } from "components/ui/button";
import { Avatar, AvatarFallback } from "components/ui/avatar";
import ContactModal from "components/ContactModal";

export default function ChannelInfo() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[var(--surface)] p-3 text-[var(--text-primary)] sm:p-4">
        <div className="flex min-w-0 items-center space-x-3 sm:space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-[var(--accent-red)] font-bold text-white">VK</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h3 className="truncate font-semibold">Vishal Kumar</h3>
            <p className="truncate text-xs text-[var(--text-secondary)] sm:text-sm">
              2+ years professional experience
            </p>
          </div>
        </div>

        <Button
          onClick={() => setShowContact(true)}
          className="min-h-10 rounded-full bg-[var(--accent-red)] px-5 py-2 font-medium text-white hover:opacity-90 sm:px-6"
        >
          Contact
        </Button>
      </div>

      <ContactModal open={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}
