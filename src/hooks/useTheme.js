import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "portfolio-theme";
const THEMES = { light: "light", dark: "dark" };

function getInitialTheme() {
  if (typeof window === "undefined") return THEMES.dark;

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === THEMES.light || storedTheme === THEMES.dark) {
    return storedTheme;
  }

  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    return THEMES.dark;
  }

  return THEMES.light;
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === THEMES.dark ? THEMES.light : THEMES.dark
    );
  };

  return { theme, setTheme, toggleTheme };
}
