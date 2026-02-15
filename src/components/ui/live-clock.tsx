"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";

export function LiveClock() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");

  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);

    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: userTimezone,
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-end gap-3">
      <ThemeToggle />
      <div className="text-right">
        <p className="text-sm text-muted-foreground">
          {currentTime && (
            <>
              <span className="font-mono">{currentTime}</span>
              <br />
              <span className="text-xs opacity-70">{timezone}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
