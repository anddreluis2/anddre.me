"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface CustomSeparatorProps {
  className?: string;
  animated?: boolean;
  withDot?: boolean;
  delay?: number;
}

export function CustomSeparator({
  className,
  animated = true,
  withDot = true,
  delay = 0,
}: CustomSeparatorProps) {
  if (animated) {
    return (
      <motion.div
        className={cn(
          "flex items-center gap-4 w-full max-w-md mx-auto",
          className
        )}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border/30 to-primary/40" />
        {withDot && (
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary/20 animate-ping" />
          </div>
        )}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border/30 to-primary/40" />
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-4 w-full max-w-md mx-auto",
        className
      )}
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border/30 to-primary/40" />
      {withDot && <div className="w-2 h-2 rounded-full bg-primary/40" />}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border/30 to-primary/40" />
    </div>
  );
}

// Simple gradient line variant
export function GradientLine({
  className,
  animated = false,
  delay = 0,
}: {
  className?: string;
  animated?: boolean;
  delay?: number;
}) {
  if (animated) {
    return (
      <motion.div
        className={cn(
          "h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent",
          className
        )}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
      />
    );
  }

  return (
    <div
      className={cn(
        "h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent",
        className
      )}
    />
  );
}
