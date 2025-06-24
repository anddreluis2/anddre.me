"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement;

    if (newTheme === "light") {
      // Light mode: clean white background with dark text for good contrast
      root.style.setProperty("--background", "#ffffff");
      root.style.setProperty("--foreground", "#171717");
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      // Dark mode: keep exactly as it was - no changes!
      root.style.setProperty("--background", "#0a0a0a");
      root.style.setProperty("--foreground", "#ededed");
      root.classList.remove("light");
      root.classList.add("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center group"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative">
        {theme === "light" ? (
          <Moon className="w-4 h-4 text-foreground transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <Sun className="w-4 h-4 text-foreground transition-transform duration-300 group-hover:scale-110" />
        )}
      </div>
    </button>
  );
}
