import React, { useEffect, useState } from "react";
import Portfolio from "pages/Portfolio";
import StartupSplash from "components/StartupSplash";

export default function App() {
  const [showStartupSplash, setShowStartupSplash] = useState(true);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const splashDuration = prefersReducedMotion ? 420 : 2050;
    const timeoutId = window.setTimeout(() => {
      setShowStartupSplash(false);
    }, splashDuration);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Portfolio />
      {showStartupSplash ? <StartupSplash /> : null}
    </>
  );
}
