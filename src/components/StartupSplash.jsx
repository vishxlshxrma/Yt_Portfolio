import React from "react";

export default function StartupSplash() {
  return (
    <div className="startup-splash" aria-hidden="true">
      <img
        src="/startup-logo.png"
        alt="Vishal Kumar startup logo"
        className="startup-splash-logo"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
