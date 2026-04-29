import React, { useState } from "react";
import { Button } from "components/ui/button";
import { Avatar, AvatarFallback } from "components/ui/avatar";
import ContactModal from "components/ContactModal";

export default function ChannelInfo() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <div className="mb-6 flex items-center justify-between rounded-lg bg-[var(--surface)] p-4 text-[var(--text-primary)]">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-[var(--accent-red)] font-bold text-white">VK</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Vishal Kumar</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              2+ years experience • Available for hire
            </p>
          </div>
        </div>

        <Button
          onClick={() => setShowContact(true)}
          className="rounded-full bg-[var(--accent-red)] px-6 py-2 font-medium text-white hover:opacity-90"
        >
          Contact
        </Button>
      </div>

      <ContactModal open={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}
