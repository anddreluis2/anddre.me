"use client";

import { useState, useEffect } from "react";

export function LiveClock() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");

  useEffect(() => {
    // Get user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);

    // Function to update time
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

    // Update immediately
    updateTime();

    // Set up interval to update every second
    const interval = setInterval(updateTime, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
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
  );
}
