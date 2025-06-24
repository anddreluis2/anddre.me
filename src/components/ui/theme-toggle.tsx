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
      className="relative cursor-pointer w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center group overflow-hidden"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-3 h-3 sm:w-4 sm:h-4">
        {/* Sun icon */}
        <Sun
          className={`w-3 h-3 sm:w-4 sm:h-4 text-foreground absolute top-0 left-0 transition-all duration-500 ease-in-out ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-180 scale-75 opacity-0"
          }`}
        />

        {/* Moon icon */}
        <Moon
          className={`w-3 h-3 sm:w-4 sm:h-4 text-foreground absolute top-0 left-0 transition-all duration-500 ease-in-out ${
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-180 scale-75 opacity-0"
          }`}
        />
      </div>

      {/* Subtle glow effect */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          theme === "dark"
            ? "bg-yellow-400/10 shadow-yellow-400/20"
            : "bg-blue-400/10 shadow-blue-400/20"
        } shadow-lg opacity-0 group-hover:opacity-100`}
      />
    </button>
  );
}
